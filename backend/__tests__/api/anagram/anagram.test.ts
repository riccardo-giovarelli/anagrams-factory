import 'dotenv/config';

import request from 'supertest';

import app from '../../../index';
import { getFactorial, getNumOfUniqueAnagrams } from '../../../utils/lib/math.lib';
import { isJson } from '../../../utils/lib/test.lib';
import { getTooLongText, inputInvalidText, inputText, inputTextWithRepeatedCharacters } from './anagram.test.lib';
import { AnagramResposneType } from './anagram.test.type';

/**
 * Test
 *
 * Method: GET
 *
 * Test case: Get anagrams for a provided word with invalid characters
 */
describe(`[API-ANAGRAM] GET /api/anagram/make?text=${inputInvalidText}`, () => {
  it(`should return the status code 422 for the text "${inputInvalidText}" because has invalid characters`, async () => {
    return request(app)
      .get(`/api/anagram/make?text=${inputInvalidText}`)
      .expect(422)
      .expect('Content-Type', /json/)
      .then((res: AnagramResposneType) => {
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
 * Test case: Get anagrams for a provided word with length greater
 * than the maximum admitted
 */
describe(`[API-ANAGRAM] GET /api/anagram/make?text=${getTooLongText()}`, () => {
  it(`should return the status code 422 for the text "${getTooLongText()}" because exceeds the ${
    process.env.INPUT_TEXT_MAX_LENGTH
  } characters`, async () => {
    return request(app)
      .get(`/api/anagram/make?text=${getTooLongText()}`)
      .expect(422)
      .expect('Content-Type', /json/)
      .then((res: AnagramResposneType) => {
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
 * Test case: Get anagrams for a provided word with limit and offset on the results
 */
describe(`[API-ANAGRAM] GET /api/anagram/make?text=${inputText}&offset=0&limit=10`, () => {
  it(`should return the first 10 anagrams for the word "${inputText}"`, async () => {
    return request(app)
      .get(`/api/anagram/make?text=${inputText}&offset=0&limit=10`)
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

/**
 * Test
 *
 * Method: GET
 *
 * Test case: Get anagrams for a provided word
 */
describe(`[API-ANAGRAM] GET /api/anagram/make?text=${inputText}`, () => {
  it(`should return all the anagrams for the word "${inputText}"`, async () => {
    return request(app)
      .get(`/api/anagram/make?text=${inputText}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res: AnagramResposneType) => {
        expect(res.statusCode).toBe(200);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('data');
        expect(typeof resultsJson.data).toBe('object');
        expect(resultsJson.data.length).toBe(getFactorial(inputText.length));
      });
  });
});

/**
 * Test
 *
 * Method: GET
 *
 * Test case: Get anagrams for a provided word with repeated characters and the query parameter "unique" set to true to avoid duplicated
 */
describe(`[API-ANAGRAM] GET /api/anagram/make?text=${inputTextWithRepeatedCharacters}&unique=true`, () => {
  it(`should return all the anagrams for the word "${inputTextWithRepeatedCharacters}" that contains repeated characters`, async () => {
    return request(app)
      .get(`/api/anagram/make?text=${inputTextWithRepeatedCharacters}&unique=true`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res: AnagramResposneType) => {
        expect(res.statusCode).toBe(200);
        expect(isJson(res.text)).toBe(true);
        const resultsJson = JSON.parse(res.text);
        expect(resultsJson).toHaveProperty('data');
        expect(typeof resultsJson.data).toBe('object');
        expect(resultsJson.data.length).toBe(getNumOfUniqueAnagrams(inputTextWithRepeatedCharacters, inputTextWithRepeatedCharacters.length));
      });
  });
});
