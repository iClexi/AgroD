'use client'

import { animate, createScope, stagger, utils } from 'animejs'
import { useLayoutEffect } from 'react'

export function LandingMotion() {
  useLayoutEffect(() => {
    const root = document.getElementById('agrod-story')
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      root.dataset.motion = 'reduced'
      return () => { delete root.dataset.motion }
    }

    let observer: IntersectionObserver | undefined

    root.dataset.motion = 'ready'
    const scope = createScope({ root }).add(() => {
        const heroLines = Array.from(root.querySelectorAll<HTMLElement>('[data-anime-hero]'))
        const heroItems = Array.from(root.querySelectorAll<HTMLElement>('#inicio [data-anime-item]'))
        const heroVisual = root.querySelector<HTMLElement>('#inicio [data-anime-visual]')

        utils.set(heroLines, { opacity: 0, y: 30 })
        utils.set(heroItems, { opacity: 0, y: 18 })
        if (heroVisual) utils.set(heroVisual, { opacity: 0, x: 26, scale: 0.985 })

        animate(heroLines, {
          opacity: [0, 1],
          y: [30, 0],
          delay: stagger(105),
          duration: 780,
          ease: 'out(4)',
        })
        animate(heroItems, {
          opacity: [0, 1],
          y: [18, 0],
          delay: stagger(65, { start: 180 }),
          duration: 620,
          ease: 'out(3)',
        })
        if (heroVisual) {
          animate(heroVisual, {
            opacity: [0, 1],
            x: [26, 0],
            scale: [0.985, 1],
            delay: 170,
            duration: 920,
            ease: 'out(4)',
          })
        }

        const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-anime-group], [data-anime-visual]'))
          .filter((group) => !group.closest('#inicio'))
          .filter((group) => !group.parentElement?.closest('[data-anime-group]'))

        groups.forEach((group) => {
          const items = group.hasAttribute('data-anime-group')
            ? Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-anime-item], :scope [data-anime-item]'))
            : [group]
          const targets = items.length ? items : [group]
          utils.set(targets, { opacity: 0, y: group.hasAttribute('data-anime-visual') ? 18 : 22 })
        })

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              const group = entry.target as HTMLElement
              const items = group.hasAttribute('data-anime-group')
                ? Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-anime-item], :scope [data-anime-item]'))
                : [group]
              const targets = items.length ? items : [group]
              animate(targets, {
                opacity: [0, 1],
                y: [group.hasAttribute('data-anime-visual') ? 18 : 22, 0],
                delay: stagger(55),
                duration: 650,
                ease: 'out(4)',
              })
              observer?.unobserve(group)
            })
          },
          { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
        )

        groups.forEach((group) => observer?.observe(group))
    })

    return () => {
      observer?.disconnect()
      scope.revert()
      delete root.dataset.motion
    }
  }, [])

  return null
}
