export type Category = string

export type SubNiche = {
  label: string
  slug: string
  description: string
  categories: Category[]
}

export type Vertical = {
  label: string
  slug: string
  color: string
  themeName: string
  description: string
  subNiches: SubNiche[]
}

export type VerticalArticle = {
  id: string
  vertical: string
  subNiche: string
  subNicheSlug: string
  category: string
  title: string
  excerpt: string
  readingTime: number
  publishedAt: string
  viewCount: number
  featured?: boolean
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const makeSubNiche = (label: string, categories: string[]): SubNiche => ({
  label,
  slug: slugify(label),
  description: `${categories.join(', ')}.`,
  categories,
})

// Display order for menus and grids — change this array order to reorder all displays.
export const verticals: Vertical[] = [
  // 1 — Tech (blue)
  {
    label: 'Tech',
    slug: 'tech',
    color: '#2563EB',
    themeName: 'blue',
    description: 'Technology, AI, development, software, automation and cybersecurity.',
    subNiches: [
      makeSubNiche('AI', ['AI Tools', 'AI Productivity', 'AI Tutorials', 'AI Comparisons', 'Prompt Engineering', 'AI Agents', 'AI Automation']),
      makeSubNiche('Development', ['Web Development', 'Frontend', 'Backend', 'APIs', 'Frameworks', 'Developer Tools', 'Git & GitHub']),
      makeSubNiche('Software', ['Software Guides', 'SaaS Tools', 'Productivity Apps', 'App Comparisons', 'Setup Guides', 'Digital Workflows']),
      makeSubNiche('Automation', ['No-code Automation', 'Workflow Automation', 'Zapier', 'Make', 'Scripts', 'Business Automation']),
      makeSubNiche('Cybersecurity', ['Online Privacy', 'Password Security', 'Phishing', 'Data Protection', 'Security Tools', 'Device Security']),
      makeSubNiche('Consumer Tech', ['Smartphones', 'Laptops', 'Gadgets', 'Smart Home Devices', 'Tech Buying Guides', 'Device Comparisons']),
    ],
  },
  // 2 — Lifestyle (orange)
  {
    label: 'Lifestyle',
    slug: 'lifestyle',
    color: '#F97316',
    themeName: 'orange',
    description: 'Home, cooking, style, relationships, organization and everyday life.',
    subNiches: [
      makeSubNiche('Home & Living', ['Home Organization', 'Cleaning', 'Interior Basics', 'Small Spaces', 'Smart Home', 'Practical Living']),
      makeSubNiche('Food & Cooking', ['Cooking Basics', 'Meal Prep', 'Kitchen Tools', 'Recipes', 'Budget Cooking', 'Food Guides']),
      makeSubNiche('Style', ['Personal Style', 'Wardrobe', 'Fashion Basics', 'Grooming', 'Shopping Guides', 'Minimal Wardrobe']),
      makeSubNiche('Relationships', ['Communication', 'Dating', 'Friendships', 'Family', 'Boundaries', 'Conflict']),
      makeSubNiche('Personal Organization', ['Planning', 'Time Management', 'Notion Systems', 'Digital Organization', 'Life Admin', 'Personal Systems']),
      makeSubNiche('Shopping Guides', ['Buying Guides', 'Product Comparisons', 'Budget Shopping', 'Online Shopping', 'Practical Purchases']),
    ],
  },
  // 3 — Finance (green)
  {
    label: 'Finance',
    slug: 'finance',
    color: '#059669',
    themeName: 'green',
    description: 'Money, budgeting, investing, fintech and financial management.',
    subNiches: [
      makeSubNiche('Personal Finance', ['Money Management', 'Financial Planning', 'Emergency Fund', 'Debt Management', 'Personal Finance Tools']),
      makeSubNiche('Budgeting', ['Budget Methods', 'Budget Apps', 'Expense Tracking', 'Saving Plans', 'Monthly Budgeting']),
      makeSubNiche('Saving', ['Saving Strategies', 'High-yield Savings', 'Frugal Living', 'Saving Challenges', 'Goal-based Saving']),
      makeSubNiche('Investing Basics', ['Stocks', 'ETFs', 'Index Funds', 'Risk Management', 'Beginner Investing', 'Portfolio Basics']),
      makeSubNiche('Fintech Tools', ['Banking Apps', 'Payment Tools', 'Investment Apps', 'Crypto Tools', 'Finance Automation']),
      makeSubNiche('Taxes & Admin', ['Tax Basics', 'Tax Tools', 'Personal Admin', 'Invoices', 'Financial Documents']),
      makeSubNiche('Business Finance', ['Business Budgeting', 'Cash Flow', 'Accounting Tools', 'Pricing', 'Business Taxes']),
    ],
  },
  // 4 — Entertainment (pink)
  {
    label: 'Entertainment',
    slug: 'entertainment',
    color: '#EC4899',
    themeName: 'pink',
    description: 'Movies, series, music, games, books, creators and streaming.',
    subNiches: [
      makeSubNiche('Movies & Series', ['Movie Guides', 'Series Guides', 'Streaming', 'Film Analysis', 'Directors', 'Genres']),
      makeSubNiche('Music', ['Music Discovery', 'Playlists', 'Artists', 'Music Tools', 'Music Production', 'Genres']),
      makeSubNiche('Gaming', ['Game Guides', 'Gaming Tools', 'Platforms', 'Game Reviews', 'Esports', 'Game Design']),
      makeSubNiche('Books', ['Book Lists', 'Reading Systems', 'Authors', 'Summaries', 'Genres', 'Literature']),
      makeSubNiche('Creator Culture', ['Content Creation', 'YouTube', 'TikTok', 'Creator Tools', 'Monetization', 'Personal Brand']),
      makeSubNiche('Streaming Guides', ['Streaming Platforms', 'What to Watch', 'Platform Comparisons', 'Watchlists', 'Streaming Tools']),
    ],
  },
  // 5 — Nature (emerald)
  {
    label: 'Nature',
    slug: 'nature',
    color: '#16A34A',
    themeName: 'emerald',
    description: 'Plants, animals, gardening, environment, flowers and outdoor living.',
    subNiches: [
      makeSubNiche('Plants & Gardening', ['Indoor Plants', 'Gardening Basics', 'Plant Care', 'Soil', 'Watering', 'Garden Tools']),
      makeSubNiche('Flowers', ['Flower Types', 'Flower Care', 'Seasonal Flowers', 'Bouquets', 'Garden Flowers']),
      makeSubNiche('Animals & Pets', ['Dogs', 'Cats', 'Pet Care', 'Animal Behavior', 'Pet Products', 'Pet Health Basics']),
      makeSubNiche('Wildlife', ['Birds', 'Forest Animals', 'Marine Life', 'Insects', 'Wildlife Guides']),
      makeSubNiche('Environment', ['Sustainability', 'Biodiversity', 'Ecosystems', 'Recycling', 'Environmental Habits']),
      makeSubNiche('Outdoor Living', ['Outdoor Activities', 'Camping Basics', 'Hiking Basics', 'Garden Living', 'Outdoor Tools']),
    ],
  },
  // 6 — Education (violet)
  {
    label: 'Education',
    slug: 'education',
    color: '#7C3AED',
    themeName: 'violet',
    description: 'Learning, study systems, exams, languages, skills and career growth.',
    subNiches: [
      makeSubNiche('Study Systems', ['Study Methods', 'Note-taking', 'Revision', 'Focus', 'Student Productivity', 'Study Tools']),
      makeSubNiche('Learning Tools', ['Online Courses', 'Learning Apps', 'Memory Tools', 'Research Tools', 'Self-learning']),
      makeSubNiche('Exams', ['Exam Prep', 'Practice Tests', 'Study Plans', 'Test Strategy', 'Exam Anxiety']),
      makeSubNiche('Certifications', ['Tech Certifications', 'Language Certifications', 'Business Certifications', 'Online Certificates', 'Certification Prep']),
      makeSubNiche('Language Learning', ['Vocabulary', 'Grammar', 'Speaking', 'Listening', 'Writing', 'Language Apps']),
      makeSubNiche('Career Learning', ['CV & Resume', 'Interviews', 'Job Search', 'Internships', 'Personal Branding', 'Career Skills']),
    ],
  },
  // 7 — Health (rose)
  {
    label: 'Health',
    slug: 'health',
    color: '#E11D48',
    themeName: 'rose',
    description: 'Wellness, nutrition, sleep, fitness, mental health and prevention.',
    subNiches: [
      makeSubNiche('Wellness', ['Daily Habits', 'Routines', 'Stress', 'Mindfulness', 'Self-care', 'Habit Tracking']),
      makeSubNiche('Nutrition', ['Healthy Eating', 'Meal Planning', 'Hydration', 'Nutrition Basics', 'Weight Management', 'Food Choices']),
      makeSubNiche('Sleep', ['Sleep Hygiene', 'Evening Routines', 'Sleep Tracking', 'Energy', 'Recovery']),
      makeSubNiche('Fitness', ['Home Workouts', 'Gym Training', 'Strength', 'Mobility', 'Workout Plans', 'Beginner Fitness']),
      makeSubNiche('Mental Health Basics', ['Stress', 'Anxiety Basics', 'Focus', 'Burnout', 'Journaling', 'Mindfulness']),
      makeSubNiche('Preventive Health', ['Health Checkups', 'Healthy Habits', 'Risk Prevention', 'Everyday Health', 'Health Tracking']),
      makeSubNiche('Recovery', ['Rest Days', 'Stretching', 'Mobility', 'Injury Prevention', 'Recovery Tools']),
    ],
  },
  // 8 — Travel (sky)
  {
    label: 'Travel',
    slug: 'travel',
    color: '#0EA5E9',
    themeName: 'sky',
    description: 'Trips, destinations, budgets, planning tools and digital nomad life.',
    subNiches: [
      makeSubNiche('Travel Planning', ['Itineraries', 'Trip Planning', 'Travel Checklists', 'Travel Documents', 'Booking Tips']),
      makeSubNiche('Budget Travel', ['Cheap Flights', 'Budget Hotels', 'Travel Deals', 'Saving Money', 'Low-cost Travel']),
      makeSubNiche('Destination Guides', ['City Guides', 'Country Guides', 'Weekend Trips', 'Hidden Gems', 'Travel Seasons']),
      makeSubNiche('Local Experiences', ['Food Experiences', 'Local Culture', 'Activities', 'Museums', 'Local Transport']),
      makeSubNiche('Digital Nomad', ['Remote Work Travel', 'Nomad Cities', 'Workspaces', 'Visas', 'Nomad Tools']),
      makeSubNiche('Travel Tools', ['Travel Apps', 'Packing Tools', 'Maps', 'Translation Tools', 'Travel Gear']),
    ],
  },
  // 9 — Society (slate)
  {
    label: 'Society',
    slug: 'society',
    color: '#475569',
    themeName: 'slate',
    description: 'Society, politics, civic life, public issues, rights and media literacy.',
    subNiches: [
      makeSubNiche('Politics', ['Political Systems', 'Elections', 'Public Policy', 'Political Explainers', 'Government Basics']),
      makeSubNiche('Civic Life', ['Citizenship', 'Local Government', 'Public Services', 'Civic Participation', 'Community Life']),
      makeSubNiche('Social Trends', ['Demographics', 'Work Trends', 'Culture Shifts', 'Digital Society', 'Social Research']),
      makeSubNiche('Public Issues', ['Housing', 'Education Policy', 'Healthcare Systems', 'Inequality', 'Public Debates']),
      makeSubNiche('Rights & Law Basics', ['Consumer Rights', 'Privacy Rights', 'Work Rights', 'Legal Basics', 'Everyday Law']),
      makeSubNiche('Media Literacy', ['News Literacy', 'Fact-checking', 'Misinformation', 'Source Evaluation', 'Digital Media']),
    ],
  },
  // 10 — Science (cyan)
  {
    label: 'Science',
    slug: 'science',
    color: '#0891B2',
    themeName: 'cyan',
    description: 'Space, climate, research, energy, discoveries and accessible science.',
    subNiches: [
      makeSubNiche('Space', ['Astronomy', 'Planets', 'Space Missions', 'Telescopes', 'Satellites', 'Space News']),
      makeSubNiche('Climate', ['Climate Change', 'Weather', 'Climate Data', 'Sustainability Science', 'Carbon Footprint']),
      makeSubNiche('Everyday Science', ['Physics Basics', 'Biology Basics', 'Chemistry Basics', 'Human Body', 'Science in Daily Life']),
      makeSubNiche('Research Explainers', ['Scientific Method', 'Studies', 'Data', 'Evidence Basics', 'Research Summaries']),
      makeSubNiche('Energy', ['Renewable Energy', 'Solar', 'Batteries', 'Electricity', 'Energy Systems']),
      makeSubNiche('Future Science', ['Biotechnology', 'Robotics', 'Future Materials', 'Space Tech', 'Scientific Innovations']),
    ],
  },
  // 11 — Business (teal)
  {
    label: 'Business',
    slug: 'business',
    color: '#0F766E',
    themeName: 'teal',
    description: 'Entrepreneurship, marketing, sales, e-commerce, remote work and business tools.',
    subNiches: [
      makeSubNiche('Entrepreneurship', ['Business Ideas', 'Startup Basics', 'Business Models', 'Solo Business', 'Business Planning']),
      makeSubNiche('Marketing', ['SEO', 'Content Marketing', 'Social Media', 'Email Marketing', 'Analytics', 'Marketing Tools']),
      makeSubNiche('Sales', ['Copywriting', 'Landing Pages', 'Offers', 'Sales Funnels', 'Persuasion', 'Lead Generation']),
      makeSubNiche('E-commerce', ['Shopify', 'Online Stores', 'Product Research', 'Conversion', 'Marketplaces', 'Payment Tools']),
      makeSubNiche('Remote Work', ['Remote Jobs', 'Remote Tools', 'Home Office', 'Async Work', 'Remote Productivity']),
      makeSubNiche('Career Growth', ['Professional Skills', 'Leadership', 'Networking', 'Salary Negotiation', 'Career Strategy']),
      makeSubNiche('Business Tools', ['CRM', 'Accounting Tools', 'Project Management', 'Team Tools', 'Automation Tools', 'Invoicing']),
    ],
  },
  // 12 — Sports (red)
  {
    label: 'Sports',
    slug: 'sports',
    color: '#DC2626',
    themeName: 'red',
    description: 'Training, sports, performance, equipment and recovery.',
    subNiches: [
      makeSubNiche('Training', ['Training Plans', 'Strength Training', 'Endurance', 'Mobility', 'Beginner Training']),
      makeSubNiche('Running', ['Running Plans', 'Shoes', 'Running Gear', 'Pace', 'Recovery', 'Race Prep']),
      makeSubNiche('Football / Soccer', ['Training Drills', 'Equipment', 'Tactics', 'Fitness', 'Player Development']),
      makeSubNiche('Equipment', ['Buying Guides', 'Gear Reviews', 'Sports Tech', 'Shoes', 'Accessories']),
      makeSubNiche('Recovery', ['Stretching', 'Rest', 'Injury Prevention', 'Recovery Tools', 'Mobility']),
      makeSubNiche('Sports Tech', ['Wearables', 'Fitness Apps', 'Tracking Tools', 'Smart Equipment', 'Performance Data']),
      makeSubNiche('Performance', ['Speed', 'Strength', 'Endurance', 'Nutrition for Sport', 'Mental Performance']),
    ],
  },
]

export const verticalArticles: VerticalArticle[] = verticals.flatMap((vertical, verticalIndex) =>
  vertical.subNiches.flatMap((subNiche, subIndex) =>
    subNiche.categories.map((category, categoryIndex) => {
      const id = `${vertical.slug}-${subNiche.slug}-${slugify(category)}`
      return {
        id,
        vertical: vertical.slug,
        subNiche: subNiche.label,
        subNicheSlug: subNiche.slug,
        category,
        title: `${category}: practical guide for ${subNiche.label.toLowerCase()}`,
        excerpt: `Clear explanations, decision points and practical resources for ${category.toLowerCase()} inside the ${vertical.label} vertical.`,
        readingTime: 5 + ((verticalIndex + subIndex + categoryIndex) % 5),
        publishedAt: `2026-${String(6 - ((verticalIndex + subIndex) % 4)).padStart(2, '0')}-${String(24 - (categoryIndex % 18)).padStart(2, '0')}`,
        viewCount: 1800 + verticalIndex * 320 + subIndex * 190 + categoryIndex * 140,
        featured: subIndex === 0 && categoryIndex === 0,
      }
    }),
  ),
)

export const getVerticalBySlug = (slug?: string) =>
  verticals.find((vertical) => vertical.slug === slug)

export const getSubNicheBySlug = (verticalSlug?: string, subNicheSlug?: string) =>
  getVerticalBySlug(verticalSlug)?.subNiches.find((subNiche) => subNiche.slug === subNicheSlug)

export const getArticlesByVertical = (verticalSlug: string) =>
  verticalArticles.filter((article) => article.vertical === verticalSlug)

export const getArticlesByNiche = (verticalSlug: string, subNicheSlug: string) =>
  verticalArticles.filter(
    (article) => article.vertical === verticalSlug && article.subNicheSlug === subNicheSlug,
  )

export const getFallbackVertical = () => verticals[0]
