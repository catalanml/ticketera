import { config } from 'dotenv'
config({ path: '.env.test' }) // 👈 esto carga MONGO_URI

import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'
import app from '../app'

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string)
})

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase()
  }
  await mongoose.disconnect()
})

describe('Auth API', () => {
  it('debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'test1234'
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('user')
    expect(res.body.user.email).toBe('testuser@example.com')
  })
})
