import 'dotenv/config';

import { Request, Response } from 'express';

import { generateAnagram } from '../../utils/anagram.lib';
import { getFactorial } from '../../utils/math.lib';

/**
 * @function getAnagrams
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @returns {void}
 */
export const getAnagrams = (req: Request, res: Response): void => {
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
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 422
   * RESPONSE: Input text length exceeded
   */
  if (req.query.text.length > process.env.INPUT_TEXT_MAX_LENGTH) {
    res.status(400).json({
      id: 422,
      status: 422,
      code: 'ANAGRAM_UNPROCESSABLE_ENTITY',
      title: 'Unprocessable Entity',
      detail: 'Length of input text exceeded',
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 422
   * RESPONSE: Only alphabetical characters
   */
  if (/[^a-zA-Z]/g.test(req.query.text.toString())) {
    res.status(400).json({
      id: 422,
      status: 422,
      code: 'ANAGRAM_UNPROCESSABLE_ENTITY',
      title: 'Unprocessable Entity',
      detail: 'Only alphabetical characters allowed',
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
  }

  const limit = req?.query?.limit ? Number(req.query.limit) : 100;
  const offset = req?.query?.offset ? Number(req.query.offset) : 0;

  // Generate anagrams
  let results = generateAnagram(req.query.text as string, offset, limit);

  // Total results
  const total = getFactorial(req.query.text.toString().length);

  if (!results || !Array.isArray(results) || results.length <= 0) {
    /**
     * {JSON:API}
     *
     * STATUS CODE: 204
     * RESPONSE: No results
     */
    res.status(204).json({
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
      data: [],
      meta: {
        total: 0,
      },
    });
  } else {
    /**
     * {JSON:API}
     *
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
  }
};
