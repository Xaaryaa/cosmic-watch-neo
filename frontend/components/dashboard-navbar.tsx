'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, Menu, X, LogOut, Radar, Settings, Radio, Globe } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import Logo from '@/components/ui/logo';

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'MISSION CONTROL', icon: <Radar className="w-4 h-4" /> },
  { href: '/dashboard/analysis', label: 'ANALYSIS', icon: <Radio className="w-4 h-4" /> },
  { href: '/dashboard/simulation', label: 'SIMULATION', icon: <Globe className="w-4 h-4" /> },
  { href: '/dashboard/settings', label: 'SYSTEM', icon: <Settings className="w-4 h-4" /> },
];

export default function DashboardNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href || pathname?.startsWith('/dashboard/asteroids');
    }
    return pathname === href;
  };

  return (
    <header className="border-b border-green-900/50 bg-[#050810] relative">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                      px-4 py-2 flex items-center gap-2 text-sm font-bold tracking-wider transition-all clip-path-slant
                      ${active
                      ? 'bg-green-500/10 text-green-400 border-l-2 border-green-500'
                      : 'text-gray-500 hover:text-green-300 hover:bg-green-500/5'}
                    `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative hidden lg:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-700 group-focus-within:text-green-500 transition-colors" />
              <input
                type="text"
                placeholder="SEARCH DATABASE..."
                className="bg-[#0a0e1a] border border-green-900/50 rounded-none pl-10 pr-4 py-2 text-xs w-64 text-green-400 placeholder-green-900 focus:outline-none focus:border-green-500 transition-colors uppercase tracking-widest"
              />
            </div>

            {isAuthenticated ? (
              <>
                <button className="text-green-700 hover:text-green-400 relative transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>
                <div className="h-8 px-3 border border-green-900/50 bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-400 tracking-widest">
                  COMMANDER
                </div>
                <button onClick={logout} className="text-gray-600 hover:text-red-400 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="px-4 py-2 text-xs font-bold text-green-400 hover:bg-green-500/10 border border-transparent hover:border-green-500/30 transition-all uppercase tracking-wider">Login</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-green-500 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-green-900/30 pt-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    px-4 py-3 flex items-center gap-2 text-sm font-bold tracking-wider border-l-2
                    ${isActive(item.href)
                      ? 'bg-green-500/10 text-green-400 border-green-500'
                      : 'text-gray-500 border-transparent hover:bg-green-500/5'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && (
                <button onClick={logout} className="px-4 py-3 text-left text-red-500 hover:bg-red-500/10 text-sm font-bold tracking-wider flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> ABORT SESSION
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
