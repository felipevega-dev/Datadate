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
    initialQuery: "SELECT * FROM series",
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
Practica escribiendo consultas **SELECT** para obtener datos específicos de la tabla de series. Aprenderás a seleccionar todas las columnas con \`*\` o solo las que necesitas.

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
        title: "Ejemplo con rango numérico",
        code: "SELECT * FROM series\nWHERE año_estreno BETWEEN 2015 AND 2020;"
      },
      {
        title: "Ejemplo con comparación exacta",
        code: "SELECT * FROM series\nWHERE id = 6;"
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
    practiceInstructions: `
Practica usando **WHERE** para filtrar datos según condiciones numéricas. Aprenderás a usar comparaciones exactas, rangos con **BETWEEN** y limitar resultados con **LIMIT**.

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
    title: "Lección 3: Consultas con restricciones (Parte 2)",
    description: "Filtra datos de texto con LIKE y wildcards",
    explanation: `
## Filtrando texto con WHERE

Cuando escribes cláusulas WHERE con columnas que contienen datos de texto, SQL soporta varios operadores útiles para hacer comparaciones de strings y coincidencia de patrones con wildcards.

### Operadores de texto

Todas las cadenas deben estar entre comillas para que el analizador de queries pueda distinguir las palabras en el string de las palabras clave SQL.

Aunque la mayoría de implementaciones de bases de datos son eficientes usando estos operadores, la búsqueda de texto completo se deja mejor a bibliotecas dedicadas como Apache Lucene o Sphinx, que son más eficientes para búsquedas complejas.
    `,
    dataTables: [
      {
        title: "Operadores de texto en SQL",
        columns: ["Operador", "Condición", "Ejemplo"],
        rows: [
          {
            Operador: "=",
            Condición: "Comparación exacta sensible a mayúsculas/minúsculas",
            Ejemplo: 'col_name = "abc"'
          },
          {
            Operador: "!= o <>",
            Condición: "Desigualdad exacta sensible a mayúsculas/minúsculas",
            Ejemplo: 'col_name != "abcd"'
          },
          {
            Operador: "LIKE",
            Condición: "Comparación exacta insensible a mayúsculas/minúsculas",
            Ejemplo: 'col_name LIKE "ABC"'
          },
          {
            Operador: "NOT LIKE",
            Condición: "Desigualdad insensible a mayúsculas/minúsculas",
            Ejemplo: 'col_name NOT LIKE "ABCD"'
          },
          {
            Operador: "%",
            Condición: "Coincide con cero o más caracteres (solo con LIKE o NOT LIKE)",
            Ejemplo: 'col_name LIKE "%AT%" (coincide "AT", "ATTIC", "CAT" o "BATS")'
          },
          {
            Operador: "_",
            Condición: "Coincide con un solo carácter (solo con LIKE o NOT LIKE)",
            Ejemplo: 'col_name LIKE "AN_" (coincide "AND", pero no "AN")'
          },
          {
            Operador: "IN (...)",
            Condición: "String existe en una lista",
            Ejemplo: 'col_name IN ("A", "B", "C")'
          },
          {
            Operador: "NOT IN (...)",
            Condición: "String no existe en una lista",
            Ejemplo: 'col_name NOT IN ("D", "E", "F")'
          }
        ]
      }
    ],
    sqlExamples: [
      {
        title: "LIKE con wildcard %",
        code: "SELECT * FROM series\nWHERE titulo LIKE '%Crown%';"
      },
      {
        title: "Lista de valores con IN",
        code: "SELECT * FROM series\nWHERE genero IN ('Drama', 'Crimen', 'Fantasía');"
      }
    ],
    objectives: [
      "Encuentra todas las series del género 'Drama'",
      "Encuentra todas las series cuyo título empieza con 'The'",
      "Encuentra todas las series cuyo título NO contiene 'The'",
      "Encuentra las series de género Crimen o Ciencia Ficción",
    ],
    hints: [
      "Para comparación exacta usa: WHERE columna = 'valor'",
      "LIKE 'The%' encuentra textos que EMPIEZAN con 'The'",
      "LIKE '%palabra%' encuentra textos que CONTIENEN 'palabra'",
      "IN permite verificar múltiples valores a la vez",
    ],
    initialQuery: "SELECT * FROM series WHERE ",
    solutionQuery: "SELECT * FROM series WHERE genero = 'Drama';",
    solutions: [
      "SELECT * FROM series WHERE genero = 'Drama';",
      "SELECT * FROM series WHERE titulo LIKE 'The%';",
      "SELECT * FROM series WHERE titulo NOT LIKE '%The%';",
      "SELECT * FROM series WHERE genero IN ('Crimen', 'Ciencia Ficción');",
    ],
    practiceInstructions: `
Practica filtrando datos de texto usando **LIKE** con wildcards (%), **NOT LIKE** para exclusiones, y **IN** para listas de valores. Aprenderás a buscar patrones en strings de forma flexible.

💡 **Tip profesional:** LIKE con % es potente pero puede ser lento en tablas grandes. Usa índices de texto completo en producción.
    `,
    animatedExamples: [
      {
        allData: [
          { titulo: "Breaking Bad", genero: "Drama" },
          { titulo: "The Crown", genero: "Drama Histórico" },
          { titulo: "Ozark", genero: "Drama" },
        ],
        steps: [
          {
            code: "SELECT * FROM series\nWHERE genero = 'Drama';",
            delay: 2000,
            results: [
              { titulo: "Breaking Bad", genero: "Drama" },
              { titulo: "Ozark", genero: "Drama" },
            ],
          },
        ],
      },
      {
        allData: [
          { titulo: "The Crown", genero: "Drama Histórico" },
          { titulo: "The Witcher", genero: "Fantasía" },
          { titulo: "The Queen's Gambit", genero: "Drama" },
        ],
        steps: [
          {
            code: "SELECT titulo FROM series\nWHERE titulo LIKE 'The%';",
            delay: 2000,
            results: [
              { titulo: "The Crown" },
              { titulo: "The Witcher" },
              { titulo: "The Queen's Gambit" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Lección 4: Filtrado y ordenamiento de resultados",
    description: "Usa DISTINCT, ORDER BY y LIMIT/OFFSET",
    explanation: `
## Eliminando duplicados con DISTINCT

Aunque los datos en una base de datos pueden ser únicos, los resultados de cualquier consulta particular pueden no serlo. Por ejemplo, en nuestra tabla de series, muchas series diferentes pueden pertenecer al mismo género.

SQL proporciona una forma conveniente de descartar filas que tienen un valor de columna duplicado usando la palabra clave **DISTINCT**.

### Ordenando resultados

A diferencia de nuestra tabla ordenada, la mayoría de los datos en bases de datos reales se agregan sin un orden particular. SQL proporciona una forma de ordenar tus resultados por una columna dada en orden ascendente o descendente usando la cláusula **ORDER BY**.

Cuando se especifica ORDER BY, cada fila se ordena alfa-numéricamente según el valor de la columna especificada.

### Limitando resultados a un subconjunto

Otra cláusula comúnmente usada con ORDER BY son **LIMIT** y **OFFSET**, que son optimizaciones útiles para indicar a la base de datos el subconjunto de resultados que te interesan.

LIMIT reducirá el número de filas a devolver, y el OFFSET opcional especificará desde dónde comenzar a contar el número de filas.
    `,
    sqlExamples: [
      {
        title: "DISTINCT y ORDER BY",
        code: "SELECT DISTINCT genero FROM series\nORDER BY genero;"
      },
      {
        title: "LIMIT y OFFSET para paginación",
        code: "SELECT titulo FROM series\nORDER BY titulo\nLIMIT 5 OFFSET 5;"
      }
    ],
    objectives: [
      "Lista todos los géneros de series sin duplicados (alfabéticamente)",
      "Lista las últimas 4 series lanzadas (de más reciente a menos reciente)",
      "Lista las primeras 5 series ordenadas alfabéticamente por título",
      "Lista las siguientes 5 series ordenadas alfabéticamente (de la 6 a la 10)",
    ],
    hints: [
      "DISTINCT elimina valores duplicados de los resultados",
      "ORDER BY columna DESC ordena de mayor a menor",
      "LIMIT 5 toma solo los primeros 5 resultados",
      "OFFSET 5 salta los primeros 5 y empieza desde el 6to",
    ],
    initialQuery: "SELECT * FROM series ",
    solutionQuery: "SELECT DISTINCT genero FROM series ORDER BY genero;",
    solutions: [
      "SELECT DISTINCT genero FROM series ORDER BY genero;",
      "SELECT * FROM series ORDER BY año_estreno DESC LIMIT 4;",
      "SELECT titulo FROM series ORDER BY titulo LIMIT 5;",
      "SELECT titulo FROM series ORDER BY titulo LIMIT 5 OFFSET 5;",
    ],
    practiceInstructions: `
Practica eliminando duplicados con **DISTINCT**, ordenando resultados con **ORDER BY** (ASC/DESC), y limitando datos con **LIMIT** y **OFFSET** para paginación.

💡 **Tip profesional:** En APIs REST, LIMIT y OFFSET son como \`page_size\` y \`page_number\`. Esto es paginación real de bases de datos.
    `,
    animatedExamples: [
      {
        allData: [
          { genero: "Ciencia Ficción" },
          { genero: "Crimen" },
          { genero: "Drama" },
        ],
        steps: [
          {
            code: "SELECT DISTINCT genero FROM series\nORDER BY genero;",
            delay: 2000,
            results: [
              { genero: "Ciencia Ficción" },
              { genero: "Crimen" },
              { genero: "Drama" },
            ],
          },
        ],
      },
      {
        allData: [
          { titulo: "The Queen's Gambit", año_estreno: 2020 },
          { titulo: "The Witcher", año_estreno: 2019 },
          { titulo: "Ozark", año_estreno: 2017 },
        ],
        steps: [
          {
            code: "SELECT titulo, año_estreno FROM series\nORDER BY año_estreno DESC\nLIMIT 3;",
            delay: 2000,
            results: [
              { titulo: "The Queen's Gambit", año_estreno: 2020 },
              { titulo: "The Witcher", año_estreno: 2019 },
              { titulo: "Ozark", año_estreno: 2017 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Lección 5: Repaso de consultas SELECT simples",
    description: "Practica todo lo aprendido con un nuevo dataset",
    explanation: `
## 🎉 ¡Excelente progreso!

Has aprendido los fundamentos de SQL. Ahora es momento de practicar con un dataset diferente para consolidar tus conocimientos.

### Sintaxis completa de SELECT

Esta es la estructura completa que has aprendido hasta ahora:

\`\`\`sql
SELECT columna, otra_columna, …
FROM tabla
WHERE condicion(es)
ORDER BY columna ASC/DESC
LIMIT num_limit OFFSET num_offset;
\`\`\`

### Sobre el dataset

En este ejercicio trabajarás con información de las ciudades más pobladas de **Sudamérica**, incluyendo su población y ubicación geoespacial.

**Dato interesante:** Las latitudes positivas corresponden al hemisferio norte, y las negativas al hemisferio sur. Las longitudes positivas corresponden al hemisferio este (Asia, Europa), y las negativas al hemisferio oeste (América).

### Reto

Escribe consultas SQL para encontrar la información solicitada en cada objetivo. Necesitarás combinar diferentes cláusulas (WHERE, ORDER BY, LIMIT, OFFSET) según cada tarea.

Una vez completada esta lección, estarás listo para aprender sobre queries que abarcan múltiples tablas (JOINs).
    `,
    dataTables: [
      {
        title: "Vista previa de la tabla ciudades",
        columns: ["nombre", "pais", "poblacion"],
        rows: [
          { nombre: "São Paulo", pais: "Brasil", poblacion: "12.3M" },
          { nombre: "Buenos Aires", pais: "Argentina", poblacion: "15.6M" },
          { nombre: "Lima", pais: "Perú", poblacion: "10.7M" },
          { nombre: "Bogotá", pais: "Colombia", poblacion: "11.2M" },
          { nombre: "Rio de Janeiro", pais: "Brasil", poblacion: "13.6M" },
        ]
      }
    ],
    sqlExamples: [
      {
        title: "Ejemplo: Ciudades de un país específico",
        code: "SELECT nombre, poblacion\nFROM ciudades\nWHERE pais = 'Brasil'\nORDER BY poblacion DESC;"
      },
      {
        title: "Ejemplo: Top ciudades por población",
        code: "SELECT nombre, pais, poblacion\nFROM ciudades\nORDER BY poblacion DESC\nLIMIT 3;"
      }
    ],
    objectives: [
      "Lista todas las ciudades de Colombia con sus poblaciones",
      "Ordena todas las ciudades de Brasil por latitud (de sur a norte)",
      "Lista todas las ciudades al sur de Lima (latitud < -12.0464), ordenadas de sur a norte",
      "Lista las 2 ciudades más pobladas de Sudamérica",
      "Lista la 3ra y 4ta ciudad más poblada de Brasil",
    ],
    hints: [
      "Usa WHERE pais = 'Colombia' para filtrar por país",
      "ORDER BY latitud ASC ordena de sur (-) a norte (+)",
      "Las latitudes negativas más pequeñas están más al sur",
      "Combina ORDER BY poblacion DESC con LIMIT 2",
      "Usa LIMIT 2 OFFSET 2 para saltar las primeras 2",
    ],
    initialQuery: "SELECT * FROM ciudades ",
    solutionQuery: "SELECT nombre, poblacion FROM ciudades WHERE pais = 'Colombia';",
    solutions: [
      "SELECT nombre, poblacion FROM ciudades WHERE pais = 'Colombia';",
      "SELECT * FROM ciudades WHERE pais = 'Brasil' ORDER BY latitud ASC;",
      "SELECT * FROM ciudades WHERE latitud < -12.0464 ORDER BY latitud ASC;",
      "SELECT nombre, pais, poblacion FROM ciudades ORDER BY poblacion DESC LIMIT 2;",
      "SELECT nombre, pais, poblacion FROM ciudades WHERE pais = 'Brasil' ORDER BY poblacion DESC LIMIT 2 OFFSET 2;",
    ],
    practiceInstructions: `
Practica combinando **WHERE**, **ORDER BY**, **LIMIT** y **OFFSET** para responder preguntas complejas sobre las ciudades sudamericanas. Esta es tu oportunidad para demostrar todo lo que has aprendido.

💡 **Tip profesional:** En el mundo real, las consultas rara vez son simples SELECT *. Casi siempre combinan múltiples cláusulas para obtener exactamente los datos que necesitas.
    `,
    animatedExamples: [
      {
        allData: [
          { nombre: "Bogotá", pais: "Colombia", poblacion: 11167000 },
          { nombre: "Medellín", pais: "Colombia", poblacion: 2569000 },
        ],
        steps: [
          {
            code: "SELECT nombre, poblacion\nFROM ciudades\nWHERE pais = 'Colombia';",
            delay: 2000,
            results: [
              { nombre: "Bogotá", poblacion: 11167000 },
              { nombre: "Medellín", poblacion: 2569000 },
            ],
          },
        ],
      },
      {
        allData: [
          { nombre: "Buenos Aires", pais: "Argentina", poblacion: 15594000 },
          { nombre: "Rio de Janeiro", pais: "Brasil", poblacion: 13634000 },
        ],
        steps: [
          {
            code: "SELECT nombre, pais, poblacion\nFROM ciudades\nORDER BY poblacion DESC\nLIMIT 2;",
            delay: 2000,
            results: [
              { nombre: "Buenos Aires", pais: "Argentina", poblacion: 15594000 },
              { nombre: "Rio de Janeiro", pais: "Brasil", poblacion: 13634000 },
            ],
          },
        ],
      },
    ],
  },
];

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

