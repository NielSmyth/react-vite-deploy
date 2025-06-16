import { sendPasswordResetEmail } from '@/lib/auth/reset-password';
import { db } from '@/lib/db';

describe('sendPasswordResetEmail', () => {
  it('creates a reset token for valid email', async () => {
    // Setup test user
    await db.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed_password',
      },
    });

    await sendPasswordResetEmail('test@example.com');
    
    const token = await db.passwordResetToken.findFirst();
    expect(token).toBeDefined();
  });
});