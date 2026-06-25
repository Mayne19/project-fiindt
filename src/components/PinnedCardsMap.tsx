import { Link } from 'react-router-dom'
import type { CSSProperties, ReactNode } from 'react'

export interface PinnedCardItem {
  title: string
  description: string
  href?: string
  icon: ReactNode
  color?: string
  active?: boolean
  comingSoon?: boolean
}

interface PinnedCardsMapProps {
  eyebrow?: string
  title: string
  description: string
  items: PinnedCardItem[]
  accentColor?: string
  columns?: 'three' | 'four'
}

const rotations: CSSProperties[] = [
  { transform: 'rotate(-2deg) translateY(16px)' },
  { transform: 'rotate(3deg) translateY(-8px)' },
  { transform: 'rotate(-1deg) translateY(24px)' },
  { transform: 'rotate(2deg) translateY(0px)' },
  { transform: 'rotate(-3deg) translateY(32px)' },
  { transform: 'rotate(1deg) translateY(-16px)' },
]

function Pushpin({ color }: { color: string }) {
  return (
    <span style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', width: 24, height: 40, display: 'block', zIndex: 20 }} aria-hidden="true">
      <span style={{ position: 'absolute', left: 10, top: 18, height: 18, width: 3.5, background: 'linear-gradient(to right, #64748b, #fff, #475569)', borderRadius: '0 0 2px 2px' }} />
      <span style={{ position: 'absolute', left: 9.5, top: 34, height: 2.5, width: 5, borderRadius: 999, background: '#94a3b8' }} />
      <span style={{
        position: 'absolute', left: 0, top: 0, width: 24, height: 24, borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${color} 60%, white), color-mix(in srgb, ${color} 78%, black))`,
        boxShadow: 'inset -4px -4px 6px rgba(0,0,0,0.38), inset 2px 2px 8px rgba(255,255,255,0.82), 0 4px 6px rgba(0,0,0,0.34)',
      }} />
    </span>
  )
}

export default function PinnedCardsMap({
  title,
  description,
  items,
  accentColor = '#47c971',
  columns = 'three',
}: PinnedCardsMapProps) {
  const gridColumns = columns === 'four' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)'
  const maxW = columns === 'four' ? 1100 : 900

  return (
    <section style={{ paddingTop: 64, paddingBottom: 64, background: 'var(--cream)' }}>
      <div style={{ maxWidth: maxW, margin: '0 auto', padding: '0 60px' }}>
        <div style={{ maxWidth: columns === 'four' ? 860 : 680, margin: '0 auto 56px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, marginBottom: 0 }}>
            {title}
            <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              {description}
            </span>
          </h2>
        </div>

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: gridColumns, gap: '32px 24px', paddingTop: 24 }}>
          <svg
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '100%', opacity: 0.20, zIndex: 0, pointerEvents: 'none' }}
            viewBox="0 0 1000 220"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 105 Q250 22 500 108 T1000 105" stroke={accentColor} strokeWidth="2" strokeDasharray="10 10" />
          </svg>

          {items.map((item, index) => {
            const color = item.color ?? accentColor
            const rotation = rotations[index % rotations.length]
            const card = (
              <article
                key={item.title}
                style={{
                  position: 'relative',
                  minHeight: 220,
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.18)',
                  padding: 24,
                  background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 78%, black))`,
                  boxShadow: `0 18px 42px color-mix(in srgb, ${color} 22%, transparent)`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  zIndex: 1,
                  ...rotation,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) translateY(-8px)'
                  ;(e.currentTarget as HTMLElement).style.zIndex = '20'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = rotation.transform as string
                  ;(e.currentTarget as HTMLElement).style.zIndex = '1'
                }}
              >
                <Pushpin color={color} />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: 'rgba(255,255,255,0.30)', letterSpacing: '-0.04em' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', outline: '1px solid rgba(255,255,255,0.18)' }}>
                    {item.icon}
                  </span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.76)' }}>{item.description}</p>
              </article>
            )

            return item.href ? (
              <Link key={item.title} to={item.href} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                {card}
              </Link>
            ) : (
              <div key={item.title} style={{ height: '100%' }}>
                {card}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
