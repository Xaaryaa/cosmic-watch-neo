"use client";

import Link from 'next/link';
import { Eye, Search, RefreshCw, AlertTriangle, Star, Crosshair } from 'lucide-react';
import DashboardNavbar from '@/components/dashboard-navbar';
import { useEffect, useState } from 'react';
import { api, Asteroid, Stats } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import WatchlistPanel from '@/components/watchlist-panel';
import ChatPanel from '@/components/chat-panel';
import dynamic from 'next/dynamic';
import { DashboardSkeleton } from '@/components/skeletons';

const SolarSystem = dynamic(() => import('@/components/solar-system'), { ssr: false });

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, asteroidsData] = await Promise.all([
        api.getStats(),
        api.getAsteroids()
      ]);
      setStats(statsData);
      setAsteroids(asteroidsData);
    } catch (err) {
      setError("Failed to fetch data. Please ensure backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWatch = async (id: string) => {
    if (!isAuthenticated || !token) {
      alert("Please login to watchlist asteroids!");
      return;
    }
    try {
      await api.addToWatchlist(token, id);
      alert("Added to watchlist!");
      window.location.reload();
    } catch (err: any) {
      alert(err.message || "Failed to add");
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050810] text-green-400 flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4 text-center border border-red-500/30 p-8 bg-red-900/10 rounded-lg">
          <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
          <h1 className="text-xl font-bold tracking-widest">SIGNAL LOST</h1>
          <p className="text-red-400 max-w-md text-sm">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-400 rounded-none transition-colors flex items-center gap-2 uppercase tracking-wider text-xs font-bold"
          >
            <RefreshCw className="w-3 h-3" /> Re-establish Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050810] text-green-400 font-mono selection:bg-green-500/30 selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

      <DashboardNavbar />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mission Control Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-green-900/30 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 tracking-widest text-green-300">MISSION CONTROL</h1>
            <p className="text-xs sm:text-sm text-green-700 uppercase tracking-widest">Sector 7 • Real-time Telemetry</p>
          </div>
          <div className="text-xs text-green-500 mt-2 sm:mt-0 flex items-center gap-2 bg-green-900/10 px-3 py-1 border border-green-900/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            LIVE FEED ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Grid - Takes 2 cols */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Stat Card Component */}
            {[
              { label: "TOTAL NEOs", value: stats?.total_neos.toLocaleString() || "0", sub: "DATABASE RECORDS", color: "blue" },
              { label: "HAZARDOUS", value: stats?.hazardous_count || "0", sub: "POTENTIAL THREATS", color: "red" },
              { label: "CLOSEST APP.", value: stats?.closest_distance ? Math.round(stats.closest_distance).toLocaleString() : "N/A", sub: "KILOMETERS", color: "yellow" },
              { label: "MAX VELOCITY", value: stats?.fastest_velocity ? Math.round(stats.fastest_velocity).toLocaleString() : "N/A", sub: "KM/H", color: "purple" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#0a0e1a]/80 backdrop-blur-sm border border-green-900/30 p-4 sm:p-6 relative overflow-hidden group hover:border-green-500/30 transition-colors">
                <div className={`absolute top-0 right-0 w-16 h-16 bg-${stat.color}-500/5 rounded-bl-full pointer-events-none`} />
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-green-600 text-[10px] font-bold tracking-[0.2em] uppercase">{stat.label}</h3>
                  <Crosshair className="w-4 h-4 text-green-800 group-hover:text-green-500 transition-colors opacity-50" />
                </div>
                <div className="text-2xl sm:text-4xl font-bold mb-1 text-green-300 tabular-nums tracking-tight">{stat.value}</div>
                <div className={`text-[10px] uppercase tracking-wider font-bold text-${stat.color === 'red' ? 'red-500' : 'green-600'}`}>
                  {stat.sub}
                </div>
                {/* Corner accents */}
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500/50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500/50" />
              </div>
            ))}
          </div>

          {/* Watchlist Panel */}
          <div className="lg:col-span-1">
            <WatchlistPanel />
          </div>
        </div>

        {/* Middle Section: Solar System & Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Solar System Overview - PROMO LINK */}
          <div className="lg:col-span-2 bg-[#0a0e1a]/80 border border-green-900/30 p-1 relative flex flex-col group hover:border-green-500/50 transition-colors">
            <div className="absolute top-2 left-4 text-xs font-bold text-green-500 tracking-widest z-10 flex items-center gap-2">
              <GlobeIcon className="w-3 h-3" /> ORBITAL VISUALIZATION
            </div>
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/50" />

            <div className="relative h-96 bg-black overflow-hidden border border-green-900/20 flex items-center justify-center relative">
              {/* Static Background Image or Abstract Graphic */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#052e16_0%,_#000000_70%)] opacity-50" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              <div className="text-center z-10 p-6 bg-black/50 backdrop-blur-sm border border-green-500/30">
                <h3 className="text-xl font-bold text-green-300 tracking-[0.2em] mb-2">3D SIMULATION ENGINE</h3>
                <p className="text-xs text-green-600 mb-6 max-w-sm mx-auto">High-fidelity orbital mechanics simulation is available in the dedicated module.</p>

                <Link href="/dashboard/simulation" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold uppercase tracking-widest transition-all clip-path-slant flex items-center gap-2 mx-auto w-fit hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <GlobeIcon className="w-4 h-4" /> Launch Simulation
                </Link>
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-1">
            <ChatPanel />
          </div>
        </div>

        {/* Asteroid Data Feed */}
        <div className="bg-[#0a0e1a]/90 border border-green-900/30 backdrop-blur-md">
          {/* Header */}
          <div className="p-4 border-b border-green-900/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-green-500" />
              <h2 className="text-lg font-bold tracking-wider text-green-300">RAW DATA FEED</h2>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-green-700" />
                <input
                  type="text"
                  placeholder="FILTER ID..."
                  className="w-full bg-[#050810] border border-green-900/50 pl-8 pr-2 py-1 text-xs text-green-400 focus:outline-none focus:border-green-500 placeholder-green-900 uppercase tracking-widest"
                />
              </div>
              <button onClick={fetchData} className="px-3 py-1 border border-green-900/50 hover:bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-wider transition-colors">
                Refresh
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-green-900/50 text-[10px] text-green-700 uppercase tracking-widest bg-green-900/5">
                  <th className="px-6 py-3 font-bold">Designation</th>
                  <th className="px-6 py-3 font-bold">Diameter (KM)</th>
                  <th className="px-6 py-3 font-bold">Velocity (KM/H)</th>
                  <th className="px-6 py-3 font-bold">Miss Dist. (KM)</th>
                  <th className="px-6 py-3 font-bold">Risk Level</th>
                  <th className="px-6 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-900/10">
                {asteroids.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-green-800 text-sm tracking-widest">
                      -- NO DATA RECEIVED --
                    </td>
                  </tr>
                ) : (
                  asteroids.map((asteroid, idx) => (
                    <tr key={idx} className="hover:bg-green-500/5 transition-colors group">
                      <td className="px-6 py-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-green-300 text-sm">{asteroid.name}</span>
                          <span className="text-[10px] text-green-700">ID: {asteroid.neo_reference_id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-xs text-green-400 font-mono">{asteroid.diameter?.toFixed(3)}</td>
                      <td className="px-6 py-3 text-xs text-green-400 font-mono">{asteroid.velocity?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      <td className="px-6 py-3 text-xs text-green-400 font-mono">
                        {asteroid.miss_distance?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-16 h-1 rounded-full bg-green-900/30 overflow-hidden`}>
                            <div
                              className={`h-full ${asteroid.risk_score > 0.5 ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{ width: `${asteroid.risk_score * 100}%` }}
                            />
                          </div>
                          <span className={`text-[10px] font-bold ${asteroid.risk_score > 0.5 ? 'text-red-500' : 'text-green-500'}`}>
                            {asteroid.risk_score?.toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/dashboard/asteroids/${asteroid.id}`}
                          className="p-1 hover:text-green-300 text-green-700 transition-colors"
                          title="Analyze"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleWatch(asteroid.id)}
                          className="p-1 hover:text-yellow-400 text-green-700 transition-colors"
                          title="Track"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
