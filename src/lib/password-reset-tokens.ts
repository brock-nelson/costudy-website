// In-memory store for password reset tokens
// In production, these should be stored in the database with expiration
export const passwordResetTokens = new Map<string, { userId: string; expires: number }>();

// Clean up expired tokens periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of passwordResetTokens.entries()) {
    if (data.expires < now) {
      passwordResetTokens.delete(token);
    }
  }
}, 60000); // Clean every minute
