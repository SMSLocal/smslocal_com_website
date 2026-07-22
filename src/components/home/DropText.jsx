import { useEffect, useRef, useState } from "react";

export default function DropText({
  segments,
  as = "span",
  className = "",
  step = 110,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    let io = null;

    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      cleanup();
    };
    function onScroll() {
      if (inView()) reveal();
    }

    if (inView()) {
      setShown(true);
      return;
    }
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal();
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(el);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return cleanup;
  }, []);

  const Tag = as;
  let wi = 0;

  return (
    <Tag ref={ref} className={className}>
      {segments.map((seg, si) => {
        // className on a break lets callers make it responsive — e.g. a break
        // that only applies below sm, so the same heading can wrap at a
        // different word on narrow screens.
        if (seg.br) return <br key={si} className={seg.className} />;
        const words = (seg.text ?? "").split(" ");
        return (
          <span key={si}>
            {words.map((w, i) => {
              const idx = wi++;
              return (
                <span key={i}>
                  <span
                    className={`inline-block ${seg.className ?? ""}`}
                    style={{
                      transition:
                        "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.65s ease",
                      transitionDelay: `${idx * step}ms`,
                      transform: shown ? "translateY(0)" : "translateY(-0.6em)",
                      opacity: shown ? 1 : 0,
                    }}
                  >
                    {w}
                  </span>
                  {i < words.length - 1 ? " " : ""}
                </span>
              );
            })}
            {/* Space is emitted even before a break. A trailing space collapses
                at a line end, but it is essential when the break is hidden at a
                breakpoint — otherwise the two segments run together. */}
            {si < segments.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
