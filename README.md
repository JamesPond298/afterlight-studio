# Afterlight — Studio Tycoon v2.5

Play online: https://jamespond298.github.io/afterlight-studio/

## New in v2.5

- Publisher deals. Self-publish, or sign with one of three publishers. They pay an advance at the start in exchange for a share of the receipts, add hype, and pay a bonus if the game hits their review target. The biggest label needs 5,000 fans.
- Games Expo every June (after your first release). Skip it, or book a small booth, a large booth, or a main-stage showcase for fans and hype. Showing a game that is still in development earns 25% more hype.
- Expansion packs. After researching franchise development, a game scoring 7+ that has finished its sales cycle can get one expansion. It sells at half price as a new release.
- Rival studios release a game every 12 weeks. A rival hit scoring 8+ cuts sales of your games in the same genre by 15% for 8 weeks, and rivals compete for Game of the Year. See them under Market.

A complete rebuild of Afterlight as an office-based game studio tycoon. The live studio, staged development choices, design/technology production, custom engines, hardware generations, staff management, reviews, and sales are the core experience. Near-name hardware parodies, dialogue, event content, artwork, formulas, and balancing are original.

## New in v2.4

- A rotating job market: a new season of generated applicants arrives every 24 weeks, with skills and salaries that grow as the industry matures. Pay for a recruitment drive to bring in a larger, stronger group right away. The original veterans remain available.
- Critics explain their scores. Each release lists what reviewers noticed (priority fit, topic pairing, content for its scope, bugs, dated engines, sequels, trends, platform fit), and every reviewer writes a short quote.
- Yearly industry awards every January for the previous year's releases: Best-in-genre at 8+, Game of the Year at 9+. Prizes include cash, fans and hype for your next game. Includes a trophy cabinet and two new achievements.
- Sixteen new topics, for 32 in total: Zombies, Superheroes, Ninja, Wild West, Spies, Dinosaurs, Ocean, Military, Farming, Fashion, School, Cyberpunk, Wasteland, Mythology, Aviation and Time Travel.
- Existing v2.3 saves load unchanged; new fields are added automatically.

## New in v2.3

- Research income every active week, a focused two-week research sprint, clearer costs/requirements, and direct access from the research counter.
- A next-step coach: prepare a starter game, learn from reports, research features, and build an engine. Help is always available in the dock.
- Continue/Pause work controls inside project panels. Time pauses at stage choices, task completion, the start of polish, all bugs fixed, and staff returning.
- A real-year timeline starting August 1981. Four weeks per month, twelve months per year; normal speed is four seconds per week. The campaign anniversary is August 2021, followed by continued sandbox play.
- All 24 platforms use historical reference launch years and regional months. Launches occur in week one of that month. Hardware retirement, licenses, demand and market share remain simulation values. See [TIMELINE.md](TIMELINE.md).
- Existing saves keep their finances, catalog, projects and elapsed weeks. Display dates and future platform access adopt the new calendar. Owned licenses remain owned; new projects must wait for a platform's new launch date.

## New in v2.2

- Random title suggestions follow the selected topic and genre and avoid existing catalog titles. A separate Random topic & genre button suggests a new concept using unlocked topics and updates the preview.
- Random engine, studio, and founder name buttons provide editable suggestions. Generating a name never spends money, advances time, or changes the simulation random seed. Studio/founder suggestions apply only after Save names or Start your studio.

## New in v2.1

- Weekly sales bar charts in the office and a dedicated Sales report for every release. Switch between copies and net receipts, inspect each week, and expand the exact weekly ledger. Totals include receipts, release profit, last-week performance, and peak week.
- Closer hardware names such as Nintenda, PlayStasion, Xboks, GameBoi, and Swytch. Internal IDs remain unchanged for save compatibility.
- An eight-page research-backed [editable framework](framework.html) for the studio simulator and a proposed cell phone company adaptation. The phone game is a design outline, not an implemented mode.

## Core game

- A full-screen interactive isometric office with animated developers, floating design/technology points, and four visibly different office tiers.
- Three development stages, with nine separately prioritized areas: Engine, Gameplay, Story, Dialogue, Level design, AI, World design, Graphics, and Sound.
- Per-area developer assignments, design/technology skills, energy, training, vacations, levels, salaries, and severance.
- Six genres, sixteen topics, four game sizes, target audiences, sequels, marketing, and multiplatform releases.
- Twenty-three research items. Research features, build a named custom engine, then select its features during development. Excess feature workload slows production.
- Twenty-four fictional hardware parodies, with original illustrations, recognizable generational designs, launch announcements, licenses, audience and genre strengths, changing market shares, and retirement windows.
- Bug fixing before launch, four separate review publications, 20-week sales charts, chart positions, profit tracking, and game reports that reveal useful planning knowledge.
- Timed contracts with actual design/technology targets and deadline penalties. A one-time rescue loan, studio insolvency, and nine achievements.
- A 40-year campaign anniversary and continued sandbox play.
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

Thirty tests cover the simulation, 30 seeded opening campaigns, four complete 40-year careers, save migration/validation, and all hardware illustrations/lifecycles, and sales-chart accounting and edge cases. See `VERIFICATION.md` for browser checks and their limits.

## Files

- `calendar.js`: four-week calendar and historical platform anchors.
- `guidance.js`: contextual next-action recommendations.
- `engine.js`: deterministic simulation and versioned save validation.
- `app.js`: office HUD, planning, management dialogs, save/load and controls.
- `office.js`: original procedural office artwork and animation.
- `names.js`: topic-aware cosmetic name suggestions and duplicate avoidance.
- `sales.js`: accessible weekly bar-chart rendering and sales summaries.
- `framework.html`: editable game framework and phone-industry adaptation outline.
- `hardware.js`: original SVG hardware-parody artwork.
- `style.css`: desktop and phone UI.
- `tests/`: simulation, career, and hardware checks.
- `server.cjs`: local-only preview helper.
- `HARDWARE.md`: hardware parody/inspiration reference.
- `DEPLOYMENT.md`: GitHub Pages publishing instructions.
- `RESEARCH.md`: genre and hardware research, plus independent design choices.

The public repository is https://github.com/JamesPond298/afterlight-studio. Pages publishes from `main` and `/ (root)`. The game runs entirely on the player's browser; saves are not uploaded or synchronized.

