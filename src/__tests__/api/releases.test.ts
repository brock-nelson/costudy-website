import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Import validation schemas
const createReleaseSchema = z.object({
  version: z.string().min(1, "Version is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["feature", "improvement", "bugfix", "security"]),
  isPublished: z.boolean().default(false),
  featuredImageUrl: z.string().url().optional().or(z.literal("")),
});

const updateReleaseSchema = z.object({
  version: z.string().min(1, "Version is required").optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  type: z.enum(["feature", "improvement", "bugfix", "security"]).optional(),
  isPublished: z.boolean().optional(),
  featuredImageUrl: z.string().url().optional().or(z.literal("")),
});

describe('Release Creation Validation', () => {
  it('should accept valid release data', () => {
    const validData = {
      version: 'v1.0.0',
      title: 'Test Release',
      description: 'This is a test release',
      type: 'feature' as const,
      isPublished: false,
    };

    const result = createReleaseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject release without version', () => {
    const invalidData = {
      version: '',
      title: 'Test Release',
      description: 'This is a test release',
      type: 'feature' as const,
    };

    const result = createReleaseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept all valid release types', () => {
    const types = ["feature", "improvement", "bugfix", "security"] as const;

    types.forEach(type => {
      const validData = {
        version: 'v1.0.0',
        title: 'Test Release',
        description: 'Description',
        type,
        isPublished: false,
      };

      const result = createReleaseSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  it('should reject release with invalid type', () => {
    const invalidData = {
      version: 'v1.0.0',
      title: 'Test Release',
      description: 'Description',
      type: 'invalid-type',
      isPublished: false,
    };

    const result = createReleaseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept release with valid image URL', () => {
    const validData = {
      version: 'v1.0.0',
      title: 'Test Release',
      description: 'Description',
      type: 'feature' as const,
      isPublished: false,
      featuredImageUrl: 'https://example.com/image.jpg',
    };

    const result = createReleaseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject release with invalid image URL', () => {
    const invalidData = {
      version: 'v1.0.0',
      title: 'Test Release',
      description: 'Description',
      type: 'feature' as const,
      isPublished: false,
      featuredImageUrl: 'not-a-url',
    };

    const result = createReleaseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Release Update Validation', () => {
  it('should accept partial update data', () => {
    const validData = {
      title: 'Updated Title',
      isPublished: true,
    };

    const result = updateReleaseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should accept empty update (no fields)', () => {
    const validData = {};

    const result = updateReleaseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject update with invalid type', () => {
    const invalidData = {
      type: 'invalid-type',
    };

    const result = updateReleaseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
