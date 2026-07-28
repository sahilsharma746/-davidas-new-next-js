'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export default function HomeVideo() {
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => {
    const v = videoRef.current;
    if (v) v.pause();
    setExpanded(false);
    document.body.style.overflow = '';
  }, []);

  const open = () => {
    setExpanded(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      videoRef.current?.play();
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expanded) close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [expanded, close]);

  return (
    <>
      <section className="section section--alt home-video-section reveal">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">See Our Work</span>
            <h2 className="section__title">Jewelry Repair</h2>
            <p className="section__desc">
              Watch how we bring damaged and worn jewelry back to life with expert craftsmanship.
            </p>
          </div>
          <div className="home-video">
            <button
              className="home-video__player"
              onClick={open}
              aria-label="Play jewelry repair video"
            >
              <video
                src="/video-files/Jewelry-Repair-Ad.mp4"
                muted
                playsInline
                preload="metadata"
                className="home-video__preview"
              />
              <div className="home-video__play-icon" aria-hidden="true">&#9654;</div>
              <span className="home-video__label">Click to Watch</span>
            </button>
          </div>
        </div>
      </section>

      {expanded && (
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
            <h3 className="modal__title">Jewelry Repair</h3>
            <video
              ref={videoRef}
              src="/video-files/Jewelry-Repair-Ad.mp4"
              controls
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
