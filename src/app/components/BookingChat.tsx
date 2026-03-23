"use client";

import { useState, useEffect, useRef } from "react";
import { Send, X, Loader2 } from "lucide-react";

type Message = {
  id: string;
  content: string;
  created_at: string;
  sender: {
    id: string;
    full_name: string;
    role: string;
  };
};

export default function BookingChat({ 
  bookingId, 
  token,
  currentUserId,
  onClose 
}: { 
  bookingId: string; 
  token: string;
  currentUserId: string;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [bookingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
      
      // Mark as read in the background
      fetch(`/api/bookings/${bookingId}/messages`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      }).catch(console.error);

    } catch(err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSending(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });
      if (res.ok) {
        const newMsg = await res.json();
        setMessages(prev => [...prev, newMsg]);
        setContent("");
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-sakanx-navy text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-lg">Conversation</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
          {initialLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-sakanx-blue" />
            </div>
          ) : messages.length === 0 ? (
             <div className="text-center text-gray-400 mt-10">No messages yet. Say hi!</div>
          ) : (
            messages.map((m) => {
              const isMe = m.sender.id === currentUserId;
              return (
                <div key={m.id} className={`flex flex-col max-w-[80%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                  <span className="text-xs text-gray-400 mb-1 ml-1">{isMe ? 'You' : m.sender.full_name}</span>
                  <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-sakanx-blue text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm'}`}>
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 ml-1">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 border-transparent rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-sakanx-blue focus:border-transparent outline-none transition-all"
            disabled={isSending}
          />
          <button 
            type="submit" 
            disabled={isSending || !content.trim()} 
            className="bg-sakanx-navy hover:bg-sakanx-blue text-white rounded-xl px-4 flex items-center justify-center transition-colors disabled:opacity-50"
          >
            {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
