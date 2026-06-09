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

2. Patch the gstack source to remove `gstack-` skill name prefix and OpenAI metadata.

   a. In `.context/gstack/scripts/gen-skill-docs.ts`, find the `externalSkillName` function and replace its body so it no longer adds a `gstack-` prefix:

   ```typescript
   // BEFORE:
   function externalSkillName(skillDir: string, frontmatterName?: string): string {
     if (skillDir === '.' || skillDir === '') return 'gstack';
     const baseName = frontmatterName && frontmatterName !== skillDir ? frontmatterName : skillDir;
     if (baseName.startsWith('gstack-')) return baseName;
     return `gstack-${baseName}`;
   }

   // AFTER:
   function externalSkillName(skillDir: string, frontmatterName?: string): string {
     if (skillDir === '.' || skillDir === '') return 'gstack';
     const baseName = frontmatterName && frontmatterName !== skillDir ? frontmatterName : skillDir;
     return baseName;
   }
   ```

   b. In `.context/gstack/scripts/resolvers/codex-helpers.ts`, find the `externalSkillName` function and replace its body the same way:

   ```typescript
   // BEFORE:
   export function externalSkillName(skillDir: string): string {
     if (skillDir === '.' || skillDir === '') return 'gstack';
     if (skillDir.startsWith('gstack-')) return skillDir;
     return `gstack-${skillDir}`;
   }

   // AFTER:
   export function externalSkillName(skillDir: string): string {
     if (skillDir === '.' || skillDir === '') return 'gstack';
     return skillDir;
   }
   ```

   c. In `.context/gstack/hosts/codex.ts`, set `generateMetadata` to `false` to skip generating `agents/openai.yaml`:

   ```typescript
   // BEFORE:
   generation: {
     generateMetadata: true,
     metadataFormat: 'openai.yaml',
     skipSkills: ['codex'],
   },

   // AFTER:
   generation: {
     generateMetadata: false,
     metadataFormat: 'openai.yaml',
     skipSkills: ['codex'],
   },
   ```

3. Install npm dependencies and generate skill docs using the codex host (which outputs to `.agents/skills/`). Do NOT run `./setup` or `bun run build` — those compile browse binaries and install Playwright, which this project does not need.

```bash
cd .context/gstack
bun install
bun run gen:skill-docs --host codex
cd ../..
```

4. Delete the old local Gstack skill directories. Do not use `*`; list every path explicitly.

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
rm -rf .agents/skills/design-consultation
rm -rf .agents/skills/design-html
rm -rf .agents/skills/design-review
rm -rf .agents/skills/design-shotgun
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
rm -rf .agents/skills/make-pdf
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

5. Copy the new Gstack skill directories into `.agents/skills`. Do not use `*`; list every path explicitly.

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
cp -R .context/gstack/.agents/skills/design-consultation .agents/skills/design-consultation
cp -R .context/gstack/.agents/skills/design-html .agents/skills/design-html
cp -R .context/gstack/.agents/skills/design-review .agents/skills/design-review
cp -R .context/gstack/.agents/skills/design-shotgun .agents/skills/design-shotgun
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
cp -R .context/gstack/.agents/skills/make-pdf .agents/skills/make-pdf
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

6. Wait for human review.

## TODO

- Fold the `claude` skill's functionality (independent Claude Code CLI review, challenge, and consult modes) into the relevant existing skills (`review`, `plan-eng-review`, `plan-ceo-review`, etc.) so the workflow does not depend on a standalone `claude` skill. The `claude` skill is currently skipped because this project runs on Claude Code (Kilo) directly and has no second AI to invoke; the underlying capability is correct, but its packaging as a separate skill is not.
- Fold the `benchmark-models` skill's functionality (cross-model comparison across Claude, GPT, Gemini) into the relevant existing skills (`qa`, `review`, etc.) so the workflow does not depend on a standalone `benchmark-models` skill. The `benchmark-models` skill is currently skipped because this project runs only Claude (Kilo) and has no second or third model to compare against; the underlying capability is correct, but its packaging as a separate skill is not.

## Tuning

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

This workflow skips these 13 Gstack skills, organized into three main groups:

1. **Browse series** — depend on the gstack browse binary, which this workflow does not install: `browse`, `setup-browser-cookies`, `gstack`, `gstack-upgrade`, `benchmark`, `benchmark-models`, `canary`, `open-gstack-browser`.
2. **Platform-specific deploy series** — assume a live web app, a CI/CD pipeline, and a specific platform (Fly.io / Render / Vercel / Netlify / Heroku / GitHub Actions): `setup-deploy`, `land-and-deploy`.
3. **Gbrains series** — depend on the gstack gbrain CLI (PGLite / Supabase / MCP), an external cross-session memory system this project does not use: `setup-gbrain`, `sync-gbrain`.

In addition, `claude` is skipped because this project runs on Claude Code (Kilo) directly and has no second AI to invoke (see TODO for the planned fold-in).

All tuning must stay within these specified project-local skills under `.agents/skills`.

1. Remove global Gstack installation path references. This project uses project-local skills under `.agents/skills`, not global skills installed at `~/.claude/skills/gstack/`. Inspect the newly copied skill files and rewrite every reference to `~/.claude/skills/gstack/` (binaries, configs, skill files, upgrade flows) to use the project-local equivalent under `.agents/skills/`. This includes but is not limited to:

   - `~/.claude/skills/gstack/bin/gstack-update-check` — remove update check invocations entirely
   - `~/.claude/skills/gstack/bin/gstack-config` — remove config invocations entirely
   - `~/.claude/skills/gstack/bin/gstack-telemetry-log` — remove telemetry invocations entirely
   - `~/.claude/skills/gstack/bin/gstack-slug` — remove slug invocations entirely
   - `~/.claude/skills/gstack/bin/gstack-review-log` — remove review log invocations entirely
   - `~/.claude/skills/gstack/bin/gstack-learnings-log` — remove learnings log invocations entirely
   - `~/.claude/skills/gstack/bin/gstack-learnings-search` — remove learnings search invocations entirely
   - `~/.claude/skills/gstack/bin/gstack-repo-mode` — remove repo mode invocations entirely
   - `~/.claude/skills/gstack/bin/gstack-diff-scope` — remove diff scope invocations entirely
   - `~/.claude/skills/gstack/gstack-upgrade/SKILL.md` — remove upgrade flow references entirely
   - `~/.claude/skills/gstack/ETHOS.md` — remove ETHOS.md references entirely
   - `~/.claude/skills/gstack/browse/bin/remote-slug` — remove remote slug invocations entirely

2. Remove `~/.gstack/` analytics and state tracking. This project must not write user analytics, session tracking, or state files to the global `~/.gstack/` directory. Inspect the newly copied skill files and remove or rewrite every reference to `~/.gstack/` (analytics, sessions, contributor logs, project data, telemetry state, freeze state). This includes but is not limited to:

   - `~/.gstack/analytics/` — remove all analytics JSONL writes
   - `~/.gstack/sessions/` — remove session tracking
   - `~/.gstack/contributor-logs/` — remove contributor mode
   - `~/.gstack/projects/` — remove project-level state files
   - `~/.gstack/.telemetry-prompted` — remove telemetry prompt state
   - `~/.gstack/.proactive-prompted` — remove proactive prompt state
   - `~/.gstack/.completeness-intro-seen` — remove completeness intro state
   - Freeze state files at `$HOME/.gstack/freeze-dir.txt` — rewrite to use project-local `.agents/freeze-dir.txt` instead

3. Remove onboarding prompts and configuration flows. Inspect the newly copied skill files and remove or rewrite the following interactive onboarding flows that configure global gstack settings:

   - Telemetry opt-in/out prompts (community, anonymous, off options)
   - Proactive suggestion opt-in/out prompts
   - Skill prefix configuration (`/gstack-` prefix)
   - Cross-project learnings opt-in/out prompts
   - Test bootstrap opt-out (`.gstack/no-test-bootstrap`) — rewrite to use project-local `.agents/no-test-bootstrap`
   - Routing rules for `CLAUDE.md` — remove or rewrite for this project's config files
   - Contributor mode and field report filing
   - "Boil the Lake" completeness principle introduction prompts

4. Remove the Gstack update check and upgrade flow. Every gstack skill runs `gstack-update-check` at startup and includes an "Inline upgrade flow" that reads `gstack-upgrade/SKILL.md`. Remove all of these update/upgrade blocks from every skill file.

5. Record the project Gstack tuning in `using-superpowers`.

Do not globally rewrite the installed skills for this step. Only update `.agents/skills/using-superpowers/SKILL.md` so `using-superpowers` knows this project's tuned Gstack setup.

The project intentionally installs and uses these Gstack skills:

- `careful`
- `design-consultation`
- `design-review`
- `document-release`
- `freeze`
- `guard`
- `office-hours`
- `plan-ceo-review`
- `plan-design-review`
- `plan-eng-review`
- `qa`
- `qa-only`
- `retro`
- `review`
- `ship`
- `unfreeze`

The project intentionally skips these Gstack skills:

- `browse`
- `gstack-upgrade`
- `writing-skills`

When a skipped skill is referenced elsewhere, `using-superpowers` should guide the agent to treat that reference according to this project tuning instead of modifying every installed skill file.

6. Wait for human review.
