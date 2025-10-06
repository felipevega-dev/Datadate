import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getJavaScriptLessonById, javascriptLessons } from "@/lib/javascript-lessons";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/navbar";
import JavaScriptEditor from "@/components/javascript-editor";

export function generateStaticParams() {
  return javascriptLessons.map((lesson) => ({
    id: lesson.id.toString(),
  }));
}

export default async function JavaScriptLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessonId = parseInt(id);
  const lesson = getJavaScriptLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  const prevLesson = getJavaScriptLessonById(lessonId - 1);
  const nextLesson = getJavaScriptLessonById(lessonId + 1);
  const progress = (lessonId / javascriptLessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  JavaScript - CodeAcademy
                </h1>
              </div>
            </Link>
            <div className="flex-1 max-w-md mx-8">
              <div className="text-sm text-gray-600 mb-1">
                Progreso: Lección {lessonId} de {javascriptLessons.length}
              </div>
              <Progress value={progress} />
            </div>
            <Link href="/">
              <Button variant="outline">Ver todos los cursos</Button>
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
              <CardTitle className="text-2xl text-blue-900">Teoría y Conceptos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-blue max-w-none">
              <ReactMarkdown>{lesson.explanation}</ReactMarkdown>
            </CardContent>
          </Card>

          {/* Code Examples */}
          {lesson.codeExamples && lesson.codeExamples.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">Ejemplos de Código</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {lesson.codeExamples.map((example, index) => (
                  <div key={index}>
                    {example.title && (
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">{example.title}</h3>
                    )}
                    <pre className="bg-gray-900 text-yellow-300 p-4 rounded-lg overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Hints */}
          {lesson.hints && lesson.hints.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">Pistas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lesson.hints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">💡</span>
                      <span className="text-gray-700">{hint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Editor interactivo */}
          <div className="mb-8">
            <JavaScriptEditor
              lessonId={lessonId}
              nextLessonId={nextLesson?.id || null}
              nextLessonTitle={nextLesson ? `Lección ${nextLesson.id}` : ""}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            {prevLesson && (
              <Link href={`/javascript/${prevLesson.id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Lección {prevLesson.id}: {prevLesson.title}
                </Button>
              </Link>
            )}
            <div className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

