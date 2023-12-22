import request from 'supertest';

import app from '../../index';
import { isJson } from '../../utils/tests.lib';
import { AnagramResposneType } from './anagram.test.type';


describe('GET /api/anagram/make?text=word', () => {
  it('should return 200', async () => {
    return request(app)
      .get('/api/anagram/make?text=word')
      .expect(200)
      .then((res: AnagramResposneType) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe('GET /api/anagram/make?text=word', () => {
  it('should return a json type response', async () => {
    return request(app)
      .get('/api/anagram/make?text=word')
      .expect('Content-Type', /json/)
      .then((res: AnagramResposneType) => {
        expect(isJson(res.text)).toBe(true);
      });
  });
});

describe('GET /api/anagram/make?text=word', () => {
  it('should return 24 results', async () => {
    return request(app)
      .get('/api/anagram/make?text=word')
      .expect('Content-Type', /json/)
      .then((res: AnagramResposneType) => {
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('data');
        expect(typeof resultsJson.data).toBe('object');
        expect(resultsJson.data.length).toBe(24);
      });
  });
});
