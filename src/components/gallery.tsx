import Image from "next/image";
import type { GalleryImage } from "@/lib/types";

export function Gallery({
  images,
  priority = false,
}: {
  images: GalleryImage[];
  priority?: boolean;
}) {
  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div
            key={image.src}
            className="relative aspect-[16/9] w-11/12 shrink-0 snap-center overflow-hidden rounded-xl border border-border sm:w-3/5"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 92vw, 60vw"
              className="object-cover"
              priority={priority && index === 0}
            />
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        Geser atau scroll untuk melihat {images.length} gambar.
      </p>
    </>
  );
}