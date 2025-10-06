export interface PythonLesson {
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

export const pythonLessons: PythonLesson[] = [
  {
    id: 1,
    title: "Variables y Tipos de Datos",
    description: "Aprende a declarar variables y trabajar con tipos de datos básicos en Python",
    explanation: `Python es un lenguaje de programación de alto nivel, interpretado y de tipado dinámico. Esto significa que no necesitas declarar el tipo de una variable explícitamente.

## Variables en Python

Una variable es un nombre que se refiere a un valor almacenado en memoria. En Python, puedes crear una variable simplemente asignándole un valor con el operador \`=\`.

## Tipos de Datos Básicos

Python tiene varios tipos de datos básicos:

- **int**: Números enteros (ej: 42, -10, 0)
- **float**: Números decimales (ej: 3.14, -0.5, 2.0)
- **str**: Cadenas de texto (ej: "Hola", 'Python')
- **bool**: Valores booleanos (True o False)

## Convenciones de Nombres

- Usa snake_case para nombres de variables (ej: mi_variable)
- Los nombres deben ser descriptivos
- Evita usar palabras reservadas de Python`,
    codeExamples: [
      {
        title: "Declaración de variables",
        code: `# Variables numéricas
edad = 25
altura = 1.75
temperatura = -5.2

# Variables de texto
nombre = "Juan"
apellido = 'Pérez'

# Variables booleanas
es_estudiante = True
tiene_empleo = False

# Python detecta automáticamente el tipo
print(type(edad))      # <class 'int'>
print(type(altura))    # <class 'float'>
print(type(nombre))    # <class 'str'>`
      }
    ],
    objectives: [
      "Crea una variable llamada 'nombre' con tu nombre como string",
      "Crea una variable llamada 'edad' con un número entero",
      "Crea una variable llamada 'altura' con un número decimal",
      "Crea una variable llamada 'es_mayor_de_edad' con un valor booleano",
      "Imprime todas las variables usando print()"
    ],
    hints: [
      "Para crear un string, encierra el texto entre comillas: 'texto' o \"texto\"",
      "Los números enteros no llevan comillas: edad = 25",
      "Los números decimales usan punto: altura = 1.75",
      "Los booleanos en Python son True y False (con mayúscula inicial)",
      "Para imprimir, usa: print(variable)"
    ],
    solutions: [
      `nombre = "Juan"`,
      `edad = 25`,
      `altura = 1.75`,
      `es_mayor_de_edad = True`,
      `print(nombre)\nprint(edad)\nprint(altura)\nprint(es_mayor_de_edad)`
    ],
    initialCode: `# Escribe tu código aquí\n`,
    testCases: [
      {
        description: "Variable 'nombre' debe ser un string",
        test: (output, code) => /nombre\s*=\s*["'][^"']+["']/.test(code)
      },
      {
        description: "Variable 'edad' debe ser un entero",
        test: (output, code) => /edad\s*=\s*\d+(?!\.)/.test(code)
      },
      {
        description: "Variable 'altura' debe ser un decimal",
        test: (output, code) => /altura\s*=\s*\d+\.\d+/.test(code)
      },
      {
        description: "Variable 'es_mayor_de_edad' debe ser booleano",
        test: (output, code) => /es_mayor_de_edad\s*=\s*(True|False)/.test(code)
      },
      {
        description: "Debe imprimir todas las variables",
        test: (output, code) => {
          const prints = (code.match(/print\(/g) || []).length;
          return prints >= 4;
        }
      }
    ]
  },
  {
    id: 2,
    title: "Operaciones Matemáticas",
    description: "Realiza cálculos y operaciones aritméticas en Python",
    explanation: `Python puede funcionar como una poderosa calculadora. Soporta todas las operaciones matemáticas básicas y algunas avanzadas.

## Operadores Aritméticos

Python proporciona los siguientes operadores:

- **+** : Suma
- **-** : Resta
- **\\*** : Multiplicación
- **/** : División (resultado decimal)
- **//** : División entera (resultado sin decimales)
- **%** : Módulo (resto de la división)
- **\\*\\*** : Potencia

## Orden de Operaciones

Python sigue el orden matemático estándar (PEMDAS):
1. Paréntesis
2. Exponentes
3. Multiplicación y División
4. Suma y Resta`,
    codeExamples: [
      {
        title: "Operaciones básicas",
        code: `# Operaciones básicas
suma = 10 + 5        # 15
resta = 10 - 5       # 5
multiplicacion = 10 * 5   # 50
division = 10 / 3    # 3.333...
division_entera = 10 // 3  # 3
modulo = 10 % 3      # 1
potencia = 2 ** 3    # 8

# Operaciones combinadas
resultado = (10 + 5) * 2  # 30
promedio = (8 + 9 + 10) / 3  # 9.0`
      }
    ],
    objectives: [
      "Calcula la suma de 25 y 37, guárdala en una variable 'suma'",
      "Calcula el producto de 12 y 8, guárdalo en 'producto'",
      "Calcula 2 elevado a la 10, guárdalo en 'potencia'",
      "Calcula el resto de dividir 17 entre 5, guárdalo en 'resto'",
      "Imprime todos los resultados"
    ],
    hints: [
      "Para sumar usa el operador +",
      "Para multiplicar usa el operador *",
      "Para potencia usa el operador **",
      "Para el resto (módulo) usa el operador %",
      "Recuerda imprimir cada variable con print()"
    ],
    solutions: [
      `suma = 25 + 37`,
      `producto = 12 * 8`,
      `potencia = 2 ** 10`,
      `resto = 17 % 5`,
      `print(suma)\nprint(producto)\nprint(potencia)\nprint(resto)`
    ],
    initialCode: `# Realiza las operaciones matemáticas\n`,
    testCases: [
      {
        description: "Variable 'suma' debe ser 62",
        test: (output, code) => /suma\s*=\s*25\s*\+\s*37|suma\s*=\s*62/.test(code)
      },
      {
        description: "Variable 'producto' debe ser 96",
        test: (output, code) => /producto\s*=\s*12\s*\*\s*8|producto\s*=\s*96/.test(code)
      },
      {
        description: "Variable 'potencia' debe ser 1024",
        test: (output, code) => /potencia\s*=\s*2\s*\*\*\s*10|potencia\s*=\s*1024/.test(code)
      },
      {
        description: "Variable 'resto' debe ser 2",
        test: (output, code) => /resto\s*=\s*17\s*%\s*5|resto\s*=\s*2/.test(code)
      },
      {
        description: "Debe imprimir todos los resultados",
        test: (output, code) => (code.match(/print\(/g) || []).length >= 4
      }
    ]
  },
  {
    id: 3,
    title: "Strings y Concatenación",
    description: "Trabaja con cadenas de texto y aprende a manipularlas",
    explanation: `Los strings (cadenas de texto) son uno de los tipos de datos más utilizados en Python. Puedes combinarlos, modificarlos y extraer información de ellos.

## Concatenación

Puedes unir strings usando el operador **+**:

\`\`\`python
saludo = "Hola" + " " + "Mundo"  # "Hola Mundo"
\`\`\`

## f-strings (Template Strings)

La forma moderna y recomendada de combinar strings con variables:

\`\`\`python
nombre = "Ana"
edad = 25
mensaje = f"Me llamo {nombre} y tengo {edad} años"
\`\`\`

## Métodos de Strings

Los strings tienen métodos útiles:
- **.upper()** - Convierte a mayúsculas
- **.lower()** - Convierte a minúsculas
- **.strip()** - Elimina espacios al inicio y final
- **.replace(viejo, nuevo)** - Reemplaza texto`,
    codeExamples: [
      {
        title: "Trabajando con strings",
        code: `# Concatenación básica
nombre = "Juan"
apellido = "Pérez"
nombre_completo = nombre + " " + apellido

# f-strings (recomendado)
edad = 30
presentacion = f"Hola, soy {nombre} y tengo {edad} años"

# Métodos de strings
texto = "  python es genial  "
limpio = texto.strip()           # "python es genial"
mayusculas = texto.upper()       # "PYTHON ES GENIAL"
reemplazo = texto.replace("genial", "increíble")

# Multiplicación de strings
separador = "-" * 20  # "--------------------"`
      }
    ],
    objectives: [
      "Crea variables 'nombre' y 'apellido' con tu nombre completo",
      "Crea 'nombre_completo' concatenando nombre y apellido con un espacio",
      "Crea 'edad' con tu edad y un mensaje de presentación usando f-string",
      "Convierte 'nombre_completo' a mayúsculas y guárdalo en 'nombre_mayusculas'",
      "Imprime 'nombre_completo', 'mensaje' y 'nombre_mayusculas'"
    ],
    hints: [
      "Para concatenar usa +: nombre + ' ' + apellido",
      "Para f-strings usa: f'Texto {variable}'",
      "El método .upper() convierte a mayúsculas",
      "Recuerda que los f-strings llevan una 'f' antes de las comillas",
      "No olvides imprimir los resultados"
    ],
    solutions: [
      `nombre = "Juan"\napellido = "Pérez"`,
      `nombre_completo = nombre + " " + apellido`,
      `edad = 25\nmensaje = f"Tengo {edad} años"`,
      `nombre_mayusculas = nombre_completo.upper()`,
      `print(nombre_completo)\nprint(mensaje)\nprint(nombre_mayusculas)`
    ],
    initialCode: `# Trabaja con strings\n`,
    testCases: [
      {
        description: "Variables 'nombre' y 'apellido' deben existir",
        test: (output, code) => /nombre\s*=/.test(code) && /apellido\s*=/.test(code)
      },
      {
        description: "'nombre_completo' debe concatenar nombre y apellido",
        test: (output, code) => /nombre_completo\s*=\s*nombre\s*\+.*\+\s*apellido|nombre_completo\s*=\s*f["'].*{nombre}.*{apellido}/.test(code)
      },
      {
        description: "Debe usar f-string con la variable edad",
        test: (output, code) => /f["'].*{.*edad.*}/.test(code)
      },
      {
        description: "'nombre_mayusculas' debe usar .upper()",
        test: (output, code) => /nombre_mayusculas\s*=.*\.upper\(\)/.test(code)
      },
      {
        description: "Debe imprimir los resultados",
        test: (output, code) => (code.match(/print\(/g) || []).length >= 3
      }
    ]
  },
  {
    id: 4,
    title: "Listas (Arrays)",
    description: "Aprende a trabajar con listas, la estructura de datos más versátil de Python",
    explanation: `Las listas son colecciones ordenadas y modificables de elementos. Pueden contener cualquier tipo de dato e incluso mezclarlos.

## Crear Listas

\`\`\`python
# Lista vacía
lista_vacia = []

# Lista con elementos
numeros = [1, 2, 3, 4, 5]
nombres = ["Ana", "Juan", "Pedro"]
mixta = [1, "texto", True, 3.14]
\`\`\`

## Acceder a Elementos

Los índices empiezan en 0:

\`\`\`python
frutas = ["manzana", "banana", "naranja"]
print(frutas[0])   # "manzana"
print(frutas[-1])  # "naranja" (último elemento)
\`\`\`

## Métodos de Listas

- **.append(elemento)** - Agrega al final
- **.insert(indice, elemento)** - Inserta en posición
- **.remove(elemento)** - Elimina elemento
- **.pop()** - Elimina y retorna último elemento
- **len(lista)** - Retorna la longitud`,
    codeExamples: [
      {
        title: "Trabajando con listas",
        code: `# Crear y manipular listas
frutas = ["manzana", "banana", "naranja"]

# Agregar elementos
frutas.append("uva")       # ["manzana", "banana", "naranja", "uva"]
frutas.insert(1, "pera")   # Inserta en posición 1

# Acceder a elementos
primera = frutas[0]        # "manzana"
ultima = frutas[-1]        # última fruta

# Longitud de la lista
cantidad = len(frutas)     # 5

# Eliminar elementos
frutas.remove("banana")    # Elimina "banana"
eliminado = frutas.pop()   # Elimina y retorna último`
      }
    ],
    objectives: [
      "Crea una lista 'numeros' con los números del 1 al 5",
      "Agrega el número 6 al final de la lista usando .append()",
      "Crea una lista 'colores' con 3 colores que te gusten",
      "Calcula la longitud de 'colores' y guárdala en 'cantidad_colores'",
      "Imprime ambas listas y la cantidad de colores"
    ],
    hints: [
      "Para crear lista usa corchetes: [1, 2, 3]",
      "El método .append() agrega al final: lista.append(elemento)",
      "len() retorna el número de elementos: len(lista)",
      "Los strings en listas van entre comillas",
      "Imprime cada resultado con print()"
    ],
    solutions: [
      `numeros = [1, 2, 3, 4, 5]`,
      `numeros.append(6)`,
      `colores = ["rojo", "azul", "verde"]`,
      `cantidad_colores = len(colores)`,
      `print(numeros)\nprint(colores)\nprint(cantidad_colores)`
    ],
    initialCode: `# Trabaja con listas\n`,
    testCases: [
      {
        description: "Lista 'numeros' debe contener [1, 2, 3, 4, 5]",
        test: (output, code) => /numeros\s*=\s*\[1,\s*2,\s*3,\s*4,\s*5\]/.test(code)
      },
      {
        description: "Debe usar .append(6) en la lista",
        test: (output, code) => /numeros\.append\(6\)/.test(code)
      },
      {
        description: "Lista 'colores' debe tener 3 elementos",
        test: (output, code) => /colores\s*=\s*\[[^[\]]*,\s*[^[\]]*,\s*[^[\]]*\]/.test(code)
      },
      {
        description: "'cantidad_colores' debe usar len()",
        test: (output, code) => /cantidad_colores\s*=\s*len\(colores\)/.test(code)
      },
      {
        description: "Debe imprimir los resultados",
        test: (output, code) => (code.match(/print\(/g) || []).length >= 3
      }
    ]
  },
  {
    id: 5,
    title: "Condicionales (if/elif/else)",
    description: "Aprende a tomar decisiones en tu código con estructuras condicionales",
    explanation: `Las estructuras condicionales te permiten ejecutar código diferente según ciertas condiciones.

## Sintaxis Básica

\`\`\`python
if condicion:
    # código si es verdadero
elif otra_condicion:
    # código si la segunda es verdadera
else:
    # código si ninguna es verdadera
\`\`\`

## Operadores de Comparación

- **==** : Igual a
- **!=** : Diferente de
- **>** : Mayor que
- **<** : Menor que
- **>=** : Mayor o igual
- **<=** : Menor o igual

## Operadores Lógicos

- **and** : Ambas condiciones deben ser verdaderas
- **or** : Al menos una debe ser verdadera
- **not** : Invierte el valor booleano

## Indentación

Python usa indentación (espacios) para definir bloques de código. Es obligatorio usar 4 espacios.`,
    codeExamples: [
      {
        title: "Condicionales en acción",
        code: `# Condicional simple
edad = 18
if edad >= 18:
    print("Eres mayor de edad")
else:
    print("Eres menor de edad")

# Múltiples condiciones
nota = 85
if nota >= 90:
    print("Excelente")
elif nota >= 70:
    print("Aprobado")
else:
    print("Reprobado")

# Operadores lógicos
temperatura = 25
if temperatura > 20 and temperatura < 30:
    print("Clima agradable")`
      }
    ],
    objectives: [
      "Crea una variable 'edad' con un número",
      "Escribe un if que imprima 'Mayor de edad' si edad >= 18, sino 'Menor de edad'",
      "Crea una variable 'nota' con un número del 0 al 100",
      "Usa if/elif/else para imprimir 'Excelente' (>=90), 'Aprobado' (>=60) o 'Reprobado'",
      "Crea 'temperatura' y usa and para verificar si está entre 15 y 25 grados"
    ],
    hints: [
      "La sintaxis es: if condicion: (no olvides los dos puntos)",
      "La indentación es obligatoria (4 espacios)",
      "elif es como 'else if' en otros lenguajes",
      "Para verificar rango: variable >= min and variable <= max",
      "Cada bloque debe tener al menos una línea indentada"
    ],
    solutions: [
      `edad = 20`,
      `if edad >= 18:\n    print("Mayor de edad")\nelse:\n    print("Menor de edad")`,
      `nota = 85`,
      `if nota >= 90:\n    print("Excelente")\nelif nota >= 60:\n    print("Aprobado")\nelse:\n    print("Reprobado")`,
      `temperatura = 20\nif temperatura >= 15 and temperatura <= 25:\n    print("Clima agradable")`
    ],
    initialCode: `# Usa condicionales\n`,
    testCases: [
      {
        description: "Variable 'edad' debe existir",
        test: (output, code) => /edad\s*=\s*\d+/.test(code)
      },
      {
        description: "Debe usar if/else con edad >= 18",
        test: (output, code) => /if\s+edad\s*>=\s*18:/.test(code) && /else:/.test(code)
      },
      {
        description: "Variable 'nota' debe existir",
        test: (output, code) => /nota\s*=\s*\d+/.test(code)
      },
      {
        description: "Debe usar if/elif/else con nota",
        test: (output, code) => /if\s+nota\s*>=\s*90:/.test(code) && /elif/.test(code) && /else:/.test(code)
      },
      {
        description: "Debe usar 'and' para verificar rango de temperatura",
        test: (output, code) => /temperatura/.test(code) && /\s+and\s+/.test(code)
      }
    ]
  },
  {
    id: 6,
    title: "Bucles (for y while)",
    description: "Aprende a repetir código de forma eficiente con bucles",
    explanation: `Los bucles te permiten ejecutar código repetidamente. Python tiene dos tipos principales: **for** y **while**.

## Bucle for

Se usa para iterar sobre secuencias (listas, strings, rangos):

\`\`\`python
# Iterar sobre lista
frutas = ["manzana", "banana", "naranja"]
for fruta in frutas:
    print(fruta)

# Usar range() para números
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)
\`\`\`

## Bucle while

Se ejecuta mientras la condición sea verdadera:

\`\`\`python
contador = 0
while contador < 5:
    print(contador)
    contador += 1  # contador = contador + 1
\`\`\`

## range()

- **range(n)** - Genera números de 0 a n-1
- **range(inicio, fin)** - De inicio a fin-1
- **range(inicio, fin, paso)** - Con saltos`,
    codeExamples: [
      {
        title: "Bucles en acción",
        code: `# For con lista
nombres = ["Ana", "Juan", "Pedro"]
for nombre in nombres:
    print(f"Hola {nombre}")

# For con range
for i in range(1, 6):  # 1, 2, 3, 4, 5
    print(f"Número: {i}")

# While
contador = 0
while contador < 3:
    print(f"Contador: {contador}")
    contador += 1

# For con suma acumulativa
suma = 0
for num in [1, 2, 3, 4, 5]:
    suma += num
print(f"Suma total: {suma}")`
      }
    ],
    objectives: [
      "Usa un for para imprimir los números del 1 al 10 usando range()",
      "Crea una lista 'nombres' con 3 nombres y usa for para imprimir cada uno",
      "Usa un while para imprimir números del 5 al 1 (countdown)",
      "Calcula la suma de los números del 1 al 100 usando un for con range()",
      "Imprime el resultado de la suma"
    ],
    hints: [
      "range(1, 11) genera números del 1 al 10",
      "La sintaxis es: for variable in secuencia:",
      "En while, no olvides modificar el contador",
      "Para countdown: empieza en 5 y resta 1 en cada iteración",
      "Para sumar usa: suma += numero"
    ],
    solutions: [
      `for i in range(1, 11):\n    print(i)`,
      `nombres = ["Ana", "Juan", "Pedro"]\nfor nombre in nombres:\n    print(nombre)`,
      `contador = 5\nwhile contador >= 1:\n    print(contador)\n    contador -= 1`,
      `suma = 0\nfor i in range(1, 101):\n    suma += i`,
      `print(suma)`
    ],
    initialCode: `# Practica con bucles\n`,
    testCases: [
      {
        description: "Debe usar for con range(1, 11)",
        test: (output, code) => /for\s+\w+\s+in\s+range\(1,\s*11\):/.test(code)
      },
      {
        description: "Debe crear lista 'nombres' y usar for",
        test: (output, code) => /nombres\s*=\s*\[/.test(code) && /for\s+\w+\s+in\s+nombres:/.test(code)
      },
      {
        description: "Debe usar while para countdown",
        test: (output, code) => /while/.test(code) && /-=\s*1/.test(code)
      },
      {
        description: "Debe calcular suma con for y range(1, 101)",
        test: (output, code) => /suma\s*=\s*0/.test(code) && /for\s+\w+\s+in\s+range\(1,\s*101\):/.test(code) && /suma\s*\+=/.test(code)
      },
      {
        description: "Debe imprimir la suma",
        test: (output, code) => /print\(suma\)/.test(code)
      }
    ]
  }
];

export function getPythonLessonById(id: number): PythonLesson | undefined {
  return pythonLessons.find(lesson => lesson.id === id);
}

