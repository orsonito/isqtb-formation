import type { Flashcard } from "../types";

export const flashcards: Flashcard[] = [
  // Chapitre 1
  { id: "f1-1", chapterId: 1, front: "Quelle est la différence entre vérification et validation ?", back: "Vérification = conformité aux exigences spécifiées. Validation = conformité aux besoins réels des utilisateurs et parties prenantes." },
  { id: "f1-2", chapterId: 1, front: "Erreur → Défaut → Défaillance : expliquez la chaîne", back: "Erreur humaine produit un défaut (bug) dans un artefact. Si exécuté, le défaut peut provoquer une défaillance." },
  { id: "f1-3", chapterId: 1, front: "Test vs Assurance Qualité ?", back: "Test = contrôle qualité (correctif, axé produit). AQ = préventif (axé processus, amélioration continue)." },
  { id: "f1-4", chapterId: 1, front: "Citez les 7 principes du test", back: "1.Présence défauts 2.Exhaustif impossible 3.Tester tôt 4.Regroupement défauts 5.Usure tests 6.Dépend contexte 7.Illusion absence défauts" },
  { id: "f1-5", chapterId: 1, front: "Test vs Débogage ?", back: "Test détecte défauts/défaillances. Débogage trouve, analyse et corrige la cause. Activités distinctes." },
  { id: "f1-6", chapterId: 1, front: "Quelles sont les 7 activités du processus de test ?", back: "Planification, Pilotage/Contrôle, Analyse, Conception, Implémentation, Exécution, Clôture." },
  { id: "f1-7", chapterId: 1, front: "Niveaux d'indépendance du test (4 niveaux)", back: "1.Auteur 2.Pairs même équipe 3.Autre équipe (même org.) 4.Externe à l'organisation" },
  { id: "f1-8", chapterId: 1, front: "Rôle Test Manager vs Testeur ?", back: "Test Manager : planification, pilotage, clôture. Testeur : analyse, conception, implémentation, exécution." },

  // Chapitre 2
  { id: "f2-1", chapterId: 2, front: "TDD, ATDD, BDD : différence ?", back: "TDD = tests unitaires d'abord. ATDD = tests d'acceptation avant dev. BDD = Given/When/Then en langage naturel." },
  { id: "f2-2", chapterId: 2, front: "Qu'est-ce que le shift-left ?", back: "Tester plus tôt dans le SDLC : revues specs, cas de test avant code, CI, tests statiques avant dynamiques." },
  { id: "f2-3", chapterId: 2, front: "5 niveaux de test ISTQB", back: "Composants, Intégration composants, Système, Intégration système, Acceptation." },
  { id: "f2-4", chapterId: 2, front: "4 types de test ISTQB", back: "Fonctionnel, Non fonctionnel, Boîte noire, Boîte blanche." },
  { id: "f2-5", chapterId: 2, front: "Test de confirmation vs régression ?", back: "Confirmation = défaut corrigé. Régression = modification n'a pas causé de nouveaux problèmes ailleurs." },
  { id: "f2-6", chapterId: 2, front: "DevOps et test : 3 avantages", back: "Feedback rapide, shift-left encouragé, automatisation CI/CD, réduction régression, vue qualité non fonctionnelle." },

  // Chapitre 3
  { id: "f3-1", chapterId: 3, front: "Test statique vs dynamique : différence clé", back: "Statique ne nécessite pas d'exécution. Constater défauts directement vs provoquer défaillances." },
  { id: "f3-2", chapterId: 3, front: "4 types de revues (formalité croissante)", back: "Informelle → Relecture technique → Revue technique → Inspection." },
  { id: "f3-3", chapterId: 3, front: "5 activités du processus de revue", back: "Planification, Lancement, Revue individuelle, Communication/Analyse, Correction/Rapport." },
  { id: "f3-4", chapterId: 3, front: "Rôles dans une revue (6 principaux)", back: "Manager, Auteur, Modérateur, Scribe, Réviseur, Responsable de la revue." },
  { id: "f3-5", chapterId: 3, front: "Règle spéciale des inspections ?", back: "L'auteur ne peut pas être réviseur ni scribe. Type le plus formel avec métriques." },

  // Chapitre 4
  { id: "f4-1", chapterId: 4, front: "Partitions d'équivalence : principe", back: "Diviser données en partitions traitées identiquement. Un test par partition suffit. Valides et invalides." },
  { id: "f4-2", chapterId: 4, front: "BVA 2 valeurs vs 3 valeurs", back: "2 valeurs : limite + voisin adjacent. 3 valeurs : limite + 2 voisins. 3 valeurs plus rigoureuse." },
  { id: "f4-3", chapterId: 4, front: "Couverture branches vs instructions", back: "Couverture branches ⊃ couverture instructions. 100% instructions ≠ toute logique testée." },
  { id: "f4-4", chapterId: 4, front: "3 catégories de techniques de test", back: "Boîte noire (specs), Boîte blanche (structure), Basées sur l'expérience (intuition testeur)." },
  { id: "f4-5", chapterId: 4, front: "User Story INVEST ?", back: "Independent, Negotiable, Valuable, Estimable, Small, Testable." },
  { id: "f4-6", chapterId: 4, front: "ATDD en 3 étapes", back: "1.Atelier spécification 2.Cas positifs 3.Cas négatifs + aspects non fonctionnels." },
  { id: "f4-7", chapterId: 4, front: "Test exploratoire : définition", back: "Conception, exécution et évaluation simultanées pendant que le testeur explore l'objet de test." },

  // Chapitre 5
  { id: "f5-1", chapterId: 5, front: "Critères d'entrée vs sortie", back: "Entrée = préconditions pour commencer. Sortie = conditions pour déclarer achevé. Agile : DoR / DoD." },
  { id: "f5-2", chapterId: 5, front: "Formule estimation 3 points", back: "E = (a + 4m + b) / 6 où a=optimiste, m=probable, b=pessimiste. SD = (b-a)/6." },
  { id: "f5-3", chapterId: 5, front: "Risque projet vs risque produit", back: "Projet = gestion/contrôle (délais, compétences). Produit = qualité (fonctionnalités, sécurité, perf)." },
  { id: "f5-4", chapterId: 5, front: "Niveau de risque = ?", back: "Probabilité × Impact. Plus le niveau est élevé, plus le traitement est important." },
  { id: "f5-5", chapterId: 5, front: "4 quadrants de test (Marick)", back: "Q1: techno/soutien, Q2: métier/soutien, Q3: métier/critique, Q4: techno/critique." },
  { id: "f5-6", chapterId: 5, front: "Pyramide des tests : principe", back: "Beaucoup de tests bas (rapides, isolés), peu de tests haut (lents, bout en bout)." },
  { id: "f5-7", chapterId: 5, front: "Éléments d'un rapport de défaut", back: "ID, titre, auteur, objet test, étapes reproduction, résultats attendus/réels, sévérité, priorité, statut." },

  // Chapitre 6
  { id: "f6-1", chapterId: 6, front: "Types d'outils de test (5 principaux)", back: "Gestion, Statique, Conception/Implémentation, Exécution/Couverture, Non fonctionnel (+ DevOps, Collaboration)." },
  { id: "f6-2", chapterId: 6, front: "3 avantages automatisation", back: "Gain temps répétitif, cohérence/répétabilité, mesures objectives et reporting." },
  { id: "f6-3", chapterId: 6, front: "3 risques automatisation", back: "Attentes irréalistes, dépendance excessive à l'outil, coûts maintenance sous-estimés." },
];

export function getFlashcardsByChapter(chapterId: number): Flashcard[] {
  return flashcards.filter((f) => f.chapterId === chapterId);
}
