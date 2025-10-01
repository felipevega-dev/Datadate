"use client";

import { useState } from "react";
import { Database, Table2, ChevronRight } from "lucide-react";

interface Column {
  name: string;
  type: string;
  description: string;
}

interface Table {
  name: string;
  columns: Column[];
}

interface DatabaseSchema {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tables: Table[];
}

const databases: DatabaseSchema[] = [
  {
    name: "Tienda Online",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    tables: [
      {
        name: "usuarios",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "nombre", type: "TEXT", description: "Nombre completo del usuario" },
          { name: "email", type: "TEXT", description: "Correo electrónico" },
          { name: "fecha_registro", type: "DATE", description: "Fecha de creación de cuenta" },
        ],
      },
      {
        name: "productos",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "nombre", type: "TEXT", description: "Nombre del producto" },
          { name: "precio", type: "REAL", description: "Precio en dólares" },
          { name: "stock", type: "INTEGER", description: "Cantidad disponible" },
        ],
      },
      {
        name: "pedidos",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "usuario_id", type: "INTEGER", description: "Referencia al usuario" },
          { name: "fecha", type: "DATE", description: "Fecha del pedido" },
          { name: "total", type: "REAL", description: "Monto total" },
        ],
      },
    ],
  },
  {
    name: "Red Social",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    tables: [
      {
        name: "usuarios",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "username", type: "TEXT", description: "Nombre de usuario" },
          { name: "bio", type: "TEXT", description: "Biografía del usuario" },
          { name: "activo", type: "BOOLEAN", description: "Si la cuenta está activa" },
        ],
      },
      {
        name: "publicaciones",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "usuario_id", type: "INTEGER", description: "Autor de la publicación" },
          { name: "contenido", type: "TEXT", description: "Texto de la publicación" },
          { name: "likes", type: "INTEGER", description: "Cantidad de me gusta" },
        ],
      },
      {
        name: "comentarios",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "publicacion_id", type: "INTEGER", description: "Publicación comentada" },
          { name: "usuario_id", type: "INTEGER", description: "Autor del comentario" },
          { name: "texto", type: "TEXT", description: "Contenido del comentario" },
        ],
      },
    ],
  },
  {
    name: "Biblioteca",
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-300",
    tables: [
      {
        name: "libros",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "titulo", type: "TEXT", description: "Título del libro" },
          { name: "autor", type: "TEXT", description: "Autor del libro" },
          { name: "isbn", type: "TEXT", description: "Código ISBN" },
          { name: "publicado", type: "DATE", description: "Fecha de publicación" },
        ],
      },
      {
        name: "prestamos",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "libro_id", type: "INTEGER", description: "Libro prestado" },
          { name: "usuario_id", type: "INTEGER", description: "Usuario que pidió préstamo" },
          { name: "fecha_prestamo", type: "DATE", description: "Fecha de préstamo" },
          { name: "fecha_devolucion", type: "DATE", description: "Fecha de devolución" },
        ],
      },
      {
        name: "autores",
        columns: [
          { name: "id", type: "INTEGER", description: "Identificador único" },
          { name: "nombre", type: "TEXT", description: "Nombre completo" },
          { name: "pais", type: "TEXT", description: "País de origen" },
          { name: "nacimiento", type: "DATE", description: "Fecha de nacimiento" },
        ],
      },
    ],
  },
];

export default function DatabaseVisualizer() {
  const [selectedDb, setSelectedDb] = useState<number | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleDbClick = (index: number) => {
    if (selectedDb === index) {
      setSelectedDb(null);
      setSelectedTable(null);
    } else {
      setSelectedDb(index);
      setSelectedTable(null);
    }
  };

  const handleTableClick = (index: number) => {
    setSelectedTable(selectedTable === index ? null : index);
  };

  return (
    <div className="my-8 space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Visualización Interactiva de Bases de Datos
        </h3>
        <p className="text-sm text-gray-600">
          Haz clic en una base de datos para ver sus tablas, y en una tabla para ver sus columnas
        </p>
      </div>

      {/* Bases de datos */}
      <div className="grid grid-cols-3 gap-4">
        {databases.map((db, dbIndex) => (
          <button
            key={dbIndex}
            onClick={() => handleDbClick(dbIndex)}
            className={`
              relative p-6 rounded-xl border-3 transition-all duration-300 hover:scale-105
              ${selectedDb === dbIndex ? `${db.bgColor} ${db.borderColor} border-3 shadow-lg` : "bg-white border-2 border-gray-300 hover:border-gray-400"}
            `}
          >
            <div className="flex flex-col items-center gap-3">
              <Database className={`w-16 h-16 ${selectedDb === dbIndex ? db.color : "text-gray-400"}`} />
              <div className="text-center">
                <div className={`font-bold text-lg ${selectedDb === dbIndex ? db.color : "text-gray-700"}`}>
                  {db.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {db.tables.length} tablas
                </div>
              </div>
            </div>
            {selectedDb === dbIndex && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <ChevronRight className={`w-6 h-6 ${db.color} rotate-90`} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Tablas */}
      {selectedDb !== null && (
        <div className="mt-6">
          <div className={`p-6 rounded-xl border-2 ${databases[selectedDb].borderColor} ${databases[selectedDb].bgColor}`}>
            <h4 className={`text-lg font-bold ${databases[selectedDb].color} mb-4 flex items-center gap-2`}>
              <Table2 className="w-5 h-5" />
              Tablas de {databases[selectedDb].name}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {databases[selectedDb].tables.map((table, tableIndex) => (
                <button
                  key={tableIndex}
                  onClick={() => handleTableClick(tableIndex)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200 text-left
                    ${
                      selectedTable === tableIndex
                        ? "bg-white shadow-md border-gray-400"
                        : "bg-white/50 border-gray-300 hover:bg-white hover:border-gray-400"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">{table.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {table.columns.length} columnas
                      </div>
                    </div>
                    {selectedTable === tableIndex && (
                      <ChevronRight className="w-5 h-5 text-gray-600 rotate-90" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Columnas y datos de ejemplo */}
      {selectedDb !== null && selectedTable !== null && (
        <div className="mt-6">
          <div className="p-6 rounded-xl border-2 border-gray-300 bg-white shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              Columnas de la tabla "{databases[selectedDb].tables[selectedTable].name}"
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {/* Definición de columnas */}
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-700 mb-2">Estructura</div>
                {databases[selectedDb].tables[selectedTable].columns.map((column, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <div className="flex-shrink-0 w-28">
                      <div className="font-mono font-semibold text-sm text-gray-800">
                        {column.name}
                      </div>
                      <div className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                        {column.type}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">{column.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Datos de ejemplo */}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Datos de ejemplo</div>
                <div className="border-2 border-blue-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-blue-50 border-b-2 border-blue-200">
                      <tr>
                        {databases[selectedDb].tables[selectedTable].columns.map((col) => (
                          <th key={col.name} className="px-3 py-2 text-left font-bold text-blue-900">
                            {col.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((rowNum) => (
                        <tr key={rowNum} className={rowNum % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          {databases[selectedDb].tables[selectedTable].columns.map((col) => (
                            <td key={col.name} className="px-3 py-2 text-gray-700 border-b border-gray-200">
                              {col.type === "INTEGER" ? rowNum :
                               col.type === "TEXT" ? `Dato ${rowNum}` :
                               col.type === "DATE" ? `2024-0${rowNum}-15` :
                               col.type === "REAL" ? `${rowNum * 10}.99` :
                               col.type === "BOOLEAN" ? (rowNum % 2 === 0 ? "TRUE" : "FALSE") :
                               `Valor ${rowNum}`}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

