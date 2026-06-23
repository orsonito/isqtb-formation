import AppShell from "@/components/app-shell/app-shell";
import Button from "@/components/ui/button";
import { chapters, getSectionsCountMap } from "@/lib/data/chapters";
import HomeClient from "./home-client";

export default function Home() {
  const sectionsMap = getSectionsCountMap();

  return (
    <AppShell>
      <div className="space-y-8">
        <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/5 p-8">
          <p className="mb-2 text-sm font-medium text-primary">ISTQB CTFL v4.0</p>
          <h1 className="text-3xl font-bold tracking-tight">
            Formation Testeur Certifié Niveau Fondation
          </h1>
          <p className="mt-3 max-w-2xl text-muted leading-relaxed">
            Parcours complet basé sur le syllabus officiel ISTQB. Étudiez les 6 chapitres,
            révisez avec les fiches mémo, validez chaque chapitre par un quiz, puis passez
            l&apos;examen blanc de certification.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/chapitre/1" variant="primary" size="lg">
              Commencer la formation
            </Button>
            <Button href="/examen" variant="accent" size="lg">
              Examen blanc →
            </Button>
          </div>
        </section>

        <HomeClient sectionsMap={sectionsMap} chapterCount={chapters.length} />

        <section>
          <h2 className="mb-4 text-xl font-semibold">Chapitres du syllabus</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {chapters.map((chapter) => (
              <Button
                key={chapter.id}
                href={`/chapitre/${chapter.id}`}
                variant="secondary"
                size="lg"
                className="!h-auto !flex-col !items-start !gap-2 !p-5 !text-left"
              >
                <div className="flex w-full items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
                    {chapter.id}
                  </span>
                  <span className="text-xs font-normal text-muted">{chapter.duration}</span>
                </div>
                <span className="text-base font-semibold">{chapter.title}</span>
                <span className="text-sm font-normal text-muted line-clamp-2">
                  {chapter.description}
                </span>
                <span className="text-xs font-normal text-muted">
                  {chapter.sections.length} leçons · Fiches · Quiz
                </span>
              </Button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 p-8 text-center">
          <h2 className="text-xl font-bold">Prêt pour l&apos;examen officiel ?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
            40 questions · 60 minutes · Seuil 65%
          </p>
          <Button href="/examen" variant="accent" size="xl" className="mt-6">
            Démarrer l&apos;examen blanc
          </Button>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-3 font-semibold">Format de l&apos;examen officiel</h2>
          <ul className="grid gap-2 text-sm text-muted sm:grid-cols-2">
            <li>40 questions à choix multiples</li>
            <li>60 minutes</li>
            <li>Seuil de réussite : 65% (26/40)</li>
            <li>Syllabus v4.0 — 6 chapitres examinables</li>
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
