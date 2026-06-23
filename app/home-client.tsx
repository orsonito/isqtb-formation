"use client";

import Button from "@/components/ui/button";
import { useProgress } from "@/lib/hooks/use-progress";
import { getOverallProgress } from "@/lib/progress";
import { chapters } from "@/lib/data/chapters";

interface HomeClientProps {
  sectionsMap: Record<number, number>;
  chapterCount: number;
}

export default function HomeClient({ sectionsMap, chapterCount }: HomeClientProps) {
  const { progress } = useProgress();
  const overall = getOverallProgress(chapterCount, sectionsMap);
  const completedChapters = chapters.filter((c) => {
    const cp = progress.chapters[c.id];
    return cp?.quizPassed && cp?.flashcardsReviewed &&
      cp.completedSections.length >= c.sections.length;
  }).length;

  const lastExam = progress.examAttempts[0];

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm text-muted">Progression globale</p>
        <p className="mt-1 text-3xl font-bold text-primary">{overall}%</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm text-muted">Chapitres complétés</p>
        <p className="mt-1 text-3xl font-bold">{completedChapters}/{chapterCount}</p>
        <p className="mt-2 text-xs text-muted">Leçons + fiches + quiz réussis</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm text-muted">Dernier examen blanc</p>
        {lastExam ? (
          <>
            <p className="mt-1 text-3xl font-bold">
              {lastExam.score}/{lastExam.total}
            </p>
            <p className={`mt-2 text-xs font-medium ${lastExam.passed ? "text-accent" : "text-red-500"}`}>
              {lastExam.passed ? "Réussi" : "Non réussi"} — {lastExam.durationMinutes} min
            </p>
          </>
        ) : (
          <>
            <p className="mt-1 text-lg text-muted">Aucun</p>
            <Button href="/examen" variant="accent" size="md" className="mt-3">
              Passer l&apos;examen blanc →
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
