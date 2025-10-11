import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Import validation schemas
const createFeatureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["proposed", "approved", "in-progress", "completed", "declined"]).default("proposed"),
  category: z.string().optional(),
  isUserSubmitted: z.boolean().default(false),
  submitterEmail: z.string().email().optional().or(z.literal("")),
  submitterName: z.string().optional(),
});

const voteSchema = z.object({
  featureId: z.string().uuid(),
  userEmail: z.string().email(),
  userName: z.string().optional(),
});

describe('Feature Creation Validation', () => {
  it('should accept valid feature data', () => {
    const validData = {
      title: 'Test Feature',
      description: 'This is a test feature description',
      status: 'proposed' as const,
      category: 'Testing',
      isUserSubmitted: false,
    };

    const result = createFeatureSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject feature without title', () => {
    const invalidData = {
      title: '',
      description: 'This is a test feature description',
      status: 'proposed' as const,
    };

    const result = createFeatureSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject feature without description', () => {
    const invalidData = {
      title: 'Test Feature',
      description: '',
      status: 'proposed' as const,
    };

    const result = createFeatureSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept feature with valid status values', () => {
    const statuses = ["proposed", "approved", "in-progress", "completed", "declined"] as const;

    statuses.forEach(status => {
      const validData = {
        title: 'Test Feature',
        description: 'Description',
        status,
      };

      const result = createFeatureSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  it('should reject feature with invalid status', () => {
    const invalidData = {
      title: 'Test Feature',
      description: 'Description',
      status: 'invalid-status',
    };

    const result = createFeatureSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Feature Voting Validation', () => {
  it('should accept valid vote data', () => {
    const validData = {
      featureId: '123e4567-e89b-12d3-a456-426614174000',
      userEmail: 'user@example.com',
      userName: 'John Doe',
    };

    const result = voteSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject vote with invalid UUID', () => {
    const invalidData = {
      featureId: 'not-a-uuid',
      userEmail: 'user@example.com',
    };

    const result = voteSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject vote with invalid email', () => {
    const invalidData = {
      featureId: '123e4567-e89b-12d3-a456-426614174000',
      userEmail: 'not-an-email',
    };

    const result = voteSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept vote without optional userName', () => {
    const validData = {
      featureId: '123e4567-e89b-12d3-a456-426614174000',
      userEmail: 'user@example.com',
    };

    const result = voteSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
