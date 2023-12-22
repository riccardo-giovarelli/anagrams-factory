import request from 'supertest';

import app from '../index';

describe('GET /api/anagram/make?text=Riccardo', () => {
  it('should return all anagrams generated', async () => {
    return request(app)
      .get('/api/anagram/make?text=Riccardo')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
