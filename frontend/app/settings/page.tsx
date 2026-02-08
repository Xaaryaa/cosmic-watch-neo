'use client';

import { Bell, LogOut, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import DashboardNavbar from '@/components/dashboard-navbar';

export default function SettingsPage() {
  const [proximityAlert, setProximityAlert] = useState(0.5);
  const [minDiameter, setMinDiameter] = useState(120);
  const [hazardProbability, setHazardProbability] = useState(15);
  const [theme, setTheme] = useState('deep-space');
  const [emailDigests, setEmailDigests] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <DashboardNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage your interstellar tracking preferences and observatory data.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-6 sm:p-8 text-center mb-4 sm:mb-6">
              <div className="w-24 h-24 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-3xl">
                  👨‍🔬
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-400 text-white text-xs font-medium rounded-full mb-4">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Visit Website
              </div>
              <h2 className="text-xl font-bold mb-1">Dr. Elena Vance</h2>
              <p className="text-blue-100 text-sm mb-1">Senior Astronomer • Mauna Kea</p>
              <p className="text-blue-100 text-sm">Observatory</p>
            </div>

            {/* Profile Fields */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  value="Elena Vance"
                  className="w-full bg-[#0a0e1a] border border-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase mb-2 flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Email Address
                </label>
                <input
                  type="email"
                  value="elena.vance@cosmicwatch.org"
                  className="w-full bg-[#0a0e1a] border border-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase mb-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Observatory Location
                </label>
                <input
                  type="text"
                  value="Mauna Kea, Hawaii"
                  className="w-full bg-[#0a0e1a] border border-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg transition-colors font-medium">
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alert Thresholds */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">Alert Thresholds</h2>
                  <p className="text-xs sm:text-sm text-gray-400">Configure when you receive deep space notifications.</p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Proximity Alert */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Proximity Alert (AU)</label>
                    <span className="text-lg font-bold text-blue-400">{proximityAlert.toFixed(2)} AU</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={proximityAlert}
                    onChange={(e) => setProximityAlert(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>0.1 AU</span>
                    <span>5.0 AU</span>
                  </div>
                </div>

                {/* Minimum Asteroid Diameter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Minimum Asteroid Diameter</label>
                    <span className="text-lg font-bold text-blue-400">{minDiameter} m</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={minDiameter}
                    onChange={(e) => setMinDiameter(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>10 m</span>
                    <span>1 km</span>
                  </div>
                </div>

                {/* Hazard Probability */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Hazard Probability ⚠️</label>
                    <span className="text-lg font-bold text-yellow-400">≥ {hazardProbability}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={hazardProbability}
                    onChange={(e) => setHazardProbability(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>0% (Safe)</span>
                    <span>100% (Impact)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">Preferences</h2>
                  <p className="text-xs sm:text-sm text-gray-400">Customize your interface and notification channels.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Interface Theme */}
                <div>
                  <label className="block text-sm font-medium mb-3">Interface Theme</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors ${
                        theme === 'light'
                          ? 'bg-white text-gray-900 border-white'
                          : 'bg-[#0a0e1a] border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <span className="text-sm">Light</span>
                      </div>
                      {theme === 'light' && (
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setTheme('deep-space')}
                      className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors ${
                        theme === 'deep-space'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-[#0a0e1a] border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                        <span className="text-sm">Deep Space</span>
                      </div>
                      {theme === 'deep-space' && (
                        <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Deep Space mode optimizes contrast for night-time observations.</p>
                </div>

                {/* Notification Channels */}
                <div>
                  <label className="block text-sm font-medium mb-3">Notification Channels</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#0a0e1a] border border-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Email Digests</span>
                      </div>
                      <button
                        onClick={() => setEmailDigests(!emailDigests)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          emailDigests ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            emailDigests ? 'translate-x-6' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0a0e1a] border border-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-sm">SMS Alerts</span>
                      </div>
                      <button
                        onClick={() => setSmsAlerts(!smsAlerts)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${smsAlerts ? 'bg-blue-500' : 'bg-gray-700'}`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            smsAlerts ? 'translate-x-6' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0a0e1a] border border-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Push Notifications</span>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          pushNotifications ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            pushNotifications ? 'translate-x-6' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between text-sm text-gray-500">
          <div>© 2024 Cosmic Watch Initiative. All systems nominal.</div>
          <div className="flex items-center gap-4">
            <span>v2.4.1 - Nebula</span>
            <span>•</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-green-400">Connected</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
