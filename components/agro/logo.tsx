import Image from 'next/image'

type LogoProps = {
  className?: string
  compact?: boolean
}

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <span className={`logo-lockup relative inline-flex shrink-0 items-center justify-center overflow-hidden ${compact ? 'h-12 w-[143px]' : 'h-[68px] w-[198px]'} ${className}`}>
      <Image
        src="/images/brand/agrod-logo-header.webp"
        alt="AgroD - Monitoreo inteligente para cultivos dominicanos"
        width={600}
        height={196}
        loading="eager"
        className="h-full w-full object-contain mix-blend-multiply"
      />
    </span>
  )
}
