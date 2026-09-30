import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SimpleHeader } from "@/components/layout/SimpleHeader";

export default function NotFound() {
  return (
    <>
      <SimpleHeader />
      <main id="main" className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="eyebrow">Ошибка 404</p>
        <h1 className="heading-display mt-4 text-5xl sm:text-6xl">Страница не найдена</h1>
        <p className="mt-5 max-w-md text-muted-foreground">Возможно, ссылка устарела или была введена с ошибкой.</p>
        <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-8`}>
          На главную
        </Link>
      </main>
    </>
  );
}
