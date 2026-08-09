'use client'

import {
  AlertTriangle,
  BatteryCharging,
  BellRing,
  CheckCircle2,
  Droplets,
  LayoutDashboard,
  MapPinned,
  RadioTower,
  Route,
  Signal,
  Sprout,
  ThermometerSun,
  Volume2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from './landing.module.css'

type ViewId = 'prioridades' | 'mapa' | 'equipos'

const views = [
  { id: 'prioridades' as const, label: 'Prioridades', icon: LayoutDashboard },
  { id: 'mapa' as const, label: 'Mapa', icon: MapPinned },
  { id: 'equipos' as const, label: 'Equipos', icon: RadioTower },
]

export function PlatformPreview() {
  const [view, setView] = useState<ViewId>('prioridades')
  const [buzzed, setBuzzed] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
  }, [])

  function buzz() {
    setBuzzed(true)
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setBuzzed(false), 3200)
  }

  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? views.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + views.length) % views.length
    const next = views[nextIndex]
    setView(next.id)
    window.requestAnimationFrame(() => document.getElementById('preview-tab-' + next.id)?.focus())
  }

  return (
    <div className={styles.platformShell}>
      <div className={styles.platformChrome}>
        <div className={styles.chromeBrand}>
          <span className={styles.chromeMark}><Sprout aria-hidden="true" /></span>
          <span><strong>AgroD</strong><small>Finca demostrativa</small></span>
        </div>
        <div className={styles.demoDisclosure}><span /> Datos de demostración</div>
      </div>
      <div className={styles.platformBody}>
        <nav className={styles.previewTabs} role="tablist" aria-label="Vistas de la plataforma de ejemplo">
          {views.map((item, index) => (
            <button
              type="button"
              role="tab"
              key={item.id}
              id={'preview-tab-' + item.id}
              aria-selected={view === item.id}
              aria-controls="preview-panel"
              tabIndex={view === item.id ? 0 : -1}
              onClick={() => setView(item.id)}
              onKeyDown={(event) => moveTab(event, index)}
            >
              <item.icon aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div
          id="preview-panel"
          role="tabpanel"
          aria-labelledby={'preview-tab-' + view}
          className={styles.previewPanel}
          key={view}
        >
          {view === 'prioridades' ? <PrioritiesView /> : null}
          {view === 'mapa' ? <MapView /> : null}
          {view === 'equipos' ? <DevicesView buzzed={buzzed} onBuzz={buzz} /> : null}
        </div>
      </div>
    </div>
  )
}

function PrioritiesView() {
  return (
    <div className={styles.prioritiesView}>
      <div className={styles.previewHeading}>
        <div><small>La Vega · lectura ilustrativa</small><h3>Estas son tus prioridades.</h3></div>
        <span><BellRing aria-hidden="true" /> 2 alertas</span>
      </div>
      <dl className={styles.previewMetrics}>
        <div><dt><Droplets aria-hidden="true" /> Humedad</dt><dd>41%</dd></div>
        <div><dt><ThermometerSun aria-hidden="true" /> Ambiente</dt><dd>29 °C</dd></div>
        <div><dt><Signal aria-hidden="true" /> Equipos</dt><dd>2 / 2</dd></div>
      </dl>
      <div className={styles.alertStrip}>
        <article><span className={styles.alertCritical}><AlertTriangle aria-hidden="true" /></span><div><strong>Ají Sur</strong><small>Humedad baja · revisar primero</small></div><b>22%</b></article>
        <article><span className={styles.alertAttention}><Droplets aria-hidden="true" /></span><div><strong>Tomate Norte</strong><small>Revisar riego en la próxima ruta</small></div><b>31%</b></article>
        <article><span className={styles.alertStable}><CheckCircle2 aria-hidden="true" /></span><div><strong>Plátano Este</strong><small>Condiciones favorables</small></div><b>47%</b></article>
      </div>
    </div>
  )
}

function MapView() {
  return (
    <div className={styles.mapView}>
      <div className={styles.previewHeading}>
        <div><small>Finca virtual</small><h3>Encuentra la zona y sigue la ruta.</h3></div>
        <span><Route aria-hidden="true" /> Ruta de ejemplo</span>
      </div>
      <div className={styles.demoMap} aria-label="Mapa ilustrativo de tres zonas de cultivo">
        <span className={styles.routeLineOne} aria-hidden="true" />
        <span className={styles.routeLineTwo} aria-hidden="true" />
        <span className={styles.mapPoint + ' ' + styles.mapPointOne} role="img" aria-label="Zona 1, Ají Sur, prioridad crítica"><b>1</b><small>Ají Sur</small></span>
        <span className={styles.mapPoint + ' ' + styles.mapPointTwo} role="img" aria-label="Zona 2, Tomate Norte, requiere atención"><b>2</b><small>Tomate Norte</small></span>
        <span className={styles.mapPoint + ' ' + styles.mapPointThree} role="img" aria-label="Zona 3, Plátano Este, estable"><b>3</b><small>Plátano Este</small></span>
      </div>
    </div>
  )
}

function DevicesView({ buzzed, onBuzz }: { buzzed: boolean; onBuzz: () => void }) {
  return (
    <div className={styles.devicesView}>
      <div className={styles.previewHeading}>
        <div><small>Dispositivos vinculados</small><h3>Del equipo correcto a la planta correcta.</h3></div>
        <span><RadioTower aria-hidden="true" /> 2 conectados</span>
      </div>
      <div className={styles.deviceGrid}>
        <article className={buzzed ? styles.deviceBuzzing : ''}>
          <div><span><RadioTower aria-hidden="true" /></span><b>En línea</b></div>
          <h4>Sensor de suelo Norte</h4>
          <p>Vinculado a Tomate Norte</p>
          <dl><div><dt><BatteryCharging aria-hidden="true" /> Batería</dt><dd>85%</dd></div><div><dt><Signal aria-hidden="true" /> Señal</dt><dd>91%</dd></div></dl>
          <button type="button" onClick={onBuzz}><Volume2 aria-hidden="true" /> {buzzed ? 'Sonando…' : 'Hacer sonar'}</button>
        </article>
        <article>
          <div><span><ThermometerSun aria-hidden="true" /></span><b>En línea</b></div>
          <h4>Estación climática Central</h4>
          <p>Vinculada a la finca principal</p>
          <dl><div><dt><BatteryCharging aria-hidden="true" /> Batería</dt><dd>76%</dd></div><div><dt><Signal aria-hidden="true" /> Señal</dt><dd>86%</dd></div></dl>
          <span className={styles.deviceSecondaryAction}>Última lectura: hace 3 min</span>
        </article>
      </div>
      {buzzed ? <p className={styles.buzzStatus} role="status"><Volume2 aria-hidden="true" /> Señal enviada. Sigue el zumbido para ubicar el sensor.</p> : null}
    </div>
  )
}
