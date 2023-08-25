import request from 'supertest';
import app from '../config/app';

describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send();
    });
    const response = await request(app)
      .get('/test_content_type_json');
    
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send();
    });
    const response = await request(app).get('/test_content_type_xml');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/xml/);
  });
});
