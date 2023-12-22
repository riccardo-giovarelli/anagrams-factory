import { Request, Response } from 'express';

import { generateAnagram } from '../utils/anagram.lib';

/**
 * @function getAnagrams
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @returns {void}
 */
export const getAnagrams = (req: Request, res: Response): void => {
  // Check query
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

  // Generate anagrams
  const results = generateAnagram(req.query.text as string);

  if (!results || !Array.isArray(results) || results.length <= 0) {
    // No results
    res.status(204).json({
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
      data: [],
      meta: {
        count: 0,
      },
    });
  } else {
    // Results
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
        count: results.length,
      },
    });
  }
};
