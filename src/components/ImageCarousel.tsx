"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { ExperienceImage } from "@/lib/data";
import styles from "./ImageCarousel.module.css";

const GAP = 12;

interface ImageCarouselProps {
  images: ExperienceImage[];
  label: string;
}

export default function ImageCarousel({ images, label }: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const single = images.length === 1;

  const cardStep = () => {
    const card = trackRef.current?.querySelector(`.${styles.card}`);
    return ((card as HTMLElement | null)?.offsetWidth ?? 0) + GAP;
  };

  const updateIndex = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardStep();
    if (!step) return;
    setIndex(
      Math.min(
        images.length - 1,
        Math.max(0, Math.round(track.scrollLeft / step))
      )
    );
  };

  const current = images[index] ?? images[0];

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className={styles.frame}>
        <div ref={trackRef} className={styles.track} onScroll={updateIndex}>
          {images.map((img, i) => (
            <div
              key={`${img.caption}-${i}`}
              className={`${styles.card} ${single ? styles.single : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <ImageIcon
                size={24}
                strokeWidth={1.5}
                aria-hidden="true"
                className={styles.placeholderIcon}
              />
            </div>
          ))}
        </div>
      </div>
      <p className={styles.caption} aria-live="polite">
        Fig. {index + 1} — {current.caption}
      </p>
    </div>
  );
}
