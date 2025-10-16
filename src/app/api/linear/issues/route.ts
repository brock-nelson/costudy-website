import { NextRequest, NextResponse } from 'next/server';
import { getIssues, createIssue, getTeams } from '@/lib/linear';

export async function GET() {
  try {
    const issues = await getIssues();

    const formattedIssues = await Promise.all(
      issues.map(async (issue) => {
        const state = await issue.state;
        const assignee = await issue.assignee;
        return {
          id: issue.id,
          identifier: issue.identifier,
          title: issue.title,
          description: issue.description,
          state: state?.name,
          priority: issue.priority,
          assignee: assignee?.name,
          createdAt: issue.createdAt,
          updatedAt: issue.updatedAt,
          url: issue.url,
        };
      })
    );

    return NextResponse.json({
      success: true,
      issues: formattedIssues,
    });
  } catch (error) {
    console.error('Error fetching Linear issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, teamId, priority } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // If no teamId provided, get the first team
    let targetTeamId = teamId;
    if (!targetTeamId) {
      const teams = await getTeams();
      if (teams.length === 0) {
        return NextResponse.json(
          { error: 'No teams found in Linear workspace' },
          { status: 400 }
        );
      }
      targetTeamId = teams[0].id;
    }

    const issue = await createIssue({
      title,
      description,
      teamId: targetTeamId,
      priority: priority || 0,
    });

    return NextResponse.json({
      success: true,
      issue: {
        id: issue?.id,
        identifier: issue?.identifier,
        title: issue?.title,
        url: issue?.url,
      },
    });
  } catch (error) {
    console.error('Error creating Linear issue:', error);
    return NextResponse.json(
      { error: 'Failed to create issue' },
      { status: 500 }
    );
  }
}
