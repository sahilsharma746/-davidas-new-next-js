import type { Metadata } from 'next';
import VideoLibrary from '@/components/VideoLibrary';
import { VIDEOS } from '@/data/videos';
import JsonLd from '@/components/JsonLd';
import { videoListJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Video Library — Greensboro, NC',
  description:
    'Davidas Design Concepts — Video library. Watch our jewelry design, CAD, repair, engraving, wax carving, and digitizing videos.',
  alternates: { canonical: '/videos' },
};

// Ported from videos.html
export default function VideosPage() {
  return (
    <>
      <header className="category-header reveal">
        <div className="container">
          <h1 className="section__title">Video Library</h1>
        </div>
      </header>
      <VideoLibrary />
      <JsonLd data={videoListJsonLd(VIDEOS)} />
    </>
  );
}
