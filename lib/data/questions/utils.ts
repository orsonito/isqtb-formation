import type { Question } from "../../types";

export const CHAPTER_QUIZ_SIZE = 8;
export const MIN_QUESTIONS_PER_CHAPTER = 30;

/** Fisher-Yates shuffle — retourne un nouveau tableau mélangé */
export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** @deprecated Utiliser shuffleArray */
export const shuffleQuestions = shuffleArray;

/** Mélange les options d'une question pour éviter un biais de position (ex. toujours B) */
export function shuffleQuestionOptions(question: Question): Question {
  const tagged = question.options.map((text, index) => ({
    text,
    isCorrect: index === question.correctIndex,
  }));
  const shuffled = shuffleArray(tagged);
  return {
    ...question,
    options: shuffled.map((o) => o.text),
    correctIndex: shuffled.findIndex((o) => o.isCorrect),
  };
}

export function pickRandomQuestions(pool: Question[], count: number): Question[] {
  if (pool.length <= count) return shuffleArray(pool);
  return shuffleArray(pool).slice(0, count);
}

/** Sélection aléatoire + mélange des options de chaque question */
export function prepareQuizQuestions(pool: Question[], count: number): Question[] {
  return pickRandomQuestions(pool, count).map(shuffleQuestionOptions);
}
