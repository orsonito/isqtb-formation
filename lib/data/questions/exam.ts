import type { Question } from "../../types";

export const examQuestions: Question[] = [
  {
    id: "ex-01",
    chapterId: "exam",
    text: "L'examen ISTQB Foundation v4.0 comporte combien de questions ?",
    options: ["20", "30", "40", "50"],
    correctIndex: 2,
    explanation: "L'examen Foundation comporte 40 questions à choix multiples.",
    syllabusRef: "Syllabus — §0.6 L'examen de certification · CTFL v4.0",
  },
  {
    id: "ex-02",
    chapterId: "exam",
    text: "Quel score minimum est requis pour réussir l'examen Foundation ?",
    options: ["50 %", "65 %", "75 %", "80 %"],
    correctIndex: 1,
    explanation: "Il faut obtenir au moins 65 % (26/40) pour réussir.",
    syllabusRef: "Syllabus — §0.6 L'examen de certification · CTFL v4.0",
  },
  {
    id: "ex-03",
    chapterId: "exam",
    text: "Les niveaux de connaissance K1, K2, K3 signifient respectivement :",
    options: [
      "Appliquer, Comprendre, Se souvenir",
      "Se souvenir, Comprendre, Appliquer",
      "Comprendre, Appliquer, Analyser",
      "Se souvenir, Appliquer, Évaluer",
    ],
    correctIndex: 1,
    explanation: "K1 = se souvenir, K2 = comprendre, K3 = appliquer.",
    syllabusRef: "Syllabus — §0.5 Objectifs d'apprentissage · K1/K2/K3",
  },
  {
    id: "ex-04",
    chapterId: "exam",
    text: "La durée minimale de formation accréditée ISTQB Foundation est :",
    options: ["10 heures", "15 heures", "18,75 heures", "25 heures"],
    correctIndex: 2,
    explanation: "Le syllabus exige un minimum de 18,75 heures (18 h 55) d'enseignement.",
    syllabusRef: "Syllabus — §0.11 Organisation du syllabus",
  },
];
