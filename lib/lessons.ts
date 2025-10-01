export interface AnimatedExample {
  steps: {
    code: string;
    delay: number;
    results: any[];
  }[];
  allData: any[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  explanation: string;
  objectives: string[];
  hints: string[];
  initialQuery: string;
  solutionQuery: string;
  animatedExamples?: AnimatedExample[];
  practiceContext?: string; // Contexto para la práctica
  practiceInstructions?: string; // Instrucciones detalladas
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Lección 1: Introducción a SQL y Consultas SELECT",
    description: "Aprende qué es SQL y cómo seleccionar datos de una tabla",
    explanation: `
# ¿Qué es SQL?

**SQL** (Structured Query Language o Lenguaje de Consulta Estructurado) es un lenguaje de programación diseñado específicamente para comunicarse con bases de datos. A diferencia de otros lenguajes de programación que se usan para crear aplicaciones completas, SQL se especializa en una cosa: **trabajar con datos**.

## ¿Por qué aprender SQL?

SQL es una de las habilidades técnicas más demandadas en el mercado laboral. Aquí te decimos por qué:

- **Universal**: Funciona en MySQL, PostgreSQL, SQLite, Oracle, SQL Server y más
- **Esencial**: Prácticamente todas las aplicaciones modernas usan bases de datos
- **Bien pagado**: Los profesionales que manejan datos están entre los mejor remunerados
- **Accesible**: Es más fácil de aprender que muchos lenguajes de programación tradicionales
- **Poderoso**: Puedes analizar millones de registros con unas pocas líneas de código

## ¿Qué es una base de datos relacional?

Imagina una base de datos como un **conjunto de hojas de cálculo** (como Excel) conectadas entre sí. Cada hoja de cálculo se llama **tabla** y contiene:

- **Columnas**: Las propiedades o atributos (como "nombre", "edad", "email")
- **Filas**: Los registros individuales (cada persona, producto, película, etc.)

Por ejemplo, la tabla \`movies\` se vería así:

<div style="overflow: hidden; border-radius: 8px; border: 2px solid #BFDBFE; margin: 24px 0;">
  <table style="width: 100%; border-collapse: collapse;">
    <thead style="background: #DBEAFE; border-bottom: 2px solid #BFDBFE;">
      <tr>
        <th style="padding: 12px 16px; text-align: left; font-weight: bold; color: #1E3A8A; font-size: 12px; text-transform: uppercase;">ID</th>
        <th style="padding: 12px 16px; text-align: left; font-weight: bold; color: #1E3A8A; font-size: 12px; text-transform: uppercase;">Title</th>
        <th style="padding: 12px 16px; text-align: left; font-weight: bold; color: #1E3A8A; font-size: 12px; text-transform: uppercase;">Director</th>
        <th style="padding: 12px 16px; text-align: left; font-weight: bold; color: #1E3A8A; font-size: 12px; text-transform: uppercase;">Year</th>
        <th style="padding: 12px 16px; text-align: left; font-weight: bold; color: #1E3A8A; font-size: 12px; text-transform: uppercase;">Rating</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: white; border-bottom: 1px solid #E5E7EB;">
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">1</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">Toy Story</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">John Lasseter</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">1995</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">8.3</td>
      </tr>
      <tr style="background: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">2</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">Finding Nemo</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">Andrew Stanton</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">2003</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">8.2</td>
      </tr>
      <tr style="background: white;">
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">3</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">Cars</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">John Lasseter</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">2006</td>
        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px;">7.2</td>
      </tr>
    </tbody>
  </table>
</div>

Cada **fila** es una película diferente, y cada **columna** contiene un tipo específico de información sobre esa película.

## La instrucción SELECT: Tu primera consulta

**SELECT** es el comando más importante de SQL. Te permite **leer** o **consultar** datos de una tabla. Es como decirle a la base de datos: "Muéstrame estos datos".

### Sintaxis básica

\`\`\`sql
SELECT columna1, columna2, columna3
FROM nombre_tabla;
\`\`\`

Cada parte significa:
- **SELECT**: El comando que inicia la consulta
- **columna1, columna2**: Las columnas específicas que quieres ver
- **FROM**: Indica de qué tabla vienen los datos
- **nombre_tabla**: El nombre de la tabla que contiene los datos

### Seleccionar todas las columnas con *

Cuando quieres ver **todas** las columnas de una tabla, usar el asterisco (\`*\`) es un atajo:

\`\`\`sql
SELECT * FROM movies;
\`\`\`

Esto devolverá todas las columnas (id, title, director, year, length_minutes, rating) de todas las películas.

### Seleccionar columnas específicas

Si solo necesitas ciertas columnas, especifícalas por nombre:

\`\`\`sql
SELECT title, director FROM movies;
\`\`\`

Esto solo devuelve el título y director de cada película, ignorando las demás columnas.

## ¿Por qué especificar columnas?

En la vida real, las tablas pueden tener decenas o cientos de columnas. Seleccionar solo lo que necesitas:
- **Mejora el rendimiento** (menos datos que transferir)
- **Hace el código más claro** (es obvio qué datos estás usando)
- **Ahorra ancho de banda** (importante en aplicaciones web)

## Tu primera consulta

En el ejercicio a continuación, trabajarás con una tabla llamada \`movies\` que contiene información sobre películas de Pixar. Tu objetivo es seleccionar todas las columnas de esta tabla.

**Pista**: Recuerda que \`*\` significa "todas las columnas" y no olvides incluir el punto y coma (\`;\`) al final.
    `,
    objectives: [
      "Selecciona todas las columnas de la tabla movies",
    ],
    hints: [
      "Usa el asterisco (*) para seleccionar todas las columnas",
      "La sintaxis es: SELECT * FROM nombre_tabla;",
      "No olvides el punto y coma al final",
    ],
    initialQuery: "SELECT ",
    solutionQuery: "SELECT * FROM movies;",
    practiceContext: `
## 🎬 Escenario del mundo real

Imagina que trabajas para una plataforma de streaming como Netflix o Disney+. Tu jefe necesita un reporte rápido de todas las películas que tienen en el catálogo. 

Tu tarea es **consultar la base de datos** para obtener toda la información disponible de cada película. En el mundo real, esto te ayudaría a:

- Hacer un inventario completo del catálogo
- Verificar qué información tienen registrada
- Preparar datos para un reporte gerencial
- Auditar la base de datos

En empresas reales, estas consultas básicas se hacen **cientos de veces al día** por analistas, desarrolladores y equipos de negocio.
    `,
    practiceInstructions: `
## 📝 ¿Qué debes hacer?

Tu objetivo es escribir una consulta SQL que traiga **toda la información** de todas las películas de la tabla \`movies\`.

**Pasos a seguir:**

1. Comienza con la palabra clave \`SELECT\`
2. Usa el asterisco \`*\` para indicar "todas las columnas"
3. Agrega \`FROM movies\` para especificar la tabla
4. Termina con punto y coma \`;\`

**Resultado esperado:** Deberías ver todas las películas con sus columnas: id, title, director, year, length_minutes y rating.

💡 **Tip profesional:** El asterisco (\`*\`) es útil para exploración inicial, pero en producción es mejor especificar las columnas exactas que necesitas.
    `,
    animatedExamples: [
      {
        allData: [
          { id: 1, title: "Toy Story", director: "John Lasseter", year: 1995 },
          { id: 2, title: "Finding Nemo", director: "Andrew Stanton", year: 2003 },
          { id: 3, title: "Cars", director: "John Lasseter", year: 2006 },
        ],
        steps: [
          {
            code: "SELECT",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT *",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT *\nFROM",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT *\nFROM movies;",
            delay: 2000,
            results: [
              { id: 1, title: "Toy Story", director: "John Lasseter", year: 1995 },
              { id: 2, title: "Finding Nemo", director: "Andrew Stanton", year: 2003 },
              { id: 3, title: "Cars", director: "John Lasseter", year: 2006 },
            ],
          },
        ],
      },
      {
        allData: [
          { title: "Toy Story", year: 1995 },
          { title: "Finding Nemo", year: 2003 },
          { title: "Cars", year: 2006 },
        ],
        steps: [
          {
            code: "SELECT",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT title",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT title, year",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT title, year\nFROM movies;",
            delay: 2000,
            results: [
              { title: "Toy Story", year: 1995 },
              { title: "Finding Nemo", year: 2003 },
              { title: "Cars", year: 2006 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Lección 2: Consultas con columnas específicas",
    description: "Selecciona solo las columnas que necesitas",
    explanation: `
# Seleccionando columnas específicas

En lugar de traer todas las columnas con \`*\`, puedes especificar exactamente cuáles quieres:

\`\`\`sql
SELECT columna1, columna2
FROM nombre_tabla;
\`\`\`

Esto es más eficiente y te da control sobre los datos que recibes.

## Ejemplo:
\`\`\`sql
SELECT title, director
FROM movies;
\`\`\`

Esto devuelve solo el título y director de cada película.
    `,
    objectives: [
      "Selecciona solo el title de cada película",
      "Selecciona el title y director de cada película",
    ],
    hints: [
      "Usa SELECT title FROM movies;",
      "Para múltiples columnas: SELECT columna1, columna2 FROM tabla;",
    ],
    initialQuery: "SELECT ",
    solutionQuery: "SELECT title, director FROM movies;",
    practiceContext: `
## 📊 Escenario del mundo real

Eres analista de datos en una empresa de medios. El equipo de marketing está preparando una campaña y solo necesita **los títulos** de las películas para un reporte ejecutivo rápido.

Luego, el departamento de contenidos te pide **títulos y directores** para analizar qué directores tienen más películas en el catálogo.

En el día a día profesional, **no siempre necesitas todas las columnas**. Traer solo lo necesario:
- Hace las consultas más rápidas
- Reduce el uso de ancho de banda
- Hace tu código más claro y mantenible
    `,
    practiceInstructions: `
## 📝 ¿Qué debes hacer?

Completa dos objetivos en esta lección:

**Objetivo 1:** Consulta solo el \`title\` de cada película
- Reemplaza el \`*\` por el nombre de la columna específica: \`title\`

**Objetivo 2:** Consulta el \`title\` y \`director\` de cada película
- Separa las columnas con comas: \`SELECT title, director\`

**Resultado esperado:** Tu tabla mostrará solo las columnas que solicitaste, no todas.

💡 **Tip profesional:** En aplicaciones web, cada columna extra que traes de la base de datos consume más memoria y tiempo de respuesta. ¡Sé específico!
    `,
    animatedExamples: [
      {
        allData: [
          { title: "Toy Story", director: "John Lasseter" },
          { title: "Finding Nemo", director: "Andrew Stanton" },
          { title: "Cars", director: "John Lasseter" },
        ],
        steps: [
          {
            code: "SELECT title",
            delay: 1000,
            results: [],
          },
          {
            code: "SELECT title\nFROM movies;",
            delay: 2000,
            results: [
              { title: "Toy Story" },
              { title: "Finding Nemo" },
              { title: "Cars" },
            ],
          },
        ],
      },
      {
        allData: [],
        steps: [
          {
            code: "SELECT title, director",
            delay: 1000,
            results: [],
          },
          {
            code: "SELECT title, director\nFROM movies;",
            delay: 2000,
            results: [
              { title: "Toy Story", director: "John Lasseter" },
              { title: "Finding Nemo", director: "Andrew Stanton" },
              { title: "Cars", director: "John Lasseter" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Lección 3: Consultas con WHERE",
    description: "Filtra resultados con condiciones",
    explanation: `
# Filtrando datos con WHERE

La cláusula **WHERE** te permite filtrar resultados según condiciones:

\`\`\`sql
SELECT columnas
FROM tabla
WHERE condicion;
\`\`\`

## Operadores comunes:
- \`=\` → Igual
- \`!=\` o \`<>\` → Diferente
- \`>\`, \`<\`, \`>=\`, \`<=\` → Comparaciones numéricas
- \`LIKE\` → Patrones de texto

## Combinando condiciones con AND y OR

Puedes combinar múltiples condiciones:

**AND** → Ambas condiciones deben cumplirse
\`\`\`sql
SELECT * FROM movies 
WHERE director = "John Lasseter" AND year >= 2000;
\`\`\`

**OR** → Al menos una condición debe cumplirse
\`\`\`sql
SELECT * FROM movies 
WHERE director = "John Lasseter" OR director = "Pete Docter";
\`\`\`

## Ejemplos:
\`\`\`sql
SELECT * FROM movies WHERE year = 2003;
SELECT * FROM movies WHERE director = "John Lasseter";
SELECT * FROM movies WHERE year >= 2000;
SELECT * FROM movies WHERE year >= 2000 AND rating > 8.0;
\`\`\`
    `,
    objectives: [
      "Encuentra todas las películas dirigidas por John Lasseter",
      "Encuentra todas las películas lanzadas en el año 2003 o después",
    ],
    hints: [
      'Usa WHERE director = "John Lasseter"',
      "Para años: WHERE year >= 2003",
    ],
    initialQuery: "SELECT * FROM movies WHERE ",
    solutionQuery: "SELECT * FROM movies WHERE director = 'John Lasseter';",
    practiceContext: `
## 🎯 Escenario del mundo real

Trabajas en el departamento de contenidos de un estudio. El jefe de producción quiere saber:
- **"¿Cuántas películas ha dirigido John Lasseter en nuestro catálogo?"**
- **"¿Qué películas tenemos del año 2003 en adelante?"**

Traer **TODAS** las películas y luego filtrarlas manualmente sería ineficiente. En bases de datos con millones de registros, ¡tu consulta tardaría minutos u horas!

La cláusula **WHERE** hace el filtrado directamente en la base de datos, devolviendo solo lo que necesitas.

En el mundo real, prácticamente **todas las consultas llevan WHERE**. Sin filtros, estarías trayendo demasiados datos innecesarios.
    `,
    practiceInstructions: `
## 📝 ¿Qué debes hacer?

**Objetivo 1:** Encuentra todas las películas dirigidas por John Lasseter
- Usa: \`WHERE director = 'John Lasseter'\`
- Nota: Los textos van entre comillas simples o dobles

**Objetivo 2:** Encuentra películas del año 2003 o más recientes
- Usa: \`WHERE year >= 2003\`
- El operador \`>=\` significa "mayor o igual que"

**Resultado esperado:** Solo verás las filas que cumplan con tu condición.

💡 **Tip profesional:** WHERE es la cláusula más importante en SQL de producción. Aprender a filtrar bien te ahorrará horas de procesamiento.
    `,
    animatedExamples: [
      {
        allData: [
          { title: "Toy Story", director: "John Lasseter", year: 1995 },
          { title: "Finding Nemo", director: "Andrew Stanton", year: 2003 },
          { title: "Cars", director: "John Lasseter", year: 2006 },
          { title: "Up", director: "Pete Docter", year: 2009 },
        ],
        steps: [
          {
            code: "SELECT * FROM movies",
            delay: 1000,
            results: [
              { title: "Toy Story", director: "John Lasseter", year: 1995 },
              { title: "Finding Nemo", director: "Andrew Stanton", year: 2003 },
              { title: "Cars", director: "John Lasseter", year: 2006 },
              { title: "Up", director: "Pete Docter", year: 2009 },
            ],
          },
          {
            code: "SELECT * FROM movies\nWHERE",
            delay: 800,
            results: [
              { title: "Toy Story", director: "John Lasseter", year: 1995 },
              { title: "Finding Nemo", director: "Andrew Stanton", year: 2003 },
              { title: "Cars", director: "John Lasseter", year: 2006 },
              { title: "Up", director: "Pete Docter", year: 2009 },
            ],
          },
          {
            code: "SELECT * FROM movies\nWHERE director = 'John Lasseter';",
            delay: 2000,
            results: [
              { title: "Toy Story", director: "John Lasseter", year: 1995 },
              { title: "Cars", director: "John Lasseter", year: 2006 },
            ],
          },
        ],
      },
      {
        allData: [],
        steps: [
          {
            code: "SELECT * FROM movies\nWHERE year >= 2000;",
            delay: 2000,
            results: [
              { title: "Finding Nemo", director: "Andrew Stanton", year: 2003 },
              { title: "Cars", director: "John Lasseter", year: 2006 },
              { title: "Up", director: "Pete Docter", year: 2009 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Lección 4: Ordenando resultados",
    description: "Usa ORDER BY para ordenar datos",
    explanation: `
# Ordenando resultados con ORDER BY

Para ordenar los resultados, usa **ORDER BY**:

\`\`\`sql
SELECT columnas
FROM tabla
ORDER BY columna ASC/DESC;
\`\`\`

- **ASC** → Ascendente (por defecto)
- **DESC** → Descendente

## Ejemplos:
\`\`\`sql
SELECT * FROM movies ORDER BY year DESC;
SELECT title FROM movies ORDER BY title ASC;
\`\`\`

Puedes ordenar por múltiples columnas:
\`\`\`sql
SELECT * FROM movies ORDER BY director, year DESC;
\`\`\`
    `,
    objectives: [
      "Lista todas las películas ordenadas por año de lanzamiento (más recientes primero)",
      "Lista los títulos de las películas ordenados alfabéticamente",
    ],
    hints: [
      "Usa ORDER BY year DESC para ordenar de más reciente a más antiguo",
      "Usa ORDER BY title ASC para orden alfabético",
    ],
    initialQuery: "SELECT * FROM movies ORDER BY ",
    solutionQuery: "SELECT * FROM movies ORDER BY year DESC;",
  },
  {
    id: 5,
    title: "Lección 5: Limitando resultados",
    description: "Usa LIMIT para obtener solo algunos registros",
    explanation: `
# Limitando resultados con LIMIT

**LIMIT** restringe el número de filas devueltas:

\`\`\`sql
SELECT columnas
FROM tabla
LIMIT numero;
\`\`\`

Útil para obtener los "top N" resultados o paginar datos.

## Ejemplos:
\`\`\`sql
SELECT * FROM movies LIMIT 5;
SELECT * FROM movies ORDER BY rating DESC LIMIT 3;
\`\`\`

El segundo ejemplo obtiene las 3 películas mejor calificadas.
    `,
    objectives: [
      "Obtén las primeras 5 películas de la tabla",
      "Obtén las 3 películas con mayor rating",
    ],
    hints: [
      "Usa LIMIT 5 al final de tu consulta",
      "Combina ORDER BY rating DESC con LIMIT 3",
    ],
    initialQuery: "SELECT * FROM movies ",
    solutionQuery: "SELECT * FROM movies ORDER BY rating DESC LIMIT 3;",
  },
];

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

