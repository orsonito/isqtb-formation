"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AppShell from "@/components/app-shell/app-shell";
import Button from "@/components/ui/button";
import Quiz from "@/components/quiz/quiz";
import { EXAM_CONFIG } from "@/lib/data/chapters";
import { getExamQuestions } from "@/lib/data/questions";
import { saveExamAttempt } from "@/lib/progress";

export default function ExamenPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const examQuestions = useMemo(
    () => getExamQuestions(EXAM_CONFIG.questionCount),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [started]
  );

  function handleComplete(score: number, total: number, durationMinutes: number) {
    const passed = score / total >= EXAM_CONFIG.passThreshold;
    saveExamAttempt({
      date: new Date().toISOString(),
      score,
      total,
      passed,
      durationMinutes,
    });
    setFinished(true);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <nav className="text-sm text-muted">
          <Link href="/" className="font-medium hover:text-primary">Formation</Link>
          <span className="mx-2">/</span>
          <span>Examen blanc</span>
        </nav>

        {!started ? (
          <div className="space-y-6">
            <header>
              <h1 className="text-2xl font-bold">Examen blanc de certification</h1>
              <p className="mt-2 text-muted leading-relaxed">
                Simulez l&apos;examen officiel ISTQB Foundation Level v4.0 dans les
                conditions réelles.
              </p>
            </header>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold">Règles de l&apos;examen</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  {EXAM_CONFIG.questionCount} questions à choix multiples (4 options)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  {EXAM_CONFIG.durationMinutes} minutes maximum
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Seuil de réussite : {EXAM_CONFIG.passThreshold * 100}% ({EXAM_CONFIG.passScore}/{EXAM_CONFIG.questionCount})
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Questions couvrant les 6 chapitres du syllabus
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Pas de retour en arrière une fois le temps écoulé
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm leading-relaxed">
                Conseil : terminez d&apos;abord tous les chapitres, les fiches et les quiz
                avant de passer l&apos;examen blanc. Les questions sont mélangées aléatoirement
                à chaque tentative.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/15 to-accent/10 p-8 text-center">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
                Prêt pour la certification ?
              </p>
              <Button
                variant="primary"
                size="xl"
                fullWidth
                onClick={() => setStarted(true)}
                className="max-w-md mx-auto"
              >
                Démarrer l&apos;examen blanc
              </Button>
              <p className="mt-3 text-xs text-muted">
                {EXAM_CONFIG.questionCount} questions · {EXAM_CONFIG.durationMinutes} min · Seuil {EXAM_CONFIG.passThreshold * 100}%
              </p>
            </div>
          </div>
        ) : (
          <>
            <header>
              <h1 className="text-2xl font-bold">Examen en cours</h1>
              <p className="mt-1 text-sm text-muted">
                {EXAM_CONFIG.questionCount} questions · {EXAM_CONFIG.durationMinutes} min · Seuil {EXAM_CONFIG.passThreshold * 100}%
              </p>
            </header>

            <Quiz
              questions={examQuestions}
              title="Examen ISTQB Foundation"
              passThreshold={EXAM_CONFIG.passThreshold}
              timeLimitMinutes={EXAM_CONFIG.durationMinutes}
              onComplete={handleComplete}
            />

            {finished && (
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setStarted(false);
                    setFinished(false);
                  }}
                >
                  Nouvelle tentative
                </Button>
                <Button href="/" variant="secondary" size="lg">
                  Retour à l&apos;accueil
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
