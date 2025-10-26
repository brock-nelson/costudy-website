import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY!;
const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  // Get team
  const teams = await linear.teams();
  const team = teams.nodes[0];

  // Get backlog state
  const states = await team.states();
  const backlogState = states.nodes.find(s => s.name === 'Backlog' || s.name === 'Todo');

  // Create issue
  const issue = await linear.createIssue({
    teamId: team.id,
    title: 'Implement Low-Latency Fallback Mode for Slow Connections',
    description: `## Problem
Users on slow connections or low-end devices may experience long load times due to our rich animated hero header and background effects. After 6 seconds of loading, we should gracefully fall back to a lightweight mode.

## Solution
Implement a low-latency fallback mode that activates automatically when initial page load exceeds 6 seconds.

### User Experience
When the fallback triggers:
1. Display a friendly message:
   > "**We noticed things are loading a bit slowly. Switching to a faster, streamlined version for you.**"
2. The message should:
   - Appear smoothly with a fade-in animation
   - Stay visible for 2-3 seconds
   - Use friendly, reassuring tone (not an error message)
   - Be accessible (proper ARIA labels)

### Technical Implementation
**Detection Logic:**
- Use \`performance.timing.loadEventEnd - performance.timing.navigationStart\` or Performance Observer
- Trigger fallback if page is not interactive after 6 seconds
- Store preference in localStorage to automatically use lite mode on return visits

**Fallback Mode Changes:**
- **Disable** AnimatedBackground component (all orbs, shapes, particles, geometries)
- **Disable** DynamicDots canvas
- **Simplify** GradientText to static gradient (no animations)
- **Keep** hero text, CTAs, and core content fully functional
- **Use** simple CSS background gradient instead of animated layers
- **Preserve** full responsiveness and accessibility

**Example Implementation:**
\`\`\`tsx
// In layout.tsx or _app.tsx
useEffect(() => {
  const timeout = setTimeout(() => {
    if (!document.readyState.includes('complete')) {
      setLowLatencyMode(true);
      localStorage.setItem('preferLowLatency', 'true');
      showFallbackMessage();
    }
  }, 6000);

  return () => clearTimeout(timeout);
}, []);
\`\`\`

**Feature Flag:**
- Add \`LOW_LATENCY_MODE\` environment variable for manual testing
- Respect user's \`prefers-reduced-motion\` setting (auto-enable lite mode)

### Acceptance Criteria
- [ ] Fallback triggers after exactly 6 seconds if page not interactive
- [ ] Friendly message displays for 2-3 seconds
- [ ] All animations disabled in fallback mode
- [ ] Page remains fully functional (navigation, CTAs work)
- [ ] Preference persists across sessions via localStorage
- [ ] Works on all devices and browsers
- [ ] Performance metrics show <2s load time in fallback mode
- [ ] No console errors in either mode
- [ ] Graceful transitions (no jarring UI shifts)

### Priority: Backlog
This is a quality-of-life improvement for users on slower connections. Not blocking, but valuable for accessibility and user experience.

### Labels
\`enhancement\`, \`performance\`, \`a11y\`
`,
    stateId: backlogState?.id,
    priority: 3, // Medium priority
  });

  const createdIssue = await issue.issue;
  console.log('✅ Created Linear issue:', createdIssue?.identifier);
  console.log('   URL:', createdIssue?.url);
}

main().catch(console.error);
