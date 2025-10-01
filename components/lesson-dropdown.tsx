"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { lessons } from "@/lib/lessons";

interface LessonDropdownProps {
  currentLessonId: number;
}

export default function LessonDropdown({ currentLessonId }: LessonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">
          Lección {currentLessonId}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
              Seleccionar lección
            </div>
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lesson/${lesson.id}`}
                className={`
                  block px-3 py-2 rounded-md text-sm transition-colors
                  ${
                    lesson.id === currentLessonId
                      ? "bg-blue-100 text-blue-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium">Lección {lesson.id}</div>
                <div className="text-xs text-gray-600 truncate">{lesson.title.replace(/Lección \d+:\s*/, "")}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

