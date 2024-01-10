import 'dotenv/config';

import request from 'supertest';

import app from '../../index';
import { isJson } from '../../utils/lib/test.lib';
import { ServerResposneType } from './server.test.type';

/**
 * Test
 *
 * Method: GET
 *
 * Test case: Try to call a not allowed url
 */
describe(`[COMMON] GET /not/allowed/url`, () => {
  it(`should return the status code 400 for a not allowed url`, async () => {
    return request(app)
      .get(`/not/allowed/url`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res: ServerResposneType) => {
        expect(res.statusCode).toBe(400);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('status');
        expect(typeof resultsJson.status).toBe('number');
        expect(resultsJson.status).toBe(400);
      });
  });
});

/**
 * Test
 *
 * Method: POST
 *
 * Test case: Try to call a not allowed url
 */
describe(`[COMMON] POST /not/allowed/url`, () => {
  it(`should return the status code 400 for a not allowed url`, async () => {
    return request(app)
      .post(`/not/allowed/url`)
      .send({ fakeKey: 'Fake Value' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res: ServerResposneType) => {
        expect(res.statusCode).toBe(400);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('status');
        expect(typeof resultsJson.status).toBe('number');
        expect(resultsJson.status).toBe(400);
      });
  });
});
