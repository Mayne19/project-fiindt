import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

export interface DifferenceRailItem {
  title: string
  description: string
  words: string[]
  visual: string
  visualAlt: string
  tone: string
  visualScale?: number
  visualX?: string
  visualY?: string
  groupX?: string
  groupY?: string
  leftBadgesX?: string
  leftBadgesY?: string
  rightBadgesX?: string
  rightBadgesY?: string
}

interface AboutDifferenceRailProps {
  eyebrow?: string
  title: string
  items: DifferenceRailItem[]
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export default function AboutDifferenceRail({ title, items }: AboutDifferenceRailProps) {
  const ref = useRef<HTMLElement | null>(null)
  const frame = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const active = items[activeIndex] ?? items[0]
  const midpoint = Math.ceil(active.words.length / 2)
  const wordGroups = [active.words.slice(0, midpoint), active.words.slice(midpoint)]

  const railStyle = {
    '--rail-tone': active.tone,
    '--visual-scale': active.visualScale ?? 1.25,
    '--visual-x': active.visualX ?? '0px',
    '--visual-y': active.visualY ?? '0px',
    '--group-x': active.groupX ?? '0px',
    '--group-y': active.groupY ?? '0px',
    '--left-badges-x': active.leftBadgesX ?? '0px',
    '--left-badges-y': active.leftBadgesY ?? '0px',
    '--right-badges-x': active.rightBadgesX ?? '0px',
    '--right-badges-y': active.rightBadgesY ?? '0px',
  } as CSSProperties

  useEffect(() => {
    const update = () => {
      frame.current = null
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const travel = Math.max(1, rect.height - window.innerHeight)
      const progress = rect.top > 0 ? 0 : clamp(Math.abs(rect.top) / travel)
      const nextIndex = Math.min(items.length - 1, Math.floor(progress * items.length))
      setActiveIndex(nextIndex)
    }
    const schedule = () => {
      if (frame.current !== null) return
      frame.current = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [items.length])

  const badgeStyle = (rotate: number): CSSProperties => ({
    display: 'inline-block',
    borderRadius: 16,
    border: '0.5px solid rgba(67,38,29,.10)',
    background: 'var(--cream-2)',
    padding: '10px 18px',
    fontSize: 17,
    fontWeight: 900,
    letterSpacing: '-0.03em',
    color: active.tone,
    boxShadow: '0 8px 24px rgba(67,38,29,.07)',
    transition: 'color 0.7s',
    transform: `rotate(${rotate}deg)`,
  })

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '220vh', paddingTop: 24, paddingBottom: 24, background: 'var(--cream)' }}>
      <style>{`
        @keyframes railReveal {
          0% { opacity: 0; transform: translateY(18px) scale(0.985); filter: blur(6px); }
          55% { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
      <div style={{ position: 'sticky', top: 80, display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 48, minHeight: '38rem', alignItems: 'center', maxWidth: 1100, margin: '0 auto', padding: '0 60px' }}>

        {/* Left: title + accordion list */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, marginBottom: 28 }}>
            {title}
            <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              Three ways Fiindt stands apart.
            </span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <article
                  key={item.title}
                  style={{
                    borderLeft: `2px solid ${isActive ? item.tone : 'rgba(67,38,29,.12)'}`,
                    paddingLeft: 20,
                    transition: 'border-color 0.7s, opacity 0.7s',
                    opacity: isActive ? 1 : 0.40,
                  }}
                >
                  <h3 style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: '#26221e' }}>{item.title}</h3>
                </article>
              )
            })}
          </div>
        </div>

        {/* Right: visual + floating word badges */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '36rem', transform: 'translate(16px, 40px)' }}>
          <div
            key={active.title}
            style={{ ...railStyle, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', maxWidth: 640, minHeight: '33rem', animation: 'railReveal 1.15s ease-out both' }}
          >
            <div style={{ position: 'relative', height: '31rem', width: '100%', maxWidth: 640, margin: '0 auto' }}>

              {/* Left badges */}
              <div style={{
                position: 'absolute', left: '4%', top: '50%', zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
                transform: 'translate(calc(var(--group-x) + var(--left-badges-x)), calc(-50% + var(--group-y) + var(--left-badges-y)))',
                transition: 'transform 1s ease-out',
              }}>
                {wordGroups[0].map((word, i) => (
                  <span key={word} style={badgeStyle(i % 2 === 0 ? -1 : 1)}>{word}</span>
                ))}
              </div>

              {/* Central visual */}
              <div style={{
                position: 'absolute', left: '50%', top: '45%', zIndex: 0,
                width: 'min(72vw, 28rem)',
                transform: 'translate(-50%, -50%) translate(calc(var(--group-x) + var(--visual-x)), calc(var(--group-y) + var(--visual-y))) scale(var(--visual-scale))',
                transition: 'transform 1s ease-out',
              }}>
                <div style={{ position: 'relative', aspectRatio: '3/2', width: '100%' }}>
                  <div style={{
                    position: 'absolute', left: 28, right: 28, bottom: 12, height: 56,
                    borderRadius: '50%', filter: 'blur(24px)',
                    background: 'color-mix(in srgb, var(--rail-tone) 24%, transparent)',
                    transition: 'background 1s',
                  }} aria-hidden="true" />
                  <img
                    src={active.visual}
                    alt={active.visualAlt}
                    style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 24px 44px rgba(67,38,29,0.16))' }}
                  />
                </div>
              </div>

              {/* Right badges */}
              <div style={{
                position: 'absolute', right: '4%', top: '50%', zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
                transform: 'translate(calc(var(--group-x) + var(--right-badges-x)), calc(-50% + var(--group-y) + var(--right-badges-y)))',
                transition: 'transform 1s ease-out',
              }}>
                {wordGroups[1].map((word, i) => (
                  <span key={word} style={badgeStyle(i % 2 === 0 ? 1 : -1)}>{word}</span>
                ))}
              </div>

              {/* Description */}
              <p style={{
                position: 'absolute', bottom: 64, left: '50%', transform: 'translateX(-50%)',
                maxWidth: 400, textAlign: 'center',
                fontSize: 15, lineHeight: 1.6, color: 'rgba(67,38,29,.55)',
                transition: 'all 1s ease-out', whiteSpace: 'normal',
              }}>
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
