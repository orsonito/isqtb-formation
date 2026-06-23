"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/app-shell/app-shell";
import Button from "@/components/ui/button";
import FlashcardDeck from "@/components/flashcard-deck/flashcard-deck";
import { getChapterById } from "@/lib/data/chapters";
import { getFlashcardsByChapter } from "@/lib/data/flashcards";
import { markFlashcardsReviewed } from "@/lib/progress";

export default function FichesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const chapterId = parseInt(id, 10);
  const chapter = getChapterById(chapterId);
  const cards = getFlashcardsByChapter(chapterId);
  const [done, setDone] = useState(false);

  if (!chapter) notFound();

  function handleComplete() {
    markFlashcardsReviewed(chapterId);
    setDone(true);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-primary">Formation</Link>
          <span className="mx-2">/</span>
          <Link href={`/chapitre/${chapterId}`} className="hover:text-primary">
            Ch. {chapterId}
          </Link>
          <span className="mx-2">/</span>
          <span>Fiches</span>
        </nav>

        <header>
          <h1 className="text-2xl font-bold">Fiches à retenir</h1>
          <p className="mt-1 text-muted">
            Chapitre {chapterId} — {chapter.title} · {cards.length} fiches
          </p>
        </header>

        {done ? (
          <div className="space-y-6 text-center">
            <div className="rounded-2xl border-2 border-accent/30 bg-accent/10 p-8">
              <p className="text-4xl">🎉</p>
              <p className="mt-3 text-lg font-semibold">Révision terminée !</p>
              <p className="mt-1 text-sm text-muted">
                Vous avez parcouru toutes les fiches de ce chapitre.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href={`/chapitre/${chapterId}/quiz`} variant="primary" size="lg">
                Passer le quiz →
              </Button>
              <Button href={`/chapitre/${chapterId}`} variant="secondary" size="lg">
                Retour au chapitre
              </Button>
            </div>
          </div>
        ) : (
          <FlashcardDeck cards={cards} onComplete={handleComplete} />
        )}
      </div>
    </AppShell>
  );
}
