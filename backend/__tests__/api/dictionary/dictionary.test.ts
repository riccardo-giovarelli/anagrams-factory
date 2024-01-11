import 'dotenv/config';

import request from 'supertest';

import app from '../../../index';
import { isJson } from '../../../utils/lib/test.lib';
import { getTooLongText, inputLanguageCode, inputWord, inputWordEmptyResponse, invalidLanguageCode } from './dictionary.test.lib';
import { DictionaryResposneType } from './dictionary.test.type';

/**
 * Test
 *
 * Method: GET
 *
 * Test case: Search word in the dictionary without providing any query parameters
 */
describe(`[API-DICTIONARY] GET /api/dictionary/search`, () => {
  it(`should return the status code 400 because query parameters are missing`, async () => {
    return request(app)
      .get(`/api/dictionary/search`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res: DictionaryResposneType) => {
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
 * Method: GET
 *
 * Test case: Search word in the dictionary without providing "word" query parameter
 */
describe(`[API-DICTIONARY] GET /api/dictionary/search?lang=${inputLanguageCode}`, () => {
  it(`should return the status code 400 because query parameter "lang" is missing`, async () => {
    return request(app)
      .get(`/api/dictionary/search?lang=${inputLanguageCode}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res: DictionaryResposneType) => {
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
 * Method: GET
 *
 * Test case: Search word in the dictionary without providing "lang" query parameter
 */
describe(`[API-DICTIONARY] GET /api/dictionary/search?word=${inputWord}`, () => {
  it(`should return the status code 400 because query parameter "word" is missing`, async () => {
    return request(app)
      .get(`/api/dictionary/search?word=${inputWord}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res: DictionaryResposneType) => {
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
 * Method: GET
 *
 * Test case: Search word in the dictionary for a word with length greater than the maximum admitted
 */
describe(`[API-DICTIONARY] GET /api/dictionary/search?word=${getTooLongText()}&lang=${inputLanguageCode}`, () => {
  it(`should return the status code 422 for the word "${getTooLongText()}" because exceeds the ${
    process.env.DICTIONARY_INPUT_WORD_MAX_LENGTH
  } characters`, async () => {
    return request(app)
      .get(`/api/dictionary/search?word=${getTooLongText()}&lang=${inputLanguageCode}`)
      .expect(422)
      .expect('Content-Type', /json/)
      .then((res: DictionaryResposneType) => {
        expect(res.statusCode).toBe(422);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('status');
        expect(typeof resultsJson.status).toBe('number');
        expect(resultsJson.status).toBe(422);
      });
  });
});

/**
 * Test
 *
 * Method: GET
 *
 * Test case: Search word in the dictionarys for a valid word and an invalid language code
 */
describe(`[API-DICTIONARY] GET /api/dictionary/search?word=${inputWord}&lang=${invalidLanguageCode}`, () => {
  it(`should return the status code 422 for the invalid language code "${invalidLanguageCode}"`, async () => {
    return request(app)
      .get(`/api/dictionary/search?word=${inputWord}&lang=${invalidLanguageCode}`)
      .expect(422)
      .expect('Content-Type', /json/)
      .then((res: DictionaryResposneType) => {
        expect(res.statusCode).toBe(422);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('status');
        expect(typeof resultsJson.status).toBe('number');
        expect(resultsJson.status).toBe(422);
      });
  });
});

/**
 * Test
 *
 * Method: GET
 *
 * Test case: Search word in the dictionary for a valid word and an valid language code
 */
describe(`[API-DICTIONARY] GET /api/dictionary/search?word=${inputWord}&lang=${inputLanguageCode}`, () => {
  it(`should return the status code 200 for the valid word "${inputWord}" and the valid language code "${inputLanguageCode}"`, async () => {
    return request(app)
      .get(`/api/dictionary/search?word=${inputWord}&lang=${inputLanguageCode}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res: DictionaryResposneType) => {
        expect(res.statusCode).toBe(200);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('data');
        expect(typeof resultsJson.data).toBe('object');
        expect(resultsJson.data).toHaveProperty('id');
      });
  });
});

/**
 * Test
 *
 * Method: GET
 *
 * Test case: Search word in the dictionary but the word is not present
 */
describe(`[API-DICTIONARY] GET /api/dictionary/search?word=${inputWordEmptyResponse}&lang=${inputLanguageCode}`, () => {
  it(`should return the status code 200 for the valid word "${inputWordEmptyResponse}" not in the dictionary`, async () => {
    return request(app)
      .get(`/api/dictionary/search?word=${inputWordEmptyResponse}&lang=${inputLanguageCode}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res: DictionaryResposneType) => {
        expect(res.statusCode).toBe(200);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('data');
        expect(typeof resultsJson.data).toBe('object');
      });
  });
});
