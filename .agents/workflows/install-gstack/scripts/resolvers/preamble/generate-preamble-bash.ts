import type { TemplateContext } from '../types';

export function generatePreambleBash(ctx: TemplateContext): string {
  return `## Preamble (run first)

\`\`\`bash
_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
echo "BRANCH: $_BRANCH"
_PROACTIVE="true"
_SKILL_PREFIX="false"
echo "PROACTIVE: $_PROACTIVE"
echo "SKILL_PREFIX: $_SKILL_PREFIX"
REPO_MODE=\${REPO_MODE:-unknown}
echo "REPO_MODE: $REPO_MODE"
_SESSION_KIND="interactive"
echo "SESSION_KIND: $_SESSION_KIND"
_TEL="off"
_TEL_START=$(date +%s)
_SESSION_ID="$$-$(date +%s)"
echo "TELEMETRY: off"
_EXPLAIN_LEVEL="default"
echo "EXPLAIN_LEVEL: $_EXPLAIN_LEVEL"
_QUESTION_TUNING="false"
echo "QUESTION_TUNING: $_QUESTION_TUNING"
_ROUTING_DECLINED="false"
echo "HAS_ROUTING: no"
echo "ROUTING_DECLINED: $_ROUTING_DECLINED"
echo "MODEL_OVERLAY: ${ctx.model ?? 'none'}"
_CHECKPOINT_MODE="explicit"
_CHECKPOINT_PUSH="false"
echo "CHECKPOINT_MODE: $_CHECKPOINT_MODE"
echo "CHECKPOINT_PUSH: $_CHECKPOINT_PUSH"
if [ -n "\${CLAUDE_PLAN_FILE:-}\${GSTACK_PLAN_MODE_FORCE:-}" ]; then
  export GSTACK_PLAN_MODE="active"
elif [ "\${GSTACK_PLAN_MODE:-}" = "active" ]; then
  export GSTACK_PLAN_MODE="active"
else
  export GSTACK_PLAN_MODE="inactive"
fi
echo "GSTACK_PLAN_MODE: $GSTACK_PLAN_MODE"
\`\`\``;
}
