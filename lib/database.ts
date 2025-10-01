import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

export async function getDatabase() {
  if (!db) {
    db = await open({
      filename: ":memory:",
      driver: sqlite3.Database,
    });
    await initDatabase(db);
  }
  return db;
}

async function initDatabase(db: Database) {
  // Crear tabla movies con datos de ejemplo
  await db.exec(`
    CREATE TABLE movies (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      director TEXT NOT NULL,
      year INTEGER NOT NULL,
      length_minutes INTEGER NOT NULL,
      rating REAL
    );
  `);

  const moviesData = [
    [1, "Toy Story", "John Lasseter", 1995, 81, 8.3],
    [2, "A Bug's Life", "John Lasseter", 1998, 95, 7.2],
    [3, "Toy Story 2", "John Lasseter", 1999, 93, 7.8],
    [4, "Monsters, Inc.", "Pete Docter", 2001, 92, 8.1],
    [5, "Finding Nemo", "Andrew Stanton", 2003, 107, 8.2],
    [6, "The Incredibles", "Brad Bird", 2004, 116, 8.0],
    [7, "Cars", "John Lasseter", 2006, 117, 7.2],
    [8, "Ratatouille", "Brad Bird", 2007, 115, 8.0],
    [9, "WALL-E", "Andrew Stanton", 2008, 104, 8.4],
    [10, "Up", "Pete Docter", 2009, 101, 8.3],
  ];

  for (const movie of moviesData) {
    await db.run(
      `INSERT INTO movies (id, title, director, year, length_minutes, rating) VALUES (?, ?, ?, ?, ?, ?)`,
      ...movie
    );
  }
}

export async function executeQuery(query: string): Promise<{ columns: string[]; rows: any[]; error?: string }> {
  try {
    const db = await getDatabase();
    
    // Sanitizar la query para prevenir modificaciones
    const upperQuery = query.trim().toUpperCase();
    if (upperQuery.startsWith("DROP") || 
        upperQuery.startsWith("DELETE") || 
        upperQuery.startsWith("UPDATE") ||
        upperQuery.startsWith("INSERT") ||
        upperQuery.startsWith("ALTER") ||
        upperQuery.startsWith("CREATE")) {
      return {
        columns: [],
        rows: [],
        error: "Solo se permiten consultas SELECT"
      };
    }

    const rows = await db.all(query);
    
    if (rows.length === 0) {
      return { columns: [], rows: [] };
    }

    const columns = Object.keys(rows[0]);
    return { columns, rows };
  } catch (error: any) {
    return {
      columns: [],
      rows: [],
      error: error.message || "Error al ejecutar la consulta"
    };
  }
}
