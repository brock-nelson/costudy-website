import { LinearClient } from '@linear/sdk';

if (!process.env.LINEAR_API_KEY) {
  console.warn('⚠️ LINEAR_API_KEY not set. Linear integration will not work.');
}

export const linear = process.env.LINEAR_API_KEY
  ? new LinearClient({ apiKey: process.env.LINEAR_API_KEY })
  : null;

/**
 * Get all issues for the workspace
 */
export async function getIssues() {
  if (!linear) throw new Error('Linear client not initialized');

  const issues = await linear.issues();
  return issues.nodes;
}

/**
 * Get issue by ID
 */
export async function getIssue(issueId: string) {
  if (!linear) throw new Error('Linear client not initialized');

  return await linear.issue(issueId);
}

/**
 * Create a new issue
 */
export async function createIssue({
  title,
  description,
  teamId,
  priority = 0,
  labels,
}: {
  title: string;
  description?: string;
  teamId: string;
  priority?: number;
  labels?: string[];
}) {
  if (!linear) throw new Error('Linear client not initialized');

  const payload: {
    title: string;
    description?: string;
    teamId: string;
    priority: number;
    labelIds?: string[];
  } = {
    title,
    description,
    teamId,
    priority,
  };

  if (labels && labels.length > 0) {
    payload.labelIds = labels;
  }

  const issuePayload = await linear.createIssue(payload);
  return await issuePayload.issue;
}

/**
 * Update an issue
 */
export async function updateIssue(
  issueId: string,
  data: {
    title?: string;
    description?: string;
    stateId?: string;
    priority?: number;
    assigneeId?: string;
  }
) {
  if (!linear) throw new Error('Linear client not initialized');

  return await linear.updateIssue(issueId, data);
}

/**
 * Add comment to issue
 */
export async function addComment(issueId: string, body: string) {
  if (!linear) throw new Error('Linear client not initialized');

  return await linear.createComment({
    issueId,
    body,
  });
}

/**
 * Get all teams
 */
export async function getTeams() {
  if (!linear) throw new Error('Linear client not initialized');

  const teams = await linear.teams();
  return teams.nodes;
}

/**
 * Get workflow states for a team
 */
export async function getWorkflowStates(teamId: string) {
  if (!linear) throw new Error('Linear client not initialized');

  const team = await linear.team(teamId);
  const states = await team.states();
  return states.nodes;
}

/**
 * Search for issue by identifier (e.g., "COS-123")
 */
export async function findIssueByIdentifier(identifier: string) {
  if (!linear) throw new Error('Linear client not initialized');

  const issues = await linear.issues({
    filter: {
      number: { eq: parseInt(identifier.split('-')[1]) },
    },
  });

  return issues.nodes[0];
}

/**
 * Transition issue based on PR status
 */
export async function transitionIssueFromPR(
  identifier: string,
  prAction: 'opened' | 'closed' | 'merged'
) {
  if (!linear) throw new Error('Linear client not initialized');

  const issue = await findIssueByIdentifier(identifier);
  if (!issue) return null;

  const team = await issue.team;
  const states = await team?.states();

  if (!states) return null;

  let targetState;

  switch (prAction) {
    case 'opened':
      // Move to "In Progress" or "In Review"
      targetState = states.nodes.find(
        (s) => s.name === 'In Review' || s.name === 'In Progress'
      );
      break;
    case 'merged':
      // Move to "Done" or "Completed"
      targetState = states.nodes.find(
        (s) => s.name === 'Done' || s.name === 'Completed'
      );
      break;
    case 'closed':
      // Move to "Cancelled" or back to "Todo"
      targetState = states.nodes.find(
        (s) => s.name === 'Cancelled' || s.name === 'Todo'
      );
      break;
  }

  if (targetState) {
    await updateIssue(issue.id, { stateId: targetState.id });
  }

  return issue;
}
