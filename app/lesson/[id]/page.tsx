import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SQLEditor from "@/components/sql-editor";
import { getLessonById, lessons } from "@/lib/lessons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import AnimatedSQLExample from "@/components/animated-sql-example";

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    id: lesson.id.toString(),
  }));
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const lessonId = parseInt(params.id);
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  const prevLesson = getLessonById(lessonId - 1);
  const nextLesson = getLessonById(lessonId + 1);
  const progress = (lessonId / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeAcademy Español
                </h1>
              </div>
            </Link>
            <div className="flex-1 max-w-md mx-8">
              <div className="text-sm text-gray-600 mb-1">
                Progreso: Lección {lessonId} de {lessons.length}
              </div>
              <Progress value={progress} />
            </div>
            <Link href="/">
              <Button variant="outline">Ver todas las lecciones</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Lesson Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">{lesson.title}</h1>
            <p className="text-xl text-gray-600">{lesson.description}</p>
          </div>

          {/* Explicación teórica */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">📚 Teoría y Conceptos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-base max-w-none">
              <ReactMarkdown
                components={{
                  code: ({ node, className, children, ...props }: any) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-gray-900">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-6 text-gray-800">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-800">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 space-y-2">{children}</ul>,
                  li: ({ children }) => <li className="text-gray-700 ml-4">{children}</li>,
                  table: ({ children }) => (
                    <div className="my-6 overflow-hidden rounded-lg border-2 border-blue-200">
                      <table className="w-full">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-blue-50 border-b-2 border-blue-200">{children}</thead>,
                  th: ({ children }) => (
                    <th className="px-4 py-3 text-left font-bold text-sm text-blue-900 uppercase tracking-wide">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => <td className="px-4 py-3 text-sm text-gray-800">{children}</td>,
                  tr: ({ children, ...props }: any) => {
                    const isBody = props.node?.position?.start?.line > 2;
                    return (
                      <tr className={isBody ? "border-b border-gray-200 even:bg-gray-50/50 odd:bg-white" : ""}>
                        {children}
                      </tr>
                    );
                  },
                  // Renderizar HTML directo para tablas inline
                  div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
                }}
              >
                {lesson.explanation}
              </ReactMarkdown>
            </CardContent>
          </Card>

          {/* Ejemplo animado - Ancho completo */}
          {lesson.animatedExamples && lesson.animatedExamples.length > 0 && (
            <div className="mb-8">
              <AnimatedSQLExample examples={lesson.animatedExamples} />
            </div>
          )}

          {/* Contexto práctico */}
          {lesson.practiceContext && (
            <Card className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
              <CardContent className="pt-6 prose prose-base max-w-none">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 text-purple-900 flex items-center gap-2">{children}</h2>,
                    p: ({ children }) => <p className="mb-3 text-gray-800 leading-relaxed text-base">{children}</p>,
                    ul: ({ children }) => <ul className="mb-4 space-y-2 ml-4">{children}</ul>,
                    li: ({ children }) => <li className="text-gray-800">{children}</li>,
                  }}
                >
                  {lesson.practiceContext}
                </ReactMarkdown>
              </CardContent>
            </Card>
          )}

          {/* Instrucciones detalladas del ejercicio */}
          <Card className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                🚀 ¡Ahora es tu turno!
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lesson.practiceInstructions && (
                <div className="mb-6 prose prose-base max-w-none">
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => <h2 className="text-xl font-bold mb-3 text-green-900">{children}</h2>,
                      p: ({ children }) => <p className="mb-3 text-gray-800 leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="mb-4 space-y-2 ml-4">{children}</ul>,
                      ol: ({ children }) => <ol className="mb-4 space-y-2 ml-4 list-decimal">{children}</ol>,
                      li: ({ children }) => <li className="text-gray-800">{children}</li>,
                      strong: ({ children }) => <strong className="font-bold text-green-900">{children}</strong>,
                      code: ({ children }) => (
                        <code className="bg-green-100 px-2 py-1 rounded text-sm font-mono text-green-800">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {lesson.practiceInstructions}
                  </ReactMarkdown>
                </div>
              )}

              {/* Pistas colapsables */}
              {lesson.hints.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                    💡 Pistas adicionales
                  </div>
                  <ul className="space-y-1">
                    {lesson.hints.map((hint, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-600">•</span>
                        <span className="text-gray-700">{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Editor interactivo - Ancho completo */}
          <div className="mb-8">
            <SQLEditor
              initialQuery={lesson.initialQuery}
              objectives={lesson.objectives}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            {prevLesson ? (
              <Link href={`/lesson/${prevLesson.id}`}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Lección anterior
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link href={`/lesson/${nextLesson.id}`}>
                <Button size="lg">
                  Siguiente lección
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/">
                <Button size="lg">
                  ¡Completado! 🎉
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

