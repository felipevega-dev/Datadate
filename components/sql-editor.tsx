"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, PartyPopper } from "lucide-react";
import SQLHintHelper from "./sql-hint-helper";

interface SQLEditorProps {
  initialQuery: string;
  objectives: string[];
  solutions?: string[];
  onProgressUpdate?: (completed: boolean[]) => void;
  nextLessonId?: number | null;
  nextLessonTitle?: string;
}

export default function SQLEditor({ initialQuery, objectives, solutions, onProgressUpdate, nextLessonId, nextLessonTitle }: SQLEditorProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ columns: string[]; rows: any[]; error?: string } | null>(null);
  const [completedObjectives, setCompletedObjectives] = useState<boolean[]>(
    new Array(objectives.length).fill(false)
  );
  // Estado permanente para objetivos que ya se completaron (no se revierten)
  const [permanentlyCompleted, setPermanentlyCompleted] = useState<boolean[]>(
    new Array(objectives.length).fill(false)
  );
  const [allCompleted, setAllCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastValidResults, setLastValidResults] = useState<{ columns: string[]; rows: any[] } | null>(null);
  const [showingSolution, setShowingSolution] = useState(false);

  const executeQuery = useCallback(async (sqlQuery: string) => {
    if (!sqlQuery.trim()) {
      setResults(null);
      return;
    }

    try {
      const response = await fetch("/api/execute-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: sqlQuery }),
      });

      const data = await response.json();
      setResults(data);

      // Guardar resultados válidos para mostrar siempre
      if (!data.error && data.rows && data.rows.length > 0) {
        setLastValidResults({ columns: data.columns, rows: data.rows });
      }

      // Validar objetivos
      checkObjectives(sqlQuery, data);
    } catch (error) {
      setResults({
        columns: [],
        rows: [],
        error: "Error al conectar con el servidor",
      });
    }
  }, [permanentlyCompleted]);

  const checkObjectives = (sqlQuery: string, data: any) => {
    const newCompleted = [...completedObjectives];
    const upperQuery = sqlQuery.trim().toUpperCase();

    // Lección 1 - Series
    // Objetivo 1: Encuentra el titulo
    if (objectives[0]?.includes("Encuentra el titulo de cada")) {
      newCompleted[0] = !data.error && data.columns?.includes("titulo") && data.columns?.length === 1;
    }

    // Objetivo 2: Encuentra el genero
    if (objectives[1]?.includes("Encuentra el genero")) {
      newCompleted[1] = !data.error && data.columns?.includes("genero") && data.columns?.length === 1;
    }

    // Objetivo 3: Encuentra titulo y genero
    if (objectives[2]?.includes("Encuentra el titulo y genero")) {
      newCompleted[2] = 
        !data.error &&
        data.columns?.includes("titulo") && 
        data.columns?.includes("genero") &&
        data.columns?.length === 2;
    }

    // Objetivo 4: Encuentra titulo y año_estreno
    if (objectives[3]?.includes("Encuentra el titulo y año")) {
      newCompleted[3] = 
        !data.error &&
        data.columns?.includes("titulo") && 
        data.columns?.includes("año_estreno") &&
        data.columns?.length === 2;
    }

    // Objetivo 5: Encuentra toda la información
    if (objectives[4]?.includes("Encuentra toda la información")) {
      newCompleted[4] = upperQuery.includes("SELECT *") && upperQuery.includes("FROM SERIES") && !data.error;
    }

    // Lección 2 - WHERE con restricciones numéricas
    // Objetivo 1: Encuentra la serie con id 6
    if (objectives[0]?.includes("Encuentra la serie con id 6")) {
      newCompleted[0] = 
        !data.error && 
        data.rows?.length === 1 && 
        data.rows[0]?.id === 6 &&
        upperQuery.includes("WHERE") &&
        upperQuery.includes("ID");
    }

    // Objetivo 2: Series lanzadas entre 2015 y 2020
    if (objectives[1]?.includes("Encuentra las series lanzadas entre 2015 y 2020")) {
      const allInRange = data.rows?.every((row: any) => 
        row.año_estreno >= 2015 && row.año_estreno <= 2020
      );
      newCompleted[1] = 
        !data.error && 
        allInRange && 
        data.rows?.length > 0 &&
        upperQuery.includes("BETWEEN") &&
        !upperQuery.includes("NOT BETWEEN");
    }

    // Objetivo 3: Series NO lanzadas entre 2015 y 2020
    if (objectives[2]?.includes("Encuentra las series NO lanzadas entre 2015 y 2020")) {
      const allOutsideRange = data.rows?.every((row: any) => 
        row.año_estreno < 2015 || row.año_estreno > 2020
      );
      newCompleted[2] = 
        !data.error && 
        allOutsideRange && 
        data.rows?.length > 0 && 
        upperQuery.includes("NOT BETWEEN");
    }

    // Objetivo 4: Primeras 5 series con título y año
    if (objectives[3]?.includes("Encuentra las primeras 5 series")) {
      newCompleted[3] = 
        !data.error &&
        data.rows?.length === 5 && 
        data.columns?.includes("titulo") &&
        data.columns?.includes("año_estreno") &&
        data.columns?.length === 2 &&
        upperQuery.includes("LIMIT");
    }

    // Para lecciones con WHERE
    if (objectives[0]?.includes("John Lasseter")) {
      const hasJohnLasseter = data.rows?.every((row: any) => row.director === "John Lasseter");
      newCompleted[0] = hasJohnLasseter && data.rows?.length > 0;
    }

    if (objectives[1]?.includes("2003 o después")) {
      const after2003 = data.rows?.every((row: any) => row.year >= 2003);
      newCompleted[1] = after2003 && data.rows?.length > 0;
    }

    // Para lecciones con ORDER BY
    if (objectives[0]?.includes("más recientes primero")) {
      const isDescending = data.rows?.every((row: any, i: number, arr: any[]) => 
        i === 0 || arr[i - 1].year >= row.year
      );
      newCompleted[0] = isDescending && upperQuery.includes("ORDER BY");
    }

    if (objectives[1]?.includes("ordenados alfabéticamente")) {
      const isAscending = data.rows?.every((row: any, i: number, arr: any[]) => 
        i === 0 || arr[i - 1].title <= row.title
      );
      newCompleted[1] = isAscending && data.columns?.length === 1 && data.columns[0] === "title";
    }

    // Para lecciones con LIMIT
    if (objectives[0]?.includes("primeras 5 películas")) {
      newCompleted[0] = data.rows?.length === 5 && upperQuery.includes("LIMIT");
    }

    if (objectives[1]?.includes("3 películas con mayor rating")) {
      const hasCorrectData = data.rows?.length === 3 && 
        upperQuery.includes("ORDER BY") && 
        upperQuery.includes("RATING") &&
        upperQuery.includes("DESC") &&
        upperQuery.includes("LIMIT");
      newCompleted[1] = hasCorrectData;
    }

    // Combinar estado temporal con permanente (mantener los ya completados)
    const finalCompleted = newCompleted.map((completed, index) => 
      completed || permanentlyCompleted[index]
    );

    // Actualizar objetivos permanentemente completados si hay nuevos
    const hasNewCompletions = finalCompleted.some((completed, index) => 
      completed && !permanentlyCompleted[index]
    );
    
    if (hasNewCompletions) {
      setPermanentlyCompleted(finalCompleted);
    }

    setCompletedObjectives(finalCompleted);
    onProgressUpdate?.(finalCompleted);

    // Verificar si todos están completos
    const allDone = finalCompleted.every(completed => completed);
    if (allDone && !allCompleted) {
      setAllCompleted(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      executeQuery(query);
    }, 500);

    return () => clearTimeout(debounce);
  }, [query, executeQuery]);

  const handleShowSolution = () => {
    if (!solutions) return;
    
    // Encontrar el primer objetivo no completado
    const nextIncompleteIndex = completedObjectives.findIndex(completed => !completed);
    
    if (nextIncompleteIndex !== -1 && solutions[nextIncompleteIndex]) {
      setQuery(solutions[nextIncompleteIndex]);
      setShowingSolution(true);
      setTimeout(() => setShowingSolution(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Celebración */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-6 rounded-2xl shadow-2xl animate-fade-scale">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-12 h-12" />
              <div>
                <div className="text-3xl font-bold">¡Excelente trabajo!</div>
                <div className="text-lg">Has completado todos los objetivos</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resultados - Ancho completo arriba */}
      <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-900">
                Resultados de la consulta
              </CardTitle>
              <CardDescription>
                {(results && results.rows.length > 0) || (lastValidResults && lastValidResults.rows.length > 0) ? (
                  <span className="text-green-600 font-medium">
                    ✓ {results?.rows.length || lastValidResults?.rows.length || 0} {((results?.rows.length || lastValidResults?.rows.length || 0) === 1) ? 'registro encontrado' : 'registros encontrados'}
                  </span>
                ) : null}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Siempre mostrar la última tabla válida, incluso si hay error */}
              {(results && results.rows.length > 0) || (lastValidResults && lastValidResults.rows.length > 0) ? (
                <>
                  {results?.error && (
                    <div className="mb-4 text-orange-600 p-3 bg-orange-50 rounded-md border border-orange-200">
                      <div className="flex items-center gap-3">
                        <span className="text-lg flex-shrink-0">⚠️</span>
                        <div>
                          <div className="font-semibold mb-1 text-sm">Nota:</div>
                          <div className="text-sm">{results.error}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {(() => {
                    const displayResults = results?.rows.length > 0 ? results : lastValidResults;
                    return displayResults ? (
                      <div className="rounded-md border overflow-hidden">
                        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                          <table className="w-full border-collapse">
                            <thead className="sticky top-0 z-10">
                              <tr className="bg-blue-50 border-b-2 border-blue-200">
                                {displayResults.columns.map((col) => (
                                  <th key={col} className="px-4 py-3 text-left font-semibold text-sm text-blue-900 uppercase tracking-wide">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {displayResults.rows.map((row, index) => (
                                <tr 
                                  key={index} 
                                  className={`border-b border-gray-200 hover:bg-blue-50/50 transition-colors ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                  }`}
                                >
                                  {displayResults.columns.map((col) => (
                                    <td key={col} className="px-4 py-3 text-sm text-gray-800">
                                      {row[col]}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </>
              ) : (
                <div className="text-gray-500 p-8 text-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                  <div className="font-medium mb-2">Escribe una consulta SQL para ver los resultados</div>
                  <div className="text-sm text-gray-400">Prueba con: SELECT * FROM series;</div>
                </div>
              )}
            </CardContent>
      </Card>

      {/* Layout compartido: Editor (65%) + Objetivos/Botones (35%) */}
      <div className="grid grid-cols-12 gap-4 items-stretch min-h-[400px]">
        {/* Editor SQL - 65% */}
        <div className="col-span-8 flex">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-900">
                Editor SQL
              </CardTitle>
              <div className="flex items-start justify-between gap-4">
                <CardDescription className="flex-shrink-0">
                  Escribe tu consulta SQL aquí. Los resultados se actualizan en tiempo real.
                </CardDescription>
                <div className="flex-1 min-w-0">
                  <SQLHintHelper query={query} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className={`border rounded-md overflow-hidden relative transition-all duration-500 flex-1 ${
                allCompleted ? 'ring-4 ring-green-400 border-green-400 bg-green-50' : ''
              }`}>
                <Editor
                  height="100%"
                  defaultLanguage="sql"
                  value={query}
                  onChange={(value) => setQuery(value || "")}
                  theme="vs-light"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    lineNumbers: "off",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 10, bottom: 10 },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Objetivos, Stuck y Botón - 35% */}
        <div className="col-span-4 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-900">
                Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {objectives.map((objective, index) => {
                  // Encontrar el primer objetivo no completado
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
          
          {/* Ayuda con solución */}
          {solutions && !allCompleted && (() => {
            const currentTaskIndex = completedObjectives.findIndex(completed => !completed);
            const currentTaskNumber = currentTaskIndex + 1;
            
            return (
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <div className="text-sm text-gray-700 mb-2">
                  ¿Atascado en la tarea {currentTaskNumber}?{" "}
                  <button
                    onClick={handleShowSolution}
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    Ver solución
                  </button>
                </div>
                <div className="text-xs text-gray-600">
                  Completa las tareas secuencialmente para continuar.
                </div>
                {showingSolution && (
                  <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded text-xs text-green-800 animate-slide-up-fade">
                    ✓ Solución de la tarea {currentTaskNumber} cargada
                  </div>
                )}
              </div>
            );
          })()}
          
          {/* Botón de siguiente lección */}
          {nextLessonId !== null && (
            <a
              href={allCompleted ? `/lesson/${nextLessonId}` : undefined}
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
    </div>
  );
}
