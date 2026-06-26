# CLAUDE.md — Fiindt Project Memory

## Projet
Plateforme de recherche originale (pas un agrégateur).
Mission : produire la connaissance qui n'existe pas encore.
Stack : Vite + React + TypeScript + React Router v7 / pnpm
Deploy : Vercel — project-fiindt.vercel.app

## Design System : "Warm Ink"
Police : Inter (Google Fonts, déjà dans index.html)
Background : #fbf4eb (var(--cream)) partout sur la homepage
Texte principal : #43261d (var(--text)) / #26221e (var(--text-dark))
Texte fantôme : rgba(67,38,29, 0.20) — pour titres décoratifs
Texte secondaire : rgba(67,38,29, 0.50) — pour sous-titres/paragraphes
Boutons CTA : background #47c971 (var(--brand-green)), color #fff
Accent jaune : #ffc524 (var(--yellow))

H1 : font-weight 700, clamp(48px,6vw,80px), letter-spacing -0.046em, line-height 1.05
H2 : font-weight 600, clamp(28px,2.8vw,38px), letter-spacing -0.03em, line-height 1.1
Paragraphes : 17px minimum, line-height 1.55, letter-spacing -0.01em
Cards : border 0.5px solid rgba(67,38,29,.10), border-radius 12px

## Règles absolues
- ZÉRO labels/eyebrows uppercase au-dessus des sections (supprimer si présents)
- Ne jamais modifier NewHomeHero() sans ordre explicite
- Ne jamais toucher aux composants Mindrift sans ordre explicite
- Rapport final obligatoire : liste chaque fichier modifié
- pnpm build doit passer sans erreur TypeScript
