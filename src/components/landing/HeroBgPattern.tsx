/** Keep the backdrop quiet so the dedicated photography block retains its natural light. */
const HeroBgPattern = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 z-0 pointer-events-none"
    style={{ background: "linear-gradient(180deg, #f5f3ef 0%, #fafaf9 45%, #ffffff 100%)" }}
  />
);

export default HeroBgPattern;
