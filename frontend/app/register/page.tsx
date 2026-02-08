"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await api.register(fullName, email, password);
            router.push('/login?registered=true');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050810] text-green-400 font-mono relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

            <div className="w-full max-w-md p-8 space-y-6 bg-[#0a0e1a]/90 backdrop-blur-md rounded-none border border-green-900/30 shadow-[0_0_50px_rgba(0,255,157,0.05)] relative z-10 group">
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/50" />

                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-widest text-green-300 mb-1">COSMIC WATCH</h1>
                    <h2 className="text-xs uppercase tracking-[0.3em] text-green-700">Operator Registration</h2>
                </div>

                {error && (
                    <div className="p-3 bg-red-900/20 border border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-wide text-center">
                        ⚠ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Full Designation</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 bg-[#050810] border border-green-900/50 text-green-300 focus:border-green-500 focus:outline-none transition-colors rounded-none placeholder-green-900/50"
                            placeholder="NAME RANK"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Comms ID (Email)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-[#050810] border border-green-900/50 text-green-300 focus:border-green-500 focus:outline-none transition-colors rounded-none placeholder-green-900/50"
                            placeholder="ID@FLEET.COM"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Security Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-[#050810] border border-green-900/50 text-green-300 focus:border-green-500 focus:outline-none transition-colors rounded-none placeholder-green-900/50"
                            placeholder="********"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-600 hover:bg-green-500 text-black font-bold uppercase tracking-widest transition-all clip-path-slant hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    >
                        Submit Application
                    </button>
                </form>

                <div className="text-center text-xs text-green-800 tracking-wider">
                    ALREADY REGISTERED? <Link href="/login" className="text-green-500 hover:text-green-300 underline underline-offset-4 decoration-green-500/30">LOGIN</Link>
                </div>
            </div>
        </div>
    );
}
