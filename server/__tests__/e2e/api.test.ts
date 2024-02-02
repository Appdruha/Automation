import request from 'supertest'
import { app } from '../../src/index.ts'

describe('api/user/registration', () => {
  it('should return code 400, body: { message: ...  }', async () => {
    const response = await request(app)
      .post('/api/users/registration')
      .expect(520)

    expect(response.body).toEqual({
      message: expect.any(String)
    })
  })

  it('should return code 200, body: { accessToken, user: {...} }, cookie: ...', async () => {
    const response = await request(app)
      .post('/api/users/registration')
      .send({ email: 'anadrey@mail.com', password: 'helloo' })
      .expect(200)

    expect(response.body).toEqual({
      accessToken: expect.any(String),
      user: {
        id: expect.any(Number),
        email: expect.any(String)
      },
    })

    if (!('set-cookie' in response.headers)) {
      throw new Error('Missing set-cookie header')
    }
  })
})
