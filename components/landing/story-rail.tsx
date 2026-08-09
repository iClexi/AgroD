'use client'

import { useEffect, useState } from 'react'
import styles from './landing.module.css'

const sections = [
  ['inicio', 'Inicio'],
  ['que-es', 'Qué es'],
  ['problema', 'Problema'],
  ['ecosistema', 'Ecosistema'],
  ['plataforma', 'Plataforma'],
  ['como-funciona', 'Cómo funciona'],
  ['planes', 'Planes'],
  ['empresa', 'Empresa'],
  ['nosotros', 'Nosotros'],
  ['empezar', 'Empezar'],
] as const

export function StoryRail() {
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const nodes = sections
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: '-15% 0px -15% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.storyRail} aria-label="Secciones de la presentación">
      {sections.map(([id, label], index) => (
        <a
          key={id}
          href={'#' + id}
          className={active === id ? styles.storyRailActive : ''}
          aria-label={(index + 1).toString().padStart(2, '0') + '. ' + label}
          aria-current={active === id ? 'location' : undefined}
        >
          <span>{(index + 1).toString().padStart(2, '0')}</span>
          <i aria-hidden="true" />
          <b>{label}</b>
        </a>
      ))}
    </nav>
  )
}
