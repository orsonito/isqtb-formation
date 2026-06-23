"use client";

import type { ChapterProgress, ExamAttempt, Progress } from "./types";

const STORAGE_KEY = "istqb-formation-progress";

const defaultChapterProgress = (): ChapterProgress => ({
  completedSections: [],
  flashcardsReviewed: false,
  quizScore: null,
  quizPassed: false,
});

export function getProgress(): Progress {
  if (typeof window === "undefined") {
    return { chapters: {}, examAttempts: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { chapters: {}, examAttempts: [] };
    return JSON.parse(raw) as Progress;
  } catch {
    return { chapters: {}, examAttempts: [] };
  }
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getChapterProgress(chapterId: number): ChapterProgress {
  const progress = getProgress();
  return progress.chapters[chapterId] ?? defaultChapterProgress();
}

export function markSectionComplete(chapterId: number, sectionId: string): void {
  const progress = getProgress();
  const chapter = progress.chapters[chapterId] ?? defaultChapterProgress();
  if (!chapter.completedSections.includes(sectionId)) {
    chapter.completedSections.push(sectionId);
  }
  progress.chapters[chapterId] = chapter;
  saveProgress(progress);
}

export function markFlashcardsReviewed(chapterId: number): void {
  const progress = getProgress();
  const chapter = progress.chapters[chapterId] ?? defaultChapterProgress();
  chapter.flashcardsReviewed = true;
  progress.chapters[chapterId] = chapter;
  saveProgress(progress);
}

export function saveQuizResult(
  chapterId: number,
  score: number,
  total: number,
  passThreshold = 0.65
): void {
  const progress = getProgress();
  const chapter = progress.chapters[chapterId] ?? defaultChapterProgress();
  chapter.quizScore = score;
  chapter.quizPassed = score / total >= passThreshold;
  progress.chapters[chapterId] = chapter;
  saveProgress(progress);
}

export function saveExamAttempt(attempt: ExamAttempt): void {
  const progress = getProgress();
  progress.examAttempts.unshift(attempt);
  saveProgress(progress);
}

export function getOverallProgress(chapterCount: number, sectionsPerChapter: Record<number, number>): number {
  const progress = getProgress();
  let total = 0;
  let done = 0;

  for (let i = 1; i <= chapterCount; i++) {
    const chapter = progress.chapters[i] ?? defaultChapterProgress();
    const sectionCount = sectionsPerChapter[i] ?? 0;
    total += sectionCount + 2; // sections + flashcards + quiz
    done += chapter.completedSections.length;
    if (chapter.flashcardsReviewed) done += 1;
    if (chapter.quizPassed) done += 1;
  }

  return total === 0 ? 0 : Math.round((done / total) * 100);
}
