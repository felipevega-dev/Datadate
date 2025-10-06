"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { User, LogOut, Trophy, Award } from 'lucide-react';
import Link from 'next/link';

export function UserMenu() {
  const { user, userProgress, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'Usuario'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <span className="text-sm font-medium hidden md:block">
          {user.displayName || 'Usuario'}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border-2 border-gray-200 py-2 z-20">
            <div className="px-4 py-3 border-b-2 border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                {user.displayName || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
              {userProgress && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-blue-600">
                    {userProgress.totalXP} XP
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    {userProgress.completedLessons.length} lecciones
                  </span>
                </div>
              )}
            </div>

            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Mi Perfil</span>
            </Link>

            <Link
              href="/leaderboard"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Trophy className="w-4 h-4" />
              <span className="text-sm">Ranking</span>
            </Link>

            {userProgress && userProgress.certificates.length > 0 && (
              <Link
                href="/profile#certificates"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Award className="w-4 h-4" />
                <span className="text-sm">
                  Certificados ({userProgress.certificates.length})
                </span>
              </Link>
            )}

            <div className="border-t-2 border-gray-200 mt-2 pt-2">
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

