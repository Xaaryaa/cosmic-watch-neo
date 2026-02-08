import Link from 'next/link';
import { Bell, Filter, ChevronLeft, Edit, Trash2, Plus, BarChart2, PauseCircle } from 'lucide-react';
import DashboardNavbar from '@/components/dashboard-navbar';

export default function AlertsPage() {
  const alertStats = {
    all: 10,
    active: 0,
    triggered: 0,
    paused: 0,
  };

  const alerts = [
    {
      id: 1,
      name: 'Apophis (99942)',
      status: 'triggered',
      statusText: 'TRIGGERED: 15 MIN AGO',
      statusStyle: 'bg-red-500/10 text-red-400 border-red-500/20',
      indicator: 'bg-red-500',
      icon: '⚠️',
      iconBg: 'bg-red-500/10',
      conditionId: '#ALT-2024-01',
      condition: 'Distance to Earth < 35,000 km',
      current: '32,400 km',
      threshold: '35,000 km',
      progress: 92,
      progressColor: 'bg-red-500',
      actionRequired: true,
      actionText: 'Action Required',
    },
    {
      id: 2,
      name: 'Bennu (101955)',
      status: 'active',
      statusText: 'MONITORING: ACTIVE',
      statusStyle: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      indicator: 'bg-blue-500',
      icon: '🔵',
      iconBg: 'bg-blue-500/10',
      conditionId: '#ALT-2024-05',
      condition: 'Velocity Change > 12.5 km/s',
      current: '5.8 km/s',
      threshold: '12.5 km/s',
      progress: 46,
      progressColor: 'bg-blue-500',
      actionRequired: false,
      actionText: 'Within Limits',
    },
    {
      id: 3,
      name: '2023 DW',
      status: 'active',
      statusText: 'MONITORING: ACTIVE',
      statusStyle: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      indicator: 'bg-blue-500',
      icon: '🔷',
      iconBg: 'bg-blue-500/10',
      conditionId: '#ALT-2023-88',
      condition: 'Impact Probability > 1%',
      current: '0.1%',
      threshold: '1.0%',
      progress: 10,
      progressColor: 'bg-blue-500',
      actionRequired: false,
      actionText: 'Within Limits',
    },
    {
      id: 4,
      name: 'Didymos (65803)',
      status: 'paused',
      statusText: 'MONITORING: PAUSED',
      statusStyle: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      indicator: 'bg-gray-500',
      icon: '⏸️',
      iconBg: 'bg-gray-500/10',
      conditionId: '#ALT-2023-42',
      condition: 'Brightness Magnitude < 15.0',
      current: '--',
      threshold: '15.0',
      progress: 0,
      progressColor: 'bg-gray-500',
      actionRequired: false,
      actionText: 'Paused by user',
      isPaused: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <DashboardNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 sm:mb-6">
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-white">Alerts Management</span>
        </div>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Alerts Management</h1>
              <p className="text-sm sm:text-base text-gray-400">
                Configure and monitor your interstellar asteroid tracking parameters. Manage trigger conditions for close approaches and potential impact events.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors whitespace-nowrap">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Create New Alert</span>
              <span className="sm:hidden">New Alert</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-3 sm:p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter alerts by asteroid name, ID, or condition...</span>
              <span className="sm:hidden">Filter alerts...</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                All Alerts
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">{alertStats.all}</span>
              </button>
              <button className="px-4 py-2 bg-[#0a0e1a] border border-gray-800 hover:border-gray-700 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Active
              </button>
              <button className="px-4 py-2 bg-[#0a0e1a] border border-gray-800 hover:border-gray-700 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Triggered
              </button>
              <button className="px-4 py-2 bg-[#0a0e1a] border border-gray-800 hover:border-gray-700 rounded-lg text-sm flex items-center gap-2">
                <PauseCircle className="w-4 h-4 text-gray-400" />
                Paused
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-[#0d1117] rounded-lg overflow-hidden ${
                alert.status === 'triggered' ? 'border-2 border-red-500/30' : 'border border-gray-800'
              }`}
            >
              {/* Alert Header */}
              <div className="p-4 sm:p-6 border-b border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className={`w-10 h-10 rounded-lg ${alert.iconBg} flex items-center justify-center text-xl`}>
                      {alert.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{alert.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${alert.statusStyle}`}>
                        {alert.statusText}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>

                {/* Condition */}
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">CONDITION</span>
                    <span className="text-xs text-gray-500">{alert.conditionId}</span>
                  </div>
                  <div className="text-sm font-medium mb-3">{alert.condition}</div>

                  {/* Progress Bar */}
                  {!alert.isPaused && (
                    <>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                        <div className={`h-full ${alert.progressColor}`} style={{ width: `${alert.progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Current: {alert.current}</span>
                        <span className="text-gray-500">Threshold: {alert.threshold}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Status */}
                <div className="mt-4 flex items-center justify-between">
                  {alert.actionRequired ? (
                    <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {alert.actionText}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {alert.actionText}
                    </div>
                  )}
                  <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Create Custom Alert Card */}
          <button className="bg-[#0d1117] border-2 border-dashed border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors flex flex-col items-center justify-center min-h-[320px] group">
            <div className="w-16 h-16 rounded-full bg-gray-800 group-hover:bg-blue-500/10 flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-8 h-8 text-gray-600 group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">Create Custom Alert</h3>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              Define specific parameters for orbital elements or physical properties.
            </p>
          </button>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">
            Showing <span className="font-medium text-white">4</span> of <span className="font-medium text-white">12</span> alerts
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#0d1117] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
