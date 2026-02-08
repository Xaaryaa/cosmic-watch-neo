'use client';

import { Send, Paperclip, Smile, Settings, Hash, Users, ChevronDown, MoreVertical, AtSign, Menu, X } from 'lucide-react';
import { useState } from 'react';
import DashboardNavbar from '@/components/dashboard-navbar';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const channels = [
    { id: 'general', name: 'general', icon: Hash, active: false },
    { id: 'hazardous-finds', name: 'hazardous-finds', icon: '⚠️', active: true, unread: 2 },
    { id: 'telescope-feeds', name: 'telescope-feeds', icon: '🔭', active: false },
    { id: 'trajectory-analysis', name: 'trajectory-analysis', icon: '📊', active: false },
  ];

  const personnel = [
    { id: 1, name: 'Dr. Sarah Chen', avatar: '👩‍🔬', status: 'online' },
    { id: 2, name: 'Cmdr. Shepard', avatar: '👨‍✈️', status: 'online' },
  ];

  const messages = [
    {
      id: 1,
      user: 'Dr. V. Nova',
      avatar: '👨‍🔬',
      time: '14:02',
      content: "Did anyone catch the albedo shift on 2024-BX? The luminosity dropped by 0.4 magnitude in the last 15 minutes.",
    },
    {
      id: 2,
      user: 'SkyWatcher',
      avatar: '👤',
      time: '14:03',
      content:
        "Checking the telemetry now. It might be a rotation anomaly or a debris cloud passing in front. Sending the light curve graph:",
      attachment: {
        name: 'Light_Curve_2024-BX_Analysis.pdf',
        size: '2.4 MB',
        type: 'PDF Document',
        thumbnail: '/placeholder-chart.jpg',
      },
    },
    {
      id: 3,
      type: 'alert',
      content: 'AUTOMATED ALERT: HIGH VELOCITY OBJECT DETECTED IN SECTOR 4',
      time: '14:05',
    },
    {
      id: 4,
      user: 'AstroNut_99',
      avatar: '🚀',
      time: '14:05',
      content: "I'm confirming the rotation anomaly on my feed. Looks like a tumbler! 🪐",
      isCurrentUser: true,
    },
    {
      id: 5,
      user: 'Dr. V. Nova',
      avatar: '👨‍🔬',
      time: '',
      content: '',
      typing: true,
    },
  ];

  return (
    <div className="h-screen bg-[#0a0e1a] text-white flex flex-col">
      <DashboardNavbar />

      {/* Chat Channel Header */}
      <div className="border-b border-gray-800 bg-[#0d1117] px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1 hover:bg-gray-800 rounded transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-sm font-medium">#hazardous-finds</span>
          <span className="text-xs text-gray-500 hidden sm:inline">|</span>
          <span className="text-xs text-gray-400 hidden lg:inline">Tracking potential earth-crossers and analyzing impact probabilities</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-[#0d1117]" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-[#0d1117]" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-[#0d1117] hidden sm:block" />
            <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-[#0d1117] flex items-center justify-center text-xs">
              +5
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Backdrop (Mobile) */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Left Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:static
          inset-y-0 left-0
          z-20
          w-60 bg-[#0d1117] border-r border-gray-800 flex flex-col
          transition-transform duration-300 ease-in-out
          mt-[57px] md:mt-0
        `}>
          {/* New Observation Button */}
          <div className="p-3">
            <button className="w-full px-4 py-2 bg-[#0a0e1a] border border-gray-800 hover:border-blue-500 rounded text-sm transition-colors flex items-center justify-center gap-2 text-blue-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Observation
            </button>
          </div>

          {/* Public Channels */}
          <div className="px-3 py-2">
            <button className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-gray-300 mb-2">
              <span className="font-semibold uppercase">Public Channels</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                    channel.active ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                  }`}
                >
                  {typeof channel.icon === 'string' ? (
                    <span className="text-base">{channel.icon}</span>
                  ) : (
                    <channel.icon className="w-4 h-4" />
                  )}
                  <span className="flex-1 text-left">{channel.name}</span>
                  {channel.unread && (
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Personnel */}
          <div className="px-3 py-2 mt-4">
            <div className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-gray-300 mb-2">
              <span className="font-semibold uppercase">Personnel</span>
              <button className="hover:text-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              {personnel.map((person) => (
                <button
                  key={person.id}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-300 transition-colors"
                >
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                      {person.avatar}
                    </div>
                    {person.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-[#0d1117]" />
                    )}
                  </div>
                  <span className="flex-1 text-left">{person.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Profile at Bottom */}
          <div className="mt-auto border-t border-gray-800 p-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0d1117]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">AstroNut_99</div>
                <div className="text-xs text-gray-400">Online</div>
              </div>
              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-800 rounded transition-colors">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-4">Today, October 24th</div>
            </div>

            {messages.map((message) => {
              if (message.type === 'alert') {
                return (
                  <div key={message.id} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {message.content}
                    </div>
                  </div>
                );
              }

              if (message.typing) {
                return (
                  <div key={message.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 text-xl">
                      {message.avatar}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">{message.user} is typing...</div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={message.id} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 text-xl">
                    {message.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-sm">{message.user}</span>
                      {message.user === 'SkyWatcher' && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded font-medium">Admin</span>
                      )}
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <div className="text-sm text-gray-300">{message.content}</div>
                    {message.attachment && (
                      <div className="mt-2 bg-[#0d1117] border border-gray-800 rounded-lg p-3 max-w-md">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-blue-400 truncate hover:underline cursor-pointer">
                              {message.attachment.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.attachment.size} • {message.attachment.type}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button className="text-xs text-blue-400 hover:text-blue-300">Download</button>
                              <span className="text-gray-700">|</span>
                              <button className="text-xs text-blue-400 hover:text-blue-300">View Online</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-800 p-4">
            <div className="text-xs text-gray-500 mb-2">Transmission to #hazardous-finds...</div>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded transition-colors">
                <Paperclip className="w-4 h-4 text-gray-400" />
              </button>
              <div className="flex-1 bg-[#0d1117] border border-gray-800 rounded-lg flex items-center">
                <input
                  type="text"
                  placeholder="Press Enter to send"
                  className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
                />
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded transition-colors">
                  <Smile className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
                Send
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Cosmic Watch Network • Secure Transmission • v2.4.1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
