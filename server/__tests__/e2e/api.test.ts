import request from 'supertest'
import { app } from "../../src/index.ts";

describe('api/user/registration', () => {
  it('code 500, body: { message: ... }', async () => {
    await request(app)
      .post('/api/user/registration')
      .expect(500, {message: 'Ошибка при регистрации пользователя'})
  })
})