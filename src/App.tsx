import { type CSSProperties, useEffect, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { MayneFadeIn, MayneGlowBackground, cx } from '@mayne/ui-kit'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  AiLaptopIcon,
  Apple01Icon,
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Atom01Icon,
  BankIcon,
  BookOpen01Icon,
  BookOpenTextIcon,
  BrainIcon,
  BriefcaseBusinessIcon,
  Compass01Icon,
  Coffee01Icon,
  Film01Icon,
  FolderLibraryIcon,
  FootballIcon,
  HealthIcon,
  HeartPulseIcon,
  LegalDocument01Icon,
  Menu01Icon,
  Moon02Icon,
  PlaneIcon,
  Search01Icon,
  Shield01Icon,
  StarIcon,
  Tree03Icon,
  UserGroupIcon,
  Dumbbell01Icon,
  WorkoutStretchingIcon,
} from '@hugeicons/core-free-icons'
import {
  getArticlesByNiche,
  getArticlesByVertical,
  getSubNicheBySlug,
  getVerticalBySlug,
  type VerticalArticle,
  verticals,
} from './data/knowledgeArchitecture'
import { legalPages as fiindtLegalPages, type LegalPageRecord } from './data/fiindtLegalPages'
import { mockArticles as fiindtArticles } from './data/fiindtMockArticles'
import type { Article as FiindtArticle } from './types/content'
import './App.css'

const routes = {
  home: '/',
  how: '/how',
  blog: '/blog',
  about: '/about',
  faq: '/faq',
  stem: '/project/stem',
  code: '/project/code',
  health: '/health',
}

const primaryExplorePath = '/tech'

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const assets = {
  howHero:
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=2200&q=86',
  codeHero:
    'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=2200&q=86',
  stemHero:
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=86',
  aboutVideo:
    'https://framerusercontent.com/assets/FqE6J8ykSd2msbXsSwNoCRGBZ4.mp4',
  aboutOffice:
    'https://framerusercontent.com/images/8KmTeSaw0hV1A07L0O7dDeq6e8s.jpg?scale-down-to=1024&width=1920&height=1080',
  howCards: [
    'https://framerusercontent.com/images/xvl4i0BeCA4Kv7FVftmrHvxKeI.svg?width=272&height=158',
    'https://framerusercontent.com/images/rC6TZg4fLIphTKXZwQo2mRQQAjE.svg?width=272&height=158',
    'https://framerusercontent.com/images/Qd2qVPknASMh0sEMa7dQOTE8.svg?width=272&height=158',
  ],
  blogImages: [
    'https://framerusercontent.com/images/c7IR0Kn94HesJN3cwOzhg4E9Q.jpg?scale-down-to=1024&width=1960&height=1100',
    'https://framerusercontent.com/images/WFy0B2DIthLxSbNEot71Ahp8A.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/tg59DUNmUj84l4hmt8pSuK5PdI8.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/46kce4sgV2is5KzUfaVylNiG4.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/suypZWPfhjHMwSd1KlDpsUchM3g.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/uN3rLs5RB4DCx1cOMTeMZ3W20.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/cone0lOMhgMMLB74HdFNZqrC02I.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/3pgFSAmlNtt6yMGcwoJ2aRZRzI.jpg?width=1960&height=1100',
  ],
}

const processSteps = [
  {
    value: '7',
    title: 'Active verticals',
    copy: 'All official areas live',
    icon: Compass01Icon,
    tone: 'blue',
  },
  {
    value: '42',
    title: 'Sub-niches',
    copy: 'Focused business units',
    icon: FolderLibraryIcon,
    tone: 'yellow',
  },
  {
    value: '500+',
    title: 'Resources roadmap',
    copy: 'Planned guides & resources',
    icon: BookOpen01Icon,
    tone: 'green',
  },
]

const homeFaqs = [
  {
    question: 'Is this a job?',
    answer:
      'Mindrift is a project-based platform. Contributors choose available projects and work remotely without fixed hours.',
  },
  {
    question: 'How much can I earn as an AI trainer?',
    answer:
      'Rates vary by project and expertise. Many opportunities show hourly ranges before you apply.',
  },
  {
    question: 'What qualifications do I need?',
    answer:
      'Strong domain knowledge matters most. Some projects require assessments, language skills, or professional experience.',
  },
  {
    question: 'How and when do I get paid?',
    answer:
      'Accepted tasks are paid through the platform on a recurring payment schedule.',
  },
  {
    question: 'What kind of AI training tasks are available?',
    answer:
      'Tasks include writing prompts, reviewing AI output, comparing answers, correcting mistakes, and creating ideal responses.',
  },
  {
    question: 'Do I need AI experience to get started?',
    answer:
      'No. Many projects focus on professional knowledge rather than machine-learning experience.',
  },
]

const blogPosts = [
  [
    'How to become an AI code reviewer: Skills, process, and earnings guide',
    'Remote Opportunities',
    'June 12, 2026',
  ],
  ['Coding side hustles for software engineers', 'Remote Opportunities', 'June 11, 2026'],
  ['AI code review jobs: a developer guide', 'Remote Opportunities', 'June 9, 2026'],
  ['Python AI training jobs', 'Remote Opportunities', 'June 4, 2026'],
  ['How real-life humans are using the AI you shape', 'GenAI Insights', 'June 1, 2026'],
  ['Is AI training a good career in 2026?', 'Remote Opportunities', 'May 11, 2026'],
  ['AI training tasks explained', 'AI Training', 'April 20, 2026'],
  ['How to become an AI trainer with no experience', 'AI Training', 'April 8, 2026'],
  ['What is AI training?', 'AI Training', 'March 24, 2026'],
  ['A guide to mental well-being for AI trainers', 'AI Training', 'March 12, 2026'],
  ['How projects at Mindrift go from idea to launch', 'Inside Mindrift', 'February 26, 2026'],
  ['The biggest AI trends for 2026', 'GenAI Insights', 'December 18, 2025'],
]

const subNicheIcons = {
  wellness: HeartPulseIcon,
  nutrition: Apple01Icon,
  sleep: Moon02Icon,
  fitness: Dumbbell01Icon,
  'mental-health-basics': BrainIcon,
  recovery: WorkoutStretchingIcon,
}

const explorerMenuItems = verticals.map((vertical) => ({
  label: vertical.label,
  href: `/${vertical.slug}`,
  description: vertical.description,
  color: vertical.color,
}))

const verticalIcons: Record<string, typeof StarIcon> = {
  tech: AiLaptopIcon,
  finance: BankIcon,
  education: BookOpenTextIcon,
  health: HealthIcon,
  business: BriefcaseBusinessIcon,
  lifestyle: Coffee01Icon,
  nature: Tree03Icon,
  sports: FootballIcon,
  travel: PlaneIcon,
  society: UserGroupIcon,
  science: Atom01Icon,
  entertainment: Film01Icon,
}

const verticalHeroImages: Record<string, string> = {
  tech: 'https://images.unsplash.com/photo-1576633587217-5c9b4930956b?auto=format&fit=crop&w=2400&q=86',
  finance: 'https://images.unsplash.com/photo-1723095816936-fcda04ba0ece?auto=format&fit=crop&w=2400&q=86',
  education: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=2200&q=86',
  health: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=2400&q=86',
  business: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2400&q=86',
  lifestyle: 'https://images.unsplash.com/photo-1484446991649-77f7fbd73f1f?auto=format&fit=crop&w=2400&q=86',
  nature: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2200&q=86',
  sports: 'https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?auto=format&fit=crop&w=2400&q=86',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2200&q=86',
  society: 'https://images.unsplash.com/photo-1555993538-2befa9c02a60?auto=format&fit=crop&w=2400&q=86',
  science: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=2200&q=86',
  entertainment: 'https://images.unsplash.com/photo-1756726343711-22af8b452649?auto=format&fit=crop&w=2400&q=86',
}

const verticalHeroPositions: Record<string, string> = {
  tech: '62% center',
  finance: '56% center',
  education: '64% center',
  health: '68% center',
  business: '62% center',
  lifestyle: '66% center',
  nature: '58% center',
  sports: '64% center',
  travel: '62% center',
  society: '64% center',
  science: '64% center',
  entertainment: '66% center',
}

const promoCards = [
  {
    src: '/promo/card1.webp',
    alt: 'Premium partner campaign card',
  },
  {
    src: '/promo/card2.webp',
    alt: 'Product promotion card',
  },
  {
    src: '/promo/card3.webp',
    alt: 'Vertical content campaign card',
  },
  {
    src: '/promo/card4.webp',
    alt: 'Client offer card',
  },
  {
    src: '/promo/card5.webp',
    alt: 'Creative advertising card',
  },
  {
    src: '/promo/card6.webp',
    alt: 'Editorial promotion card',
  },
  {
    src: '/promo/card7.webp',
    alt: 'Partner feature card',
  },
  {
    src: '/promo/card8.webp',
    alt: 'Resource campaign card',
  },
]

const comparison = [
  {
    title: 'Most content',
    items: [
      'repeats existing information',
      'stays vague',
      'becomes outdated',
      'ignores missing questions',
    ],
  },
  {
    title: 'Fiindt',
    items: [
      'investigates unclear questions',
      'compares sources',
      'updates old information',
      'produces clearer answers',
    ],
  },
]

const mindriftLegalPages: Record<string, string> = {
  '/legal/privacy': 'Privacy Notice',
  '/legal/terms': 'Toloka Platforms Terms of Use',
  '/legal/addendum': 'Data Processing Addendum',
  '/legal/eligibility-and-geographic-restrictions':
    'Eligibility and Geographic Restrictions',
  '/legal/cookie-notice/': 'Cookie Notice',
}

const overlayHeaderRoutes = [routes.how, routes.stem, routes.code]

const isHeaderOverlayRoute = (pathname: string) =>
  overlayHeaderRoutes.includes(pathname) ||
  verticals.some((vertical) => pathname === `/${vertical.slug}`)

function App() {
  return (
    <BrowserRouter>
      <PageFrame />
    </BrowserRouter>
  )
}

function PageFrame() {
  const { pathname } = useLocation()
  const isOverlay = isHeaderOverlayRoute(pathname)

  return (
    <main className={cx('page-frame', isOverlay && 'page-frame-overlay')}>
      <SiteHeader />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="how" element={<HowPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="legal" element={<LegalHubPage />} />
        <Route path="privacy" element={<FiindtLegalPage page={fiindtLegalPages.find((page) => page.route === '/privacy-policy')!} />} />
        <Route path="project/stem" element={<ProjectPage kind="stem" />} />
        <Route path="project/code" element={<ProjectPage kind="code" />} />
        {fiindtLegalPages.map((page) => (
          <Route
            key={page.route}
            path={page.route.replace(/^\//, '')}
            element={<FiindtLegalPage page={page} />}
          />
        ))}
        {Object.entries(mindriftLegalPages).map(([path, title]) => (
          <Route
            key={path}
            path={path.replace(/^\//, '')}
            element={<LegalPage title={title} />}
          />
        ))}
        <Route path="redirect-to-login-page" element={<LoginRedirect />} />
        <Route path=":vertical/:subNiche/:slug" element={<ArticlePage />} />
        <Route path=":vertical" element={<VerticalPage />} />
        <Route path=":vertical/:subNiche" element={<VerticalSubNichePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </main>
  )
}

function SiteHeader() {
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const isOverlay = isHeaderOverlayRoute(pathname)
  const isVerticalOverlay = verticals.some((vertical) => pathname === `/${vertical.slug}`)
  const isProjectActive =
    explorerMenuItems.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
  const nav = [
    ['How it works', routes.how],
    ['Blog', routes.blog],
    ['About Us', routes.about],
  ] as const

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 8)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [pathname])

  return (
    <header
      className={cx(
        'site-header',
        isOverlay && !isScrolled && 'site-header-overlay',
        isVerticalOverlay && !isScrolled && 'site-header-light-image',
      )}
    >
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-dropdown">
          <button
            className={cx('nav-link explorer-trigger', isProjectActive && 'active')}
            type="button"
            aria-haspopup="true"
          >
            <HugeiconsIcon icon={ArrowDown01Icon} size={12} strokeWidth={2} />
            Explorer
          </button>
          <div className="project-menu">
            {explorerMenuItems.map((item) => (
              <Link className="project-menu-item" to={item.href} key={item.href}>
                <span style={{ backgroundColor: item.color }} />
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </Link>
            ))}
          </div>
        </div>
        {nav.map(([label, href]) => (
          <NavLink
            key={href}
            className={({ isActive }) => cx('nav-link', isActive && 'active')}
            to={href}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions">
        <NavLink className="nav-link login-link" to="/redirect-to-login-page">
          Log in
        </NavLink>
        <NavLink className="button button-green" to={primaryExplorePath}>
          Apply now
        </NavLink>
      </div>
      <button className="menu-button" type="button" aria-label="Open menu">
        <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={2} />
      </button>
    </header>
  )
}

function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Mindrift home">
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>Mindrift</span>
    </Link>
  )
}

function HomePage() {
  return (
    <>
      <NewHomeHero />
      <Process />
      <Projects />
      <PromoCarousel />
      <TrainerTasks />
      <HomeFAQ />
      <CTA />
    </>
  )
}

function NewHomeHero() {
  return (
    <section className="new-hero">
      <MayneGlowBackground>
        <div className="new-hero-glow" aria-hidden="true" />
        <div className="new-hero-fade" aria-hidden="true" />

        <div className="new-hero-inner">
          <div className="new-hero-grid">
            <MayneFadeIn>
              <div className="new-hero-main">
                <span>Fiindt Knowledge Platform</span>
                <h1>Reliable knowledge, organized for practical decisions.</h1>
                <p>
                  Fiindt structures trusted guides, tools and comparisons into
                  clear verticals so readers can move from broad questions to
                  useful answers without noise.
                </p>
                <form className="new-hero-search" role="search">
                  <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={2} />
                  <input
                    aria-label="Search topics, categories or articles"
                    placeholder="Search topics, categories or articles..."
                  />
                  <Link to="/tech/ai">Search</Link>
                </form>
                <div className="new-hero-actions">
                  <Link className="new-hero-primary" to="/tech/ai">
                    Explore
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={2} />
                  </Link>
                  <Link className="new-hero-outline" to="/contact">
                    Contact
                  </Link>
                </div>
              </div>
            </MayneFadeIn>
            <div className="new-hero-showcase" aria-hidden="true">
              <div className="showcase-card showcase-card-main">
                <span>Knowledge map</span>
                <strong>Vertical → Niche → Category → Article</strong>
                <i />
              </div>
              <div className="showcase-card showcase-card-top">
                <span>Signal score</span>
                <strong>92%</strong>
              </div>
              <div className="showcase-card showcase-card-bottom">
                <span>Reader path</span>
                <strong>Question to resource</strong>
              </div>
            </div>
          </div>
        </div>
      </MayneGlowBackground>
    </section>
  )
}

function Projects() {
  return (
    <section className="projects wrap">
      <div className="section-heading centered">
        <h2>Explore verticals that match your needs</h2>
        <p>Open a focused domain and browse its guides, categories and resources.</p>
      </div>
      <div className="project-grid">
        {verticals.map((vertical) => {
          const Icon = verticalIcons[vertical.slug] ?? StarIcon

          return (
            <Link
              className="project-card vertical-project-card"
              style={{ '--vertical-color': vertical.color } as CSSProperties}
              to={`/${vertical.slug}`}
              key={vertical.slug}
            >
              <div className="project-title">
                <h3>{vertical.label}</h3>
                <span className="project-icon" aria-hidden="true">
                  <HugeiconsIcon icon={Icon} size={31} strokeWidth={1.85} />
                </span>
              </div>
              <p className="vertical-project-description">{vertical.description}</p>
              <div className="project-footer">
                <span>{vertical.subNiches.length} sub-niches</span>
                <span>Explore →</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function TrainerTasks() {
  const latestArticles = [...fiindtArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6)

  return (
    <section className="latest-insights wrap">
      <div className="latest-insights-heading">
        <span>Latest insights</span>
        <h2>Latest from Fiindt</h2>
        <p>Recent resources from the Fiindt editorial system.</p>
      </div>
      <div className="latest-article-grid">
        {latestArticles.map((article) => {
          const vertical = getVerticalBySlug(toSlug(article.vertical))

          return (
            <Link
              className="latest-article-card"
              style={{ '--article-color': vertical?.color ?? '#2563eb' } as CSSProperties}
              to={getFiindtArticlePath(article)}
              key={article.id}
            >
              <p className="latest-article-path">
                {vertical?.label ?? article.vertical} › {article.subNiche}
              </p>
              <div className="latest-article-meta">
                <span>{article.category}</span>
                <small>{article.readingTime} min read</small>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <time>{formatArticleDate(article.publishedAt)}</time>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function PromoCarousel() {
  const cards = [...promoCards, ...promoCards]

  return (
    <section className="promo-carousel" aria-label="Featured promotions">
      <div className="promo-carousel-heading wrap">
        <span>Promotion rail</span>
        <h2>Targeted placements for verticals, partners and products.</h2>
      </div>
      <div className="promo-rail">
        <div className="promo-track">
          {cards.map((card, index) => (
            <figure className="promo-image-card" key={`${card.src}-${index}`}>
              <img src={card.src} alt={card.alt} loading="eager" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="process wrap">
      <div className="process-heading">
        <span>Platform overview</span>
        <h2>A modular knowledge platform</h2>
        <p>
          Fiindt is a modular knowledge platform designed to help readers discover
          reliable, structured and practical information across focused knowledge
          areas.
        </p>
        <p>
          Instead of mixing everything into a single feed, Fiindt organizes content
          into verticals, sub-niches, categories and articles.
        </p>
      </div>
      <div className="step-grid">
        {processSteps.map((step) => (
          <article className="step-card" data-tone={step.tone} key={step.title}>
            <div>
              <strong>{step.value}</strong>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
            <HugeiconsIcon icon={step.icon} size={58} strokeWidth={1.4} />
          </article>
        ))}
        <article className="step-card step-cta">
          <div>
            <strong>4</strong>
            <h3>Content layers</h3>
            <p>Vertical → Sub-niche → Category → Article</p>
          </div>
          <Link className="button button-green" to={primaryExplorePath}>
            Explore
          </Link>
        </article>
      </div>
    </section>
  )
}

function HomeFAQ() {
  return (
    <section className="faq wrap">
      <h2>Frequently asked questions</h2>
      <FAQList items={homeFaqs} />
    </section>
  )
}

function FAQList({ items }: { items: typeof homeFaqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="faq-list">
      {items.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <article className={cx('faq-item', isOpen && 'open')} key={faq.question}>
            <button
              className="faq-question"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="faq-symbol" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
              <span>{faq.question}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}

function CTA({
  title = 'Your expertise trains AI used by millions.',
  subtitle = 'Start your application',
  cta = 'Apply now',
}: {
  title?: string
  subtitle?: string
  cta?: string
}) {
  return (
    <section className="cta wrap">
      <h2>
        {title}
        <span>{subtitle}</span>
      </h2>
      <Link className="button button-green" to={primaryExplorePath}>
        {cta}
      </Link>
    </section>
  )
}

function HowPage() {
  const journey = [
    'Submit CV',
    'Complete assessments',
    'Verify identity',
    'Join a project or talent pool',
    'Access onboarding',
    'Complete tasks and get paid',
  ]
  return (
    <>
      <MediaHero
        image={assets.howHero}
        eyebrow="Curious?"
        title="Here’s how it works"
        subtitle="From selecting an opportunity to completing your first tasks."
        tone="light"
      />
      <section className="split-section wrap">
        <h2>What you’ll do</h2>
        <div className="mini-grid">
          {[
            ['Creating', 'Write examples or prompts the AI can learn from.'],
            ['Evaluating', 'Assess how well AI responds and suggest improvements.'],
            ['Refining', 'Edit content using your subject knowledge.'],
          ].map(([title, copy], index) => (
            <article className="mini-card" key={title}>
              <img src={assets.howCards[index]} alt="" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="see-how wrap">
        <h2>See how it works</h2>
        <img src={assets.howHero} alt="" />
        <p>
          Skilled experts contribute to AI training projects remotely, complete
          tasks on a flexible schedule, and get paid for their knowledge.
        </p>
      </section>
      <section className="journey wrap">
        <JourneySection
          title="Your journey in 6 steps"
          steps={journey}
          detail={(step, index) =>
            index === 0
              ? 'Choose an opportunity, upload an up-to-date CV, and let the team assess your background.'
              : index === 5
                ? 'Once accepted, complete tasks and receive payments for approved work.'
                : `Follow the guided platform process for ${step.toLowerCase()} and move into the right project when a match is available.`
          }
        />
      </section>
    </>
  )
}

function JourneySection({
  title,
  steps,
  detail,
}: {
  title: string
  steps: string[]
  detail: (step: string, index: number) => string
}) {
  return (
    <>
      <div className="section-heading">
        <h2>{title}</h2>
      </div>
      <div className="journey-track">
        {steps.map((step, index) => (
          <article key={step}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </article>
        ))}
      </div>
      <div className="timeline-list">
        {steps.map((step, index) => (
          <article key={step}>
            <strong>Step {index + 1}</strong>
            <h3>{step}</h3>
            <p>{detail(step, index)}</p>
          </article>
        ))}
      </div>
    </>
  )
}

function AboutPage() {
  const aboutJourney = [
    'Discover gaps',
    'Research sources',
    'Verify signals',
    'Structure knowledge',
    'Publish resources',
    'Update over time',
  ]

  return (
    <>
      <section className="about-editorial wrap narrow">
        <h1>What is Mindrift</h1>
        <p>
          Mindrift is an AI training platform owned by Toloka that connects
          domain experts with leading AI companies to improve generative AI
          models.
        </p>
        <p>
          Professionals from more than 90 knowledge domains contribute to making
          AI systems safer, more accurate, and more helpful.
        </p>
        <video src={assets.aboutVideo} autoPlay muted loop playsInline />
        <small>↑ We embrace new technology. Here is an AI-generated video about what we do.</small>
      </section>
      <WhyWeExist />
      <section className="journey wrap">
        <JourneySection
          title="Our working process in 6 steps"
          steps={aboutJourney}
          detail={(step, index) =>
            index === 0
              ? 'We identify questions, missing answers and unclear information across real reader needs.'
              : index === 5
                ? 'We keep useful pages alive by improving them when facts, tools or habits change.'
                : `We ${step.toLowerCase()} so every resource stays clear, useful and easy to navigate.`
          }
        />
      </section>
      <section className="about-editorial wrap narrow">
        <h2>Olga Megorskaya. CEO and Founder of Mindrift</h2>
        <p>
          Olga Megorskaya is the CEO and founder of Mindrift and Toloka, its
          parent company. She led Toloka’s evolution into a provider of
          high-quality training data for modern AI systems.
        </p>
        <p>
          Mindrift grew from the need for professional domain expertise across
          complex and specialized AI tasks.
        </p>
      </section>
      <section className="about-editorial wrap narrow">
        <h2>Who is Mindrift?</h2>
        <div className="about-big-stats">
          <span><b>20K+</b> AI Trainers</span>
          <span><b>20+</b> Languages</span>
          <span><b>90+</b> Domains</span>
        </div>
        <p>
          The Mindrift community brings together experts, writers, editors, and
          specialists on one platform.
        </p>
      </section>
      <section className="split-section wrap narrow compliance-section">
        <div>
          <h2>Industry compliance</h2>
          <p>
            We are dedicated to best practices in information security to meet
            and exceed industry standards.
          </p>
        </div>
        <div className="mini-grid">
          {['SOC 2 Type II', 'ISO 27001', 'ISO 27701'].map((item) => (
            <article className="mini-card" key={item}>
              <HugeiconsIcon icon={Shield01Icon} size={32} />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="about-editorial wrap narrow">
        <h2>Mindrift’s connection to Toloka</h2>
        <p>
          Mindrift builds on Toloka’s experience in data generation and machine
          learning to bring domain experts into the next generation of AI
          training.
        </p>
        <img src={assets.aboutOffice} alt="" />
        <small>↑ HQ in Amsterdam, Netherlands, Schiphol blvd 165</small>
      </section>
      <CTA title="Ready to shape the future of AI?" subtitle="Apply and start earning" />
    </>
  )
}

function WhyWeExist() {
  return (
    <section className="why-exist wrap">
      <div className="why-copy">
        <p className="why-eyebrow">WHY WE EXIST</p>
        <h2>The internet has information. Not always answers.</h2>
        <div>
          <p>
            Many online answers are repetitive, outdated, vague or copied from
            the same sources. Some of the questions people really ask still do
            not have a clear answer at all.
          </p>
          <p>
            Fiindt exists to close that gap: we look for missing answers,
            refine existing knowledge and turn scattered information into
            practical, structured resources.
          </p>
        </div>
      </div>
      <div className="comparison-grid">
        {comparison.map((group, index) => {
          const isFiindt = group.title === 'Fiindt'

          return (
            <article
              className={cx('comparison-card', isFiindt && 'comparison-card-accent')}
              key={group.title}
            >
              {isFiindt ? <span className="comparison-arrow">↗</span> : null}
              <div className="comparison-head">
                <h3>{group.title}</h3>
                <span>{index === 0 ? 'Noise' : 'Clarity'}</span>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

function getFiindtArticlePath(article: FiindtArticle) {
  return `/${toSlug(article.vertical)}/${toSlug(article.subNiche)}/${article.slug}`
}

function VerticalPage() {
  const params = useParams()
  const currentVertical = getVerticalBySlug(params.vertical)

  if (!currentVertical) {
    return <HomePage />
  }

  const articles = getArticlesByVertical(currentVertical.slug)
  const featuredArticle =
    articles.find((article) => article.featured) ?? articles[0]
  const latestArticles = articles
    .filter((article) => article.id !== featuredArticle?.id)
    .slice(0, 6)
  const importedArticles = fiindtArticles
    .filter((article) => toSlug(article.vertical) === currentVertical.slug)
    .slice(0, 6)
  const mostReadArticles = articles
    .filter((article) => article.id !== featuredArticle?.id)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 3)

  return (
    <div
      className="vertical-page"
      style={
        {
          '--vertical-color': currentVertical.color,
          '--vertical-hero-position':
            verticalHeroPositions[currentVertical.slug] ?? '62% center',
        } as CSSProperties
      }
    >
      <section className="vertical-media-hero">
        <img
          src={verticalHeroImages[currentVertical.slug] ?? verticalHeroImages.tech}
          alt=""
        />
        <div className="wrap">
          <div className="vertical-hero-copy">
            <p className="vertical-eyebrow">{currentVertical.label} vertical</p>
            <h1>{currentVertical.label}</h1>
            <p>{currentVertical.description}</p>
            <form className="vertical-search">
              <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={2} />
              <input
                aria-label={`Search ${currentVertical.label}`}
                placeholder={`Search ${currentVertical.label} guides, tools or workflows...`}
              />
            </form>
            <div className="vertical-actions">
              <Link
                className="vertical-button vertical-button-primary"
                to={`/${currentVertical.slug}/${currentVertical.subNiches[0]?.slug}`}
              >
                Explore {currentVertical.subNiches[0]?.label}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
              </Link>
              <a className="vertical-button vertical-button-outline" href="#latest-vertical-articles">
                Latest articles
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pinned-map wrap">
        <div className="vertical-section-heading">
          <p className="vertical-eyebrow">Sub-niches</p>
          <h2>Open a focused {currentVertical.label} file</h2>
          <p>
            Each sub-niche narrows the vertical into a practical area with its
            own guides, categories and resources.
          </p>
        </div>
        <div className="pinned-grid">
          {currentVertical.subNiches.map((subNiche) => {
            const Icon = subNicheIcons[subNiche.slug as keyof typeof subNicheIcons] ?? StarIcon
            return (
              <Link
                className="pinned-card"
                to={`/${currentVertical.slug}/${subNiche.slug}`}
                key={subNiche.slug}
              >
                <span>
                  <HugeiconsIcon icon={Icon} size={28} strokeWidth={1.8} />
                </span>
                <h3>{subNiche.label}</h3>
                <p>{subNiche.description}</p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="vertical-featured wrap">
        <div className="vertical-section-heading centered">
          <p className="vertical-eyebrow">Featured in {currentVertical.label}</p>
          <h2>Featured guide</h2>
          <p>A selected resource from the {currentVertical.label} archive.</p>
        </div>
        <div className="vertical-featured-grid">
          <Link
            className="featured-guide"
            to={`/${currentVertical.slug}/${featuredArticle.subNicheSlug}`}
          >
            <span>
              {currentVertical.label} › {featuredArticle.subNiche}
            </span>
            <div>
              <b>{featuredArticle.category}</b>
              <small>{featuredArticle.readingTime} min read</small>
            </div>
            <h3>{featuredArticle.title}</h3>
            <p>{featuredArticle.excerpt}</p>
            <time>{formatArticleDate(featuredArticle.publishedAt)}</time>
          </Link>
          <aside className="most-read">
            <h3>Most Read</h3>
            {mostReadArticles.map((article, index) => (
              <Link to={`/${currentVertical.slug}/${article.subNicheSlug}`} key={article.id}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <span>{article.title}</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section id="latest-vertical-articles" className="latest-vertical wrap">
        <div className="vertical-section-heading">
          <p className="vertical-eyebrow">Latest articles</p>
          <h2>Latest {currentVertical.label} articles</h2>
        </div>
        <div className="article-grid">
          {(importedArticles.length ? importedArticles : latestArticles).map((article) =>
            'slug' in article ? (
              <FiindtArticleCard article={article} key={article.id} />
            ) : (
              <VerticalArticleCard article={article} key={article.id} />
            ),
          )}
        </div>
      </section>

      <VerticalNewsletter vertical={currentVertical.label} />
    </div>
  )
}

function FiindtArticleCard({ article }: { article: FiindtArticle }) {
  const vertical = getVerticalBySlug(toSlug(article.vertical))

  return (
    <Link
      className="vertical-article-card"
      style={{ '--article-color': vertical?.color ?? '#2563eb' } as CSSProperties}
      to={getFiindtArticlePath(article)}
    >
      <p className="vertical-article-path">
        {article.vertical} › {article.subNiche}
      </p>
      <div className="vertical-article-meta">
        <span>{article.category}</span>
        <small>{article.readingTime} min read</small>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <time>{formatArticleDate(article.publishedAt)}</time>
    </Link>
  )
}

function ArticlePage() {
  const { vertical, subNiche, slug } = useParams()
  const article = fiindtArticles.find(
    (item) =>
      toSlug(item.vertical) === vertical &&
      toSlug(item.subNiche) === subNiche &&
      item.slug === slug,
  )

  if (!article) {
    return <VerticalSubNichePage />
  }

  const currentVertical = getVerticalBySlug(toSlug(article.vertical))
  const paragraphs = article.content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <article
      className="article-page wrap"
      style={{ '--article-color': currentVertical?.color ?? '#2563eb' } as CSSProperties}
    >
      <header>
        <p>{article.vertical} › {article.subNiche}</p>
        <h1>{article.title}</h1>
        <div>
          <span>{article.category}</span>
          <small>{article.readingTime} min read</small>
          <time>{formatArticleDate(article.publishedAt)}</time>
        </div>
      </header>
      <section>
        {paragraphs.map((line, index) => {
          if (line.startsWith('### ')) return <h3 key={index}>{line.replace('### ', '')}</h3>
          if (line.startsWith('## ')) return <h2 key={index}>{line.replace('## ', '')}</h2>
          return <p key={index}>{line}</p>
        })}
      </section>
    </article>
  )
}

function VerticalArticleCard({ article }: { article: VerticalArticle }) {
  const vertical = getVerticalBySlug(article.vertical)

  return (
    <Link
      className="vertical-article-card"
      style={{ '--article-color': vertical?.color ?? '#2563eb' } as CSSProperties}
      to={`/${article.vertical}/${article.subNicheSlug}`}
    >
      <p className="vertical-article-path">
        {vertical?.label ?? article.vertical} › {article.subNiche}
      </p>
      <div className="vertical-article-meta">
        <span>{article.category}</span>
        <small>{article.readingTime} min read</small>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <time>{formatArticleDate(article.publishedAt)}</time>
    </Link>
  )
}

function VerticalSubNichePage() {
  const { vertical: verticalSlug, subNiche } = useParams()
  const vertical = getVerticalBySlug(verticalSlug)

  if (!vertical) {
    return <HomePage />
  }

  const currentSubNiche =
    getSubNicheBySlug(vertical.slug, subNiche) ?? vertical.subNiches[0]
  const articles = getArticlesByNiche(vertical.slug, currentSubNiche.slug)
  const articleCatalog = currentSubNiche.categories.map((category) => ({
    category,
    articles: articles.filter((article) => article.category === category),
  }))
  const Icon = subNicheIcons[currentSubNiche.slug as keyof typeof subNicheIcons] ?? StarIcon

  return (
    <div
      className="vertical-page"
      style={{ '--vertical-color': vertical.color } as CSSProperties}
    >
      <section className="vertical-sub-hero wrap">
        <Link to={`/${vertical.slug}`}>{vertical.label}</Link>
        <span>
          <HugeiconsIcon icon={Icon} size={34} strokeWidth={1.7} />
        </span>
        <h1>{currentSubNiche.label}</h1>
        <p>{currentSubNiche.description}</p>
      </section>
      <section className="sub-category-grid wrap">
        {currentSubNiche.categories.map((category) => (
          <article key={category}>
            <h2>{category}</h2>
            <p>
              Focused guides, checklists and practical resources for {category.toLowerCase()}.
            </p>
          </article>
        ))}
      </section>
      <section className="niche-catalog wrap">
        <div className="vertical-section-heading">
          <p className="vertical-eyebrow">Category catalog</p>
          <h2>{currentSubNiche.label} articles by category</h2>
        </div>
        <div className="niche-catalog-list">
          {articleCatalog.map(({ category, articles: categoryArticles }) => (
            <article className="niche-category-row" key={category}>
              <div>
                <h3>{category}</h3>
                <p>{categoryArticles.length} article{categoryArticles.length > 1 ? 's' : ''}</p>
              </div>
              <div>
                {(categoryArticles.length ? categoryArticles : articles.slice(0, 1)).map((article) => (
                  <Link to={`/${article.vertical}/${article.subNicheSlug}`} key={article.id}>
                    {article.title}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="latest-vertical wrap">
        <div className="vertical-section-heading">
          <p className="vertical-eyebrow">Latest articles</p>
          <h2>Latest in {currentSubNiche.label}</h2>
        </div>
        <div className="article-grid">
          {(articles.length ? articles : getArticlesByVertical(vertical.slug).slice(0, 3)).map((article) => (
            <VerticalArticleCard article={article} key={article.id} />
          ))}
        </div>
      </section>
      <VerticalNewsletter vertical={currentSubNiche.label} />
    </div>
  )
}

function VerticalNewsletter({ vertical }: { vertical: string }) {
  return (
    <section className="vertical-newsletter wrap">
      <div>
        <p className="vertical-eyebrow">Newsletter</p>
        <h2>Follow {vertical} updates</h2>
        <p>
          Get new {vertical.toLowerCase()} guides, resources and practical
          decisions from Fiindt.
        </p>
      </div>
      <form>
        <input aria-label="Email address" placeholder="Email address" />
        <button type="button">Subscribe</button>
      </form>
    </section>
  )
}

function ProjectPage({ kind }: { kind: 'stem' | 'code' }) {
  const isStem = kind === 'stem'
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
        image={isStem ? assets.stemHero : assets.codeHero}
        title={
          isStem
            ? 'Turn scientific expertise into smarter AI'
            : 'AI coding projects. Review & improve AI-generated code'
        }
        subtitle={
          isStem
            ? 'Join remote scientific projects and design research-level challenges.'
            : 'Help build safer, more reliable AI with senior-level code judgment.'
        }
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
          ).map((item) => (
            <span key={item}>{item}</span>
          ))}
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

function LanguageCloud() {
  return (
    <section className="language-cloud wrap">
      <h2>Programming languages in demand</h2>
      <p>Python is required for most opportunities and often unlocks higher-paid work.</p>
      <div>
        {['Python', 'C', 'Java', 'TypeScript', 'C#', 'Rust', 'Go', 'JavaScript', 'C++', 'Kotlin', 'Ruby', 'PHP'].map(
          (lang) => (
            <span key={lang}>{lang}</span>
          ),
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
      <p>
        Estimates depend on specialization, time contributed, and accepted
        tasks.
      </p>
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

function BlogPage() {
  const filters = [
    'All Posts',
    'Community Stories',
    'AI Training',
    'GenAI Insights',
    'Remote Opportunities',
    'Inside Mindrift',
  ]

  return (
    <section className="blog-page wrap">
      <section className="blog-filters">
        {filters.map((filter) => (
          <button key={filter} type="button">
            {filter}
          </button>
        ))}
      </section>
      <BlogList />
    </section>
  )
}

function BlogList({ limit }: { limit?: number }) {
  const posts = blogPosts.slice(0, limit)
  const [featured, ...rest] = posts
  const featuredIndex = blogPosts.indexOf(featured)

  if (!limit && featured) {
    return (
      <section className="blog-list">
        <Link className="blog-featured" to={routes.blog}>
          <img
            src={assets.blogImages[featuredIndex % assets.blogImages.length]}
            alt=""
          />
          <div>
            <h1>{featured[0]}</h1>
            <p>
              <span>{featured[1]}</span>
              <time>{featured[2]}</time>
            </p>
          </div>
        </Link>
        <div className="blog-grid">
          {rest.map(([title, category, date], index) => (
            <Link className="blog-card" to={routes.blog} key={title}>
              <img
                src={assets.blogImages[(index + 1) % assets.blogImages.length]}
                alt=""
              />
              <h2>{title}</h2>
              <p>
                <span>{category}</span>
                <time>{date}</time>
              </p>
            </Link>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="blog-list blog-list-compact">
      {posts.map(([title, category, date], index) => (
        <Link className="blog-card" to={routes.blog} key={title}>
          <img src={assets.blogImages[index % assets.blogImages.length]} alt="" />
          <h2>{title}</h2>
          <p>
            <span>{category}</span>
            <time>{date}</time>
          </p>
        </Link>
      ))}
    </section>
  )
}

function MediaHero({
  image,
  eyebrow,
  title,
  subtitle,
  cta,
  tone = 'dark',
}: {
  image: string
  eyebrow?: string
  title: string
  subtitle: string
  cta?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <section className={cx('media-hero', tone === 'light' && 'media-hero-light')}>
      <img src={image} alt="" />
      <div className="wrap">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {cta ? (
          <Link className="button button-green" to={primaryExplorePath}>
            {cta}
          </Link>
        ) : null}
      </div>
    </section>
  )
}

function FAQPage() {
  const groups = [
    ['About Mindrift', 'What is Mindrift?', 'What are the mission and values?'],
    ['Diversity and ethics', 'What is the policy on harassment?', 'How is inclusion promoted?'],
    ['Getting started', 'How do I apply?', 'How long does onboarding take?'],
    ['Qualifications', 'What experience do I need?', 'Do I need AI background?'],
    ['Payments', 'How are rates calculated?', 'When do payments arrive?'],
    ['Safety', 'Why do some projects include sensitive content?', 'How does Mindrift support contributors?'],
  ]
  const items = groups.flatMap(([group, ...questions]) =>
    questions.map((question) => ({
      question,
      answer: `${group}: Mindrift provides project details, requirements, and platform guidance before contributors begin work.`,
    })),
  )
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Everything a contributor needs before applying, qualifying, and working on projects."
      />
      <section className="faq-page wrap">
        <aside>
          {groups.map(([group]) => (
            <a href={`#${group}`} key={group}>
              {group}
            </a>
          ))}
        </aside>
        <FAQList items={items} />
      </section>
    </>
  )
}

function LegalPage({ title }: { title: string }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        subtitle="Reference page for platform policies and contributor information."
      />
      <section className="legal wrap">
        <article>
          <HugeiconsIcon icon={LegalDocument01Icon} size={42} />
          <h2>{title}</h2>
          <p>
            This cloned route is present so the site navigation, footer, and
            legal links behave like the original. Replace this placeholder with
            approved legal copy before production use.
          </p>
        </article>
      </section>
    </>
  )
}

function LegalHubPage() {
  const groups = [
    {
      title: 'Essential legal pages',
      links: ['Legal Notice', 'Privacy Policy', 'Cookie Policy', 'Terms of Use', 'Editorial Policy', 'Content Disclaimer'],
    },
    {
      title: 'Transparency and monetization',
      links: ['Affiliate Disclosure', 'Advertising Policy', 'AI Policy'],
    },
    {
      title: 'Rights, reports and community',
      links: ['Copyright Policy', 'Content Reporting', 'Community Guidelines', 'Accessibility Statement'],
    },
    {
      title: 'Future services',
      links: ['Course and Paid Content Terms', 'Privacy Preferences'],
    },
  ]

  const findPage = (label: string) => fiindtLegalPages.find((page) => page.title === label)

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Legal Center"
        subtitle="Legal information, policies, disclaimers and terms copied from the Fiindt source project."
      />
      <section className="legal-hub wrap">
        {groups.map((group) => (
          <article key={group.title}>
            <h2>{group.title}</h2>
            <div>
              {group.links.map((label) => {
                const page = findPage(label)
                return page ? (
                  <Link to={page.route} key={label}>
                    {label}
                  </Link>
                ) : null
              })}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function FiindtLegalPage({ page }: { page: LegalPageRecord }) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />
      <section className="fiindt-legal wrap">
        <aside>
          <span>{page.lastUpdatedLabel}</span>
          {page.sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              {section.title}
            </a>
          ))}
          {page.relatedLink ? <Link to={page.relatedLink.href}>{page.relatedLink.label}</Link> : null}
        </aside>
        <div>
          {page.sections.map((section) => (
            <article id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.intro ? <p>{section.intro}</p> : null}
              {section.subsections.map((subsection) => (
                <section key={subsection.id}>
                  <h3>{subsection.title}</h3>
                  {subsection.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {subsection.items?.length ? (
                    <ul>
                      {subsection.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  const contactPaths = [
    ['General support', 'Questions, feedback, access issues or technical help.'],
    ['Partnership', 'Collaborations, sponsors or editorial opportunities.'],
    ['Editorial', 'Sources, corrections or topic suggestions.'],
  ]
  const responseRules = ['Add the article URL', 'Be specific', 'Share useful context', 'Include sources']

  return (
    <>
      <PageHero
        eyebrow="Contact Fiindt"
        title="Tell us what needs to be clearer."
        subtitle="Questions, corrections, partnerships, topic suggestions, and editorial feedback all start here."
      />
      <section className="contact-page wrap">
        <div className="contact-panel">
          <span>hello@fiindt.com</span>
          <h2>Start with context.</h2>
          <p>
            Useful, specific notes are easier to route to the right team member.
            This page copies the contact intent from the Fiindt source and adapts
            it to the current design system.
          </p>
          <a className="button button-green" href="mailto:hello@fiindt.com">
            Email us
          </a>
        </div>
        <div className="contact-cards">
          {contactPaths.map(([title, copy]) => (
            <article key={title}>
              <HugeiconsIcon icon={MailIconFallback(title)} size={26} strokeWidth={1.8} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="response-quality wrap">
        <div>
          <p className="eyebrow">Response quality</p>
          <h2>Clear context gets better replies.</h2>
        </div>
        <div>
          {responseRules.map((rule) => (
            <span key={rule}>{rule}</span>
          ))}
        </div>
      </section>
    </>
  )
}

function MailIconFallback(label: string) {
  if (label === 'Partnership') return BriefcaseBusinessIcon
  if (label === 'Editorial') return BookOpenTextIcon
  return Search01Icon
}

function LoginRedirect() {
  return (
    <>
      <PageHero
        eyebrow="Log in"
        title="Contributor portal"
        subtitle="This route mirrors the original login redirect target."
      />
      <section className="legal wrap">
        <article>
          <HugeiconsIcon icon={Search01Icon} size={42} />
          <h2>Redirect placeholder</h2>
          <p>Connect this page to the real authentication provider when ready.</p>
        </article>
      </section>
    </>
  )
}

function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <MayneFadeIn>
      <section className="page-hero wrap">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>
    </MayneFadeIn>
  )
}

function Footer() {
  const columns = [
    [
      ['Privacy Notice', '/legal/privacy'],
      ['Toloka Platforms Terms of Use', '/legal/terms'],
      ['Data Processing Addendum', '/legal/addendum'],
      ['Eligibility and Geographic Restrictions', '/legal/eligibility-and-geographic-restrictions'],
    ],
    [
      ['FAQ', routes.faq],
      ['Code of Conduct', routes.faq],
      ['Manage cookies', '/legal/cookie-notice/'],
      ['Help Center', routes.faq],
    ],
    [
      ['Facebook ↗', routes.blog],
      ['LinkedIn ↗', routes.blog],
      ['Reddit ↗', routes.blog],
    ],
  ]
  return (
    <footer className="footer wrap">
      <Link className="footer-mark" to="/" aria-label="Mindrift home">
        <span className="logo-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </Link>
      <div className="footer-links">
        {columns.map((links, index) => (
          <div className="footer-column" key={index}>
            {links.map(([label, href]) => (
              <Link to={href} key={label}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <small>© 2026 Toloka AI BV</small>
    </footer>
  )
}

export default App
