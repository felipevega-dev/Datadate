"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Trophy } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { completLesson } from "@/lib/firestore";
import { CSSLesson, getCSSLessonById } from "@/lib/css-lessons";

interface CSSEditorProps {
  lessonId: number;
  nextLessonId?: number | null;
  nextLessonTitle?: string;
}

export default function CSSEditor({ lessonId, nextLessonId, nextLessonTitle }: CSSEditorProps) {
  const lesson = getCSSLessonById(lessonId)!;
  const { user, userProgress, refreshUserProgress } = useAuth();
  const [css, setCSS] = useState(lesson.initialCSS);
  const [completedObjectives, setCompletedObjectives] = useState<boolean[]>(
    new Array(lesson.objectives.length).fill(false)
  );
  const [allCompleted, setAllCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);

  const isAlreadyCompleted = userProgress?.completedLessons.includes(lessonId) || false;

  // Auto-validar objetivos con debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      checkObjectives(css);
    }, 500);

    return () => clearTimeout(timeout);
  }, [css]);

  const checkObjectives = useCallback((css: string) => {
    if (!lesson.testCases) return;

    const newCompleted = lesson.testCases.map(testCase => testCase.test(css));
    setCompletedObjectives(newCompleted);

    const allDone = newCompleted.every(completed => completed);
    if (allDone && !allCompleted) {
      setAllCompleted(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
      
      if (user && !isAlreadyCompleted) {
        saveProgress();
      }
    }
  }, [lesson, allCompleted, user, isAlreadyCompleted]);

  const saveProgress = async () => {
    if (!user || isAlreadyCompleted) return;
    
    try {
      const xp = await completLesson(user.uid, lessonId, lesson.objectives.length);
      setXpEarned(xp);
      await refreshUserProgress();
      setTimeout(() => setXpEarned(null), 5000);
    } catch (error) {
      console.error('Error al guardar progreso:', error);
    }
  };

  const handleShowSolution = () => {
    if (!lesson.solutions) return;
    const nextIncompleteIndex = completedObjectives.findIndex(completed => !completed);
    if (nextIncompleteIndex !== -1 && lesson.solutions[nextIncompleteIndex]) {
      const solution = lesson.solutions[nextIncompleteIndex];
      if (solution) {
        setCSS((prev) => prev + "\n\n" + solution);
      }
    }
  };

  return (
    <div className="space-y-6">
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-6 rounded-2xl shadow-2xl animate-fade-scale">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-12 h-12" />
              <div>
                <div className="text-3xl font-bold">¡Excelente trabajo!</div>
                <div className="text-lg">Has completado todos los objetivos</div>
                {xpEarned && user && (
                  <div className="text-sm mt-2 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span>+{xpEarned} XP ganados</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isAlreadyCompleted && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <Trophy className="w-6 h-6 text-blue-600" />
          <div className="text-sm text-blue-900">
            <span className="font-semibold">Ya completaste esta lección.</span>
            {' '}Sigue practicando o avanza a la siguiente lección.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Preview - 50% */}
        <div className="lg:col-span-6">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-900">
                Vista Previa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-white min-h-[400px] overflow-auto">
                <style dangerouslySetInnerHTML={{ __html: css }} />
                <div dangerouslySetInnerHTML={{ __html: lesson.initialHTML }} />
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                La vista se actualiza automáticamente mientras escribes
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Editor y Objetivos - 50% */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-900">
                Editor CSS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`border rounded-md overflow-hidden relative transition-all duration-500 ${
                allCompleted ? 'ring-4 ring-green-400 border-green-400 bg-green-50' : ''
              }`}>
                <Editor
                  height="350px"
                  defaultLanguage="css"
                  value={css}
                  onChange={(value) => setCSS(value || "")}
                  theme="vs-light"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 10, bottom: 10 },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-900">
                Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lesson.objectives.map((objective, index) => {
                  const firstIncompleteIndex = completedObjectives.findIndex(completed => !completed);
                  const isCompleted = completedObjectives[index];
                  const isActive = index === firstIncompleteIndex;
                  const isBlocked = index > firstIncompleteIndex;

                  return (
                    <li key={index} className={`flex items-start gap-2 ${isBlocked ? 'opacity-50' : 'opacity-100'}`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isBlocked ? 'text-gray-200' : 'text-gray-400'}`} />
                      )}
                      <span className={`text-sm ${
                        isCompleted 
                          ? "text-green-700 font-semibold" 
                          : isActive 
                            ? "font-bold text-gray-900" 
                            : "text-gray-500"
                      }`}>
                        {isBlocked && "🔒 "}
                        {objective}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          {lesson.solutions && !allCompleted && (
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="text-sm text-gray-700 mb-2">
                ¿Atascado?{" "}
                <button
                  onClick={handleShowSolution}
                  className="text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Ver solución
                </button>
              </div>
            </div>
          )}

          {nextLessonId !== null && (
            <a
              href={allCompleted ? `/css/${nextLessonId}` : undefined}
              className={`
                block w-full px-6 py-4 rounded-lg text-center font-semibold transition-all
                ${allCompleted 
                  ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-md hover:shadow-lg" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}
              `}
              onClick={(e) => !allCompleted && e.preventDefault()}
            >
              {allCompleted ? (
                <div>
                  <div className="text-sm">Continuar a la</div>
                  <div className="text-lg">{nextLessonTitle}</div>
                </div>
              ) : (
                <div>
                  <div className="text-sm">Termina las tareas para continuar</div>
                  <div className="text-lg">{nextLessonTitle}</div>
                </div>
              )}
            </a>
          )}
        </div>
      </div>

      {/* HTML Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-blue-900">
            HTML de Referencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{lesson.initialHTML}</code>
          </pre>
          <div className="mt-2 text-xs text-gray-600">
            Este es el HTML que estás estilizando. No puedes modificarlo, solo agregar CSS.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

