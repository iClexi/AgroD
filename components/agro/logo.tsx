type LogoProps = { className?: string; showWordmark?: boolean }

export function Logo({ className = '', showWordmark = true }: LogoProps) {
  return <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#071f42] text-white">
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21c0-5 0-8 3-11" stroke="#69bd7d" />
        <path d="M15 10c2.8-2.8 5-2.6 6-2.8-.2 1 0 3.2-2.8 6-2.2 2.4-4.5 2.2-5.6 2.2.1-1.1-.1-3.4 2.4-5.4Z" fill="#69bd7d" fillOpacity=".18" stroke="#69bd7d" />
        <path d="M4 8a5 5 0 0 1 7 0M6.3 10.3a2 2 0 0 1 2.4 0" opacity=".78" />
      </svg>
    </span>
    {showWordmark ? <span className="font-display text-xl font-extrabold tracking-tight text-[#071f42]">Agro<span className="text-[#167a35]">D</span></span> : null}
  </span>
}
