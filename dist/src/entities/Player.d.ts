import { IPlayerConfig, IVoiceState } from "../typings/Interfaces";
import { TPlayerLoop } from "../typings/types";
import { Manager, Node, Queue, Track } from "../../index";
export declare class Player {
    readonly manager: Manager;
    guildId: string;
    voiceChannelId: string;
    textChannelId: string;
    voiceState: IVoiceState;
    autoPlay: boolean;
    connected: boolean;
    playing: boolean;
    paused: boolean;
    volume: number;
    loop: TPlayerLoop;
    current: Track;
    ping: number;
    queue: Queue;
    node: Node;
    data: Record<string, unknown>;
    constructor(manager: Manager, config: IPlayerConfig);
    set(key: string, data: unknown): void;
    get<T>(key: string): T;
    connect(options: {
        setMute?: boolean;
        setDeaf?: boolean;
    }): boolean;
    disconnect(): boolean;
    play(): boolean;
    pause(): boolean;
    resume(): boolean;
    stop(): boolean;
    skip(position?: number): boolean;
    setVolume(volume: number): boolean;
}
