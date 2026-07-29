import { useEffect, useState } from "react";

export default function RotatingWord({ words, className = "", interval = 2200 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Longest word (invisible) reserves the box width so swapping words
  // never reflows the heading.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ perspective: "400px" }}
    >
      <span className={`invisible ${className}`} aria-hidden="true">
        {longest}
      </span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={`absolute left-0 top-0 whitespace-nowrap transition-all duration-500 ease-in-out ${className}`}
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "rotateX(0deg)" : "rotateX(-90deg)",
            transformOrigin: "50% 50%",
            backfaceVisibility: "hidden",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
