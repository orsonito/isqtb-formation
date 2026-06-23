import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Fondamentaux des tests",
    duration: "180 min",
    keywords: [
      "couverture", "débogage", "défaut", "erreur", "défaillance", "qualité",
      "assurance qualité", "cause racine", "analyse de test", "base de test",
      "cas de test", "testware", "validation", "vérification",
    ],
    description: "Principes de base, objectifs du test, processus de test et compétences essentielles.",
    sections: [
      {
        id: "1-1",
        title: "Qu'est-ce que le test ?",
        content: `Le test de logiciels est un ensemble d'activités visant à découvrir les défauts et à évaluer la qualité des artefacts logiciels. Ces artefacts testés sont appelés objets de test.

Le test n'est pas seulement l'exécution de tests : il comprend aussi la planification, l'analyse, la conception, l'implémentation, le pilotage et la clôture. Il doit être aligné sur le cycle de vie du développement logiciel.

Le test implique à la fois la vérification (conformité aux exigences spécifiées) et la validation (conformité aux besoins des utilisateurs dans leur environnement opérationnel).

Le test peut être dynamique (exécution du logiciel) ou statique (revues, analyse statique).`,
        highlights: [
          "Objectifs typiques : évaluer les produits, provoquer des défaillances, assurer la couverture, réduire les risques, vérifier les exigences, fournir des informations aux parties prenantes",
          "Test et débogage sont distincts : le test détecte les défauts, le débogage les corrige",
        ],
        examples: [
          {
            title: "Vérification vs Validation",
            content: `Une banque demande un virement max de 10 000 €.
• Vérification : le système respecte-t-il la limite de 10 000 € codée dans les specs ?
• Validation : le système répond-il vraiment au besoin métier (ex. virement instantané attendu par le client) ?`,
          },
          {
            title: "Test dynamique vs statique",
            content: `• Dynamique : lancer l'appli et cliquer « Payer » → une erreur 500 apparaît (défaillance).
• Statique : relire le code ou la spec sans exécuter → repérer une condition « if (montant = 10000) » au lieu de « <= ».`,
          },
        ],
      },
      {
        id: "1-2",
        title: "Pourquoi tester ?",
        content: `Le test, en tant que contrôle de qualité, aide à atteindre les objectifs dans les limites du périmètre, du temps, de la qualité et du budget.

Chaîne des défauts : Erreur humaine → Défaut (bug) → Défaillance (lors de l'exécution). Une cause racine est la raison fondamentale d'un problème.

Test vs Assurance Qualité :
- Contrôle qualité (test) : approche corrective, axée produit
- Assurance qualité : approche préventive, axée processus`,
        highlights: [
          "Erreur → Défaut → Défaillance",
          "Test = contrôle qualité (correctif), AQ = préventif (processus)",
        ],
        examples: [
          {
            title: "Chaîne erreur → défaut → défaillance",
            content: `Un développeur confond « <= » et « < » dans une spec (erreur).
Le code implémente « if (age < 18) » au lieu de « <= 18 » (défaut).
Un utilisateur de 18 ans ne peut pas s'inscrire (défaillance observée lors du test).`,
          },
          {
            title: "Test vs Assurance Qualité",
            content: `• Test (contrôle qualité) : exécuter les cas de test, trouver 12 bugs, les signaler.
• AQ (préventif) : analyser pourquoi les bugs arrivent en prod → mettre en place des revues de code obligatoires et une Definition of Done.`,
          },
        ],
      },
      {
        id: "1-3",
        title: "Les 7 principes du test",
        content: `1. Le test montre la présence de défauts, pas leur absence
2. Le test exhaustif est impossible
3. Tester tôt économise temps et argent (shift-left)
4. Regroupement des défauts (principe de Pareto)
5. Usure des tests (répéter les mêmes tests devient inefficace)
6. Le test dépend du contexte
7. L'illusion de l'absence de défauts (vérifier les exigences ne garantit pas le succès)`,
        examples: [
          {
            title: "Principe 1 — Le test montre la présence, pas l'absence de défauts",
            content: `On exécute 100 tests sur une calculatrice : tous passent.
→ On a trouvé aucun défaut, mais on ne peut pas conclure « le logiciel est sans bug » : il reste des milliers de combinaisons non testées.`,
          },
          {
            title: "Principe 2 — Le test exhaustif est impossible",
            content: `Un champ « mot de passe » accepte 8 à 64 caractères (lettres, chiffres, symboles).
Tester toutes les combinaisons prendrait des années → on utilise partitions d'équivalence et analyse des valeurs limites pour couvrir l'essentiel avec peu de cas.`,
          },
          {
            title: "Principe 3 — Tester tôt économise temps et argent",
            content: `Une ambiguïté dans la spec « remise client » est détectée en revue (semaine 1) au lieu qu'un dev code la mauvaise règle pendant 2 semaines puis qu'un testeur la signale en fin de sprint.
Coût de correction : quelques minutes vs plusieurs jours.`,
          },
          {
            title: "Principe 4 — Regroupement des défauts (Pareto)",
            content: `Sur 200 bugs d'une release, 160 proviennent du module « Paiement » (20 % du code).
→ On renforce les tests et revues sur ce module plutôt que de répartir l'effort uniformément.`,
          },
          {
            title: "Principe 5 — Usure des tests",
            content: `Les mêmes 50 tests de régression sont rejoués à chaque sprint sans modification : ils ne trouvent plus de nouveaux bugs.
→ On ajoute de nouveaux cas ciblant les zones modifiées et les défauts récents ; on garde les anciens pour la régression automatisée.`,
          },
          {
            title: "Principe 6 — Le test dépend du contexte",
            content: `• App bancaire : tests sécurité poussés, traçabilité formelle, indépendance élevée.
• Prototype interne : tests exploratoires légers, peu de documentation.
→ Pas de méthode unique applicable à tous les projets.`,
          },
          {
            title: "Principe 7 — L'illusion de l'absence de défauts",
            content: `Un site e-commerce passe 100 % des tests fonctionnels (panier, paiement, livraison).
Pourtant les ventes chutent : le parcours d'achat est trop long et l'app mobile est lente.
→ Toutes les exigences étaient « correctes » mais le produit ne répond pas au besoin réel (manque de validation).`,
          },
        ],
        highlights: [
          "Chaque principe guide une décision de test concrète",
          "Les principes 2 et 5 poussent à prioriser et renouveler les cas de test",
          "Les principes 3 et 6 rappellent d'adapter l'effort au contexte et au moment",
        ],
      },
      {
        id: "1-4",
        title: "Activités de test et testware",
        content: `Processus de test (activités principales) :
1. Planification des tests
2. Pilotage et contrôle des tests
3. Analyse de test ("que tester ?")
4. Conception des tests ("comment tester ?")
5. Implémentation des tests
6. Exécution des tests
7. Clôture des tests

Testware : produits d'activités créés (plans, cas de test, scripts, données, rapports...).

Traçabilité : lien entre base de test, testware, résultats et défauts.

Rôles : Test Manager (planification, pilotage, clôture) et Testeur (analyse, conception, implémentation, exécution).`,
        examples: [
          {
            title: "Les 7 activités en pratique",
            content: `Projet : tester une fonction « Connexion ».
1. Planification : objectif = valider login/mot de passe, 3 jours, 2 testeurs.
2. Analyse : identifier conditions (login valide, invalide, compte bloqué…).
3. Conception : rédiger cas de test CT-01 à CT-15.
4. Implémentation : préparer comptes de test, script Selenium.
5. Exécution : lancer les tests, enregistrer résultats.
6. Pilotage : 10/15 passés → décider de prolonger d'1 jour.
7. Clôture : rapport final, archiver les scripts pour la régression.`,
          },
          {
            title: "Traçabilité",
            content: `Exigence REQ-042 « Mot de passe min 8 caractères » → Cas de test CT-07 → Résultat : ÉCHEC → Bug BUG-189. On sait exactement quelle exigence n'est pas couverte.`,
          },
          {
            title: "Testware — produits créés à chaque activité",
            content: `• Planification → plan de test, calendrier.
• Conception → cas de test CT-01 à CT-50, données de test.
• Implémentation → scripts Selenium, suites de tests.
• Exécution → logs, rapports de défauts.
• Clôture → rapport de fin de test, leçons apprises.`,
          },
          {
            title: "Rôles Test Manager vs Testeur",
            content: `Release v3.0 :
• Test Manager : définit la stratégie, suit le budget, produit le rapport de clôture.
• Testeur : analyse les User Stories, écrit les cas, exécute les tests, signale les bugs.`,
          },
        ],
      },
      {
        id: "1-5",
        title: "Compétences et bonnes pratiques",
        content: `Compétences essentielles : connaissance du test, rigueur, communication, réflexion analytique, connaissances techniques et métier.

Approche équipe intégrée (XP) : tout membre qualifié peut faire n'importe quelle tâche, responsabilité partagée de la qualité.

Indépendance du test (du moins au plus indépendant) :
- Auteur teste son propre travail
- Pairs de la même équipe
- Testeurs d'une autre équipe (même organisation)
- Testeurs externes à l'organisation

Avantages indépendance : perspectives différentes, détection de types de défauts variés.
Inconvénients : isolement, manque de collaboration, développeurs moins responsables.`,
        examples: [
          {
            title: "Niveaux d'indépendance",
            content: `• Dev écrit le code du panier → teste lui-même (aucune indépendance).
• Collègue de l'équipe relit et teste (un peu d'indépendance).
• Équipe QA interne teste la release (indépendance élevée).
• Audit externe pour une app médicale (très haute indépendance).`,
          },
          {
            title: "Approche équipe intégrée (XP)",
            content: `Dans une équipe Scrum : le testeur aide le PO à rédiger des critères d'acceptation testables, pair-programme avec le dev sur les tests unitaires, et participe au daily — la qualité est responsabilité de tous.`,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Tester tout au long du SDLC",
    duration: "130 min",
    keywords: [
      "tests d'acceptation", "tests de composants", "tests de régression",
      "shift-left", "DevOps", "niveau de test", "type de test",
    ],
    description: "Intégration du test dans le cycle de vie, niveaux et types de test, maintenance.",
    sections: [
      {
        id: "2-1",
        title: "Test et cycle de vie du développement",
        content: `Le SDLC impacte : périmètre/calendrier, documentation, techniques, automatisation, rôles du testeur.

Modèles séquentiels (cascade, V) : tests dynamiques tardifs.
Modèles itératifs/incrémentaux : tests à chaque itération, régression poussée.
Agile : documentation légère, automatisation, techniques basées sur l'expérience.

Approches pilotées par les tests :
- TDD : tests unitaires d'abord, puis code, puis refactoring
- ATDD : tests d'acceptation avant le développement
- BDD : Given/When/Then en langage naturel

DevOps : synergie dev/test/ops, CI/CD, feedback rapide, automatisation.
Shift-left : tester plus tôt dans le SDLC (revues, tests avant code, CI).
Rétrospectives : amélioration continue, leçons apprises documentées.`,
        examples: [
          {
            title: "TDD en pratique",
            content: `Fonction « calculerRemise(prix, clientVIP) » :
1. Écrire le test : VIP → 20 % de remise.
2. Écrire le code minimal pour passer le test.
3. Refactoriser (extraire constantes, nommer clairement).
4. Ajouter test : non-VIP → 0 % de remise.`,
          },
          {
            title: "BDD — Given/When/Then",
            content: `Etant donné un panier avec 3 articles
Lorsque l'utilisateur applique le code « PROMO10 »
Alors le total est réduit de 10 %

→ Ce scénario devient un test automatisé compréhensible par le métier.`,
          },
          {
            title: "Shift-left",
            content: `Au lieu d'attendre la fin du sprint pour tester : revue de la User Story dès le raffinage, cas de test rédigés avant le code, tests unitaires dans la CI à chaque commit.`,
          },
        ],
      },
      {
        id: "2-2",
        title: "Niveaux et types de test",
        content: `5 niveaux de test :
1. Tests de composants (unitaires) - composants isolés
2. Tests d'intégration de composants - interfaces entre composants
3. Tests système - système complet, fonctionnel et non fonctionnel
4. Tests d'intégration système - interfaces avec systèmes externes
5. Tests d'acceptation - validation, aptitudes au déploiement (UAT, alpha, bêta...)

4 types de test :
- Fonctionnel : "que fait le système ?"
- Non fonctionnel : "comment se comporte-t-il ?" (ISO 25010)
- Boîte noire : basé sur les spécifications
- Boîte blanche : basé sur la structure interne

Test de confirmation : vérifie qu'un défaut est corrigé.
Test de régression : vérifie qu'une modification n'a pas causé de régressions.`,
        highlights: [
          "Confirmation = défaut corrigé | Régression = pas d'effets négatifs",
        ],
        examples: [
          {
            title: "Les 5 niveaux de test",
            content: `Application de réservation hôtel :
• Composants : tester la fonction « calculerPrix(nuits, tarif) » isolément.
• Intégration composants : module Réservation + module Paiement communiquent bien.
• Système : parcours complet « rechercher → réserver → payer ».
• Intégration système : connexion à l'API du processeur de paiement externe.
• Acceptation : le responsable hôtel valide que le système répond à ses besoins (UAT).`,
          },
          {
            title: "Confirmation vs Régression",
            content: `Bug : le bouton « Valider » ne fonctionne pas sur mobile.
• Test de confirmation : retester le bouton sur mobile après le correctif → OK.
• Test de régression : retester aussi le bouton sur desktop et tablette → s'assurer qu'aucune autre vue n'est cassée.`,
          },
          {
            title: "Les 4 types de test",
            content: `Fonction « Connexion » :
• Fonctionnel : avec login/mot de passe valides → accès au tableau de bord.
• Non fonctionnel : 500 connexions simultanées → temps de réponse < 2 s.
• Boîte noire : tester depuis la spec (champs obligatoires, messages d'erreur) sans lire le code.
• Boîte blanche : vérifier que chaque branche du if/else du contrôleur d'auth est exécutée.`,
          },
        ],
      },
      {
        id: "2-3",
        title: "Test de maintenance",
        content: `Maintenance : corrective, adaptative, perfective (ISO 14764).

Déclencheurs : modifications planifiées, correctifs à chaud, migrations d'environnement, retrait de système.

Le périmètre dépend du risque, de la taille du système et de l'ampleur des modifications.`,
        examples: [
          {
            title: "Types de maintenance",
            content: `• Corrective : hotfix urgent — faille de sécurité patchée en production.
• Adaptative : migration de Java 11 vers Java 17.
• Perfective : ajout d'un filtre de recherche avancée.`,
          },
          {
            title: "Périmètre de test de maintenance",
            content: `Changement mineur (couleur d'un bouton) → tests de régression ciblés sur l'UI.
Changement majeur (refonte du moteur de recherche) → tests complets + non-régression sur les modules liés.`,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Test statique",
    duration: "80 min",
    keywords: [
      "anomalie", "revue", "inspection", "analyse statique", "test statique",
    ],
    description: "Revues, analyse statique et processus de feedback.",
    sections: [
      {
        id: "3-1",
        title: "Bases du test statique",
        content: `Le test statique n'exécute pas le logiciel. Il utilise des revues manuelles ou des outils d'analyse statique.

Valeur : détection précoce, défauts non détectables dynamiquement (code inaccessible, lacunes de couverture), évaluation de la qualité documentaire.

Différences avec le test dynamique :
- Statique constate directement les défauts ; dynamique provoque des défaillances
- Statique applicable aux produits non exécutables
- Dynamique mesure les caractéristiques dépendant de l'exécution`,
        examples: [
          {
            title: "Revue de spec (statique)",
            content: `Spec : « L'utilisateur peut commander entre 1 et 10 articles. »
Un réviseur note : « Que se passe-t-il pour 0 article ? Et pour 11 ? » → ambiguïté détectée sans exécuter le logiciel.`,
          },
          {
            title: "Analyse statique de code",
            content: `SonarQube signale : « Variable non utilisée », « Code inaccessible après return », « Complexité cyclomatique > 15 ». Aucune exécution nécessaire.`,
          },
          {
            title: "Défaut trouvé uniquement en statique",
            content: `Une exigence REQ-15 n'a aucun cas de test associé — détecté lors d'une revue de traçabilité, pas lors de l'exécution des tests existants.`,
          },
        ],
      },
      {
        id: "3-2",
        title: "Processus de revue",
        content: `Activités du processus de revue (ISO 20246) :
1. Planification (périmètre, objectif, critères de sortie)
2. Lancement (accès, rôles, responsabilités)
3. Revue individuelle (anomalies, recommandations)
4. Communication et analyse (décisions, statut)
5. Correction et rapport

Rôles : Manager, Auteur, Modérateur, Scribe, Réviseur, Responsable de la revue.

Types de revues (formalité croissante) :
- Informelle : pas de processus défini
- Relecture technique : menée par l'auteur
- Revue technique : réviseurs qualifiés + modérateur
- Inspection : la plus formelle, métriques collectées, auteur ≠ réviseur

Facteurs de réussite : objectifs clairs, type adapté, petits groupes, feedback, temps de préparation, soutien management.`,
        examples: [
          {
            title: "Les 5 activités du processus de revue",
            content: `Revue d'un plan de test :
1. Planification : objectif = vérifier la couverture des exigences, critère de sortie = 0 ambiguïté majeure.
2. Lancement : envoi du document aux 3 réviseurs, rôles assignés.
3. Revue individuelle : chaque réviseur note ses anomalies sur 2 jours.
4. Communication : réunion de 1h30 pour trancher sur les 12 anomalies.
5. Correction : l'auteur met à jour le plan, rapport de revue archivé.`,
          },
          {
            title: "Les 4 types de revues",
            content: `Même document de spec :
• Informelle : échange rapide au café, 15 min.
• Relecture technique : l'auteur présente son doc à 2 collègues, discussion ouverte.
• Revue technique : modérateur anime, réviseurs préparés, décisions formalisées.
• Inspection : processus strict, métriques collectées, l'auteur ne peut pas être réviseur ni scribe.`,
          },
          {
            title: "Rôles en action",
            content: `Revue d'une spec de 30 pages :
• Manager : alloue 2 jours et 3 réviseurs.
• Modérateur : anime la réunion de 2h, gère le temps.
• Scribe : note les 8 anomalies trouvées.
• Auteur : corrige le document après la revue.`,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Analyse et conception des tests",
    duration: "390 min",
    keywords: [
      "partitions d'équivalence", "analyse des valeurs limites", "table de décision",
      "transition d'état", "couverture des instructions", "couverture des branches",
      "test exploratoire", "ATDD", "critères d'acceptation",
    ],
    description: "Techniques boîte noire, boîte blanche, basées sur l'expérience et collaboration.",
    sections: [
      {
        id: "4-1",
        title: "Aperçu des techniques",
        content: `3 catégories :
- Boîte noire (spécifications) : indépendantes de l'implémentation
- Boîte blanche (structure) : dépendantes du code/design
- Basées sur l'expérience : connaissances et intuition du testeur

Les techniques basées sur l'expérience complètent boîte noire et blanche.`,
        examples: [
          {
            title: "Quelle technique choisir ?",
            content: `Formulaire d'inscription avec champ « âge » (spec disponible) :
• Boîte noire : partitions d'équivalence (0-17, 18-120, >120) + BVA.
• Boîte blanche : couverture des branches du if/else dans le code.
• Expérience : le testeur sait que les devs oublient souvent les valeurs négatives → teste « -1 ».`,
          },
        ],
      },
      {
        id: "4-2",
        title: "Techniques boîte noire",
        content: `Partitions d'équivalence : diviser les données en partitions traitées de la même manière. Un test par partition suffit. Partitions valides et invalides.

Analyse des valeurs limites : tester les limites des partitions ordonnées. Technique 2 valeurs (limite + voisin adjacent) ou 3 valeurs (limite + 2 voisins).

Tables de décision : conditions → actions. Notation : V/F/- pour conditions, X/blanc pour actions. Couverture = toutes les colonnes réalisables.

Transition d'état : états, transitions, événements, gardes, actions. Couvertures : tous les états, transitions valides (0-switch), toutes les transitions.`,
        highlights: [
          "BVA 3 valeurs plus rigoureuse que 2 valeurs",
          "Couverture transitions valides > couverture tous les états",
        ],
        examples: [
          {
            title: "Partitions d'équivalence",
            content: `Champ « note » accepte 0 à 20 :
• Partition valide : [0–20] → tester 10
• Partition invalide basse : [<0] → tester -1
• Partition invalide haute : [>20] → tester 21
→ 3 tests suffisent (1 par partition).`,
          },
          {
            title: "Analyse des valeurs limites (3 valeurs)",
            content: `Limite supérieure = 20. BVA 3 valeurs teste : 19, 20, 21.
Si le dev a écrit « if (note = 20) » au lieu de « <= 20 », seul 19 le détectera.`,
          },
          {
            title: "Table de décision",
            content: `Remise client : VIP ET commande > 100 € → 20 % de remise.
| VIP | >100€ | Remise |
|  V  |   V   |  20 %  |
|  V  |   F   |   0 %  |
|  F  |   V   |  10 %  |
|  F  |   F   |   0 %  |
→ 1 cas de test par colonne.`,
          },
          {
            title: "Transition d'état — Distributeur",
            content: `États : Attente → Sélection → Paiement → Distribution.
Événement « insérer pièce » en Attente → passe à Sélection.
Couverture transitions valides = tester chaque flèche du diagramme au moins une fois.`,
          },
        ],
      },
      {
        id: "4-3",
        title: "Techniques boîte blanche",
        content: `Test des instructions : couverture = instructions exécutées / total. 100% instructions ≠ toute la logique testée.

Test des branches : couverture = branches exercées / total. Branches conditionnelles (if, switch, boucles).

Couverture branches ⊃ couverture instructions (mais pas l'inverse).

Valeur : détecte défauts même si specs vagues. Faiblesse : ne détecte pas les exigences manquantes.`,
        examples: [
          {
            title: "Couverture des instructions",
            content: `Code :
if (x > 0) { a(); } else { b(); }
Test 1 (x=5) : exécute a() → 66 % instructions.
Test 2 (x=-1) : exécute b() → 100 % instructions.`,
          },
          {
            title: "Couverture branches > instructions",
            content: `100 % instructions mais branche « else » jamais testée avec x=0 exactement → un bug sur x=0 peut passer inaperçu. La couverture branches force à tester les deux chemins.`,
          },
          {
            title: "Limite boîte blanche",
            content: `Le code calcule bien une remise, mais la spec oubliait de prévoir les clients VIP → boîte blanche ne détectera pas cette exigence manquante. Il faut aussi du boîte noire.`,
          },
        ],
      },
      {
        id: "4-4",
        title: "Techniques basées sur l'expérience",
        content: `Estimation d'erreurs : anticiper erreurs/défauts/défaillances basé sur l'expérience. Attaques de fautes = approche méthodique.

Test exploratoire : conception, exécution et évaluation simultanées. Sessions avec charte de test et débriefing.

Test basé sur checklists : conditions vérifiées via liste. Mettre à jour régulièrement selon l'analyse des défauts.`,
        examples: [
          {
            title: "Estimation d'erreurs",
            content: `Le testeur sait que les champs date sont souvent mal gérés → teste systématiquement : 29/02, 31/04, format US vs EU, fuseau horaire.`,
          },
          {
            title: "Test exploratoire",
            content: `Charte : « Explorer la fonction panier pendant 90 min, focus sur les cas limites. »
Le testeur découvre en jouant qu'on peut ajouter -1 article → bug non prévu dans les cas de test formels.`,
          },
          {
            title: "Checklist utilisabilité (Nielsen)",
            content: `☐ L'utilisateur sait-il toujours où il se trouve ?
☐ Peut-il annuler facilement une action ?
☐ Les messages d'erreur sont-ils clairs ?`,
          },
        ],
      },
      {
        id: "4-5",
        title: "Tests basés sur la collaboration",
        content: `User Stories - 3 C : Carte, Conversation, Confirmation. Format INVEST.

Critères d'acceptation : conditions pour accepter une User Story. Formats : orienté-scénario (Given/When/Then) ou orienté-règles.

ATDD : cas de test créés avant l'implémentation, basés sur critères d'acceptation. Atelier de spécification → cas positifs → cas négatifs → aspects non fonctionnels.`,
        examples: [
          {
            title: "User Story INVEST",
            content: `« En tant que client, je veux réinitialiser mon mot de passe afin de retrouver l'accès à mon compte. »
• Indépendante, Négociable, apporte de la Valeur, Estimable, Petite, Testable.`,
          },
          {
            title: "Critères d'acceptation (Given/When/Then)",
            content: `Etant donné un compte existant avec email valide
Lorsque l'utilisateur clique « Mot de passe oublié » et saisit son email
Alors un email de réinitialisation est envoyé sous 60 secondes`,
          },
          {
            title: "ATDD — Atelier",
            content: `PO + Dev + Testeur définissent ensemble :
1. Cas positif : email valide → lien reçu.
2. Cas négatif : email inconnu → message d'erreur générique (sécurité).
3. Cas limite : email mal formé → validation côté client.
→ Ces exemples deviennent les tests avant le code.`,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Gestion des activités de test",
    duration: "335 min",
    keywords: [
      "plan de test", "critères d'entrée", "critères de sortie", "risque",
      "pyramide des tests", "quadrants de tests", "rapport de défaut",
    ],
    description: "Planification, gestion des risques, pilotage, configuration et défauts.",
    sections: [
      {
        id: "5-1",
        title: "Planification des tests",
        content: `Plan de test : objectifs, ressources, calendrier, approche, risques, critères entrée/sortie.

Critères d'entrée : préconditions (ressources, testware, qualité initiale).
Critères de sortie : conditions d'achèvement (couverture, défauts, exécution).
Agile : Definition of Done (sortie), Definition of Ready (entrée).

Estimation : ratio, extrapolation, Delphi large bande (planning poker), trois points E=(a+4m+b)/6.

Priorisation : basée risques, couverture, ou exigences.

Pyramide des tests : beaucoup de tests bas (rapides, isolés), peu de tests haut (lents, intégrés).

Quadrants (Marick) :
- Q1 : techno, soutien équipe (composants, CI)
- Q2 : métier, soutien équipe (fonctionnel, ATDD)
- Q3 : métier, critique produit (exploratoire, UAT)
- Q4 : techno, critique produit (smoke, non fonctionnel)`,
        examples: [
          {
            title: "Critères d'entrée / sortie",
            content: `Entrée (tests système) : environnement prêt, smoke tests OK, specs gelées.
Sortie (Definition of Done) : 95 % exigences couvertes, 0 bug bloquant, tests de régression passés.`,
          },
          {
            title: "Estimation 3 points",
            content: `Tester le module Paiement :
• Optimiste (a) = 6 h, Probable (m) = 9 h, Pessimiste (b) = 18 h
• E = (6 + 4×9 + 18) / 6 = 10 h ± 2 h`,
          },
          {
            title: "Pyramide des tests",
            content: `• Base : 500 tests unitaires (rapides, < 1 min total).
• Milieu : 80 tests d'intégration API.
• Sommet : 10 tests E2E Selenium (lents, ~30 min).`,
          },
          {
            title: "Quadrants Marick",
            content: `Q1 : tests JUnit dans la CI (techno, soutien équipe).
Q2 : tests d'acceptation ATDD (métier, soutien).
Q3 : session exploratoire UAT avec le client (métier, critique).
Q4 : tests de charge JMeter (techno, critique).`,
          },
        ],
      },
      {
        id: "5-2",
        title: "Gestion des risques",
        content: `Risque = probabilité × impact.

Risques projet : organisation, humains, techniques, fournisseurs.
Risques produit : qualité (ISO 25010) - fonctionnalités, performance, sécurité...

Analyse : identification + évaluation (quantitative ou matrice qualitative).
Test basé sur les risques : activités sélectionnées selon l'analyse.

Atténuation par tests : bons testeurs, indépendance, revues, techniques adaptées, régression.`,
        examples: [
          {
            title: "Risque projet vs produit",
            content: `• Risque projet : le fournisseur cloud change ses tarifs → retard budget.
• Risque produit : module auth sans chiffrement → faille sécurité → impact utilisateurs.`,
          },
          {
            title: "Matrice de risque",
            content: `Paiement en ligne : Probabilité = Élevée, Impact = Critique → Niveau = Très élevé
→ Actions : tests sécurité poussés, pentest, revue code, tests de charge.`,
          },
          {
            title: "Test basé sur les risques",
            content: `Peu de temps avant release → on teste en priorité les zones à haut risque (paiement, données perso) et on réduit les tests sur l'aide contextuelle (faible risque).`,
          },
        ],
      },
      {
        id: "5-3",
        title: "Pilotage, contrôle et clôture",
        content: `Pilotage : collecte d'informations (métriques).
Contrôle : directives correctives basées sur le pilotage.
Clôture : consolidation expérience, testware, rapport de clôture.

Métriques : avancement projet/tests, qualité produit, défauts, risques, couverture, coûts.

Rapports d'avancement : réguliers, progression, obstacles, métriques.
Rapport de clôture : résumé, évaluation, écarts, leçons apprises.`,
        examples: [
          {
            title: "Métriques en action",
            content: `Rapport hebdo : 120/200 cas exécutés (60 %), 8 bugs ouverts (3 bloquants), couverture code 78 %, risque résiduel « moyen » sur le module Export.`,
          },
          {
            title: "Directive de contrôle",
            content: `Pilotage : seulement 40 % des tests exécutés à J-3.
Contrôle : ajouter 1 testeur, reprioriser sur les cas liés aux bugs bloquants, reporter la release de 2 jours.`,
          },
        ],
      },
      {
        id: "5-4",
        title: "Gestion de configuration",
        content: `Identifie, contrôle et suit les éléments de test (plans, cas, scripts, résultats...).

Base de référence : version approuvée, modifications via contrôle formel.
Permet la traçabilité et la reproductibilité des tests.`,
        examples: [
          {
            title: "Base de référence",
            content: `Suite v2.3 approuvée pour la release → tag Git « test-baseline-v2.3 ». Toute modification de cas de test passe par une demande de changement.`,
          },
          {
            title: "Reproductibilité",
            content: `Un bug apparaît en v2.3 mais pas en v2.2 → on restaure l'environnement et les scripts v2.2 pour comparer et isoler la cause.`,
          },
        ],
      },
      {
        id: "5-5",
        title: "Gestion des défauts",
        content: `Workflow : enregistrement → analyse/classification → responsabilité → clôture.

Rapport de défaut typique :
- ID unique, titre, date, auteur
- Objet/environnement de test
- Étapes de reproduction, résultats attendus/réels
- Sévérité, priorité, statut (ouvert, fermé, différé...)
- Références au cas de test`,
        examples: [
          {
            title: "Rapport de défaut complet",
            content: `BUG-247 | Titre : Crash au login avec email vide
Sévérité : Majeur | Priorité : Haute | Statut : Ouvert
Étapes : 1. Ouvrir /login 2. Laisser email vide 3. Cliquer Connexion
Attendu : message « Email requis » | Obtenu : erreur 500
Réf : CT-03 | Env : Chrome 120, Windows 11`,
          },
          {
            title: "Workflow",
            content: `Ouvert → Assigné au dev → Corrigé → Test de confirmation → Fermé
Si le test de confirmation échoue → Ré-ouvert`,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Outils de test",
    duration: "20 min",
    keywords: ["automatisation des tests"],
    description: "Types d'outils et avantages/risques de l'automatisation.",
    sections: [
      {
        id: "6-1",
        title: "Outils pour soutenir les tests",
        content: `Types d'outils :
- Gestion (exigences, tests, défauts, configuration)
- Test statique (revues, analyse)
- Conception/implémentation (génération cas de test, données)
- Exécution et couverture (automatisation, mesure)
- Tests non fonctionnels
- DevOps (CI/CD, pipeline)
- Collaboration
- Déploiement (VM, conteneurs)`,
        examples: [
          {
            title: "Outils par activité",
            content: `• Jira : gestion des bugs et exigences.
• SonarQube : analyse statique du code.
• Postman : conception et exécution de tests API.
• Jenkins + Selenium : CI/CD avec tests automatisés E2E.
• JMeter : tests de performance.`,
          },
        ],
      },
      {
        id: "6-2",
        title: "Automatisation : avantages et risques",
        content: `Avantages :
- Gain de temps (régression, données répétitives)
- Cohérence et répétabilité
- Mesures objectives (couverture)
- Reporting facilité
- Détection plus précoce des défauts

Risques :
- Attentes irréalistes
- Estimations inexactes (intro, maintenance)
- Outil inadapté vs tests manuels
- Dépendance excessive à l'outil
- Dépendance au fournisseur
- Logiciel libre abandonné
- Incompatibilité plateforme
- Non-conformité réglementaire`,
        examples: [
          {
            title: "Avantage — Régression automatisée",
            content: `500 cas de régression exécutés en 20 min chaque nuit au lieu de 3 jours manuels. Bug détecté le lendemain du commit fautif.`,
          },
          {
            title: "Risque — Attentes irréalistes",
            content: `L'équipe achète un outil « tout-en-un » en pensant qu'il remplacera 100 % des tests manuels. Résultat : 6 mois de setup, scripts fragiles, abandon partiel.`,
          },
          {
            title: "Risque — Outil inadapté",
            content: `Utiliser Selenium pour tester l'UX et le design visuel → tests instables et peu fiables. Des tests manuels exploratoires seraient plus appropriés.`,
          },
        ],
      },
    ],
  },
];

export const EXAM_CONFIG = {
  questionCount: 40,
  durationMinutes: 60,
  passThreshold: 0.65,
  passScore: 26,
};

export function getChapterById(id: number): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getSectionsCountMap(): Record<number, number> {
  return Object.fromEntries(chapters.map((c) => [c.id, c.sections.length]));
}
