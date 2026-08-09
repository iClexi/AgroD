'use client'

import { useEffect, useRef, useState } from 'react'
import type { JSAnimation } from 'animejs'
import styles from './landing.module.css'

type Disposable = { dispose: () => void }

export function FieldScene() {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    let cancelled = false
    let cleanup = () => undefined

    void (async () => {
      try {
        const THREE = await import('three')
        await import('animejs/adapters/three')
        const { animate } = await import('animejs')
        if (cancelled) return

        const resources = new Set<Disposable>()
        const track = <T extends Disposable>(resource: T) => {
          resources.add(resource)
          return resource
        }

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        })
        renderer.setClearColor(0x000000, 0)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.12

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60)
        camera.position.set(6.2, 4.8, 7.8)
        camera.lookAt(0, 0.15, 0)

        scene.add(new THREE.HemisphereLight(0xcff6da, 0x112619, 2.4))
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.2)
        keyLight.position.set(4, 7, 5)
        scene.add(keyLight)
        const blueLight = new THREE.PointLight(0x55a6ff, 18, 14, 1.7)
        blueLight.position.set(-3.5, 3.5, -2)
        scene.add(blueLight)

        const world = new THREE.Group()
        world.rotation.x = -0.05
        scene.add(world)

        const groundGeometry = track(new THREE.BoxGeometry(7.8, 0.34, 5.4, 1, 1, 1))
        const groundMaterial = track(new THREE.MeshStandardMaterial({ color: 0x153d27, roughness: 0.92, metalness: 0.02 }))
        const ground = new THREE.Mesh(groundGeometry, groundMaterial)
        ground.position.y = -0.24
        world.add(ground)

        const soilGeometry = track(new THREE.BoxGeometry(6.9, 0.11, 0.26))
        const soilMaterial = track(new THREE.MeshStandardMaterial({ color: 0x9c673b, roughness: 1 }))
        const leafGeometry = track(new THREE.ConeGeometry(0.095, 0.32, 6))
        const leafMaterial = track(new THREE.MeshStandardMaterial({ color: 0x53b96d, roughness: 0.7 }))
        const dummy = new THREE.Object3D()
        const plantCount = 42
        const plants = new THREE.InstancedMesh(leafGeometry, leafMaterial, plantCount)
        let plantIndex = 0

        for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
          const row = new THREE.Mesh(soilGeometry, soilMaterial)
          row.position.set(0, 0, -1.75 + rowIndex * 0.7)
          world.add(row)
          for (let columnIndex = 0; columnIndex < 7; columnIndex += 1) {
            dummy.position.set(-2.8 + columnIndex * 0.92, 0.08, row.position.z)
            dummy.rotation.y = (rowIndex + columnIndex) * 0.24
            dummy.updateMatrix()
            plants.setMatrixAt(plantIndex, dummy.matrix)
            plantIndex += 1
          }
        }
        plants.instanceMatrix.needsUpdate = true
        world.add(plants)

        const sensor = new THREE.Group()
        sensor.position.set(0.7, 0.35, 0.25)
        world.add(sensor)

        const stemGeometry = track(new THREE.CylinderGeometry(0.065, 0.09, 1.35, 16))
        const sensorGreen = track(new THREE.MeshStandardMaterial({ color: 0x84d195, roughness: 0.45, metalness: 0.15 }))
        const stem = new THREE.Mesh(stemGeometry, sensorGreen)
        stem.position.y = 0.48
        sensor.add(stem)

        const bodyGeometry = track(new THREE.CylinderGeometry(0.32, 0.28, 0.66, 24))
        const bodyMaterial = track(new THREE.MeshStandardMaterial({ color: 0xf5faf4, roughness: 0.3, metalness: 0.12 }))
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        body.position.y = 1.24
        sensor.add(body)

        const capGeometry = track(new THREE.CylinderGeometry(0.22, 0.32, 0.16, 24))
        const capMaterial = track(new THREE.MeshStandardMaterial({ color: 0x0c315b, roughness: 0.24, metalness: 0.35 }))
        const cap = new THREE.Mesh(capGeometry, capMaterial)
        cap.position.y = 1.64
        sensor.add(cap)

        const beaconGeometry = track(new THREE.SphereGeometry(0.085, 16, 12))
        const beaconMaterial = track(new THREE.MeshStandardMaterial({ color: 0x82e39b, emissive: 0x2abb5a, emissiveIntensity: 2.6 }))
        const beacon = new THREE.Mesh(beaconGeometry, beaconMaterial)
        beacon.position.y = 1.82
        sensor.add(beacon)

        const ringGeometry = track(new THREE.TorusGeometry(0.32, 0.018, 10, 42))
        const rings: Array<InstanceType<typeof THREE.Mesh>> = []
        for (let index = 0; index < 3; index += 1) {
          const material = track(new THREE.MeshBasicMaterial({ color: 0x7be8a0, transparent: true, opacity: 0.65 }))
          const ring = new THREE.Mesh(ringGeometry, material)
          ring.rotation.x = Math.PI / 2
          ring.position.y = 1.82
          ring.scale.setScalar(0.72 + index * 0.18)
          sensor.add(ring)
          rings.push(ring)
        }

        const cloud = new THREE.Group()
        cloud.position.set(-2.65, 2.75, -1.35)
        world.add(cloud)
        const cloudGeometry = track(new THREE.SphereGeometry(0.42, 20, 16))
        const cloudMaterial = track(new THREE.MeshStandardMaterial({ color: 0xd8ecff, emissive: 0x1f6db5, emissiveIntensity: 0.38, roughness: 0.36 }))
        ;[
          [-0.48, -0.06, 0, 0.72],
          [0, 0.14, 0, 1],
          [0.52, -0.03, 0, 0.78],
          [0, -0.22, 0, 1.28],
        ].forEach(([x, y, z, scale]) => {
          const puff = new THREE.Mesh(cloudGeometry, cloudMaterial)
          puff.position.set(x, y, z)
          puff.scale.setScalar(scale)
          cloud.add(puff)
        })

        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.7, 2.16, 0.25),
          new THREE.Vector3(-0.2, 3.35, 0.05),
          new THREE.Vector3(-1.55, 3.35, -0.55),
          new THREE.Vector3(-2.65, 2.75, -1.35),
        ])
        const lineGeometry = track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(70)))
        const lineMaterial = track(new THREE.LineBasicMaterial({ color: 0x70cfff, transparent: true, opacity: 0.55 }))
        world.add(new THREE.Line(lineGeometry, lineMaterial))

        const packetGeometry = track(new THREE.SphereGeometry(0.07, 12, 10))
        const packetMaterial = track(new THREE.MeshBasicMaterial({ color: 0xbbeaff }))
        const packet = new THREE.Mesh(packetGeometry, packetMaterial)
        world.add(packet)

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const animations: JSAnimation[] = []
        if (!reducedMotion) {
          animations.push(animate(cap, { rotateY: 360, duration: 9000, loop: true, ease: 'linear' }))
          animations.push(animate(cloud, { y: [2.68, 2.86], duration: 2500, alternate: true, loop: true, ease: 'inOutSine' }))
          rings.forEach((ring, index) => {
            animations.push(animate(ring, {
              scale: [0.68, 1.85],
              opacity: [0.7, 0],
              delay: index * 520,
              duration: 1800,
              loop: true,
              loopDelay: 240,
              ease: 'out(3)',
            }))
          })
        }

        let visible = false
        let pointerX = 0
        let pointerY = 0
        let elapsed = 0
        let previousTime = performance.now()

        const render = (time = performance.now()) => {
          const delta = Math.min((time - previousTime) / 1000, 0.05)
          previousTime = time
          if (!reducedMotion) elapsed += delta
          world.rotation.y += (pointerX * 0.11 - world.rotation.y) * 0.04
          world.rotation.x += (-0.05 + pointerY * 0.035 - world.rotation.x) * 0.04
          packet.position.copy(curve.getPointAt((elapsed * 0.115) % 1))
          renderer.render(scene, camera)
        }

        const updateLoop = () => {
          const shouldRun = visible && !document.hidden && !reducedMotion
          animations.forEach((animation) => shouldRun ? animation.resume() : animation.pause())
          renderer.setAnimationLoop(shouldRun ? render : null)
          if (!shouldRun) render()
        }

        const resize = () => {
          const rect = host.getBoundingClientRect()
          const width = Math.max(1, Math.round(rect.width))
          const height = Math.max(1, Math.round(rect.height))
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 600 ? 1.25 : 1.7))
          renderer.setSize(width, height, false)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          render()
        }

        const onPointerMove = (event: PointerEvent) => {
          const rect = host.getBoundingClientRect()
          pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
          pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
        }
        const onPointerLeave = () => { pointerX = 0; pointerY = 0 }
        const onVisibilityChange = () => updateLoop()

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(host)
        const visibilityObserver = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          updateLoop()
        }, { threshold: 0.08 })
        visibilityObserver.observe(host)
        host.addEventListener('pointermove', onPointerMove, { passive: true })
        host.addEventListener('pointerleave', onPointerLeave, { passive: true })
        document.addEventListener('visibilitychange', onVisibilityChange)
        resize()
        updateLoop()

        cleanup = () => {
          renderer.setAnimationLoop(null)
          resizeObserver.disconnect()
          visibilityObserver.disconnect()
          host.removeEventListener('pointermove', onPointerMove)
          host.removeEventListener('pointerleave', onPointerLeave)
          document.removeEventListener('visibilitychange', onVisibilityChange)
          animations.forEach((animation) => animation.revert())
          resources.forEach((resource) => resource.dispose())
          renderer.dispose()
          renderer.forceContextLoss()
        }
      } catch {
        if (!cancelled) setFallback(true)
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <div ref={hostRef} className={styles.fieldScene} data-webgl-fallback={fallback ? 'true' : 'false'}>
      <canvas ref={canvasRef} aria-hidden="true" />
      {fallback ? (
        <div className={styles.webglFallback} role="img" aria-label="Representación del sensor AgroD conectado con la plataforma">
          <span /><i /><b />
        </div>
      ) : null}
    </div>
  )
}
