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
  subsections: LegalSubsection[]
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

const genericLastUpdated = "Version under preparation for public launch"

function id(base: string, label: string) {
  return `${base}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`
}

function subsection(base: string, title: string, paragraphs?: string[], items?: string[]): LegalSubsection {
  return { id: id(base, title), title, paragraphs, items }
}

function section(base: string, title: string, titles: string[], intro?: string): LegalSection {
  return {
    id: id(base, title),
    title,
    intro,
    subsections: titles.map((item) =>
      subsection(base, item, [
        `${item} is handled according to Fiindt's current platform status, editorial purpose and applicable legal obligations.`,
      ]),
    ),
  }
}

function futureNote(feature: string) {
  return `${feature} is planned or may be introduced later. Fiindt should update this page before the feature becomes available.`
}

function contactCopy(kind: "legal" | "privacy" | "editorial" | "reporting" | "support" | "accessibility") {
  const known = kind === "privacy" ? legalIdentity.privacyEmail : legalIdentity.legalEmail
  if (known) return [`Requests can be sent to ${known}.`]
  return [
    "Dedicated contact details will be completed before public launch.",
    "Missing contact information is tracked internally and must not be displayed as placeholder text on public pages.",
  ]
}

function page(
  route: string,
  eyebrow: string,
  title: string,
  subtitle: string,
  sections: LegalSection[],
  relatedLink?: { href: string; label: string },
): LegalPageRecord {
  return {
    route,
    eyebrow,
    title,
    subtitle,
    seoTitle: title,
    seoDescription: subtitle,
    lastUpdatedLabel: genericLastUpdated,
    sections,
    relatedLink,
  }
}

const legalNoticeSections: LegalSection[] = [
  {
    id: "site-publisher",
    title: "Site publisher",
    intro: "This section identifies the public-facing site and explains which legal identity details still need to be completed internally.",
    subsections: [
      subsection("site-publisher", "Site name", [`Site name: ${legalIdentity.siteName}.`]),
      subsection("site-publisher", "Commercial name", [`Commercial name: ${legalIdentity.tradeName}.`]),
      subsection("site-publisher", "Operator status", ["Fiindt is currently presented as a knowledge platform under development. The exact legal operator status must be completed before public launch."]),
      subsection("site-publisher", "Country of operation", [`Country of operation: ${legalIdentity.country}.`]),
      subsection("site-publisher", "Legal operator details", ["Legal operator name and postal address will be completed before public launch."]),
      subsection("site-publisher", "Legal contact", contactCopy("legal")),
    ],
  },
  {
    id: "hosting-and-technical-providers",
    title: "Hosting and technical providers",
    subsections: [
      subsection("hosting", "Website hosting", [`${legalIdentity.hostingProviders[0].name} is used for website hosting and deployment workflows.`]),
      subsection("hosting", "Domain services", [`${legalIdentity.hostingProviders[1].name} is used for domain registrar and domain services.`]),
      subsection("hosting", "Source code and deployment", [`${legalIdentity.hostingProviders[2].name} is used for source code hosting or deployment workflows.`]),
      subsection("hosting", "Database and backend services", [`${legalIdentity.databaseProvider} supports backend or database functions where used.`]),
    ],
  },
  section("editorial-responsibility", "Editorial responsibility", ["Nature of Fiindt", "Editorial content", "Responsible person", "Limits of published information"]),
  section("intellectual-property", "Intellectual property", ["Texts and editorial content", "Visual identity", "Code and technical elements", "Third-party trademarks"]),
  section("liability", "Liability", ["Content accuracy", "External links", "Availability of the site", "User decisions"]),
  {
    id: "contact-and-reporting",
    title: "Contact and reporting",
    subsections: [
      subsection("contact-reporting", "Legal requests", contactCopy("legal")),
      subsection("contact-reporting", "Privacy requests", contactCopy("privacy")),
      subsection("contact-reporting", "Content reports", contactCopy("reporting")),
      subsection("contact-reporting", "Copyright reports", contactCopy("legal")),
    ],
  },
  section("applicable-law", "Applicable law", ["Country of operation", "Version and updates"]),
]

const privacySections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    subsections: [
      subsection("privacy-intro", "Purpose of this policy", ["This Privacy Policy explains how Fiindt may collect, use and protect personal data."]),
      subsection("privacy-intro", "Scope", ["It applies to the Fiindt website, public pages, contact flows, newsletter flows and future platform features."]),
      subsection("privacy-intro", "Controller information", ["Controller information will be completed before public launch."]),
      subsection("privacy-intro", "Current development status", ["Some features are planned and not yet active. This policy describes current and expected processing areas without pretending future features are live."]),
    ],
  },
  section("data-we-may-collect", "Data we may collect", [
    "Data provided directly",
    "Technical data",
    "Newsletter data",
    "Contact form data",
    "Account data planned for future features",
    "Comments and community data planned for future features",
    "Course and payment data planned for future features",
  ]),
  section("why-we-use-data", "Why we use data", ["Operating the website", "Responding to messages", "Sending newsletters", "Improving content", "Measuring audience", "Security and abuse prevention", "Legal compliance"]),
  section("legal-bases", "Legal bases", ["Consent", "Contract or pre-contractual steps", "Legal obligation", "Legitimate interest", "Withdrawal of consent"]),
  {
    id: "services-and-providers",
    title: "Services and providers",
    subsections: [
      subsection("providers", "Hosting and deployment", [`${legalIdentity.hostingProviders[0].name} is used for hosting and deployment.`]),
      subsection("providers", "Domain services", [`${legalIdentity.hostingProviders[1].name} is used for domain services.`]),
      subsection("providers", "Analytics", [`${legalIdentity.analyticsProviders[0].name} is planned and must be configured with valid consent rules before use.`]),
      subsection("providers", "Newsletter tools", ["Newsletter provider details must be confirmed before newsletter processing is activated."]),
      subsection("providers", "CMS and database", [`${legalIdentity.cmsName} and ${legalIdentity.databaseProvider} support content and backend workflows where used.`]),
      subsection("providers", "AI tools", [`Fiindt may use AI tools including ${legalIdentity.aiTools.join(", ")} for internal editorial or technical assistance.`]),
      subsection("providers", "Payment providers, once enabled", [futureNote("Payment processing")]),
    ],
  },
  section("cookies-and-similar-technologies", "Cookies and similar technologies", ["Strictly necessary technologies", "Analytics technologies", "Marketing technologies", "Embedded third-party content", "Managing consent"]),
  section("international-transfers", "International transfers", ["Providers outside the EU/EEA", "Safeguards", "User awareness"]),
  section("retention-periods", "Retention periods", ["Contact requests", "Newsletter records", "Analytics data", "Account data", "Payment and course data", "Legal requests"]),
  section("security", "Security", ["Technical measures", "Organizational measures", "Limitations of online security"]),
  section("your-rights", "Your rights", ["Access", "Rectification", "Erasure", "Restriction", "Objection", "Portability", "Withdrawal of consent", "Complaint with a supervisory authority"]),
  section("exercise-rights", "How to exercise your rights", ["Contact method", "Identity verification", "Response time", "Excessive or unfounded requests"]),
  section("policy-updates", "Updates to this policy", ["Changes to tools", "Changes to features", "Last updated date"]),
]

const cookieSections: LegalSection[] = [
  section("what-cookies-are", "What cookies are", ["Cookies", "Similar technologies", "First-party and third-party technologies"]),
  section("why-cookies", "Why Fiindt uses cookies", ["Site functionality", "Security", "Preferences", "Analytics", "Marketing or affiliate tracking, if enabled"]),
  section("cookie-categories", "Cookie categories", ["Strictly necessary", "Analytics", "Personalization", "Marketing", "Embedded third-party content"]),
  {
    id: "cookie-list",
    title: "Cookie list",
    intro: "Fiindt must not display fake cookie names or placeholder cookie rows.",
    subsections: [
      subsection("cookie-list", "Current status", ["The production cookie inventory will be finalized when analytics, newsletter, consent management and embedded third-party tools are configured."]),
      subsection("cookie-list", "Production cookie inventory", ["No public cookie table is shown until real production cookies are known."]),
      subsection("cookie-list", "Cookie table", ["The table component remains available for future verified cookie entries."]),
    ],
  },
  section("consent-management", "Consent management", ["Accept", "Reject", "Customize", "Withdraw or change choices"]),
  section("browser-controls", "Browser controls", ["Browser settings", "Limitations", "Third-party opt-outs"]),
  section("cookie-updates", "Updates", ["Tool changes", "Policy changes"]),
]

const termsSections = [
  section("acceptance", "Acceptance", ["Use of the site", "Changes to the terms"]),
  section("description", "Description of Fiindt", ["Knowledge platform", "Vertical, sub-niche, category and article structure", "Informational content"]),
  section("user-obligations", "User obligations", ["Lawful use", "Respect for security", "No abusive scraping", "No misuse of content"]),
  section("accounts", "Accounts, future features", ["Account creation", "Account security", "Suspension", "Deletion"], futureNote("Accounts")),
  section("content", "Content", ["Editorial content", "No professional advice", "Updates and corrections", "User responsibility"]),
  section("paid-services", "Paid services, future courses", ["Courses", "Subscriptions", "Payments", "Refunds to be defined in dedicated terms"], futureNote("Paid services")),
  section("ip", "Intellectual property", ["Fiindt content", "Third-party content", "Permitted use", "Prohibited use"]),
  section("liability", "Liability", ["Availability", "Errors", "External links", "User decisions"]),
  section("termination", "Termination", ["User access", "Platform restrictions", "Abuse"]),
  section("governing-law", "Governing law", ["Applicable law", "Disputes"]),
]

const editorialSections = [
  section("mission", "Mission", ["Knowledge organization", "Practical explanations", "Multilingual ambition", "Audience"]),
  section("editorial-structure", "Editorial structure", ["Verticals", "Sub-niches", "Categories", "Articles"]),
  section("creation-process", "Content creation process", ["Research", "Drafting", "AI assistance", "Human review", "Updates"]),
  section("sources", "Sources", ["Official sources", "Documentation", "Studies and reports", "Expert sources", "Source limitations"]),
  section("sensitive-topics", "Sensitive topics", ["Finance", "Health", "Law", "Sexuality", "Cybersecurity", "Education", "AI"]),
  section("corrections", "Corrections", ["Reporting errors", "Review process", "Correction process", "Major updates"]),
  section("independence", "Independence", ["Editorial judgment", "Sponsored content", "Affiliate links", "Conflicts of interest"]),
]

const affiliateSections = [
  section("purpose", "Purpose", ["Transparency", "How affiliate links work"]),
  section("affiliate-links", "Affiliate links", ["Definition", "Possible commission", "No additional cost to users", "Identification of affiliate links"]),
  section("recommendations", "Recommendations", ["Selection criteria", "Comparisons", "Limitations", "Updates"]),
  section("editorial-independence", "Editorial independence", ["Sponsored influence", "Review standards", "User trust"]),
  section("user-responsibility", "User responsibility", ["Check official information", "Prices and availability", "Terms from third-party providers"]),
]

const advertisingSections = [
  section("advertising-on-fiindt", "Advertising on Fiindt", ["Partner placements", "Sponsored articles", "In-content advertising", "No intrusive advertising principle"]),
  section("sponsored-content", "Sponsored content", ["Identification", "Editorial separation", "Review rights"]),
  section("restricted-advertising", "Prohibited or restricted advertising", ["Misleading offers", "Unsafe products", "Sensitive categories", "Illegal content"]),
  section("partner-inquiries", "Partner inquiries", ["Contact", "Review process", "Rejection rights"]),
]

const aiSections = [
  section("use-of-ai", "Use of AI at Fiindt", ["Research assistance", "Structuring content", "Drafting support", "Translation support", "Technical assistance"]),
  section("human-responsibility", "Human responsibility", ["Editorial review", "Fact-checking", "Sensitive topics", "Final publication decision"]),
  section("ai-limitations", "AI limitations", ["Errors", "Outdated information", "Biases", "Hallucinations", "Context mistakes"]),
  section("transparency", "Transparency", ["AI-assisted content", "Fully human-reviewed content", "Automated systems in future features"]),
  section("data-and-ai", "Data and AI", ["Personal data minimization", "Third-party AI services", "User-submitted data", "Security precautions"]),
]

const disclaimerSections = [
  section("general-information", "General information only", ["No personalized advice", "User responsibility", "Need for professional advice"]),
  section("topic-disclaimers", "Topic-specific disclaimers", ["Finance", "Health", "Law", "Sexuality", "Cybersecurity", "Education", "AI and software"]),
  section("accuracy-updates", "Accuracy and updates", ["Publication date", "Updates", "Source changes", "Product and service changes"]),
  section("external-links", "External links", ["Third-party responsibility", "Changing content", "No endorsement by default"]),
]

const copyrightSections = [
  section("ownership", "Ownership", ["Fiindt content", "Design", "Logos", "Code", "Databases and structured content"]),
  section("permitted-use", "Permitted use", ["Reading", "Sharing links", "Short quotation", "Attribution"]),
  section("prohibited-use", "Prohibited use", ["Full copying", "Republishing", "Commercial reuse", "Mass scraping", "Dataset extraction"]),
  section("third-party-rights", "Third-party rights", ["Trademarks", "Images", "Screenshots", "Embedded content"]),
  section("complaints", "Copyright complaints", ["Required information", "Review process", "Removal or correction", "Abusive complaints"]),
]

const reportingSections = [
  section("what-can-be-reported", "What can be reported", ["Illegal content", "Copyright infringement", "Privacy concerns", "Dangerous or misleading content", "Editorial errors", "Spam or abuse"]),
  section("how-to-report", "How to report", ["URL", "Description", "Evidence", "Contact details"]),
  section("review-process", "Review process", ["Receipt", "Assessment", "Action", "Response"]),
  section("abuse-reporting", "Abuse of reporting", ["False claims", "Repeated abuse", "Consequences"]),
]

const communitySections = [
  section("purpose", "Purpose", ["Safe knowledge platform", "Respectful discussion", "Future community features"]),
  section("allowed-behavior", "Allowed behavior", ["Helpful contributions", "Respectful disagreement", "Source-based discussion", "Constructive feedback"]),
  section("prohibited-behavior", "Prohibited behavior", ["Harassment", "Hate or threats", "Spam", "Illegal content", "Privacy violations", "Dangerous instructions"]),
  section("moderation", "Moderation", ["Content review", "Removal", "Account restrictions", "Appeals, if enabled"]),
  section("future-comments", "Future comments and accounts", ["Account responsibility", "Public contributions", "Reporting abuse"]),
]

const coursesSections = [
  section("future-paid-features", "Future paid features", ["Courses", "Learning resources", "Subscriptions", "Teacher or instructor accounts"], futureNote("Course and paid content features")),
  section("account-requirements", "Account requirements", ["User accounts", "Instructor accounts", "Account security", "Access rights"]),
  section("payments", "Payments", ["Payment providers", "Prices", "Taxes", "Failed payments"]),
  section("access-content", "Access to content", ["Course access", "Digital delivery", "Access limitations", "Platform changes"]),
  section("refunds", "Refunds and cancellation", ["Refund rules to be finalized", "Consumer rights", "Subscription cancellation"]),
  section("instructor-content", "Instructor content", ["Ownership", "Quality standards", "Removal rights", "Revenue rules to be defined"]),
]

const preferencesSections = [
  section("manage-consent", "Manage consent", ["Necessary technologies", "Analytics", "Personalization", "Marketing", "Third-party embeds"]),
  section("current-status", "Current status", ["Informational page", "Consent system to be connected", "No fake buttons"], "This page is informational until a real consent system is connected."),
  section("data-requests", "Data requests", ["Access", "Correction", "Deletion", "Newsletter unsubscribe", "Privacy contact"]),
]

const accessibilitySections = [
  section("commitment", "Commitment", ["Accessible knowledge", "Responsive design", "Readability"]),
  section("current-measures", "Current accessibility measures", ["Semantic HTML", "Keyboard navigation", "Color contrast", "Responsive layout", "Alternative text"]),
  section("known-limitations", "Known limitations", ["Third-party embeds", "Generated content", "Future features"]),
  section("feedback", "Feedback", ["Reporting accessibility issues", "Information to include", "Response process"]),
  section("updates", "Updates", ["Ongoing improvements", "Last review"]),
]

export const legalPages: LegalPageRecord[] = [
  page("/legal-notice", "LEGAL", "Legal Notice", "Legal information, publisher details, hosting information, editorial responsibility and contact routes for Fiindt.", legalNoticeSections),
  page("/privacy-policy", "PRIVACY", "Privacy Policy", "How Fiindt may collect, use, store and protect personal data.", privacySections, { href: "/cookie-policy", label: "View cookie policy" }),
  page("/cookie-policy", "COOKIES", "Cookie Policy", "How Fiindt handles cookies, consent, analytics and similar technologies.", cookieSections, { href: "/privacy-policy", label: "View privacy policy" }),
  page("/terms", "TERMS", "Terms of Use", "Terms governing access to and use of Fiindt.", termsSections),
  page("/editorial-policy", "EDITORIAL", "Editorial Policy", "How Fiindt creates, reviews, updates and labels editorial content.", editorialSections),
  page("/affiliate-disclosure", "AFFILIATE", "Affiliate Disclosure", "How Fiindt may use affiliate links and commercial recommendations.", affiliateSections),
  page("/advertising", "ADVERTISING", "Advertising Policy", "Rules for advertising, sponsored content, native placements and partnerships.", advertisingSections),
  page("/ai-policy", "AI", "AI Policy", "How Fiindt may use AI tools while keeping human editorial responsibility.", aiSections),
  page("/content-disclaimer", "DISCLAIMER", "Content Disclaimer", "Limits of Fiindt content and reminders for sensitive topics.", disclaimerSections),
  page("/copyright", "COPYRIGHT", "Copyright Policy", "Ownership, permitted use, prohibited use and copyright complaint process.", copyrightSections),
  page("/content-reporting", "REPORTING", "Content Reporting", "How users can report content concerns, errors or rights issues.", reportingSections),
  page("/community-guidelines", "COMMUNITY", "Community Guidelines", "Rules for future comments, accounts and community features.", communitySections),
  page("/courses-terms", "COURSES", "Course and Paid Content Terms", "Future-facing terms for courses, paid content and subscriptions.", coursesSections),
  page("/privacy-preferences", "PRIVACY", "Privacy Preferences", "Information about consent choices and future privacy preference controls.", preferencesSections),
  page("/accessibility", "ACCESSIBILITY", "Accessibility Statement", "Fiindt's accessibility commitment, current measures and feedback process.", accessibilitySections),
]
