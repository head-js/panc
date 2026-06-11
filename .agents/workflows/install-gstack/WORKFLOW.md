---
name: install-gstack
metadata:
  version: 0.0.1
---

# Install Gstack

## Upgrade

1. Find `https://github.com/garrytan/gstack` and clone it into the `.context` directory.

```bash
mkdir -p .context
git clone --single-branch --depth 1 git@github.com:garrytan/gstack.git .context/gstack
```

2. This workflow skips these 18 Gstack skills, organized into five main groups:

   1. **Browse series** — depend on the gstack browse binary (compiled from `browse/src/cli.ts` via `bun build --compile`), which this workflow does not build: `browse`, `setup-browser-cookies`, `gstack`, `gstack-upgrade`, `benchmark`, `benchmark-models`, `canary`, `open-gstack-browser`.
   2. **Design binary series** — the design binary (`design/dist/design`, compiled from `design/src/cli.ts`) and make-pdf binary (`make-pdf/dist/pdf`) are not built, and the skills that depend on them are skipped entirely: `design-consultation`, `design-review`, `design-shotgun`, `design-html`, `make-pdf`. The design binary provides AI-powered mockup generation (image generation via OpenAI API, vision quality gates, design token extraction, comparison boards with HTTP server); without it these skills have limited utility.
   3. **Platform-specific deploy series** — assume a live web app, a CI/CD pipeline, and a specific platform (Fly.io / Render / Vercel / Netlify / Heroku / GitHub Actions): `setup-deploy`, `land-and-deploy`.
   4. **Gbrains series** — depend on the gstack gbrain CLI (PGLite / Supabase / MCP), an external cross-session memory system this project does not use: `setup-gbrain`, `sync-gbrain`.
   5. In addition, `claude` is skipped because this project runs on Claude Code (Kilo) directly and has no second AI to invoke.

3. Patch the gstack source so `bun run gen:skill-docs --host codex` produces output that requires no post-generation tuning. Pre-patched copies live in `.agents/workflows/install-gstack/`. Overwrite the corresponding gstack source files:

   ```bash
   cp -f .agents/workflows/install-gstack/hosts/codex.ts .context/gstack/hosts/codex.ts
   cp -f .agents/workflows/install-gstack/scripts/gen-skill-docs.ts .context/gstack/scripts/gen-skill-docs.ts
   cp -f .agents/workflows/install-gstack/scripts/resolvers/codex-helpers.ts .context/gstack/scripts/resolvers/codex-helpers.ts
   cp -f .agents/workflows/install-gstack/scripts/resolvers/preamble.ts .context/gstack/scripts/resolvers/preamble.ts
   cp -f .agents/workflows/install-gstack/scripts/resolvers/preamble/generate-preamble-bash.ts .context/gstack/scripts/resolvers/preamble/generate-preamble-bash.ts
   cp -f .agents/workflows/install-gstack/scripts/resolvers/preamble/generate-completion-status.ts .context/gstack/scripts/resolvers/preamble/generate-completion-status.ts
   cp -f .agents/workflows/install-gstack/scripts/resolvers/preamble/generate-search-before-building.ts .context/gstack/scripts/resolvers/preamble/generate-search-before-building.ts
   cp -f .agents/workflows/install-gstack/scripts/resolvers/preamble/generate-writing-style-migration.ts .context/gstack/scripts/resolvers/preamble/generate-writing-style-migration.ts
   ```

4. Install npm dependencies and generate skill docs using the codex host (which outputs to `.agents/skills/`). Do NOT run `./setup` or `bun run build` — those compile browse binaries and install Playwright, which this project does not need.

```bash
cd .context/gstack
bun install
bun run gen:skill-docs --host codex
cd ../..
```

5. Delete the old local Gstack skill directories. Do not use `*`; list every path explicitly.

```bash
rm -rf .agents/skills/autoplan
# Skipped: benchmark
# Skipped: benchmark-models
# Skipped: browse
# Skipped: canary
rm -rf .agents/skills/careful
# Skipped: claude
rm -rf .agents/skills/context-restore
rm -rf .agents/skills/context-save
rm -rf .agents/skills/cso
# Skipped: design-consultation
# Skipped: design-html
# Skipped: design-review
# Skipped: design-shotgun
rm -rf .agents/skills/devex-review
rm -rf .agents/skills/document-generate
rm -rf .agents/skills/document-release
rm -rf .agents/skills/freeze
# Skipped: gstack
# Skipped: gstack-upgrade
rm -rf .agents/skills/guard
rm -rf .agents/skills/health
rm -rf .agents/skills/investigate
rm -rf .agents/skills/ios-clean
rm -rf .agents/skills/ios-design-review
rm -rf .agents/skills/ios-fix
rm -rf .agents/skills/ios-qa
rm -rf .agents/skills/ios-sync
# Skipped: land-and-deploy
rm -rf .agents/skills/landing-report
rm -rf .agents/skills/learn
# Skipped: make-pdf
rm -rf .agents/skills/office-hours
# Skipped: open-gstack-browser
rm -rf .agents/skills/pair-agent
rm -rf .agents/skills/plan-ceo-review
rm -rf .agents/skills/plan-design-review
rm -rf .agents/skills/plan-devex-review
rm -rf .agents/skills/plan-eng-review
rm -rf .agents/skills/plan-tune
rm -rf .agents/skills/qa
rm -rf .agents/skills/qa-only
rm -rf .agents/skills/retro
rm -rf .agents/skills/review
rm -rf .agents/skills/scrape
# Skipped: setup-browser-cookies
# Skipped: setup-deploy
# Skipped: setup-gbrain
rm -rf .agents/skills/ship
rm -rf .agents/skills/skillify
rm -rf .agents/skills/spec
# Skipped: sync-gbrain
rm -rf .agents/skills/unfreeze
```

6. Copy the new Gstack skill directories into `.agents/skills`. Do not use `*`; list every path explicitly.

```bash
mkdir -p .agents/skills
cp -R .context/gstack/.agents/skills/autoplan .agents/skills/autoplan
# Skipped: benchmark
# Skipped: benchmark-models
# Skipped: browse
# Skipped: canary
cp -R .context/gstack/.agents/skills/careful .agents/skills/careful
# Skipped: claude
cp -R .context/gstack/.agents/skills/context-restore .agents/skills/context-restore
cp -R .context/gstack/.agents/skills/context-save .agents/skills/context-save
cp -R .context/gstack/.agents/skills/cso .agents/skills/cso
# Skipped: design-consultation
# Skipped: design-html
# Skipped: design-review
# Skipped: design-shotgun
cp -R .context/gstack/.agents/skills/devex-review .agents/skills/devex-review
cp -R .context/gstack/.agents/skills/document-generate .agents/skills/document-generate
cp -R .context/gstack/.agents/skills/document-release .agents/skills/document-release
cp -R .context/gstack/.agents/skills/freeze .agents/skills/freeze
# Skipped: gstack
# Skipped: gstack-upgrade
cp -R .context/gstack/.agents/skills/guard .agents/skills/guard
cp -R .context/gstack/.agents/skills/health .agents/skills/health
cp -R .context/gstack/.agents/skills/investigate .agents/skills/investigate
cp -R .context/gstack/.agents/skills/ios-clean .agents/skills/ios-clean
cp -R .context/gstack/.agents/skills/ios-design-review .agents/skills/ios-design-review
cp -R .context/gstack/.agents/skills/ios-fix .agents/skills/ios-fix
cp -R .context/gstack/.agents/skills/ios-qa .agents/skills/ios-qa
cp -R .context/gstack/.agents/skills/ios-sync .agents/skills/ios-sync
# Skipped: land-and-deploy
cp -R .context/gstack/.agents/skills/landing-report .agents/skills/landing-report
cp -R .context/gstack/.agents/skills/learn .agents/skills/learn
# Skipped: make-pdf
cp -R .context/gstack/.agents/skills/office-hours .agents/skills/office-hours
# Skipped: open-gstack-browser
cp -R .context/gstack/.agents/skills/pair-agent .agents/skills/pair-agent
cp -R .context/gstack/.agents/skills/plan-ceo-review .agents/skills/plan-ceo-review
cp -R .context/gstack/.agents/skills/plan-design-review .agents/skills/plan-design-review
cp -R .context/gstack/.agents/skills/plan-devex-review .agents/skills/plan-devex-review
cp -R .context/gstack/.agents/skills/plan-eng-review .agents/skills/plan-eng-review
cp -R .context/gstack/.agents/skills/plan-tune .agents/skills/plan-tune
cp -R .context/gstack/.agents/skills/qa .agents/skills/qa
cp -R .context/gstack/.agents/skills/qa-only .agents/skills/qa-only
cp -R .context/gstack/.agents/skills/retro .agents/skills/retro
cp -R .context/gstack/.agents/skills/review .agents/skills/review
cp -R .context/gstack/.agents/skills/scrape .agents/skills/scrape
# Skipped: setup-browser-cookies
# Skipped: setup-deploy
# Skipped: setup-gbrain
cp -R .context/gstack/.agents/skills/ship .agents/skills/ship
cp -R .context/gstack/.agents/skills/skillify .agents/skills/skillify
cp -R .context/gstack/.agents/skills/spec .agents/skills/spec
# Skipped: sync-gbrain
cp -R .context/gstack/.agents/skills/unfreeze .agents/skills/unfreeze
```

7. Wait for human review.

## Tuning

The gstack source patches in Step 2 eliminate the following at generation time, so no post-generation editing is needed for them:

- **Preamble bash block:** hardcoded defaults instead of `gstack-config get`, `gstack-update-check`, `gstack-repo-mode`, `gstack-session-kind`, `gstack-slug`, `~/.gstack/sessions/`, `~/.gstack/analytics/`, `$GSTACK_ROOT`/`$GSTACK_BIN`/`$GSTACK_BROWSE`/`$GSTACK_DESIGN` initialization, `_VENDORED` detection
- **Onboarding prompts:** lake intro, telemetry opt-in, proactive suggestion, routing injection, vendoring deprecation, writing-style migration — all skipped at generation time
- **Brain/artifacts sync:** brain health instruction, brain sync block, gbrain context/recovery — all skipped at generation time
- **Telemetry/completion:** timeline-log, telemetry-log, analytics JSONL, learnings-log, eureka.jsonl — all removed from completion-status and search-before-building generators at generation time
- **Body-level resolvers:** `GBRAIN_CONTEXT_LOAD`, `GBRAIN_SAVE_RESULTS`, `LEARNINGS_LOG`, `LEARNINGS_SEARCH`, `BRAIN_PREFLIGHT`, `BRAIN_CACHE_REFRESH`, `BRAIN_WRITE_BACK` — all suppressed in the codex host config

These remaining references may still appear in generated SKILL.md files and need post-generation tuning:

1. **Body-level `$GSTACK_ROOT` and `$GSTACK_BIN` references** — the codex host uses `usesEnvVars: true`, so resolvers that produce body content (not preamble) emit `$GSTACK_ROOT/...` and `$GSTACK_BIN/...` paths. Since the preamble no longer initializes these variables, any body reference to them is a dead path. Tuning must remove or rewrite these. This includes:

   - `$GSTACK_ROOT/ETHOS.md` (in search-before-building prose)
   - `$GSTACK_ROOT/scripts/jargon-list.json` (in writing-style prose)
   - `$GSTACK_ROOT/bin/gstack-review-log` / `gstack-review-read` / `gstack-decision-log` / `gstack-decision-search` (in context-recovery, which is already skipped, but also in skill body sections)
   - `$GSTACK_ROOT/bin/gstack-builder-profile` / `gstack-developer-profile` (in resource sections)
   - `$GSTACK_ROOT/bin/gstack-redact` / `gstack-pr-title-rewrite.sh` (in ship skill)
   - `$GSTACK_ROOT/bin/gstack-diff-scope` / `gstack-global-discover` (in review/retro skills)
   - `$GSTACK_ROOT/browse/bin/remote-slug` (in plan-ceo-review, plan-eng-review)
   - `$GSTACK_BIN/gstack-config get/set` in body prose (e.g. explain_level, telemetry, routing prompts)
   - `$GSTACK_BIN/gstack-question-preference` / `gstack-question-log` (in question-tuning section)
   - `$GSTACK_BIN/gstack-learnings-log` / `gstack-learnings-search` in body sections
   - `$GSTACK_BIN/gstack-brain-sync` / `gstack-brain-cache` in body sections

2. **Body-level `$GSTACK_BROWSE` and `$GSTACK_DESIGN` references** — the browse and design binaries are not built. References like `$B` / `$D` / `[ -z "$B" ] && B="$HOME$GSTACK_BROWSE/browse"` need rewriting to assume `BROWSE_NOT_AVAILABLE` and `DESIGN_NOT_AVAILABLE`.

3. **`~/.gstack/` writes in body prose** — some body sections instruct the agent to write to `~/.gstack/projects/` or touch files under `~/.gstack/`. These must be removed.

4. **Tier-1 skill analytics snippets** — skills like `careful`, `freeze`, `guard`, `unfreeze` have inline `mkdir -p ~/.gstack/analytics` + `echo '...' >> ~/.gstack/analytics/skill-usage.jsonl` blocks that are not generated by the preamble system. These must be removed individually.

All tuning must stay within these specified project-local skills under `.agents/skills`. Tune slowly in reviewable tuning steps; do not solve every dead reference in one pass. Each tuning step must have a single theme, a small diff, a verification grep, and a human review checkpoint before the next tuning step starts.

Use this tuning-step standard:

- **Single theme:** each tuning step removes one dependency family only.
- **Explicit boundary:** before editing, state which references are in scope and which are deferred.
- **No opportunistic cleanup:** if a reference belongs to a later tuning step, leave it for that tuning step.
- **Verification:** after each tuning step, grep for that tuning step's exact keywords and report remaining references.
- **Human review:** wait for review before starting the next tuning step.

1. Tuning 1 — Tier-1 skill analytics snippets.

   Remove the inline `mkdir -p ~/.gstack/analytics` + `echo '...' >> ~/.gstack/analytics/skill-usage.jsonl` blocks from the four tier-1 skills that embed them directly (not via preamble): `careful`, `freeze`, `guard`, `unfreeze`. Also remove any `~/.gstack/` state references from these files (e.g. `gstack-paths` in `unfreeze`).

2. Tuning 2 — Body-level `$GSTACK_ROOT` / `$GSTACK_BIN` dead-path references.

   Remove or rewrite all remaining `$GSTACK_ROOT/...` and `$GSTACK_BIN/...` references in generated skill bodies. Since the preamble no longer initializes `$GSTACK_ROOT` or `$GSTACK_BIN`, every such reference is a dead path. Classify and handle each group:

   - `$GSTACK_ROOT/ETHOS.md` — remove the pointer or replace with a generic "search before building" instruction
   - `$GSTACK_ROOT/scripts/jargon-list.json` — remove the pointer
   - `$GSTACK_ROOT/bin/*` — remove the call or replace with a prose fallback
   - `$GSTACK_BIN/gstack-config get/set` — replace with invocation-local defaults
   - `$GSTACK_BIN/gstack-question-*` — remove or replace with prose
   - `$GSTACK_BIN/gstack-learnings-*` — remove or replace with prose
   - `$GSTACK_BIN/gstack-brain-*` — remove
   - `$GSTACK_ROOT/browse/bin/remote-slug` — remove or replace with `basename "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`

3. Tuning 3 — Design/browse binary references.

   Handle `$GSTACK_BROWSE/browse`, `$GSTACK_DESIGN/design`, `$B`, `$D`, and their setup blocks. Assume `BROWSE_NOT_AVAILABLE` and `DESIGN_NOT_AVAILABLE`; use HTML/file-path fallback or `open file://...` where appropriate.

4. Tuning 4 — Remaining `~/.gstack/` writes in body prose.

   Remove any remaining instructions that write to `~/.gstack/projects/`, `~/.gstack/analytics/`, or touch files under `~/.gstack/`.

5. Tuning 5 — Classification and final sweep.

   Before editing more, grep for any remaining `$GSTACK_`, `gstack-`, or `~/.gstack` references across all installed skills. Classify each remaining reference and handle it or document why it is safe to keep.

6. Record the project Gstack tuning.

Do not globally rewrite the installed skills for this step. Update the project's skill configuration file so the skill system knows this project's tuned Gstack setup.

This workflow installs these 40 Gstack skills (the rest of the generated set is skipped, see below):

- `autoplan`
- `careful`
- `context-restore`
- `context-save`
- `cso`
- `design-consultation`
- `design-html`
- `design-review`
- `design-shotgun`
- `devex-review`
- `document-generate`
- `document-release`
- `freeze`
- `guard`
- `health`
- `investigate`
- `ios-clean`
- `ios-design-review`
- `ios-fix`
- `ios-qa`
- `ios-sync`
- `landing-report`
- `learn`
- `make-pdf`
- `office-hours`
- `pair-agent`
- `plan-ceo-review`
- `plan-design-review`
- `plan-devex-review`
- `plan-eng-review`
- `plan-tune`
- `qa`
- `qa-only`
- `retro`
- `review`
- `scrape`
- `ship`
- `skillify`
- `spec`
- `unfreeze`

This workflow skips these 13 Gstack skills, organized into four main groups:

1. **Browse series** — depend on the gstack browse binary (compiled from `browse/src/cli.ts` via `bun build --compile`), which this workflow does not build: `browse`, `setup-browser-cookies`, `gstack`, `gstack-upgrade`, `benchmark`, `benchmark-models`, `canary`, `open-gstack-browser`.
2. **Design binary series** — the design binary (`design/dist/design`, compiled from `design/src/cli.ts`) and make-pdf binary (`make-pdf/dist/pdf`) are not built. Skills that reference them (`design-consultation`, `design-review`, `design-shotgun`, `design-html`, `make-pdf`) are installed anyway because they have fallback behavior when the binary is absent (`DESIGN_NOT_AVAILABLE` → skip visual mockup generation, fall back to HTML wireframe). The design binary provides AI-powered mockup generation (image generation via OpenAI API, vision quality gates, design token extraction, comparison boards with HTTP server); without it these skills still work but produce text/HTML output only.
3. **Platform-specific deploy series** — assume a live web app, a CI/CD pipeline, and a specific platform (Fly.io / Render / Vercel / Netlify / Heroku / GitHub Actions): `setup-deploy`, `land-and-deploy`.
4. **Gbrains series** — depend on the gstack gbrain CLI (PGLite / Supabase / MCP), an external cross-session memory system this project does not use: `setup-gbrain`, `sync-gbrain`.

In addition, `claude` is skipped because this project runs on Claude Code (Kilo) directly and has no second AI to invoke.

The project intentionally skips these Gstack runtime capabilities (eliminated at generation time by source patches):

- `gstack-config get/set` — no persistent config; Preamble uses hardcoded defaults
- `gstack-update-check` — this project uses the install-gstack workflow, not the inline upgrade flow
- `gstack-telemetry-log` — no remote telemetry
- `gstack-timeline-log` — no session timeline
- `~/.gstack/analytics/` — no local analytics writes
- `~/.gstack/sessions/` — no session tracking
- `gstack-repo-mode` / `gstack-session-kind` — hardcoded to `unknown` / `interactive`
- `gstack-slug` — no slug resolution; `$SLUG` is unset
- `gstack-learnings-log` / `gstack-learnings-search` — no learnings persistence (suppressed resolver)
- `gstack-brain-sync` / `gstack-brain-cache` — no brain sync (suppressed resolver)
- `gstack-question-preference` / `gstack-question-log` — no question tuning persistence
- Onboarding prompts (lake intro, telemetry, proactive, routing, vendoring, writing-style migration) — all skipped at generation time

7. Wait for human review.
