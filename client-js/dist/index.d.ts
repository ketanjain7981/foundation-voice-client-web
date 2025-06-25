import { RTVIClient, RTVIClientOptions, RTVIActionRequestData, RTVIActionResponse, Transport, RTVIMessage, TransportState, Tracks } from '@pipecat-ai/client-js';
export { ActionEndpointNotSetError, BotLLMSearchResponseData, BotLLMTextData, BotNotReadyError, BotReadyData, BotTTSTextData, ConfigData, ConfigOption, ConfigUpdateError, ConnectionTimeoutError, ErrorData, FunctionCallCallback, FunctionCallParams, ILogger, LLMActionType, LLMContext, LLMContextMessage, LLMFunctionCallData, LLMHelper, LLMHelperCallbacks, LLMHelperOptions, LLMMessageType, LLMSearchOrigin, LLMSearchResult, LogLevel, MessageDispatcher, Participant, PipecatMetricData, PipecatMetricsData, RTVIActionRequest, RTVIActionRequestData, RTVIActionResponse, RTVIClient, RTVIClientConfigOption, RTVIClientHelper, RTVIClientHelperCallbacks, RTVIClientHelperOptions, RTVIClientHelpers, RTVIClientOptions, RTVIClientParams, RTVIError, RTVIEvent, RTVIEventCallbacks, RTVIEventHandler, RTVIEvents, RTVIMessage, RTVIMessageActionResponse, RTVIMessageType, RTVIURLEndpoints, RTVI_MESSAGE_LABEL, ServerMessageData, StartBotError, StorageItemStoredData, Tracks, TranscriptData, Transport, TransportStartError, TransportState, TransportWrapper, httpActionGenerator, logger } from '@pipecat-ai/client-js';
import { GeminiLLMServiceOptions } from '@pipecat-ai/gemini-live-websocket-transport';
export { GeminiLLMServiceOptions, GeminiLiveWebsocketTransport } from '@pipecat-ai/gemini-live-websocket-transport';
import { OpenAIServiceOptions } from '@pipecat-ai/openai-realtime-webrtc-transport';
export { OpenAIRealTimeWebRTCTransport, OpenAIServiceOptions } from '@pipecat-ai/openai-realtime-webrtc-transport';
export { ProtobufFrameSerializer, WebSocketTransport } from '@pipecat-ai/websocket-transport';
export { DailyTransport } from '@pipecat-ai/daily-transport';
export { SmallWebRTCTransport } from '@pipecat-ai/small-webrtc-transport';

declare class Client extends RTVIClient {
    constructor(options: RTVIClientOptions);
    sendTextMessage(text: string): Promise<void>;
    sendCustomAction(action: RTVIActionRequestData): Promise<RTVIActionResponse>;
}

/**
 * Creates and configures a new RTVIClient instance
 * @param transportType - The type of transport to use ('websocket', 'webrtc', or 'daily'). Defaults to 'websocket'
 * @param customOptions - Optional custom options to override the default options
 */
declare function createRTVIClient(transportType: string, customOptions?: Partial<RTVIClientOptions>): Promise<Client>;

type TransportType = "websocket" | "daily" | "webrtc" | "gemini" | "openai";
interface TransportConfig {
    websocket: {
        serializer: any;
        recorderSampleRate?: number;
        playerSampleRate?: number;
    };
    daily: any;
    webrtc: any;
    gemini: GeminiLLMServiceOptions;
    openai: OpenAIServiceOptions;
}
declare class TransportFactory {
    private static isBrowser;
    static create<T extends TransportType>(transportType: T, options: TransportConfig[T]): Transport;
    static getAvailableTransports(): TransportType[];
}
declare class TransportManager {
    private transport;
    private transportType;
    private transportOptions;
    constructor(transportType: TransportType, options: TransportConfig[TransportType]);
    private ensureTransport;
    initialize(options: RTVIClientOptions, messageHandler: (message: RTVIMessage) => void): Promise<void>;
    connect(authBundle: Record<string, unknown>, abortController: AbortController): Promise<void>;
    disconnect(): Promise<void>;
    get instance(): Transport;
    get state(): TransportState;
    tracks(): Tracks;
    enableMic(enable: boolean): Promise<void>;
    enableCam(enable: boolean): Promise<void>;
    enableScreenShare(enable: boolean): void;
    get isSharingScreen(): boolean;
    get isCamEnabled(): boolean;
    get isMicEnabled(): boolean;
    sendMessage(message: RTVIMessage): void;
}

export { Client, TransportConfig, TransportFactory, TransportManager, TransportType, createRTVIClient };
