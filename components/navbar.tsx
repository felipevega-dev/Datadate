"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from './auth-modal';
import { UserMenu } from './user-menu';

export function Navbar() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <nav className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeAcademy Español
                </h1>
                <p className="text-xs text-gray-500">Aprende a programar de forma interactiva</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/lesson/1">
                <Button variant="ghost">Lecciones</Button>
              </Link>
              
              {user && (
                <>
                  <Link href="/profile">
                    <Button variant="ghost">Mi Progreso</Button>
                  </Link>
                  <Link href="/leaderboard">
                    <Button variant="ghost">Ranking</Button>
                  </Link>
                </>
              )}
              
              {loading ? (
                <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-lg" />
              ) : user ? (
                <UserMenu />
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}

