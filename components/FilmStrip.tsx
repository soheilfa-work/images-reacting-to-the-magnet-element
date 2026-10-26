"use client";
import { images } from "@/assets/asset";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Frame = { y: number; scale: number; rotate: number };

type Preset = {
  id: string;
  label: string;
  frames: Frame[];
  background: string;
  gridColor: string;
  lineColor: string;
  menuColor: string;
  menuMuted: string;
};

const presets: Preset[] = [
  {
    id: "scatter",
    label: "Scatter",
    background: "#ffffff",
    gridColor: "#808080",
    lineColor: "#000000",
    menuColor: "#111111",
    menuMuted: "#888888",
    frames: [
      { y: -250, scale: 0.82, rotate: -4 },
      { y: 100, scale: 0.92, rotate: 2 },
      { y: -85, scale: 1.05, rotate: 3 },
      { y: 145, scale: 0.75, rotate: -2 },
      { y: -175, scale: 0.88, rotate: -3 },
      { y: 65, scale: 1.05, rotate: 4 },
      { y: -45, scale: 0.8, rotate: -1 },
      { y: 125, scale: 0.88, rotate: 2 },
      { y: -115, scale: 1.02, rotate: -4 },
      { y: 85, scale: 0.82, rotate: 3 },
      { y: -65, scale: 0.92, rotate: 1 },
      { y: 250, scale: 0.76, rotate: -3 },
    ],
  },
  {
    id: "wave",
    label: "Wave",
    background: "#dce8f0",
    gridColor: "#6a8499",
    lineColor: "#1a3a4a",
    menuColor: "#123040",
    menuMuted: "#6a8499",
    frames: [
      { y: 0, scale: 0.9, rotate: -6 },
      { y: -120, scale: 1.0, rotate: -3 },
      { y: -200, scale: 1.08, rotate: 0 },
      { y: -120, scale: 1.0, rotate: 3 },
      { y: 0, scale: 0.9, rotate: 6 },
      { y: 120, scale: 1.0, rotate: 3 },
      { y: 200, scale: 1.08, rotate: 0 },
      { y: 120, scale: 1.0, rotate: -3 },
      { y: 0, scale: 0.9, rotate: -6 },
      { y: -120, scale: 1.0, rotate: -3 },
      { y: -200, scale: 1.08, rotate: 0 },
      { y: -120, scale: 1.0, rotate: 3 },
    ],
  },
  {
    id: "cascade",
    label: "Cascade",
    background: "#1c1814",
    gridColor: "#5c5044",
    lineColor: "#e8dcc8",
    menuColor: "#f0e6d8",
    menuMuted: "#8a7c6c",
    frames: [
      { y: -220, scale: 0.7, rotate: -12 },
      { y: -160, scale: 0.8, rotate: -8 },
      { y: -100, scale: 0.9, rotate: -4 },
      { y: -40, scale: 1.0, rotate: 0 },
      { y: 20, scale: 1.05, rotate: 4 },
      { y: 80, scale: 0.95, rotate: 8 },
      { y: 140, scale: 0.85, rotate: 12 },
      { y: 200, scale: 0.75, rotate: 8 },
      { y: 140, scale: 0.85, rotate: 4 },
      { y: 60, scale: 0.95, rotate: 0 },
      { y: -20, scale: 1.05, rotate: -4 },
      { y: -100, scale: 0.9, rotate: -8 },
    ],
  },
  {
    id: "orbit",
    label: "Orbit",
    background: "#0b0f1a",
    gridColor: "#2a3550",
    lineColor: "#c8d4ff",
    menuColor: "#e8ecff",
    menuMuted: "#6a7599",
    frames: [
      { y: -180, scale: 0.78, rotate: -18 },
      { y: 40, scale: 1.12, rotate: 14 },
      { y: -90, scale: 0.95, rotate: 22 },
      { y: 160, scale: 0.7, rotate: -16 },
      { y: -40, scale: 1.15, rotate: 8 },
      { y: 110, scale: 0.85, rotate: -22 },
      { y: -150, scale: 1.0, rotate: 16 },
      { y: 70, scale: 0.72, rotate: -10 },
      { y: -20, scale: 1.1, rotate: 20 },
      { y: 190, scale: 0.8, rotate: -14 },
      { y: -120, scale: 0.9, rotate: 12 },
      { y: 30, scale: 1.05, rotate: -20 },
    ],
  },
  {
    id: "horizon",
    label: "Horizon",
    background: "#f3ebe0",
    gridColor: "#b8a990",
    lineColor: "#3d3428",
    menuColor: "#2a241c",
    menuMuted: "#9a8c78",
    frames: [
      { y: -30, scale: 0.95, rotate: -1 },
      { y: 20, scale: 0.88, rotate: 1 },
      { y: -10, scale: 1.02, rotate: 0 },
      { y: 35, scale: 0.85, rotate: 2 },
      { y: -25, scale: 0.98, rotate: -2 },
      { y: 15, scale: 0.9, rotate: 1 },
      { y: -5, scale: 1.05, rotate: 0 },
      { y: 40, scale: 0.82, rotate: -1 },
      { y: -35, scale: 0.92, rotate: 2 },
      { y: 10, scale: 1.0, rotate: -1 },
      { y: -15, scale: 0.88, rotate: 1 },
      { y: 25, scale: 0.95, rotate: 0 },
    ],
  },
];

const FilmStrip = () => {
  const [activeId, setActiveId] = useState(presets[0].id);
  const active = presets.find((p) => p.id === activeId) ?? presets[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const presetRef = useRef(active);
  const progressRef = useRef(0);
  const applyRef = useRef<(progress: number) => void>(() => {});

  presetRef.current = active;

  useGSAP(
    () => {
      const cards = imageRefs.current?.filter(Boolean);
      if (!cards?.length) return;

      const startX = window.innerWidth * 0.45;
      const gap = 80;
      const totalDistance = images.length * gap;

      gsap.set(cards, { yPercent: -50, x: 0, y: 0, scale: 0.28, opacity: 0 });

      const applyPositions = (progress: number) => {
        progressRef.current = progress;
        const frames = presetRef.current.frames;
        const viewPortWidth = window.innerWidth;
        const lineX = progress * viewPortWidth;
        gsap.set(lineRef.current, { x: lineX });

        const trackOffset = progress * totalDistance;

        cards.forEach((card, index) => {
          const baseX = startX + index * gap;
          const currentX = baseX - trackOffset;

          const distance = currentX - lineX;
          const absDistance = Math.abs(distance);

          const activerange = 500;
          let amount = 1 - Math.min(absDistance / activerange, 1);
          amount = gsap.parseEase("power3.out")(amount);

          const layout = frames[index % frames.length];
          const minScale = 0.28;
          const targetScale = minScale + (layout.scale - minScale) * amount;
          const targetY = layout.y * amount;
          const rotation = layout.rotate * amount;
          const opacity = 0.65 + amount * 0.55;

          gsap.set(card, {
            x: currentX,
            y: targetY,
            yPercent: -50,
            scale: targetScale,
            rotation: rotation,
            opacity: opacity,
            force3D: true,
          });
        });
      };

      applyRef.current = applyPositions;
      applyPositions(progressRef.current);

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalDistance * 2.5}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => applyPositions(self.progress),
      });

      return () => {
        st.kill();
      };
    },
    { scope: containerRef },
  );

  useEffect(() => {
    applyRef.current(progressRef.current);

    gsap.to(containerRef.current, {
      backgroundColor: active.background,
      duration: 0.6,
      ease: "power2.out",
    });

    if (gridRef.current) {
      gridRef.current.style.backgroundImage = `
        linear-gradient(to right, ${active.gridColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${active.gridColor} 1px, transparent 1px)
      `;
    }

    const lineEls = lineRef.current?.querySelectorAll("div");
    lineEls?.forEach((el, i) => {
      if (i === 1) {
        gsap.to(el, { backgroundColor: active.lineColor, duration: 0.5 });
      } else {
        // triangles use border colors
        const isTop = i === 0;
        gsap.to(el, {
          borderTopColor: isTop ? active.lineColor : "transparent",
          borderBottomColor: !isTop ? active.lineColor : "transparent",
          duration: 0.5,
        });
      }
    });
  }, [active]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ backgroundColor: presets[0].background }}
    >
      <nav
        className="absolute top-0 inset-x-0 z-50 flex items-center justify-center gap-1 px-4 pt-5 pointer-events-auto"
        style={{ color: active.menuColor }}
      >
        {presets.map((preset) => {
          const isActive = preset.id === activeId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setActiveId(preset.id)}
              className="relative px-3 py-2 text-[11px] tracking-[0.18em] uppercase transition-opacity duration-300 cursor-pointer"
              style={{
                color: isActive ? active.menuColor : active.menuMuted,
                opacity: isActive ? 1 : 0.85,
                fontFamily: "var(--font-geist-sans), sans-serif",
              }}
            >
              {preset.label}
              <span
                className="absolute left-3 right-3 -bottom-0.5 h-px transition-opacity duration-300"
                style={{
                  backgroundColor: active.menuColor,
                  opacity: isActive ? 1 : 0,
                }}
              />
            </button>
          );
        })}
      </nav>

      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-[0.08] bg-size-[40px_40px]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${presets[0].gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${presets[0].gridColor} 1px, transparent 1px)
          `,
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {images.map((image) => (
          <div
            key={image.id}
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                imageRefs.current[image.id] = el;
              }
            }}
            className="absolute left-0 top-1/2
          w-56 h-72 origin-center overflow-hidden rounded-sm
          will-change-transform opacity-0
          "
          >
            <Image
              src={image.image}
              alt={image.title}
              width={100}
              height={100}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div
        ref={lineRef}
        className="absolute top-0 bottom-0 left-0 w-px z-200 pointer-events-none"
      >
        <div
          className="
            absolute top-0 left-1/2 -translate-x-1/2
            w-0 h-0
            border-l-[6px] border-l-transparent
            border-r-[6px] border-r-transparent
            border-t-8
          "
          style={{ borderTopColor: presets[0].lineColor }}
        />

        <div
          className="absolute left-1/2 -translate-x-1/2 top-3.5 bottom-3.5 w-px"
          style={{ backgroundColor: presets[0].lineColor }}
        />

        <div
          className="
            absolute bottom-0 left-1/2 -translate-x-1/2
            w-0 h-0
            border-l-[6px] border-l-transparent
            border-r-[6px] border-r-transparent
            border-b-8
          "
          style={{ borderBottomColor: presets[0].lineColor }}
        />
      </div>
    </section>
  );
};

export default FilmStrip;
