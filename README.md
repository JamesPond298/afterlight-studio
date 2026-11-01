# Afterlight — Studio Tycoon v2

Play online: https://jamespond298.github.io/afterlight-studio/

A complete rebuild of Afterlight as an office-based game studio tycoon. The live studio, staged development choices, design/technology production, custom engines, hardware generations, staff management, reviews, and sales are the core experience. Names, dialogue, event content, artwork, formulas, and balancing are original.

## What changed in v2

- A full-screen interactive isometric office with animated developers, floating design/technology points, and four visibly different office tiers.
- Three development stages, with nine separately prioritized areas: Engine, Gameplay, Story, Dialogue, Level design, AI, World design, Graphics, and Sound.
- Per-area developer assignments, design/technology skills, energy, training, vacations, levels, salaries, and severance.
- Six genres, sixteen topics, four game sizes, target audiences, sequels, marketing, and multiplatform releases.
- Twenty-three research items. Research features, build a named custom engine, then select its features during development. Excess feature workload slows production.
- Twenty-four fictional hardware parodies, with original illustrations, recognizable generational designs, launch announcements, licenses, audience and genre strengths, changing market shares, and retirement windows.
- Bug fixing before launch, four separate review publications, 20-week sales charts, chart positions, profit tracking, and game reports that reveal useful planning knowledge.
- Timed contracts with actual design/technology targets and deadline penalties. A one-time rescue loan, studio insolvency, and nine achievements.
- A 32-year campaign anniversary and continued sandbox play.
- Autosave, export/import, and migration of version 1 finances and released catalog. Unfinished v1 work is closed during migration; old saves remain under their original browser storage key.

## Run locally

Open `index.html` in a modern browser, or use Node.js 20 or later:

```sh
npm start
```

Open http://127.0.0.1:4173. No dependency installation, API keys, accounts, or build step are needed. Browser storage belongs to the website origin; export before moving between hosts or devices.

## Play

Choose Develop, then a topic, genre, platform, size, and engine. At each stage, the three sliders divide one time budget. Assign developers and optionally enable engine features. Watch the team work, fix bugs, and release. Reviews affect demand; sales arrive over 20 weeks. Generate reports to discover effective combinations and genre priorities. Use research and custom engines to keep improving.

A rested founder can handle the smallest contract. Staffed studios should research larger projects and keep a payroll reserve before hiring. Larger contracts require sufficient team output. Research, office moves, and engines all consume money and time.

Time pauses at stage choices, industry bulletins, events, and dialogs. Play speed controls are in the upper-right corner. Keyboard: Space toggles play/pause; 1, 2, and 3 choose speed when a form is not focused.

## Checks

```sh
npm test
```

Seventeen tests cover the simulation, 30 seeded opening campaigns, four complete 32-year careers, save migration/validation, and all hardware illustrations/lifecycles. See `VERIFICATION.md` for browser checks and their limits.

## Files

- `engine.js`: deterministic simulation and versioned save validation.
- `app.js`: office HUD, planning, management dialogs, save/load and controls.
- `office.js`: original procedural office artwork and animation.
- `hardware.js`: original SVG hardware-parody artwork.
- `style.css`: desktop and phone UI.
- `tests/`: simulation, career, and hardware checks.
- `server.cjs`: local-only preview helper.
- `HARDWARE.md`: hardware parody/inspiration reference.
- `DEPLOYMENT.md`: GitHub Pages publishing instructions.
- `RESEARCH.md`: genre and hardware research, plus independent design choices.

The public repository is https://github.com/JamesPond298/afterlight-studio. Pages publishes from `main` and `/ (root)`. The game runs entirely on the player's browser; saves are not uploaded or synchronized.

