"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimatedExample {
  steps: {
    code: string;
    delay: number;
    results: any[];
  }[];
  allData: any[];
}

interface AnimatedSQLExampleProps {
  examples: AnimatedExample[];
}

export default function AnimatedSQLExample({ examples }: AnimatedSQLExampleProps) {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentResults, setCurrentResults] = useState<any[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  const currentExample = examples[currentExampleIndex];
  const currentStep = currentExample.steps[currentStepIndex];

  useEffect(() => {
    if (!isAnimating) return;

    const targetCode = currentStep.code;
    const currentLength = displayedCode.length;

    if (currentLength < targetCode.length) {
      // Typing animation
      const timeout = setTimeout(() => {
        setDisplayedCode(targetCode.slice(0, currentLength + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      // Finished typing current step, update results
      setCurrentResults(currentStep.results);
      
      // Wait before next step
      const timeout = setTimeout(() => {
        if (currentStepIndex < currentExample.steps.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
        } else {
          // Finished all steps, pause before restarting
          setTimeout(() => {
            setCurrentStepIndex(0);
            setDisplayedCode("");
            setCurrentResults([]);
            // Rotate to next example
            setCurrentExampleIndex((currentExampleIndex + 1) % examples.length);
          }, 3000);
        }
      }, currentStep.delay);
      return () => clearTimeout(timeout);
    }
  }, [displayedCode, currentStep, currentStepIndex, currentExample, currentExampleIndex, examples, isAnimating]);

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setDisplayedCode("");
    setCurrentResults([]);
    setIsAnimating(true);
  };

  const handlePause = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <Card className="h-full border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            ✨ Ejemplo en vivo
          </CardTitle>
          <div className="flex gap-2">
            <button
              onClick={handlePause}
              className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
            >
              {isAnimating ? "⏸ Pausar" : "▶ Continuar"}
            </button>
            <button
              onClick={handleRestart}
              className="px-3 py-1 text-xs bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors"
            >
              🔄 Reiniciar
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Code Display */}
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm min-h-[120px] relative">
          <pre className="text-green-400 whitespace-pre-wrap">
            {displayedCode}
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
          </pre>
        </div>

        {/* Results Table */}
        <div>
          <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center justify-between">
            <span>📊 Resultados ({currentResults.length})</span>
            {currentResults.length > 0 && (
              <span className="text-green-600 animate-pulse">● Actualizando...</span>
            )}
          </div>
          
          {currentResults.length > 0 ? (
            <div className="border rounded-lg overflow-hidden max-h-[300px] overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-blue-100 sticky top-0">
                  <tr>
                    {Object.keys(currentResults[0]).map((key) => (
                      <th key={key} className="px-2 py-2 text-left font-semibold text-blue-900 uppercase text-[10px]">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentResults.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } animate-fadeIn`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {Object.keys(row).map((key) => (
                        <td key={key} className="px-2 py-2 text-gray-700">
                          {row[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400 text-sm">
              <div className="text-2xl mb-2">⏳</div>
              <div>Esperando consulta...</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

