"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";

export const DESIGN_W = 1672;
export const DESIGN_H = 941;

/**
 * Renders children on a fixed 1672×941 canvas (the size of the design) and
 * scales it uniformly to fit the window, so every pixel value inside matches
 * the mockup at any screen size.
 */
export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#0A0A1E" }}>
      <div
        className="absolute left-1/2 top-1/2 overflow-hidden select-none"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale ?? 1})`,
          visibility: scale === null ? "hidden" : "visible",
          background: "#0A0A1E",
        }}
      >
        {children}
      </div>
    </div>
  );
}
