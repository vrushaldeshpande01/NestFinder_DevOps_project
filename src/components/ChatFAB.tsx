import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, Loader2, RefreshCw } from 'lucide-react';
import { Message } from '../types';

interface ChatFABProps {
  onStartInquiryText?: string;
  onClearInquiryText?: () => void;
}

export default function ChatFAB({ onStartInquiryText, onClearInquiryText }: ChatFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hi there! I am your AI NestFinder Assistant. Ask me anything about our listed PGs, shared rooms, pricing plans, curfew rules, or guest policies!',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt chips
  const suggestedPrompts = [
    'Student spaces in Bangalore?',
    'Narayan PG 2 Curfew rules?',
    'Any room in Hinjewadi, Pune?'
  ];

  // React on dynamic inquiry started from detail page
  useEffect(() => {
    if (onStartInquiryText) {
      setIsOpen(true);
      // Append inquiry message to state
      handleSendMessage(onStartInquiryText);
      if (onClearInquiryText) onClearInquiryText();
    }
  }, [onStartInquiryText]);

  // Handle scrolling of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessageId = 'user-' + Date.now();
    const newUserMessage: Message = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMsg('');
    setLoading(true);
    setNote(null);

    // Call server proxy
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-10) // pass limited history for token efficiency
        })
      });

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: 'assistant-' + Date.now(),
        sender: 'assistant',
        text: data.text || 'I didn’t catch that. Could you ask me about specific PG locations?',
        timestamp: new Date()
      };

      if (data.note) {
        setNote(data.note);
      }

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errMessage: Message = {
        id: 'error-' + Date.now(),
        sender: 'assistant',
        text: 'I ran into an issue connecting with our servers. Rest assured, you can contact our Hosting Manager Rajesh directly!',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errMessage]);
    } finally {
      setLoading(false);
    }
  };

  const triggerSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };  return (
    <>
      {/* Floating icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-5 md:bottom-8 md:right-8 bg-white text-black w-14 h-14 rounded-none shadow-2xl flex items-center justify-center hover:bg-zinc-200 transition-colors z-50 group border border-white"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
        <span className="absolute right-full mr-4 bg-black border border-white/10 text-white px-3 py-1.5 rounded-none text-[10px] uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          OPERATIONAL SUPPORT
        </span>
      </button>

      {/* Slide-up chat dialogue box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:bottom-24 md:right-8 w-[92%] sm:w-[380px] h-[520px] bg-[#121212] rounded-none shadow-2xl z-50 flex flex-col overflow-hidden border border-white/15 animate-slide-in">
          
          {/* Header */}
          <div className="bg-zinc-950 text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center border border-white/20">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-[10px] uppercase font-mono tracking-widest text-white">NestFinder AI Agent</p>
                <p className="text-[9px] uppercase font-mono tracking-widest text-zinc-400">ACTIVE RESPONSE ENGINE</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white shrink-0 hover:bg-white/10 p-1.5 rounded-none transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages list scroll area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A0A0A] flex flex-col">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex gap-2 max-w-[85%] ${m.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`w-6 h-6 rounded-none flex items-center justify-center shrink-0 ${
                  m.sender === 'user' ? 'bg-white text-black' : 'bg-zinc-800 text-white border border-white/10'
                }`}>
                  {m.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>

                <div className={`p-3 rounded-none text-xs leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-white text-black rounded-none font-sans' 
                    : 'bg-zinc-900 text-zinc-300 border border-white/10 rounded-none font-sans'
                }`}>
                  <p className="whitespace-pre-line text-justify">{m.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 max-w-[80%] self-start items-center text-zinc-400">
                <div className="w-6 h-6 rounded-none bg-zinc-900 flex items-center justify-center shrink-0 border border-white/10">
                  <Loader2 size={12} className="animate-spin text-white" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider italic">GENIUS THINKING...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Note or warnings if any */}
          {note && (
            <div className="px-4 py-2 bg-zinc-900 text-[9px] text-yellow-300 border-t border-white/10 font-mono uppercase tracking-wider">
              {note}
            </div>
          )}

          {/* Preset trigger suggestions */}
          {messages.length === 1 && (
            <div className="p-3 bg-zinc-950 border-t border-white/10 flex flex-nowrap overflow-x-auto gap-2 scrollbar-none antialiased select-none">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => triggerSuggestedPrompt(p)}
                  className="bg-[#121212] text-zinc-400 hover:text-white border border-white/10 hover:border-white whitespace-nowrap px-3 py-2 rounded-none text-[9px] uppercase tracking-wider font-mono transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* TextInput form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMsg); }}
            className="p-3 bg-zinc-950 border-t border-white/10 flex items-center gap-2"
          >
            <input 
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="ASK HELPER..."
              className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-none px-3 py-3 text-xs text-white uppercase font-mono focus:outline-none focus:border-white"
            />
            <button 
              type="submit"
              disabled={!inputMsg.trim() || loading}
              className="bg-white text-black p-3 rounded-none disabled:bg-zinc-800 disabled:text-zinc-550 hover:bg-zinc-200 transition-colors"
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
