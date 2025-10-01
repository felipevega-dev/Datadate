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
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none animate-slide-up-fade">
      <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg text-center text-sm max-w-sm">
        {messages[hint.text] || `¿Falta ${hint.text}?`}
      </div>
    </div>
  );
}

function detectSyntaxIssues(query: string): Hint | null {
  const upperQuery = query.trim().toUpperCase();
  
  // Si está vacío, no mostrar nada
  if (!query.trim()) return null;

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

  // SELECT sin columnas antes de FROM
  if (upperQuery.match(/SELECT\s+FROM/)) {
    return {
      text: "* o columnas",
      position: query.indexOf("FROM"),
      type: "error"
    };
  }

  // WHERE sin condición
  if (upperQuery.match(/WHERE\s*;?\s*$/)) {
    return {
      text: "condición",
      position: query.length,
      type: "error"
    };
  }

  // FROM sin tabla
  if (upperQuery.match(/FROM\s*;?\s*$/)) {
    return {
      text: "nombre_tabla",
      position: query.length,
      type: "error"
    };
  }

  // ORDER BY sin columna
  if (upperQuery.match(/ORDER BY\s*;?\s*$/)) {
    return {
      text: "columna",
      position: query.length,
      type: "error"
    };
  }

  // LIMIT sin número
  if (upperQuery.match(/LIMIT\s*;?\s*$/)) {
    return {
      text: "número",
      position: query.length,
      type: "error"
    };
  }

  // Comillas sin cerrar
  const singleQuotes = (query.match(/'/g) || []).length;
  const doubleQuotes = (query.match(/"/g) || []).length;
  if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
    return {
      text: "comilla de cierre",
      position: query.length,
      type: "error"
    };
  }

  // Paréntesis sin cerrar
  const openParens = (query.match(/\(/g) || []).length;
  const closeParens = (query.match(/\)/g) || []).length;
  if (openParens > closeParens) {
    return {
      text: ")",
      position: query.length,
      type: "error"
    };
  }

  // Tiene SELECT y FROM pero falta punto y coma
  if (upperQuery.includes("SELECT") && 
      upperQuery.includes("FROM") && 
      !upperQuery.includes(";") &&
      upperQuery.length > 20) {
    return {
      text: ";",
      position: query.length,
      type: "suggestion"
    };
  }

  return null;
}

