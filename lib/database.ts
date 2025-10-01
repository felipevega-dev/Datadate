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
  // Crear tabla series con datos de ejemplo
  await db.exec(`
    CREATE TABLE series (
      id INTEGER PRIMARY KEY,
      titulo TEXT NOT NULL,
      genero TEXT NOT NULL,
      temporadas INTEGER NOT NULL,
      año_estreno INTEGER NOT NULL,
      calificacion REAL NOT NULL
    );
  `);

  const seriesData = [
    [1, "Stranger Things", "Ciencia Ficción", 4, 2016, 8.7],
    [2, "Breaking Bad", "Drama", 5, 2008, 9.5],
    [3, "The Crown", "Drama Histórico", 6, 2016, 8.6],
    [4, "Black Mirror", "Ciencia Ficción", 6, 2011, 8.8],
    [5, "The Witcher", "Fantasía", 3, 2019, 8.2],
    [6, "Narcos", "Crimen", 3, 2015, 8.8],
    [7, "Dark", "Ciencia Ficción", 3, 2017, 8.7],
    [8, "La Casa de Papel", "Crimen", 5, 2017, 8.2],
    [9, "Ozark", "Drama", 4, 2017, 8.5],
    [10, "The Queen's Gambit", "Drama", 1, 2020, 8.6],
  ];

  for (const serie of seriesData) {
    await db.run(
      `INSERT INTO series (id, titulo, genero, temporadas, año_estreno, calificacion) VALUES (?, ?, ?, ?, ?, ?)`,
      ...serie
    );
  }

  // Crear tabla de ciudades sudamericanas
  await db.exec(`
    CREATE TABLE ciudades (
      id INTEGER PRIMARY KEY,
      nombre TEXT NOT NULL,
      pais TEXT NOT NULL,
      poblacion INTEGER NOT NULL,
      latitud REAL NOT NULL,
      longitud REAL NOT NULL
    );
  `);

  const ciudadesData = [
    [1, "São Paulo", "Brasil", 12325000, -23.5505, -46.6333],
    [2, "Buenos Aires", "Argentina", 15594000, -34.6037, -58.3816],
    [3, "Lima", "Perú", 10719000, -12.0464, -77.0428],
    [4, "Bogotá", "Colombia", 11167000, 4.7110, -74.0721],
    [5, "Rio de Janeiro", "Brasil", 13634000, -22.9068, -43.1729],
    [6, "Santiago", "Chile", 6812000, -33.4489, -70.6693],
    [7, "Caracas", "Venezuela", 2936000, 10.4806, -66.9036],
    [8, "Montevideo", "Uruguay", 1753000, -34.9011, -56.1645],
    [9, "Quito", "Ecuador", 2781000, -0.1807, -78.4678],
    [10, "La Paz", "Bolivia", 2004000, -16.5000, -68.1500],
    [11, "Medellín", "Colombia", 2569000, 6.2442, -75.5812],
    [12, "Brasília", "Brasil", 4804000, -15.8267, -47.9218],
  ];

  for (const ciudad of ciudadesData) {
    await db.run(
      `INSERT INTO ciudades (id, nombre, pais, poblacion, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?)`,
      ...ciudad
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
