export interface CSSLesson {
  id: number;
  title: string;
  description: string;
  explanation: string;
  codeExamples?: { title?: string; code: string }[];
  objectives: string[];
  hints: string[];
  solutions?: string[];
  initialHTML: string;
  initialCSS: string;
  testCases?: TestCase[];
}

export interface TestCase {
  description: string;
  test: (css: string) => boolean;
}

export const cssLessons: CSSLesson[] = [
  {
    id: 1,
    title: "Selectores y Colores",
    description: "Aprende a seleccionar elementos HTML y aplicar colores",
    explanation: `CSS (Cascading Style Sheets) es el lenguaje que usamos para darle estilo a las páginas web. Con CSS podemos cambiar colores, tamaños, posiciones y mucho más.

## Selectores Básicos

Los selectores nos permiten elegir qué elementos HTML queremos estilizar:

- **Elemento**: \`p { }\` - Selecciona todas las etiquetas \`<p>\`
- **Clase**: \`.mi-clase { }\` - Selecciona elementos con \`class="mi-clase"\`
- **ID**: \`#mi-id { }\` - Selecciona el elemento con \`id="mi-id"\`

## Colores

Hay varias formas de definir colores:

- **Nombres**: \`color: red;\`
- **Hexadecimal**: \`color: #FF0000;\`
- **RGB**: \`color: rgb(255, 0, 0);\`
- **RGBA**: \`color: rgba(255, 0, 0, 0.5);\` (con transparencia)

## Propiedades de Color

- **color** - Color del texto
- **background-color** - Color de fondo`,
    codeExamples: [
      {
        title: "Selectores y colores",
        code: `/* Selector de elemento */
h1 {
  color: blue;
  background-color: lightgray;
}

/* Selector de clase */
.destacado {
  color: red;
  background-color: yellow;
}

/* Selector de ID */
#titulo-principal {
  color: white;
  background-color: #333333;
}

/* Colores en diferentes formatos */
.caja {
  color: rgb(50, 100, 150);
  background-color: rgba(200, 200, 200, 0.5);
}`
      }
    ],
    objectives: [
      "Haz que el h1 tenga color azul (blue)",
      "Haz que el párrafo con clase 'destacado' tenga fondo amarillo (yellow)",
      "Haz que el div con id 'caja' tenga color de texto blanco (white)",
      "Haz que el body tenga un fondo gris claro (#f0f0f0)",
      "Haz que todos los párrafos tengan color de texto gris oscuro (#333)"
    ],
    hints: [
      "Para seleccionar elemento: nombreElemento { propiedad: valor; }",
      "Para seleccionar clase usa un punto: .nombreClase { }",
      "Para seleccionar ID usa numeral: #nombreId { }",
      "color: cambia el color del texto",
      "background-color: cambia el color de fondo"
    ],
    solutions: [
      `h1 { color: blue; }`,
      `.destacado { background-color: yellow; }`,
      `#caja { color: white; }`,
      `body { background-color: #f0f0f0; }`,
      `p { color: #333; }`
    ],
    initialHTML: `<h1>Título Principal</h1>
<p class="destacado">Este párrafo está destacado</p>
<p>Este es un párrafo normal</p>
<div id="caja">Contenido de la caja</div>`,
    initialCSS: `/* Escribe tu CSS aquí */\n`,
    testCases: [
      {
        description: "h1 debe tener color azul",
        test: (css) => /h1\s*\{[^}]*color:\s*blue/.test(css)
      },
      {
        description: ".destacado debe tener fondo amarillo",
        test: (css) => /\.destacado\s*\{[^}]*background-color:\s*yellow/.test(css)
      },
      {
        description: "#caja debe tener color blanco",
        test: (css) => /#caja\s*\{[^}]*color:\s*white/.test(css)
      },
      {
        description: "body debe tener fondo #f0f0f0",
        test: (css) => /body\s*\{[^}]*background-color:\s*#f0f0f0/.test(css)
      },
      {
        description: "p debe tener color #333",
        test: (css) => /p\s*\{[^}]*color:\s*#333/.test(css)
      }
    ]
  },
  {
    id: 2,
    title: "Tipografía y Texto",
    description: "Controla el estilo del texto con propiedades de fuente",
    explanation: `CSS ofrece muchas propiedades para controlar cómo se ve el texto en tu página.

## Propiedades de Fuente

- **font-family** - Tipo de fuente
- **font-size** - Tamaño del texto
- **font-weight** - Grosor (normal, bold, 100-900)
- **font-style** - Estilo (normal, italic)

## Propiedades de Texto

- **text-align** - Alineación (left, center, right, justify)
- **text-decoration** - Decoración (none, underline, line-through)
- **text-transform** - Transformación (uppercase, lowercase, capitalize)
- **line-height** - Altura de línea
- **letter-spacing** - Espaciado entre letras

## Unidades de Tamaño

- **px** - Píxeles (fijo)
- **em** - Relativo al tamaño de fuente del padre
- **rem** - Relativo al tamaño de fuente raíz
- **%** - Porcentaje del contenedor`,
    codeExamples: [
      {
        title: "Estilizando texto",
        code: `/* Fuentes */
h1 {
  font-family: Arial, sans-serif;
  font-size: 32px;
  font-weight: bold;
}

/* Alineación y decoración */
.centrado {
  text-align: center;
  text-decoration: underline;
}

/* Transformaciones */
.mayusculas {
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Altura de línea */
p {
  line-height: 1.6;
  font-size: 16px;
}`
      }
    ],
    objectives: [
      "Haz que el h1 tenga tamaño de fuente de 36px",
      "Haz que el h1 tenga font-weight de bold",
      "Haz que el párrafo con clase 'centrado' esté centrado (text-align: center)",
      "Haz que todos los párrafos tengan line-height de 1.6",
      "Haz que el span con clase 'mayusculas' esté en mayúsculas (text-transform: uppercase)"
    ],
    hints: [
      "font-size: controla el tamaño del texto",
      "font-weight: bold hace el texto en negrita",
      "text-align: center centra el texto",
      "line-height: controla el espacio entre líneas",
      "text-transform: uppercase convierte a mayúsculas"
    ],
    solutions: [
      `h1 { font-size: 36px; }`,
      `h1 { font-weight: bold; }`,
      `.centrado { text-align: center; }`,
      `p { line-height: 1.6; }`,
      `.mayusculas { text-transform: uppercase; }`
    ],
    initialHTML: `<h1>Título con Estilo</h1>
<p class="centrado">Este párrafo está centrado</p>
<p>Este es un párrafo con altura de línea mejorada para mejor lectura.</p>
<span class="mayusculas">texto en mayúsculas</span>`,
    initialCSS: `/* Escribe tu CSS aquí */\n`,
    testCases: [
      {
        description: "h1 debe tener font-size: 36px",
        test: (css) => /h1\s*\{[^}]*font-size:\s*36px/.test(css)
      },
      {
        description: "h1 debe tener font-weight: bold",
        test: (css) => /h1\s*\{[^}]*font-weight:\s*bold/.test(css)
      },
      {
        description: ".centrado debe estar centrado",
        test: (css) => /\.centrado\s*\{[^}]*text-align:\s*center/.test(css)
      },
      {
        description: "p debe tener line-height: 1.6",
        test: (css) => /p\s*\{[^}]*line-height:\s*1\.6/.test(css)
      },
      {
        description: ".mayusculas debe usar text-transform: uppercase",
        test: (css) => /\.mayusculas\s*\{[^}]*text-transform:\s*uppercase/.test(css)
      }
    ]
  },
  {
    id: 3,
    title: "Box Model (Margin, Padding, Border)",
    description: "Entiende el modelo de caja de CSS para controlar espaciado",
    explanation: `Cada elemento HTML es una caja rectangular. El Box Model define cómo se calcula el tamaño de esa caja.

## Componentes del Box Model

De adentro hacia afuera:

1. **Content** - El contenido (texto, imágenes, etc.)
2. **Padding** - Espacio interno entre el contenido y el borde
3. **Border** - El borde de la caja
4. **Margin** - Espacio externo entre la caja y otros elementos

## Propiedades

\`\`\`css
div {
  /* Padding (espacio interno) */
  padding: 20px;  /* Todos los lados */
  padding-top: 10px;  /* Solo arriba */
  
  /* Border (borde) */
  border: 2px solid black;
  border-radius: 10px;  /* Esquinas redondeadas */
  
  /* Margin (espacio externo) */
  margin: 15px;
  margin-bottom: 30px;
}
\`\`\`

## Valores

- Un valor: aplica a todos los lados
- Dos valores: vertical | horizontal
- Cuatro valores: arriba | derecha | abajo | izquierda`,
    codeExamples: [
      {
        title: "Box Model en acción",
        code: `/* Caja básica */
.caja {
  width: 200px;
  height: 100px;
  
  /* Padding */
  padding: 20px;
  
  /* Border */
  border: 3px solid blue;
  border-radius: 10px;
  
  /* Margin */
  margin: 30px;
  
  background-color: lightblue;
}

/* Padding y margin específicos */
.espaciado {
  padding-top: 10px;
  padding-bottom: 20px;
  margin-left: 50px;
  margin-right: 50px;
}`
      }
    ],
    objectives: [
      "Haz que el div con clase 'caja' tenga padding de 20px",
      "Haz que la 'caja' tenga un borde de 2px solid negro",
      "Haz que la 'caja' tenga margin de 15px",
      "Haz que la 'caja' tenga border-radius de 10px (esquinas redondeadas)",
      "Haz que el párrafo tenga padding de 10px y margin-bottom de 20px"
    ],
    hints: [
      "padding: agrega espacio interno",
      "border: necesita tres valores (ancho, estilo, color)",
      "margin: agrega espacio externo",
      "border-radius: redondea las esquinas",
      "Puedes usar propiedades específicas como margin-bottom"
    ],
    solutions: [
      `.caja { padding: 20px; }`,
      `.caja { border: 2px solid black; }`,
      `.caja { margin: 15px; }`,
      `.caja { border-radius: 10px; }`,
      `p { padding: 10px; margin-bottom: 20px; }`
    ],
    initialHTML: `<div class="caja">
  Esta es una caja con el modelo de caja completo
</div>
<p>Este es un párrafo con espaciado</p>`,
    initialCSS: `.caja {
  background-color: lightblue;
  width: 300px;
}

/* Escribe tu CSS aquí */\n`,
    testCases: [
      {
        description: ".caja debe tener padding: 20px",
        test: (css) => /\.caja\s*\{[^}]*padding:\s*20px/.test(css)
      },
      {
        description: ".caja debe tener border: 2px solid",
        test: (css) => /\.caja\s*\{[^}]*border:\s*2px\s+solid/.test(css)
      },
      {
        description: ".caja debe tener margin: 15px",
        test: (css) => /\.caja\s*\{[^}]*margin:\s*15px/.test(css)
      },
      {
        description: ".caja debe tener border-radius: 10px",
        test: (css) => /\.caja\s*\{[^}]*border-radius:\s*10px/.test(css)
      },
      {
        description: "p debe tener padding y margin-bottom",
        test: (css) => /p\s*\{[^}]*padding:\s*10px/.test(css) && /p\s*\{[^}]*margin-bottom:\s*20px/.test(css)
      }
    ]
  },
  {
    id: 4,
    title: "Display y Tamaños",
    description: "Controla cómo se muestran y dimensionan los elementos",
    explanation: `La propiedad **display** controla cómo se comporta un elemento en el flujo del documento.

## Valores de Display

- **block** - Ocupa todo el ancho disponible (div, p, h1)
- **inline** - Solo ocupa el espacio necesario (span, a)
- **inline-block** - Como inline pero acepta width/height
- **none** - Oculta el elemento completamente

## Propiedades de Tamaño

- **width** - Ancho del elemento
- **height** - Alto del elemento
- **max-width** - Ancho máximo
- **min-width** - Ancho mínimo
- **max-height** - Alto máximo
- **min-height** - Alto mínimo

## Unidades

- **px** - Píxeles fijos
- **%** - Porcentaje del contenedor
- **vw** - Porcentaje del viewport width (100vw = ancho completo de la ventana)
- **vh** - Porcentaje del viewport height`,
    codeExamples: [
      {
        title: "Display y dimensiones",
        code: `/* Block element */
.bloque {
  display: block;
  width: 300px;
  height: 100px;
  background-color: lightblue;
}

/* Inline element */
.linea {
  display: inline;
  background-color: yellow;
}

/* Inline-block */
.caja-inline {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: lightgreen;
}

/* Dimensiones relativas */
.contenedor {
  width: 80%;
  max-width: 1200px;
  min-height: 400px;
}`
      }
    ],
    objectives: [
      "Haz que el div con clase 'caja' tenga width de 200px",
      "Haz que la 'caja' tenga height de 150px",
      "Haz que el span tenga display: inline-block",
      "Haz que el span tenga width de 100px y height de 100px",
      "Haz que el div con clase 'contenedor' tenga max-width de 800px"
    ],
    hints: [
      "width: controla el ancho",
      "height: controla el alto",
      "display: inline-block permite usar width y height en elementos inline",
      "max-width: limita el ancho máximo",
      "Los valores van seguidos de la unidad (px, %, etc.)"
    ],
    solutions: [
      `.caja { width: 200px; }`,
      `.caja { height: 150px; }`,
      `span { display: inline-block; }`,
      `span { width: 100px; height: 100px; }`,
      `.contenedor { max-width: 800px; }`
    ],
    initialHTML: `<div class="caja">Caja con dimensiones fijas</div>
<span>Span 1</span>
<span>Span 2</span>
<div class="contenedor">
  Contenedor con ancho máximo
</div>`,
    initialCSS: `.caja {
  background-color: lightblue;
}

span {
  background-color: yellow;
  margin: 5px;
}

.contenedor {
  background-color: lightgreen;
  width: 100%;
}

/* Escribe tu CSS aquí */\n`,
    testCases: [
      {
        description: ".caja debe tener width: 200px",
        test: (css) => /\.caja\s*\{[^}]*width:\s*200px/.test(css)
      },
      {
        description: ".caja debe tener height: 150px",
        test: (css) => /\.caja\s*\{[^}]*height:\s*150px/.test(css)
      },
      {
        description: "span debe tener display: inline-block",
        test: (css) => /span\s*\{[^}]*display:\s*inline-block/.test(css)
      },
      {
        description: "span debe tener width y height de 100px",
        test: (css) => /span\s*\{[^}]*width:\s*100px/.test(css) && /span\s*\{[^}]*height:\s*100px/.test(css)
      },
      {
        description: ".contenedor debe tener max-width: 800px",
        test: (css) => /\.contenedor\s*\{[^}]*max-width:\s*800px/.test(css)
      }
    ]
  },
  {
    id: 5,
    title: "Flexbox Básico",
    description: "Aprende a crear layouts flexibles con Flexbox",
    explanation: `Flexbox es un sistema de layout que facilita la alineación y distribución de elementos.

## Activar Flexbox

\`\`\`css
.contenedor {
  display: flex;
}
\`\`\`

## Propiedades del Contenedor

- **flex-direction** - Dirección (row, column)
- **justify-content** - Alineación horizontal
  - flex-start, flex-end, center, space-between, space-around
- **align-items** - Alineación vertical
  - flex-start, flex-end, center, stretch
- **gap** - Espacio entre elementos

## Propiedades de los Hijos

- **flex** - Cuánto espacio ocupa (0, 1, 2, etc.)
- **order** - Orden de aparición

## Ventajas de Flexbox

- Centrado fácil
- Distribución automática del espacio
- Orden flexible de elementos
- Responsive sin media queries complejos`,
    codeExamples: [
      {
        title: "Flexbox en acción",
        code: `/* Contenedor flex */
.contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

/* Dirección de columna */
.columna {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Centrado perfecto */
.centrado {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

/* Hijo flexible */
.hijo {
  flex: 1;  /* Ocupa espacio disponible */
}`
      }
    ],
    objectives: [
      "Haz que el div con clase 'contenedor' use display: flex",
      "Haz que el 'contenedor' tenga justify-content: space-between",
      "Haz que el 'contenedor' tenga align-items: center",
      "Haz que el 'contenedor' tenga gap de 20px",
      "Haz que los divs con clase 'hijo' tengan flex: 1 para ocupar espacio igual"
    ],
    hints: [
      "display: flex activa Flexbox",
      "justify-content: controla la alineación horizontal",
      "align-items: controla la alineación vertical",
      "gap: agrega espacio entre elementos flex",
      "flex: 1 hace que los elementos ocupen espacio igual"
    ],
    solutions: [
      `.contenedor { display: flex; }`,
      `.contenedor { justify-content: space-between; }`,
      `.contenedor { align-items: center; }`,
      `.contenedor { gap: 20px; }`,
      `.hijo { flex: 1; }`
    ],
    initialHTML: `<div class="contenedor">
  <div class="hijo">Elemento 1</div>
  <div class="hijo">Elemento 2</div>
  <div class="hijo">Elemento 3</div>
</div>`,
    initialCSS: `.contenedor {
  background-color: lightgray;
  padding: 20px;
  height: 200px;
}

.hijo {
  background-color: lightblue;
  padding: 20px;
  border: 2px solid blue;
}

/* Escribe tu CSS aquí */\n`,
    testCases: [
      {
        description: ".contenedor debe usar display: flex",
        test: (css) => /\.contenedor\s*\{[^}]*display:\s*flex/.test(css)
      },
      {
        description: ".contenedor debe tener justify-content: space-between",
        test: (css) => /\.contenedor\s*\{[^}]*justify-content:\s*space-between/.test(css)
      },
      {
        description: ".contenedor debe tener align-items: center",
        test: (css) => /\.contenedor\s*\{[^}]*align-items:\s*center/.test(css)
      },
      {
        description: ".contenedor debe tener gap: 20px",
        test: (css) => /\.contenedor\s*\{[^}]*gap:\s*20px/.test(css)
      },
      {
        description: ".hijo debe tener flex: 1",
        test: (css) => /\.hijo\s*\{[^}]*flex:\s*1/.test(css)
      }
    ]
  },
  {
    id: 6,
    title: "Hover y Transiciones",
    description: "Añade interactividad con hover y transiciones suaves",
    explanation: `Las pseudo-clases y transiciones permiten crear efectos interactivos en tu sitio web.

## Pseudo-clase :hover

Se activa cuando el mouse pasa sobre un elemento:

\`\`\`css
.boton:hover {
  background-color: blue;
}
\`\`\`

## Transiciones

Animan cambios de propiedades:

\`\`\`css
.elemento {
  transition: propiedad duracion;
}

.boton {
  transition: background-color 0.3s;
}
\`\`\`

## Propiedades Animables

- Colores (color, background-color)
- Tamaños (width, height, font-size)
- Transformaciones (transform)
- Opacidad (opacity)

## Sintaxis de Transition

- **transition: all 0.3s** - Anima todas las propiedades
- **transition: background-color 0.5s ease** - Con timing function
- Múltiples: **transition: color 0.3s, transform 0.5s**`,
    codeExamples: [
      {
        title: "Hover y transiciones",
        code: `/* Botón con hover y transición */
.boton {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  transition: all 0.3s;
}

.boton:hover {
  background-color: darkblue;
  transform: scale(1.1);
}

/* Tarjeta con hover */
.tarjeta {
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
}

.tarjeta:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Link con transición de color */
a {
  color: blue;
  transition: color 0.2s;
}

a:hover {
  color: darkred;
}`
      }
    ],
    objectives: [
      "Haz que el botón tenga transition: all 0.3s",
      "Haz que el botón cambie su background-color a darkblue en hover",
      "Haz que el botón cambie su transform a scale(1.1) en hover",
      "Haz que el div con clase 'tarjeta' tenga transition de box-shadow",
      "Haz que la 'tarjeta' cambie su box-shadow en hover"
    ],
    hints: [
      "transition: se pone en el estado normal, no en :hover",
      ":hover es una pseudo-clase que se activa con el mouse",
      "transform: scale(1.1) agranda el elemento 10%",
      "box-shadow: X Y blur color",
      "La duración se especifica en segundos (s) o milisegundos (ms)"
    ],
    solutions: [
      `.boton { transition: all 0.3s; }`,
      `.boton:hover { background-color: darkblue; }`,
      `.boton:hover { transform: scale(1.1); }`,
      `.tarjeta { transition: box-shadow 0.3s; }`,
      `.tarjeta:hover { box-shadow: 0 10px 20px rgba(0,0,0,0.3); }`
    ],
    initialHTML: `<button class="boton">Pasa el mouse aquí</button>
<div class="tarjeta">
  <h3>Tarjeta Interactiva</h3>
  <p>Pasa el mouse sobre mí</p>
</div>`,
    initialCSS: `.boton {
  background-color: blue;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.tarjeta {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Escribe tu CSS aquí */\n`,
    testCases: [
      {
        description: ".boton debe tener transition: all 0.3s",
        test: (css) => /\.boton\s*\{[^}]*transition:\s*all\s+0\.3s/.test(css)
      },
      {
        description: ".boton:hover debe cambiar background-color a darkblue",
        test: (css) => /\.boton:hover\s*\{[^}]*background-color:\s*darkblue/.test(css)
      },
      {
        description: ".boton:hover debe usar transform: scale",
        test: (css) => /\.boton:hover\s*\{[^}]*transform:\s*scale\(1\.1\)/.test(css)
      },
      {
        description: ".tarjeta debe tener transition de box-shadow",
        test: (css) => /\.tarjeta\s*\{[^}]*transition:\s*box-shadow/.test(css)
      },
      {
        description: ".tarjeta:hover debe cambiar box-shadow",
        test: (css) => /\.tarjeta:hover\s*\{[^}]*box-shadow:/.test(css)
      }
    ]
  }
];

export function getCSSLessonById(id: number): CSSLesson | undefined {
  return cssLessons.find(lesson => lesson.id === id);
}

