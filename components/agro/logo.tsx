import Image from 'next/image'

type LogoProps = {
  className?: string
  compact?: boolean
}

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <span className={`logo-lockup relative inline-flex shrink-0 overflow-hidden ${compact ? 'h-12 w-[143px]' : 'h-[68px] w-[198px]'} ${className}`}>
      <Image
        src="/images/brand/agrod-logo-original.png"
        alt="AgroD - Monitoreo inteligente para cultivos dominicanos"
        width={1672}
        height={941}
        loading="eager"
        className={`absolute h-auto max-w-none mix-blend-multiply ${compact ? '-left-[6px] -top-[17px] w-[155px]' : '-left-[7px] -top-[24px] w-[210px]'}`}
      />
    </span>
  )
}
