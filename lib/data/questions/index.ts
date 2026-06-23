import type { Question } from "../../types";
import { chapter1Questions } from "./chapter-1";
import { chapter2Questions } from "./chapter-2";
import { chapter3Questions } from "./chapter-3";
import { chapter4Questions } from "./chapter-4";
import { chapter5Questions } from "./chapter-5";
import { chapter6Questions } from "./chapter-6";
import { examQuestions } from "./exam";
import {
  CHAPTER_QUIZ_SIZE,
  MIN_QUESTIONS_PER_CHAPTER,
  pickRandomQuestions,
  prepareQuizQuestions,
  shuffleArray,
} from "./utils";

export {
  CHAPTER_QUIZ_SIZE,
  MIN_QUESTIONS_PER_CHAPTER,
  pickRandomQuestions,
  prepareQuizQuestions,
  shuffleArray,
  shuffleArray as shuffleQuestions,
};

export const questions: Question[] = [
  ...chapter1Questions,
  ...chapter2Questions,
  ...chapter3Questions,
  ...chapter4Questions,
  ...chapter5Questions,
  ...chapter6Questions,
  ...examQuestions,
];

export function getQuestionsByChapter(chapterId: number): Question[] {
  return questions.filter((q) => q.chapterId === chapterId);
}

export function getRandomChapterQuiz(chapterId: number, count = CHAPTER_QUIZ_SIZE): Question[] {
  const pool = getQuestionsByChapter(chapterId);
  return prepareQuizQuestions(pool, count);
}

export function getExamQuestions(count: number): Question[] {
  const chapterPool = questions.filter((q) => q.chapterId !== "exam");
  const pool = [...chapterPool, ...examQuestions];
  return prepareQuizQuestions(pool, count);
}

export function getChapterQuestionCount(chapterId: number): number {
  return getQuestionsByChapter(chapterId).length;
}
