"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { Armchair, Camera, ChevronLeft, ChevronRight, DoorOpen, Microscope, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gallery, type GalleryCategory, type GalleryItem } from "@/data/images";
import { SectionHeading } from "@/components/ui/section-heading";

const categoryIcons: Record<GalleryCategory, typeof Camera> = {
  interior: Armchair,
  reception: DoorOpen,
  rooms: Armchair,
  equipment: Microscope,
  team: Users,
};

/** Neutral stand-in until a real clinic photo is added in `data/images.ts`. */
function PhotoPlaceholder({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  const Icon = categoryIcons[item.category] ?? Camera;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,var(--mist),#e7ecea)] p-4 text-center">
      <Icon className={cn("text-ink/25", large ? "size-16" : "size-9")} strokeWidth={1.2} aria-hidden />
      <span className={cn("font-medium text-ink/70", large ? "text-lg" : "text-sm")}>{item.title}</span>
      <span className="text-xs text-muted-foreground">Фото скоро появится</span>
    </div>
  );
}

function GalleryMedia({ item, large = false, sizes }: { item: GalleryItem; large?: boolean; sizes: string }) {
  if (!item.photo) return <PhotoPlaceholder item={item} large={large} />;
  return (
    <Image
      src={item.photo.src}
      alt={item.photo.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      className={large ? "object-contain" : "object-cover transition-transform duration-500 group-hover:scale-[1.03]"}
    />
  );
}

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = index !== null ? gallery[index] : null;

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length)),
    []
  );

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-mist py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="gallery-title"
          eyebrow="Галерея"
          title="Пространство клиники"
          subtitle="Интерьер, кабинеты и оборудование клиники Elstom."
        />

        <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <li key={item.id} className={cn(i === 0 && "col-span-2 row-span-2")}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block size-full overflow-hidden rounded-lg border border-border bg-white text-left focus-visible:ring-3 focus-visible:ring-ring/35"
                aria-label={`Открыть: ${item.title}`}
              >
                <GalleryMedia
                  item={item}
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/90 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            className="fixed inset-0 z-50 flex flex-col outline-none transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
          >
            {current && (
              <>
                <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
                  <Dialog.Title className="text-sm font-medium sm:text-base">
                    {current.title}
                    <span className="ml-3 text-white/50 tabular-nums">
                      {index! + 1} / {gallery.length}
                    </span>
                  </Dialog.Title>
                  <Dialog.Close
                    className="grid size-11 place-items-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-aqua/60 focus-visible:outline-none"
                    aria-label="Закрыть галерею"
                  >
                    <X className="size-6" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Используйте стрелки влево и вправо для перехода между фотографиями, Escape — чтобы закрыть.
                </Dialog.Description>

                <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-20">
                  <div className="relative size-full max-h-[80vh] max-w-5xl overflow-hidden rounded-lg">
                    <GalleryMedia item={current} large sizes="(min-width: 1024px) 64rem, 100vw" />
                  </div>

                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Предыдущее фото"
                        className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-aqua/60 focus-visible:outline-none sm:left-5"
                      >
                        <ChevronLeft className="size-6" />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Следующее фото"
                        className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-aqua/60 focus-visible:outline-none sm:right-5"
                      >
                        <ChevronRight className="size-6" />
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
