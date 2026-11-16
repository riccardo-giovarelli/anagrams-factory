import "dotenv/config";

import { Request, Response } from "express";

import { generateAnagram } from "../../utils/lib/anagram.lib";
import { getFactorial, getNumOfUniqueAnagrams } from "../../utils/lib/math.lib";

const MAX_TEXT_LENGTH = Number(process.env.ANAGRAM_INPUT_TEXT_MAX_LENGTH) || 10;
const VALIDATION_REGEX = process.env.ANAGRAM_INPUT_VALIDATION_REGEX || "[^a-zA-Z]";

/**
 * @function getAnagrams
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @returns {void}
 */
export const getAnagrams = (req: Request, res: Response): void => {
  const selfLink = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const rawText = req.query?.text;

  /**
   * {JSON:API}
   *
   * STATUS CODE: 400
   * RESPONSE: Input text missing or invalid format (e.g., array/object in query)
   */
  if (!rawText || typeof rawText !== "string" || rawText.trim() === "") {
    res.status(400).json({
      id: 400,
      status: 400,
      code: "ANAGRAM_BAD_REQUEST",
      title: "Bad Request",
      detail: "Input text for anagrams missing",
      links: {
        self: selfLink,
      },
    });
    return;
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 422
   * RESPONSE: Input text length exceeded
   */
  if (rawText.length > MAX_TEXT_LENGTH) {
    res.status(422).json({
      id: 422,
      status: 422,
      code: "UNPROCESSABLE_ENTITY",
      title: "Invalid input text",
      detail: `Input text is too long. Max length is ${MAX_TEXT_LENGTH} characters.`,
      links: {
        self: selfLink,
      },
    });
    return;
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 422
   * RESPONSE: Only alphabetical characters
   */
  if (new RegExp(VALIDATION_REGEX).test(rawText)) {
    res.status(422).json({
      id: 422,
      status: 422,
      code: "UNPROCESSABLE_ENTITY",
      title: "Invalid input text",
      detail: "Only alphabetical characters allowed in the input text.",
      links: {
        self: selfLink,
      },
    });
    return;
  }

  const parsedLimit = Number(req.query?.limit);
  const limit = !Number.isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : 100;

  const parsedOffset = Number(req.query?.offset);
  const offset = !Number.isNaN(parsedOffset) && parsedOffset >= 0 ? parsedOffset : 0;

  const unique = req.query?.unique === "true";
  const text = rawText.toLowerCase();

  // Generate anagrams
  const results = generateAnagram(text, offset, limit, unique);

  // Total results
  const total = unique ? getNumOfUniqueAnagrams(text, text.length) : getFactorial(text.length);

  if (!Array.isArray(results) || results.length === 0) {
    /**
     * {JSON:API}
     *
     * STATUS CODE: 200
     * RESPONSE: No results
     */
    res.status(200).json({
      links: {
        self: selfLink,
      },
      data: [],
      meta: {
        offset,
        limit,
        totalResults: 0,
        currentPage: 1,
        totalPages: 0,
      },
    });
    return;
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 200
   * RESPONSE: Results
   */
  res.status(200).json({
    links: {
      self: selfLink,
    },
    data: results.map((result: string, index: number) => ({
      type: "anagram",
      id: offset + index,
      attributes: {
        word: result,
      },
    })),
    meta: {
      offset,
      limit,
      totalResults: total,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(total / limit),
    },
  });
};
