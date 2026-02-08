"use client";

import DashboardNavbar from '@/components/dashboard-navbar';
import { Settings, Shield, Bell, Cpu, Globe, Database, Save, RotateCcw, Key, Lock, Mail, Smartphone, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('General');
    const [settings, setSettings] = useState({
        // General
        defenseProtocols: true,
        priorityAlerts: true,
        dataSync: 'Real-time (Websocket)',
        visualEffects: 'High',
        // Notifications
        emailAlerts: true,
        smsAlerts: false,
        browserNotifications: true,
        dailyDigest: true,
        // Security
        twoFactor: false,
        sessionTimeout: '30 mins',
        publicProfile: false,
    });

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const loaded = localStorage.getItem('cosmic_settings');
        if (loaded) {
            setSettings(prev => ({ ...prev, ...JSON.parse(loaded) }));
        }
    }, []);

    const handleChange = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem('cosmic_settings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const resetDefaults = () => {
        if (confirm('Reset all systems to factory defaults?')) {
            localStorage.removeItem('cosmic_settings');
            window.location.reload();
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Notifications':
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5" /> NOTIFICATION CHANNELS
                        </h2>
                        {/* Email Alerts */}
                        <div className="flex items-center justify-between p-4 border border-green-900/30 bg-green-500/5 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <Mail className={`w-6 h-6 ${settings.emailAlerts ? 'text-green-500' : 'text-gray-600'}`} />
                                <div>
                                    <h3 className="font-bold text-sm tracking-wider">EMAIL ALERTS</h3>
                                    <p className="text-xs text-green-700">Receive critical updates via secure link</p>
                                </div>
                            </div>
                            <Toggle checked={settings.emailAlerts} onChange={(v) => handleChange('emailAlerts', v)} />
                        </div>

                        {/* SMS Alerts */}
                        <div className="flex items-center justify-between p-4 border border-green-900/30 bg-green-500/5 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <Smartphone className={`w-6 h-6 ${settings.smsAlerts ? 'text-green-500' : 'text-gray-600'}`} />
                                <div>
                                    <h3 className="font-bold text-sm tracking-wider">SMS TRANSMISSIONS</h3>
                                    <p className="text-xs text-green-700">Emergency mobile notifications</p>
                                </div>
                            </div>
                            <Toggle checked={settings.smsAlerts} onChange={(v) => handleChange('smsAlerts', v)} />
                        </div>

                        {/* Browser Notifications */}
                        <div className="flex items-center justify-between p-4 border border-green-900/30 bg-green-500/5 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <Globe className={`w-6 h-6 ${settings.browserNotifications ? 'text-green-500' : 'text-gray-600'}`} />
                                <div>
                                    <h3 className="font-bold text-sm tracking-wider">BROWSER SIGNALS</h3>
                                    <p className="text-xs text-green-700">Desktop alerts when dashboard is open</p>
                                </div>
                            </div>
                            <Toggle checked={settings.browserNotifications} onChange={(v) => handleChange('browserNotifications', v)} />
                        </div>
                    </div>
                );
            case 'Security':
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5" /> SECURITY PROTOCOLS
                        </h2>

                        {/* 2FA */}
                        <div className="flex items-center justify-between p-4 border border-green-900/30 bg-green-500/5 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <Lock className={`w-6 h-6 ${settings.twoFactor ? 'text-green-500' : 'text-gray-600'}`} />
                                <div>
                                    <h3 className="font-bold text-sm tracking-wider">2-FACTOR AUTH</h3>
                                    <p className="text-xs text-green-700">Require biometric or hardware key</p>
                                </div>
                            </div>
                            <Toggle checked={settings.twoFactor} onChange={(v) => handleChange('twoFactor', v)} />
                        </div>

                        {/* Change Password Input */}
                        <div className="p-4 border border-green-900/30 bg-green-500/5 hover:border-green-500/30 transition-colors space-y-3">
                            <div className="flex items-center gap-4 mb-2">
                                <Key className="w-6 h-6 text-green-500" />
                                <h3 className="font-bold text-sm tracking-wider">ACCESS CREDENTIALS</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="password" placeholder="CURRENT PASSCODE" className="bg-[#050810] border border-green-900/50 p-2 text-xs text-green-300 placeholder-green-900 focus:border-green-500 outline-none" />
                                <input type="password" placeholder="NEW PASSCODE" className="bg-[#050810] border border-green-900/50 p-2 text-xs text-green-300 placeholder-green-900 focus:border-green-500 outline-none" />
                            </div>
                            <button className="w-full py-2 bg-green-900/20 hover:bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest transition-colors border border-green-900/50 border-t-0">Update Credentials</button>
                        </div>
                    </div>
                );
            default: // General
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                            <Cpu className="w-5 h-5" /> SYSTEM PARAMETERS
                        </h2>
                        {/* Toggle: Defense Protocols */}
                        <div className="flex items-center justify-between p-4 border border-green-900/30 bg-green-500/5 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <Shield className={`w-6 h-6 ${settings.defenseProtocols ? 'text-green-500' : 'text-gray-600'}`} />
                                <div>
                                    <h3 className="font-bold text-sm tracking-wider">DEFENSE PROTOCOLS</h3>
                                    <p className="text-xs text-green-700">Automated threat response system</p>
                                </div>
                            </div>
                            <Toggle checked={settings.defenseProtocols} onChange={(v) => handleChange('defenseProtocols', v)} />
                        </div>

                        {/* Toggle: Priority Alerts */}
                        <div className="flex items-center justify-between p-4 border border-green-900/30 bg-green-500/5 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <Radio className={`w-6 h-6 ${settings.priorityAlerts ? 'text-green-500' : 'text-gray-600'}`} />
                                <div>
                                    <h3 className="font-bold text-sm tracking-wider">PRIORITY ALERTS</h3>
                                    <p className="text-xs text-green-700">Real-time hazardous object notifications</p>
                                </div>
                            </div>
                            <Toggle checked={settings.priorityAlerts} onChange={(v) => handleChange('priorityAlerts', v)} />
                        </div>

                        {/* Select: Data Sync */}
                        <div className="flex items-center justify-between p-4 border border-green-900/30 bg-green-500/5 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <Database className="w-6 h-6 text-green-500" />
                                <div>
                                    <h3 className="font-bold text-sm tracking-wider">DATA SYNC</h3>
                                    <p className="text-xs text-green-700">Sync frequency with NASA JPL</p>
                                </div>
                            </div>
                            <select
                                value={settings.dataSync}
                                onChange={(e) => handleChange('dataSync', e.target.value)}
                                className="bg-[#050810] border border-green-500/30 text-green-400 text-xs p-2 outline-none focus:border-green-500 transition-colors"
                            >
                                <option>Real-time (Websocket)</option>
                                <option>Every 1 Hour</option>
                                <option>Every 24 Hours</option>
                            </select>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#050810] text-green-400 font-mono selection:bg-green-500/30 selection:text-black">
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

            <DashboardNavbar />

            <main className="relative z-10 container mx-auto px-6 py-8">
                <header className="mb-8 border-b border-green-900/30 pb-4">
                    <h1 className="text-3xl font-bold tracking-widest text-green-300">SYSTEM CONFIGURATION</h1>
                    <p className="text-sm text-green-700 uppercase tracking-widest">Global Settings & Parameters</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="space-y-2">
                        {['General', 'Notifications', 'Security'].map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(item)}
                                className={`w-full text-left px-4 py-3 border transition-all ${activeTab === item
                                    ? 'bg-green-500/10 border-green-500 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                                    : 'border-green-900/30 text-green-600 hover:bg-green-500/5 hover:text-green-400'
                                    } font-bold tracking-wider uppercase text-sm flex justify-between items-center`}
                            >
                                {item}
                                {activeTab === item && <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-2 bg-[#0a0e1a]/80 border border-green-900/30 p-8 min-h-[500px] relative backdrop-blur-md">
                        {/* HUD Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/50" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/50" />

                        {renderContent()}

                        <div className="mt-8 pt-6 border-t border-green-900/30 flex items-center justify-between">
                            <button
                                onClick={resetDefaults}
                                className="flex items-center gap-2 text-green-700 hover:text-green-400 text-xs font-bold uppercase tracking-wider"
                            >
                                <RotateCcw className="w-4 h-4" /> Reset Defaults
                            </button>
                            <button
                                onClick={handleSave}
                                className={`px-6 py-2 flex items-center gap-2 font-bold uppercase tracking-wider text-sm transition-colors clip-path-slant ${saved ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-green-600 hover:bg-green-500 text-black'}`}
                            >
                                {saved ? (
                                    <>Configuration Saved</>
                                ) : (
                                    <><Save className="w-4 h-4" /> Save Configuration</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-green-500/20' : 'bg-gray-800'}`}
        >
            <div className={`w-4 h-4 rounded-full transition-transform ${checked ? 'bg-green-500 translate-x-6 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-500 translate-x-0'}`} />
        </button>
    )
}
