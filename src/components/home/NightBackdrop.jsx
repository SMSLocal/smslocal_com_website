/**
 * The dark backdrop shared by the CTA banner, the "Get Started" panel and the
 * footer: a navy glow rising from the top edge over a faded dot grid.
 *
 * Render inside a container that is `relative overflow-hidden bg-[#0f172a]`,
 * and give the content after it `relative` so it stacks above these layers.
 */
export default function NightBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(50% 60% at 50% 0%, rgba(21,73,137,0.25), transparent 70%)",
        }}
      />
      <div className="bg-dot-grid mask-radial-fade pointer-events-none absolute inset-0 opacity-20" />
    </>
  );
}
