'use client'

import React from 'react'
import { basePath } from '@/lib/base-path'

const GALLERY_IMAGES = [
  { src: `${basePath}/images/festival-community.jpg`, alt: 'IFT community gathering' },
  { src: `${basePath}/images/team-bus.jpg`, alt: 'IFT team with sponsor bus' },
  { src: `${basePath}/images/festival-food.jpg`, alt: 'Festival food vendors' },
  { src: `${basePath}/images/festival-artisan.jpg`, alt: 'Local artisan at festival' },
  { src: `${basePath}/images/festival-crowd.jpg`, alt: 'Festival crowd' },
  { src: `${basePath}/images/team-group.jpg`, alt: 'IFT team group photo' },
]

// Duplicated for seamless infinite loop
const TRACK_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES]

export function GalleryStrip() {
  return (
    <section
      className="overflow-hidden py-10"
      style={{ background: 'var(--seafoam)' }}
      aria-label="Photo gallery"
    >
      <style>{`
        @keyframes galleryScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .gallery-track {
          animation: galleryScroll 30s linear infinite;
        }
        .gallery-strip-section:hover .gallery-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="gallery-strip-section overflow-hidden"
        onMouseEnter={(e) => {
          const track = e.currentTarget.querySelector<HTMLDivElement>('.gallery-track')
          if (track) track.style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          const track = e.currentTarget.querySelector<HTMLDivElement>('.gallery-track')
          if (track) track.style.animationPlayState = 'running'
        }}
      >
        <div
          className="gallery-track flex gap-5 w-max"
        >
          {TRACK_IMAGES.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="flex-shrink-0 object-cover rounded-xl"
              style={{ width: '320px', height: '220px' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
