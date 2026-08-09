'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import styles from './landing.module.css'

const FieldScene = dynamic(
  () => import('./field-scene').then((module) => module.FieldScene),
  {
    ssr: false,
    loading: () => (
      <div className={styles.sceneFallback} aria-hidden="true">
        <span /><span /><span /><span />
      </div>
    ),
  },
)

export function FieldSceneLoader() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const node = mountRef.current
    if (!node || ready) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setReady(true)
        observer.disconnect()
      },
      { rootMargin: '90% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ready])

  return (
    <div ref={mountRef} className={styles.fieldSceneMount}>
      {ready ? (
        <FieldScene />
      ) : (
        <div className={styles.sceneFallback} aria-label="Vista 3D del ecosistema AgroD pendiente de cargar" role="img">
          <span /><span /><span /><span />
        </div>
      )}
    </div>
  )
}
