import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";

/** Minimal header for secondary pages. */
export function SimpleHeader() {
  return (
    <header className="border-b border-border bg-cream">
      <div className="container-page flex h-[4.5rem] items-center justify-between">
        <Link href="/" aria-label="Elstom — на главную" className="rounded-sm">
          <Logo />
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-ink hover:text-teal">
          <ArrowLeft className="size-4" aria-hidden />
          На главную
        </Link>
      </div>
    </header>
  );
}
