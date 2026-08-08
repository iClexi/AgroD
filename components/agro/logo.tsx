type LogoProps = {
  className?: string
  compact?: boolean
}

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <span className={`relative inline-flex shrink-0 overflow-hidden ${compact ? 'h-11 w-[132px]' : 'h-14 w-[178px]'} ${className}`}>
      <Image
        src="/images/brand/agrod-logo-original.png"
        alt="AgroD - Monitoreo inteligente para cultivos dominicanos"
        width={1672}
        height={941}
        className={`absolute h-auto max-w-none mix-blend-multiply ${compact ? '-left-3 -top-[18px] w-[155px]' : '-left-[15px] -top-[25px] w-[210px]'}`}
      />
    </span>
  )
}
import Image from 'next/image'
