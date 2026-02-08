"use client";

import { Scan, Disc } from 'lucide-react';

export default function Logo({ className = "", size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
    const sizeClasses = {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-3xl"
    };

    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    };

    return (
        <div className={`flex items-center gap-3 font-mono tracking-widest ${className} group cursor-default`}>
            <div className="relative flex items-center justify-center">
                <Scan className={`${iconSizes[size]} text-green-500 animate-pulse`} />
                <div className="absolute inset-0 bg-green-500/20 blur-md rounded-full animate-pulse"></div>
                <Disc className={`${iconSizes[size]} text-green-300 absolute opacity-50 animate-spin-slow`} />
            </div>

            <div className="flex flex-col">
                <span className={`${sizeClasses[size]} font-bold text-white leading-none`}>
                    COSMIC<span className="text-green-500">WATCH</span>
                </span>
                <span className="text-[0.5rem] text-green-500/70 tracking-[0.2em] uppercase">
                    Planetary Defense
                </span>
            </div>
        </div>
    );
}
