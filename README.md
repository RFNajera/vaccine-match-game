# Vaccine Match

An educational flip-card matching game that pairs vaccine-preventable diseases with their vaccines.

## How to Play

1. Click **Start Game** to begin.
2. Click any card to flip it face-up and reveal whether it is a disease or a vaccine.
3. Click a second card to attempt a match:
   - If the cards are a matching disease–vaccine pair, they stay face-up and an **information card** pops up with details about the disease and its vaccine.
   - If they don't match, they flip back over.
4. Click **Continue Game** to dismiss the information card and keep playing.
5. Match all 6 pairs to complete the round. A summary card shows your time and total flips.

## Features

- **16 disease–vaccine pairs** covering every vaccine-preventable disease since smallpox
- **6 randomly selected pairs** per round — new combination every game
- **Rich information cards** for each match: pre/post-vaccine case numbers, pathogen details, vaccine history, safety profile
- **Timer + flip counter** for personal challenge
- **Dark mode** support (auto-detects system preference; manual toggle in header)
- **Fully responsive** — works on desktop, tablet, and mobile
- **Accessible** — keyboard navigation, ARIA labels, focus management

## Information Sources

No information from the CDC (cdc.gov) was used. All vaccine and disease data is sourced from:

- [History of Vaccines](https://historyofvaccines.org) — College of Physicians of Philadelphia
- [CIDRAP](https://www.cidrap.umn.edu) — Center for Infectious Disease Research and Policy, University of Minnesota
- [CHOP Vaccine Education Center](https://www.chop.edu/vaccine-education-center) — Children's Hospital of Philadelphia
- [World Health Organization](https://www.who.int)

## Technical Details

Pure static HTML/CSS/JS — no build step, no dependencies, no frameworks. Simply open `index.html` in any modern browser or serve the directory with any static file server.

### Files

| File | Description |
|---|---|
| `index.html` | Main HTML structure and layout |
| `style.css` | All styles (design tokens, components, dark mode, responsive) |
| `game.js` | Game logic and complete vaccine/disease data |
| `README.md` | This file |

### Hosting

Drop the three files (`index.html`, `style.css`, `game.js`) into any directory and host as a static site. Compatible with GitHub Pages, Netlify, Vercel, or any web server.

## License

Educational use. Vaccine and disease information is based on publicly available scientific sources listed above.

---
*Created with [Perplexity Computer](https://www.perplexity.ai/computer)*
