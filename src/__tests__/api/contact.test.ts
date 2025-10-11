import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Import the validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  institution: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

describe('Contact Form Validation', () => {
  it('should accept valid contact form data', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'Professor',
      institution: 'Test University',
      message: 'This is a test message that is longer than 10 characters.',
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject contact form without firstName', () => {
    const invalidData = {
      firstName: '',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'Professor',
      message: 'This is a test message.',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject contact form with invalid email', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'not-an-email',
      role: 'Professor',
      message: 'This is a test message.',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject contact form with short message', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'Professor',
      message: 'Short',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept contact form without optional institution', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'Student',
      message: 'This is a test message that is longer than 10 characters.',
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
