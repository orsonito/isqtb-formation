"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import type { Flashcard } from "@/lib/types";

interface FlashcardDeckProps {
  cards: Flashcard[];
  onComplete?: () => void;
}

export default function FlashcardDeck({ cards, onComplete }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  if (cards.length === 0) {
    return <p className="text-muted">Aucune fiche disponible.</p>;
  }

  const card = cards[index];
  const progress = Math.round(((index + (flipped ? 0.5 : 0)) / cards.length) * 100);
  const isLast = index === cards.length - 1;

  function handleKnown() {
    const next = new Set(known);
    next.add(card.id);
    setKnown(next);
    goNext();
  }

  function handleReview() {
    goNext();
  }

  function goNext() {
    setFlipped(false);
    if (isLast) {
      onComplete?.();
    } else {
      setIndex((i) => i + 1);
    }
  }

  function goPrev() {
    if (index > 0) {
      setFlipped(false);
      setIndex((i) => i - 1);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-medium text-muted">
        <span>
          Fiche {index + 1} / {cards.length}
        </span>
        <span>{known.size} mémorisée{known.size > 1 ? "s" : ""}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => setFlipped(!flipped)}
        className={`group ${flipped ? "btn-flip-card btn-flip-card-flipped" : "btn-flip-card"}`}
      >
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
          {flipped ? "Réponse" : "Question"}
        </p>
        <p className="text-lg leading-relaxed">
          {flipped ? card.back : card.front}
        </p>
        {!flipped && (
          <p className="mt-6 text-sm font-medium text-primary group-hover:underline">
            Cliquez pour retourner la fiche ↻
          </p>
        )}
      </button>

      {flipped && (
        <div className="flex gap-4">
          <Button variant="secondary" size="lg" fullWidth onClick={handleReview}>
            À revoir
          </Button>
          <Button variant="accent" size="lg" fullWidth onClick={handleKnown}>
            {isLast ? "Terminer" : "Je m'en souviens ✓"}
          </Button>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" size="md" onClick={goPrev} disabled={index === 0}>
          ← Précédent
        </Button>
        {!flipped && index < cards.length - 1 && (
          <Button variant="ghost" size="md" onClick={() => setIndex((i) => i + 1)}>
            Passer →
          </Button>
        )}
      </div>
    </div>
  );
}
