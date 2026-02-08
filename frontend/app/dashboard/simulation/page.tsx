"use client";

import DashboardNavbar from '@/components/dashboard-navbar';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SolarSystem = dynamic(() => import('@/components/solar-system'), { ssr: false });

export default function SimulationPage() {
    return (
        <div className="min-h-screen bg-[#050810] text-green-400 font-mono selection:bg-green-500/30 selection:text-black flex flex-col">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

            <DashboardNavbar />

            <main className="relative z-10 flex-1 flex flex-col p-0 sm:p-4">
                <div className="flex-1 bg-black border border-green-900/30 relative overflow-hidden rounded-sm">
                    {/* HUD Overlay */}
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                        <Link href="/dashboard" className="pointer-events-auto flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors uppercase font-bold text-xs tracking-widest bg-black/50 p-2 border border-green-900/50">
                            <ArrowLeft className="w-4 h-4" /> Return to Command
                        </Link>
                        <h1 className="mt-4 text-2xl font-bold tracking-[0.2em] text-green-500 text-shadow-glow">ORBITAL SIMULATION</h1>
                        <p className="text-[10px] text-green-700 uppercase tracking-widest">Real-time physics engine • Solar System View</p>
                    </div>

                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-green-500/50 z-20 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-green-500/50 z-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-green-500/50 z-20 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500/50 z-20 pointer-events-none" />

                    <div className="absolute inset-0">
                        <SolarSystem />
                    </div>

                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,157,0.02)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
                </div>
            </main>
        </div>
    );
}
