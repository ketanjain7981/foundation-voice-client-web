// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  CAIProvider, 
  useRTVIClientTransportState,
  RTVIClientAudio,  
  ChatWindow,
  AudioVisualizer,
  ChatProvider,
  ConnectionButton,
  MicControl
} from '@think41/foundation-voice-client-react'; // Update the import path
import { MessageSquare, ChevronDown } from 'lucide-react';

function PipecatWidget() {
  const transportState = useRTVIClientTransportState();
  const isConnected = ["connected", "ready"].includes(transportState);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (isConnected || transportState === "disconnected") {
      setIsConnecting(false);
    }
  }, [transportState, isConnected]);

  return (
    <>
      {/* Chat toggle button in top-left corner */}
      <div className="fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
        >
          {isChatOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <MessageSquare className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Connect button in top-right corner */}
      <div className="fixed top-4 right-4 z-50">
        <div className="rounded-lg shadow-lg p-2">
          <ConnectionButton />
        </div>
      </div>

      {/* Chat Window */}
      <div className={`fixed top-16 left-4 z-40 w-[90vw] max-w-sm h-[70vh] max-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-col ${
        isChatOpen ? 'flex' : 'hidden'
      }`}>
        <div className="flex-1 overflow-y-auto">
          <ChatWindow className="h-full"/>
        </div>
      </div>

      {/* Center positioned visualizer */}
      <div className="fixed inset-0 flex items-center justify-center">
        <AudioVisualizer 
          participantType="bot"
          containerClassName="w-64 h-64 bg-black/80 rounded-lg"
          barCount={5}
          barWidth={40}
          barGap={15}
          barColor="#ffffff"
          barGlowColor="rgba(250, 250, 250, 0.7)"
          visualizerStyle="bars"
        />
      </div>
      
      {/* Controls at bottom right */}
      <div className="fixed bottom-8 right-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
          <MicControl
            isActive={isConnected || isConnecting}
            className="w-auto"
            demoMode={false}
          />
        </div>
      </div>
      <RTVIClientAudio />
    </>
  );
}

export default function WebRTCApp() {
  return (
    <CAIProvider clientType="websocket">
      <ChatProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 pb-20 font-sans">
          <PipecatWidget />
        </div>
      </ChatProvider>
    </CAIProvider>
  );
}