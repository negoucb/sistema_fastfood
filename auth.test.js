const request = require('supertest')
const app = require('../app')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

describe('Auth Routes', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
  })

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456'
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.token).toBeDefined()
  })

  it('should login an existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.token).toBeDefined()
  })
})
