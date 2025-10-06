import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCSSLessonById, cssLessons } from "@/lib/css-lessons";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/navbar";
import CSSEditor from "@/components/css-editor";

export function generateStaticParams() {
  return cssLessons.map((lesson) => ({
    id: lesson.id.toString(),
  }));
}

export default async function CSSLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessonId = parseInt(id);
  const lesson = getCSSLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  const prevLesson = getCSSLessonById(lessonId - 1);
  const nextLesson = getCSSLessonById(lessonId + 1);
  const progress = (lessonId / cssLessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  CSS - CodeAcademy
                </h1>
              </div>
            </Link>
            <div className="flex-1 max-w-md mx-8">
              <div className="text-sm text-gray-600 mb-1">
                Progreso: Lección {lessonId} de {cssLessons.length}
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
                    <pre className="bg-gray-900 text-pink-300 p-4 rounded-lg overflow-x-auto">
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
                      <span className="text-pink-600 font-bold">💡</span>
                      <span className="text-gray-700">{hint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Editor interactivo */}
          <div className="mb-8">
            <CSSEditor
              lessonId={lessonId}
              nextLessonId={nextLesson?.id || null}
              nextLessonTitle={nextLesson ? `Lección ${nextLesson.id}` : ""}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            {prevLesson && (
              <Link href={`/css/${prevLesson.id}`}>
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

