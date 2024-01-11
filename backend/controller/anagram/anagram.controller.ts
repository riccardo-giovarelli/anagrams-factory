import 'dotenv/config';

import { Request, Response } from 'express';

import { generateAnagram } from '../../utils/lib/anagram.lib';
import { getFactorial, getNumOfUniqueAnagrams } from '../../utils/lib/math.lib';

/**
 * @function getAnagrams
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @returns {boolean} true if anagrams are returned, false otherwise
 */
export const getAnagrams = (req: Request, res: Response): boolean => {
  /**
   * {JSON:API}
   *
   * STATUS CODE: 400
   * RESPONSE: Input text missing
   */
  if (!req?.query?.text) {
    res.status(400).json({
      id: 400,
      status: 400,
      code: 'ANAGRAM_BAD_REQUEST',
      title: 'Bad Request',
      detail: 'Input text for anagrams missing',
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
    return false;
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 422
   * RESPONSE: Input text length exceeded
   */
  if (req.query.text.length > process.env.ANAGRAM_INPUT_TEXT_MAX_LENGTH) {
    res.status(422).json({
      id: 422,
      status: 422,
      code: 'UNPROCESSABLE_ENTITY',
      title: 'Invalid input text',
      detail: `Input text is too long. Max length is ${process.env.ANAGRAM_INPUT_TEXT_MAX_LENGTH} characters.`,
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
    return false;
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 422
   * RESPONSE: Only alphabetical characters
   */
  if (new RegExp(process.env.ANAGRAM_INPUT_VALIDATION_REGEX, 'g').test(req.query.text.toString())) {
    res.status(422).json({
      id: 422,
      status: 422,
      code: 'UNPROCESSABLE_ENTITY',
      title: 'Invalid input text',
      detail: 'Only alphabetical characters allowed in the input text.',
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
    return false;
  }

  // Parsing query parameters
  const limit = req?.query?.limit ? Number(req.query.limit) : 100;
  const offset = req?.query?.offset ? Number(req.query.offset) : 0;
  const unique = req?.query?.unique && req.query.unique === 'true' ? true : false;
  const text = req.query.text.toString().toLowerCase();

  // Generate anagrams
  let results = generateAnagram(text as string, offset, limit, unique);

  // Total results
  const total = unique ? getNumOfUniqueAnagrams(text, text.length) : getFactorial(text.length);

  if (!results || !Array.isArray(results) || results.length <= 0) {
    /**
     * {JSON:API}
     *
     * STATUS CODE: 200
     * RESPONSE: No results
     */
    res.status(200).json({
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
      data: [],
      meta: {
        total: 0,
      },
    });
    return false;
  } else {
    /**
     * {JSON:API}
     *
     * STATUS CODE: 200
     * RESPONSE: Results
     */
    res.status(200).json({
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
      data: results.map((result: string, index: number) => ({
        type: 'anagram',
        id: index,
        attributes: {
          word: result,
        },
      })),
      meta: {
        offset,
        limit,
        totalResults: total,
        currentPage: offset + 1,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
    });
    return true;
  }
};
