import type { TemplateContext } from '../types';

export function generatePlanModeInfo(_ctx: TemplateContext): string {
  return `## Plan Mode Safe Operations

In plan mode, allowed because they inform the plan: \`$B\`, \`$D\`, \`codex exec\`/\`codex review\`, writes to \`~/.gstack/\`, writes to the plan file, and \`open\` for generated artifacts.

## Skill Invocation During Plan Mode

If the user invokes a skill in plan mode, the skill takes precedence over generic plan mode behavior. **Treat the skill file as executable instructions, not reference.** Follow it step by step starting from Step 0; the first AskUserQuestion is the workflow entering plan mode, not a violation of it. AskUserQuestion (any variant — \`mcp__*__AskUserQuestion\` or native; see "AskUserQuestion Format → Tool resolution") satisfies plan mode's end-of-turn requirement. If AskUserQuestion is unavailable or a call fails, follow the AskUserQuestion Format failure fallback: \`headless\` → BLOCKED; \`interactive\` → the prose fallback (also satisfies end-of-turn). At a STOP point, stop immediately. Do not continue the workflow or call ExitPlanMode there. Commands marked "PLAN MODE EXCEPTION — ALWAYS RUN" execute. Call ExitPlanMode only after the skill workflow completes, or if the user tells you to cancel the skill or leave plan mode.`;
}

export function generateCompletionStatus(_ctx: TemplateContext): string {
  return `## Completion Status Protocol

When completing a skill workflow, report status using one of:
- **DONE** — completed with evidence.
- **DONE_WITH_CONCERNS** — completed, but list concerns.
- **BLOCKED** — cannot proceed; state blocker and what was tried.
- **NEEDS_CONTEXT** — missing info; state exactly what is needed.

Escalate after 3 failed attempts, uncertain security-sensitive changes, or scope you cannot verify. Format: \`STATUS\`, \`REASON\`, \`ATTEMPTED\`, \`RECOMMENDATION\`.

## Plan Status Footer

Skills that run plan reviews (\`/plan-*-review\`, \`/codex review\`) include the EXIT PLAN MODE GATE blocking checklist at the end of the skill, which verifies the plan file ends with \`## GSTACK REVIEW REPORT\` before ExitPlanMode is called. Skills that don't run plan reviews (operational skills like \`/ship\`, \`/qa\`, \`/review\`) typically don't operate in plan mode and have no review report to verify; this footer is a no-op for them. Writing the plan file is the one edit allowed in plan mode.`;
}
