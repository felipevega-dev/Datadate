export interface AnimatedExample {
  steps: {
    code: string;
    delay: number;
    results: any[];
  }[];
  allData: any[];
}

export interface DataTable {
  title?: string;
  columns: string[];
  rows: Record<string, any>[];
}

export interface SQLExample {
  title?: string;
  code: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  explanation: string; // Solo texto explicativo, SIN código SQL
  sqlExamples?: SQLExample[]; // Código SQL separado
  objectives: string[];
  hints: string[];
  initialQuery: string;
  solutionQuery: string;
  solutions?: string[]; // Soluciones para cada objetivo
  animatedExamples?: AnimatedExample[];
  practiceContext?: string; // Contexto para la práctica
  practiceInstructions?: string; // Instrucciones detalladas
  dataTables?: DataTable[]; // Tablas de datos para mostrar
}

export const lessons: Lesson[] = [
  {
    id: 0,
    title: "Lección 0: Introducción a SQL y Bases de Datos Relacionales",
    description: "Comprende los fundamentos de las bases de datos relacionales antes de comenzar con SQL",
    explanation: `
## ¿Qué es SQL?

SQL, o Structured Query Language (Lenguaje de Consulta Estructurado), es un lenguaje diseñado para permitir que tanto usuarios técnicos como no técnicos puedan consultar, manipular y transformar datos de una base de datos relacional. Debido a su simplicidad, las bases de datos SQL proveen almacenamiento seguro y escalable para millones de sitios web y aplicaciones móviles.

### Dato importante

Existen muchas bases de datos SQL populares incluyendo SQLite, MySQL, PostgreSQL, Oracle y Microsoft SQL Server. Todas ellas soportan el estándar común del lenguaje SQL, que es lo que este sitio enseñará, pero cada implementación puede diferir en las características adicionales y tipos de almacenamiento que soporta.

## Bases de datos relacionales

Antes de aprender la sintaxis SQL, es importante tener un modelo de qué es realmente una base de datos relacional. Una base de datos relacional representa una colección de tablas relacionadas (bidimensionales). Cada una de estas tablas es similar a una hoja de cálculo de Excel, con un número fijo de columnas nombradas (los atributos o propiedades de la tabla) y cualquier número de filas de datos.

Por ejemplo, si el Departamento de Vehículos Motorizados tuviera una base de datos, podrías encontrar una tabla conteniendo todos los vehículos conocidos que las personas en el estado están conduciendo. Esta tabla podría necesitar almacenar el modelo, tipo, número de ruedas y número de puertas de cada vehículo, por ejemplo.

En una base de datos como esta, podrías encontrar tablas relacionadas adicionales conteniendo información como una lista de todos los conductores registrados en el estado, los tipos de licencias de conducir que se pueden otorgar, o incluso infracciones de tránsito para cada conductor.

Al aprender SQL, el objetivo es aprender cómo responder preguntas específicas sobre estos datos, como "¿Qué tipos de vehículos en la carretera tienen menos de cuatro ruedas?", o "¿Cuántos modelos de autos produce Tesla?", para ayudarnos a tomar mejores decisiones.

## Visualizando la estructura de una base de datos

Para entender mejor cómo se organizan las bases de datos, las tablas y las columnas, usa la visualización interactiva a continuación. Puedes explorar tres ejemplos de bases de datos del mundo real:

- **Tienda Online**: Una base de datos para un e-commerce con usuarios, productos y pedidos
- **Red Social**: Una plataforma social con usuarios, publicaciones y comentarios
- **Biblioteca**: Un sistema de gestión de préstamos con libros, préstamos y autores

Haz clic en cada base de datos para ver sus tablas, y en cada tabla para ver sus columnas con tipos de datos y descripciones.

## Acerca de las lecciones

Dado que la mayoría de los usuarios aprenderán SQL para interactuar con una base de datos existente, las lecciones comienzan introduciéndote a las diversas partes de una consulta SQL. Las lecciones posteriores te mostrarán cómo alterar una tabla (o esquema) y crear nuevas tablas desde cero.

Cada lección introducirá un concepto diferente y terminará con un ejercicio interactivo. Ve a tu propio ritmo y no tengas miedo de dedicar tiempo experimentando con los ejercicios antes de continuar. Si ya estás familiarizado con SQL, puedes saltar adelante usando los enlaces de navegación, pero te recomendaríamos trabajar en las lecciones de todos modos.

Al final, esperamos que tengas una base sólida para usar SQL en tus propios proyectos y más allá.
    `,
    objectives: [
      "Lee todo el contenido de esta lección",
    ],
    hints: [
      "Esta lección es solo lectura, no requiere escribir código",
      "Tómate tu tiempo para entender cada concepto",
      "Estos fundamentos te ayudarán en todas las lecciones siguientes",
    ],
    initialQuery: "-- Esta lección es solo teoría. ¡Prepárate para la siguiente!\nSELECT 'Estoy listo' as mensaje;",
    solutionQuery: "SELECT 'Estoy listo' as mensaje;",
    practiceContext: `
## Lección introductoria

Esta es una lección de **conceptos fundamentales**. No necesitas escribir código todavía. Asegúrate de entender:

- Qué es una base de datos relacional
- Cómo se organizan los datos en tablas
- La estructura de filas y columnas
- Por qué SQL es importante

Si algo no quedó claro, relee la sección correspondiente. Estos conceptos son la base para todo lo que viene.
    `,
    practiceInstructions: `
## Instrucciones

Esta lección no requiere ejercicios prácticos. Simplemente:

1. Lee con atención todos los conceptos
2. Observa el ejemplo de la tabla de vehículos
3. Comprende la estructura relacional de los datos
4. Cuando estés listo, continúa con la **Lección 1** donde escribirás tu primera consulta SQL

**Opcional**: Puedes ejecutar la consulta de ejemplo en el editor para familiarizarte con la interfaz.
    `,
    animatedExamples: [
      {
        allData: [
          { mensaje: "Estoy listo" },
        ],
        steps: [
          {
            code: "SELECT",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT 'Estoy listo'",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT 'Estoy listo' as mensaje;",
            delay: 2000,
            results: [
              { mensaje: "Estoy listo" },
            ],
          },
        ],
      },
    ],
    dataTables: [
      {
        title: "Tabla: Vehículos",
        columns: ["Id", "Marca/Modelo", "# Ruedas", "# Puertas", "Tipo"],
        rows: [
          { "Id": 1, "Marca/Modelo": "Ford Focus", "# Ruedas": 4, "# Puertas": 4, "Tipo": "Sedán" },
          { "Id": 2, "Marca/Modelo": "Tesla Roadster", "# Ruedas": 4, "# Puertas": 2, "Tipo": "Deportivo" },
          { "Id": 3, "Marca/Modelo": "Kawasaki Ninja", "# Ruedas": 2, "# Puertas": 0, "Tipo": "Motocicleta" },
          { "Id": 4, "Marca/Modelo": "McLaren Formula 1", "# Ruedas": 4, "# Puertas": 0, "Tipo": "Carrera" },
          { "Id": 5, "Marca/Modelo": "Tesla S", "# Ruedas": 4, "# Puertas": 4, "Tipo": "Sedán" },
        ],
      },
    ],
  },
  {
    id: 1,
    title: "Lección 1: Consultas SELECT 101",
    description: "Aprende a recuperar datos de una base de datos SQL",
    explanation: `
## Recuperando datos con SELECT

Para recuperar datos de una base de datos SQL, necesitamos escribir declaraciones **SELECT**, que coloquialmente se conocen como consultas. Una consulta en sí misma es solo una declaración que define qué datos estamos buscando, dónde encontrarlos en la base de datos y, opcionalmente, cómo transformarlos antes de que sean devueltos.

Puedes pensar en una tabla en SQL como un tipo de entidad (por ejemplo, Series), y cada fila en esa tabla como una instancia específica de ese tipo (por ejemplo, Stranger Things, Breaking Bad, etc.). Esto significa que las columnas representarían las propiedades comunes compartidas por todas las instancias de esa entidad (por ejemplo, titulo, genero, temporadas, etc.).

Dada una tabla de datos, la consulta más básica que podríamos escribir sería una que seleccione un par de columnas (propiedades) de la tabla con todas las filas (instancias).

### Consulta SELECT para columnas específicas

El resultado de esta consulta será un conjunto bidimensional de filas y columnas, efectivamente una copia de la tabla, pero solo con las columnas que solicitamos.

### Consulta SELECT para todas las columnas

Si queremos recuperar absolutamente todas las columnas de datos de una tabla, podemos usar el atajo del asterisco (\`*\`) en lugar de listar todos los nombres de columnas individualmente. Esta consulta es realmente útil porque es una forma simple de inspeccionar una tabla volcando todos los datos de una vez.

## Ejercicio

Estaremos usando una base de datos con información sobre series de Netflix para este ejercicio. Esta primera práctica solo involucrará la tabla Series, y la consulta predeterminada a continuación actualmente no muestra nada. Para continuar a la siguiente lección, modifica la consulta para encontrar la información exacta que necesitamos para cada tarea.
    `,
    sqlExamples: [
      {
        title: "Consulta SELECT para columnas específicas",
        code: "SELECT columna, otra_columna, …\nFROM mi_tabla;"
      },
      {
        title: "Consulta SELECT para todas las columnas",
        code: "SELECT * \nFROM mi_tabla;"
      }
    ],
    objectives: [
      "Encuentra el titulo de cada serie",
      "Encuentra el genero de cada serie",
      "Encuentra el titulo y genero de cada serie",
      "Encuentra el titulo y año de estreno de cada serie",
      "Encuentra toda la información de cada serie",
    ],
    hints: [
      "Usa el asterisco (*) para seleccionar todas las columnas",
      "Para una sola columna: SELECT columna FROM tabla;",
      "Para múltiples columnas sepáralas con comas",
      "Recuerda usar FROM series para especificar la tabla",
      "No olvides el punto y coma al final",
    ],
    initialQuery: "-- Escribe tu consulta SELECT aquí\n",
    solutionQuery: "SELECT * FROM series;",
    solutions: [
      "SELECT titulo FROM series;",
      "SELECT genero FROM series;",
      "SELECT titulo, genero FROM series;",
      "SELECT titulo, año_estreno FROM series;",
      "SELECT * FROM series;",
    ],
    practiceContext: `
## 🎬 Escenario del mundo real

Imagina que trabajas en el equipo de análisis de contenido de Netflix. Tu jefe necesita un reporte rápido de todas las series que tienen en el catálogo. 

Tu tarea es **consultar la base de datos** para obtener toda la información disponible de cada serie. En el mundo real, esto te ayudaría a:

- Hacer un inventario completo del catálogo de series
- Verificar qué información tienen registrada
- Preparar datos para reportes de contenido
- Analizar tendencias de géneros y calificaciones

En plataformas de streaming, estas consultas básicas se hacen **cientos de veces al día** por analistas de datos, equipos de contenido y desarrolladores.
    `,
    practiceInstructions: `
## 📝 ¿Qué debes hacer?

Tu objetivo es escribir consultas SQL para obtener diferentes datos de la tabla \`series\`.

**Pasos a seguir:**

1. Comienza con la palabra clave \`SELECT\`
2. Especifica las columnas que necesitas (o usa \`*\` para todas)
3. Agrega \`FROM series\` para especificar la tabla
4. Termina con punto y coma \`;\`

**Resultado esperado:** Deberías ver todas las series con las columnas solicitadas: id, titulo, genero, temporadas, año_estreno, calificacion.

💡 **Tip profesional:** El asterisco (\`*\`) es útil para exploración inicial, pero en producción es mejor especificar las columnas exactas que necesitas.
    `,
    animatedExamples: [
      {
        allData: [
          { id: 1, titulo: "Stranger Things", genero: "Ciencia Ficción", temporadas: 4, calificacion: 8.7 },
          { id: 2, titulo: "Breaking Bad", genero: "Drama", temporadas: 5, calificacion: 9.5 },
          { id: 3, titulo: "The Crown", genero: "Drama Histórico", temporadas: 6, calificacion: 8.6 },
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
            code: "SELECT *\nFROM series;",
            delay: 2000,
            results: [
              { id: 1, titulo: "Stranger Things", genero: "Ciencia Ficción", temporadas: 4, calificacion: 8.7 },
              { id: 2, titulo: "Breaking Bad", genero: "Drama", temporadas: 5, calificacion: 9.5 },
              { id: 3, titulo: "The Crown", genero: "Drama Histórico", temporadas: 6, calificacion: 8.6 },
            ],
          },
        ],
      },
      {
        allData: [
          { titulo: "Stranger Things", genero: "Ciencia Ficción" },
          { titulo: "Breaking Bad", genero: "Drama" },
          { titulo: "The Crown", genero: "Drama Histórico" },
        ],
        steps: [
          {
            code: "SELECT",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT titulo",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT titulo, genero",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT titulo, genero\nFROM series;",
            delay: 2000,
            results: [
              { titulo: "Stranger Things", genero: "Ciencia Ficción" },
              { titulo: "Breaking Bad", genero: "Drama" },
              { titulo: "The Crown", genero: "Drama Histórico" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Lección 2: Consultas con restricciones (Parte 1)",
    description: "Filtra resultados usando la cláusula WHERE",
    explanation: `
## Filtrando resultados con WHERE

Ahora sabemos cómo seleccionar columnas específicas de una tabla, pero si tuvieras una tabla con cien millones de filas, leer todas las filas sería ineficiente e incluso imposible.

Para filtrar ciertos resultados y que no sean devueltos, necesitamos usar una cláusula **WHERE** en la consulta. La cláusula se aplica a cada fila de datos verificando valores de columnas específicas para determinar si deben incluirse en los resultados o no.

Cláusulas más complejas pueden construirse uniendo numerosas palabras clave lógicas **AND** u **OR**. A continuación, algunos operadores útiles que puedes usar para datos numéricos:

### Operadores numéricos

- **=, !=, <, <=, >, >=**: Operadores numéricos estándar
- **BETWEEN ... AND ...**: El número está dentro de un rango de dos valores (inclusivo)
- **NOT BETWEEN ... AND ...**: El número NO está dentro de un rango
- **IN (...)**: El número existe en una lista
- **NOT IN (...)**: El número NO existe en una lista

Además de hacer los resultados más manejables, escribir cláusulas para restringir el conjunto de filas devueltas también permite que la consulta se ejecute más rápido debido a la reducción de datos innecesarios.
    `,
    sqlExamples: [
      {
        title: "Consulta SELECT con restricciones",
        code: "SELECT columna, otra_columna, …\nFROM mi_tabla\nWHERE condicion\n    AND/OR otra_condicion\n    AND/OR …;"
      },
      {
        title: "Ejemplo con rango numérico",
        code: "SELECT * FROM series\nWHERE año_estreno BETWEEN 2015 AND 2020;"
      },
      {
        title: "Ejemplo con lista",
        code: "SELECT * FROM series\nWHERE temporadas IN (3, 4, 5);"
      }
    ],
    objectives: [
      "Encuentra la serie con id 6",
      "Encuentra las series lanzadas entre 2015 y 2020",
      "Encuentra las series NO lanzadas entre 2015 y 2020",
      "Encuentra las primeras 5 series con sus años de estreno",
    ],
    hints: [
      "Usa WHERE id = 6 para filtrar por id específico",
      "BETWEEN te permite especificar un rango de valores",
      "NOT BETWEEN invierte la condición del rango",
      "LIMIT al final de la query limita el número de resultados",
    ],
    initialQuery: "SELECT * FROM series WHERE ",
    solutionQuery: "SELECT * FROM series WHERE id = 6;",
    solutions: [
      "SELECT * FROM series WHERE id = 6;",
      "SELECT * FROM series WHERE año_estreno BETWEEN 2015 AND 2020;",
      "SELECT * FROM series WHERE año_estreno NOT BETWEEN 2015 AND 2020;",
      "SELECT titulo, año_estreno FROM series LIMIT 5;",
    ],
    practiceContext: `
## 🎬 Escenario del mundo real

El equipo de análisis de Netflix necesita información específica del catálogo. En lugar de traer **TODOS** los datos de las series, necesitan consultas precisas:

- El equipo de desarrollo web quiere actualizar una serie específica por su ID
- El departamento de estadísticas quiere analizar tendencias de series lanzadas en ciertos períodos
- Marketing quiere saber qué series son más recientes para campañas promocionales

Usar **WHERE** es fundamental en producción. Sin filtros, estarías trayendo millones de filas innecesarias, lo que ralentizaría tu aplicación y consumiría recursos del servidor.
    `,
    practiceInstructions: `
## 📝 ¿Qué debes hacer?

Usa la cláusula WHERE para filtrar resultados según diferentes condiciones:

**Objetivo 1:** Encuentra la serie con \`id = 6\`
- Usa: \`WHERE id = 6\`

**Objetivo 2:** Series lanzadas entre 2015 y 2020
- Usa: \`WHERE año_estreno BETWEEN 2015 AND 2020\`

**Objetivo 3:** Series NO lanzadas entre 2015 y 2020
- Usa: \`WHERE año_estreno NOT BETWEEN 2015 AND 2020\`

**Objetivo 4:** Primeras 5 series con título y año
- Usa: \`SELECT titulo, año_estreno FROM series LIMIT 5\`

💡 **Tip profesional:** WHERE es la cláusula más usada en SQL de producción. El 90% de tus queries la incluirán.
    `,
    animatedExamples: [
      {
        allData: [
          { id: 6, titulo: "Narcos", genero: "Crimen", año_estreno: 2015 },
        ],
        steps: [
          {
            code: "SELECT * FROM series",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT * FROM series\nWHERE",
            delay: 800,
            results: [],
          },
          {
            code: "SELECT * FROM series\nWHERE id = 6;",
            delay: 2000,
            results: [
              { id: 6, titulo: "Narcos", genero: "Crimen", año_estreno: 2015 },
            ],
          },
        ],
      },
      {
        allData: [
          { titulo: "Narcos", año_estreno: 2015 },
          { titulo: "The Crown", año_estreno: 2016 },
          { titulo: "Stranger Things", año_estreno: 2016 },
        ],
        steps: [
          {
            code: "SELECT * FROM series\nWHERE año_estreno BETWEEN 2015 AND 2020;",
            delay: 2000,
            results: [
              { titulo: "Narcos", año_estreno: 2015 },
              { titulo: "The Crown", año_estreno: 2016 },
              { titulo: "Stranger Things", año_estreno: 2016 },
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

La cláusula **WHERE** te permite filtrar resultados según condiciones.

## Operadores comunes:
- \`=\` → Igual
- \`!=\` o \`<>\` → Diferente
- \`>\`, \`<\`, \`>=\`, \`<=\` → Comparaciones numéricas
- \`LIKE\` → Patrones de texto

## Combinando condiciones con AND y OR

Puedes combinar múltiples condiciones:

**AND** → Ambas condiciones deben cumplirse

**OR** → Al menos una condición debe cumplirse
    `,
    sqlExamples: [
      {
        title: "Sintaxis básica",
        code: "SELECT columnas\nFROM tabla\nWHERE condicion;"
      },
      {
        title: "Filtrar por año",
        code: "SELECT * FROM movies WHERE year = 2003;"
      },
      {
        title: "Filtrar por director",
        code: "SELECT * FROM movies WHERE director = 'John Lasseter';"
      },
      {
        title: "Comparación numérica",
        code: "SELECT * FROM movies WHERE year >= 2000;"
      },
      {
        title: "Combinando con AND",
        code: "SELECT * FROM movies \nWHERE director = 'John Lasseter' AND year >= 2000;"
      },
      {
        title: "Combinando con OR",
        code: "SELECT * FROM movies \nWHERE director = 'John Lasseter' OR director = 'Pete Docter';"
      }
    ],
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

Para ordenar los resultados, usa **ORDER BY**.

- **ASC** → Ascendente (por defecto)
- **DESC** → Descendente

Puedes ordenar por múltiples columnas separándolas con comas.
    `,
    sqlExamples: [
      {
        title: "Sintaxis básica",
        code: "SELECT columnas\nFROM tabla\nORDER BY columna ASC/DESC;"
      },
      {
        title: "Ordenar por año descendente",
        code: "SELECT * FROM movies ORDER BY year DESC;"
      },
      {
        title: "Ordenar alfabéticamente",
        code: "SELECT title FROM movies ORDER BY title ASC;"
      },
      {
        title: "Ordenar por múltiples columnas",
        code: "SELECT * FROM movies ORDER BY director, year DESC;"
      }
    ],
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

**LIMIT** restringe el número de filas devueltas. Es útil para obtener los "top N" resultados o paginar datos.

Combina LIMIT con ORDER BY para obtener los mejores o peores resultados según un criterio.
    `,
    sqlExamples: [
      {
        title: "Sintaxis básica",
        code: "SELECT columnas\nFROM tabla\nLIMIT numero;"
      },
      {
        title: "Primeros 5 registros",
        code: "SELECT * FROM movies LIMIT 5;"
      },
      {
        title: "Top 3 mejor calificadas",
        code: "SELECT * FROM movies ORDER BY rating DESC LIMIT 3;"
      }
    ],
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

