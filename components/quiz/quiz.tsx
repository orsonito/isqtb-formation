"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import type { Question } from "@/lib/types";

interface QuizProps {
  questions: Question[];
  title: string;
  passThreshold?: number;
  timeLimitMinutes?: number;
  onComplete: (score: number, total: number, durationMinutes: number) => void;
}

export default function Quiz({
  questions,
  title,
  passThreshold = 0.65,
  timeLimitMinutes,
  onComplete,
}: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(
    timeLimitMinutes ? timeLimitMinutes * 60 : null
  );

  const finish = useCallback(() => {
    const score = answers.reduce<number>((acc, ans, i) => {
      return acc + (ans === questions[i].correctIndex ? 1 : 0);
    }, 0);
    const durationMinutes = Math.round((Date.now() - startTime) / 60000);
    setSubmitted(true);
    onComplete(score, questions.length, durationMinutes);
  }, [answers, questions, startTime, onComplete]);

  useEffect(() => {
    if (!timeLimitMinutes || submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t === null || t <= 1) {
          clearInterval(interval);
          finish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLimitMinutes, submitted, finish]);

  if (questions.length === 0) {
    return <p className="text-muted">Aucune question disponible.</p>;
  }

  const q = questions[current];
  const score = answers.reduce<number>(
    (acc, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0),
    0
  );
  const passed = score / questions.length >= passThreshold;

  function selectOption(idx: number) {
    if (submitted) return;
    setSelected(idx);
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  }

  function goNext() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(answers[current + 1]);
    }
  }

  function goPrev() {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setSelected(answers[current - 1]);
    }
  }

  function handleSubmit() {
    finish();
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div
          className={`rounded-2xl border p-8 text-center ${
            passed
              ? "border-accent/30 bg-accent/10"
              : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
          }`}
        >
          <p className="text-5xl font-bold">{score}/{questions.length}</p>
          <p className="mt-2 text-lg">
            {Math.round((score / questions.length) * 100)}%
          </p>
          <p className={`mt-4 font-semibold ${passed ? "text-accent" : "text-red-600 dark:text-red-400"}`}>
            {passed ? "Réussi !" : "Non réussi — seuil : " + Math.round(passThreshold * 100) + "%"}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Corrections</h3>
          {questions.map((question, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === question.correctIndex;
            return (
              <div
                key={question.id}
                className={`rounded-xl border p-4 ${
                  isCorrect
                    ? "border-accent/30 bg-accent/5"
                    : "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20"
                }`}
              >
                <p className="mb-2 font-medium">
                  {i + 1}. {question.text}
                </p>
                {!isCorrect && userAnswer !== null && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Votre réponse : {question.options[userAnswer]}
                  </p>
                )}
                <p className="text-sm text-accent">
                  Bonne réponse : {question.options[question.correctIndex]}
                </p>
                <p className="mt-2 text-sm text-muted">{question.explanation}</p>
                {question.syllabusRef && (
                  <p className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                    Référence syllabus : {question.syllabusRef}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const allAnswered = answers.every((a) => a !== null);
  const minutes = timeLeft !== null ? Math.floor(timeLeft / 60) : null;
  const seconds = timeLeft !== null ? timeLeft % 60 : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        {timeLeft !== null && (
          <span
            className={`rounded-lg px-4 py-2 font-mono text-base font-bold ${
              timeLeft < 300
                ? "bg-red-100 text-red-700 ring-2 ring-red-300 dark:bg-red-950 dark:text-red-400 dark:ring-red-800"
                : "bg-primary/10 text-primary ring-2 ring-primary/20"
            }`}
          >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {questions.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setCurrent(i);
              setSelected(answers[i]);
            }}
            className={`h-10 w-10 rounded-xl text-sm font-bold transition-all ${
              i === current
                ? "bg-primary text-white shadow-md shadow-primary/30 ring-2 ring-primary ring-offset-2"
                : answers[i] !== null
                  ? "bg-accent/20 text-accent ring-2 ring-accent/30"
                  : "bg-border text-muted hover:bg-border/80"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm">
        <p className="mb-1 text-sm font-medium text-muted">
          Question {current + 1} / {questions.length}
        </p>
        <p className="mb-6 text-lg font-medium leading-relaxed">{q.text}</p>

        <div className="space-y-3">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => selectOption(idx)}
              className={
                selected === idx ? "btn-option btn-option-selected" : "btn-option"
              }
            >
              <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="lg"
          onClick={goPrev}
          disabled={current === 0}
        >
          ← Précédent
        </Button>

        {current < questions.length - 1 ? (
          <Button variant="primary" size="lg" onClick={goNext}>
            Suivant →
          </Button>
        ) : (
          <Button
            variant="accent"
            size="lg"
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Terminer le test
          </Button>
        )}
      </div>
    </div>
  );
}
