'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Img from '@/components/Img';
import { VIDEOS } from '@/data/videos';

export default function VideoLibrary() {
  const [active, setActive] = useState<{ src: string; title: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.removeAttribute('src');
    }
    setActive(null);
    document.body.style.overflow = '';
  }, []);

  const open = (src: string, title: string) => {
    setActive({ src, title });
    document.body.style.overflow = 'hidden';
  };

  // Escape closes the modal (ported from main.js).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && active) close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, close]);

  // Load the source when a video becomes active.
  useEffect(() => {
    if (active && videoRef.current) {
      videoRef.current.setAttribute('src', active.src);
      videoRef.current.load();
    }
  }, [active]);

  return (
    <>
      <section className="section reveal">
        <div className="container">
          <div className="video-grid" data-stagger>
            {VIDEOS.map((v) => (
              <article
                className="video-card"
                key={v.src}
                style={{ cursor: 'pointer' }}
                onClick={() => open(v.src, v.title)}
              >
                <div className="video-card__thumb">
                  <Img
                    src={v.thumb}
                    alt={`${v.title} video thumbnail`}
                    sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 400px"
                  />
                  <div className="video-card__play" aria-hidden="true"></div>
                </div>
                <div className="video-card__body">
                  <h3 className="video-card__title">{v.title}</h3>
                  <p className="video-card__desc">{v.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="modal-overlay"
          style={{ display: 'flex' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="modal modal--video">
            <button className="modal__close" aria-label="Close" onClick={close}>
              &times;
            </button>
            <h3 className="modal__title">{active.title}</h3>
            <video ref={videoRef} controls preload="metadata" playsInline>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
