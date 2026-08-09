import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/agro/logo'
import { CookieSettingsButton } from './cookie-consent'
import styles from './legal.module.css'

type LegalSection = {
  id: string
  label: string
}

type LegalShellProps = {
  eyebrow: string
  title: string
  summary: string
  sections: readonly LegalSection[]
  children: React.ReactNode
}

export function LegalShell({ eyebrow, title, summary, sections, children }: LegalShellProps) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#contenido-legal">Ir al contenido</a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label="AgroD, volver al inicio">
            <Logo compact />
          </Link>
          <nav className={styles.headerNav} aria-label="Navegación legal">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
            <Link href="/iniciar-sesion" className={styles.signIn}>Iniciar sesión</Link>
          </nav>
        </div>
      </header>

      <main id="contenido-legal" className={styles.main}>
        <div className={styles.backRow}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft aria-hidden="true" />
            Volver a AgroD
          </Link>
        </div>

        <section className={styles.hero} aria-labelledby="legal-title">
          <div className={styles.heroIcon} aria-hidden="true"><ShieldCheck /></div>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 id="legal-title">{title}</h1>
            <p className={styles.summary}>{summary}</p>
            <p className={styles.version}>Versión 1 · Vigente desde el 9 de agosto de 2026</p>
          </div>
        </section>

        <div className={styles.layout}>
          <aside className={styles.aside} aria-label="Contenido de esta página">
            <p>En esta página</p>
            <nav>
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>{section.label}</a>
              ))}
            </nav>
          </aside>

          <article className={styles.article}>{children}</article>
        </div>
      </main>

      <footer className={styles.footer}>
        <div>
          <strong>AgroD</strong>
          <span>Monitoreo inteligente para cultivos dominicanos.</span>
        </div>
        <nav aria-label="Enlaces del pie legal">
          <Link href="/">Inicio</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos y condiciones</Link>
          <CookieSettingsButton />
        </nav>
      </footer>
    </div>
  )
}
