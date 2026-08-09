import Link from 'next/link'
import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm"><Logo /><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Tecnología creada para que los productores dominicanos puedan entender su finca y actuar a tiempo.</p></div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn title="Producto" links={[['Cómo funciona', '#como-funciona'], ['Demo', '#demo'], ['Precios', '#precios']]} />
            <FooterColumn title="Cuenta" links={[['Iniciar sesión', '/iniciar-sesion'], ['Crear cuenta', '/registro'], ['Ver demo', '#demo']]} />
            <FooterColumn title="Empresa" links={[['Equipo', '#equipo'], ['AgroTech Dominicana', '#inicio'], ['República Dominicana', '#inicio']]} />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} AgroD · AgroTech Dominicana.</p><p>Proyecto del Grupo 4 · Desarrollo de Emprendedores.</p></div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return <div><p className="text-sm font-semibold text-foreground">{title}</p><ul className="mt-3 space-y-2">{links.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-primary">{label}</Link></li>)}</ul></div>
}
