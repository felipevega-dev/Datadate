"use client";

import { useEffect, useState } from "react";

interface SQLHintHelperProps {
  query: string;
  onHintShown?: () => void;
}

interface Hint {
  text: string;
  position: number;
  type: "error" | "suggestion";
}

export default function SQLHintHelper({ query, onHintShown }: SQLHintHelperProps) {
  const [hint, setHint] = useState<Hint | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Reset hint cuando cambia la query
    setShowHint(false);
    setHint(null);

    // Detectar errores comunes después de 5 segundos sin cambios
    const timer = setTimeout(() => {
      const detectedHint = detectSyntaxIssues(query);
      if (detectedHint) {
        setHint(detectedHint);
        setShowHint(true);
        onHintShown?.();

        // Ocultar hint después de 5 segundos
        setTimeout(() => {
          setShowHint(false);
        }, 5000);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [query, onHintShown]);

  if (!hint || !showHint) return null;

  const messages: Record<string, string> = {
    "SELECT": "Recuerda iniciar tu consulta con SELECT",
    "FROM": "Recuerda utilizar FROM para indicar el origen de los datos",
    "* o columnas": "Debes especificar qué columnas quieres seleccionar (* para todas)",
    "condición": "La cláusula WHERE necesita una condición para filtrar los datos",
    "nombre_tabla": "Especifica el nombre de la tabla después de FROM",
    "columna": "Especifica la columna por la cual ordenar después de ORDER BY",
    "número": "Especifica el número de registros a limitar después de LIMIT",
    "comilla de cierre": "Parece que falta una comilla de cierre en tu consulta",
    ")": "Parece que falta cerrar un paréntesis en tu consulta",
    ";": "Es buena práctica terminar las consultas SQL con punto y coma (;)",
  };

  return (
    <div className="animate-slide-in-right">
      <div className="bg-orange-50 text-orange-800 border border-orange-300 px-3 py-1.5 rounded-md text-xs flex items-center gap-2">
        <svg className="w-3.5 h-3.5 flex-shrink-0 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span className="flex-1">{messages[hint.text] || `¿Falta ${hint.text}?`}</span>
      </div>
    </div>
  );
}

function detectSyntaxIssues(query: string): Hint | null {
  const upperQuery = query.trim().toUpperCase();
  
  // Si está vacío, no mostrar nada
  if (!query.trim()) return null;

  // Comillas sin cerrar (prioridad alta)
  const singleQuotes = (query.match(/'/g) || []).length;
  const doubleQuotes = (query.match(/"/g) || []).length;
  if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
    return {
      text: "comilla de cierre",
      position: query.length,
      type: "error"
    };
  }

  // Paréntesis sin cerrar (prioridad alta)
  const openParens = (query.match(/\(/g) || []).length;
  const closeParens = (query.match(/\)/g) || []).length;
  if (openParens > closeParens) {
    return {
      text: ")",
      position: query.length,
      type: "error"
    };
  }

  // SELECT sin columnas antes de FROM
  if (upperQuery.match(/SELECT\s+FROM/)) {
    return {
      text: "* o columnas",
      position: query.indexOf("FROM"),
      type: "error"
    };
  }

  // FROM sin tabla o con solo espacios antes de ; o final
  if (upperQuery.includes("FROM")) {
    const fromMatch = upperQuery.match(/FROM\s+(;|WHERE|ORDER|LIMIT|$)/);
    if (fromMatch) {
      return {
        text: "nombre_tabla",
        position: query.length,
        type: "error"
      };
    }
  }

  // WHERE sin condición
  if (upperQuery.includes("WHERE")) {
    const whereMatch = upperQuery.match(/WHERE\s+(;|ORDER|LIMIT|$)/);
    if (whereMatch) {
      return {
        text: "condición",
        position: query.length,
        type: "error"
      };
    }
  }

  // ORDER BY sin columna
  if (upperQuery.includes("ORDER BY")) {
    const orderMatch = upperQuery.match(/ORDER BY\s+(;|LIMIT|$)/);
    if (orderMatch) {
      return {
        text: "columna",
        position: query.length,
        type: "error"
      };
    }
  }

  // LIMIT sin número
  if (upperQuery.includes("LIMIT")) {
    const limitMatch = upperQuery.match(/LIMIT\s*(;|$)/);
    if (limitMatch) {
      return {
        text: "número",
        position: query.length,
        type: "error"
      };
    }
  }

  // Falta FROM después de SELECT
  if (upperQuery.startsWith("SELECT") && 
      !upperQuery.includes("FROM") && 
      upperQuery.length > 10) {
    return {
      text: "FROM",
      position: query.length,
      type: "error"
    };
  }

  // Query sin SELECT (ej: "* FROM movies")
  if (!upperQuery.startsWith("SELECT") && 
      (upperQuery.includes("FROM") || upperQuery.includes("*") || upperQuery.length > 5)) {
    return {
      text: "SELECT",
      position: 0,
      type: "error"
    };
  }

  // Tiene SELECT y FROM pero falta punto y coma
  if (upperQuery.includes("SELECT") && 
      upperQuery.includes("FROM") && 
      !upperQuery.includes(";") &&
      upperQuery.length > 20 &&
      !upperQuery.match(/FROM\s+(;|WHERE|ORDER|LIMIT|$)/)) { // Solo si tiene tabla después de FROM
    return {
      text: ";",
      position: query.length,
      type: "suggestion"
    };
  }

  return null;
}

