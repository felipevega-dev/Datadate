"use client";

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Award, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { lessons } from '@/lib/lessons';
import Link from 'next/link';
import { getUserRank } from '@/lib/firestore';

export default function ProfilePage() {
  const { user, userProgress, loading } = useAuth();
  const router = useRouter();
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getUserRank(user.uid).then(setUserRank);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  if (!user || !userProgress) {
    return null;
  }

  const completionPercentage = (userProgress.completedLessons.length / lessons.length) * 100;
  const sqlLessons = lessons.filter(l => l.id > 0); // Excluir lección 0
  const completedSqlLessons = sqlLessons.filter(l => userProgress.completedLessons.includes(l.id));

  const certificates = [
    {
      id: 'sql-basico',
      title: 'SQL Básico',
      description: 'Completa las lecciones 1-5',
      icon: '🥉',
      unlocked: userProgress.certificates.includes('sql-basico'),
      requirement: 5
    },
    {
      id: 'sql-intermedio',
      title: 'SQL Intermedio',
      description: 'Completa las lecciones 1-10',
      icon: '🥈',
      unlocked: userProgress.certificates.includes('sql-intermedio'),
      requirement: 10
    },
    {
      id: 'sql-avanzado',
      title: 'SQL Avanzado',
      description: 'Completa las lecciones 1-18',
      icon: '🥇',
      unlocked: userProgress.certificates.includes('sql-avanzado'),
      requirement: 18
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header del perfil */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-start gap-6">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Usuario'}
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold border-4 border-white">
                  {user.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{user.displayName || 'Usuario'}</h1>
                <p className="text-blue-100 mb-4">{user.email}</p>
                
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6" />
                    <div>
                      <div className="text-2xl font-bold">{userProgress.totalXP}</div>
                      <div className="text-xs text-blue-100">XP Total</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    <div>
                      <div className="text-2xl font-bold">{userProgress.completedLessons.length}</div>
                      <div className="text-xs text-blue-100">Lecciones Completadas</div>
                    </div>
                  </div>
                  
                  {userRank && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-6 h-6" />
                      <div>
                        <div className="text-2xl font-bold">#{userRank}</div>
                        <div className="text-xs text-blue-100">Ranking Global</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progreso general */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Progreso en SQL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">
                        {userProgress.completedLessons.length} de {lessons.length} lecciones
                      </span>
                      <span className="text-sm text-gray-600">
                        {Math.round(completionPercentage)}%
                      </span>
                    </div>
                    <Progress value={completionPercentage} />
                  </div>

                  <div className="space-y-2 mt-6">
                    <h3 className="font-semibold text-sm text-gray-700 mb-3">Lecciones completadas:</h3>
                    {completedSqlLessons.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {completedSqlLessons.map(lesson => (
                          <Link
                            key={lesson.id}
                            href={`/lesson/${lesson.id}`}
                            className="flex items-center gap-2 p-3 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            <Trophy className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-green-900 truncate">
                                Lección {lesson.id}
                              </div>
                              <div className="text-xs text-green-700 truncate">
                                {lesson.title}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Aún no has completado ninguna lección. ¡Empieza ahora!
                      </p>
                    )}
                  </div>

                  {userProgress.currentLesson <= lessons.length && (
                    <Link
                      href={`/lesson/${userProgress.currentLesson}`}
                      className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Continuar a Lección {userProgress.currentLesson}
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Certificados */}
            <div className="space-y-6">
              <Card id="certificates">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Certificados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificates.map(cert => (
                      <div
                        key={cert.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          cert.unlocked
                            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                            : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{cert.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-sm mb-1">{cert.title}</h3>
                            <p className="text-xs text-gray-600 mb-2">{cert.description}</p>
                            {cert.unlocked ? (
                              <div className="text-xs font-semibold text-green-600 flex items-center gap-1">
                                <Trophy className="w-3 h-3" />
                                Desbloqueado
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">
                                {userProgress.completedLessons.length}/{cert.requirement} lecciones
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Estadísticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Miembro desde</span>
                      <span className="text-sm font-semibold">
                        {userProgress.createdAt.toDate().toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Última actividad</span>
                      <span className="text-sm font-semibold">
                        {userProgress.updatedAt.toDate().toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

