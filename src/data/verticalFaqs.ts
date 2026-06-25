export type FAQItem = {
  question: string
  answer: string
}

export const verticalFaqs: Record<string, FAQItem[]> = {
  tech: [
    {
      question: 'How does Fiindt evaluate technology tools?',
      answer: 'Fiindt examines practical use cases, core features, pricing, reliability, privacy, limitations and the amount of setup a tool requires.',
    },
    {
      question: 'Are Fiindt Tech guides suitable for beginners?',
      answer: 'Yes. Guides define essential terms, explain setup decisions and identify when a more advanced option may be unnecessary.',
    },
    {
      question: 'How does Fiindt handle fast-changing tech information?',
      answer: 'Time-sensitive guides are reviewed when products, pricing, policies or important features change. Publication and update context is kept visible where it affects a decision.',
    },
    {
      question: 'Does Fiindt recommend tools or only explain them?',
      answer: 'Fiindt does both when the evidence supports it. Recommendations include the use case they fit, the trade-offs involved and situations where another option is stronger.',
    },
    {
      question: 'How does Fiindt compare AI, software and automation tools?',
      answer: 'Comparisons use shared criteria such as output quality, integrations, control, learning curve, cost and data handling rather than feature counts alone.',
    },
    {
      question: 'Can Fiindt help users choose the right digital workflow?',
      answer: 'Yes. Workflow guides connect tools to a specific goal and show how information moves between steps, including likely bottlenecks and unnecessary complexity.',
    },
  ],
  finance: [
    {
      question: 'Is Fiindt financial content personalized advice?',
      answer: 'No. Fiindt provides general educational information and comparison frameworks, not individualized investment, tax, credit or legal advice.',
    },
    {
      question: 'How does Fiindt make finance topics easier to understand?',
      answer: 'Guides translate technical terms into concrete decisions, examples and calculations while keeping important conditions and exceptions visible.',
    },
    {
      question: 'Can Fiindt help compare financial tools and apps?',
      answer: 'Yes. Comparisons consider fees, security, access, account limits, automation, support and the type of user each product is designed for.',
    },
    {
      question: 'How does Fiindt explain financial risks?',
      answer: 'Risk is described through possible losses, uncertainty, liquidity, fees, time horizon and the assumptions behind an expected outcome.',
    },
    {
      question: 'Are Fiindt Finance guides useful for beginners?',
      answer: 'Yes. Beginner guides establish the vocabulary and decision order first, then point out where professional guidance may be appropriate.',
    },
    {
      question: 'How often should financial guides be updated?',
      answer: 'A guide should be reviewed whenever rates, regulations, tax rules, product fees or market access materially change the decision it supports.',
    },
  ],
  education: [
    {
      question: 'Can Fiindt help students study more effectively?',
      answer: 'Yes. Fiindt turns study goals into practical systems for planning, recall, practice, feedback and revision instead of relying on motivation alone.',
    },
    {
      question: 'Are Fiindt Education guides based on learning science?',
      answer: 'Where relevant, guides draw on established findings such as retrieval practice, spacing, feedback and cognitive load, while noting the limits of the evidence.',
    },
    {
      question: 'Does Fiindt compare online learning tools?',
      answer: 'Yes. Tools are compared by teaching quality, practice features, accessibility, cost, feedback and how well they support a specific learning goal.',
    },
    {
      question: 'Can Fiindt help with exam preparation?',
      answer: 'Exam guides help readers build a realistic schedule, prioritize weak areas, use practice tests and review mistakes before test day.',
    },
    {
      question: 'How does Fiindt explain complex learning methods?',
      answer: 'Methods are broken into repeatable steps with examples, common mistakes and guidance on when the method is or is not useful.',
    },
    {
      question: 'Are Fiindt Education resources useful outside school or university?',
      answer: 'Yes. The same systems can support professional certifications, language learning, career changes and independent skill development.',
    },
  ],
  travel: [
    {
      question: 'Can Fiindt help plan smarter trips?',
      answer: 'Yes. Planning guides connect budget, timing, transport, accommodation and daily priorities so readers can identify trade-offs before booking.',
    },
    {
      question: 'Does Fiindt compare travel tools and apps?',
      answer: 'Yes. Comparisons consider coverage, offline access, fees, reliability, privacy and whether a tool remains useful during the trip.',
    },
    {
      question: 'Are Fiindt Travel guides only for tourists?',
      answer: 'No. Resources can also support remote workers, digital nomads, students, families and people planning longer stays.',
    },
    {
      question: 'How does Fiindt handle changing travel information?',
      answer: 'Readers are encouraged to verify live prices, entry rules, schedules and safety guidance with official sources before acting.',
    },
    {
      question: 'Can Fiindt help with budget travel decisions?',
      answer: 'Yes. Guides compare the full cost of options, including baggage, transfers, location, cancellation terms and time—not only the advertised price.',
    },
  ],
  health: [
    {
      question: 'Is Fiindt Health content medical advice?',
      answer: 'No. Health content is educational and cannot diagnose, treat or replace advice from a qualified healthcare professional.',
    },
    {
      question: 'How does Fiindt approach health information?',
      answer: 'Fiindt prioritizes credible sources, separates established guidance from emerging evidence and explains where individual circumstances matter.',
    },
    {
      question: 'Can Fiindt help build better daily habits?',
      answer: 'Yes. Habit guides focus on small actions, realistic environments, tracking and recovery after interruptions rather than perfect routines.',
    },
    {
      question: 'How does Fiindt avoid misleading health claims?',
      answer: 'Claims are checked for evidence quality, exaggerated certainty, conflicts of interest and confusion between correlation and causation.',
    },
    {
      question: 'When should readers seek professional medical guidance?',
      answer: 'Readers should seek qualified care for urgent symptoms, persistent changes, medication questions, diagnoses or decisions involving significant personal risk.',
    },
  ],
  business: [
    {
      question: 'Can Fiindt help choose business tools?',
      answer: 'Yes. Tool guides compare fit by team size, workflow, integrations, cost, implementation effort and the operational problem being solved.',
    },
    {
      question: 'Is Fiindt Business only for entrepreneurs?',
      answer: 'No. The resources also serve employees, freelancers, managers, small teams and professionals improving a business process.',
    },
    {
      question: 'Does Fiindt explain online business strategies?',
      answer: 'Yes. Strategies are connected to audience, offer, channel, measurement and execution requirements rather than presented as universal formulas.',
    },
    {
      question: 'How does Fiindt evaluate business advice?',
      answer: 'Advice is assessed for assumptions, evidence, incentives, implementation cost and whether the result can transfer beyond a single success story.',
    },
    {
      question: 'Can Fiindt help compare marketing, sales and automation tools?',
      answer: 'Yes. Comparisons examine the complete workflow, data ownership, reporting, integrations and the ongoing work required after setup.',
    },
    {
      question: 'Are Fiindt Business guides useful for small businesses?',
      answer: 'Yes. Guides highlight lower-complexity options, budget constraints and systems that can grow without creating unnecessary overhead.',
    },
  ],
  lifestyle: [
    {
      question: 'Can Fiindt help improve everyday routines?',
      answer: 'Yes. Routine guides focus on reducing friction, making responsibilities visible and choosing systems that remain manageable on difficult days.',
    },
    {
      question: 'Are Fiindt Lifestyle guides based on trends?',
      answer: 'Trends may be examined, but usefulness, durability, cost and realistic daily use matter more than popularity.',
    },
    {
      question: 'Can Fiindt compare everyday products or tools?',
      answer: 'Yes. Comparisons consider quality, maintenance, total cost, space, frequency of use and whether a simpler alternative is enough.',
    },
    {
      question: 'Does Fiindt Lifestyle content stay practical?',
      answer: 'Guides are built around concrete decisions, routines and constraints rather than idealized lifestyles or purely inspirational advice.',
    },
    {
      question: 'Can Fiindt help with home, style or personal organization decisions?',
      answer: 'Yes. Resources help readers define needs, compare options and build repeatable systems suited to their budget, space and preferences.',
    },
  ],
  nature: [
    {
      question: 'Can Fiindt help identify plants, animals or natural phenomena?',
      answer: 'Fiindt can explain distinguishing features and likely possibilities, but uncertain or safety-sensitive identification should be confirmed by a qualified local source.',
    },
    {
      question: 'Does Fiindt Nature content rely on scientific sources?',
      answer: 'Yes. Scientific institutions, field references and established research are prioritized, especially for ecology, species and environmental claims.',
    },
    {
      question: 'Can Fiindt help with gardening or plant care?',
      answer: 'Yes. Guides connect light, water, soil, climate and plant condition to practical care decisions without treating every plant the same.',
    },
    {
      question: 'How does Fiindt handle environmental topics?',
      answer: 'Environmental guides distinguish measured evidence, scientific projections, policy choices and individual actions so their roles are not confused.',
    },
    {
      question: 'Are Fiindt Nature guides useful for beginners?',
      answer: 'Yes. They start with observable features, essential terminology and low-risk actions before introducing specialist detail.',
    },
    {
      question: 'Can Fiindt explain the difference between similar plants, animals or ecosystems?',
      answer: 'Yes. Comparison guides focus on visible traits, habitat, behavior, seasonality and other reliable distinctions, while acknowledging natural variation.',
    },
  ],
  sports: [
    {
      question: 'Can Fiindt help improve training decisions?',
      answer: 'Yes. Guides help readers connect goals, training load, recovery, progression and available time instead of copying isolated workouts.',
    },
    {
      question: 'Is Fiindt Sports content only for athletes?',
      answer: 'No. Content supports beginners, recreational participants, coaches and people returning to activity as well as competitive athletes.',
    },
    {
      question: 'Does Fiindt compare sports equipment?',
      answer: 'Yes. Equipment is compared by fit, intended use, durability, safety, performance benefit and whether the added cost is justified.',
    },
    {
      question: 'How does Fiindt approach injury-related topics?',
      answer: 'Injury content remains educational, avoids diagnosis and directs readers to qualified care when pain, trauma or persistent symptoms require assessment.',
    },
    {
      question: 'Can Fiindt explain recovery, performance and training tools?',
      answer: 'Yes. Tools are evaluated by evidence, measurement accuracy, practical usefulness and whether they improve decisions rather than simply generate data.',
    },
  ],
  society: [
    {
      question: 'How does Fiindt explain complex social topics?',
      answer: 'Fiindt defines key terms, separates facts from interpretation and provides enough historical and institutional context to understand the disagreement.',
    },
    {
      question: 'Does Fiindt take political positions?',
      answer: 'Fiindt aims to explain systems, evidence and competing arguments rather than instruct readers which party or ideology to support.',
    },
    {
      question: 'Can Fiindt help with media literacy?',
      answer: 'Yes. Guides teach source evaluation, claim tracing, context checks and ways to recognize manipulation or unsupported certainty.',
    },
    {
      question: 'How does Fiindt handle sensitive society topics?',
      answer: 'Language, evidence and affected perspectives are reviewed carefully, with uncertainty and meaningful disagreement made explicit.',
    },
    {
      question: 'Can Fiindt compare different viewpoints on public issues?',
      answer: 'Yes. Comparisons identify each position’s assumptions, evidence, values, likely trade-offs and points of genuine agreement.',
    },
  ],
  science: [
    {
      question: 'How does Fiindt make science easier to understand?',
      answer: 'Fiindt starts with the question, defines necessary terms and uses concrete examples before introducing technical mechanisms or data.',
    },
    {
      question: 'Does Fiindt use scientific studies?',
      answer: 'Yes. Relevant studies, reviews and institutional sources are used with attention to study design, sample size and strength of evidence.',
    },
    {
      question: 'Can Fiindt explain new scientific discoveries?',
      answer: 'Yes. Coverage distinguishes the new result from earlier knowledge and explains what still needs replication or further testing.',
    },
    {
      question: 'How does Fiindt avoid oversimplifying science?',
      answer: 'Guides simplify language without removing conditions, competing explanations, scale or the limits that affect the conclusion.',
    },
    {
      question: 'How does Fiindt explain uncertainty in scientific topics?',
      answer: 'Uncertainty is described through confidence, data limits, model assumptions, disagreement and what evidence could change the current view.',
    },
    {
      question: 'Can Fiindt help readers understand research, data and evidence?',
      answer: 'Yes. Resources explain how claims are tested, how data can mislead and how to judge whether a conclusion is supported by the method.',
    },
  ],
  entertainment: [
    {
      question: 'Can Fiindt help discover what to watch, read or play?',
      answer: 'Yes. Discovery guides connect recommendations to genre, mood, themes, time commitment, platform and the qualities a reader values.',
    },
    {
      question: 'Does Fiindt only publish reviews?',
      answer: 'No. Fiindt also publishes comparisons, explainers, viewing and reading guides, industry context and practical platform advice.',
    },
    {
      question: 'How does Fiindt choose entertainment recommendations?',
      answer: 'Recommendations consider craft, audience fit, accessibility, cultural context and the specific reason someone may enjoy the work.',
    },
    {
      question: 'Can Fiindt explain trends in entertainment?',
      answer: 'Yes. Trend coverage connects audience behavior, technology, distribution, business incentives and creative changes instead of reporting popularity alone.',
    },
    {
      question: 'Can Fiindt compare movies, games, books or streaming platforms?',
      answer: 'Yes. Comparisons use criteria appropriate to the format, such as storytelling, usability, catalog, cost, replay value or reading experience.',
    },
  ],
}
