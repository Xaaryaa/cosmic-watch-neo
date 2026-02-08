import Link from 'next/link';
import { Filter, Plus, Trash2 } from 'lucide-react';
import DashboardNavbar from '@/components/dashboard-navbar';

export default function WatchlistPage() {
  const stats = {
    trackedObjects: 8,
    highRisk: 1,
    nextApproach: '3d 12h',
    dataSource: 'Live (NASA)',
  };

  const watchlistItems = [
    {
      id: '99942',
      name: '99942 Apophis',
      riskLevel: 'High Risk',
      riskStyle: 'bg-red-500/10 text-red-400 border-red-500/20',
      icon: '⚠️',
      iconBg: 'bg-red-500/10',
      idNumber: 'ID: 2004942',
      approach: 'Apr 13, 2029',
      distance: '0.1 LD',
    },
    {
      id: '101955',
      name: '101955 Bennu',
      riskLevel: 'Medium Risk',
      riskStyle: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      icon: '🔶',
      iconBg: 'bg-yellow-500/10',
      idNumber: 'ID: 2101955',
      approach: 'Sep 24, 2182',
      distance: 'Unknown',
    },
    {
      id: '2023-dz2',
      name: '2023 DZ2',
      riskLevel: 'Low Risk',
      riskStyle: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: '🚀',
      iconBg: 'bg-blue-500/10',
      idNumber: 'ID: 5434621',
      approach: 'Mar 25, 2026',
      distance: '12 LD',
    },
    {
      id: '2024-bx1',
      name: '2024 BX1',
      riskLevel: 'Low Risk',
      riskStyle: 'bg-green-500/10 text-green-400 border-green-500/20',
      icon: '🛡️',
      iconBg: 'bg-green-500/10',
      idNumber: 'ID: 5442190',
      approach: 'Jan 27, 2024',
      distance: '0.8 LD',
    },
    {
      id: '433',
      name: '433 Eros',
      riskLevel: 'No Threat',
      riskStyle: 'bg-green-500/10 text-green-400 border-green-500/20',
      icon: '✅',
      iconBg: 'bg-green-500/10',
      idNumber: 'ID: 0000433',
      approach: 'Jan 24, 2056',
      distance: '142 LD',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <DashboardNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Your Watchlist</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage your tracked celestial objects and monitor potential threats.</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0d1117] border border-gray-800 rounded-lg text-sm hover:border-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Add Object
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Tracked Objects */}
          <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">TRACKED OBJECTS</h3>
            <div className="flex items-center gap-2">
              <div className="text-2xl sm:text-3xl font-bold">{stats.trackedObjects}</div>
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </div>
          </div>

          {/* High Risk */}
          <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">HIGH RISK</h3>
            <div className="flex items-center gap-2">
              <div className="text-2xl sm:text-3xl font-bold">{stats.highRisk}</div>
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Next Approach */}
          <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">NEXT APPROACH</h3>
            <div className="flex items-center gap-2">
              <div className="text-2xl sm:text-3xl font-bold">{stats.nextApproach}</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" />
                </svg>
              </div>
            </div>
          </div>

          {/* Data Source */}
          <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">DATA SOURCE</h3>
            <div className="flex items-center gap-2">
              <div className="text-lg sm:text-xl font-bold">{stats.dataSource}</div>
            </div>
          </div>
        </div>

        {/* Watchlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {watchlistItems.map((item) => (
            <div key={item.id} className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-gray-700 transition-colors relative group">
              {/* Delete Button */}
              <button className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-red-500/20 rounded-lg transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
              </button>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg ${item.iconBg} flex items-center justify-center mb-4 text-2xl`}>
                {item.icon}
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>

              {/* Risk Badge */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${item.riskStyle}`}>
                {item.riskLevel}
              </span>

              {/* ID */}
              <div className="text-xs text-gray-500 mb-4">{item.idNumber}</div>

              {/* Details */}
              <div className="space-y-2 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">APPROACH</span>
                  <span className="font-medium">{item.approach}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">DISTANCE</span>
                  <span className="font-medium">{item.distance}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Object Card */}
          <button className="bg-[#0d1117] border-2 border-dashed border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors flex flex-col items-center justify-center min-h-[280px] group">
            <div className="w-16 h-16 rounded-full bg-gray-800 group-hover:bg-blue-500/10 flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-8 h-8 text-gray-600 group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">Track New Object</h3>
            <p className="text-sm text-gray-400 text-center">Search database by ID or name</p>
          </button>
        </div>

        {/* Empty State (shown when no items) */}
        {watchlistItems.length === 0 && (
          <div className="mt-12 bg-[#0d1117] border border-gray-800 rounded-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              {/* Illustration placeholder */}
              <div className="w-64 h-64 mx-auto mb-8 rounded-lg bg-gradient-to-b from-blue-500/5 to-purple-500/5 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-3">Your Watchlist is Looking Empty</h2>
              <p className="text-gray-400 mb-6">
                You have not saved any celestial objects yet. Browse the NASA database to start tracking asteroids and comets.
              </p>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                Browse Database
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
