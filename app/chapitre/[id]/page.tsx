import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/app-shell/app-shell";
import Button from "@/components/ui/button";
import { chapters, getChapterById } from "@/lib/data/chapters";
import ChapterClient from "./chapter-client";

export function generateStaticParams() {
  return chapters.map((c) => ({ id: String(c.id) }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapterId = parseInt(id, 10);
  const chapter = getChapterById(chapterId);

  if (!chapter) notFound();

  const prev = getChapterById(chapterId - 1);
  const next = getChapterById(chapterId + 1);

  return (
    <AppShell>
      <div className="space-y-6">
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            Formation
          </Link>
          <span className="mx-2">/</span>
          <span>Chapitre {chapter.id}</span>
        </nav>

        <header>
          <p className="text-sm font-medium text-primary">
            Chapitre {chapter.id} · {chapter.duration}
          </p>
          <h1 className="mt-1 text-2xl font-bold">{chapter.title}</h1>
          <p className="mt-2 text-muted">{chapter.description}</p>
        </header>

        <div className="flex flex-wrap gap-2">
          {chapter.keywords.slice(0, 8).map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
            >
              {kw}
            </span>
          ))}
          {chapter.keywords.length > 8 && (
            <span className="rounded-full bg-border px-3 py-1 text-xs text-muted">
              +{chapter.keywords.length - 8}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            href={`/chapitre/${chapter.id}/fiches`}
            variant="accent"
            size="lg"
          >
            Fiches à retenir
          </Button>
          <Button
            href={`/chapitre/${chapter.id}/quiz`}
            variant="primary"
            size="lg"
          >
            Quiz du chapitre
          </Button>
        </div>

        <ChapterClient chapter={chapter} />

        <nav className="flex justify-between border-t border-border pt-6">
          {prev ? (
            <Button href={`/chapitre/${prev.id}`} variant="ghost" size="md">
              ← Ch. {prev.id} : {prev.title}
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button href={`/chapitre/${next.id}`} variant="ghost" size="md">
              Ch. {next.id} : {next.title} →
            </Button>
          ) : (
            <Button href="/examen" variant="accent" size="lg">
              Passer l&apos;examen blanc →
            </Button>
          )}
        </nav>
      </div>
    </AppShell>
  );
}
