"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, PartyPopper } from "lucide-react";
import SQLHintHelper from "./sql-hint-helper";

interface SQLEditorProps {
  initialQuery: string;
  objectives: string[];
  onProgressUpdate?: (completed: boolean[]) => void;
}

export default function SQLEditor({ initialQuery, objectives, onProgressUpdate }: SQLEditorProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ columns: string[]; rows: any[]; error?: string } | null>(null);
  const [completedObjectives, setCompletedObjectives] = useState<boolean[]>(
    new Array(objectives.length).fill(false)
  );
  const [allCompleted, setAllCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastValidResults, setLastValidResults] = useState<{ columns: string[]; rows: any[] } | null>(null);

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
  }, []);

  const checkObjectives = (sqlQuery: string, data: any) => {
    const newCompleted = [...completedObjectives];
    const upperQuery = sqlQuery.trim().toUpperCase();

    // Objetivo 1: Selecciona todas las columnas
    if (objectives[0]?.includes("todas las columnas")) {
      newCompleted[0] = upperQuery.includes("SELECT *") && upperQuery.includes("FROM MOVIES");
    }

    // Objetivo 1 alternativo: Selecciona solo el title
    if (objectives[0]?.includes("solo el title")) {
      newCompleted[0] = upperQuery.includes("SELECT TITLE") && !data.error && data.columns.includes("title");
    }

    // Objetivo 2: Selecciona title y director
    if (objectives[1]?.includes("title y director")) {
      newCompleted[1] = 
        data.columns?.includes("title") && 
        data.columns?.includes("director") &&
        data.columns?.length === 2;
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

    setCompletedObjectives(newCompleted);
    onProgressUpdate?.(newCompleted);

    // Verificar si todos están completos
    const allDone = newCompleted.every(completed => completed);
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

      {/* Editor y Objetivos en horizontal */}
      <div className="grid grid-cols-12 gap-4">
        {/* Editor SQL - 80% */}
        <div className="col-span-9">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                💻 Editor SQL
              </CardTitle>
              <CardDescription>
                Escribe tu consulta SQL aquí. Los resultados se actualizan en tiempo real.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`border rounded-md overflow-hidden relative transition-all duration-500 ${
                allCompleted ? 'ring-4 ring-green-400 border-green-400 bg-green-50' : ''
              }`}>
                <SQLHintHelper query={query} />
                <Editor
                  height="200px"
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

        {/* Objetivos - 20% */}
        <div className="col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                🎯 Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {completedObjectives[index] ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${completedObjectives[index] ? "text-green-700 font-medium" : "text-gray-700"}`}>
                      {objective}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resultados - Ancho completo debajo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            📊 Resultados de la consulta
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
                  <div className="flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
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
                  <div className="overflow-x-auto rounded-md border">
                    <table className="w-full border-collapse">
                      <thead>
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
                ) : null;
              })()}
            </>
          ) : (
            <div className="text-gray-400 p-8 text-center bg-gray-50 rounded-md border border-dashed border-gray-300">
              <div className="text-4xl mb-2">💡</div>
              <div className="font-medium">Escribe una consulta SQL para ver los resultados</div>
              <div className="text-sm mt-1">Prueba con: SELECT * FROM movies;</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
