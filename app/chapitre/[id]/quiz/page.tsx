"use client";

import { use, useCallback, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/app-shell/app-shell";
import Button from "@/components/ui/button";
import Quiz from "@/components/quiz/quiz";
import { getChapterById } from "@/lib/data/chapters";
import {
  CHAPTER_QUIZ_SIZE,
  getChapterQuestionCount,
  getRandomChapterQuiz,
} from "@/lib/data/questions";
import { saveQuizResult } from "@/lib/progress";

export default function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const chapterId = parseInt(id, 10);
  const chapter = getChapterById(chapterId);
  const poolSize = getChapterQuestionCount(chapterId);
  const [quizKey, setQuizKey] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState(() =>
    getRandomChapterQuiz(chapterId, CHAPTER_QUIZ_SIZE)
  );
  const [finished, setFinished] = useState(false);

  const regenerateQuiz = useCallback(() => {
    setQuizQuestions(getRandomChapterQuiz(chapterId, CHAPTER_QUIZ_SIZE));
    setFinished(false);
    setQuizKey((k) => k + 1);
  }, [chapterId]);

  if (!chapter) notFound();

  function handleComplete(score: number, total: number) {
    saveQuizResult(chapterId, score, total);
    setFinished(true);
  }

  const nextChapter = getChapterById(chapterId + 1);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-primary">Formation</Link>
          <span className="mx-2">/</span>
          <Link href={`/chapitre/${chapterId}`} className="hover:text-primary">
            Ch. {chapterId}
          </Link>
          <span className="mx-2">/</span>
          <span>Quiz</span>
        </nav>

        <header>
          <h1 className="text-2xl font-bold">Quiz — Chapitre {chapterId}</h1>
          <p className="mt-1 text-muted">{chapter.title}</p>
          <p className="mt-2 text-sm text-muted">
            {CHAPTER_QUIZ_SIZE} questions tirées aléatoirement parmi {poolSize} ·
            Seuil de réussite : 65 %
          </p>
        </header>

        <Quiz
          key={quizKey}
          questions={quizQuestions}
          title={`Quiz Chapitre ${chapterId}`}
          onComplete={handleComplete}
        />

        {finished && (
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button variant="secondary" size="lg" onClick={regenerateQuiz}>
              Nouveau quiz aléatoire
            </Button>
            {nextChapter ? (
              <Button href={`/chapitre/${nextChapter.id}`} variant="primary" size="lg">
                Chapitre suivant →
              </Button>
            ) : (
              <Button href="/examen" variant="accent" size="lg">
                Passer l&apos;examen blanc →
              </Button>
            )}
            <Button href={`/chapitre/${chapterId}/fiches`} variant="secondary" size="lg">
              Revoir les fiches
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
