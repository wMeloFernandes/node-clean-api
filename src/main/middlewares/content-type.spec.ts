import request from 'supertest'
import app from '@/main/config/app'

describe('Content-Type Middleware', () => {
  test('Should return Content-type json as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
