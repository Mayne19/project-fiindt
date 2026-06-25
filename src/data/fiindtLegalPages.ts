import { legalIdentity } from './fiindtLegalIdentity'

export interface LegalSubsection {
  id: string
  title: string
  paragraphs?: string[]
  items?: string[]
}

export interface LegalSection {
  id: string
  title: string
  intro?: string
  paragraphs?: string[]
  items?: string[]
  subsections?: LegalSubsection[]
}

export interface LegalPageRecord {
  route: string
  eyebrow: string
  title: string
  subtitle: string
  seoTitle: string
  seoDescription: string
  lastUpdatedLabel?: string
  sections: LegalSection[]
  relatedLink?: { href: string; label: string }
}

function sid(base: string, label: string) {
  return `${base}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
}

function sub(base: string, title: string, paragraphs?: string[], items?: string[]): LegalSubsection {
  return { id: sid(base, title), title, paragraphs, items }
}

function page(
  route: string,
  eyebrow: string,
  title: string,
  subtitle: string,
  sections: LegalSection[],
  relatedLink?: { href: string; label: string },
): LegalPageRecord {
  return { route, eyebrow, title, subtitle, seoTitle: title, seoDescription: subtitle, sections, relatedLink }
}

// ─── Legal Notice ─────────────────────────────────────────────────────────────

const legalNoticeSections: LegalSection[] = [
  {
    id: 'site-publisher',
    title: 'Site publisher',
    paragraphs: [
      `Fiindt (fiindt.com) is a knowledge platform operated from ${legalIdentity.country}. The platform is in active development, independently operated and produces original editorial content across a range of knowledge domains.`,
      'The formal legal operator name, postal address and direct contact details will be finalized before public launch. All requests submitted in the meantime are tracked internally and will receive a response.',
    ],
  },
  {
    id: 'hosting-and-technical-providers',
    title: 'Hosting and technical providers',
    paragraphs: [
      `Fiindt relies on the following infrastructure providers: ${legalIdentity.hostingProviders[0].name} for website hosting and deployment; ${legalIdentity.hostingProviders[1].name} for domain registration and DNS; ${legalIdentity.hostingProviders[2].name} for source code management and CI/CD workflows; ${legalIdentity.databaseProvider} for database and backend services where applicable.`,
      'Each provider operates under its own terms of service and privacy policy. Fiindt does not control the infrastructure policies of these providers.',
    ],
  },
  {
    id: 'editorial-responsibility',
    title: 'Editorial responsibility',
    paragraphs: [
      'Fiindt produces and publishes original informational content organized into verticals, sub-niches, categories and articles. The platform does not aggregate or reproduce third-party news. Content is created for general informational purposes and should not be treated as professional advice.',
    ],
    subsections: [
      sub('editorial-responsibility', 'Responsible editor', ['The person editorially responsible for Fiindt content will be formally identified before public launch, in line with applicable press and media regulations.']),
      sub('editorial-responsibility', 'Limits of published information', ['Content on Fiindt is general and informational. It does not constitute professional, legal, financial, medical or technical advice. Readers should consult qualified professionals before making decisions based on content found on this platform.']),
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    subsections: [
      sub('intellectual-property', 'Fiindt content', [
        'All editorial content, design elements, visual identity, structural organization and code on Fiindt are the property of Fiindt, unless otherwise stated. Reproduction, republication or commercial reuse requires prior written authorization.',
        'Short quotations with clear attribution are permitted. Sharing links is encouraged.',
      ]),
      sub('intellectual-property', 'Third-party trademarks', [
        'Product names, company names and logos mentioned on Fiindt belong to their respective owners. References are editorial and do not imply affiliation or endorsement.',
      ]),
    ],
  },
  {
    id: 'liability',
    title: 'Liability',
    paragraphs: [
      'Fiindt makes reasonable efforts to ensure accuracy and keep content up to date, but provides no guarantee regarding the completeness, correctness or timeliness of published information. Content may be updated or removed without notice.',
      'Fiindt is not responsible for the content of external websites it links to. Links are editorial references and do not imply endorsement. The platform accepts no liability for technical interruptions, data loss or decisions made on the basis of content published here.',
    ],
  },
  {
    id: 'contact-and-reporting',
    title: 'Contact and reporting',
    paragraphs: [
      'For legal requests, copyright reports, privacy matters or editorial concerns, please use the contact information published on this site. Requests are reviewed and handled within the timeframes required by applicable law.',
    ],
  },
  {
    id: 'applicable-law',
    title: 'Applicable law',
    paragraphs: [
      `This legal notice is governed by the laws of ${legalIdentity.country}. Disputes arising from the use of Fiindt are subject to the jurisdiction of the competent courts in ${legalIdentity.country}. This notice is updated as the platform evolves.`,
    ],
  },
]

// ─── Privacy Policy ───────────────────────────────────────────────────────────

const privacySections: LegalSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    paragraphs: [
      'This Privacy Policy explains how Fiindt may collect, use, store and protect personal data. It applies to the Fiindt website, its public pages and any contact or newsletter flows currently available or planned.',
      'Fiindt is in active development. Some features — including user accounts, comments and payment flows — are not yet live. This policy covers both current processing and areas that will become active as the platform grows.',
    ],
  },
  {
    id: 'data-we-may-collect',
    title: 'Data we may collect',
    subsections: [
      sub('data-collect', 'Data you provide directly', ['When you contact Fiindt or subscribe to the newsletter, you may provide your name and email address. This information is used only for the purpose for which it was given.']),
      sub('data-collect', 'Data collected automatically', ['Fiindt may collect standard technical data when you visit the site: IP address, browser type, device type, referring page and pages visited. This data is used for security and audience measurement and is not linked to your identity.']),
      sub('data-collect', 'Future data', ['When accounts, payment processing, comments and course features are introduced, additional data will be collected. This policy will be updated before each feature launches.']),
    ],
  },
  {
    id: 'why-we-use-data',
    title: 'Why we use data',
    paragraphs: ['Fiindt uses personal data collected from users for the following purposes:'],
    items: [
      'Operating and delivering the website and its content',
      'Responding to messages and contact requests',
      'Sending newsletters to subscribers who have opted in',
      'Measuring audience and improving content quality',
      'Detecting and preventing security issues and abuse',
      'Meeting legal obligations where applicable',
    ],
  },
  {
    id: 'legal-bases',
    title: 'Legal bases',
    paragraphs: [
      'Fiindt processes personal data only when a valid legal basis applies under the GDPR. The main bases are: consent (for newsletters and optional analytics); legitimate interest (for site security and basic audience measurement); and legal obligation (for requests from authorities or courts).',
      'Where consent is the legal basis, you may withdraw it at any time without affecting the lawfulness of prior processing. To withdraw consent, use the unsubscribe link in any newsletter or contact Fiindt directly.',
    ],
  },
  {
    id: 'services-and-providers',
    title: 'Services and providers',
    paragraphs: [
      `Fiindt relies on third-party services to operate: ${legalIdentity.hostingProviders[0].name} for hosting and deployment; ${legalIdentity.hostingProviders[1].name} for domain services; ${legalIdentity.analyticsProviders[0].name} for audience analytics (configured with valid consent rules before activation); ${legalIdentity.cmsName} and ${legalIdentity.databaseProvider} for content management and backend services.`,
      `Fiindt may also use AI tools — including ${legalIdentity.aiTools.slice(0, 3).join(', ')} — for internal editorial and technical assistance. AI tools are not used to process user personal data without appropriate safeguards.`,
    ],
  },
  {
    id: 'cookies-and-similar-technologies',
    title: 'Cookies and similar technologies',
    paragraphs: [
      'Fiindt uses strictly necessary technologies to deliver the site. Analytics and preference cookies are only activated with prior consent via the site\'s consent interface. Marketing or tracking technologies may be introduced in the future and will always require opt-in consent.',
    ],
    subsections: [
      sub('cookies', 'Managing consent', ['You can accept, reject or customize cookie choices through the consent interface. Choices can be changed at any time. Strictly necessary technologies cannot be disabled as they are required for the site to function.']),
    ],
  },
  {
    id: 'international-transfers',
    title: 'International transfers',
    paragraphs: [
      'Some of the service providers used by Fiindt are based outside the European Economic Area. Where transfers occur, Fiindt relies on providers that offer appropriate safeguards, such as Standard Contractual Clauses approved by the European Commission or equivalent mechanisms.',
    ],
  },
  {
    id: 'retention-periods',
    title: 'Retention periods',
    paragraphs: [
      'Contact requests are retained only as long as needed to respond. Newsletter subscription data is kept until you unsubscribe. Analytics data is retained in line with the configuration of the analytics provider. Legal requests and related correspondence may be kept for up to ten years where required by law.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      `Fiindt implements technical and organizational measures to protect personal data against unauthorized access, loss or disclosure. These include HTTPS encryption, access controls and provider-level security offered by ${legalIdentity.hostingProviders[0].name}, ${legalIdentity.hostingProviders[2].name} and ${legalIdentity.databaseProvider}.`,
      'No online system is completely secure. In the event of a data breach affecting your rights, Fiindt will notify the relevant supervisory authority and, where required, the individuals concerned.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    paragraphs: [
      'Under the GDPR, you have the right to access, correct, erase or restrict the personal data Fiindt holds about you. You may also object to processing based on legitimate interest and request a copy of your data in a portable format. If you believe Fiindt has mishandled your data, you may lodge a complaint with the relevant supervisory authority in your country.',
    ],
  },
  {
    id: 'exercise-rights',
    title: 'How to exercise your rights',
    paragraphs: [
      'To exercise any of your rights, contact Fiindt using the details published on this site. Identity may need to be verified before a request is processed. Fiindt aims to respond within 30 days. Requests that are manifestly unfounded or excessive may be subject to a reasonable fee or declined with a reasoned explanation.',
    ],
  },
  {
    id: 'policy-updates',
    title: 'Updates to this policy',
    paragraphs: [
      'This policy is updated when Fiindt\'s tools, features or processing activities change. The date of the most recent update is noted at the top of this page. Continued use of Fiindt after a policy update constitutes acceptance of the new version.',
    ],
  },
]

// ─── Cookie Policy ────────────────────────────────────────────────────────────

const cookieSections: LegalSection[] = [
  {
    id: 'what-cookies-are',
    title: 'What cookies are',
    paragraphs: [
      'Cookies are small text files placed on your device when you visit a website. They allow the site to remember information about your visit — such as your preferences or session state. Similar technologies, such as local storage and pixel trackers, serve comparable purposes.',
      'Cookies set by Fiindt are first-party cookies. Cookies set by third-party services embedded on the site are third-party cookies and are subject to those providers\' own policies.',
    ],
  },
  {
    id: 'why-cookies',
    title: 'Why Fiindt uses cookies',
    paragraphs: [
      'Fiindt uses cookies and similar technologies to deliver the site securely, remember your consent choices, measure how the site is used and, in future, to enable personalization and affiliate tracking where applicable. Only strictly necessary technologies are active without consent.',
    ],
  },
  {
    id: 'cookie-categories',
    title: 'Cookie categories',
    subsections: [
      sub('cookie-categories', 'Strictly necessary', ['These technologies are required for the site to function. They enable page delivery, security mechanisms and consent management. They cannot be disabled.']),
      sub('cookie-categories', 'Analytics', [`Analytics cookies help Fiindt understand which content is useful and how visitors navigate the site. These are only active with your consent. Fiindt uses ${legalIdentity.analyticsProviders[0].name}, configured to respect applicable privacy requirements.`]),
      sub('cookie-categories', 'Marketing and personalization', ['Marketing and personalization cookies may be introduced in the future for affiliate tracking or personalized content. They will only be activated with explicit opt-in consent.']),
    ],
  },
  {
    id: 'cookie-list',
    title: 'Cookie list',
    paragraphs: [
      'The full production cookie inventory will be published once analytics, consent management and third-party tools are finalized in the live environment. No placeholder cookie names or fictional entries are shown here.',
    ],
  },
  {
    id: 'consent-management',
    title: 'Consent management',
    paragraphs: [
      'When you first visit Fiindt, a consent interface allows you to accept, reject or customize non-essential cookies. Your choices are saved and respected across your visit. You can change your choices at any time through the privacy preferences page.',
    ],
  },
  {
    id: 'browser-controls',
    title: 'Browser controls',
    paragraphs: [
      'Most browsers allow you to view, block or delete cookies through their settings. Blocking all cookies may affect how Fiindt and other sites function. Some third-party providers also offer their own opt-out mechanisms — refer to their privacy policies for details.',
    ],
  },
  {
    id: 'cookie-updates',
    title: 'Updates',
    paragraphs: [
      'This cookie policy is updated when new tools are introduced or existing ones change. Changes affecting non-essential cookies will be reflected in the consent interface.',
    ],
  },
]

// ─── Terms of Use ─────────────────────────────────────────────────────────────

const termsSections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance',
    paragraphs: [
      'By accessing or using Fiindt, you agree to these Terms of Use. If you do not agree, please do not use the platform. Fiindt reserves the right to update these terms; continued use after a change constitutes acceptance.',
    ],
  },
  {
    id: 'description',
    title: 'Description of Fiindt',
    paragraphs: [
      'Fiindt is a knowledge platform that produces and organizes original informational content across multiple domains. Content is structured into verticals, sub-niches, categories and articles, designed to help readers find clear and practical information. Fiindt does not provide professional advice of any kind.',
    ],
  },
  {
    id: 'user-obligations',
    title: 'User obligations',
    paragraphs: ['By using Fiindt, you agree to:'],
    items: [
      'Use the platform lawfully and in good faith',
      'Not attempt to disrupt, scrape excessively or compromise the platform\'s infrastructure',
      'Not reproduce, republish or commercially redistribute Fiindt content without authorization',
      'Not misuse contact or reporting features',
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts',
    paragraphs: [
      'User accounts are not yet available. When accounts are introduced, separate terms governing registration, security, suspension and deletion will be published. Creating an account will constitute acceptance of those additional terms.',
    ],
  },
  {
    id: 'content',
    title: 'Content',
    subsections: [
      sub('content', 'Editorial content', ['Fiindt publishes original editorial content for informational purposes. Content is reviewed by the editorial team and may be updated or removed at any time without notice.']),
      sub('content', 'No professional advice', ['Nothing on Fiindt constitutes professional advice — financial, legal, medical, technical or otherwise. Readers should consult qualified professionals before making decisions. Fiindt accepts no liability for consequences arising from reliance on its content.']),
    ],
  },
  {
    id: 'paid-services',
    title: 'Paid services',
    paragraphs: [
      'Paid features — including courses, subscriptions and learning resources — are not yet available. When introduced, dedicated terms will be published covering pricing, access, refunds and cancellation. Those terms will complement and take precedence over these general terms for paid services.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    subsections: [
      sub('terms-ip', 'Ownership', ['All content, design, code and structural elements on Fiindt are the property of Fiindt, unless otherwise stated. Third-party trademarks and product names remain the property of their respective owners.']),
      sub('terms-ip', 'Permitted and prohibited use', ['Reading, sharing links and brief quotation with attribution are permitted. Full reproduction, commercial reuse, mass scraping, dataset extraction and republishing without authorization are prohibited.']),
    ],
  },
  {
    id: 'liability',
    title: 'Liability',
    paragraphs: [
      'Fiindt provides its content and services on an "as is" basis. No warranty is given as to the accuracy, completeness or availability of the platform. Fiindt is not liable for direct, indirect or consequential damages arising from the use of or inability to use the platform, including reliance on any content published here.',
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    paragraphs: [
      'Fiindt reserves the right to restrict or terminate access to the platform for any user who breaches these terms or engages in abusive, harmful or unlawful behavior. When user accounts are available, suspension and appeals processes will be detailed in the account terms.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    paragraphs: [
      `These terms are governed by the laws of ${legalIdentity.country}. Any disputes arising from the use of Fiindt shall be subject to the exclusive jurisdiction of the competent courts in ${legalIdentity.country}.`,
    ],
  },
]

// ─── Editorial Policy ─────────────────────────────────────────────────────────

const editorialSections: LegalSection[] = [
  {
    id: 'mission',
    title: 'Mission',
    paragraphs: [
      'Fiindt\'s mission is to produce the knowledge that doesn\'t exist yet — structured, original content across twelve knowledge domains, built to help readers understand topics rather than just skim headlines. Fiindt is not a news aggregator. Every piece of content is created with clarity, accuracy and practical utility in mind.',
    ],
  },
  {
    id: 'editorial-structure',
    title: 'Editorial structure',
    paragraphs: [
      'Content is organized into verticals (broad domains such as Tech, Finance or Health), sub-niches (specific areas within each vertical), categories (practical themes within a sub-niche) and articles (individual guides, explainers and resources). This structure allows Fiindt to cover a domain thoroughly without compromising depth.',
    ],
  },
  {
    id: 'creation-process',
    title: 'Content creation process',
    subsections: [
      sub('creation', 'Research and drafting', ['Each piece of content starts with research using reliable sources: official documentation, peer-reviewed studies, institutional reports and recognized expert commentary. Drafting aims for clarity, precision and practical value — avoiding filler, speculation or unverified claims.']),
      sub('creation', 'AI assistance and human review', [`Fiindt may use AI tools including ${legalIdentity.aiTools.slice(0, 3).join(', ')} for research assistance, structuring and drafting support. All AI-assisted content is reviewed and validated by a human editor before publication. AI is a production tool, not a substitute for editorial judgment.`]),
      sub('creation', 'Updates and corrections', ['Content is updated when information changes or errors are identified. Significant corrections are noted within the article. Readers can report errors through the content reporting process.']),
    ],
  },
  {
    id: 'sources',
    title: 'Sources',
    subsections: [
      sub('sources', 'Source standards', ['Fiindt prioritizes official sources, primary documentation, peer-reviewed research and established institutional reports. Commentary from recognized domain experts may be referenced for context. Sources are cited or linked where possible.']),
      sub('sources', 'Source limitations', ['No source is infallible. Where information is based on a single source, limited evidence or contested data, Fiindt indicates this clearly. Readers are encouraged to verify information independently before acting on it.']),
    ],
  },
  {
    id: 'sensitive-topics',
    title: 'Sensitive topics',
    paragraphs: [
      'Content touching on finance, health, law, cybersecurity, education or AI is treated with additional care. These topics carry real-world consequences and Fiindt applies stricter review standards, clearer disclaimers and more conservative claims in these areas. Content in these domains is explicitly informational and does not constitute professional advice.',
    ],
  },
  {
    id: 'corrections',
    title: 'Corrections',
    subsections: [
      sub('corrections', 'Reporting and review', ['Readers can report factual errors or outdated information through the content reporting flow. Reports are reviewed by the editorial team. Confirmed errors are corrected promptly.']),
      sub('corrections', 'Correction policy', ['Minor corrections are made inline without notation. Significant factual corrections are noted at the end of the article, with a brief description of what changed and when. Fiindt does not hide corrections.']),
    ],
  },
  {
    id: 'independence',
    title: 'Independence',
    subsections: [
      sub('independence', 'Editorial judgment', ['Fiindt\'s editorial decisions are made independently. Sponsored content, affiliate relationships and advertising arrangements do not influence the editorial agenda, topic selection or the conclusions reached in informational content.']),
      sub('independence', 'Sponsored and affiliate content', ['Where affiliate links or sponsored placements appear, they are clearly labeled. Fiindt\'s review standards and factual positions apply regardless of whether a topic involves a commercial relationship. Conflicts of interest are disclosed.']),
    ],
  },
]

// ─── Affiliate Disclosure ─────────────────────────────────────────────────────

const affiliateSections: LegalSection[] = [
  {
    id: 'purpose',
    title: 'Purpose of this disclosure',
    paragraphs: ['Fiindt may earn a commission when readers purchase a product or service through links on the platform. This disclosure explains how affiliate relationships work and how they are kept separate from editorial decisions.'],
  },
  {
    id: 'affiliate-links',
    title: 'Affiliate links',
    paragraphs: ['Affiliate links redirect you to a third-party site. If you make a purchase, Fiindt may receive a commission at no additional cost to you. Affiliate links are identified with a disclosure label where they appear.'],
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    paragraphs: ['Products and services are selected on the basis of editorial criteria: quality, relevance and value to the reader. The existence of an affiliate relationship does not determine whether a product is recommended or how it is reviewed. Fiindt may publish negative assessments of products even when an affiliate link exists.'],
  },
  {
    id: 'editorial-independence',
    title: 'Editorial independence',
    paragraphs: ['Affiliate commissions do not influence Fiindt\'s editorial positions, topic selection or factual conclusions. If a product or service does not meet the standards Fiindt would apply to any recommendation, it is not featured.'],
  },
  {
    id: 'user-responsibility',
    title: 'User responsibility',
    paragraphs: ['Before making any purchase, verify current pricing, availability and terms directly with the third-party provider. Prices and conditions may change after publication. Fiindt is not responsible for third-party sites, offers or after-sales service.'],
  },
]

// ─── Advertising Policy ───────────────────────────────────────────────────────

const advertisingSections: LegalSection[] = [
  {
    id: 'advertising-on-fiindt',
    title: 'Advertising on Fiindt',
    paragraphs: ['Fiindt may carry partner placements, sponsored articles and in-content advertising as the platform grows. All advertising is subject to the standards below. Fiindt does not accept intrusive formats — no pop-ups, auto-play audio or full-page takeovers.'],
  },
  {
    id: 'sponsored-content',
    title: 'Sponsored content',
    paragraphs: ['Sponsored articles and native placements are clearly labeled as such. Fiindt retains editorial review rights over all sponsored content and may decline or modify submissions that conflict with editorial standards or accuracy requirements.'],
  },
  {
    id: 'restricted-advertising',
    title: 'Restricted and prohibited advertising',
    paragraphs: ['Fiindt does not accept advertising for: misleading or fraudulent offers, products harmful to health or safety, illegal products or services, or categories prohibited by applicable law. Advertising targeting vulnerable audiences in an exploitative way is also refused.'],
  },
  {
    id: 'partner-inquiries',
    title: 'Partner inquiries',
    paragraphs: ['Partnership and advertising inquiries should be submitted through the contact details available on this site. Each inquiry is reviewed against Fiindt\'s editorial and advertising standards. Fiindt reserves the right to decline any partnership without explanation.'],
  },
]

// ─── AI Policy ────────────────────────────────────────────────────────────────

const aiSections: LegalSection[] = [
  {
    id: 'use-of-ai',
    title: 'Use of AI at Fiindt',
    paragraphs: [
      `Fiindt uses AI tools — including ${legalIdentity.aiTools.slice(0, 3).join(', ')} — as editorial and technical assistants. AI is used for research, content structuring, drafting support and translation assistance. It is a production tool, not an author.`,
    ],
  },
  {
    id: 'human-responsibility',
    title: 'Human responsibility',
    paragraphs: ['Every piece of content that appears on Fiindt has been reviewed and validated by a human editor. Fact-checking, judgment on sensitive topics and the final publication decision are human responsibilities. AI output that cannot be verified is not published.'],
  },
  {
    id: 'ai-limitations',
    title: 'AI limitations',
    paragraphs: ['AI tools can produce errors, outdated information, biased output and hallucinations — confident-sounding statements that are factually wrong. Fiindt\'s review process is designed to catch these failures before publication, but no review process is perfect. If you believe a factual error has been published, please report it.'],
  },
  {
    id: 'transparency',
    title: 'Transparency',
    paragraphs: ['Where AI has played a significant role in the drafting of an article, this is indicated at the article level. Fully human-reviewed content is the standard baseline. Automated systems introduced in future platform features will be disclosed separately.'],
  },
  {
    id: 'data-and-ai',
    title: 'Data and AI',
    paragraphs: ['Fiindt does not submit user personal data to AI tools without appropriate safeguards. AI tools used by Fiindt are third-party services subject to their own terms and privacy policies. Internal editorial workflows using AI are kept separate from user-facing data.'],
  },
]

// ─── Content Disclaimer ───────────────────────────────────────────────────────

const disclaimerSections: LegalSection[] = [
  {
    id: 'general-information',
    title: 'General information only',
    paragraphs: ['All content on Fiindt is published for general informational purposes. It is not a substitute for professional advice, diagnosis, legal counsel or financial guidance. Readers are solely responsible for how they use the information found here and are encouraged to consult qualified professionals for decisions with real-world consequences.'],
  },
  {
    id: 'topic-disclaimers',
    title: 'Topic-specific reminders',
    paragraphs: ['Finance content describes general concepts and does not constitute investment or tax advice. Health content is informational and does not replace medical consultation. Legal content explains general frameworks and is not legal advice. Cybersecurity content is educational and should not be applied without professional assessment. AI and software content describes tools at a point in time and may become outdated quickly.'],
  },
  {
    id: 'accuracy-updates',
    title: 'Accuracy and updates',
    paragraphs: ['Fiindt makes every effort to ensure accuracy at time of publication. However, information changes: product features evolve, laws are amended and research advances. The publication date of each article is shown; content may not reflect recent developments. If you find outdated or incorrect information, please report it.'],
  },
  {
    id: 'external-links',
    title: 'External links',
    paragraphs: ['Links to third-party sites are provided as editorial references. Fiindt does not control the content of linked sites and accepts no responsibility for their accuracy, availability or policies. A link does not imply endorsement.'],
  },
]

// ─── Copyright Policy ─────────────────────────────────────────────────────────

const copyrightSections: LegalSection[] = [
  {
    id: 'ownership',
    title: 'Ownership',
    paragraphs: ['All editorial content, visual design, logos, code and structural organization on Fiindt are the intellectual property of Fiindt, unless a specific element is credited to a third party. This includes article text, headings, category structures, illustrations and interface design.'],
  },
  {
    id: 'permitted-use',
    title: 'Permitted use',
    paragraphs: ['You may read, share links to and briefly quote Fiindt content, provided that Fiindt is clearly attributed and the quotation is not misleading. Personal, non-commercial educational use of excerpts is permitted within these bounds.'],
  },
  {
    id: 'prohibited-use',
    title: 'Prohibited use',
    items: [
      'Reproducing full articles or substantial portions without written authorization',
      'Republishing Fiindt content on other websites or platforms',
      'Commercial reuse or adaptation of Fiindt content',
      'Mass scraping for training datasets, AI systems or content databases',
      'Removing or altering copyright notices',
    ],
  },
  {
    id: 'third-party-rights',
    title: 'Third-party rights',
    paragraphs: ['Product names, brand names, trademarks and logos mentioned or referenced on Fiindt remain the property of their respective owners. Screenshots, embedded third-party content and cited material are used for editorial purposes under applicable copyright exceptions or with permission.'],
  },
  {
    id: 'complaints',
    title: 'Copyright complaints',
    paragraphs: ['If you believe Fiindt has published content that infringes your copyright, please contact us with: the URL of the content in question, a description of your original work, confirmation that you are the rights holder or authorized representative, and your contact details. Valid notices are reviewed promptly. Fiindt will remove or correct infringing content where a complaint is substantiated.'],
  },
]

// ─── Content Reporting ────────────────────────────────────────────────────────

const reportingSections: LegalSection[] = [
  {
    id: 'what-can-be-reported',
    title: 'What can be reported',
    items: [
      'Illegal content under applicable law',
      'Copyright infringement',
      'Privacy violations or unauthorized personal data',
      'Dangerous, harmful or seriously misleading information',
      'Factual errors in editorial content',
      'Spam, abuse or off-policy use',
    ],
  },
  {
    id: 'how-to-report',
    title: 'How to report',
    paragraphs: ['To submit a report, provide: the URL of the content concerned, a clear description of the issue, any supporting evidence or references, and your contact details. Reports without sufficient detail may not be actionable.'],
  },
  {
    id: 'review-process',
    title: 'Review process',
    paragraphs: ['All reports are acknowledged and reviewed by the editorial or legal team. Fiindt assesses each report against its editorial standards and legal obligations. Action may include correction, removal, clarification or a reasoned explanation of why no change was made. The submitter will be informed of the outcome where possible.'],
  },
  {
    id: 'abuse-reporting',
    title: 'Abuse of reporting',
    paragraphs: ['The reporting system exists to protect legitimate interests. Repeated unfounded complaints, false claims or reports submitted to harass or censor valid editorial content may result in restriction of future reporting access.'],
  },
]

// ─── Community Guidelines ─────────────────────────────────────────────────────

const communitySections: LegalSection[] = [
  {
    id: 'purpose',
    title: 'Purpose',
    paragraphs: ['Fiindt\'s community features — including comments and user contributions — are not yet active. These guidelines establish the standards that users will be expected to follow when community spaces launch.'],
  },
  {
    id: 'allowed-behavior',
    title: 'Allowed behavior',
    items: [
      'Helpful, constructive contributions to the topic at hand',
      'Respectful disagreement backed by reasoning or sources',
      'Questions, clarifications and genuine feedback',
      'Sharing relevant external resources with attribution',
    ],
  },
  {
    id: 'prohibited-behavior',
    title: 'Prohibited behavior',
    items: [
      'Harassment, threats or intimidation of any kind',
      'Hate speech or content targeting groups based on protected characteristics',
      'Spam, self-promotion or off-topic posting',
      'Publishing illegal content or personal data without consent',
      'Sharing dangerous instructions or content that could cause real-world harm',
    ],
  },
  {
    id: 'moderation',
    title: 'Moderation',
    paragraphs: ['Fiindt reserves the right to review, remove or restrict any community contribution that violates these guidelines. Accounts that repeatedly breach the rules may be suspended. An appeals process will be detailed when community features launch.'],
  },
]

// ─── Course and Paid Content Terms ───────────────────────────────────────────

const coursesSections: LegalSection[] = [
  {
    id: 'future-paid-features',
    title: 'Future paid features',
    paragraphs: ['Courses, learning resources, subscriptions and instructor accounts are planned for a future version of Fiindt. These terms provide a framework for what those features will involve. Specific pricing, refund rules and access conditions will be detailed when each feature launches.'],
  },
  {
    id: 'account-requirements',
    title: 'Account requirements',
    paragraphs: ['Access to paid content will require a registered Fiindt account. Users are responsible for maintaining account security. Instructor accounts will be subject to additional eligibility and quality requirements defined at the time of launch.'],
  },
  {
    id: 'payments',
    title: 'Payments',
    paragraphs: ['Payments will be processed through a third-party payment provider. Prices will be displayed in the applicable currency before purchase. Applicable taxes will be added where required by law. Payment provider terms apply in addition to Fiindt\'s course terms.'],
  },
  {
    id: 'access-content',
    title: 'Access to content',
    paragraphs: ['Purchased courses and learning content are delivered digitally through the Fiindt platform. Access is personal and non-transferable. Fiindt reserves the right to update or remove content for quality or legal reasons, with reasonable notice where possible.'],
  },
  {
    id: 'refunds',
    title: 'Refunds and cancellation',
    paragraphs: ['Refund conditions will be published before any paid feature launches. Consumer rights under applicable law — including statutory cooling-off periods — will be respected. Subscription cancellation will take effect at the end of the current billing period.'],
  },
]

// ─── Privacy Preferences ──────────────────────────────────────────────────────

const preferencesSections: LegalSection[] = [
  {
    id: 'manage-consent',
    title: 'Manage your consent',
    paragraphs: ['This page will allow you to review and update your consent choices for non-essential cookies and technologies. The consent management system is not yet connected to this page. When it is live, choices made here will take effect immediately.'],
  },
  {
    id: 'data-requests',
    title: 'Data requests',
    paragraphs: ['To access, correct or delete personal data Fiindt holds about you, or to unsubscribe from the newsletter, contact Fiindt through the details published on this site. All data requests are handled in line with the Privacy Policy.'],
  },
]

// ─── Accessibility Statement ──────────────────────────────────────────────────

const accessibilitySections: LegalSection[] = [
  {
    id: 'commitment',
    title: 'Commitment',
    paragraphs: ['Fiindt is committed to making its knowledge platform accessible to the widest possible audience, regardless of ability or technology. The platform is built with semantic HTML, responsive design and readable typography as a baseline.'],
  },
  {
    id: 'current-measures',
    title: 'Current accessibility measures',
    items: [
      'Semantic HTML structure and landmark regions',
      'Keyboard-navigable interface elements',
      'Colour contrast ratios that meet WCAG AA standards',
      'Responsive layout for all screen sizes',
      'Alternative text on visual elements where applicable',
    ],
  },
  {
    id: 'known-limitations',
    title: 'Known limitations',
    paragraphs: ['Third-party embedded content, AI-generated text and some future interactive features may not fully meet accessibility standards at launch. These areas are tracked for improvement in subsequent development iterations.'],
  },
  {
    id: 'feedback',
    title: 'Feedback',
    paragraphs: ['If you encounter an accessibility barrier on Fiindt, please report it through the contact details published on this site. Include the URL of the page affected and a description of the issue. Fiindt will review all accessibility reports and respond where possible.'],
  },
]

// ─── Export ───────────────────────────────────────────────────────────────────

export const legalPages: LegalPageRecord[] = [
  page('/legal-notice', 'LEGAL', 'Legal Notice', 'Publisher details, hosting information, editorial responsibility and applicable law.', legalNoticeSections),
  page('/privacy-policy', 'PRIVACY', 'Privacy Policy', 'How Fiindt may collect, use, store and protect personal data.', privacySections, { href: '/cookie-policy', label: 'View cookie policy' }),
  page('/cookie-policy', 'COOKIES', 'Cookie Policy', 'How Fiindt handles cookies, consent, analytics and similar technologies.', cookieSections, { href: '/privacy-policy', label: 'View privacy policy' }),
  page('/terms', 'TERMS', 'Terms of Use', 'Terms governing access to and use of Fiindt.', termsSections),
  page('/editorial-policy', 'EDITORIAL', 'Editorial Policy', 'How Fiindt creates, reviews, updates and labels editorial content.', editorialSections),
  page('/affiliate-disclosure', 'AFFILIATE', 'Affiliate Disclosure', 'How Fiindt may use affiliate links and commercial recommendations.', affiliateSections),
  page('/advertising', 'ADVERTISING', 'Advertising Policy', 'Rules for advertising, sponsored content, native placements and partnerships.', advertisingSections),
  page('/ai-policy', 'AI', 'AI Policy', 'How Fiindt uses AI tools while keeping human editorial responsibility.', aiSections),
  page('/content-disclaimer', 'DISCLAIMER', 'Content Disclaimer', 'Limits of Fiindt content and reminders for sensitive topics.', disclaimerSections),
  page('/copyright', 'COPYRIGHT', 'Copyright Policy', 'Ownership, permitted use, prohibited use and copyright complaint process.', copyrightSections),
  page('/content-reporting', 'REPORTING', 'Content Reporting', 'How users can report content concerns, errors or rights issues.', reportingSections),
  page('/community-guidelines', 'COMMUNITY', 'Community Guidelines', 'Standards for future comments, accounts and community features.', communitySections),
  page('/courses-terms', 'COURSES', 'Course and Paid Content Terms', 'Future terms for courses, paid content and subscriptions.', coursesSections),
  page('/privacy-preferences', 'PRIVACY', 'Privacy Preferences', 'Manage consent choices and data requests.', preferencesSections),
  page('/accessibility', 'ACCESSIBILITY', 'Accessibility Statement', 'Fiindt\'s accessibility commitment, current measures and feedback process.', accessibilitySections),
]
