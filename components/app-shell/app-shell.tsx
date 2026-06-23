import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
            <Image
              src="/icon-192.png"
              alt="ISTQB CTFL"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg shadow-md shadow-primary/30"
              priority
            />
            <span className="hidden sm:inline">ISTQB Foundation</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button href="/" variant="ghost" size="md">
              Formation
            </Button>
            <Button href="/examen" variant="accent" size="md">
              Examen blanc
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
      <footer className="border-t border-border py-4 text-center text-xs text-muted">
        Basé sur le syllabus ISTQB CTFL v4.0 FR — © ISTQB / CFTL
      </footer>
    </div>
  );
}
