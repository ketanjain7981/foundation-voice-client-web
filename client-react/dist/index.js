"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AudioVisualizer: () => AudioVisualizer,
  CAIProvider: () => CAIProvider,
  ChatProvider: () => ChatProvider,
  ChatWindow: () => ChatWindow,
  ConnectionButton: () => ConnectionButton,
  DebugDisplay: () => DebugDisplay,
  MicControl: () => MicControl,
  cn: () => cn,
  log: () => log,
  useChat: () => useChat,
  useConnectionManager: () => useConnectionManager,
  useConversationState: () => useConversationState
});
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("@pipecat-ai/client-react"), module.exports);

// src/components/chats/DebugDisplay.tsx
var import_react = require("react");
var import_foundation_voice_client_js = require("@think41/foundation-voice-client-js");
var import_client_react = require("@pipecat-ai/client-react");
var import_jsx_runtime = require("react/jsx-runtime");
function DebugDisplay({ className = "" }) {
  const debugLogRef = (0, import_react.useRef)(null);
  const client = (0, import_client_react.useRTVIClient)();
  const log2 = (0, import_react.useCallback)((message) => {
    if (!debugLogRef.current)
      return;
    const entry = document.createElement("div");
    entry.className = "text-xs font-mono py-1 border-b border-border/50";
    entry.textContent = `${(/* @__PURE__ */ new Date()).toLocaleTimeString()} - ${message}`;
    if (message.startsWith("User: ")) {
      entry.className += " text-blue-500";
    } else if (message.startsWith("Bot: ")) {
      entry.className += " text-green-500";
    } else if (message.includes("error") || message.includes("Error")) {
      entry.className += " text-red-500";
    } else if (message.includes("warning") || message.includes("Warning")) {
      entry.className += " text-yellow-500";
    }
    debugLogRef.current.appendChild(entry);
    debugLogRef.current.scrollTop = debugLogRef.current.scrollHeight;
  }, []);
  (0, import_client_react.useRTVIClientEvent)(
    import_foundation_voice_client_js.RTVIEvent.TransportStateChanged,
    (0, import_react.useCallback)(
      (state) => {
        log2(`Transport state changed: ${state}`);
      },
      [log2]
    )
  );
  (0, import_client_react.useRTVIClientEvent)(
    import_foundation_voice_client_js.RTVIEvent.BotConnected,
    (0, import_react.useCallback)(
      (participant) => {
        log2(`Bot connected: ${participant?.name || "unknown"}`);
      },
      [log2]
    )
  );
  (0, import_client_react.useRTVIClientEvent)(
    import_foundation_voice_client_js.RTVIEvent.BotDisconnected,
    (0, import_react.useCallback)(
      (participant) => {
        log2(`Bot disconnected: ${participant?.name || "unknown"}`);
      },
      [log2]
    )
  );
  (0, import_client_react.useRTVIClientEvent)(
    import_foundation_voice_client_js.RTVIEvent.TrackStarted,
    (0, import_react.useCallback)(
      (track, participant) => {
        log2(`${participant?.name || "Unknown"} started ${track.kind} track`);
      },
      [log2]
    )
  );
  (0, import_client_react.useRTVIClientEvent)(
    import_foundation_voice_client_js.RTVIEvent.TrackStopped,
    (0, import_react.useCallback)(
      (track, participant) => {
        log2(`${participant?.name || "Unknown"} stopped ${track.kind} track`);
      },
      [log2]
    )
  );
  (0, import_client_react.useRTVIClientEvent)(
    import_foundation_voice_client_js.RTVIEvent.BotReady,
    (0, import_react.useCallback)(() => {
      log2(`Bot is ready`);
      if (!client)
        return;
      const tracks = client.tracks();
      log2(
        `Available tracks: ${JSON.stringify({
          local: {
            audio: !!tracks.local.audio,
            video: !!tracks.local.video
          },
          bot: {
            audio: !!tracks.bot?.audio,
            video: !!tracks.bot?.video
          }
        })}`
      );
    }, [client, log2])
  );
  (0, import_client_react.useRTVIClientEvent)(
    import_foundation_voice_client_js.RTVIEvent.UserTranscript,
    (0, import_react.useCallback)(
      (data) => {
        if (data.final) {
          log2(`User: ${data.text}`);
        }
      },
      [log2]
    )
  );
  (0, import_client_react.useRTVIClientEvent)(
    import_foundation_voice_client_js.RTVIEvent.BotTranscript,
    (0, import_react.useCallback)(
      (data) => {
        log2(`Bot: ${data.text}`);
      },
      [log2]
    )
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `border rounded-lg overflow-hidden bg-background ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-3 border-b bg-muted/50", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "font-medium", children: "Debug Console" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: debugLogRef,
        className: "h-40 overflow-y-auto p-3 text-sm bg-background"
      }
    )
  ] });
}

// src/components/chats/ChatWindow.tsx
var import_react3 = require("react");
var import_foundation_voice_client_js2 = require("@think41/foundation-voice-client-js");
var import_client_react2 = require("@pipecat-ai/client-react");

// src/components/chats/ChatContext.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ChatContext = (0, import_react2.createContext)(void 0);
function ChatProvider({ children }) {
  const [messages, setMessages] = (0, import_react2.useState)([]);
  const addMessage = (0, import_react2.useCallback)((type, text) => {
    const newMessage = {
      id: Date.now().toString(),
      type,
      text,
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);
  const clearMessages = (0, import_react2.useCallback)(() => {
    setMessages([]);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChatContext.Provider, { value: { messages, addMessage, clearMessages }, children });
}
function useChat() {
  const context = (0, import_react2.useContext)(ChatContext);
  if (context === void 0) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

// src/components/chats/ChatWindow.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function ChatWindow({
  className = "w-full h-full",
  initialMessages = [],
  userMessageClassName = "bg-violet-600 text-black rounded-l-lg rounded-br-lg",
  botMessageClassName = "bg-white text-neutral-800 rounded-r-lg rounded-bl-lg",
  submitButtonClassName = "bg-violet-600 text-black hover:bg-violet-700 focus:ring-violet-500"
}) {
  const { messages, addMessage, clearMessages } = useChat();
  const [inputValue, setInputValue] = (0, import_react3.useState)("");
  const [isConnected, setIsConnected] = (0, import_react3.useState)(false);
  const messagesEndRef = (0, import_react3.useRef)(null);
  const client = (0, import_client_react2.useRTVIClient)();
  const hasInitialized = (0, import_react3.useRef)(false);
  const scrollToBottom = (0, import_react3.useCallback)(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  (0, import_react3.useEffect)(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);
  (0, import_client_react2.useRTVIClientEvent)(
    import_foundation_voice_client_js2.RTVIEvent.TransportStateChanged,
    (0, import_react3.useCallback)((state) => {
      setIsConnected(state === "ready");
    }, [])
  );
  (0, import_client_react2.useRTVIClientEvent)(
    import_foundation_voice_client_js2.RTVIEvent.UserTranscript,
    (0, import_react3.useCallback)(
      (data) => {
        if (data.final && data.text.trim()) {
          console.log("UserTranscript", data);
          addMessage("user", data.text);
        }
      },
      [addMessage]
    )
  );
  (0, import_client_react2.useRTVIClientEvent)(
    import_foundation_voice_client_js2.RTVIEvent.BotTranscript,
    (0, import_react3.useCallback)(
      (data) => {
        console.log("BotTranscript", data);
        if (data.text.trim()) {
          addMessage("bot", data.text);
        }
      },
      [addMessage]
    )
  );
  (0, import_react3.useEffect)(() => {
    if (!hasInitialized.current && initialMessages.length > 0) {
      clearMessages();
      initialMessages.forEach((msg) => {
        addMessage(msg.type, msg.text);
      });
      hasInitialized.current = true;
    }
  }, [initialMessages, addMessage, clearMessages]);
  const sendTextMessage = (0, import_react3.useCallback)(async () => {
    if (!client || !inputValue.trim() || !isConnected)
      return;
    const messageText = inputValue.trim();
    setInputValue("");
    addMessage("user", messageText);
    try {
      const llmHelper = client.getHelper("llm");
      if (!llmHelper) {
        throw new Error("LLM helper is not available");
      }
      await llmHelper.appendToMessages(
        {
          role: "user",
          content: messageText
        },
        true
      );
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage("bot", "Sorry, I encountered an error processing your message. Please try again.");
    }
  }, [client, inputValue, isConnected, addMessage]);
  const handleSubmit = (0, import_react3.useCallback)((e) => {
    e.preventDefault();
    sendTextMessage();
  }, [sendTextMessage]);
  const handleKeyPress = (0, import_react3.useCallback)((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  }, [sendTextMessage]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `flex flex-col bg-[oklch(0.278_0.033_256.848)] overflow-hidden ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0 w-[calc(100%+1rem)] -mr-4 pr-4 no-scrollbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("style", { dangerouslySetInnerHTML: { __html: `
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        ` } }),
      messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-center text-neutral-500 py-8", children: "Start a conversation by typing a message below or speaking." }) : messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: `flex flex-col ${message.type === "user" ? "items-end" : "items-start"}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `text-xs font-medium mb-1 ${message.type === "user" ? "text-violet-300" : "text-neutral-300"}`, children: message.type === "user" ? "You" : "Assistant" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-start gap-2.5", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: `flex flex-col max-w-[75%] sm:max-w-[70%] ${message.type === "user" ? "items-end" : "items-start"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "div",
                    {
                      className: `px-3 py-2 text-sm ${message.type === "user" ? userMessageClassName : botMessageClassName}`,
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: message.text })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-neutral-400 mt-1 px-1", children: message.timestamp.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                  }).toLowerCase() })
                ]
              }
            ) })
          ]
        },
        message.id
      )),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ref: messagesEndRef })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "p-4 border-t border-neutral-700 bg-[oklch(0.278_0.033_256.848)]", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { onSubmit: handleSubmit, className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          type: "text",
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyPress: handleKeyPress,
          placeholder: isConnected ? "Type your message..." : "Connecting to chat...",
          disabled: !isConnected,
          className: "flex-1 px-3 py-2 border border-neutral-600 rounded-md bg-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 disabled:opacity-60 disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "submit",
          disabled: !isConnected || !inputValue.trim(),
          className: `px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${submitButtonClassName}`,
          children: "Send"
        }
      )
    ] }) })
  ] });
}

// src/components/controls/MicControl.tsx
var import_react4 = require("react");
var import_lucide_react = require("lucide-react");

// src/utils/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/controls/MicControl.tsx
var import_client_react3 = require("@pipecat-ai/client-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function MicControl({
  onStart,
  onStop,
  visualizerBars = 48,
  demoMode = false,
  demoInterval = 3e3,
  className,
  isActive,
  onChange
}) {
  const [internalSubmitted, setInternalSubmitted] = (0, import_react4.useState)(false);
  const [isConnecting, setIsConnecting] = (0, import_react4.useState)(false);
  const [time, setTime] = (0, import_react4.useState)(0);
  const [isClient, setIsClient] = (0, import_react4.useState)(false);
  const [isDemo, setIsDemo] = (0, import_react4.useState)(demoMode);
  const client = (0, import_client_react3.useRTVIClient)();
  const submitted = isActive !== void 0 ? isActive : internalSubmitted;
  (0, import_react4.useEffect)(() => {
    if (!client)
      return;
    const handleMicState = async () => {
      try {
        const isMicActive = client.isMicEnabled;
        if (isActive === void 0) {
          setInternalSubmitted(isMicActive);
        }
        onChange?.(isMicActive);
      } catch (error) {
        console.error("Error getting mic state:", error);
      }
    };
    handleMicState();
    const intervalId = setInterval(handleMicState, 1e3);
    return () => clearInterval(intervalId);
  }, [client, isActive, onChange]);
  (0, import_react4.useEffect)(() => {
    setIsClient(true);
    const initMicState = async () => {
      if (client) {
        try {
          const micState = client.isMicEnabled;
          if (isActive === void 0) {
            setInternalSubmitted(micState);
          }
        } catch (error) {
          console.error("Failed to get initial mic state:", error);
        }
      }
    };
    initMicState();
  }, [client, isActive]);
  (0, import_react4.useEffect)(() => {
    let intervalId;
    if (submitted) {
      onStart?.();
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1e3);
    } else if (time > 0) {
      onStop?.(time);
      setTime(0);
    }
    return () => clearInterval(intervalId);
  }, [submitted, time, onStart, onStop]);
  (0, import_react4.useEffect)(() => {
    if (!isDemo)
      return;
    let timeoutId;
    const runAnimation = () => {
      const newState = true;
      if (onChange) {
        onChange(newState);
      } else {
        setInternalSubmitted(newState);
      }
      timeoutId = setTimeout(() => {
        if (onChange) {
          onChange(false);
        } else {
          setInternalSubmitted(false);
        }
        timeoutId = setTimeout(runAnimation, 1e3);
      }, demoInterval);
    };
    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo, demoInterval, onChange]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const handleClick = (0, import_react4.useCallback)(async () => {
    if (isDemo) {
      setIsDemo(false);
      if (onChange) {
        onChange(false);
      } else {
        setInternalSubmitted(false);
      }
      return;
    }
    const newState = !submitted;
    try {
      setIsConnecting(true);
      if (client) {
        await client.enableMic(newState);
      } else if (onChange) {
        onChange(newState);
      } else {
        setInternalSubmitted(newState);
      }
    } catch (error) {
      console.error("Error toggling mic:", error);
      if (onChange) {
        onChange(!newState);
      } else {
        setInternalSubmitted(!newState);
      }
    } finally {
      setIsConnecting(false);
    }
  }, [client, isDemo, onChange, submitted]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: cn("w-full py-4", className), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative max-w-xl w-full mx-auto flex items-center flex-col gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "button",
      {
        className: cn(
          "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
          submitted ? "bg-none" : "bg-none hover:bg-black/10 dark:hover:bg-white/10",
          isConnecting ? "opacity-50 cursor-not-allowed" : ""
        ),
        type: "button",
        onClick: handleClick,
        disabled: isConnecting,
        children: isConnecting ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "div",
          {
            className: "w-6 h-6 rounded-sm animate-spin bg-black dark:bg-white cursor-pointer pointer-events-auto",
            style: { animationDuration: "3s" }
          }
        ) : submitted ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-6 h-6 rounded-full bg-red-500 animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react.Mic, { className: "w-6 h-6 text-black/70 dark:text-white/70" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "span",
      {
        className: cn(
          "font-mono text-sm transition-opacity duration-300",
          submitted || isConnecting ? "text-black/70 dark:text-white/70" : "text-black/30 dark:text-white/30"
        ),
        children: formatTime(time)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-4 w-64 flex items-center justify-center gap-0.5", children: [...Array(visualizerBars)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        className: cn(
          "w-0.5 rounded-full transition-all duration-300",
          submitted || isConnecting ? "bg-black/50 dark:bg-white/50 animate-pulse" : "bg-black/10 dark:bg-white/10 h-1"
        ),
        style: (submitted || isConnecting) && isClient ? {
          height: `${20 + Math.random() * 80}%`,
          animationDelay: `${i * 0.05}s`
        } : void 0
      },
      i
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "h-4 text-xs text-black/70 dark:text-white/70", children: isConnecting ? "Processing..." : submitted ? "Listening..." : "Click to speak" })
  ] }) });
}

// src/components/provider/CAIProvider.tsx
var import_client_react4 = require("@pipecat-ai/client-react");
var import_foundation_voice_client_js3 = require("@think41/foundation-voice-client-js");
var import_react5 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function CAIProvider({
  children,
  clientType = "websocket",
  options,
  onLLMJsonCompletion,
  onLLMFunctionCall
}) {
  const [client, setClient] = (0, import_react5.useState)();
  const initializeLLMHelper = (0, import_react5.useCallback)((client2) => {
    if (!client2.getHelper("llm")) {
      const llmHelper = new import_foundation_voice_client_js3.LLMHelper({
        callbacks: {
          onLLMJsonCompletion: (jsonString) => {
            console.log("LLM JSON Completion:", jsonString);
            onLLMJsonCompletion?.(jsonString);
          },
          onLLMFunctionCall: (func) => {
            console.log("LLM Function Call:", func);
            onLLMFunctionCall?.(func);
          }
        }
      });
      client2.registerHelper("llm", llmHelper);
    }
  }, [onLLMJsonCompletion, onLLMFunctionCall]);
  (0, import_react5.useEffect)(() => {
    const fetchClient = async () => {
      const client2 = await (0, import_foundation_voice_client_js3.createRTVIClient)(clientType, options);
      initializeLLMHelper(client2);
      setClient(client2);
    };
    fetchClient();
  }, [clientType, options, initializeLLMHelper]);
  if (!client)
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_client_react4.RTVIClientProvider, { client, children });
}

// src/components/visualizer/audio-visualizer.tsx
var import_react6 = require("react");
var import_client_react5 = require("@pipecat-ai/client-react");
var import_foundation_voice_client_js4 = require("@think41/foundation-voice-client-js");
var import_jsx_runtime6 = require("react/jsx-runtime");
var AudioVisualizer = ({
  participantType = "bot",
  barCount = 5,
  barGap = 10,
  barWidth = 40,
  barRadius = 20,
  barColor = "#FFFFFF",
  barGlowColor = "rgba(255, 255, 255, 0.7)",
  barMinHeight = 20,
  barMaxHeight = 100,
  sensitivity = 1.5,
  className,
  containerClassName,
  // Initialize new props with defaults
  width = "100%",
  height = "100%",
  backgroundColor = "transparent",
  animationSpeed = 0.1,
  animationStyle = "wave",
  responsive = true,
  visualizerStyle = "bars",
  glowIntensity = 15,
  containerStyle = {},
  canvasStyle = {}
}) => {
  const canvasRef = (0, import_react6.useRef)(null);
  const [audioContext, setAudioContext] = (0, import_react6.useState)(null);
  const [analyser, setAnalyser] = (0, import_react6.useState)(null);
  const [dataArray, setDataArray] = (0, import_react6.useState)(null);
  const animationRef = (0, import_react6.useRef)(0);
  const [isActive, setIsActive] = (0, import_react6.useState)(false);
  const [isBotSpeaking, setIsBotSpeaking] = (0, import_react6.useState)(false);
  const audioTrack = (0, import_client_react5.useRTVIClientMediaTrack)("audio", participantType);
  (0, import_client_react5.useRTVIClientEvent)(
    import_foundation_voice_client_js4.RTVIEvent.BotStartedSpeaking,
    () => {
      console.log("Bot speaking started in visualizer");
      setIsBotSpeaking(true);
    }
  );
  (0, import_client_react5.useRTVIClientEvent)(
    import_foundation_voice_client_js4.RTVIEvent.BotStoppedSpeaking,
    () => {
      console.log("Bot speaking ended in visualizer");
      setIsBotSpeaking(false);
    }
  );
  (0, import_react6.useEffect)(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
    const analyserNode = context.createAnalyser();
    analyserNode.fftSize = 1024;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArr = new Uint8Array(bufferLength);
    setAnalyser(analyserNode);
    setDataArray(dataArr);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (context.state !== "closed") {
        context.close();
      }
    };
  }, []);
  (0, import_react6.useEffect)(() => {
    if (!audioTrack || !audioContext || !analyser)
      return;
    try {
      if (audioTrack) {
        const source = audioContext.createMediaStreamSource(new MediaStream([audioTrack]));
        source.connect(analyser);
        setIsActive(true);
      }
    } catch (error) {
      console.error("Error connecting to audio stream:", error);
    }
    return () => {
      setIsActive(false);
    };
  }, [audioTrack, audioContext, analyser]);
  (0, import_react6.useEffect)(() => {
    if (!canvasRef.current || !analyser || !dataArray)
      return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    let animationTime = 0;
    const draw = () => {
      animationTime += animationSpeed;
      if (responsive) {
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      } else {
        canvas.width = typeof width === "number" ? width : parseInt(width) || 300;
        canvas.height = typeof height === "number" ? height : parseInt(height) || 150;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      const totalWidth = barWidth * barCount + barGap * (barCount - 1);
      const startX = (canvas.width - totalWidth) / 2;
      const centerY = canvas.height / 2;
      analyser.getByteFrequencyData(dataArray);
      if (visualizerStyle === "bars") {
        drawBars(ctx, dataArray, startX, centerY, canvas.width, canvas.height, animationTime);
      } else if (visualizerStyle === "circles") {
        drawCircles(ctx, dataArray, canvas.width, canvas.height, animationTime);
      } else if (visualizerStyle === "line") {
        drawLine(ctx, dataArray, canvas.width, canvas.height, animationTime);
      }
      animationRef.current = requestAnimationFrame(draw);
    };
    const drawBars = (ctx2, dataArray2, startX, centerY, canvasWidth, canvasHeight, animationTime2) => {
      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor(i * (dataArray2.length / barCount));
        let value = 0;
        if (participantType === "local") {
          value = dataArray2[dataIndex];
        } else if (participantType === "bot" && isBotSpeaking) {
          if (animationStyle === "wave") {
            const phase = i / barCount * Math.PI;
            value = 50 + 150 * Math.abs(Math.sin(animationTime2 + phase));
          } else if (animationStyle === "equalizer") {
            value = 50 + 150 * Math.abs(Math.sin(animationTime2 * (i + 1) * 0.3));
          } else if (animationStyle === "pulse") {
            value = 50 + 150 * Math.abs(Math.sin(animationTime2));
          }
        } else {
          value = 10;
        }
        const normalizedValue = value / 255;
        const barHeight = barMinHeight + normalizedValue * (barMaxHeight - barMinHeight) * sensitivity;
        const x = startX + i * (barWidth + barGap);
        ctx2.save();
        ctx2.shadowColor = barGlowColor;
        ctx2.shadowBlur = glowIntensity;
        ctx2.fillStyle = barColor;
        ctx2.beginPath();
        ctx2.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, barRadius);
        ctx2.fill();
        ctx2.restore();
      }
    };
    const drawCircles = (ctx2, dataArray2, canvasWidth, canvasHeight, animationTime2) => {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor(i * (dataArray2.length / barCount));
        let value = 0;
        if (participantType === "local") {
          value = dataArray2[dataIndex];
        } else if (participantType === "bot" && isBotSpeaking) {
          if (animationStyle === "wave") {
            const phase = i / barCount * Math.PI * 2;
            value = 50 + 150 * Math.abs(Math.sin(animationTime2 + phase));
          } else if (animationStyle === "equalizer") {
            value = 50 + 150 * Math.abs(Math.sin(animationTime2 * (i + 1) * 0.3));
          } else if (animationStyle === "pulse") {
            value = 50 + 150 * Math.abs(Math.sin(animationTime2));
          }
        } else {
          value = 10;
        }
        const normalizedValue = value / 255;
        const radius = barMinHeight + normalizedValue * (barMaxHeight - barMinHeight) * sensitivity / 2;
        const angle = i / barCount * Math.PI * 2;
        const distance = radius * 2;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        ctx2.save();
        ctx2.shadowColor = barGlowColor;
        ctx2.shadowBlur = glowIntensity;
        ctx2.fillStyle = barColor;
        ctx2.beginPath();
        ctx2.arc(x, y, radius, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.restore();
      }
    };
    const drawLine = (ctx2, dataArray2, canvasWidth, canvasHeight, animationTime2) => {
      ctx2.save();
      ctx2.strokeStyle = barColor;
      ctx2.lineWidth = barWidth / 4;
      ctx2.shadowColor = barGlowColor;
      ctx2.shadowBlur = glowIntensity;
      ctx2.beginPath();
      const points = barCount * 2;
      for (let i = 0; i <= points; i++) {
        const dataIndex = Math.floor(i * (dataArray2.length / points));
        let value = 0;
        if (participantType === "local") {
          value = dataArray2[dataIndex];
        } else if (participantType === "bot" && isBotSpeaking) {
          if (animationStyle === "wave") {
            const phase = i / points * Math.PI * 4;
            value = 50 + 150 * Math.sin(animationTime2 + phase);
          } else if (animationStyle === "equalizer") {
            value = 50 + 150 * Math.sin(animationTime2 * (i + 1) * 0.1);
          } else if (animationStyle === "pulse") {
            value = 50 + 150 * Math.sin(animationTime2);
          }
        } else {
          value = 10;
        }
        const normalizedValue = value / 255;
        const amplitude = (barMaxHeight - barMinHeight) * sensitivity;
        const y = canvasHeight / 2 + normalizedValue * amplitude * (Math.random() > 0.5 ? 1 : -1);
        const x = canvasWidth / points * i;
        if (i === 0) {
          ctx2.moveTo(x, y);
        } else {
          ctx2.lineTo(x, y);
        }
      }
      ctx2.stroke();
      ctx2.restore();
    };
    draw();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    analyser,
    dataArray,
    isActive,
    barCount,
    barGap,
    barWidth,
    barRadius,
    barColor,
    barGlowColor,
    barMinHeight,
    barMaxHeight,
    sensitivity,
    isBotSpeaking,
    participantType,
    // Add new dependencies
    width,
    height,
    backgroundColor,
    animationSpeed,
    animationStyle,
    responsive,
    visualizerStyle,
    glowIntensity
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "div",
    {
      className: cn("relative", containerClassName),
      style: {
        width,
        height,
        ...containerStyle
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          className: cn("w-full h-full rounded-lg overflow-hidden", className),
          style: { background: backgroundColor !== "transparent" ? void 0 : "black" },
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "canvas",
            {
              ref: canvasRef,
              className: "w-full h-full",
              style: canvasStyle
            }
          )
        }
      )
    }
  );
};

// src/hooks/useConnectionManager.ts
var import_react7 = require("react");
var import_client_react6 = require("@pipecat-ai/client-react");
var import_foundation_voice_client_js5 = require("@think41/foundation-voice-client-js");
function useConnectionManager(options = {}) {
  const client = (0, import_client_react6.useRTVIClient)();
  const transportState = (0, import_client_react6.useRTVIClientTransportState)();
  const {
    maxReconnectAttempts = 5,
    reconnectDelay = 1e3,
    maxReconnectDelay = 3e4,
    reconnectBackoffMultiplier = 1.5
  } = options;
  const [connectionState, setConnectionState] = (0, import_react7.useState)({
    isConnected: false,
    isConnecting: false,
    isReconnecting: false,
    reconnectAttempts: 0,
    lastError: null,
    transportState: transportState || "disconnected"
  });
  (0, import_react7.useEffect)(() => {
    if (!transportState)
      return;
    setConnectionState((prev) => ({
      ...prev,
      transportState,
      isConnected: transportState === "connected" || transportState === "ready",
      isConnecting: transportState === "connecting",
      // Keep reconnecting flag if it's already set, otherwise false
      isReconnecting: prev.isReconnecting && transportState === "connecting"
    }));
    if (transportState === "connected" || transportState === "ready") {
      setConnectionState((prev) => ({
        ...prev,
        reconnectAttempts: 0,
        isReconnecting: false
      }));
    }
  }, [transportState]);
  const calculateReconnectDelay = (0, import_react7.useCallback)(
    (attempts) => {
      const baseDelay = reconnectDelay * Math.pow(reconnectBackoffMultiplier, attempts);
      const jitter = 0.8 + Math.random() * 0.4;
      return Math.min(baseDelay * jitter, maxReconnectDelay);
    },
    [reconnectDelay, reconnectBackoffMultiplier, maxReconnectDelay]
  );
  (0, import_react7.useEffect)(() => {
    if (!client)
      return;
    const handleDisconnect = () => {
      if (connectionState.isConnected && connectionState.reconnectAttempts < maxReconnectAttempts) {
        const nextAttempt = connectionState.reconnectAttempts + 1;
        const delay = calculateReconnectDelay(nextAttempt);
        console.log(
          `[Connection] Attempting reconnect ${nextAttempt}/${maxReconnectAttempts} in ${delay}ms`
        );
        setConnectionState((prev) => ({
          ...prev,
          isReconnecting: true,
          reconnectAttempts: nextAttempt
        }));
        setTimeout(() => {
          if (client) {
            console.log("[Connection] Executing reconnect attempt");
            client.connect().catch((error) => {
              setConnectionState((prev) => ({
                ...prev,
                lastError: `Reconnection failed: ${error.message || "Unknown error"}`
              }));
            });
          }
        }, delay);
      } else if (connectionState.reconnectAttempts >= maxReconnectAttempts) {
        console.log("[Connection] Maximum reconnect attempts reached");
        setConnectionState((prev) => ({
          ...prev,
          isReconnecting: false,
          lastError: "Maximum reconnection attempts reached"
        }));
      }
    };
    const handleError = (error) => {
      console.error("[Connection] Error:", error);
      setConnectionState((prev) => ({
        ...prev,
        lastError: error?.message || "Unknown error"
      }));
    };
    client.on(import_foundation_voice_client_js5.RTVIEvent.Disconnected, handleDisconnect);
    client.on(import_foundation_voice_client_js5.RTVIEvent.Error, handleError);
    return () => {
      client.off(import_foundation_voice_client_js5.RTVIEvent.Disconnected, handleDisconnect);
      client.off(import_foundation_voice_client_js5.RTVIEvent.Error, handleError);
    };
  }, [
    client,
    connectionState.isConnected,
    connectionState.reconnectAttempts,
    maxReconnectAttempts,
    calculateReconnectDelay
  ]);
  const connect = (0, import_react7.useCallback)(async () => {
    if (!client)
      return;
    try {
      setConnectionState((prev) => ({
        ...prev,
        isConnecting: true,
        lastError: null
      }));
      await client.connect();
      setConnectionState((prev) => ({
        ...prev,
        isConnecting: false,
        reconnectAttempts: 0
      }));
    } catch (error) {
      console.error("[Connection] Connection failed:", error);
      setConnectionState((prev) => ({
        ...prev,
        isConnecting: false,
        lastError: error.message || "Connection failed"
      }));
    }
  }, [client]);
  const disconnect = (0, import_react7.useCallback)(async () => {
    if (!client)
      return;
    try {
      await client.disconnect();
      setConnectionState((prev) => ({
        ...prev,
        isConnected: false,
        isConnecting: false,
        isReconnecting: false
      }));
    } catch (error) {
      console.error("[Connection] Disconnect failed:", error);
    }
  }, [client]);
  const clearError = (0, import_react7.useCallback)(() => {
    setConnectionState((prev) => ({
      ...prev,
      lastError: null
    }));
  }, []);
  return {
    ...connectionState,
    connect,
    disconnect,
    clearError
  };
}

// src/hooks/useConversationState.ts
var import_react8 = require("react");
var import_client_react7 = require("@pipecat-ai/client-react");
var import_foundation_voice_client_js6 = require("@think41/foundation-voice-client-js");

// src/utils/logger.ts
var LOG_LEVEL_ENABLED = {
  debug: process.env.NODE_ENV !== "production",
  info: true,
  warn: true,
  error: true
};
var CATEGORY_ENABLED = {
  transport: true,
  audio: true,
  connection: true,
  ui: true,
  conversation: true,
  event: true,
  general: true
};
var LOG_LEVEL_STYLES = {
  debug: "color: #6b7280",
  // gray
  info: "color: #3b82f6",
  // blue
  warn: "color: #f59e0b",
  // amber
  error: "color: #ef4444"
  // red
};
var CATEGORY_STYLES = {
  transport: "color: #8b5cf6",
  // purple
  audio: "color: #10b981",
  // green
  connection: "color: #f59e0b",
  // amber
  ui: "color: #3b82f6",
  // blue
  conversation: "color: #ec4899",
  // pink
  event: "color: #6366f1",
  // indigo
  general: "color: #6b7280"
  // gray
};
function formatLogMessage(level, category, message, data) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString().substring(11, 23);
  const formatStr = `%c[${timestamp}] [${category.toUpperCase()}] %c${message}`;
  const categoryStyle = CATEGORY_STYLES[category];
  const levelStyle = LOG_LEVEL_STYLES[level];
  return [formatStr, categoryStyle, levelStyle, data];
}
function shouldLog(level, category) {
  return LOG_LEVEL_ENABLED[level] && CATEGORY_ENABLED[category];
}
function createLogger(category) {
  return {
    debug(message, data) {
      if (shouldLog("debug", category)) {
        console.debug(...formatLogMessage("debug", category, message, data));
      }
    },
    info(message, data) {
      if (shouldLog("info", category)) {
        console.info(...formatLogMessage("info", category, message, data));
      }
    },
    warn(message, data) {
      if (shouldLog("warn", category)) {
        console.warn(...formatLogMessage("warn", category, message, data));
      }
    },
    error(message, data) {
      if (shouldLog("error", category)) {
        console.error(...formatLogMessage("error", category, message, data));
      }
    }
  };
}
var log = {
  transport: createLogger("transport"),
  audio: createLogger("audio"),
  connection: createLogger("connection"),
  ui: createLogger("ui"),
  conversation: createLogger("conversation"),
  event: createLogger("event"),
  general: createLogger("general")
};

// src/hooks/useConversationState.ts
function useConversationState() {
  const client = (0, import_client_react7.useRTVIClient)();
  const [currentState, setCurrentState] = (0, import_react8.useState)(
    "idle" /* IDLE */
  );
  const [isBotSpeaking, setIsBotSpeaking] = (0, import_react8.useState)(false);
  const [isUserSpeaking, setIsUserSpeaking] = (0, import_react8.useState)(false);
  const [isBotProcessing, setIsBotProcessing] = (0, import_react8.useState)(false);
  const [transcripts, setTranscripts] = (0, import_react8.useState)([]);
  const [lastUserTranscript, setLastUserTranscript] = (0, import_react8.useState)(
    null
  );
  const [lastBotTranscript, setLastBotTranscript] = (0, import_react8.useState)(
    null
  );
  const transitionTo = (newState) => {
    setCurrentState(newState);
  };
  (0, import_client_react7.useRTVIClientEvent)(import_foundation_voice_client_js6.RTVIEvent.BotStartedSpeaking, () => {
    setIsBotSpeaking(true);
    log.conversation.info("Bot started speaking (RTVIEvent)");
    transitionTo("bot_speaking" /* BOT_SPEAKING */);
  });
  (0, import_client_react7.useRTVIClientEvent)(import_foundation_voice_client_js6.RTVIEvent.BotStoppedSpeaking, () => {
    setIsBotSpeaking(false);
    log.conversation.info("Bot stopped speaking (RTVIEvent)");
    transitionTo("idle" /* IDLE */);
  });
  (0, import_react8.useEffect)(() => {
    const handleBotStartedSpeaking = () => {
      setIsBotSpeaking(true);
      log.conversation.info("Bot started speaking (custom event)");
      transitionTo("bot_speaking" /* BOT_SPEAKING */);
    };
    const handleBotStoppedSpeaking = () => {
      setIsBotSpeaking(false);
      log.conversation.info("Bot stopped speaking (custom event)");
      transitionTo("idle" /* IDLE */);
    };
    window.addEventListener("bot-started-speaking", handleBotStartedSpeaking);
    window.addEventListener("bot-stopped-speaking", handleBotStoppedSpeaking);
    return () => {
      window.removeEventListener(
        "bot-started-speaking",
        handleBotStartedSpeaking
      );
      window.removeEventListener(
        "bot-stopped-speaking",
        handleBotStoppedSpeaking
      );
    };
  }, []);
  (0, import_client_react7.useRTVIClientEvent)(import_foundation_voice_client_js6.RTVIEvent.UserStartedSpeaking, () => {
    setIsUserSpeaking(true);
    log.conversation.info("User started speaking");
    transitionTo("user_speaking" /* USER_SPEAKING */);
  });
  (0, import_client_react7.useRTVIClientEvent)(import_foundation_voice_client_js6.RTVIEvent.UserStoppedSpeaking, () => {
    setIsUserSpeaking(false);
    log.conversation.info("User stopped speaking");
    transitionTo("bot_processing" /* BOT_PROCESSING */);
    setIsBotProcessing(true);
  });
  (0, import_client_react7.useRTVIClientEvent)(import_foundation_voice_client_js6.RTVIEvent.BotLlmStarted, () => {
    setIsBotProcessing(true);
  });
  (0, import_client_react7.useRTVIClientEvent)(import_foundation_voice_client_js6.RTVIEvent.BotLlmStopped, () => {
    setIsBotProcessing(false);
  });
  (0, import_client_react7.useRTVIClientEvent)(import_foundation_voice_client_js6.RTVIEvent.UserTranscript, (data) => {
    if (data?.text) {
      const transcript = {
        text: data.text,
        speaker: "user",
        timestamp: Date.now(),
        final: data.final || false
      };
      if (data.final) {
        setLastUserTranscript(data.text);
        setTranscripts((prev) => [...prev, transcript]);
      }
    }
  });
  (0, import_client_react7.useRTVIClientEvent)(import_foundation_voice_client_js6.RTVIEvent.BotTranscript, (data) => {
    if (data?.text) {
      const transcript = {
        text: data.text,
        speaker: "bot",
        timestamp: Date.now(),
        final: true
      };
      setLastBotTranscript(data.text);
      setTranscripts((prev) => [...prev, transcript]);
    }
  });
  const clearTranscripts = () => {
    setTranscripts([]);
    setLastUserTranscript(null);
    setLastBotTranscript(null);
  };
  const addTranscript = (transcript) => {
    setTranscripts((prev) => [...prev, transcript]);
    if (transcript.speaker === "user") {
      setLastUserTranscript(transcript.text);
    } else {
      setLastBotTranscript(transcript.text);
    }
  };
  const handleTranscriptUpdate = (update) => {
    const timestamp = new Date(update.timestamp).getTime();
    const isAssistant = update.role === "assistant";
    const transcript = {
      text: update.content,
      speaker: isAssistant ? "bot" : "user",
      timestamp,
      final: true
    };
    if (isAssistant) {
      setLastBotTranscript(update.content);
    } else {
      setLastUserTranscript(update.content);
    }
    setTranscripts((prev) => {
      const exists = prev.some(
        (t) => t.text === update.content && t.speaker === (isAssistant ? "bot" : "user") && Math.abs(t.timestamp - timestamp) < 1e3
        // Allow 1 second tolerance
      );
      if (exists) {
        return prev;
      }
      return [...prev, transcript];
    });
    log.conversation.info(
      `Received transcript update - ${update.role}: ${update.content}`
    );
  };
  return {
    state: currentState,
    isBotSpeaking,
    isUserSpeaking,
    isBotProcessing,
    transcripts,
    lastUserTranscript,
    lastBotTranscript,
    clearTranscripts,
    addTranscript,
    handleTranscriptUpdate
  };
}

// src/components/controls/Connect.tsx
var import_react9 = require("react");
var import_client_react8 = require("@pipecat-ai/client-react");
var import_foundation_voice_client_js7 = require("@think41/foundation-voice-client-js");
var import_jsx_runtime7 = require("react/jsx-runtime");
function ConnectionButton({
  onConnect,
  onDisconnect,
  className = "",
  isConnected: externalIsConnected,
  onChange
}) {
  const client = (0, import_client_react8.useRTVIClient)();
  const [internalConnected, setInternalConnected] = (0, import_react9.useState)(false);
  const [isConnecting, setIsConnecting] = (0, import_react9.useState)(false);
  const connected = externalIsConnected !== void 0 ? externalIsConnected : internalConnected;
  (0, import_client_react8.useRTVIClientEvent)(import_foundation_voice_client_js7.RTVIEvent.Connected, () => {
    setInternalConnected(true);
    setIsConnecting(false);
    onChange?.(true);
  });
  (0, import_client_react8.useRTVIClientEvent)(import_foundation_voice_client_js7.RTVIEvent.Disconnected, () => {
    setInternalConnected(false);
    setIsConnecting(false);
    onChange?.(false);
  });
  const handleClick = (0, import_react9.useCallback)(async () => {
    const newState = !connected;
    try {
      setIsConnecting(true);
      if (newState) {
        onConnect?.();
        await client?.connect();
      } else {
        onDisconnect?.();
        await client?.disconnect();
      }
    } catch (error) {
      console.error("Connection toggle error:", error);
      setIsConnecting(false);
    }
  }, [client, connected, onChange, onConnect, onDisconnect]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "button",
    {
      onClick: handleClick,
      disabled: isConnecting,
      className: `px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 shadow-md ${isConnecting ? "bg-gray-400 cursor-not-allowed text-white opacity-75" : connected ? "bg-red-600 hover:bg-red-700 text-white shadow-lg" : "bg-gray-800 hover:bg-gray-900 text-white shadow-lg"} ${className}`,
      children: isConnecting ? "Connecting..." : connected ? "Disconnect" : "Connect"
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioVisualizer,
  CAIProvider,
  ChatProvider,
  ChatWindow,
  ConnectionButton,
  DebugDisplay,
  MicControl,
  cn,
  log,
  useChat,
  useConnectionManager,
  useConversationState,
  ...require("@pipecat-ai/client-react")
});
//# sourceMappingURL=index.js.map