/**
 * Rééquilibre la position de la bonne réponse dans les fichiers de questions.
 * Usage: node scripts/rebalance-quiz-answers.mjs
 */
import { writeFileSync } from "fs";
import { chapter1Questions } from "../lib/data/questions/chapter-1.ts";
import { chapter2Questions } from "../lib/data/questions/chapter-2.ts";
import { chapter3Questions } from "../lib/data/questions/chapter-3.ts";
import { chapter4Questions } from "../lib/data/questions/chapter-4.ts";
import { chapter5Questions } from "../lib/data/questions/chapter-5.ts";
import { chapter6Questions } from "../lib/data/questions/chapter-6.ts";

function rebalance(question, targetIndex) {
  const options = [...question.options];
  const current = question.correctIndex;
  if (current !== targetIndex) {
    [options[current], options[targetIndex]] = [options[targetIndex], options[current]];
  }
  return { ...question, options, correctIndex: targetIndex };
}

function escapeString(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function formatQuestion(q, indent = "  ") {
  const opts = q.options.map((o) => `${indent}    "${escapeString(o)}",`).join("\n");
  return `${indent}{
${indent}  id: "${q.id}",
${indent}  chapterId: ${q.chapterId},
${indent}  text: "${escapeString(q.text)}",
${indent}  options: [
${opts}
${indent}  ],
${indent}  correctIndex: ${q.correctIndex},
${indent}  explanation: "${escapeString(q.explanation)}",
${indent}  syllabusRef: "${escapeString(q.syllabusRef)}",
${indent}},`;
}

function writeChapter(filePath, exportName, questions) {
  const rebalanced = questions.map((q, i) => rebalance(q, i % 4));
  const body = rebalanced.map((q) => formatQuestion(q)).join("\n");
  const content = `import type { Question } from "../../types";

export const ${exportName}: Question[] = [
${body}
];
`;
  writeFileSync(filePath, content, "utf8");

  const counts = [0, 0, 0, 0];
  rebalanced.forEach((q) => counts[q.correctIndex]++);
  console.log(`${filePath}: A=${counts[0]} B=${counts[1]} C=${counts[2]} D=${counts[3]}`);
}

const chapters = [
  ["lib/data/questions/chapter-1.ts", "chapter1Questions", chapter1Questions],
  ["lib/data/questions/chapter-2.ts", "chapter2Questions", chapter2Questions],
  ["lib/data/questions/chapter-3.ts", "chapter3Questions", chapter3Questions],
  ["lib/data/questions/chapter-4.ts", "chapter4Questions", chapter4Questions],
  ["lib/data/questions/chapter-5.ts", "chapter5Questions", chapter5Questions],
  ["lib/data/questions/chapter-6.ts", "chapter6Questions", chapter6Questions],
];

for (const [path, name, qs] of chapters) {
  writeChapter(path, name, qs);
}

console.log("Done.");
