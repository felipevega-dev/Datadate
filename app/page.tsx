import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "@/lib/lessons";
import { Database, Code2, Palette, Coffee, Zap, BookOpen, Target, Users, Globe } from "lucide-react";

export default function Home() {
  const technologies = [
    {
      name: "SQL",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      status: "Disponible",
      lessons: lessons.length,
      description: "Bases de datos relacionales",
    },
    {
      name: "Python",
      icon: Code2,
      color: "from-yellow-500 to-blue-500",
      status: "Próximamente",
      lessons: 0,
      description: "Programación backend",
    },
    {
      name: "JavaScript",
      icon: Coffee,
      color: "from-yellow-400 to-orange-500",
      status: "Próximamente",
      lessons: 0,
      description: "Desarrollo web moderno",
    },
    {
      name: "CSS",
      icon: Palette,
      color: "from-pink-500 to-purple-500",
      status: "Próximamente",
      lessons: 0,
      description: "Diseño y estilos",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Aprendizaje Interactivo",
      description: "Escribe código y ve los resultados en tiempo real, sin esperas.",
    },
    {
      icon: Target,
      title: "Ejercicios Prácticos",
      description: "Aprende haciendo. Cada lección incluye ejercicios del mundo real.",
    },
    {
      icon: BookOpen,
      title: "Desde Cero a Experto",
      description: "Cursos diseñados para llevarte desde lo básico hasta nivel avanzado.",
    },
    {
      icon: Globe,
      title: "100% en Español",
      description: "Contenido de calidad en tu idioma, hecho para hispanohablantes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeAcademy Español
                </h1>
                <p className="text-xs text-gray-500">Aprende a programar de forma interactiva</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Button variant="ghost">Lecciones</Button>
              <Button variant="ghost">Progreso</Button>
              <Button variant="outline">Iniciar Sesión</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            🎉 Plataforma gratuita y de código abierto
          </div>
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Aprende a programar desde cero
          </h2>
          <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
            La mejor plataforma en español para aprender SQL, Python, JavaScript y más.
            <br />
            <span className="font-semibold text-gray-800">100% práctica, 100% gratuita, 100% efectiva.</span>
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Link href="/lesson/1">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Database className="mr-2" />
                Comenzar con SQL
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Ver todas las lecciones
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{lessons.length}+</div>
              <div className="text-gray-600 mt-1">Lecciones SQL</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">4</div>
              <div className="text-gray-600 mt-1">Lenguajes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600">100%</div>
              <div className="text-gray-600 mt-1">Gratuito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">¿Qué puedes aprender?</h3>
          <p className="text-xl text-gray-600">Domina los lenguajes más demandados del mercado laboral</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <Card 
                key={tech.name} 
                className={`hover:shadow-2xl transition-all duration-300 border-2 ${
                  tech.status === "Disponible" 
                    ? "hover:scale-105 cursor-pointer border-blue-200" 
                    : "opacity-70 border-gray-200"
                }`}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-4 mb-4 mx-auto`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-2xl text-center">{tech.name}</CardTitle>
                  <CardDescription className="text-center">{tech.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {tech.status === "Disponible" ? (
                    <>
                      <div className="text-3xl font-bold text-blue-600 mb-2">{tech.lessons}</div>
                      <div className="text-sm text-gray-600 mb-4">lecciones disponibles</div>
                      <Link href="/lesson/1">
                        <Button className="w-full">
                          Empezar ahora →
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="py-4">
                      <div className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                        Próximamente
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">¿Por qué CodeAcademy Español?</h3>
          <p className="text-xl text-gray-600">Una forma revolucionaria de aprender a programar</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SQL Lessons Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">Lecciones de SQL disponibles</h3>
          <p className="text-xl text-gray-600">Comienza tu viaje desde lo más básico hasta consultas avanzadas</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {lessons.slice(0, 6).map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg">
                    {lesson.id}
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {lesson.title.replace(`Lección ${lesson.id}: `, "")}
                  </CardTitle>
                </div>
                <CardDescription className="text-base">{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/lesson/${lesson.id}`}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Comenzar lección →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/lesson/1">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Ver todas las {lessons.length} lecciones
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-5xl font-bold mb-6">¿Listo para comenzar?</h3>
          <p className="text-2xl mb-8 opacity-90">
            Únete a miles de personas que están aprendiendo a programar en español
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/lesson/1">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Database className="mr-2" />
                Empezar gratis ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-900 text-gray-300 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-6 h-6 text-blue-400" />
                <h4 className="font-bold text-white text-lg">CodeAcademy</h4>
              </div>
              <p className="text-sm text-gray-400">
                La mejor plataforma de aprendizaje interactivo de programación en español.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Lenguajes</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/lesson/1" className="hover:text-blue-400 transition-colors">SQL</Link></li>
                <li className="text-gray-500">Python (próximamente)</li>
                <li className="text-gray-500">JavaScript (próximamente)</li>
                <li className="text-gray-500">CSS (próximamente)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Comunidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Términos de uso</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 CodeAcademy Español - Aprende a programar de forma interactiva y gratuita</p>
            <p className="mt-2">Hecho con ❤️ para la comunidad hispanohablante</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
