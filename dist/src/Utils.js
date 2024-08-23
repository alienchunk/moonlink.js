"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = exports.sources = void 0;
exports.validateProperty = validateProperty;
exports.makeRequest = makeRequest;
function validateProperty(prop, validator, errorMessage) {
    if (!validator(prop)) {
        throw new Error(errorMessage);
    }
}
function makeRequest(url, options) {
    let request = fetch(url, options)
        .then((res) => res.json().catch(() => res.text()))
        .then((json) => json);
    if (!request)
        return;
    return request;
}
exports.sources = {
    youtube: "ytsearch",
    youtubemusic: "ytmsearch",
    soundcloud: "scsearch",
    spotify: "spsearch",
    local: "local",
};
class Plugin {
    name;
    load(manager) { }
    unload(manager) { }
}
exports.Plugin = Plugin;
//# sourceMappingURL=Utils.js.map