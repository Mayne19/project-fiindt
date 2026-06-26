# Fiindt — Headline & Typography Reference

Design system : **Warm Ink**  
Police : Inter (Google Fonts)

---

## Headings

| Niveau | font-size | font-weight | letter-spacing | line-height | Utilisation |
|--------|-----------|-------------|----------------|-------------|-------------|
| H1 | `clamp(48px, 6vw, 80px)` | 700 | -0.046em | 1.05 | Page heroes, titres articles |
| H2 | `clamp(28px, 2.8vw, 38px)` | 600 | -0.03em | 1.1 | Sections dans les pages et articles |
| H3 | `20px` | 700 | -0.03em | 1.2 | Sous-sections articles, titres cards |
| H4 | `14px` | 600 | -0.01em | 1.4 | Items secondaires, sub-labels |

---

## Body text

| Usage | font-size | font-weight | color | line-height | letter-spacing |
|-------|-----------|-------------|-------|-------------|----------------|
| Paragraphe article | `clamp(18px, 1.4vw, 22px)` | 500 | `rgba(67,38,29,.55)` | 1.18 | -0.02em |
| Paragraphe standard | `17px` | 400 | `rgba(67,38,29,.72)` | 1.55 | -0.01em |
| Sous-titre / excerpt | `clamp(18px, 1.4vw, 22px)` | 500 | `rgba(67,38,29,.55)` | 1.18 | -0.02em |
| Meta / labels | `13px` | 400–600 | `rgba(67,38,29,.45)` | — | -0.01em |
| Micro / signals | `12px` | 400 | `rgba(67,38,29,.38)` | — | 0.02em |

---

## Couleurs texte

| Variable | Valeur | Rôle |
|----------|--------|------|
| `var(--text)` | `#43261d` | Texte principal |
| `var(--text-dark)` | `#26221e` | Titres foncés |
| Texte fantôme | `rgba(67,38,29,.20)` | Décoratif |
| Texte secondaire | `rgba(67,38,29,.50)` | Sous-titres |
| Texte muted | `rgba(67,38,29,.38)` | Labels, meta |

---

## Règles absolues

- **Jamais de labels uppercase** au-dessus des sections
- **Ne jamais modifier** `NewHomeHero()`
- **Ne jamais toucher** aux composants Mindrift
