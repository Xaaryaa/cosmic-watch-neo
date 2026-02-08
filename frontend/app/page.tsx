"use client";

import Link from 'next/link';
import { ArrowRight, ShieldAlert, Globe, Radio } from 'lucide-react';
import dynamic from 'next/dynamic';
import Logo from '@/components/ui/logo';

const TelescopeHero = dynamic(() => import('@/components/telescope-hero'), { ssr: false });

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden relative selection:bg-green-500/30">

      {/* 3D Background */}
      <TelescopeHero />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e1a]/50 to-[#0a0e1a] z-0 pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo size="lg" />
        </Link>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm hover:text-blue-400 transition-colors">Login</Link>
          <Link href="/register" className="text-sm px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-full hover:bg-blue-600 hover:border-blue-500 transition-all">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-6 animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          TELESCOPE LIVE FEED • TRACKING OBJECT
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">TARGET LOCKED</span>
          <br />
          <span className="text-white text-4xl md:text-6xl">PLANETARY DEFENSE SYSTEM</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-mono">
          &gt;&gt; INITIALIZING INTERCEPT PROTOCOLS...<br />
          &gt;&gt; MONITORING ALL SPACE SECTORS.<br />
          &gt;&gt; WAITING FOR COMMANDER INPUT.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/dashboard"
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center gap-2">
              ENTER MISSION CONTROL
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Feature Grid */}
        <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
          <div className="p-6 bg-[#0d1117]/80 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Global Tracking</h3>
            <p className="text-gray-400 text-sm">Real-time data stream from NASA's NEO API, tracking thousands of objects daily.</p>
          </div>

          <div className="p-6 bg-[#0d1117]/80 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-red-500/30 transition-colors group">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Risk Analysis</h3>
            <p className="text-gray-400 text-sm">Automated threat assessment scoring algorithms to identify Hazardous Asteroids.</p>
          </div>

          <div className="p-6 bg-[#0d1117]/80 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-purple-500/30 transition-colors group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Radio className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Comms</h3>
            <p className="text-gray-400 text-sm">Encrypted channels for researchers to coordinate planetary defense strategies.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-[#060911] text-center py-8 text-gray-500 text-sm">
        <p>&copy; 2026 Cosmic Watch Initiative. All systems nominal.</p>
      </footer>
    </div>
  );
}
