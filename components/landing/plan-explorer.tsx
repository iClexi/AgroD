'use client'

import Link from 'next/link'
import { ArrowRight, Check, Cloud, RadioTower, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import styles from './landing.module.css'

type PlanId = 'kit' | 'cloud' | 'scale'

const plans = [
  {
    id: 'kit' as const,
    tab: 'Kit inicial',
    icon: RadioTower,
    eyebrow: 'Hardware e implementación',
    price: 'RD$55,000',
    unit: 'pago inicial de referencia',
    description: 'Sensores, instalación y acceso inicial a la plataforma para comenzar el monitoreo.',
    items: ['Sensores del kit', 'Instalación y configuración inicial', 'Capacitación inicial y plan básico de plataforma'],
    note: 'La duración del plan básico se define en la propuesta comercial.',
  },
  {
    id: 'cloud' as const,
    tab: 'AgroD Cloud',
    icon: Cloud,
    eyebrow: 'Plataforma y seguimiento',
    price: 'RD$1,500–2,500',
    unit: 'al mes, según el plan',
    description: 'Acceso continuo a monitoreo, alertas, historial, reportes y soporte.',
    items: ['Monitoreo y alertas', 'Historial y reportes', 'Soporte continuo'],
    note: 'Precios de referencia sujetos al alcance y a validación comercial.',
  },
  {
    id: 'scale' as const,
    tab: 'Escala',
    icon: TrendingUp,
    eyebrow: 'Varias parcelas u organizaciones',
    price: 'Desde RD$3,500/mes',
    unit: 'Empresa: cotización personalizada',
    description: 'Plan previsto para varias parcelas, fincas extensas, técnicos y cooperativas.',
    items: [
      'Plan profesional desde RD$3,500 al mes',
      'Sensores adicionales: RD$3,000–6,000 por sensor instalado',
      'Mantenimiento técnico: RD$5,000–10,000 por visita',
    ],
    note: 'La oferta empresarial se cotiza según área, equipos y soporte.',
  },
]

export function PlanExplorer() {
  const [selected, setSelected] = useState<PlanId>('kit')
  const plan = plans.find((item) => item.id === selected) ?? plans[0]

  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? plans.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + plans.length) % plans.length
    const next = plans[nextIndex]
    setSelected(next.id)
    window.requestAnimationFrame(() => document.getElementById('plan-tab-' + next.id)?.focus())
  }

  return (
    <div className={styles.planExplorer}>
      <div className={styles.planTabs} role="tablist" aria-label="Opciones comerciales de AgroD">
        {plans.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={'plan-tab-' + item.id}
            aria-selected={selected === item.id}
            aria-controls="plan-panel"
            tabIndex={selected === item.id ? 0 : -1}
            onClick={() => setSelected(item.id)}
            onKeyDown={(event) => moveTab(event, index)}
          >
            <item.icon aria-hidden="true" />
            <span>{item.tab}</span>
          </button>
        ))}
      </div>

      <div
        id="plan-panel"
        role="tabpanel"
        aria-labelledby={'plan-tab-' + plan.id}
        className={styles.planPanel}
        key={plan.id}
      >
        <div className={styles.planSummary}>
          <p>{plan.eyebrow}</p>
          <h3>{plan.price}</h3>
          <span>{plan.unit}</span>
          <p>{plan.description}</p>
        </div>
        <div className={styles.planDetails}>
          <ul>
            {plan.items.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
          </ul>
          <div>
            <small>{plan.note}</small>
            <Link href="/registro">Probar la plataforma <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
