import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import PinnedCardsMap, { type PinnedCardItem } from '../components/PinnedCardsMap'
import { verticals } from '../data/knowledgeArchitecture'
const ArrowUpRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
)
const Lightbulb = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
)
const FileSearch = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4.268 21a2 2 0 0 0 1.732 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="m9 18-1.5-1.5"/><circle cx="8" cy="13" r="4"/></svg>
)
const Beaker = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>
)
const BookOpen = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
)
const Search = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
)
const CheckCircle2 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
)
const Layers3 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0l8.57-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
)
const RefreshCcw = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
)

const comparison = [
  {
    title: 'Most content',
    items: ['repeats existing information', 'stays vague', 'becomes outdated', 'ignores missing questions'],
  },
  {
    title: 'Fiindt',
    items: ['investigates unclear questions', 'compares sources', 'updates old information', 'produces clearer answers'],
  },
]

const workflow: PinnedCardItem[] = [
  { title: 'Questions', description: 'We identify questions that do not yet have clear, practical answers.', icon: <Lightbulb />, color: '#ffc524' },
  { title: 'Research', description: 'We collect useful information from sources, tools, examples, data and real use cases.', icon: <FileSearch />, color: '#3B82F6' },
  { title: 'Analysis', description: 'We compare, filter and connect signals that are usually scattered or incomplete.', icon: <Beaker />, color: '#EC4899' },
  { title: 'Output', description: 'We publish structured guides, comparisons, resources and practical answers.', icon: <BookOpen />, color: '#47c971' },
]

const method = [
  { title: 'Discover', description: 'Find real questions, knowledge gaps and outdated answers.', Icon: Search },
  { title: 'Investigate', description: 'Collect sources, examples, tools, data and user signals.', Icon: FileSearch },
  { title: 'Verify', description: 'Check relevance, accuracy and practical usefulness.', Icon: CheckCircle2 },
  { title: 'Structure', description: 'Organize findings into verticals, sub-niches, categories and articles.', Icon: Layers3 },
  { title: 'Update', description: 'Refresh important content when tools, habits or facts evolve.', Icon: RefreshCcw },
]

const status = [
  { value: '12', label: 'Knowledge verticals', description: 'Tech, Finance, Education, Health, Business, Lifestyle, Nature, Travel, Science, Sports, Society and Entertainment — each structured as a full navigable knowledge domain with sub-niches, categories and original articles.' },
  { value: '4-layer', label: 'Editorial architecture', description: 'Every topic follows a four-level hierarchy: vertical domain → sub-niche → category → article. This structure lets readers navigate from a broad subject to a precise, actionable answer without losing context.' },
  { value: '500+', label: 'Planned resources', description: 'Original guides, structured comparisons and practical answers across all verticals — a growing editorial roadmap built around real knowledge gaps.' },
]

const team = [
  { role: 'Editorial Lead',    color: '#47c971', bg: 'rgba(71,201,113,.12)',   name: 'Bailey', surname: 'Dupont', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', position: 'center 34%' },
  { role: 'Research Editor',   color: '#4a90e2', bg: 'rgba(74,144,226,.12)',   name: 'Murad',  surname: 'Naser',  photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', position: 'center 31%' },
  { role: 'Product Design',    color: '#ffc524', bg: 'rgba(255,197,36,.14)',   name: 'Avery',  surname: 'Davis',  photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', position: 'center 38%' },
  { role: 'Content Strategy',  color: '#d4607a', bg: 'rgba(212,96,122,.12)',   name: 'Jordan', surname: 'Ellis',  photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80', position: 'center 28%' },
]

const wrap: CSSProperties = { maxWidth: 1100, margin: '0 auto', padding: '0 60px' }
const sec: CSSProperties = { paddingTop: 64, paddingBottom: 64 }
const h2Style: CSSProperties = { fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, margin: 0 }
const ghost: CSSProperties = { display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }
const para: CSSProperties = { fontSize: 17, lineHeight: 1.55, letterSpacing: '-0.01em', color: 'rgba(67,38,29,.55)', margin: 0 }
const btnPrimary: CSSProperties = { background: 'var(--brand-green)', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '-0.01em', fontFamily: "'Inter', sans-serif" }
const btnOutline: CSSProperties = { border: '1px solid rgba(67,38,29,.18)', color: 'var(--text)', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: 'none', letterSpacing: '-0.01em', fontFamily: "'Inter', sans-serif" }

function MethodRail() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const update = () => {
      frameRef.current = null
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const travel = Math.max(1, rect.height - window.innerHeight)
      const progress = rect.top > 0 ? 0 : Math.min(1, Math.abs(rect.top) / travel)
      setActive(Math.min(4, Math.floor(progress * 5)))
    }
    const schedule = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  const steps = [
    {
      num: 1,
      title: 'Discover knowledge gaps across 12 domains',
      paras: [
        'We continuously monitor search behavior, forum discussions and content trends to identify questions where information is missing, unclear or outdated. Every article starts with a real gap — something someone searched for but never found a satisfying answer to.',
        'Our editorial team reviews hundreds of topics across verticals including tech, health, finance, education and science to map where useful knowledge is still missing online.',
      ],
      visual: (
        <div style={{ background: 'var(--cream)', borderRadius: 16, border: '0.5px solid rgba(67,38,29,.10)', padding: 28, display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 8px 32px rgba(67,38,29,.05)' }}>
          <div style={{ background: 'rgba(67,38,29,.04)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(67,38,29,.35)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span style={{ fontSize: 13, color: 'rgba(67,38,29,.40)', letterSpacing: '-0.01em' }}>How to reduce inflammation naturally?</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Missing', 'Vague', 'Outdated', 'Unclear', 'Gap found', 'No source'].map((tag, i) => (
              <span key={tag} style={{ fontSize: 12, fontWeight: 600, padding: '5px 11px', borderRadius: 999, background: i === 4 ? 'rgba(71,201,113,.14)' : 'rgba(67,38,29,.06)', color: i === 4 ? 'var(--brand-green)' : 'rgba(67,38,29,.45)', letterSpacing: '-0.01em' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {['tech / AI tools', 'health / inflammation', 'finance / tax basics'].map((domain, i) => (
              <div key={domain} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: i === 1 ? 'rgba(71,201,113,.10)' : 'rgba(67,38,29,.04)', border: i === 1 ? '1px solid rgba(71,201,113,.25)' : '1px solid transparent' }}>
                <span style={{ fontSize: 12, color: 'rgba(67,38,29,.55)', letterSpacing: '-0.01em' }}>{domain}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: i === 1 ? 'var(--brand-green)' : 'rgba(67,38,29,.30)' }}>{i === 1 ? '● Gap identified' : '○ Monitoring'}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      num: 2,
      title: 'Investigate every angle of a topic',
      paras: [
        'Our team collects information from academic papers, expert sources, documentation, tools, case studies and real user experiences. We do not stop at the first available answer — we search until we have enough material to produce something more useful than what already exists.',
        'For each topic, we map conflicting sources, compare data points and document the reasoning behind every conclusion we include in a published guide.',
      ],
      visual: (
        <div style={{ background: 'var(--cream)', borderRadius: 16, border: '0.5px solid rgba(67,38,29,.10)', padding: 28, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 8px 32px rgba(67,38,29,.05)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'rgba(67,38,29,.35)', margin: '0 0 4px' }}>Sources collected</p>
          {[
            { label: 'PubMed — inflammation markers study', type: 'Academic', color: '#3B82F6' },
            { label: 'Harvard Health — dietary patterns', type: 'Expert', color: '#47c971' },
            { label: 'NHS — evidence-based recommendations', type: 'Official', color: '#ffc524' },
            { label: 'r/nutrition — 340 user reports', type: 'Real cases', color: '#EC4899' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, background: 'rgba(67,38,29,.03)', border: '0.5px solid rgba(67,38,29,.08)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0, display: 'inline-block' }} />
              <span style={{ flex: 1, fontSize: 12, color: 'rgba(67,38,29,.65)', letterSpacing: '-0.01em' }}>{s.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: s.color + '18', color: s.color }}>{s.type}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: 3,
      title: 'Verify accuracy and practical usefulness',
      paras: [
        'Every piece of information is cross-referenced across multiple sources before being included. We ask three questions: Is this accurate? Is it still current? Would a reader find it actionable today? Content that fails these standards does not make it into a published guide.',
        'Our editorial standards are designed to produce knowledge that is both correct and useful — not content that merely appears to answer a question while staying vague.',
      ],
      visual: (
        <div style={{ background: 'var(--cream)', borderRadius: 16, border: '0.5px solid rgba(67,38,29,.10)', padding: 28, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 8px 32px rgba(67,38,29,.05)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'rgba(67,38,29,.35)', margin: '0 0 4px' }}>Verification checklist</p>
          {[
            { label: 'Cross-referenced across 4+ sources', done: true },
            { label: 'Published within last 3 years', done: true },
            { label: 'Actionable for the reader today', done: true },
            { label: 'No conflicting claims unresolved', done: true },
            { label: 'Ready to publish', done: false, highlight: true },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 9, background: item.highlight ? 'rgba(71,201,113,.08)' : 'rgba(67,38,29,.03)', border: item.highlight ? '1px solid rgba(71,201,113,.25)' : '0.5px solid rgba(67,38,29,.07)' }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: item.done ? 'var(--brand-green)' : 'rgba(67,38,29,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </span>
              <span style={{ fontSize: 13, color: item.highlight ? 'var(--brand-green)' : 'rgba(67,38,29,.60)', fontWeight: item.highlight ? 600 : 400, letterSpacing: '-0.01em' }}>{item.label}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: 4,
      title: 'Structure findings into a clear knowledge system',
      paras: [
        'Verified findings are organized using Fiindt\'s four-layer editorial system: vertical domain, sub-niche, category, and article. This structure lets readers navigate from a broad topic area down to a precise answer, without losing context along the way.',
        'Every article belongs to a specific place in the knowledge map. Nothing is published as an isolated piece — each guide connects upward to its domain and downward to related resources.',
      ],
      visual: (
        <div style={{ background: 'var(--cream)', borderRadius: 16, border: '0.5px solid rgba(67,38,29,.10)', padding: 28, boxShadow: '0 8px 32px rgba(67,38,29,.05)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'rgba(67,38,29,.35)', margin: '0 0 16px' }}>Knowledge structure</p>
          {[
            { level: 'Vertical', value: 'Health', indent: 0, color: '#26221e' },
            { level: 'Sub-niche', value: 'Nutrition', indent: 1, color: '#3B82F6' },
            { level: 'Category', value: 'Anti-inflammatory foods', indent: 2, color: '#47c971' },
            { level: 'Article', value: 'Best foods to reduce inflammation', indent: 3, color: '#ffc524' },
          ].map((node) => (
            <div key={node.level} style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: node.indent * 18, marginBottom: 8 }}>
              {node.indent > 0 && <span style={{ width: 14, height: 1, background: 'rgba(67,38,29,.18)', display: 'inline-block', flexShrink: 0 }} />}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: node.color + '10', border: `0.5px solid ${node.color}30`, borderRadius: 8, padding: '7px 12px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: node.color, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{node.level}</span>
                <span style={{ fontSize: 12, color: 'rgba(67,38,29,.65)', letterSpacing: '-0.01em' }}>{node.value}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: 5,
      title: 'Update knowledge when the world changes',
      paras: [
        'Tools change, facts shift and better answers emerge over time. Fiindt treats useful content as a living resource, not a static document. Important guides are reviewed and refreshed regularly to ensure the information readers find on Fiindt is current, accurate and still useful.',
        'When an article is updated, we document what changed and why — so readers know they can trust what they are reading today, not just what was true when the article was first published.',
      ],
      visual: (
        <div style={{ background: 'var(--cream)', borderRadius: 16, border: '0.5px solid rgba(67,38,29,.10)', padding: 28, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 8px 32px rgba(67,38,29,.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'rgba(67,38,29,.35)', margin: 0 }}>Article lifecycle</p>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'rgba(71,201,113,.12)', color: 'var(--brand-green)' }}>Live</span>
          </div>
          {[
            { date: 'Jan 2024', label: 'First published', note: 'Initial research + 6 sources', active: false },
            { date: 'May 2024', label: 'Minor update', note: 'New study added', active: false },
            { date: 'Jan 2025', label: 'Full review', note: 'Sources re-verified, section added', active: false },
            { date: 'Jun 2025', label: 'Updated', note: 'New clinical data integrated', active: true },
          ].map((ev) => (
            <div key={ev.date} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: ev.active ? 'var(--brand-green)' : 'rgba(67,38,29,.20)', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ width: 1, height: 20, background: 'rgba(67,38,29,.10)', display: 'inline-block' }} />
              </div>
              <div style={{ paddingBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: ev.active ? 'var(--brand-green)' : 'rgba(67,38,29,.35)', display: 'block', marginBottom: 1 }}>{ev.date}</span>
                <span style={{ fontSize: 13, fontWeight: ev.active ? 600 : 400, color: ev.active ? '#26221e' : 'rgba(67,38,29,.55)', display: 'block', letterSpacing: '-0.01em' }}>{ev.label}</span>
                <span style={{ fontSize: 11, color: 'rgba(67,38,29,.40)' }}>{ev.note}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <section className="about-method-rail" ref={sectionRef} style={{ minHeight: '450vh', background: 'var(--cream)', position: 'relative' }}>
      <style>{`@keyframes stepReveal { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="about-method-sticky" style={{
        position: 'sticky',
        top: 74,
        height: 'calc(100vh - 74px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 48,
        paddingBottom: 48,
        boxSizing: 'border-box',
      }}>
        <div className="about-method-grid" style={{ width: 'min(calc(100% - 120px), 1220px)', margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 64, alignItems: 'start' }}>

          {/* Left — accordion */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((step, index) => {
              const isActive = index === active
              return (
                <div
                  key={step.num}
                  onClick={() => setActive(index)}
                  style={{ display: 'flex', gap: 0, cursor: isActive ? 'default' : 'pointer' }}
                >
                  {/* Left indicator — vertical bar always present, horizontal arm morphs */}
                  <div style={{ width: 26, flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 20, paddingBottom: 20 }}>
                    <div style={{ width: 4, borderRadius: 2, background: 'var(--brand-green)', alignSelf: 'stretch', position: 'relative' }}>
                      {/* Horizontal arm — disappears first on activate, appears last on deactivate */}
                      <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: 4, borderRadius: 2,
                        background: 'var(--brand-green)',
                        width: isActive ? 0 : 22,
                        transition: isActive
                          ? 'width 0.12s ease 0s'
                          : 'width 0.18s ease 0.36s',
                      }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ paddingLeft: 20, flex: 1, paddingTop: 20, paddingBottom: 20 }}>
                    {isActive && (
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-green)', letterSpacing: '-0.01em', display: 'block', marginBottom: 8 }}>
                        Step {step.num}
                      </span>
                    )}
                    <h3 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
                      {step.title}
                    </h3>

                    {/* Body — grid trick: 0fr ↔ 1fr for smooth height */}
                    <div style={{
                      display: 'grid',
                      gridTemplateRows: isActive ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.42s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ paddingTop: 14 }}>
                          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(67,38,29,.55)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>{step.paras[0]}</p>
                          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(67,38,29,.55)', margin: 0, letterSpacing: '-0.01em' }}>{step.paras[1]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right — visual */}
          <div className="about-method-visual" key={active} style={{ animation: 'stepReveal 0.5s ease-out both' }}>
            {steps[active].visual}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const [fiindtHovered, setFiindtHovered] = useState(false)
  return (
    <div className="about-page" style={{ fontFamily: "'Inter', sans-serif", background: 'var(--cream)', color: 'var(--text)' }}>

      {/* Hero */}
      <section style={{ minHeight: 'calc(100svh - 52px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'var(--cream)' }}>
        <div style={wrap}>
           <h1 style={{ fontSize: 'clamp(48px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.046em', color: '#26221e', lineHeight: 1.1, maxWidth: 680, margin: '0 auto 20px' }}>
            Built to find the answers that are missing.
          </h1>
          <p style={{ ...para, maxWidth: 540, margin: '0 auto 32px', fontSize: 18, color: 'rgba(67,38,29,.55)' }}>
            Fiindt researches, structures and updates practical knowledge so readers can find clearer answers to questions that are often vague, outdated or not answered well online.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            <Link to="/tech" style={btnPrimary}>Explore Fiindt <ArrowUpRight /></Link>
            <Link to="/contact" className="btn-outline" style={btnOutline}>Contact</Link>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(67,38,29,.40)', letterSpacing: '-0.01em' }}>
            Structured knowledge for people who want clarity, not noise.
          </p>
        </div>
      </section>

      {/* Why we exist */}
        <section className="about-why-section" style={{ ...sec, background: 'var(--cream-2)' }}>
          <div className="about-why-inner" style={{ ...wrap, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
            <div className="about-why-copy" style={{ maxWidth: 480, flexShrink: 0 }}>
              <h2 style={h2Style}>
                The internet has information.
                <span style={ghost}>Not always answers.</span>
              </h2>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={para}>Many online answers are repetitive, outdated, vague or copied from the same sources. Some of the questions people really ask still do not have a clear answer at all.</p>
              <p style={para}>Fiindt exists to close that gap: we look for missing answers, refine existing knowledge and turn scattered information into practical, structured resources.</p>
            </div>
          </div>

          <div className="comparison-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, alignItems: 'start', position: 'relative', overflow: 'visible', width: 560, flexShrink: 0 }}>
            {comparison.map((group) => {
              const isFiindt = group.title === 'Fiindt'
              return (
                <article
                  key={group.title}
                  onMouseEnter={() => setFiindtHovered(true)}
                  onMouseLeave={() => setFiindtHovered(false)}
                  style={{
                    position: 'relative',
                    borderRadius: 14,
                    border: isFiindt ? 'none' : '0.5px solid rgba(67,38,29,.10)',
                    padding: '24px 26px 22px',
                    background: isFiindt ? 'var(--brand-green)' : 'var(--cream)',
                    marginTop: isFiindt ? 28 : 0,
                    transform: isFiindt && fiindtHovered ? 'translateX(12px) translateY(-28px) scale(1.16)' : 'scale(1)',
                    transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                    transformOrigin: 'center top',
                    zIndex: isFiindt ? 2 : 1,
                  }}
                >
                  {/* Arrow glued to the left edge of the green card */}
                  {isFiindt && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute', left: -16, top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10, width: 32, height: 32, borderRadius: '50%',
                        background: '#fff', border: '0.5px solid rgba(67,38,29,.12)',
                        boxShadow: '0 2px 8px rgba(67,38,29,.10)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                    </span>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                    <h3 style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em', color: isFiindt ? '#fff' : '#26221e', margin: 0 }}>{group.title}</h3>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.10em', padding: '3px 8px', borderRadius: 999, background: isFiindt ? 'rgba(255,255,255,.18)' : 'rgba(67,38,29,.06)', color: isFiindt ? '#fff' : 'rgba(67,38,29,.40)' }}>
                      {isFiindt ? 'Clarity' : 'Noise'}
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {group.items.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 14, lineHeight: 1.45, color: isFiindt ? 'rgba(255,255,255,.85)' : 'rgba(67,38,29,.55)' }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', flexShrink: 0, background: isFiindt ? 'rgba(255,255,255,.60)' : 'rgba(67,38,29,.30)', display: 'inline-block' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* What we do */}
      <PinnedCardsMap
        title="We do more than collect information."
        description="Fiindt researches questions, studies existing sources, compares data and turns scattered signals into clear knowledge."
        items={workflow}
        columns="four"
      />

      {/* Editorial Method */}
      <section className="journey wrap journey-5step" style={{ marginTop: 0, paddingTop: 64, paddingBottom: 64 }}>
        <div className="section-heading">
          <h2>
            How we turn scattered information into useful knowledge.
            <span style={ghost}>Five steps, every article.</span>
          </h2>
        </div>
        <div className="journey-track">
          {method.map((m, index) => (
            <article key={m.title}>
              <span>{index + 1}</span>
              <p>{m.title}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Step-by-step detail */}
      <MethodRail />

      {/* Status */}
      <section style={{ ...sec, paddingTop: 64, background: 'var(--cream-2)' }}>
        <div style={wrap}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={h2Style}>
              A growing editorial system.
              <span style={ghost}>Where Fiindt is now.</span>
            </h2>
          </div>
          <div className="about-status-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, alignItems: 'end' }}>

            {/* Left — 4-layer architecture card */}
            <article style={{ background: 'var(--cream)', border: '0.5px solid rgba(67,38,29,.10)', borderRadius: 12, padding: 22 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(67,38,29,.45)', letterSpacing: '-0.01em', margin: '0 0 8px' }}>{status[1].label}</h3>
              <h3 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.03em', color: '#26221e', margin: '0 0 10px' }}>{status[1].value}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', margin: '0 0 14px' }}>From broad domain to precise article — four levels of structured knowledge.</p>
              <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', margin: 0 }}>
                <span style={{ color: 'rgba(67,38,29,.45)' }}>Vertical → Sub-niche → Category → </span>
                <span style={{ color: 'var(--brand-green)' }}>Article</span>
              </p>
            </article>

            {/* Center — dark verticals card */}
            <article style={{ borderRadius: 14, background: '#26221e', padding: 26, color: '#fff' }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.45)', letterSpacing: '-0.01em', margin: '0 0 10px' }}>{status[0].label}</h3>
              <h3 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 6px' }}>{status[0].value}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,.55)', margin: '0 0 18px' }}>A structured roadmap across major knowledge areas.</p>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', listStyle: 'none', padding: 0, margin: 0 }}>
                {(['tech','health','education','entertainment','finance','nature','sports','lifestyle','business','travel','science','society'] as const)
                  .map(slug => verticals.find(v => v.slug === slug))
                  .filter(Boolean)
                  .map((v) => (
                    <li key={v!.slug} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.80)' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: v!.color, flexShrink: 0, display: 'inline-block' }} />
                      {v!.label}
                    </li>
                  ))}
              </ul>
            </article>

            {/* Right — quote + 500+ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <article style={{ background: 'var(--cream)', border: '0.5px solid rgba(67,38,29,.10)', borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.55, color: '#26221e', margin: '0 0 12px' }}>
                  "We investigate real gaps — questions people search for but never find a clear answer to."
                </p>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(67,38,29,.45)', letterSpacing: '-0.01em', margin: 0 }}>Editorial standard</h3>
              </article>
              <article style={{ borderRadius: 12, background: 'var(--brand-green)', padding: 20, color: '#fff' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.75)', letterSpacing: '-0.01em', margin: '0 0 6px' }}>{status[2].label}</h3>
                <h3 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 6px' }}>{status[2].value}</h3>
                <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5, color: 'rgba(255,255,255,.85)', margin: 0 }}>Guides, comparisons and answers across all verticals.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={h2Style}>
              The people behind Fiindt.
              <span style={ghost}>Building with a focus on clarity and useful knowledge.</span>
            </h2>
          </div>
          <div className="about-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
            {team.map((member) => (
              <article key={`${member.name}-${member.surname}`} style={{ overflow: 'hidden', borderRadius: 16, border: '0.5px solid rgba(67,38,29,.10)', background: 'var(--cream-2)', boxShadow: '0 8px 32px rgba(67,38,29,.05)' }}>
                <div style={{ padding: '16px 16px 12px' }}>
                  <span style={{ display: 'inline-flex', borderRadius: 7, background: member.bg, padding: '4px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: member.color }}>{member.role}</span>
                  <h3 style={{ margin: '12px 0 0', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: '#26221e', lineHeight: 1.2 }}>{member.name}<br />{member.surname}</h3>
                </div>
                <div style={{ aspectRatio: '4/4.2', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url("${member.photo}")`, backgroundSize: 'cover', backgroundPosition: member.position }} role="img" aria-label={`${member.name} ${member.surname}`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section" style={{ ...sec, background: 'var(--cream)' }}>
        <div className="about-cta-shell" style={{ width: 'min(calc(100% - 120px), 1220px)', margin: '0 auto' }}>
          <div className="about-cta-panel" style={{ background: '#26221e', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#fbf4eb', lineHeight: 1.15, margin: 0 }}>
              Start exploring structured knowledge.
              <span style={{ display: 'block', color: 'rgba(251,244,235,.40)', marginTop: 6, fontSize: '0.78em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                Practical guides across focused topics.
              </span>
            </h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/tech" style={btnPrimary}>Explore Fiindt <ArrowUpRight /></Link>
              <Link to="/contact" className="btn-outline-dark" style={{ ...btnOutline, color: '#fbf4eb', borderColor: 'rgba(251,244,235,.25)' }}>Contact</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
