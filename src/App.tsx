import { type CSSProperties, Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigationType,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { MayneFadeIn, MayneSkeleton, MayneFormField, MayneInput, MayneButton, cx } from '@mayne/ui-kit'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  AiChipIcon,
  AiLaptopIcon,
  AlarmClockIcon,
  Apple01Icon,
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Atom01Icon,
  Backpack01Icon,
  BankIcon,
  BikeIcon,
  BinocularsIcon,
  BookOpen01Icon,
  BookOpenTextIcon,
  BrainIcon,
  BriefcaseBusinessIcon,
  Calculator01Icon,
  Calendar01Icon,
  CatIcon,
  Certificate01Icon,
  ChartLineData01Icon,
  Coffee01Icon,
  Coins01Icon,
  Compass01Icon,
  ComputerTerminal01Icon,
  CookingPotIcon,
  CreditCardIcon,
  Dna01Icon,
  Dumbbell01Icon,
  EnergyIcon,
  Film01Icon,
  FlaskConicalIcon,
  FlowerIcon,
  FolderLibraryIcon,
  FootballIcon,
  Gamepad2Icon,
  GlobeIcon,
  GraduationCapIcon,
  HangerIcon,
  HealthIcon,
  HeadphonesIcon,
  HeartPulseIcon,
  Home01Icon,
  Hospital01Icon,
  Idea01Icon,
  JusticeScale01Icon,
  LanguageCircleIcon,
  Leaf01Icon,
  LegalDocument01Icon,
  Medal01Icon,
  Megaphone01Icon,
  Menu01Icon,
  Message01Icon,
  Moon02Icon,
  News01Icon,
  PlaneIcon,
  RocketIcon,
  RunningShoesIcon,
  Satellite01Icon,
  Search01Icon,
  Settings01Icon,
  Shield01Icon,
  SmartPhone01Icon,
  StarIcon,
  Timer01Icon,
  Tree03Icon,
  UserGroupIcon,
  WorkoutStretchingIcon,
} from '@hugeicons/core-free-icons'
import {
  getArticlesByNiche,
  getArticlesByVertical,
  getSubNicheBySlug,
  getVerticalBySlug,
  type VerticalArticle,
  verticalArticles,
  verticals,
} from './data/knowledgeArchitecture'
import { type FAQItem, verticalFaqs } from './data/verticalFaqs'
import { legalPages as fiindtLegalPages, type LegalPageRecord } from './data/fiindtLegalPages'
import { mockArticles as fiindtArticles } from './data/fiindtMockArticles'
import type { Article as FiindtArticle } from './types/content'
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProjectPageLazy = lazy(() => import('./pages/ProjectPage'))
import { useSEO } from './hooks/useSEO'
import './App.css'

const routes = {
  home: '/',
  about: '/about',
  faq: '/faq',
  stem: '/project/stem',
  code: '/project/code',
  health: '/health',
}

const scrollPositions = new Map<string, number>()

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')


const processSteps = [
  { value: '12',   title: 'Active verticals',    copy: 'Expert domains actively publishing',  icon: Compass01Icon,    tone: 'blue'   },
  { value: '50+',  title: 'Sub-niches',          copy: 'Specialised knowledge areas',         icon: FolderLibraryIcon, tone: 'yellow' },
  { value: '600+', title: 'Guides & resources',  copy: 'Practical, structured knowledge',     icon: BookOpen01Icon,   tone: 'green'  },
]

const homeFaqs = [
  {
    question: 'What is Fiindt?',
    answer:
      'Fiindt is a structured knowledge platform that publishes original, research-based guides across focused topics like tech, health, finance, education, science, lifestyle and business.',
  },
  {
    question: 'How is Fiindt different from Wikipedia or WikiHow?',
    answer:
      'Wikipedia documents established knowledge, and WikiHow explains common methods. Fiindt focuses on unclear, missing or fragmented answers that are not well explained elsewhere online.',
  },
  {
    question: 'What topics does Fiindt cover?',
    answer:
      'Fiindt organizes content into focused verticals, including Tech, Health, Finance, Education, Business, Lifestyle, Science and Culture, with dedicated sub-niches, categories and practical guides.',
  },
  {
    question: 'Are Fiindt articles based on research?',
    answer:
      'Yes. Fiindt resources are built from research, sources, comparisons, data, analysis and editorial review to provide clear and useful answers.',
  },
  {
    question: 'How is Fiindt content organized?',
    answer:
      'Fiindt uses a clear structure: verticals, sub-niches, categories and articles. This helps readers find specific answers faster and explore related topics more easily.',
  },
  {
    question: 'Why should I use Fiindt instead of regular search results?',
    answer:
      'Fiindt saves time by turning scattered information into clear, structured and research-based resources focused on questions that the internet does not answer well.',
  },
]

const subNicheIcons: Record<string, typeof StarIcon> = {
  // Tech
  'ai': BrainIcon,
  'artificial-intelligence': BrainIcon,
  'development': ComputerTerminal01Icon,
  'software': AiLaptopIcon,
  'automation': Settings01Icon,
  'cybersecurity': Shield01Icon,
  'consumer-tech': SmartPhone01Icon,
  // Lifestyle
  'home-and-living': Home01Icon,
  'food-and-cooking': CookingPotIcon,
  'style': HangerIcon,
  'relationships': Message01Icon,
  'personal-organization': AlarmClockIcon,
  'shopping-guides': Coins01Icon,
  // Finance
  'personal-finance': BankIcon,
  'budgeting': Calculator01Icon,
  'saving': Coins01Icon,
  'investing-basics': ChartLineData01Icon,
  'fintech-tools': AiChipIcon,
  'taxes-and-administration': LegalDocument01Icon,
  'business-finance': BriefcaseBusinessIcon,
  // Entertainment
  'movies-and-series': Film01Icon,
  'music': HeadphonesIcon,
  'gaming': Gamepad2Icon,
  'books': BookOpenTextIcon,
  'creator-culture': Megaphone01Icon,
  'streaming-guides': Satellite01Icon,
  // Nature
  'plants-and-gardening': Leaf01Icon,
  'flowers': FlowerIcon,
  'animals-and-pets': CatIcon,
  'wildlife': BinocularsIcon,
  'environment': Tree03Icon,
  'outdoor-living': Compass01Icon,
  // Education
  'study-systems': BookOpenTextIcon,
  'learning-tools': BookOpen01Icon,
  'exams': Certificate01Icon,
  'certifications': GraduationCapIcon,
  'language-learning': LanguageCircleIcon,
  'career-learning': Medal01Icon,
  // Health
  'wellness': HeartPulseIcon,
  'nutrition': Apple01Icon,
  'sleep': Moon02Icon,
  'fitness': Dumbbell01Icon,
  'mental-health': BrainIcon,
  'preventive-health': Hospital01Icon,
  'recovery': WorkoutStretchingIcon,
  // Travel
  'travel-planning': PlaneIcon,
  'budget-travel': Coins01Icon,
  'destination-guides': GlobeIcon,
  'local-experiences': Compass01Icon,
  'digital-nomad-life': AiLaptopIcon,
  'travel-tools': Backpack01Icon,
  // Society
  'politics': GlobeIcon,
  'civic-life': UserGroupIcon,
  'social-trends': ChartLineData01Icon,
  'public-issues': JusticeScale01Icon,
  'rights-and-law': LegalDocument01Icon,
  'media-literacy': News01Icon,
  // Science
  'space': RocketIcon,
  'climate': Leaf01Icon,
  'everyday-science': FlaskConicalIcon,
  'research-explainers': Dna01Icon,
  'energy': EnergyIcon,
  'future-science': AiChipIcon,
  // Business
  'entrepreneurship': Idea01Icon,
  'marketing': Megaphone01Icon,
  'sales': ChartLineData01Icon,
  'e-commerce': CreditCardIcon,
  'remote-work': AiLaptopIcon,
  'career-growth': Medal01Icon,
  'business-tools': BriefcaseBusinessIcon,
  // Sports
  'training': Dumbbell01Icon,
  'running': RunningShoesIcon,
  'football-soccer': FootballIcon,
  'equipment': BikeIcon,
  'sports-tech': Timer01Icon,
  'performance': Medal01Icon,
}

const explorerMenuItems = verticals.map((vertical) => ({
  label: vertical.label,
  slug: vertical.slug,
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

const mindriftLegalPages: Record<string, string> = {
  '/legal/privacy': 'Privacy Notice',
  '/legal/terms': 'Toloka Platforms Terms of Use',
  '/legal/addendum': 'Data Processing Addendum',
  '/legal/eligibility-and-geographic-restrictions':
    'Eligibility and Geographic Restrictions',
  '/legal/cookie-notice/': 'Cookie Notice',
}

const overlayHeaderRoutes = [routes.stem, routes.code]

const isHeaderOverlayRoute = (pathname: string) =>
  overlayHeaderRoutes.includes(pathname) ||
  verticals.some((vertical) => pathname === `/${vertical.slug}`)

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <PageFrame />
    </BrowserRouter>
  )
}

function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    const previousScrollBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'

    if (navigationType === 'POP') {
      window.scrollTo(0, scrollPositions.get(location.key) ?? 0)
    } else if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }

    html.style.scrollBehavior = previousScrollBehavior

    return () => {
      scrollPositions.set(location.key, window.scrollY)
    }
  }, [location.hash, location.key, navigationType])

  return null
}

function PageFrame() {
  const { pathname } = useLocation()
  const isOverlay = isHeaderOverlayRoute(pathname)

  return (
    <main className={cx('page-frame', isOverlay && 'page-frame-overlay')}>
      <SiteHeader key={pathname} />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<Suspense fallback={<PageSkeleton />}><AboutPage /></Suspense>} />
        <Route path="search" element={<SearchPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="legal" element={<LegalHubPage />} />
        <Route path="privacy" element={<FiindtLegalPage page={fiindtLegalPages.find((page) => page.route === '/privacy-policy')!} />} />
        <Route path="project/stem" element={<Suspense fallback={<PageSkeleton />}><ProjectPageLazy kind="stem" /></Suspense>} />
        <Route path="project/code" element={<Suspense fallback={<PageSkeleton />}><ProjectPageLazy kind="code" /></Suspense>} />
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

        <Route path=":vertical/:subNiche/:slug" element={<ArticlePage />} />
        <Route path=":vertical" element={<VerticalPage />} />
        <Route path=":vertical/:subNiche" element={<VerticalSubNichePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  )
}

function SiteHeader() {
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOverDarkHero, setIsOverDarkHero] = useState(false)
  const [isExplorerOpen, setIsExplorerOpen] = useState(false)
  const [isExplorerHoverSuppressed, setIsExplorerHoverSuppressed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const explorerRef = useRef<HTMLDivElement>(null)
  const isProjectActive =
    explorerMenuItems.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
  const nav = [['About Us', routes.about]] as const

  useEffect(() => {
    setIsExplorerOpen(false)
    setIsExplorerHoverSuppressed(true)
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    let frame = 0
    const updateHeader = () => {
      frame = 0
      setIsScrolled(window.scrollY > 8)

      const darkHero = document.querySelector(
        '.vertical-media-hero, .media-hero:not(.media-hero-light)',
      )
      const header = document.querySelector<HTMLElement>('.site-header')
      const headerRect = header?.getBoundingClientRect()
      const isOverDarkCard = headerRect
        ? [0.2, 0.5, 0.8].some((position) =>
            document
              .elementsFromPoint(
                headerRect.left + headerRect.width * position,
                headerRect.top + headerRect.height / 2,
              )
              .some((element) => element.closest('.pinned-map-card')),
          )
        : false

      setIsOverDarkHero(
        Boolean(darkHero && darkHero.getBoundingClientRect().bottom > 108) || isOverDarkCard,
      )
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader)
    }

    updateHeader()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [pathname])

  useEffect(() => {
    if (!isExplorerOpen) return

    const closeExplorer = () => {
      setIsExplorerOpen(false)
      setIsExplorerHoverSuppressed(true)
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!explorerRef.current?.contains(event.target as Node)) closeExplorer()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeExplorer()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isExplorerOpen])

  const toggleExplorer = () => {
    setIsExplorerHoverSuppressed(isExplorerOpen)
    setIsExplorerOpen(!isExplorerOpen)
  }

  const closeExplorer = () => {
    setIsExplorerOpen(false)
    setIsExplorerHoverSuppressed(true)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cx(
        'site-header',
        isScrolled && 'site-header-scrolled',
        isOverDarkHero && 'site-header-on-dark',
      )}
    >
      <Logo variant={isOverDarkHero ? 'cream' : 'brown'} />
      <div className="header-actions">
        <nav className="desktop-nav" aria-label="Main navigation">
          <div
            className={cx(
              'nav-dropdown',
              isExplorerOpen && 'is-open',
              isExplorerHoverSuppressed && 'is-hover-suppressed',
            )}
            ref={explorerRef}
            onMouseLeave={() => setIsExplorerHoverSuppressed(false)}
          >
            <button
              className={cx('nav-link explorer-trigger', isProjectActive && 'active')}
              type="button"
              aria-haspopup="true"
              aria-expanded={isExplorerOpen}
              aria-controls="explorer-menu"
              onClick={toggleExplorer}
            >
              <HugeiconsIcon icon={ArrowDown01Icon} size={12} strokeWidth={2} />
              Explorer
            </button>
            <div className="project-menu" id="explorer-menu">
              {explorerMenuItems.map((item) => {
                const Icon = verticalIcons[item.slug] ?? StarIcon
                return (
                  <Link
                    className="project-menu-item"
                    to={item.href}
                    key={item.href}
                    onClick={closeExplorer}
                  >
                    <div className="project-menu-icon" style={{ color: item.color }}>
                      <HugeiconsIcon icon={Icon} size={20} strokeWidth={1.6} />
                      <strong>{item.label}</strong>
                    </div>
                    <small>{item.description}</small>
                  </Link>
                )
              })}
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
        <NavLink className="button button-green" to="/contact">
          Contact
        </NavLink>
      </div>
      <button
        className="menu-button"
        type="button"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
      >
        <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={2} />
      </button>
      <div className={cx('mobile-menu-panel', isMobileMenuOpen && 'is-open')} id="mobile-menu">
        <div className="mobile-menu-section">
          <p>Explore</p>
          <div className="mobile-menu-verticals">
            {explorerMenuItems.map((item) => (
              <Link to={item.href} key={item.href} onClick={closeMobileMenu}>
                <span style={{ background: item.color }} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mobile-menu-section mobile-menu-pages">
          {[...nav, ['Contact', '/contact'] as const].map(([label, href]) => (
            <Link to={href} key={href} onClick={closeMobileMenu}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

function FiindtLogo({
  variant = 'brown',
  className,
}: {
  variant?: 'brown' | 'cream'
  className?: string
}) {
  return (
    <img
      className={cx('fiindt-logo-image', className)}
      src={variant === 'cream' ? '/logo-cream.svg' : '/logo-brun.svg'}
      alt="Fiindt"
    />
  )
}

function Logo({ variant = 'brown' }: { variant?: 'brown' | 'cream' }) {
  return (
    <Link className="logo" to="/" aria-label="Fiindt home" style={{ textDecoration: 'none' }}>
      <FiindtLogo variant={variant} />
    </Link>
  )
}

function FiindtStats() {
  return (
    <section className="process wrap" style={{ paddingTop: 64, paddingBottom: 64, marginTop: 0 }}>
      <div className="process-heading">
        <h2>
          Why Fiindt exists
          <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 16, whiteSpace: 'nowrap', fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            Fiindt is built around clarity, structure and practical usefulness.
          </span>
        </h2>
        <p>Fiindt organizes original, research-based guides across focused knowledge verticals to give clear answers on topics the internet does not explain well.</p>
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
        </article>
      </div>
    </section>
  )
}


function LatestArticles() {
  const articles = [...fiindtArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6)

  return (
    <section className="home-latest-section" style={{ paddingTop: 80, paddingBottom: 64, paddingLeft: 40, paddingRight: 40, marginTop: 0, background: 'var(--cream)', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, marginBottom: 40 }}>
          Latest from Fiindt
          <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            Recent resources from the Fiindt editorial system.
          </span>
        </h2>
        <div className="home-latest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 20 }}>
          {articles.map((article) => {
            const vertical = getVerticalBySlug(toSlug(article.vertical))
            const accentColor = vertical?.color ?? 'var(--brand-green)'
            return (
              <Link
                key={article.id}
                to={getFiindtArticlePath(article)}
                className="home-latest-card card-hover"
                style={{ '--card-accent': accentColor, borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column' } as CSSProperties}
              >
                <p style={{ fontSize: 12, color: 'rgba(67,38,29,.40)', marginBottom: 8, fontWeight: 500 }}>
                  {article.vertical} › {article.subNiche}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ display: 'inline-block', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 600, background: accentColor, color: '#fff' }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(67,38,29,.40)' }}>{article.readingTime} min read</span>
                </div>
                <h3 className="card-heading card-title">{article.title}</h3>
                <p className="line-clamp-2" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', flex: 1 }}>
                  {article.excerpt}
                </p>
                <div className="article-card-byline">
                  <span>{article.author.name}</span>
                  <span>·</span>
                  <time>{formatArticleDate(article.publishedAt)}</time>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    'Discover',
    'Investigate',
    'Verify',
    'Structure',
    'Update',
  ]
  return (
    <section className="journey wrap journey-5step" style={{ marginTop: 0, paddingTop: 80, paddingBottom: 80 }}>
      <JourneySection
        title="How Fiindt works"
        subtitle="Fiindt structures every topic like a clear knowledge tree, from broad domains to precise resources."
        steps={steps}
        detail={(_, i) => [
          'Find real questions, knowledge gaps and outdated answers.',
          'Collect sources, examples, tools, data and user signals.',
          'Check relevance, accuracy and practical usefulness.',
          'Organize findings into verticals, sub-niches, categories and articles.',
          'Refresh important content when tools, habits or facts evolve.',
        ][i]}
      />
    </section>
  )
}

function NewsletterCTA() {
  return (
    <section className="home-newsletter wrap" style={{ marginTop: 0, paddingTop: 64, paddingBottom: 64, fontFamily: "'Inter', sans-serif" }}>
      <div className="home-newsletter-panel" style={{
        background: '#26221e', padding: '32px 40px', minHeight: 132,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
      }}>
        <div>
          <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#fbf4eb', lineHeight: 1.1 }}>
            Get answers before everyone else.
            <span style={{ display: 'block', color: 'rgba(251,244,235,.35)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              New investigations published every week across 12 domains.
            </span>
          </h2>
        </div>
        <form className="home-newsletter-form" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,.08)', borderRadius: 999,
          padding: '6px 6px 6px 18px', flexShrink: 0,
        }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              width: 220, border: 0, outline: 0, background: 'transparent',
              fontSize: 14, color: '#fbf4eb', fontFamily: "'Inter', sans-serif",
            }}
          />
          <button type="submit" style={{
            background: '#47c971', color: '#fff', border: 0,
            borderRadius: 999, padding: '9px 18px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
          }}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

function NotFoundPage() {
  useSEO({ title: 'Page not found', noIndex: true })
  return (
    <section style={{ minHeight: 'calc(100svh - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', textAlign: 'center' }}>
      <div style={{ maxWidth: 480, padding: '0 32px' }}>
        <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(67,38,29,.38)', textTransform: 'uppercase', marginBottom: 20 }}>404</p>
        <h1 style={{ fontSize: 'clamp(48px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.046em', color: '#26221e', lineHeight: 0.93, marginBottom: 16 }}>
          This page doesn't exist.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', marginBottom: 32 }}>
          The link might be broken, or the page may have moved.
        </p>
        <Link to="/" style={{ display: 'inline-block', background: '#47c971', color: '#fff', padding: '12px 28px', borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
          Back to home
        </Link>
      </div>
    </section>
  )
}

function HomePage() {
  useSEO({
    title: 'Fiindt',
    description: 'Original, research-based guides across tech, health, finance, education and more. Structured knowledge for questions the internet doesn\'t answer well.',
  })
  return (
    <>
      <NewHomeHero />
      <FiindtStats />
      <Projects />
      <LatestArticles />
      <HowItWorks />
      <HomeFAQ />
      <NewsletterCTA />
    </>
  )
}

function SearchBar({
  ariaLabel,
  placeholder,
  className,
  accentColor,
  value,
  onChange,
  onSubmit,
}: {
  ariaLabel: string
  placeholder: string
  className?: string
  accentColor?: string
  value?: string
  onChange?: (v: string) => void
  onSubmit?: (v: string) => void
}) {
  const navigate = useNavigate()
  const [localValue, setLocalValue] = useState('')

  const isControlled = onChange !== undefined

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const q = isControlled ? (value ?? '') : localValue
    if (onSubmit) {
      onSubmit(q)
    } else if (!isControlled && q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`)
    }
  }

  return (
    <form
      className={cx('site-search', className)}
      onSubmit={handleSubmit}
    >
      <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2} />
      <input
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={isControlled ? (value ?? '') : localValue}
        onChange={e => isControlled ? onChange(e.target.value) : setLocalValue(e.target.value)}
      />
      <button type="submit" style={accentColor ? { background: accentColor } : undefined}>Search</button>
    </form>
  )
}

function SearchPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const q = params.get('q')?.trim() ?? ''
  const [inputValue, setInputValue] = useState(q)

  useEffect(() => { setInputValue(q) }, [q])

  useSEO({
    title: q ? `"${q}" — Search` : 'Search',
    description: 'Search articles, guides and resources across all Fiindt knowledge verticals.',
    noIndex: true,
  })

  const results = q
    ? verticalArticles.filter((a) => {
        const search = q.toLowerCase()
        return (
          a.title.toLowerCase().includes(search) ||
          a.excerpt.toLowerCase().includes(search) ||
          a.category.toLowerCase().includes(search) ||
          a.subNiche.toLowerCase().includes(search) ||
          a.vertical.toLowerCase().includes(search)
        )
      })
    : []

  const matchingVerticals = q
    ? verticals.filter(
        (v) =>
          v.label.toLowerCase().includes(q.toLowerCase()) ||
          v.description.toLowerCase().includes(q.toLowerCase()),
      )
    : []

  return (
    <>
      <section className="search-hero wrap">
        <div className="search-hero-copy">
          <h1>
            {q ? `Results for "${q}"` : 'Search Fiindt'}
          </h1>
          <p>
            Search articles, sub-niches and knowledge verticals across Fiindt’s structured research library.
          </p>
        </div>
      </section>

      <section className="search-results-section wrap">
        <aside className="search-sidebar">
          <SearchBar
            className="search-page-bar"
            ariaLabel="Search Fiindt"
            placeholder="Search a question, topic or domain..."
            value={inputValue}
            onChange={setInputValue}
            onSubmit={(v) => {
              const url = v.trim() ? `/search?q=${encodeURIComponent(v.trim())}` : '/search'
              navigate(url)
            }}
          />

          <div className="search-summary-card">
            <span>Search scope</span>
            <strong>{q ? `${results.length} article${results.length !== 1 ? 's' : ''}` : 'All Fiindt'}</strong>
            <p>{q ? 'Results are matched across titles, excerpts, categories, sub-niches and verticals.' : 'Start with a topic, question, tool or domain.'}</p>
          </div>

          {q && matchingVerticals.length > 0 && (
            <div className="search-vertical-card">
              <h2>Matching verticals</h2>
              <div className="search-vertical-list">
                {matchingVerticals.map((v) => (
                  <Link key={v.slug} to={`/${v.slug}`}>
                    <span style={{ background: v.color }} />
                    {v.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        <div className="search-results-main">
          {!q && (
            <div className="search-empty-state">
              <span className="legal-section-icon" aria-hidden="true">
                <HugeiconsIcon icon={Search01Icon} size={32} strokeWidth={1.4} />
              </span>
              <h2>Start with what you need to understand.</h2>
              <p>Try &ldquo;AI&rdquo;, &ldquo;budgeting&rdquo;, &ldquo;travel planning&rdquo; or a specific question.</p>
            </div>
          )}

          {q && results.length === 0 && matchingVerticals.length === 0 && (
            <div className="search-empty-state">
              <span className="legal-section-icon" aria-hidden="true">
                <HugeiconsIcon icon={Search01Icon} size={32} strokeWidth={1.4} />
              </span>
              <h2>No results for &ldquo;{q}&rdquo;.</h2>
              <p>Try a broader term or browse a vertical directly from the Explorer menu.</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="search-results-panel">
              <div className="search-results-heading">
                <h2>{results.length} article{results.length !== 1 ? 's' : ''} found</h2>
                <p>Sorted from Fiindt’s structured article library.</p>
              </div>
              <div className="search-result-list">
                {results.slice(0, 40).map((article) => {
                  const vertical = getVerticalBySlug(article.vertical)
                  const SubNicheIcon = subNicheIcons[article.subNicheSlug] ?? StarIcon
                  return (
                    <Link
                      className="search-result-card"
                      key={article.id}
                      to={`/${article.vertical}/${article.subNicheSlug}/${article.slug}`}
                    >
                      <div className="search-result-icon" style={{ color: vertical?.color ?? '#47c971' }}>
                        <HugeiconsIcon icon={SubNicheIcon} size={32} strokeWidth={1.4} />
                      </div>
                      <div className="search-result-path">
                        <span style={{ background: vertical?.color ?? '#47c971' }} />
                        <small>{article.vertical} › {article.subNiche}</small>
                      </div>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function NewHomeHero() {
  const heroVerticals = [
    {n:'Tech',          dot:'#3B5BDB',bg:'#E8EEFF',tx:'#2840B0'},
    {n:'Nature',        dot:'#47c971',bg:'#DFFFDC',tx:'#1E7A3A'},
    {n:'Health',        dot:'#F04828',bg:'#FFE0D8',tx:'#B82000'},
    {n:'Science',       dot:'#00A890',bg:'#D8FFF5',tx:'#007060'},
    {n:'Education',     dot:'#D97706',bg:'#FFF3D0',tx:'#92500E'},
    {n:'Entertainment', dot:'#E03870',bg:'#FFE0EE',tx:'#A01040'},
    {n:'Lifestyle',     dot:'#F07020',bg:'#FFECD8',tx:'#B84000'},
    {n:'Finance',       dot:'#5BAF1A',bg:'#EAFFD0',tx:'#347808'},
    {n:'Society',       dot:'#9B55D0',bg:'#F5E8FF',tx:'#6E35A8'},
    {n:'Sports',        dot:'#E04030',bg:'#FFE2D8',tx:'#A81808'},
    {n:'Travel',        dot:'#C8980A',bg:'#FFF5CC',tx:'#8A6000'},
    {n:'Business',      dot:'#CC5830',bg:'#FFE8D8',tx:'#963010'},
  ]
  const SNAPS = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]]

  const [, setCurSnap] = useState(0)
  const [slots, setSlots] = useState([
    heroVerticals[0], heroVerticals[1], heroVerticals[2]
  ])
  const [animating, setAnimating] = useState([false,false,false])

  useEffect(() => {
    const init = setTimeout(() => {
      const interval = setInterval(() => {
        setCurSnap(prev => {
          const next = (prev + 1) % 4
          const nextGroup = SNAPS[next];
          [0,1,2].forEach(i => {
            setTimeout(() => {
              setAnimating(a => { const n=[...a]; n[i]=true; return n })
              setTimeout(() => {
                setSlots(s => {
                  const ns=[...s]
                  ns[i] = heroVerticals[nextGroup[i]]
                  return ns
                })
                setAnimating(a => { const n=[...a]; n[i]=false; return n })
              }, 220)
            }, i * 900)
          })
          return next
        })
      }, 5000)
      return () => clearInterval(interval)
    }, 2500)
    return () => clearTimeout(init)
  }, [])

  return (
    <section style={{
      minHeight:'calc(100svh - 52px)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      textAlign:'center',
      paddingTop:'32px', paddingBottom:'32px',
      paddingLeft:'40px', paddingRight:'40px',
      background:'var(--cream)', fontFamily:"'Inter', sans-serif"
    }}>
      <p style={{
        fontSize:'clamp(48px,6vw,80px)', fontWeight:700,
        lineHeight:.93, letterSpacing:'-.046em',
        color:'var(--text-dark)', marginBottom:8,
        fontFamily:"'Inter', sans-serif"
      }}>
        The answers
      </p>

      <div style={{
        display:'flex', alignItems:'center',
        justifyContent:'center', flexWrap:'wrap',
        gap:10, marginBottom:8, minHeight:56
      }}>
        {slots.map((v,i) => (
          <span key={i} style={{
            display:'inline-flex', alignItems:'center', gap:7,
            borderRadius:999, padding:'14px 28px',
            fontSize:21, fontWeight:600, letterSpacing:'-.02em',
            background:v.bg, color:v.tx,
            opacity: animating[i] ? 0 : 1,
            transform: animating[i] ? 'translateY(8px)' : 'translateY(0)',
            transition:'opacity .22s ease, transform .22s ease',
            fontFamily:"'Inter', sans-serif"
          }}>
            <span style={{
              width:12, height:12, borderRadius:'50%',
              background:v.dot, flexShrink:0, display:'inline-block'
            }}/>
            {v.n}
          </span>
        ))}
        <span style={{
          fontSize:'clamp(48px,6vw,80px)', fontWeight:700,
          lineHeight:.93, letterSpacing:'-.046em',
          color:'var(--text-dark)', fontFamily:"'Inter', sans-serif"
        }}>
          &amp; more
        </span>
      </div>

      <p style={{
        fontSize:'clamp(48px,6vw,80px)', fontWeight:700,
        lineHeight:.93, letterSpacing:'-.046em',
        color:'rgba(67,38,29,.32)', marginBottom:28,
        fontFamily:"'Inter', sans-serif"
      }}>
        never gave you.
      </p>

      <p style={{
        fontSize:18, color:'rgba(67,38,29,.50)',
        lineHeight:1.52, maxWidth:460, marginBottom:32,
        letterSpacing:'-.01em', fontFamily:"'Inter', sans-serif"
      }}>
        We investigate the questions Internet never answered clearly —
        with data, sources, surveys and original analysis across every
        domain that matters.
      </p>

      <SearchBar
        className="site-search-home"
        ariaLabel="Search a question, topic or domain"
        placeholder="Search a question, topic or domain..."
      />

      <p style={{
        fontSize:10, color:'rgba(67,38,29,.28)',
        letterSpacing:'.06em', textTransform:'uppercase',
        fontFamily:"'Inter', sans-serif"
      }}>
        12 domains · 50+ sub-niches · original research only
      </p>
    </section>
  )
}

function Projects() {
  return (
    <section className="projects wrap" style={{ paddingTop: 64, paddingBottom: 100, marginTop: 0 }}>
      <div className="section-heading centered">
        <h2>
          Explore verticals that match your needs
          <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            Open a focused domain and browse its guides, categories and resources.
          </span>
        </h2>
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


function HomeFAQ() {
  return (
    <section className="faq wrap" style={{ paddingTop: 80, paddingBottom: 64, marginTop: 0 }}>
      <h2>
        Frequently asked questions
        <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
          Everything you need to know about how Fiindt works.
        </span>
      </h2>
      <FAQList items={homeFaqs} />
    </section>
  )
}

function FAQList({ items }: { items: FAQItem[] }) {
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

function VerticalFAQ({ verticalSlug }: { verticalSlug: string }) {
  const items = verticalFaqs[verticalSlug] ?? []

  if (!items.length) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="faq vertical-faq wrap">
      <h2>
        Frequently asked questions
        <span>
          Clear answers to common questions about how Fiindt researches, explains and updates this topic.
        </span>
      </h2>
      <FAQList items={items} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  )
}

function JourneySection({
  title,
  subtitle,
  steps,
  detail,
}: {
  title: string
  subtitle?: string
  steps: string[]
  detail: (step: string, index: number) => string
}) {
  return (
    <>
      <div className="section-heading">
        <h2>
          {title}
          {subtitle && (
            <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>{subtitle}</span>
          )}
        </h2>
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
  const [searchQuery, setSearchQuery] = useState('')

  useSEO({
    title: currentVertical ? currentVertical.label : 'Page not found',
    description: currentVertical?.description,
    noIndex: !currentVertical,
  })

  if (!currentVertical) {
    return <NotFoundPage />
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

  const allArticles = (importedArticles.length ? importedArticles : latestArticles)
  const filteredArticles = searchQuery.trim()
    ? allArticles.filter(a => {
        const q = searchQuery.toLowerCase()
        return a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.subNiche.toLowerCase().includes(q)
      })
    : allArticles

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

            <h1>{currentVertical.label}</h1>
            <p>{currentVertical.description}</p>
            <SearchBar
              className="site-search-vertical"
              ariaLabel={`Search ${currentVertical.label}`}
              placeholder={`Search ${currentVertical.label} guides, tools or workflows...`}
              accentColor={currentVertical.color}
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <div className="vertical-actions">
              <a
                className="vertical-button vertical-button-primary"
                href="#sub-niches"
              >
                Explore {currentVertical.label} topics
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
              </a>
              <a
                className="vertical-button vertical-button-outline"
                href="#latest-vertical-articles"
              >
                Latest articles
              </a>
            </div>
          </div>
        </div>
      </section>

      <PinnedCardsMap
        id="sub-niches"
        title={`Open a focused ${currentVertical.label} file`}
        description="Each sub-niche narrows the vertical into a practical area with its own guides, categories and resources."
        items={currentVertical.subNiches.map((subNiche) => {
          const Icon = subNicheIcons[subNiche.slug] ?? StarIcon
          return {
            title: subNiche.label,
            description: subNiche.description,
            href: `/${currentVertical.slug}/${subNiche.slug}`,
            icon: <HugeiconsIcon icon={Icon} size={26} strokeWidth={1.8} />,
            color: currentVertical.color,
          }
        })}
        accentColor={currentVertical.color}
      />

      <section className="vertical-featured wrap">
        <div className="vertical-section-heading centered">
          <h2>
            Featured guide
            <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              A selected resource from the {currentVertical.label} archive.
            </span>
          </h2>
        </div>
        <div className="vertical-featured-grid">
          <Link
            to={`/${currentVertical.slug}/${featuredArticle.subNicheSlug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(253,249,245,0.78)',
              border: '1px solid rgba(67,38,29,.08)',
              borderRadius: 16,
              padding: '28px 32px',
              boxShadow: '0 2px 16px rgba(67,38,29,.05)',
              textDecoration: 'none',
              minHeight: 320,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(67,38,29,.50)', lineHeight: 1.4 }}>
              {currentVertical.label} › {featuredArticle.subNiche}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
              <span style={{
                padding: '5px 12px',
                borderRadius: 999,
                background: currentVertical.color,
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}>
                {featuredArticle.category}
              </span>
              <span style={{ fontSize: 13, color: 'rgba(67,38,29,.45)' }}>{featuredArticle.readingTime} min read</span>
            </div>
            <h3 style={{ marginTop: 20, fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 700, color: '#26221e', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              {featuredArticle.title}
            </h3>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: 'rgba(67,38,29,.60)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
              {featuredArticle.excerpt}
            </p>
            <div className="article-card-byline" style={{ paddingTop: 28, fontSize: 14 }}>
              <span>Fiindt</span>
              <span>·</span>
              <time>{formatArticleDate(featuredArticle.publishedAt)}</time>
            </div>
          </Link>
          <aside style={{ paddingTop: 4 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#26221e', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Most Read Articles
            </h3>
            <div>
              {mostReadArticles.map((article, index) => (
                <Link
                  to={`/${currentVertical.slug}/${article.subNicheSlug}`}
                  key={article.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2.5rem 1fr',
                    gap: 12,
                    padding: '14px 0',
                    borderTop: index === 0 ? 'none' : '1px solid rgba(67,38,29,.08)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, color: `color-mix(in srgb, ${currentVertical.color} 28%, transparent)`, paddingTop: 2 }}>
                    {index + 1}
                  </span>
                  <span>
                    <b style={{ display: 'block', fontSize: 14, fontWeight: 700, lineHeight: 1.35, color: '#26221e' }}>
                      {article.title}
                    </b>
                    <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', fontSize: 12, color: 'rgba(67,38,29,.42)', marginTop: 6 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <HugeiconsIcon icon={AlarmClockIcon} size={13} strokeWidth={2} />
                        {article.readingTime} min
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <HugeiconsIcon icon={Calendar01Icon} size={13} strokeWidth={2} />
                        {formatArticleDate(article.publishedAt)}
                      </span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="latest-vertical-articles" className="latest-vertical wrap">
        <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, marginBottom: 40, maxWidth: 1100, marginInline: 'auto' }}>
          {searchQuery.trim() ? `Results for "${searchQuery}"` : `Latest ${currentVertical.label} articles`}
          <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            {searchQuery.trim() ? `${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''} found` : `Recent resources from the ${currentVertical.label} editorial archive.`}
          </span>
        </h2>
        {filteredArticles.length > 0 ? (
          <div className="article-grid">
            {filteredArticles.map((article) =>
              'author' in article ? (
                <FiindtArticleCard article={article} key={article.id} />
              ) : (
                <VerticalArticleCard article={article} key={article.id} />
              ),
            )}
          </div>
        ) : (
          <p style={{ padding: '48px 0', color: 'rgba(67,38,29,.40)', fontSize: 16 }}>No articles found for this search.</p>
        )}
      </section>

      <VerticalFAQ verticalSlug={currentVertical.slug} />
      <VerticalNewsletter vertical={currentVertical.label} />
    </div>
  )
}

function FiindtArticleCard({ article, cardBg }: { article: FiindtArticle; cardBg?: string }) {
  const vertical = getVerticalBySlug(toSlug(article.vertical))

  return (
    <Link
      className="vertical-article-card card-hover"
      style={{ '--article-color': vertical?.color ?? '#2563eb', '--card-accent': vertical?.color ?? '#2563eb', '--card-bg': cardBg, height: '100%', boxSizing: 'border-box' } as CSSProperties}
      to={getFiindtArticlePath(article)}
    >
      <p className="vertical-article-path">
        {article.vertical} › {article.subNiche}
      </p>
      <div className="vertical-article-meta">
        <span>{article.category}</span>
        <small>{article.readingTime} min read</small>
      </div>
      <h3 className="card-heading card-title">{article.title}</h3>
      <p className="line-clamp-2" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', flex: 1 }}>{article.excerpt}</p>
      <div className="article-card-byline">
        <span>{article.author.name}</span>
        <span>·</span>
        <time>{formatArticleDate(article.publishedAt)}</time>
      </div>
    </Link>
  )
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (m) {
      const isExternal = m[2].startsWith('http')
      return <a key={i} href={m[2]} className="article-inline-link" {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{m[1]}</a>
    }
    return part
  })
}

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

type ParsedBlock =
  | { type: 'h2' | 'h3' | 'h4' | 'h5'; text: string; id: string }
  | { type: 'p'; text: string; id: '' }
  | { type: 'blockquote'; text: string; id: '' }
  | { type: 'callout'; variant: 'tip' | 'info' | 'warning' | 'danger'; text: string; id: '' }
  | { type: 'ul' | 'ol'; items: string[]; id: '' }
  | { type: 'code'; lang: string; text: string; id: '' }
  | { type: 'table'; headers: string[]; rows: string[][]; id: '' }
  | { type: 'faq'; items: { q: string; a: string }[]; id: '' }
  | { type: 'cta'; label: string; href: string; id: '' }
  | { type: 'image'; src: string; alt: string; caption: string; id: '' }
  | { type: 'embed'; src: string; id: '' }

function parseArticleBlocks(content: string): ParsedBlock[] {
  const lines = content.split('\n').map((l) => l.trim())
  const blocks: ParsedBlock[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line) { i++; continue }

    if (line.startsWith('##### ')) { blocks.push({ type: 'h5', text: line.slice(6), id: slugifyHeading(line.slice(6)) }); i++; continue }
    if (line.startsWith('#### ')) { blocks.push({ type: 'h4', text: line.slice(5), id: slugifyHeading(line.slice(5)) }); i++; continue }
    if (line.startsWith('### ')) { blocks.push({ type: 'h3', text: line.slice(4), id: slugifyHeading(line.slice(4)) }); i++; continue }
    if (line.startsWith('## ')) { blocks.push({ type: 'h2', text: line.slice(3), id: slugifyHeading(line.slice(3)) }); i++; continue }

    // Callout: > [!tip] text
    const calloutMatch = line.match(/^> \[!(tip|info|warning|danger)\] (.+)/)
    if (calloutMatch) {
      blocks.push({ type: 'callout', variant: calloutMatch[1] as 'tip' | 'info' | 'warning' | 'danger', text: calloutMatch[2], id: '' })
      i++; continue
    }

    // Blockquote: > text
    if (line.startsWith('> ')) {
      blocks.push({ type: 'blockquote', text: line.slice(2), id: '' })
      i++; continue
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) { items.push(lines[i].slice(2)); i++ }
      blocks.push({ type: 'ul', items, id: '' }); continue
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, '')); i++ }
      blocks.push({ type: 'ol', items, id: '' }); continue
    }

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'text'
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) { codeLines.push(lines[i]); i++ }
      blocks.push({ type: 'code', lang, text: codeLines.join('\n'), id: '' })
      i++; continue
    }

    // Table: | col | col |
    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith('|')) { tableLines.push(lines[i]); i++ }
      const rows = tableLines.filter((r) => !r.match(/^\|[-| ]+\|$/))
      const parsed = rows.map((r) => r.split('|').slice(1, -1).map((c) => c.trim()))
      if (parsed.length > 0) {
        blocks.push({ type: 'table', headers: parsed[0], rows: parsed.slice(1), id: '' })
      }
      continue
    }

    // FAQ: FAQ: question | answer
    if (line.startsWith('FAQ: ')) {
      const faqItems: { q: string; a: string }[] = []
      while (i < lines.length && lines[i].startsWith('FAQ: ')) {
        const parts = lines[i].slice(5).split(' | ')
        if (parts.length >= 2) faqItems.push({ q: parts[0], a: parts.slice(1).join(' | ') })
        i++
      }
      if (faqItems.length > 0) blocks.push({ type: 'faq', items: faqItems, id: '' })
      continue
    }

    // CTA: [CTA: Label → url]
    const ctaMatch = line.match(/^\[CTA: (.+?) → (.+?)\]$/)
    if (ctaMatch) {
      blocks.push({ type: 'cta', label: ctaMatch[1], href: ctaMatch[2], id: '' })
      i++; continue
    }

    // Image: ![alt](src) optional caption
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)(.*)$/)
    if (imgMatch) {
      blocks.push({ type: 'image', alt: imgMatch[1], src: imgMatch[2], caption: imgMatch[3].trim(), id: '' })
      i++; continue
    }

    // Embed: [embed: url]
    const embedMatch = line.match(/^\[embed: (.+)\]$/)
    if (embedMatch) {
      blocks.push({ type: 'embed', src: embedMatch[1], id: '' })
      i++; continue
    }

    blocks.push({ type: 'p', text: line, id: '' })
    i++
  }

  return blocks
}

function ArticleOutlineNav({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActiveId(e.target.id) } },
      { rootMargin: '-100px 0px -75% 0px', threshold: 0 }
    )
    headings.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="article-outline">
      <p className="article-outline-label">Outline</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={['article-outline-link', h.level === 3 ? 'article-outline-link--sub' : '', h.id === activeId ? 'active' : ''].filter(Boolean).join(' ')}
              onClick={(e) => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
            >{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function resolveEmbedUrl(src: string): { url: string; type: 'video' | 'tweet' | 'podcast' | 'reddit' | 'generic' } {
  // YouTube
  const ytMatch = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) return { url: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`, type: 'video' }

  // X / Twitter
  const xMatch = src.match(/(?:twitter\.com|x\.com)\/\w+\/status\/\d+/)
  if (xMatch) return { url: `https://twitframe.com/show?url=${encodeURIComponent(src)}`, type: 'tweet' }

  // Reddit
  const redditMatch = src.match(/reddit\.com\/(r\/[^?#]+)/)
  if (redditMatch) return { url: `https://www.redditmedia.com/${redditMatch[1]}?ref_source=embed&ref=share&embed=true`, type: 'reddit' }

  // Spotify (podcast or track)
  const spotifyMatch = src.match(/open\.spotify\.com\/(episode|show|track|playlist)\/([a-zA-Z0-9]+)/)
  if (spotifyMatch) return { url: `https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}`, type: 'podcast' }

  // Apple Podcasts
  if (src.includes('podcasts.apple.com')) return { url: src.replace('podcasts.apple.com', 'embed.podcasts.apple.com'), type: 'podcast' }

  return { url: src, type: 'generic' }
}

function EmbedBlock({ src }: { src: string }) {
  const { url, type } = resolveEmbedUrl(src)
  const isWide = type === 'video' || type === 'generic'
  const isTall = type === 'tweet' || type === 'reddit'
  const isPodcast = type === 'podcast'

  return (
    <div className={`article-embed article-embed--${type}`}>
      <iframe
        src={url}
        title="Embedded content"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        style={{
          width: '100%',
          height: isPodcast ? 152 : isTall ? 500 : undefined,
          aspectRatio: isWide && !isTall ? '16/9' : undefined,
          border: 'none',
          borderRadius: 8,
        }}
      />
    </div>
  )
}

function ArticleShareSidebar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const enc = encodeURIComponent

  function handleCopy() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="article-share-sidebar">
      <span className="article-share-label">Share</span>
      <button className="article-share-btn" onClick={handleCopy} aria-label="Copy link">
        {copied
          ? <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5" /></svg>
          : <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
        }
      </button>
      <a href={`https://x.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`} target="_blank" rel="noopener noreferrer" className="article-share-btn" aria-label="Share on X">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer" className="article-share-btn" aria-label="Share on LinkedIn">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.12 7.73H1.28v14.01h3.84V7.73ZM3.2 1.25C1.97 1.25.98 2.24.98 3.46s.99 2.22 2.22 2.22 2.22-.99 2.22-2.22S4.43 1.25 3.2 1.25Zm19.82 12.45c0-4.3-2.29-6.3-5.35-6.3-2.47 0-3.57 1.36-4.18 2.31h-.06V7.73H9.75v14.01h3.84v-6.93c0-1.83.35-3.6 2.61-3.6 2.23 0 2.26 2.08 2.26 3.72v6.81h3.84v-8.04Z" /></svg>
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer" className="article-share-btn" aria-label="Share on Facebook">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.12 8.1h2.34V4.3c-.4-.05-1.79-.17-3.41-.17-3.38 0-5.69 2.06-5.69 5.85v3.29H4.54v4.25h3.82V24h4.62v-6.48h3.62l.57-4.25h-4.19v-2.87c0-1.23.33-2.3 2.14-2.3Z" /></svg>
      </a>
    </div>
  )
}

function ArticleFeedbackWidget() {
  const [selected, setSelected] = useState<string | null>(null)
  const options = [
    { value: 'low', label: 'Not helpful', icon: '😔' },
    { value: 'neutral', label: 'Okay', icon: '😐' },
    { value: 'high', label: 'Helpful', icon: '😄' },
  ]
  return (
    <section className="article-feedback">
      <p className="article-feedback-title">Was this article helpful?</p>
      <div className="article-feedback-options">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={['article-feedback-btn', selected === opt.value ? 'active' : '', selected !== null && selected !== opt.value ? 'faded' : ''].filter(Boolean).join(' ')}
            aria-label={opt.label}
            onClick={() => setSelected(selected === opt.value ? null : opt.value)}
          >{opt.icon}</button>
        ))}
      </div>
    </section>
  )
}

function VerticalArticlePage({ article }: { article: VerticalArticle }) {
  const currentVertical = getVerticalBySlug(article.vertical)
  const accentColor = currentVertical?.color ?? '#2563eb'

  useSEO({
    title: article.title,
    description: article.excerpt,
  })

  const related = verticalArticles
    .filter(a => a.vertical === article.vertical && a.slug !== article.slug)
    .slice(0, 2)

  return (
    <div className="article-page-outer" style={{ '--article-color': accentColor } as CSSProperties}>
      <div className="article-page-grid">
        <aside className="article-sidebar-left">
          <div className="article-sidebar-sticky" />
        </aside>

        <article className="article-main">
          <Link to={`/${article.vertical}/${article.subNicheSlug}`} className="article-back-link">
            ← {currentVertical?.label ?? article.vertical} › {article.subNiche}
          </Link>
          <header>
            <h1 className="article-h1">{article.title}</h1>
            <div className="article-meta">
              <div className="article-meta-left">
                <span className="article-meta-category" style={{ background: accentColor }}>{article.category}</span>
                <span className="article-meta-sep">·</span>
                <time>{article.publishedAt}</time>
                <span className="article-meta-sep">·</span>
                <span>{article.readingTime} min read</span>
              </div>
              <span className="article-editorial-signals">Last updated · Research-based · Sources listed</span>
            </div>
            <img src={`https://picsum.photos/seed/${article.id}/1200/630`} alt={article.title} className="article-cover" />
          </header>
          <div className="article-body">
            <p className="article-excerpt article-excerpt--intro">{article.excerpt}</p>
          </div>
          <ArticleFeedbackWidget />
        </article>

        <aside className="article-sidebar-right">
          <div className="article-share-sticky">
            <ArticleShareSidebar title={article.title} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="article-related-section">
          <div className="article-related-inner">
            <div className="article-related-left">
              <h2>
                Similar articles.
                <span>More from {currentVertical?.label ?? article.vertical}.</span>
              </h2>
            </div>
            <div className="article-related-grid">
              {related.map(a => (
                <Link key={a.id} className="vertical-article-card card-hover" style={{ '--article-color': accentColor, '--card-bg': '#ffffff', height: '100%', boxSizing: 'border-box' } as CSSProperties} to={`/${a.vertical}/${a.subNicheSlug}/${a.slug}`}>
                  <p className="vertical-article-path">{currentVertical?.label ?? a.vertical} › {a.subNiche}</p>
                  <div className="vertical-article-meta"><span>{a.category}</span><small>{a.readingTime} min read</small></div>
                  <h3 className="card-heading card-title">{a.title}</h3>
                  <p className="line-clamp-2" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', flex: 1 }}>{a.excerpt}</p>
                  <div className="article-card-byline"><span>Fiindt</span><span>·</span><time>{a.publishedAt}</time></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <VerticalNewsletter vertical={currentVertical?.label ?? article.vertical} title={`Stay ahead in ${currentVertical?.label ?? article.vertical}.`} subtitle="New research and guides every week. No filler." />
    </div>
  )
}

function ArticlePage() {
  const { vertical, subNiche, slug } = useParams()
  const article = fiindtArticles.find(
    (item) => toSlug(item.vertical) === vertical && toSlug(item.subNiche) === subNiche && item.slug === slug,
  )

  useSEO({
    title: article?.title ?? 'Fiindt',
    description: article?.excerpt,
    ogImage: article?.coverImageUrl,
  })

  if (!article) {
    const verticalArticle = verticalArticles.find(
      (item) => item.vertical === vertical && item.subNicheSlug === subNiche && item.slug === slug,
    )
    if (verticalArticle) return <VerticalArticlePage article={verticalArticle} />
    return <VerticalSubNichePage />
  }

  const currentVertical = getVerticalBySlug(toSlug(article.vertical))
  const accentColor = currentVertical?.color ?? '#2563eb'
  const verticalSlug = toSlug(article.vertical)
  const subNicheSlug = toSlug(article.subNiche)
  const blocks = parseArticleBlocks(article.content)
  const faqBlocks = blocks.filter((b): b is { type: 'faq'; items: { q: string; a: string }[]; id: '' } => b.type === 'faq')
  const articleFaqItems = faqBlocks.flatMap(b => b.items.map(item => ({ question: item.q, answer: item.a })))
  const hasArticleFaq = articleFaqItems.length > 0
  const headings = blocks
    .filter((b): b is { type: 'h2' | 'h3'; text: string; id: string } => b.type === 'h2' || b.type === 'h3')
    .map((b) => ({ id: b.id, text: b.text, level: b.type === 'h3' ? 3 : 2 }))


  return (
    <div className="article-page-outer" style={{ '--article-color': accentColor } as CSSProperties}>
      <div className="article-page-grid">

        <aside className="article-sidebar-left">
          <div className="article-sidebar-sticky">
            <ArticleOutlineNav headings={headings} />
            {(() => {
              const takeaways = blocks.filter((b): b is { type: 'h2'; text: string; id: string } => b.type === 'h2').slice(0, 3).map(b => b.text)
              if (takeaways.length === 0) return null
              return (
                <div className="article-takeaways">
                  <h4 className="article-takeaways-title">Key takeaways</h4>
                  <ul>
                    {takeaways.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )
            })()}
          </div>
        </aside>

        <article className="article-main">
          <Link to={`/${verticalSlug}/${subNicheSlug}`} className="article-back-link">
            ← {article.subNiche}
          </Link>

          <header className="article-header">
            <h1 className="article-h1">{article.title}</h1>
            <div className="article-meta">
              <div className="article-meta-left">
                <span className="article-meta-category" style={{ background: accentColor }}>{article.category}</span>
                {article.author && <><span className="article-meta-sep">·</span><span className="article-meta-author">{article.author.name}</span></>}
                <span className="article-meta-sep">·</span>
                <time>{formatArticleDate(article.publishedAt)}</time>
                <span className="article-meta-sep">·</span>
                <span>{article.readingTime} min read</span>
              </div>
              <span className="article-editorial-signals">Last updated · Research-based · Sources listed</span>
            </div>
            <img
              src={`https://picsum.photos/seed/${article.id}/1200/630`}
              alt={article.title}
              className="article-cover"
            />
          </header>

          <div className="article-body">
            {article.excerpt && <p className="article-excerpt article-excerpt--intro">{article.excerpt}</p>}
            {blocks.map((block, i) => {
              if (block.type === 'h2' || block.type === 'h3' || block.type === 'h4') {
                const Tag = block.type
                return (
                  <Tag key={i} id={block.id} className="article-heading-anchor">
                    {block.text}
                    <a href={`#${block.id}`} className="article-anchor-icon" aria-label={`Link to section: ${block.text}`}
                      onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${block.id}`) }}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                    </a>
                  </Tag>
                )
              }
              if (block.type === 'h5') return (
                <h5 key={i} id={block.id} className="article-heading-anchor">
                  {block.text}
                  <a href={`#${block.id}`} className="article-anchor-icon" aria-label={`Link to section: ${block.text}`}
                    onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${block.id}`) }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                  </a>
                </h5>
              )
              if (block.type === 'p') return <p key={i}>{renderInline(block.text)}</p>
              if (block.type === 'blockquote') return <blockquote key={i} className="article-blockquote">{block.text}</blockquote>
              if (block.type === 'callout') return (
                <div key={i} className={`article-callout article-callout--${block.variant}`}>
                  <span className="article-callout-label">
                    {block.variant === 'tip' && 'Un petit conseil pour vous'}
                    {block.variant === 'info' && 'À noter'}
                    {block.variant === 'warning' && 'Attention'}
                    {block.variant === 'danger' && 'Important'}
                  </span>
                  <p>{block.text}</p>
                </div>
              )
              if (block.type === 'ul') return <ul key={i} className="article-list">{block.items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}</ul>
              if (block.type === 'ol') return <ol key={i} className="article-list article-list--ol">{block.items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}</ol>
              if (block.type === 'code') return (
                <div key={i} className="article-code-block">
                  <div className="article-code-header">
                    <span className="article-code-lang">{block.lang && block.lang !== 'text' ? block.lang : 'code'}</span>
                    <button className="article-code-copy" onClick={() => navigator.clipboard.writeText(block.text)} title="Copier">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                  </div>
                  <pre><code>{block.text}</code></pre>
                </div>
              )
              if (block.type === 'table') return (
                <div key={i} className="article-table-wrap">
                  <table className="article-table">
                    <thead><tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
                    <tbody>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )
              if (block.type === 'faq') return null
              if (block.type === 'cta') return null
              if (block.type === 'image') return (
                <figure key={i} className="article-img-block">
                  <img src={block.src} alt={block.alt} />
                  <figcaption className="article-img-caption">
                    {block.caption && <span className="article-img-caption-text">{block.caption}</span>}
                    {block.alt && <span className="article-img-source"><span className="article-img-source-label">Source :</span> {block.alt}</span>}
                  </figcaption>
                </figure>
              )
              if (block.type === 'embed') return <EmbedBlock key={i} src={block.src} />
              return null
            })}
          </div>

          <ArticleFeedbackWidget />
        </article>

        <aside className="article-sidebar-right">
          <div className="article-share-sticky">
            <ArticleShareSidebar title={article.title} />
          </div>
        </aside>

      </div>
      {hasArticleFaq && (
        <section className="faq vertical-faq wrap" style={{ paddingBottom: 64 }}>
          <h2>
            Frequently asked questions
            <span>Clear answers to common questions about this topic.</span>
          </h2>
          <FAQList items={articleFaqItems} />
        </section>
      )}
      {(() => {
        const related = fiindtArticles.filter(a => toSlug(a.vertical) === verticalSlug && a.slug !== article.slug).slice(0, 2)
        if (related.length === 0) return null
        return (
          <section className={cx('article-related-section', !hasArticleFaq && 'article-related-section--no-faq')}>
            <div className="article-related-inner">
              <div className="article-related-left">
                <h2>
                  Similar articles.
                  <span>More from {currentVertical?.label ?? article.vertical}.</span>
                </h2>
              </div>
              <div className="article-related-grid">
                {related.map((a) => (
                  <FiindtArticleCard key={a.id} article={a} cardBg="#ffffff" />
                ))}
              </div>
            </div>
          </section>
        )
      })()}
      <div style={{ marginBottom: -80 }}>
        <VerticalNewsletter
          vertical={currentVertical?.label ?? article.vertical}
          title={`Stay ahead in ${currentVertical?.label ?? article.vertical}.`}
          subtitle="New research and guides every week. No filler."
        />
      </div>
    </div>
  )
}

function VerticalArticleCard({ article }: { article: VerticalArticle }) {
  const vertical = getVerticalBySlug(article.vertical)

  return (
    <Link
      className="vertical-article-card card-hover"
      style={{ '--article-color': vertical?.color ?? '#2563eb', '--card-accent': vertical?.color ?? '#2563eb' } as CSSProperties}
      to={`/${article.vertical}/${article.subNicheSlug}/${article.slug}`}
    >
      <p className="vertical-article-path">
        {vertical?.label ?? article.vertical} › {article.subNiche}
      </p>
      <div className="vertical-article-meta">
        <span>{article.category}</span>
        <small>{article.readingTime} min read</small>
      </div>
      <h3 className="card-heading card-title">{article.title}</h3>
      <p className="line-clamp-2" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', flex: 1 }}>{article.excerpt}</p>
      <div className="article-card-byline">
        <span>Fiindt</span>
        <span>·</span>
        <time>{formatArticleDate(article.publishedAt)}</time>
      </div>
    </Link>
  )
}

function SubNichePageTech({ vertical, currentSubNiche, articles }: {
  vertical: ReturnType<typeof getVerticalBySlug> & object
  currentSubNiche: { label: string; slug: string; description: string; categories: string[] }
  articles: ReturnType<typeof getArticlesByNiche>
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  useSEO({
    title: `${currentSubNiche.label} — ${(vertical as { label: string }).label}`,
    description: currentSubNiche.description,
  })
  const PER_PAGE = 15
  const filtered = articles
    .filter(a => activeCategory === null || a.category === activeCategory)
    .filter(a => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    })
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const otherSubNiches = vertical.subNiches.filter((s: { slug: string }) => s.slug !== currentSubNiche.slug)

  return (
    <div className="subniche-page" style={{ '--vertical-color': vertical.color } as CSSProperties}>

      {/* Header éditorial compact */}
      <header className="subniche-header wrap">
        <nav className="subniche-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to={`/${vertical.slug}`}>{vertical.label}</Link>
          <span>›</span>
          <span>{currentSubNiche.label}</span>
        </nav>
        <h1 className="subniche-title">{currentSubNiche.label}</h1>
        <p className="subniche-desc">{currentSubNiche.description}</p>
        <div className="subniche-stats">
          <span className="subniche-stat-item">
            <HugeiconsIcon icon={FolderLibraryIcon} size={22} strokeWidth={1.6} color={vertical.color} />
            <strong>{currentSubNiche.categories.length}</strong> categories
          </span>
          <span className="subniche-stat-item">
            <HugeiconsIcon icon={BookOpenTextIcon} size={22} strokeWidth={1.6} color={vertical.color} />
            {articles.length} articles
          </span>
          <span className="subniche-stat-item">
            <HugeiconsIcon icon={AlarmClockIcon} size={22} strokeWidth={1.6} color={vertical.color} />
            <strong>Updated</strong> weekly
          </span>
        </div>
        <SearchBar
          className="subniche-search"
          ariaLabel={`Search ${currentSubNiche.label}`}
          placeholder={`Search in ${currentSubNiche.label}...`}
          accentColor={vertical.color}
          value={searchQuery}
          onChange={v => { setSearchQuery(v); setPage(1) }}
        />
      </header>

      {/* Filtre par catégorie */}
      <section className="subniche-filter wrap">
        <button
          className={activeCategory === null ? 'subniche-pill active' : 'subniche-pill'}
          onClick={() => { setActiveCategory(null); setPage(1) }}
        >
          All
        </button>
        {currentSubNiche.categories.map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? 'subniche-pill active' : 'subniche-pill'}
            onClick={() => { setActiveCategory(cat); setPage(1) }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Grille d'articles */}
      <section className="subniche-articles wrap">
        {paginated.length > 0 ? (
          <div className="article-grid">
            {paginated.map(article => (
              <VerticalArticleCard article={article} key={article.id} />
            ))}
          </div>
        ) : (
          <p className="subniche-empty">No articles in this category yet.</p>
        )}
        {totalPages > 1 && (
          <div className="subniche-pagination">
            <button className="subniche-page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>←</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} className={n === page ? 'subniche-page-btn active' : 'subniche-page-btn'} onClick={() => setPage(n)}>{n}</button>
            ))}
            <button className="subniche-page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>→</button>
          </div>
        )}
      </section>

      {/* Autres sous-niches */}
      <section className="contact-context-section" style={{ paddingTop: 64, paddingBottom: 64, background: 'var(--cream-2)' }}>
        <div className="contact-context-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 60px', display: 'flex', gap: 64, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flexShrink: 0, maxWidth: 360 }}>
            <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, margin: 0 }}>
              Also in {vertical.label}.
              <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                Explore other topics in this vertical.
              </span>
            </h2>
          </div>
          <div className="contact-context-chips" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {otherSubNiches.map((s: { slug: string; label: string }) => (
              <Link key={s.slug} to={`/${vertical.slug}/${s.slug}`} className="subniche-related-chip">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <VerticalFAQ verticalSlug={vertical.slug} />
      <VerticalNewsletter vertical={currentSubNiche.label} />
    </div>
  )
}

function VerticalSubNichePage() {
  const { vertical: verticalSlug, subNiche } = useParams()
  const vertical = getVerticalBySlug(verticalSlug)

  if (!vertical) {
    return <NotFoundPage />
  }

  const currentSubNiche =
    getSubNicheBySlug(vertical.slug, subNiche) ?? vertical.subNiches[0]
  const articles = getArticlesByNiche(vertical.slug, currentSubNiche.slug)

  return <SubNichePageTech vertical={vertical} currentSubNiche={currentSubNiche} articles={articles} />
}

function VerticalNewsletter({ vertical, title, subtitle }: { vertical: string; title?: string; subtitle?: string }) {
  return (
    <section className="vertical-newsletter wrap">
      <div style={{ background: '#26221e', padding: '32px 40px', minHeight: 132, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#fbf4eb', lineHeight: 1.1, margin: 0 }}>
            {title ?? `Follow ${vertical} updates`}
            <span style={{ display: 'block', color: 'rgba(251,244,235,.35)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              {subtitle ?? `Get new ${vertical.toLowerCase()} guides, resources and practical decisions from Fiindt.`}
            </span>
          </h2>
        </div>
        <form style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.08)', borderRadius: 999, padding: '6px 6px 6px 18px', flexShrink: 0 }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{ width: 220, border: 0, outline: 0, background: 'transparent', fontSize: 14, color: '#fbf4eb', fontFamily: 'inherit' }}
          />
          <button type="submit" style={{ background: '#47c971', color: '#fff', border: 0, borderRadius: 999, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

function FAQPage() {
  useSEO({
    title: 'Frequently asked questions',
    description: 'Clear answers about Fiindt, its research approach and every knowledge vertical.',
  })
  return (
    <>
      <PageHero
        className="faq-page-hero"
        title="Frequently asked questions"
        subtitle="Clear answers about Fiindt, its research approach and every knowledge vertical."
      />
      <section className="faq-directory wrap">
        <section className="faq faq-directory-section" id="general">
          <h2>
            About Fiindt
            <span>General questions about the platform, its research and its content structure.</span>
          </h2>
          <FAQList items={homeFaqs} />
        </section>
        {verticals.map((vertical) => (
          <section
            className="faq faq-directory-section"
            id={`${vertical.slug}-faq`}
            key={vertical.slug}
          >
            <h2>
              {vertical.label}
              <span>Questions about Fiindt’s {vertical.label.toLowerCase()} research and guidance.</span>
            </h2>
            <FAQList items={verticalFaqs[vertical.slug] ?? []} />
          </section>
        ))}
      </section>
    </>
  )
}

function LegalPage({ title }: { title: string }) {
  return (
    <>
      <PageHero

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

const legalHubGroups = [
  {
    label: 'Essentials',
    pages: ['Legal Notice', 'Privacy Policy', 'Cookie Policy', 'Terms of Use', 'Editorial Policy', 'Content Disclaimer'],
  },
  {
    label: 'Transparency',
    pages: ['Affiliate Disclosure', 'Advertising Policy', 'AI Policy'],
  },
  {
    label: 'Rights & community',
    pages: ['Copyright Policy', 'Content Reporting', 'Community Guidelines', 'Accessibility Statement'],
  },
  {
    label: 'Future services',
    pages: ['Course and Paid Content Terms', 'Privacy Preferences'],
  },
]

const legalHubIcon: Record<string, typeof LegalDocument01Icon> = {
  'Legal Notice': Home01Icon,
  'Privacy Policy': Shield01Icon,
  'Cookie Policy': ComputerTerminal01Icon,
  'Terms of Use': Certificate01Icon,
  'Editorial Policy': BookOpen01Icon,
  'Content Disclaimer': Idea01Icon,
  'Affiliate Disclosure': Megaphone01Icon,
  'Advertising Policy': StarIcon,
  'AI Policy': AiChipIcon,
  'Copyright Policy': LegalDocument01Icon,
  'Content Reporting': Message01Icon,
  'Community Guidelines': UserGroupIcon,
  'Course and Paid Content Terms': CreditCardIcon,
  'Privacy Preferences': Settings01Icon,
  'Accessibility Statement': Certificate01Icon,
}

function LegalHubPage() {
  useSEO({ title: 'Legal Center', noIndex: true })
  const findPage = (label: string) => fiindtLegalPages.find((p) => p.title === label)

  return (
    <div className="fiindt-legal-page wrap">
      <header className="fiindt-legal-header">
        <h1>Legal Center</h1>
        <p>All policies, terms, disclosures and statements governing the use of Fiindt.</p>
      </header>
      <section className="legal-hub">
        {legalHubGroups.map((group) => (
          <div key={group.label} className="legal-hub-group">
            <p className="legal-hub-group-label">{group.label}</p>
            <div className="legal-hub-grid">
              {group.pages.map((label) => {
                const page = findPage(label)
                if (!page) return null
                const Icon = legalHubIcon[label] ?? LegalDocument01Icon
                return (
                  <Link to={page.route} key={label} className="legal-hub-card">
                    <span className="legal-hub-card-icon">
                      <HugeiconsIcon icon={Icon} size={26} strokeWidth={1.4} />
                    </span>
                    <span className="legal-hub-card-body">
                      <span className="legal-hub-card-title">{page.title}</span>
                      <span className="legal-hub-card-desc">{page.subtitle}</span>
                    </span>
                    <span className="legal-hub-card-arrow">→</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

function legalSectionIcon(id: string): typeof LegalDocument01Icon {
  // Legal Notice
  if (id.includes('site-publisher')) return Home01Icon
  if (id.includes('hosting') || id.includes('technical-provider')) return Settings01Icon
  if (id.includes('editorial-responsibility')) return BookOpen01Icon
  if (id.includes('intellectual-property')) return Shield01Icon
  if (id.includes('contact-and-reporting')) return Message01Icon
  if (id.includes('applicable-law')) return JusticeScale01Icon
  // Privacy
  if (id.includes('introduction')) return Idea01Icon
  if (id.includes('data-we-may-collect')) return FolderLibraryIcon
  if (id.includes('why-we-use-data')) return Compass01Icon
  if (id.includes('legal-bases')) return LegalDocument01Icon
  if (id.includes('services-and-providers')) return ComputerTerminal01Icon
  if (id.includes('cookies-and-similar')) return Shield01Icon
  if (id.includes('international-transfers')) return GlobeIcon
  if (id.includes('retention-periods')) return Timer01Icon
  if (id.includes('security')) return Shield01Icon
  if (id.includes('your-rights')) return Certificate01Icon
  if (id.includes('exercise-rights')) return UserGroupIcon
  if (id.includes('policy-updates')) return Calendar01Icon
  // Cookies
  if (id.includes('what-cookies')) return Idea01Icon
  if (id.includes('why-cookies')) return Compass01Icon
  if (id.includes('cookie-categories')) return FolderLibraryIcon
  if (id.includes('cookie-list')) return LegalDocument01Icon
  if (id.includes('consent-management')) return Settings01Icon
  if (id.includes('browser-controls')) return ComputerTerminal01Icon
  if (id.includes('cookie-updates')) return Calendar01Icon
  // Terms
  if (id.includes('acceptance')) return Certificate01Icon
  if (id.includes('description')) return BookOpen01Icon
  if (id.includes('user-obligations')) return UserGroupIcon
  if (id.includes('accounts')) return BriefcaseBusinessIcon
  if (id.includes('content')) return News01Icon
  if (id.includes('paid-services')) return CreditCardIcon
  if (id.includes('-ip-')) return Shield01Icon
  if (id.includes('liability')) return JusticeScale01Icon
  if (id.includes('termination')) return StarIcon
  if (id.includes('governing-law')) return LegalDocument01Icon
  // Editorial
  if (id.includes('mission')) return Compass01Icon
  if (id.includes('editorial-structure')) return FolderLibraryIcon
  if (id.includes('creation-process')) return FlaskConicalIcon
  if (id.includes('sources')) return Search01Icon
  if (id.includes('sensitive-topics')) return Atom01Icon
  if (id.includes('corrections')) return Message01Icon
  if (id.includes('independence')) return StarIcon
  // Other pages
  if (id.includes('affiliate') || id.includes('advertis') || id.includes('sponsor')) return Megaphone01Icon
  if (id.includes('recommend') || id.includes('partner') || id.includes('editorial-independen')) return StarIcon
  if (id.includes('ai') || id.includes('human') || id.includes('automat') || id.includes('transparen')) return AiChipIcon
  if (id.includes('limitation') || id.includes('data-and-ai')) return BinocularsIcon
  if (id.includes('paid') || id.includes('course') || id.includes('payment') || id.includes('refund')) return CreditCardIcon
  if (id.includes('community') || id.includes('moderat') || id.includes('allowed') || id.includes('prohibited')) return UserGroupIcon
  if (id.includes('purpose') || id.includes('scope')) return Idea01Icon
  if (id.includes('report') || id.includes('complaint') || id.includes('contact')) return Message01Icon
  if (id.includes('access') || id.includes('commit') || id.includes('current-meas')) return Certificate01Icon
  if (id.includes('future') || id.includes('account-req')) return BriefcaseBusinessIcon
  if (id.includes('known') || id.includes('external-link') || id.includes('third')) return GlobeIcon
  if (id.includes('manage') || id.includes('preference') || id.includes('current-status')) return Settings01Icon
  if (id.includes('data-request')) return FolderLibraryIcon
  return LegalDocument01Icon
}

function FiindtLegalPage({ page }: { page: LegalPageRecord }) {
  const [activeId, setActiveId] = useState(page.sections[0]?.id ?? '')
  const clicking = useRef(false)

  useSEO({ title: page.title, noIndex: true })

  useEffect(() => {
    const handleScroll = () => {
      if (clicking.current) return
      const elements = page.sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
      const offset = 140
      let current = elements[0]?.id ?? ''
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= offset) current = el.id
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page.sections])

  return (
    <div className="fiindt-legal-page wrap">
      {/* Page header */}
      <header className="fiindt-legal-header">
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
        {page.lastUpdatedLabel && <small>{page.lastUpdatedLabel}</small>}
      </header>

      {/* TOC + content */}
      <div className="fiindt-legal-body">
        <aside>
          {page.sections.map((section) => (
            <a
              href={`#${section.id}`}
              key={section.id}
              data-active={section.id === activeId ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                setActiveId(section.id)
                clicking.current = true
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setTimeout(() => { clicking.current = false }, 1200)
              }}
            >{section.title}</a>
          ))}
          {page.relatedLink && (
            <Link to={page.relatedLink.href} style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(67,38,29,.10)', color: 'var(--brand-green)', fontSize: 13, fontWeight: 600, display: 'block', letterSpacing: '-0.01em' }}>
              {page.relatedLink.label} →
            </Link>
          )}
        </aside>
        <div>
          {page.sections.map((section) => (
            <article id={section.id} key={section.id}>
              <span className="legal-section-icon" aria-hidden="true">
                <HugeiconsIcon icon={legalSectionIcon(section.id)} size={32} strokeWidth={1.4} />
              </span>
              <h2>{section.title}</h2>
              {section.intro && <p className="section-intro">{section.intro}</p>}
              {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {section.items?.length ? <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul> : null}
              {section.subsections?.map((subsection) => (
                <section key={subsection.id}>
                  <h3>{subsection.title}</h3>
                  {subsection.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {subsection.items?.length ? (
                    <ul>{subsection.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  ) : null}
                </section>
              ))}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

import PinnedCardsMap, { type PinnedCardItem } from './components/PinnedCardsMap'

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <p style={{ fontSize: 22, fontWeight: 600, color: '#26221e', letterSpacing: '-0.02em', marginBottom: 8 }}>Message sent.</p>
        <p style={{ fontSize: 15, color: 'rgba(67,38,29,.55)' }}>We'll get back to you at {fields.email}.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <MayneFormField label="Name">
          <MayneInput
            required
            placeholder="Your name"
            value={fields.name}
            onChange={set('name')}
          />
        </MayneFormField>
        <MayneFormField label="Email">
          <MayneInput
            type="email"
            required
            placeholder="you@example.com"
            value={fields.email}
            onChange={set('email')}
          />
        </MayneFormField>
      </div>
      <MayneFormField label="Subject">
        <MayneInput
          required
          placeholder="General question, editorial note, partnership…"
          value={fields.subject}
          onChange={set('subject')}
        />
      </MayneFormField>
      <MayneFormField label="Message">
        <textarea
          required
          rows={6}
          placeholder="Share as much context as you can."
          value={fields.message}
          onChange={set('message')}
          style={{
            width: '100%',
            resize: 'vertical',
            padding: '10px 14px',
            fontSize: 14,
            fontFamily: 'inherit',
            color: '#26221e',
            background: '#fff',
            border: '1px solid rgba(67,38,29,.15)',
            borderRadius: 10,
            outline: 'none',
            lineHeight: 1.55,
            letterSpacing: '-0.01em',
            boxSizing: 'border-box',
          }}
        />
      </MayneFormField>
      {status === 'error' && (
        <p style={{ fontSize: 13, color: '#e53e3e', margin: 0 }}>Something went wrong — try emailing us directly at hello@fiindt.com.</p>
      )}
      <div className="contact-form-submit">
        <MayneButton type="submit" variant="primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </MayneButton>
      </div>
    </form>
  )
}

function ContactPage() {
  useSEO({
    title: 'Contact',
    description: 'Questions, corrections, partnerships and editorial feedback for Fiindt.',
  })
  const contactPaths: PinnedCardItem[] = [
    { title: 'General support', description: 'Questions, feedback, access issues or technical help.', icon: <HugeiconsIcon icon={Search01Icon} size={26} strokeWidth={1.8} />, color: '#3B82F6' },
    { title: 'Partnership', description: 'Collaborations, sponsors or editorial opportunities.', icon: <HugeiconsIcon icon={BriefcaseBusinessIcon} size={26} strokeWidth={1.8} />, color: '#47c971' },
    { title: 'Editorial', description: 'Sources, corrections or topic suggestions.', icon: <HugeiconsIcon icon={BookOpenTextIcon} size={26} strokeWidth={1.8} />, color: '#ffc524' },
  ]

  return (
    <>
      <section style={{ minHeight: 'calc(100svh - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 60px' }}>
          <h1 style={{ fontSize: 'clamp(48px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.046em', color: '#26221e', lineHeight: 1.1, margin: '0 auto 20px' }}>
            Tell us what needs to be clearer.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, letterSpacing: '-0.01em', color: 'rgba(67,38,29,.55)', margin: '0 auto 32px', maxWidth: 540 }}>
            Questions, corrections, partnerships, topic suggestions, and editorial feedback all start here.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hello@fiindt.com" className="contact-btn-primary">Email us</a>
            <a href="mailto:hello@fiindt.com" className="contact-btn-outline">hello@fiindt.com</a>
          </div>
        </div>
      </section>

      <div style={{ paddingBottom: 0 }}>
        <PinnedCardsMap
          title="How to reach us."
          description="Choose the right path for your message."
          items={contactPaths}
        />
      </div>

      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', marginBottom: 8 }}>
            Send us a message.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(67,38,29,.50)', marginBottom: 36, letterSpacing: '-0.01em' }}>
            We read everything and reply within 2 business days.
          </p>
          <ContactForm />
        </div>
      </section>

      <section className="contact-context-section" style={{ paddingTop: 64, paddingBottom: 64, background: 'var(--cream-2)' }}>
        <div className="contact-context-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 60px', display: 'flex', gap: 64, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flexShrink: 0 }}>
            <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, margin: 0 }}>
              Clear context gets better<br />replies.
              <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                Help us help you faster.
              </span>
            </h2>
          </div>
          <div className="contact-context-chips" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Add the article URL', 'Be specific', 'Share useful context', 'Include sources'].map((rule) => (
              <span key={rule} style={{ fontSize: 14, fontWeight: 600, padding: '9px 18px', borderRadius: 999, background: 'rgba(67,38,29,.07)', color: 'rgba(67,38,29,.50)', letterSpacing: '-0.01em' }}>
                {rule}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function PageSkeleton() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100svh', padding: '80px 24px 0' }}>
      <div style={{ maxWidth: 740, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <MayneSkeleton width="55%" height={18} radius={8} />
        <MayneSkeleton width="100%" height={56} radius={12} />
        <MayneSkeleton width="80%" height={56} radius={12} />
        <MayneSkeleton width="60%" height={20} radius={8} style={{ marginTop: 8 }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <MayneSkeleton width={140} height={44} radius={999} />
          <MayneSkeleton width={120} height={44} radius={999} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 48 }}>
          <MayneSkeleton width="100%" height={14} radius={6} />
          <MayneSkeleton width="92%" height={14} radius={6} />
          <MayneSkeleton width="85%" height={14} radius={6} />
          <MayneSkeleton width="78%" height={14} radius={6} />
        </div>
      </div>
    </div>
  )
}

function PageHero({
  className,
  title,
  subtitle,
}: {
  className?: string
  title: string
  subtitle: string
}) {
  return (
    <MayneFadeIn>
      <section className={cx('page-hero wrap', className)}>
        <div>

          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>
    </MayneFadeIn>
  )
}

function Footer() {
  const half = Math.ceil(verticals.length / 2)
  const columns = [
    verticals.slice(0, half).map(v => [v.label, `/${v.slug}`]),
    verticals.slice(half).map(v => [v.label, `/${v.slug}`]),
    [
      ['Home', '/'],
      ['About', routes.about],
      ['FAQ', routes.faq],
      ['Contact', '/contact'],
    ],
    [
      ['Legal Notice', '/legal-notice'],
      ['Privacy Policy', '/privacy-policy'],
      ['Cookie Policy', '/cookie-policy'],
      ['Terms', '/terms'],
      ['Editorial Policy', '/editorial-policy'],
      ['Legal Hub', '/legal'],
    ],
  ]
  return (
    <footer className="footer wrap">
      <Link to="/" aria-label="Fiindt home" style={{ textDecoration: 'none', alignSelf: 'start', marginTop: -14 }}>
        <FiindtLogo className="fiindt-logo-footer" />
      </Link>
      <div className="footer-links">
        {columns.map((links, index) => (
          <div className={cx('footer-column', index < 2 && 'footer-column-verticals')} key={index}>
            {links.map(([label, href]) => (
              <Link to={href} key={label}>{label}</Link>
            ))}
          </div>
        ))}
      </div>
      <small>© 2026 Fiindt</small>
    </footer>
  )
}

export default App
