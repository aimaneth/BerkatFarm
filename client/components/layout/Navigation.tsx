'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { UserRole } from '@/shared/types/auth';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('Navigation - Session:', session);
    console.log('Navigation - Status:', status);
  }, [session, status]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const buttonStyles = {
    primary: "group inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-0.5",
    secondary: "text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 hover:scale-105",
    danger: "group inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white/70 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo.png"
              alt="Berkat Farm"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text">
              Berkat Farm
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {/* Menu Links */}
            <div className="flex items-center space-x-8 px-8 border-r border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium transition-all duration-200 hover:scale-105 ${
                    pathname === item.href
                      ? 'text-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 pl-8">
              {status === 'authenticated' && session?.user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/dashboard"
                    className={buttonStyles.secondary}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={buttonStyles.danger}
                  >
                    Sign Out
                  </button>
                </div>
              ) : status === 'loading' ? (
                <div>Loading...</div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={buttonStyles.secondary}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={buttonStyles.primary}
                  >
                    Sign Up
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 px-4 py-2">
          {/* Menu Links */}
          <div className="space-y-1 pb-3 border-b border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="py-3 space-y-3">
            {status === 'authenticated' && session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <div className="px-3">
                  <button
                    onClick={handleSignOut}
                    className={buttonStyles.danger + " w-full justify-center"}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : status === 'loading' ? (
              <div>Loading...</div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                >
                  Login
                </Link>
                <div className="px-3">
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={buttonStyles.primary + " w-full justify-center"}
                  >
                    Sign Up
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 