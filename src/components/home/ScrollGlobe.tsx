"use client";

import { useEffect, useRef } from "react";

const MAX_ANGLE = 9; // degrees of tilt at the extremes

export default function ScrollGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const center = r.top + r.height / 2;
      // progress ~ -0.5 (below viewport) .. +0.5 (above viewport)
      const progress = (vh / 2 - center) / vh;
      // scroll down → element rises → progress ↑ → rotate left (negative)
      let angle = -progress * MAX_ANGLE * 2;
      angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle));
      img.style.rotate = `${angle.toFixed(2)}deg`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative -mx-6 -mt-6 min-h-[20rem] flex-1 overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/globe-flags.png"
        alt="Dotted world globe with country flags showing SMSLocal's global reach"
        className="absolute inset-0 h-full w-full object-contain [will-change:rotate]"
      />
      {/* fade the globe into the card on the left & right */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
