const HeroBgPattern = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(216 18% 90%)" strokeWidth="0.8" opacity="0.5" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="40%">
          <stop offset="0%" stopColor="hsl(22 92% 47%)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="hsl(22 92% 47%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#glow)" />
      {/* Decorative circles */}
      <circle cx="15%" cy="25%" r="120" fill="none" stroke="hsl(22 92% 47%)" strokeWidth="0.5" opacity="0.08" />
      <circle cx="85%" cy="70%" r="80" fill="none" stroke="hsl(214 65% 17%)" strokeWidth="0.5" opacity="0.06" />
      {/* Dashed lines */}
      <line x1="10%" y1="0" x2="10%" y2="100%" stroke="hsl(22 92% 47%)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.06" />
      <line x1="90%" y1="0" x2="90%" y2="100%" stroke="hsl(22 92% 47%)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.06" />
    </svg>
    {/* White fade overlays */}
    <div
      className="absolute inset-0 z-[1]"
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(255,255,255,.3) 55%, rgba(255,255,255,.6) 80%, rgba(255,255,255,.85) 100%)'
      }}
    />
    <div
      className="absolute inset-0 z-[1]"
      style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,.25), transparent)'
      }}
    />
    {/* Particles */}
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full z-[2] pointer-events-none"
        style={{
          width: `${3 + Math.random() * 5}px`,
          height: `${3 + Math.random() * 5}px`,
          background: 'rgba(232,98,10,.15)',
          left: `${10 + Math.random() * 80}%`,
          bottom: `${Math.random() * 40}%`,
          animation: `floatUp ${6 + Math.random() * 8}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

export default HeroBgPattern;
