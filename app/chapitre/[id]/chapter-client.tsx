"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import type { Chapter } from "@/lib/types";
import { getChapterProgress, markSectionComplete } from "@/lib/progress";

interface ChapterClientProps {
  chapter: Chapter;
}

export default function ChapterClient({ chapter }: ChapterClientProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setCompleted(getChapterProgress(chapter.id).completedSections);
  }, [chapter.id]);

  function handleComplete(sectionId: string) {
    markSectionComplete(chapter.id, sectionId);
    setCompleted((prev) =>
      prev.includes(sectionId) ? prev : [...prev, sectionId]
    );
    if (activeSection < chapter.sections.length - 1) {
      setActiveSection((s) => s + 1);
    }
  }

  const section = chapter.sections[activeSection];
  const isDone = completed.includes(section.id);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-2">
        {chapter.sections.map((s, i) => {
          const done = completed.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSection(i)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                i === activeSection
                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                  : "border-transparent text-muted hover:border-border hover:bg-card hover:text-foreground"
              }`}
            >
              <span className="mr-2">{done ? "✓" : i + 1}.</span>
              {s.title}
            </button>
          );
        })}
      </aside>

      <article className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed whitespace-pre-line">
          {section.content}
        </div>

        {section.examples && section.examples.length > 0 && (
          <div className="mt-6 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Exemples concrets
            </p>
            {section.examples.map((ex) => (
              <div
                key={ex.title}
                className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4"
              >
                <p className="mb-2 text-sm font-semibold text-primary">{ex.title}</p>
                <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                  {ex.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {section.highlights && section.highlights.length > 0 && (
          <div className="mt-6 rounded-xl bg-accent/10 p-4 ring-2 ring-accent/20">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">
              Points clés
            </p>
            <ul className="space-y-2">
              {section.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm">
                  <span className="text-accent">•</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={() => setActiveSection((s) => Math.max(0, s - 1))}
            disabled={activeSection === 0}
          >
            ← Leçon précédente
          </Button>

          {!isDone ? (
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleComplete(section.id)}
            >
              Marquer comme lu ✓
            </Button>
          ) : (
            <span className="rounded-xl bg-accent/15 px-4 py-2 text-sm font-semibold text-accent">
              ✓ Leçon terminée
            </span>
          )}
        </div>

        {activeSection === chapter.sections.length - 1 && (
          <div className="mt-8 rounded-2xl border-2 border-accent/30 bg-accent/5 p-6 text-center">
            <p className="text-lg font-semibold">Chapitre terminé ?</p>
            <p className="mt-1 text-sm text-muted">
              Passez aux fiches mémo puis au quiz pour valider vos acquis.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <Button
                href={`/chapitre/${chapter.id}/fiches`}
                variant="accent"
                size="lg"
              >
                Fiches à retenir
              </Button>
              <Button
                href={`/chapitre/${chapter.id}/quiz`}
                variant="primary"
                size="lg"
              >
                Passer le quiz
              </Button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
