export * from '@pipecat-ai/client-react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { RTVIClientOptions, RTVIClientHelper } from '@think41/foundation-voice-client-js';
import { PropsWithChildren, ReactNode } from 'react';
import { ClassValue } from 'clsx';

interface DebugDisplayProps {
    className?: string;
}
declare function DebugDisplay({ className }: DebugDisplayProps): react_jsx_runtime.JSX.Element;

interface ChatWindowProps {
    className?: string;
    initialMessages?: Array<{
        type: 'user' | 'bot';
        text: string;
    }>;
    userMessageClassName?: string;
    botMessageClassName?: string;
    submitButtonClassName?: string;
}
declare function ChatWindow({ className, initialMessages, userMessageClassName, botMessageClassName, submitButtonClassName }: ChatWindowProps): react_jsx_runtime.JSX.Element;

interface MicControlProps {
    onStart?: () => void;
    onStop?: (duration: number) => void;
    visualizerBars?: number;
    demoMode?: boolean;
    demoInterval?: number;
    className?: string;
    isActive?: boolean;
    onChange?: (isActive: boolean) => void;
}
declare function MicControl({ onStart, onStop, visualizerBars, demoMode, demoInterval, className, isActive, onChange, }: MicControlProps): react_jsx_runtime.JSX.Element;

interface CAIProviderProps$1 extends PropsWithChildren {
    clientType?: 'websocket' | 'daily' | 'webrtc' | string;
    options?: Partial<RTVIClientOptions>;
    onLLMJsonCompletion?: (jsonString: string) => void;
    onLLMFunctionCall?: (func: any) => void;
}
declare function CAIProvider({ children, clientType, options, onLLMJsonCompletion, onLLMFunctionCall, }: CAIProviderProps$1): react_jsx_runtime.JSX.Element;

interface AudioVisualizerProps {
    participantType?: "bot" | "local";
    barCount?: number;
    barGap?: number;
    barWidth?: number;
    barRadius?: number;
    barColor?: string;
    barGlowColor?: string;
    barMinHeight?: number;
    barMaxHeight?: number;
    sensitivity?: number;
    className?: string;
    containerClassName?: string;
    width?: string | number;
    height?: string | number;
    backgroundColor?: string;
    animationSpeed?: number;
    animationStyle?: "wave" | "equalizer" | "pulse";
    responsive?: boolean;
    visualizerStyle?: "bars" | "circles" | "line";
    glowIntensity?: number;
    containerStyle?: React.CSSProperties;
    canvasStyle?: React.CSSProperties;
}
declare const AudioVisualizer: ({ participantType, barCount, barGap, barWidth, barRadius, barColor, barGlowColor, barMinHeight, barMaxHeight, sensitivity, className, containerClassName, width, height, backgroundColor, animationSpeed, animationStyle, responsive, visualizerStyle, glowIntensity, containerStyle, canvasStyle, }: AudioVisualizerProps) => react_jsx_runtime.JSX.Element;

interface ConnectionManagerOptions {
    maxReconnectAttempts?: number;
    reconnectDelay?: number;
    maxReconnectDelay?: number;
    reconnectBackoffMultiplier?: number;
}
/**
 * Hook to manage connection state and automatic reconnection
 * with exponential backoff and jitter
 */
declare function useConnectionManager(options?: ConnectionManagerOptions): {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    clearError: () => void;
    isConnected: boolean;
    isConnecting: boolean;
    isReconnecting: boolean;
    reconnectAttempts: number;
    lastError: string | null;
    transportState: string;
};

interface Transcript {
    text: string;
    speaker: "user" | "bot";
    timestamp: number;
    final?: boolean;
}
interface TranscriptUpdate {
    type: "transcript_update";
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}
declare enum ConversationState {
    IDLE = "idle",
    USER_SPEAKING = "user_speaking",
    BOT_PROCESSING = "bot_processing",
    BOT_SPEAKING = "bot_speaking"
}
interface ConversationContext {
    state: ConversationState;
    isBotSpeaking: boolean;
    isUserSpeaking: boolean;
    isBotProcessing: boolean;
    transcripts: Transcript[];
    lastUserTranscript: string | null;
    lastBotTranscript: string | null;
    clearTranscripts: () => void;
    addTranscript: (transcript: Transcript) => void;
    handleTranscriptUpdate: (update: TranscriptUpdate) => void;
}
/**
 * A custom hook for managing conversation state
 * Tracks user/bot speaking states, processes transcripts,
 * and manages a state machine for the conversation flow.
 */
declare function useConversationState(): ConversationContext;

interface ChatMessage {
    id: string;
    type: 'user' | 'bot';
    text: string;
    timestamp: Date;
}
interface ChatContextType {
    messages: ChatMessage[];
    addMessage: (type: 'user' | 'bot', text: string) => void;
    clearMessages: () => void;
}
declare function ChatProvider({ children }: {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useChat(): ChatContextType;

interface ConnectionButtonProps {
    onConnect?: () => void;
    onDisconnect?: () => void;
    className?: string;
    isConnected?: boolean;
    onChange?: (isConnected: boolean) => void;
}
declare function ConnectionButton({ onConnect, onDisconnect, className, isConnected: externalIsConnected, onChange, }: ConnectionButtonProps): react_jsx_runtime.JSX.Element;

/**
 * Extended helper interface for CAI-specific functionality
 * Extends the base RTVIClientHelper interface from PipeCat
 */
interface CAIClientHelper extends RTVIClientHelper {
    handleLLMResponse: (response: any) => void;
    generatePrompt: (input: string) => string;
}
/**
 * Configuration options for the CAI client
 */
interface CAIClientConfig {
    llmModel?: string;
    maxTokens?: number;
    temperature?: number;
    apiKey?: string;
}
/**
 * Props for the CAI Provider component
 */
interface CAIProviderProps {
    children: React.ReactNode;
    config?: CAIClientConfig;
}
/**
 * CAI Chat Message interface
 */
interface CAIMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
}
/**
 * CAI Chat Session interface
 */
interface CAISession {
    id: string;
    messages: CAIMessage[];
    createdAt: number;
    updatedAt: number;
}

declare const log: {
    transport: {
        debug(message: string, data?: any): void;
        info(message: string, data?: any): void;
        warn(message: string, data?: any): void;
        error(message: string, data?: any): void;
    };
    audio: {
        debug(message: string, data?: any): void;
        info(message: string, data?: any): void;
        warn(message: string, data?: any): void;
        error(message: string, data?: any): void;
    };
    connection: {
        debug(message: string, data?: any): void;
        info(message: string, data?: any): void;
        warn(message: string, data?: any): void;
        error(message: string, data?: any): void;
    };
    ui: {
        debug(message: string, data?: any): void;
        info(message: string, data?: any): void;
        warn(message: string, data?: any): void;
        error(message: string, data?: any): void;
    };
    conversation: {
        debug(message: string, data?: any): void;
        info(message: string, data?: any): void;
        warn(message: string, data?: any): void;
        error(message: string, data?: any): void;
    };
    event: {
        debug(message: string, data?: any): void;
        info(message: string, data?: any): void;
        warn(message: string, data?: any): void;
        error(message: string, data?: any): void;
    };
    general: {
        debug(message: string, data?: any): void;
        info(message: string, data?: any): void;
        warn(message: string, data?: any): void;
        error(message: string, data?: any): void;
    };
};

declare function cn(...inputs: ClassValue[]): string;

export { AudioVisualizer, CAIClientConfig, CAIClientHelper, CAIMessage, CAIProvider, CAIProviderProps, CAISession, ChatProvider, ChatWindow, ConnectionButton, DebugDisplay, MicControl, cn, log, useChat, useConnectionManager, useConversationState };
