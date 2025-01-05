'use client';

import { Button } from '@/components/ui/Button';
import { Leaf, Menu } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        {/* Backdrop Blur with Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/95 to-emerald-950/80 backdrop-blur-xl border-b border-white/5" />
        
        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-white group">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all">
                <Leaf className="w-5 h-5 text-emerald-950" />
              </div>
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">FarmSoul</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-emerald-100/80 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-emerald-100/80 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/#contact" className="text-emerald-100/80 hover:text-white transition-colors">
                Contact
              </Link>
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <Link href="/(auth)/login" className="contents">
                  <Button variant="ghost" className="text-emerald-100 hover:bg-emerald-100/10 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/(auth)/register" className="contents">
                  <Button className="bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-emerald-100 hover:bg-emerald-100/10 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 