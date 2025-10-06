import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getPythonLessonById, pythonLessons } from "@/lib/python-lessons";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/navbar";
import PythonEditor from "@/components/python-editor";

export function generateStaticParams() {
  return pythonLessons.map((lesson) => ({
    id: lesson.id.toString(),
  }));
}

export default async function PythonLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessonId = parseInt(id);
  const lesson = getPythonLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  const prevLesson = getPythonLessonById(lessonId - 1);
  const nextLesson = getPythonLessonById(lessonId + 1);
  const progress = (lessonId / pythonLessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-yellow-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.25 2.1l-.35.35A7.5 7.5 0 108.1 9.7l.35-.35a7.5 7.5 0 105.8-7.25zm-1.42 6.08a5.5 5.5 0 11-6.06 6.06 5.5 5.5 0 016.06-6.06z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
                  Python - CodeAcademy
                </h1>
              </div>
            </Link>
            <div className="flex-1 max-w-md mx-8">
              <div className="text-sm text-gray-600 mb-1">
                Progreso: Lección {lessonId} de {pythonLessons.length}
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
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
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
                      <span className="text-blue-600 font-bold">💡</span>
                      <span className="text-gray-700">{hint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Editor interactivo */}
          <div className="mb-8">
            <PythonEditor
              lessonId={lessonId}
              nextLessonId={nextLesson?.id || null}
              nextLessonTitle={nextLesson ? `Lección ${nextLesson.id}` : ""}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            {prevLesson && (
              <Link href={`/python/${prevLesson.id}`}>
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

