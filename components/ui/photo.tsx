import Image, { type ImageProps } from "next/image";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

type PhotoProps = Omit<ImageProps, "src" | "alt"> & {
  image: SiteImage;
  frameClassName?: string;
};

/**
 * `next/image` in a positioned frame. Stock photos get a discreet
 * «Иллюстративное фото» label so they're never mistaken for the clinic.
 */
export function Photo({ image, frameClassName, className, ...props }: PhotoProps) {
  return (
    <figure className={cn("relative overflow-hidden bg-mist", frameClassName)}>
      <Image
        src={image.src}
        alt={image.alt}
        placeholder="blur"
        className={cn("size-full object-cover", className)}
        {...props}
      />
      {image.stock && (
        <figcaption className="absolute top-2.5 right-2.5 rounded-sm bg-ink/55 px-2 py-1 text-[0.65rem] font-medium tracking-wide text-white/90">
          Иллюстративное фото
        </figcaption>
      )}
    </figure>
  );
}
