import Link from 'next/link';
import { ChevronLeft, RefreshCw, Share2, Play, Bell, Bookmark } from 'lucide-react';
import DashboardNavbar from '@/components/dashboard-navbar';

export default function AsteroidDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in a real app, this would be fetched based on params.id
  const asteroidData = {
    name: '99942 Apophis',
    designation: '2004 MN4',
    description:
      'Near-Earth asteroid that caused a brief period of concern in December 2004 because initial observations indicated a probability of up to 2.7% that it would hit Earth on April 13, 2029.',
    status: 'POTENTIALLY HAZARDOUS',
    classification: 'ATEN GROUP',
    diameter: {
      value: 370,
      unit: 'm',
      detail: '~11 football fields',
    },
    velocity: {
      value: 30.73,
      unit: 'km/s',
      detail: 'Relative to Earth',
    },
    missDistance: {
      value: 0.11,
      unit: 'AU',
      detail: '16,456,000 km',
    },
    riskAnalysis: {
      torinoScale: 1,
      level: 'NORMAL',
      impactProb: '2.7e-6',
      palermoScale: '-2.02',
    },
    nextCloseApproach: {
      date: 'Apr 13, 2029',
      distance: '0.0003 AU',
      detail: 'This will be a naked-eye visibility event',
    },
    orbitalElements: {
      semiMajorAxis: '0.922 AU',
      eccentricity: '0.191',
      inclination: '3.331 deg',
      perihelionPeriod: '328.6 days',
    },
    physicalParameters: {
      rotationPeriod: '30.4 h',
      absoluteMagnitude: '19.7',
      geometricAlbedo: 'Sq',
      spectralType: 'Sq',
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <DashboardNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 sm:mb-6">
          <Link href="/dashboard" className="hover:text-gray-300">
            Asteroids
          </Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-white">Detail View</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">{asteroidData.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    <span className="px-2 sm:px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/20">
                      {asteroidData.status}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full">
                      {asteroidData.classification}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{asteroidData.description}</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
                {/* Diameter */}
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <h3 className="text-xs text-gray-400 uppercase font-medium">Est. Diameter</h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {asteroidData.diameter.value} <span className="text-sm text-gray-400">{asteroidData.diameter.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{asteroidData.diameter.detail}</div>
                </div>

                {/* Velocity */}
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="text-xs text-gray-400 uppercase font-medium">Rel. Velocity</h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {asteroidData.velocity.value} <span className="text-sm text-gray-400">{asteroidData.velocity.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{asteroidData.velocity.detail}</div>
                </div>

                {/* Miss Distance */}
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-xs text-gray-400 uppercase font-medium">Miss Distance</h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {asteroidData.missDistance.value} <span className="text-sm text-gray-400">{asteroidData.missDistance.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{asteroidData.missDistance.detail}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0e1a] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm">Refresh</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0e1a] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0e1a] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Simulate</span>
                </button>
              </div>
            </div>

            {/* Visualization */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="relative h-64 sm:h-96 bg-gradient-to-br from-[#0a0e1a] to-[#1a1f2e] rounded-lg overflow-hidden">
                {/* Placeholder for 3D visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mx-auto mb-4 shadow-lg shadow-orange-500/30 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                    </div>
                    <div className="text-xs text-gray-500">99942 Apophis</div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-gray-500">Simulation Mode: Real-time</div>
              </div>
            </div>

            {/* Orbital Elements */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20M2 12h20" />
                </svg>
                Orbital Elements
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase mb-1">Semi-Major Axis</div>
                  <div className="text-lg font-semibold">{asteroidData.orbitalElements.semiMajorAxis}</div>
                </div>
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase mb-1">Eccentricity</div>
                  <div className="text-lg font-semibold">{asteroidData.orbitalElements.eccentricity}</div>
                </div>
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase mb-1">Inclination</div>
                  <div className="text-lg font-semibold">{asteroidData.orbitalElements.inclination}</div>
                </div>
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase mb-1">Perihelion Period</div>
                  <div className="text-lg font-semibold">{asteroidData.orbitalElements.perihelionPeriod}</div>
                </div>
              </div>
            </div>

            {/* Physical Parameters */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Physical Parameters
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase mb-1">Rotation Period</div>
                  <div className="text-lg font-semibold">{asteroidData.physicalParameters.rotationPeriod}</div>
                </div>
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase mb-1">Absolute Magnitude</div>
                  <div className="text-lg font-semibold">{asteroidData.physicalParameters.absoluteMagnitude}</div>
                </div>
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase mb-1">Geometric Albedo</div>
                  <div className="text-lg font-semibold">{asteroidData.physicalParameters.geometricAlbedo}</div>
                </div>
                <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase mb-1">Spectral Type</div>
                  <div className="text-lg font-semibold">{asteroidData.physicalParameters.spectralType}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Risk Analysis & Actions */}
          <div className="space-y-4 sm:space-y-6">
            {/* Risk Analysis */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Risk Analysis
              </h2>

              {/* Torino Scale Gauge */}
              <div className="mb-6">
                <div className="relative w-40 h-40 mx-auto">
                  {/* Circular Progress */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#1a1f2e" strokeWidth="12" />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray="440"
                      strokeDashoffset="396"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold">{asteroidData.riskAnalysis.torinoScale}</div>
                    <div className="text-xs text-gray-400 uppercase mt-1">{asteroidData.riskAnalysis.level}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-gray-400 mb-2">Torino Scale</div>
                  <div className="text-sm text-gray-300 mb-3">
                    A calculation that expresses no unusual level of danger. Current probability of impact is extremely low.
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500" />
                    <span className="text-xs text-gray-500">10</span>
                  </div>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="text-sm text-gray-400">Impact Prob.</span>
                  <span className="text-sm font-medium">{asteroidData.riskAnalysis.impactProb}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="text-sm text-gray-400">Palermo Scale</span>
                  <span className="text-sm font-medium">{asteroidData.riskAnalysis.palermoScale}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Add to Watchlist
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0a0e1a] border border-gray-800 hover:border-gray-700 rounded-lg transition-colors">
                  <Bell className="w-4 h-4" />
                  Set Alert
                </button>
              </div>
            </div>

            {/* Next Close Approach */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Next Close Approach
              </h2>
              <div className="bg-[#0a0e1a] border border-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">{asteroidData.nextCloseApproach.date}</div>
                <div className="text-sm text-gray-400 mb-3">Distance: {asteroidData.nextCloseApproach.distance}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{asteroidData.nextCloseApproach.detail}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
