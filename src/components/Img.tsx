import Image from 'next/image';
import DIMS from '@/data/imageDimensions.json';

const dimensions = DIMS as Record<string, { w: number; h: number }>;

interface ImgProps {
  src: string;
  alt: string;
  className?: string;
  /** Responsive sizes hint for srcset selection. */
  sizes?: string;
  /** Set true for above-the-fold / LCP images to preload them. */
  priority?: boolean;
  style?: React.CSSProperties;
}

/**
 * Drop-in replacement for <img> that routes through next/image for automatic
 * AVIF/WebP conversion, responsive srcset, and lazy loading — while the existing
 * CSS (max-width/height, object-fit, aspect-ratio containers) still controls
 * display. Intrinsic dimensions come from the build-time map so aspect ratio is
 * correct (no CLS). Falls back to a plain <img> if a size is unknown.
 */
export default function Img({ src, alt, className, sizes, priority, style }: ImgProps) {
  // Map keys are decoded paths (real spaces); incoming src may be %20-encoded.
  const key = decodeURIComponent(src);
  const dim = dimensions[key] || dimensions[src];

  if (!dim) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} style={style} loading={priority ? 'eager' : 'lazy'} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dim.w}
      height={dim.h}
      className={className}
      sizes={sizes || '100vw'}
      priority={priority}
      style={style}
    />
  );
}
