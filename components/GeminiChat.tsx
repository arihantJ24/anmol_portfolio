import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I am Anmol's virtual avatar. Ask me about his experience in Web3, Marketing, or Crypto." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages.concat(userMessage), userMessage.text);

    const botMessage: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center bg-white hover:bg-neutral-200 text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-110"
        >
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[550px] flex flex-col bg-[#0a0a0a] rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 duration-300 overflow-hidden border border-neutral-800">
          {/* Header */}
          <div className="bg-neutral-900 p-4 flex justify-between items-center border-b border-neutral-800">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                 <Bot className="w-5 h-5 text-white" />
               </div>
               <div>
                 <h4 className="font-bold text-white text-sm">Anmol AI</h4>
                 <span className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Online
                 </span>
               </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors p-2"
            >
                <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-neutral-800 text-white rounded-br-none' 
                      : 'bg-neutral-900 text-gray-300 rounded-bl-none border border-neutral-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                   <div className="bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-gray-500">
                       <Sparkles className="w-4 h-4 animate-spin text-gray-400" />
                       <span className="text-xs">Thinking...</span>
                   </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-neutral-900 border-t border-neutral-800">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-neutral-950 text-white border border-neutral-800 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-neutral-600 focus:bg-black transition-all placeholder:text-neutral-600 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-lg text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;