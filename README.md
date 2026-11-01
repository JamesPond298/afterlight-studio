# Afterlight — Studio Stories

An original, self-contained browser game about building an independent game studio. The sunlit loft, fictional platforms, story, events, visual identity, numbers, and progression are original. There are no third-party art, font, JavaScript, or runtime dependencies.

## Play

Open `index.html` in a modern browser. For consistent browser storage and testing, install Node.js 20 or later, open a terminal in this directory, and run:

```sh
npm start
```

Visit <http://127.0.0.1:4173>. Stop the preview with Ctrl+C. No installation step is needed. The application itself is static and needs no server after deployment beyond ordinary file hosting.

## The game

- Six genres, eight themes, three fictional platforms, and three scopes.
- Plan a title, concept, normalized development focus, and marketing budget.
- Weekly development and optional polish; bugs, morale, specialist experience, craft, and concept fit affect results.
- Release reports explain focus fit, theme bonuses, bugs, and repeated-concept penalties.
- Six recruitable collaborators, training, three workspaces, and eight research improvements.
- Twelve original community events with affordable alternatives. Event choices pause time.
- Quarterly audience trends, 16-week sales tails, operating costs, contract work, and a one-time rescue fund.
- Five milestone goals; a five-year anniversary and continued sandbox play. Insolvency ends a studio after its rescue fund is exhausted.
- Local autosave, JSON export/import, corrupt-save checks, and confirmation before replacing a studio.
- Responsive layouts, keyboard-accessible native controls, dialog focus, reduced-motion support, and no real-time waiting requirement.

### A good first project

Create a Small Botanical / Cozy game on OpenDesk. Use genre guidance. Advance nine development weeks, resolve community letters, and polish until bugs reach zero. Release, then advance time to collect sales. Try a Clockwork / Tactics concept next. Use commissions between releases if cash becomes tight. Keep reserves before recruiting; salaries are paid every week.

Autosaves belong to the current browser and website origin. Export before switching browsers, devices, file paths, or hosts. Private browsing and disabled storage may prevent persistence; the game displays an export reminder when saving fails. Imported files are data, never executable code. Saves are local and are not synchronized online.

## Verify

```sh
npm test
```

The Node test suite checks release/polish/sales accounting, event pauses, invalid budgets and locked scope, staff/research/workspace progression, save roundtrips, corrupt data, rescue/insolvency, quality tradeoffs, and 30 seeded five-year campaigns.

See `VERIFICATION.md` for actual checks and limits, `RESEARCH.md` for design research, and `DEPLOYMENT.md` for exact GitHub Pages instructions.

## Source map

`engine.js`: deterministic, serializable simulation. `app.js`: UI, dialogs, storage, import/export, and simulation controls. `style.css`: responsive design. `assets/`: original vector assets. `tests/`: simulation tests. `server.cjs`: local-only preview helper.

## Deployment status

Public source repository: https://github.com/JamesPond298/afterlight-studio. GitHub Pages serves the static game from the main branch and repository root when enabled. See the deployment guide for publishing and update instructions.

