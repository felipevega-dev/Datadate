"use client";

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { getLeaderboard, LeaderboardEntry } from '@/lib/firestore';
import { useAuth } from '@/lib/auth-context';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await getLeaderboard(100);
        setLeaderboard(data);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-400';
    if (rank === 2) return 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-400';
    if (rank === 3) return 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-400';
    return 'bg-white border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Ranking Global</h1>
                <p className="text-blue-100">Los mejores programadores de la plataforma</p>
              </div>
            </div>
            
            {user && (
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-blue-100 mb-1">Tu posición</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Usuario'}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                        {user.displayName?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="font-semibold text-lg">{user.displayName}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      #{leaderboard.findIndex(entry => entry.userId === user.uid) + 1 || '?'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Top 100
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-500">
                  Cargando ranking...
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aún no hay usuarios en el ranking. ¡Sé el primero!
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    const isCurrentUser = user?.uid === entry.userId;
                    const rankIcon = getRankIcon(rank);

                    return (
                      <div
                        key={entry.userId}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          getRankColor(rank)
                        } ${isCurrentUser ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Rank */}
                          <div className="w-12 text-center">
                            {rankIcon || (
                              <span className={`text-lg font-bold ${
                                rank <= 10 ? 'text-blue-600' : 'text-gray-600'
                              }`}>
                                #{rank}
                              </span>
                            )}
                          </div>

                          {/* Avatar */}
                          {entry.photoURL ? (
                            <img
                              src={entry.photoURL}
                              alt={entry.displayName}
                              className="w-12 h-12 rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                              {entry.displayName[0]?.toUpperCase() || 'U'}
                            </div>
                          )}

                          {/* User info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">
                                {entry.displayName}
                              </span>
                              {isCurrentUser && (
                                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
                                  Tú
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {entry.completedLessons} {entry.completedLessons === 1 ? 'lección completada' : 'lecciones completadas'}
                            </div>
                          </div>

                          {/* XP */}
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              <span className="text-xl font-bold text-blue-600">
                                {entry.totalXP}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">XP</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info sobre XP */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="w-5 h-5 text-blue-600" />
                ¿Cómo ganar XP?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Completa una lección: <span className="font-semibold">+100 XP</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Completa un objetivo: <span className="font-semibold">+20 XP</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Obtén certificados al completar múltiples lecciones
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Compite con otros usuarios para llegar al top 10
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

