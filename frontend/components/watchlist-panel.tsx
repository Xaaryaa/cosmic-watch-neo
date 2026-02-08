"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { Trash2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPanel() {
    const { token, isAuthenticated } = useAuth();
    const [watchlist, setWatchlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated && token) {
            loadWatchlist();
        } else {
            setWatchlist([]);
        }
    }, [isAuthenticated, token]);

    const loadWatchlist = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await api.getWatchlist(token);
            setWatchlist(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id: string) => {
        if (!token) return;
        try {
            await api.removeFromWatchlist(token, id);
            setWatchlist(prev => prev.filter(item => item.id !== parseInt(id)));
        } catch (err) {
            console.error(err);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-[#050810]/80 border border-green-900/30 p-6 text-center backdrop-blur-sm group hover:border-green-500/30 transition-colors">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center animate-pulse">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                </div>
                <h3 className="text-green-300 font-bold tracking-widest mb-2 uppercase text-sm">Target Tracking</h3>
                <p className="text-xs text-green-700 mb-6 font-mono">Login to enable designated object monitoring protocols.</p>
                <Link href="/login" className="px-6 py-2 bg-green-900/20 border border-green-500/50 text-green-400 text-xs font-bold uppercase tracking-wider hover:bg-green-500/20 transition-all">
                    Initialize Session
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-[#050810]/80 border border-green-900/30 p-1 relative backdrop-blur-sm">
            {/* Header */}
            <div className="bg-green-900/10 p-3 border-b border-green-900/30 mb-1 flex items-center justify-between">
                <h2 className="text-xs font-bold text-green-400 tracking-widest uppercase flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    Watchlist
                </h2>
                <div className="text-[10px] text-green-700 font-mono border border-green-900/30 px-2 py-0.5">
                    {watchlist.length.toString().padStart(2, '0')} TARGETS
                </div>
            </div>

            {loading ? (
                <div className="p-8 text-center">
                    <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-2" />
                    <div className="text-[10px] text-green-700 animate-pulse tracking-widest">SCANNING...</div>
                </div>
            ) : watchlist.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-green-900/30 m-2 bg-green-500/5">
                    <p className="text-xs text-green-800 font-mono mb-1">NO TARGETS ACQUIRED</p>
                    <p className="text-[10px] text-green-900/50">Select objects from feed to track</p>
                </div>
            ) : (
                <div className="space-y-1 p-2 max-h-96 overflow-y-auto custom-scrollbar">
                    {watchlist.map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-[#0a0e1a] p-3 border border-green-900/20 hover:border-green-500/50 hover:bg-green-500/5 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 flex items-center justify-center border ${item.risk_score > 0.5 ? 'border-red-500/50 bg-red-900/10 text-red-500' : 'border-green-500/50 bg-green-900/10 text-green-500'}`}>
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-bold text-green-300 text-xs tracking-wide">{item.name}</div>
                                    <div className="text-[10px] text-green-700 font-mono">MISS: {(item.miss_distance || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} KM</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(item.id.toString())}
                                className="text-green-900 hover:text-red-500 p-2 opacity-50 group-hover:opacity-100 transition-all"
                                title="Stop Tracking"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
