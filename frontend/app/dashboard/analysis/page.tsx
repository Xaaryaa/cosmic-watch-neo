"use client";

import DashboardNavbar from '@/components/dashboard-navbar';
import { BarChart3, PieChart, Activity, Download, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api, Asteroid } from '@/lib/api';
import { DashboardSkeleton } from '@/components/skeletons';

export default function AnalysisPage() {
    const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await api.getAsteroids();
            setAsteroids(data);
        } catch (err) {
            setError("Unable to retrieve orbital data.");
        } finally {
            setLoading(false);
        }
    };

    // Calculate real stats
    const sizeDistribution = asteroids.reduce((acc, curr) => {
        const size = curr.diameter;
        if (size < 0.1) acc['Small (<0.1km)'] = (acc['Small (<0.1km)'] || 0) + 1;
        else if (size < 0.5) acc['Medium (0.1-0.5km)'] = (acc['Medium (0.1-0.5km)'] || 0) + 1;
        else acc['Large (>0.5km)'] = (acc['Large (>0.5km)'] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const highRiskCount = asteroids.filter(a => a.risk_score > 0.5).length;
    const lowRiskCount = asteroids.length - highRiskCount;
    const riskPercentage = asteroids.length ? Math.round((highRiskCount / asteroids.length) * 100) : 0;

    const maxCount = Math.max(...Object.values(sizeDistribution), 1);

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="min-h-screen bg-[#050810] text-green-400 font-mono selection:bg-green-500/30 selection:text-black">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

            <DashboardNavbar />

            <main className="relative z-10 container mx-auto px-6 py-8">
                <header className="mb-8 border-b border-green-900/30 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-widest text-green-300">DATA ANALYSIS</h1>
                        <p className="text-sm text-green-700 uppercase tracking-widest">Orbital Mechanics & Impact Probability</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={loadData} className="flex items-center gap-2 px-4 py-2 border border-green-900/30 hover:bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider transition-colors">
                            <RefreshCcw className="w-4 h-4" /> Refresh
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-green-500/30 hover:bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider transition-colors">
                            <Download className="w-4 h-4" /> Export Report
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Real Size Distribution Chart */}
                    <div className="bg-[#0a0e1a]/80 border border-green-900/30 p-6 relative group hover:border-green-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-green-500 font-bold tracking-widest flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" /> SIZE DISTRIBUTION (REAL-TIME)
                            </h3>
                        </div>
                        <div className="h-64 border border-green-900/20 bg-green-500/5 flex items-end justify-around p-4 relative overflow-hidden">
                            {Object.entries(sizeDistribution).map(([label, count], i) => {
                                const height = (count / maxCount) * 100;
                                return (
                                    <div key={label} className="flex flex-col items-center gap-2 h-full justify-end w-1/3 group/bar">
                                        <div className="text-xs font-bold text-green-300 opacity-0 group-hover/bar:opacity-100 transition-opacity mb-1">{count}</div>
                                        <div style={{ height: `${height}%` }} className="w-12 bg-green-500/20 border-t border-green-500 hover:bg-green-500/40 transition-all relative">
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-green-400 shadow-[0_0_10px_#4ade80]" />
                                        </div>
                                        <div className="text-[10px] text-green-700 uppercase tracking-tighter text-center h-8">{label}</div>
                                    </div>
                                )
                            })}
                            {Object.keys(sizeDistribution).length === 0 && (
                                <div className="self-center text-green-800 text-xs">NO DATA AVAILABLE</div>
                            )}
                        </div>
                    </div>

                    {/* Real Risk Composition Chart */}
                    <div className="bg-[#0a0e1a]/80 border border-green-900/30 p-6 relative group hover:border-green-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-green-500 font-bold tracking-widest flex items-center gap-2">
                                <PieChart className="w-5 h-5" /> THREAT COMPOSITION
                            </h3>
                        </div>
                        <div className="h-64 border border-green-900/20 bg-green-500/5 flex items-center justify-center relative">
                            {/* CSS Pie Chart */}
                            <div
                                className="w-40 h-40 rounded-full border-8 border-green-900/30 relative flex items-center justify-center"
                                style={{
                                    background: `conic-gradient(#ef4444 ${riskPercentage * 3.6}deg, transparent 0)`
                                }}
                            >
                                <div className="absolute inset-2 rounded-full bg-[#0a0e1a]" />
                                <div className="z-10 text-center">
                                    <div className="text-3xl font-bold text-green-300">{riskPercentage}%</div>
                                    <div className="text-[10px] text-green-600 uppercase tracking-widest">High Risk</div>
                                </div>
                            </div>

                            <div className="absolute bottom-4 flex gap-4 text-xs font-mono uppercase">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-900/30 border border-green-500" />
                                    <span className="text-green-600">Safe: {lowRiskCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-red-500" />
                                    <span className="text-red-400">Hazardous: {highRiskCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Velocity Table */}
                    <div className="md:col-span-2 bg-[#0a0e1a]/80 border border-green-900/30 p-6 relative group hover:border-green-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-green-500 font-bold tracking-widest flex items-center gap-2">
                                <Activity className="w-5 h-5" /> TOP VELOCITY OBJECTS
                            </h3>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left text-xs font-mono">
                                <thead className="text-green-700 uppercase tracking-widest border-b border-green-900/30">
                                    <tr>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Velocity (km/h)</th>
                                        <th className="p-2">Miss Distance (km)</th>
                                        <th className="p-2">Observed</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-green-900/10">
                                    {asteroids
                                        .sort((a, b) => b.velocity - a.velocity)
                                        .slice(0, 5)
                                        .map(ast => (
                                            <tr key={ast.id} className="hover:bg-green-500/5">
                                                <td className="p-2 font-bold text-green-300">{ast.name}</td>
                                                <td className="p-2">{ast.velocity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                                <td className="p-2">{ast.miss_distance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                                <td className="p-2 text-green-600">{new Date().toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
