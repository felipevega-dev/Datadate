export interface JavaScriptLesson {
  id: number;
  title: string;
  description: string;
  explanation: string;
  codeExamples?: { title?: string; code: string }[];
  objectives: string[];
  hints: string[];
  solutions?: string[];
  initialCode: string;
  testCases?: TestCase[];
}

export interface TestCase {
  description: string;
  test: (output: string, code: string) => boolean;
}

export const javascriptLessons: JavaScriptLesson[] = [
  {
    id: 1,
    title: "Variables (let, const, var)",
    description: "Aprende a declarar variables en JavaScript con let, const y var",
    explanation: `JavaScript tiene tres formas de declarar variables: **let**, **const** y **var**. En código moderno, se recomienda usar **let** y **const**.

## let

Se usa para variables que cambiarán su valor:

\`\`\`javascript
let edad = 25;
edad = 26;  // ✓ Válido
\`\`\`

## const

Se usa para valores constantes que no cambiarán:

\`\`\`javascript
const PI = 3.14159;
// PI = 3.14;  // ✗ Error
\`\`\`

## var (obsoleto)

Es la forma antigua, evítala en código nuevo:

\`\`\`javascript
var nombre = "Juan";  // No recomendado
\`\`\`

## Tipos de Datos

JavaScript tiene tipos dinámicos:
- **Number**: 42, 3.14
- **String**: "texto", 'texto'
- **Boolean**: true, false
- **undefined**: sin valor asignado
- **null**: valor nulo intencional`,
    codeExamples: [
      {
        title: "Declaración de variables",
        code: `// Variables que pueden cambiar
let edad = 25;
let nombre = "Ana";
let estaActivo = true;

// Constantes que no cambian
const PI = 3.14159;
const DIAS_SEMANA = 7;

// Reasignación
edad = 26;  // ✓ Permitido con let
nombre = "Juan";

// const no permite reasignación
// PI = 3.14;  // ✗ Error

console.log(edad, nombre, PI);`
      }
    ],
    objectives: [
      "Declara una variable 'nombre' con let y asígnale tu nombre como string",
      "Declara una constante 'EDAD_MINIMA' con valor 18",
      "Declara una variable 'puntos' con let y valor 0",
      "Reasigna 'puntos' a 100",
      "Usa console.log() para imprimir nombre, EDAD_MINIMA y puntos"
    ],
    hints: [
      "let se usa para variables: let variable = valor;",
      "const se usa para constantes: const CONSTANTE = valor;",
      "Los strings van entre comillas: 'texto' o \"texto\"",
      "Para reasignar: variable = nuevoValor;",
      "console.log() puede recibir múltiples argumentos separados por comas"
    ],
    solutions: [
      `let nombre = "Juan";`,
      `const EDAD_MINIMA = 18;`,
      `let puntos = 0;`,
      `puntos = 100;`,
      `console.log(nombre, EDAD_MINIMA, puntos);`
    ],
    initialCode: `// Escribe tu código aquí\n`,
    testCases: [
      {
        description: "Variable 'nombre' debe declararse con let",
        test: (output, code) => /let\s+nombre\s*=\s*["'][^"']+["']/.test(code)
      },
      {
        description: "Constante 'EDAD_MINIMA' debe ser 18",
        test: (output, code) => /const\s+EDAD_MINIMA\s*=\s*18/.test(code)
      },
      {
        description: "Variable 'puntos' debe declararse con let",
        test: (output, code) => /let\s+puntos\s*=\s*0/.test(code)
      },
      {
        description: "Debe reasignar 'puntos' a 100",
        test: (output, code) => /puntos\s*=\s*100/.test(code) && code.indexOf('let puntos') < code.indexOf('puntos = 100')
      },
      {
        description: "Debe usar console.log()",
        test: (output, code) => /console\.log\(/.test(code)
      }
    ]
  },
  {
    id: 2,
    title: "Funciones y Arrow Functions",
    description: "Aprende a crear y usar funciones en JavaScript",
    explanation: `Las funciones son bloques de código reutilizables. JavaScript tiene varias formas de declararlas.

## Declaración de Función

\`\`\`javascript
function saludar(nombre) {
  return "Hola " + nombre;
}
\`\`\`

## Arrow Functions (Funciones Flecha)

Sintaxis moderna y concisa:

\`\`\`javascript
const sumar = (a, b) => {
  return a + b;
};

// Versión corta (retorno implícito)
const multiplicar = (a, b) => a * b;
\`\`\`

## Parámetros y Retorno

- Los parámetros van entre paréntesis
- **return** devuelve un valor
- Sin return, la función retorna **undefined**`,
    codeExamples: [
      {
        title: "Funciones en acción",
        code: `// Función tradicional
function saludar(nombre) {
  return "Hola " + nombre;
}

// Arrow function
const sumar = (a, b) => {
  return a + b;
};

// Arrow function corta
const cuadrado = n => n * n;

// Llamar funciones
console.log(saludar("Ana"));    // "Hola Ana"
console.log(sumar(5, 3));       // 8
console.log(cuadrado(4));       // 16`
      }
    ],
    objectives: [
      "Crea una función 'saludar' que reciba un nombre y retorne 'Hola [nombre]'",
      "Crea una arrow function 'sumar' que sume dos números",
      "Crea una arrow function 'doble' que retorne el doble de un número",
      "Llama a cada función e imprime los resultados con console.log()",
      "Verifica que todas las funciones retornen el valor correcto"
    ],
    hints: [
      "Función tradicional: function nombre(params) { return valor; }",
      "Arrow function: const nombre = (params) => { return valor; }",
      "Arrow corta: const nombre = param => valor;",
      "Para llamar: nombreFuncion(argumentos)",
      "Usa console.log() para ver los resultados"
    ],
    solutions: [
      `function saludar(nombre) {\n  return "Hola " + nombre;\n}`,
      `const sumar = (a, b) => {\n  return a + b;\n};`,
      `const doble = n => n * 2;`,
      `console.log(saludar("Ana"));\nconsole.log(sumar(5, 3));\nconsole.log(doble(10));`,
      `// Las funciones están correctas si retornan los valores esperados`
    ],
    initialCode: `// Define tus funciones\n`,
    testCases: [
      {
        description: "Función 'saludar' debe existir",
        test: (output, code) => /function\s+saludar\s*\(/.test(code)
      },
      {
        description: "Arrow function 'sumar' debe existir",
        test: (output, code) => /const\s+sumar\s*=\s*\([^)]*\)\s*=>/.test(code)
      },
      {
        description: "Arrow function 'doble' debe existir",
        test: (output, code) => /const\s+doble\s*=\s*\w+\s*=>/.test(code)
      },
      {
        description: "Debe llamar a las funciones",
        test: (output, code) => /saludar\(/.test(code) && /sumar\(/.test(code) && /doble\(/.test(code)
      },
      {
        description: "Debe usar console.log()",
        test: (output, code) => (code.match(/console\.log\(/g) || []).length >= 3
      }
    ]
  },
  {
    id: 3,
    title: "Arrays (Arreglos)",
    description: "Trabaja con arrays y sus métodos más útiles",
    explanation: `Los arrays son colecciones ordenadas de elementos. Son uno de los tipos de datos más importantes en JavaScript.

## Crear Arrays

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const nombres = ["Ana", "Juan", "Pedro"];
const mixto = [1, "texto", true, null];
\`\`\`

## Acceder a Elementos

Los índices empiezan en 0:

\`\`\`javascript
const frutas = ["manzana", "banana", "naranja"];
console.log(frutas[0]);  // "manzana"
console.log(frutas[2]);  // "naranja"
\`\`\`

## Métodos Importantes

- **.push(elemento)** - Agrega al final
- **.pop()** - Elimina el último
- **.shift()** - Elimina el primero
- **.unshift(elemento)** - Agrega al inicio
- **.length** - Número de elementos
- **.includes(elemento)** - Verifica si existe`,
    codeExamples: [
      {
        title: "Arrays en JavaScript",
        code: `// Crear y manipular arrays
const frutas = ["manzana", "banana"];

// Agregar elementos
frutas.push("naranja");      // Al final
frutas.unshift("fresa");     // Al inicio

// Eliminar elementos
const ultimo = frutas.pop();       // Elimina último
const primero = frutas.shift();    // Elimina primero

// Propiedades y métodos
console.log(frutas.length);        // Longitud
console.log(frutas.includes("manzana"));  // true/false

// Acceder a elementos
console.log(frutas[0]);  // Primer elemento
console.log(frutas[frutas.length - 1]);  // Último`
      }
    ],
    objectives: [
      "Crea un array 'numeros' con los números del 1 al 5",
      "Usa .push() para agregar el número 6 al final",
      "Crea un array 'colores' con 3 colores",
      "Obtén la longitud de 'colores' y guárdala en 'cantidad'",
      "Imprime ambos arrays y la cantidad con console.log()"
    ],
    hints: [
      "Array se crea con corchetes: [elemento1, elemento2]",
      ".push() agrega al final: array.push(elemento)",
      ".length retorna la longitud: array.length",
      "Los strings van entre comillas",
      "Usa const para declarar arrays"
    ],
    solutions: [
      `const numeros = [1, 2, 3, 4, 5];`,
      `numeros.push(6);`,
      `const colores = ["rojo", "azul", "verde"];`,
      `const cantidad = colores.length;`,
      `console.log(numeros);\nconsole.log(colores);\nconsole.log(cantidad);`
    ],
    initialCode: `// Trabaja con arrays\n`,
    testCases: [
      {
        description: "Array 'numeros' debe tener [1, 2, 3, 4, 5]",
        test: (output, code) => /const\s+numeros\s*=\s*\[1,\s*2,\s*3,\s*4,\s*5\]/.test(code)
      },
      {
        description: "Debe usar .push(6)",
        test: (output, code) => /numeros\.push\(6\)/.test(code)
      },
      {
        description: "Array 'colores' debe tener 3 elementos",
        test: (output, code) => /const\s+colores\s*=\s*\[[^[\]]*,\s*[^[\]]*,\s*[^[\]]*\]/.test(code)
      },
      {
        description: "'cantidad' debe usar .length",
        test: (output, code) => /const\s+cantidad\s*=\s*colores\.length/.test(code)
      },
      {
        description: "Debe usar console.log()",
        test: (output, code) => (code.match(/console\.log\(/g) || []).length >= 3
      }
    ]
  },
  {
    id: 4,
    title: "Template Literals (Template Strings)",
    description: "Aprende a crear strings dinámicos con template literals",
    explanation: `Los template literals son una forma moderna de crear strings que pueden incluir variables y expresiones.

## Sintaxis

Usa comillas invertidas (\\\`) en lugar de comillas normales:

\`\`\`javascript
const nombre = "Ana";
const mensaje = \\\`Hola \${nombre}\\\`;  // "Hola Ana"
\`\`\`

## Ventajas

- Interpolación de variables con \${variable}
- Strings multilínea
- Expresiones dentro del string

## Ejemplos

\`\`\`javascript
const edad = 25;
const info = \\\`Tengo \${edad} años\\\`;

// Expresiones
const precio = 100;
const total = \\\`Total: $\${precio * 1.16}\\\`;  // Con IVA

// Multilínea
const parrafo = \\\`
  Primera línea
  Segunda línea
\\\`;
\`\`\``,
    codeExamples: [
      {
        title: "Template literals en acción",
        code: `// Interpolación básica
const nombre = "Juan";
const edad = 30;
const presentacion = \`Me llamo \${nombre} y tengo \${edad} años\`;

// Con expresiones
const precio = 50;
const cantidad = 3;
const mensaje = \`Total a pagar: $\${precio * cantidad}\`;

// Multilínea
const html = \`
  <div>
    <h1>\${nombre}</h1>
    <p>Edad: \${edad}</p>
  </div>
\`;

console.log(presentacion);
console.log(mensaje);`
      }
    ],
    objectives: [
      "Crea variables 'nombre' y 'edad' con tus datos",
      "Crea un template literal 'presentacion' que diga 'Hola, soy [nombre] y tengo [edad] años'",
      "Crea variables 'precio' (100) y 'cantidad' (5)",
      "Crea un template literal 'total' que calcule precio * cantidad",
      "Imprime 'presentacion' y 'total' con console.log()"
    ],
    hints: [
      "Template literals usan comillas invertidas: `texto`",
      "Para interpolar usa ${variable}",
      "Puedes poner expresiones: ${5 * 10}",
      "Las comillas invertidas están en la tecla del acento grave",
      "No olvides declarar variables con const o let"
    ],
    solutions: [
      `const nombre = "Juan";\nconst edad = 25;`,
      `const presentacion = \`Hola, soy \${nombre} y tengo \${edad} años\`;`,
      `const precio = 100;\nconst cantidad = 5;`,
      `const total = \`Total: $\${precio * cantidad}\`;`,
      `console.log(presentacion);\nconsole.log(total);`
    ],
    initialCode: `// Usa template literals\n`,
    testCases: [
      {
        description: "Variables 'nombre' y 'edad' deben existir",
        test: (output, code) => /(const|let)\s+nombre\s*=/.test(code) && /(const|let)\s+edad\s*=/.test(code)
      },
      {
        description: "'presentacion' debe usar template literal con ${}",
        test: (output, code) => /presentacion\s*=\s*`[^`]*\$\{nombre\}[^`]*\$\{edad\}/.test(code)
      },
      {
        description: "Variables 'precio' y 'cantidad' deben existir",
        test: (output, code) => /(const|let)\s+precio\s*=\s*100/.test(code) && /(const|let)\s+cantidad\s*=\s*5/.test(code)
      },
      {
        description: "'total' debe calcular precio * cantidad en template literal",
        test: (output, code) => /total\s*=\s*`[^`]*\$\{[^}]*precio\s*\*\s*cantidad[^}]*\}/.test(code)
      },
      {
        description: "Debe usar console.log()",
        test: (output, code) => (code.match(/console\.log\(/g) || []).length >= 2
      }
    ]
  },
  {
    id: 5,
    title: "Condicionales (if/else)",
    description: "Aprende a controlar el flujo de tu programa con condicionales",
    explanation: `Las estructuras condicionales te permiten ejecutar código diferente según condiciones.

## Sintaxis

\`\`\`javascript
if (condicion) {
  // código si es verdadero
} else if (otraCondicion) {
  // código si la segunda es verdadera
} else {
  // código si ninguna es verdadera
}
\`\`\`

## Operadores de Comparación

- **===** : Igual estricto (valor y tipo)
- **!==** : Diferente estricto
- **>** : Mayor que
- **<** : Menor que
- **>=** : Mayor o igual
- **<=** : Menor o igual

## Operadores Lógicos

- **&&** : AND (y)
- **||** : OR (o)
- **!** : NOT (no)

## == vs ===

Siempre usa **===** (comparación estricta):
- **==** hace conversión de tipos (evítalo)
- **===** compara valor y tipo`,
    codeExamples: [
      {
        title: "Condicionales en JavaScript",
        code: `// Condicional simple
const edad = 18;
if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}

// Múltiples condiciones
const nota = 85;
if (nota >= 90) {
  console.log("Excelente");
} else if (nota >= 70) {
  console.log("Aprobado");
} else {
  console.log("Reprobado");
}

// Operadores lógicos
const temperatura = 25;
if (temperatura > 20 && temperatura < 30) {
  console.log("Clima agradable");
}`
      }
    ],
    objectives: [
      "Crea una variable 'edad' con un número",
      "Escribe un if que imprima 'Mayor de edad' si edad >= 18, sino 'Menor de edad'",
      "Crea una variable 'nota' con un número del 0 al 100",
      "Usa if/else if/else para imprimir 'Excelente' (>=90), 'Aprobado' (>=60) o 'Reprobado'",
      "Crea 'temperatura' y usa && para verificar si está entre 15 y 25 grados"
    ],
    hints: [
      "La condición va entre paréntesis: if (condicion)",
      "El código va entre llaves: { código }",
      "Usa >= para mayor o igual",
      "El operador && significa 'y': condicion1 && condicion2",
      "No olvides los punto y coma al final de las líneas"
    ],
    solutions: [
      `const edad = 20;`,
      `if (edad >= 18) {\n  console.log("Mayor de edad");\n} else {\n  console.log("Menor de edad");\n}`,
      `const nota = 85;`,
      `if (nota >= 90) {\n  console.log("Excelente");\n} else if (nota >= 60) {\n  console.log("Aprobado");\n} else {\n  console.log("Reprobado");\n}`,
      `const temperatura = 20;\nif (temperatura >= 15 && temperatura <= 25) {\n  console.log("Clima agradable");\n}`
    ],
    initialCode: `// Usa condicionales\n`,
    testCases: [
      {
        description: "Variable 'edad' debe existir",
        test: (output, code) => /(const|let)\s+edad\s*=\s*\d+/.test(code)
      },
      {
        description: "Debe usar if/else con edad >= 18",
        test: (output, code) => /if\s*\(\s*edad\s*>=\s*18\s*\)/.test(code) && /else/.test(code)
      },
      {
        description: "Variable 'nota' debe existir",
        test: (output, code) => /(const|let)\s+nota\s*=\s*\d+/.test(code)
      },
      {
        description: "Debe usar if/else if/else con nota",
        test: (output, code) => /if\s*\(\s*nota\s*>=\s*90\s*\)/.test(code) && /else\s+if/.test(code) && /else/.test(code)
      },
      {
        description: "Debe usar && para verificar rango de temperatura",
        test: (output, code) => /temperatura/.test(code) && /&&/.test(code)
      }
    ]
  },
  {
    id: 6,
    title: "Bucles (for, while, forEach)",
    description: "Aprende a iterar y repetir código con bucles",
    explanation: `Los bucles te permiten ejecutar código repetidamente. JavaScript tiene varios tipos de bucles.

## Bucle for

El bucle más usado para iterar un número específico de veces:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Bucle while

Se ejecuta mientras la condición sea verdadera:

\`\`\`javascript
let contador = 0;
while (contador < 5) {
  console.log(contador);
  contador++;
}
\`\`\`

## forEach (para arrays)

Itera sobre cada elemento de un array:

\`\`\`javascript
const frutas = ["manzana", "banana", "naranja"];
frutas.forEach(fruta => {
  console.log(fruta);
});
\`\`\`

## for...of

Sintaxis moderna para iterar arrays:

\`\`\`javascript
for (const fruta of frutas) {
  console.log(fruta);
}
\`\`\``,
    codeExamples: [
      {
        title: "Bucles en JavaScript",
        code: `// For tradicional
for (let i = 1; i <= 5; i++) {
  console.log(\`Número: \${i}\`);
}

// While
let contador = 0;
while (contador < 3) {
  console.log(\`Contador: \${contador}\`);
  contador++;
}

// forEach con array
const nombres = ["Ana", "Juan", "Pedro"];
nombres.forEach(nombre => {
  console.log(\`Hola \${nombre}\`);
});

// for...of
for (const nombre of nombres) {
  console.log(nombre);
}

// Suma acumulativa
let suma = 0;
for (let i = 1; i <= 10; i++) {
  suma += i;
}
console.log(\`Suma: \${suma}\`);`
      }
    ],
    objectives: [
      "Usa un for para imprimir los números del 1 al 10",
      "Crea un array 'nombres' con 3 nombres y usa forEach para imprimir cada uno",
      "Usa un while para hacer countdown del 5 al 1",
      "Calcula la suma de los números del 1 al 100 usando un for",
      "Imprime el resultado de la suma"
    ],
    hints: [
      "For: for (let i = 1; i <= 10; i++)",
      "forEach: array.forEach(elemento => { código })",
      "While: while (condicion) { código; contador--; }",
      "Para sumar: suma += i;",
      "i++ incrementa i en 1"
    ],
    solutions: [
      `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}`,
      `const nombres = ["Ana", "Juan", "Pedro"];\nnombres.forEach(nombre => {\n  console.log(nombre);\n});`,
      `let contador = 5;\nwhile (contador >= 1) {\n  console.log(contador);\n  contador--;\n}`,
      `let suma = 0;\nfor (let i = 1; i <= 100; i++) {\n  suma += i;\n}`,
      `console.log(suma);`
    ],
    initialCode: `// Practica con bucles\n`,
    testCases: [
      {
        description: "Debe usar for para imprimir del 1 al 10",
        test: (output, code) => /for\s*\([^)]*i\s*=\s*1[^)]*i\s*<=\s*10[^)]*i\+\+/.test(code)
      },
      {
        description: "Debe crear array 'nombres' y usar forEach",
        test: (output, code) => /const\s+nombres\s*=\s*\[/.test(code) && /nombres\.forEach/.test(code)
      },
      {
        description: "Debe usar while para countdown",
        test: (output, code) => /while/.test(code) && /contador--/.test(code)
      },
      {
        description: "Debe calcular suma con for del 1 al 100",
        test: (output, code) => /let\s+suma\s*=\s*0/.test(code) && /for\s*\([^)]*i\s*=\s*1[^)]*i\s*<=\s*100/.test(code) && /suma\s*\+=/.test(code)
      },
      {
        description: "Debe imprimir la suma",
        test: (output, code) => /console\.log\(suma\)/.test(code)
      }
    ]
  }
];

export function getJavaScriptLessonById(id: number): JavaScriptLesson | undefined {
  return javascriptLessons.find(lesson => lesson.id === id);
}

