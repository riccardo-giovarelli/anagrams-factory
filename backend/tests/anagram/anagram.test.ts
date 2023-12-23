import request from 'supertest';

import app from '../../index';
import { isJson } from '../../utils/tests.lib';
import { AnagramResposneType } from './anagram.test.type';


describe('GET /api/anagram/make?text=rick', () => {
  it('should return all the anagrams for the word "rick"', async () => {
    return request(app)
      .get('/api/anagram/make?text=rick')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res: AnagramResposneType) => {
        expect(res.statusCode).toBe(200);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('data');
        expect(typeof resultsJson.data).toBe('object');
        expect(resultsJson.data.length).toBe(24);
      });
  });
});

describe('GET /api/anagram/make?text=rick&offset=1&limit=10', () => {
  it('should return the first 10 anagrams for the word "rick"', async () => {
    return request(app)
      .get('/api/anagram/make?text=rick&offset=1&limit=10')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res: AnagramResposneType) => {
        expect(res.statusCode).toBe(200);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('data');
        expect(typeof resultsJson.data).toBe('object');
        expect(resultsJson.data.length).toBe(10);
      });
  });
});
