import { Link } from 'react-router-dom'
import { cx } from '@mayne/ui-kit'
import { useSEO } from '../hooks/useSEO'

const stemHero = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=86'
const codeHero = 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=2200&q=86'
const explorePath = '/tech'

function MediaHero({ image, title, subtitle, cta, tone = 'dark' }: {
  image: string
  title: string
  subtitle: string
  cta?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <section className={cx('media-hero', tone === 'light' && 'media-hero-light')}>
      <img src={image} alt="" />
      <div className="wrap">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {cta ? <Link className="button button-green" to={explorePath}>{cta}</Link> : null}
      </div>
    </section>
  )
}

function LanguageCloud() {
  return (
    <section className="language-cloud wrap">
      <h2>Programming languages in demand</h2>
      <p>Python is required for most opportunities and often unlocks higher-paid work.</p>
      <div>
        {['Python', 'C', 'Java', 'TypeScript', 'C#', 'Rust', 'Go', 'JavaScript', 'C++', 'Kotlin', 'Ruby', 'PHP'].map(
          (lang) => <span key={lang}>{lang}</span>,
        )}
      </div>
    </section>
  )
}

function EarningPotential({ isStem }: { isStem: boolean }) {
  const values = isStem
    ? ['$3,000/mo', '$6,000/mo', '$12,000/mo']
    : ['$3,600/mo', '$7,200/mo', '$12,600/mo']
  return (
    <section className="earning wrap">
      <h2>Earning potential</h2>
      <p>Estimates depend on specialization, time contributed, and accepted tasks.</p>
      <div>
        {values.map((value, index) => (
          <article key={value}>
            <span>Up to</span>
            <strong>{value}</strong>
            <p>{[10, 20, 35][index]} hours/week</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function ProjectPage({ kind }: { kind: 'stem' | 'code' }) {
  const isStem = kind === 'stem'

  useSEO({
    title: isStem ? 'STEM Project' : 'Code Review Project',
    description: isStem
      ? 'Join remote scientific projects and design research-level challenges that help AI reason through difficult problems.'
      : 'Help build safer, more reliable AI with senior-level code judgment and review.',
  })

  const detailCards = isStem
    ? [
        ['Biology', 'Create sequence, scoring, and validation challenges.'],
        ['Engineering', 'Model simulations with thermal, mechanical, or system constraints.'],
        ['Physics', 'Build multi-step scenarios with boundary and eigenvalue checks.'],
        ['Mathematics', 'Design reasoning tasks that require rigorous numerical validation.'],
      ]
    : [
        ['Code quality review', 'Evaluate generated code for correctness and maintainability.'],
        ['Test case writing', 'Design tests that capture edge cases and behavior.'],
        ['Bug identification', 'Find logical errors automated tests may miss.'],
        ['Architecture assessment', 'Judge whether generated systems are scalable and clean.'],
      ]

  return (
    <>
      <MediaHero
        image={isStem ? stemHero : codeHero}
        title={isStem
          ? 'Turn scientific expertise into smarter AI'
          : 'AI coding projects. Review & improve AI-generated code'}
        subtitle={isStem
          ? 'Join remote scientific projects and design research-level challenges.'
          : 'Help build safer, more reliable AI with senior-level code judgment.'}
        cta="Apply now"
      />
      <section className="project-detail wrap">
        <article>
          <h2>About the project</h2>
          <p>
            {isStem
              ? 'Professionals in STEM domains create, verify, and refine complex scientific tasks that help AI reason through difficult problems.'
              : 'Experienced developers review AI-generated solutions, compare implementations, spot bugs, and explain what should improve.'}
          </p>
        </article>
        <div className="detail-stats">
          {(isStem
            ? ['Up to $6,000+/month', 'Flexible remote project', 'Research-level AI tasks', 'Performance bonus']
            : ['Up to $90 per hour', 'Flexible remote project', 'Global community', 'Hands-on AI experience']
          ).map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>
      <section className="split-section wrap">
        <h2>{isStem ? 'How you might contribute' : 'Types of AI code review tasks'}</h2>
        <div className="mini-grid detail">
          {detailCards.map(([title, copy]) => (
            <article className="mini-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      {!isStem ? <LanguageCloud /> : null}
      <EarningPotential isStem={isStem} />
    </>
  )
}
