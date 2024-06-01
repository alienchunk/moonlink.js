"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const ws_1 = __importDefault(require("ws"));
const index_1 = require("../../index");
class Node {
    host;
    port;
    identifier;
    password;
    connected = false;
    destroyed = false;
    reconnectTimeout;
    reconnectAttempts = 1;
    retryAmount = 6;
    retryDelay = 60000;
    regions;
    secure;
    sessionId;
    socket;
    stats;
    url;
    rest;
    constructor(config) {
        this.host = config.host;
        this.port = config.port;
        this.identifier = config.identifier;
        this.password = config.password;
        this.regions = config.regions;
        this.retryDelay = config.retryDelay;
        this.retryAmount = config.retryAmount;
        this.secure = config.secure;
        this.sessionId = config.sessionId;
        this.url = `${this.secure ? 'https' : 'http'}://${this.address}/v4/`;
        this.rest = new (index_1.Structure.get("Rest"))(this);
    }
    get address() {
        return `${this.host}:${this.port}`;
    }
    connect() {
        let headers = {
            Authorization: this.password,
            "User-Id": index_1.Structure.manager.options.clientId,
            "Client-Name": index_1.Structure.manager.options.clientName
        };
        this.socket = new ws_1.default(`ws${this.secure ? "s" : ""}://${this.address}/v4/websocket`, { headers });
        this.socket.on("open", this.open.bind(this));
        this.socket.on("close", this.close.bind(this));
        this.socket.on("message", this.message.bind(this));
        this.socket.on("error", this.error.bind(this));
    }
    reconnect() {
        this.reconnectTimeout = setTimeout(() => {
            this.reconnectAttempts++;
            this.connect();
        }, this.retryDelay);
    }
    open() {
        if (this.reconnectTimeout)
            clearTimeout(this.reconnectTimeout);
        this.connected = true;
    }
    close(code, reason) {
        if (this.connected)
            this.connected = false;
        this.socket.removeAllListeners();
        this.socket.close();
        if (this.retryAmount <= this.reconnectAttempts)
            this.reconnect();
        else {
            this.socket = null;
            this.destroyed = true;
        }
    }
    async message(data) {
        if (Array.isArray(data))
            data = Buffer.concat(data);
        else if (data instanceof ArrayBuffer)
            data = Buffer.from(data);
        let payload = JSON.parse(data.toString("utf8"));
        switch (payload.op) {
            case "ready":
                this.sessionId = payload.sessionId;
                break;
            case "stats":
                delete payload.op;
                this.stats = payload;
                break;
            case "playerUpdate":
                break;
            case "event":
                break;
        }
    }
    error() { }
    destroy() {
        this.socket.close();
        this.destroyed = true;
    }
}
exports.Node = Node;
//# sourceMappingURL=Node.js.map