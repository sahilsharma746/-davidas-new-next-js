'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Ported from videos.html + main.js video-modal logic.
const VIDEOS = [
  { src: '/video-files/Cad-new.mp4', title: 'CAD Design', desc: 'Designing a ring on computer', thumb: '/images/Video_Thumbs/CAD.png' },
  { src: '/video-files/Jewelry-Repair-new.mp4', title: 'Jewelry Repair', desc: 'Expert repair techniques', thumb: '/images/Video_Thumbs/Jewelry%20Repair.png' },
  { src: '/video-files/Laser-Engraving.mp4', title: 'Laser Engraving', desc: 'Precision laser engraving', thumb: '/images/Video_Thumbs/Laser%20Engraving.jpg' },
  { src: '/video-files/5-Axis-Milling.mp4', title: '5 Axis Milling', desc: '5 axis milling process', thumb: '/images/Video_Thumbs/5%20Axis.jpg' },
  { src: '/video-files/Wax-Carving-new.mp4', title: 'Wax Carving', desc: 'Hand-carved wax models', thumb: '/images/Video_Thumbs/Wax%20Carving.jpg' },
  { src: '/video-files/Digitizing-new.mp4', title: 'Digitizing', desc: 'Logo digitizing process', thumb: '/images/Video_Thumbs/Digitizing.jpg' },
];

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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.thumb} alt={`${v.title} video thumbnail`} loading="lazy" />
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
