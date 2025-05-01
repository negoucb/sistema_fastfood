const request = require('supertest')
const app = require('../app')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

let token = ''

beforeAll(async () => {
  await prisma.user.deleteMany()
  await prisma.product.deleteMany()
  await request(app).post('/api/auth/register').send({
    name: 'Test Admin',
    email: 'admin@example.com',
    password: 'admin123'
  })
  const res = await request(app).post('/api/auth/login').send({
    email: 'admin@example.com',
    password: 'admin123'
  })
  token = res.body.token
})

describe('Product Routes', () => {
  it('should create a product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Burger', price: 9.99, category: 'Food' })
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe('Burger')
  })

  it('should fetch products', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})
