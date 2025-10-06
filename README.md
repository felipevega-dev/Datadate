# SQLBolt Español - Plataforma de Aprendizaje Interactivo

Plataforma de aprendizaje interactivo de SQL en español, inspirada en sqlbolt.com, con ejercicios progresivos y resultados en tiempo real.

## 🚀 Tecnologías

- **Frontend**: Next.js 15 + React 19
- **Estilos**: TailwindCSS + ShadCN UI
- **Editor**: Monaco Editor (el mismo de VS Code)
- **Base de datos**: SQLite en memoria (better-sqlite3)
- **TypeScript**: Tipado completo

## 📦 Instalación

1. Instala las dependencias necesarias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## ✨ Características

### Implementadas en MVP:
- ✅ Editor SQL con syntax highlighting
- ✅ Ejecución de queries en tiempo real (sin botones)
- ✅ Validación automática de objetivos
- ✅ 5 lecciones progresivas (SELECT, WHERE, ORDER BY, LIMIT)
- ✅ Tabla de resultados interactiva
- ✅ Sistema de progreso visual
- ✅ Base de datos SQLite en memoria con datos precargados
- ✅ Interfaz moderna y responsive

### Próximas funcionalidades:
- 🔲 Sistema de guardado de progreso (localStorage → Firebase)
- 🔲 Más lecciones (JOINs, GROUP BY, funciones agregadas)
- 🔲 Sistema de logros y gamificación
- 🔲 Modo oscuro
- 🔲 Más lenguajes (Python, JavaScript, CSS)

## 📚 Estructura del proyecto

```
├── app/
│   ├── api/execute-sql/      # API Route para ejecutar SQL
│   ├── lesson/[id]/          # Páginas dinámicas de lecciones
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Página de inicio
│   └── globals.css           # Estilos globales
├── components/
│   ├── ui/                   # Componentes ShadCN UI
│   └── sql-editor.tsx        # Editor SQL interactivo
├── lib/
│   ├── database.ts           # Lógica de SQLite
│   ├── lessons.ts            # Definición de lecciones
│   └── utils.ts              # Utilidades
└── package.json
```

## 🎯 Roadmap

### Fase 1: MVP ✅ (Completada)
- Setup inicial del proyecto
- Primera lección interactiva
- Sistema de validación básico

### Fase 2: Contenido (En progreso)
- Agregar lecciones 6-15
- JOINs, subconsultas, funciones agregadas
- Ejercicios más complejos

### Fase 3: Gamificación
- Sistema de puntos y logros
- Guardar progreso en Firebase
- Perfiles de usuario

### Fase 4: Expansión
- Python interactivo
- JavaScript/TypeScript
- CSS/HTML

## 🛠️ Comandos útiles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar linter
```

## 📝 Notas técnicas

- **SQLite en memoria**: La base de datos se crea en memoria al iniciar el servidor, por lo que los datos se resetean en cada reinicio (perfecto para un entorno de aprendizaje)
- **API Routes**: Next.js API Routes maneja la ejecución de queries SQL de forma segura
- **Validación**: Solo se permiten queries SELECT para prevenir modificaciones accidentales
- **Tiempo real**: Usa debouncing (500ms) para actualizar resultados mientras escribes

## 🤝 Contribuir

Este es un proyecto en desarrollo activo. Ideas y sugerencias son bienvenidas.

## 📄 Licencia

MIT - Libre para uso educativo y comercial.

