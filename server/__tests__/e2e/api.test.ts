import request from 'supertest'
import { app } from '../../src/index.ts'

describe('api/user/registration', () => {
  it('should return code 500, body: { message: ... }', async () => {
    await request(app).post('/api/user/registration').expect(500, { message: 'Ошибка при регистрации пользователя' })
  })

  it('should return code 200, body: { accessToken, id }, cookie: ...', async () => {
    const response = await request(app)
      .post('/api/user/registration')
      .send({ email: 'andrey@mail.com', password: 'helloo', rememberMe: true })
      .expect(200)

    expect(response.body).toEqual({
      accessToken: expect.any(String),
      id: expect.any(Number),
    })

    if (!("set-cookie" in response.headers)) {
      throw new Error("Missing set-cookie header");
    }
  })
})
