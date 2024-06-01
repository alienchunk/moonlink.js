import { Node, Structure, makeRequest } from '../../index';
import { IVoiceState, IRESTOptions } from '../typings/Interfaces';
export class Rest {
    public node: Node;
    constructor(node: Node) {
        this.node = node;
    }
    public async loadTracks(source: string, query: string): Promise<unknown> {
        let request = await this.makeRequest(`loadtracks?identifier=${source}:${encodeURIComponent(query)}`, "GET");
        return request;
    }
    public async update(data: IRESTOptions): Promise<unknown> {
        let request = await this.makeRequest(
            `sessions/${this.node.sessionId}/players/${data.guildId}`,
            "PATCH",
            data.data
        );

        return request;
    }
    public async makeRequest(endpoint: string, method: string, data?: unknown): Promise<unknown> {
       let request = await makeRequest(`http${this.node.secure ? "s" : ""}${this.node.address}/${endpoint}?noReplace=${Structure.getManager().options?.noReplace ? true : false}`, {
              method,
              body: data ? JSON.stringify(data) : null,
              headers: {
                "Authorization": this.node.password,
                "User-Agent": Structure.getManager().options.clientName
              }
       })

         return request;
    }
}