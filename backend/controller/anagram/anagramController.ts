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
   * RESPONSE: Query parameters error
   */
  if (!req?.query?.text) {
    res.status(400).json({
      id: 400,
      status: 400,
      code: 'ANAGRAM_BAD_REQUEST',
      title: 'Bad Request',
      detail: 'Bad Request: check the request syntax',
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
  }

  const limit = req?.query?.limit ? Number(req.query.limit) : null;
  const offset = req?.query?.offset ? Number(req.query.offset) : null;

  // Generate anagrams
  let results = generateAnagram(req.query.text as string, offset, limit);

  // Total results
  const total = getFactorial(req.query.text.toString().length);

  if (!results || !Array.isArray(results) || results.length <= 0) {
    /**
     * {JSON:API}
     *
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
        total,
        pages: limit ? Math.ceil(total / limit) : 1,
      },
    });
  }
};
