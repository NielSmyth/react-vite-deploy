import request from 'supertest';
import { app } from '../src/app'; // Change this path to where your Express app is actually exported
import { db } from '../src/lib/db';
import bcrypt from 'bcryptjs';

beforeAll(async () => {
  await db.$connect();
});

afterAll(async () => {
  await db.$disconnect();
});

describe('Authentication', () => {
  beforeEach(async () => {
    // Clear test data
    await db.user.deleteMany();
    
    // Create test user
    const hashedPassword = await bcrypt.hash('Test@1234', 10);
    await db.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'USER',
      },
    });
  });

  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/callback/credentials')
      .send({
        email: 'test@example.com',
        password: 'Test@1234',
      });
    
    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/callback/credentials')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
    
    expect(response.status).toBe(401);
  });
});