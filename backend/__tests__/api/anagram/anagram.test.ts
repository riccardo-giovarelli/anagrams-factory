import "dotenv/config";
import { describe, expect, it } from "@jest/globals";

import request from "supertest";

import app from "../../../index";
import { getFactorial, getNumOfUniqueAnagrams } from "../../../utils/lib/math.lib";
import { isJson } from "../../../utils/lib/test.lib";
import { getTooLongText, inputInvalidText, inputText, inputTextWithRepeatedCharacters } from "./anagram.test.lib";
import { AnagramResposneType } from "./anagram.test.type";

const MAX_LENGTH = Number(process.env.ANAGRAM_INPUT_TEXT_MAX_LENGTH) || 10;
const tooLongText = getTooLongText();

describe("[API-ANAGRAM] GET /api/anagram/make", () => {
  /**
   * Test case: Get anagrams without providing any query parameters
   */
  it("should return status code 400 when query parameters are missing", async () => {
    const res: AnagramResposneType = await request(app)
      .get("/api/anagram/make")
      .expect(400)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(400);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("status", 400);
  });

  /**
   * Test case: Get anagrams providing an empty text
   */
  it("should return status code 400 when providing an empty text", async () => {
    const res: AnagramResposneType = await request(app)
      .get("/api/anagram/make?text=")
      .expect(400)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(400);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("status", 400);
  });

  /**
   * Test case: Get anagrams for a provided word with invalid characters
   */
  it(`should return status code 422 for the text "${inputInvalidText}" because it contains invalid characters`, async () => {
    const res: AnagramResposneType = await request(app)
      .get(`/api/anagram/make?text=${encodeURIComponent(inputInvalidText)}`)
      .expect(422)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(422);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("status", 422);
  });

  /**
   * Test case: Get anagrams for a provided word with length greater than the maximum allowed
   */
  it(`should return status code 422 for the text "${tooLongText}" because it exceeds ${MAX_LENGTH} characters`, async () => {
    const res: AnagramResposneType = await request(app)
      .get(`/api/anagram/make?text=${encodeURIComponent(tooLongText)}`)
      .expect(422)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(422);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("status", 422);
  });

  /**
   * Test case: Get anagrams for a provided word with limit and offset on the results
   */
  it(`should return the first 10 anagrams for the word "${inputText}"`, async () => {
    const res: AnagramResposneType = await request(app)
      .get(`/api/anagram/make?text=${encodeURIComponent(inputText)}&offset=0&limit=10`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(200);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("data");
    expect(Array.isArray(resultsJson.data)).toBe(true);
    expect(resultsJson.data).toHaveLength(10);
  });

  /**
   * Test case: Get anagrams for a provided word
   */
  it(`should return all the anagrams for the word "${inputText}"`, async () => {
    const expectedTotal = getFactorial(inputText.length);

    const res: AnagramResposneType = await request(app)
      .get(`/api/anagram/make?text=${encodeURIComponent(inputText)}&limit=${expectedTotal}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(200);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("data");
    expect(Array.isArray(resultsJson.data)).toBe(true);
    expect(resultsJson.data).toHaveLength(expectedTotal);
  });

  /**
   * Test case: Get anagrams for a provided word with repeated characters and unique=true
   */
  it(`should return all unique anagrams for the word "${inputTextWithRepeatedCharacters}"`, async () => {
    const expectedUniqueTotal = getNumOfUniqueAnagrams(
      inputTextWithRepeatedCharacters,
      inputTextWithRepeatedCharacters.length,
    );

    const res: AnagramResposneType = await request(app)
      .get(
        `/api/anagram/make?text=${encodeURIComponent(
          inputTextWithRepeatedCharacters,
        )}&unique=true&limit=${expectedUniqueTotal}`,
      )
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(200);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("data");
    expect(Array.isArray(resultsJson.data)).toBe(true);
    expect(resultsJson.data).toHaveLength(expectedUniqueTotal);
  });
});
