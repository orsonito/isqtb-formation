export interface SectionExample {
  title: string;
  content: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  highlights?: string[];
  examples?: SectionExample[];
}

export interface Chapter {
  id: number;
  title: string;
  duration: string;
  keywords: string[];
  description: string;
  sections: Section[];
}

export interface Flashcard {
  id: string;
  chapterId: number;
  front: string;
  back: string;
}

export interface Question {
  id: string;
  chapterId: number | "exam";
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  syllabusRef: string;
}

export interface ChapterProgress {
  completedSections: string[];
  flashcardsReviewed: boolean;
  quizScore: number | null;
  quizPassed: boolean;
}

export interface Progress {
  chapters: Record<number, ChapterProgress>;
  examAttempts: ExamAttempt[];
}

export interface ExamAttempt {
  date: string;
  score: number;
  total: number;
  passed: boolean;
  durationMinutes: number;
}
