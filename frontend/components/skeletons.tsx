export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-800/50 rounded-lg ${className}`} />
    );
}

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            {/* Navbar Skeleton */}
            <div className="h-16 border-b border-gray-800 bg-[#0d1117] flex items-center px-6">
                <Skeleton className="w-32 h-6" />
            </div>

            <main className="container mx-auto px-6 py-8">
                {/* Header Skeleton */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <Skeleton className="w-48 h-8 mb-2" />
                        <Skeleton className="w-64 h-4" />
                    </div>
                    <Skeleton className="w-24 h-6" />
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
                                <Skeleton className="w-24 h-4 mb-4" />
                                <Skeleton className="w-16 h-8 mb-1" />
                                <Skeleton className="w-20 h-3" />
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1 bg-[#0d1117] border border-gray-800 rounded-lg p-6">
                        <Skeleton className="w-full h-8 mb-4" />
                        <div className="space-y-3">
                            <Skeleton className="w-full h-12" />
                            <Skeleton className="w-full h-12" />
                            <Skeleton className="w-full h-12" />
                        </div>
                    </div>
                </div>

                {/* Middle Section Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-[#0d1117] border border-gray-800 rounded-lg p-6">
                        <Skeleton className="w-48 h-6 mb-6" />
                        <Skeleton className="w-full h-80 inverted-colors" />
                    </div>
                    <div className="lg:col-span-1 bg-[#0d1117] border border-gray-800 rounded-lg p-6">
                        <Skeleton className="w-32 h-6 mb-6" />
                        <Skeleton className="w-full h-80" />
                    </div>
                </div>
            </main>
        </div>
    );
}
