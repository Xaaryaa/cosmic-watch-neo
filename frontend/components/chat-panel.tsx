"use client";

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function ChatPanel() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { isAuthenticated, token } = useAuth();

    useEffect(() => {
        // Connect to socket backend
        const newSocket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001', {
            transports: ['websocket'],
            autoConnect: true
        });

        newSocket.on('connect', () => {
            console.log('Connected to chat');
        });

        newSocket.on('chat_history', (history: any[]) => {
            setMessages(prev => [...history, ...prev]);
        });

        newSocket.on('chat_message', (msg: any) => {
            setMessages(prev => [...prev, msg]);
        });

        // Also listen for alerts
        newSocket.on('alert', (alertData: any) => {
            alertData.alerts.forEach((a: any) => {
                setMessages(prev => [...prev, { user: 'SYSTEM', message: `🚨 ${a.message} (Risk: ${a.risk_score})`, isSystem: true }]);
            });
        });

        newSocket.on('feed_update', (data: any) => {
            setMessages(prev => [...prev, { user: 'SYSTEM', message: `📡 ${data.message}`, isSystem: true }]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Auto-scroll on new messages
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !socket) return;

        socket.emit('chat_message', {
            token: token,
            message: input,
            timestamp: new Date().toISOString()
        });

        setInput('');
    };

    return (
        <div className="bg-[#0a0e1a]/90 border border-green-900/30 flex flex-col h-full min-h-[400px] relative overflow-hidden group backdrop-blur-md">
            {/* Header */}
            <div className="p-3 border-b border-green-900/30 flex items-center justify-between bg-green-500/5">
                <h2 className="text-xs font-bold text-green-400 tracking-widest flex items-center gap-2 uppercase">
                    <MessageSquare className="w-3 h-3 text-green-500" />
                    Secure Comms Channel
                </h2>
                <div className="text-[10px] text-green-600 flex items-center gap-1 uppercase tracking-wider font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
                    Encrypted
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar scroll-smooth"
            >
                {messages.length === 0 && (
                    <div className="text-center text-green-900/50 text-xs mt-10 uppercase tracking-widest font-bold">
                        -- Waiting for transmission --
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.isSystem ? 'items-center' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        {msg.isSystem ? (
                            <div className="bg-red-900/10 text-red-400 text-[10px] px-2 py-1 border border-red-900/30 my-2 uppercase tracking-wide font-bold">
                                {msg.message}
                            </div>
                        ) : (
                            <div className="max-w-[90%] w-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">
                                        {msg.user || 'Unknown Operator'}
                                    </span>
                                    <span className="text-[9px] text-green-900 font-mono">
                                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                                <div className={`p-2 border-l-2 ${msg.user === 'You' ? 'border-green-400 bg-green-500/10' : 'border-green-800 bg-[#050810]'} text-green-300 text-xs font-mono leading-relaxed`}>
                                    {msg.message}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="p-3 border-t border-green-900/30 flex gap-2 bg-[#050810]">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ENTER MESSAGE..."
                    className="flex-1 bg-[#0a0e1a] border border-green-900/50 px-3 py-2 text-xs text-green-300 focus:outline-none focus:border-green-500 placeholder-green-900 font-mono uppercase tracking-wide transition-colors"
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-black p-2 transition-all clip-path-slant flex items-center justify-center font-bold"
                >
                    <Send className="w-3 h-3" />
                </button>
            </form>

            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500/50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500/50 pointer-events-none" />
        </div>
    );
}
