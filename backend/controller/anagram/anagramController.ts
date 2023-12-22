import { Request, Response } from 'express';

import { generateAnagram } from '../../utils/anagram.lib';
import { MetaType } from './anagramController.type';

/**
 * @function getAnagrams
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @returns {void}
 */
export const getAnagrams = (req: Request, res: Response): void => {
  // {JSON:API} => Query parameters error
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
  let results = generateAnagram(req.query.text as string);

  // Total results
  const total = results.length;

  // Pagination
  const limit = req?.query?.limit ? Number(req.query.limit) : null;
  const offset = req?.query?.offset ? Number(req.query.offset) : null;
  if (limit && offset) {
    results = results.slice((offset - 1) * limit, (offset - 1) * limit + limit);
  }

  if (!results || !Array.isArray(results) || results.length <= 0) {
    // {JSON:API} => No results
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
    // Meta values
    const meta: MetaType = {
      total: total,
    };
    if (offset && limit) {
      meta.offset = offset;
      meta.limit = limit;
      meta.pages = limit ? Math.ceil(total / limit) : 1;
    }

    // {JSON:API} => Results
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
      meta,
    });
  }
};
