import { Request, Response } from 'express';

import Dictionary from '../../model/dictionary/dictionary.model';
import { simplifyString } from '../../utils/lib/string.lib';
import { isValidLanguage } from './dictionary.controller.lib';

/**
 * @function searchWord
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @returns {boolean} true if word is found, false otherwise
 */
export const searchWord = (req: Request, res: Response): boolean => {
  /**
   * {JSON:API}
   *
   * STATUS CODE: 400
   * RESPONSE: Lang code missing
   */
  if (!req?.query?.lang) {
    res.status(400).json({
      id: 400,
      status: 400,
      code: 'DICTIONARY_BAD_REQUEST',
      title: 'Bad Request',
      detail: 'Lang code missing',
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
    return false;
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 400
   * RESPONSE: Word to search missing
   */
  if (!req?.query?.word) {
    res.status(400).json({
      id: 400,
      status: 400,
      code: 'DICTIONARY_BAD_REQUEST',
      title: 'Bad Request',
      detail: 'Word to search missing',
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
    return false;
  }

  /**
   * {JSON:API}
   *
   * STATUS CODE: 400
   * RESPONSE: Invalid language code
   */
  if (!isValidLanguage(req.query.lang.toString())) {
    res.status(400).json({
      id: 400,
      status: 400,
      code: 'DICTIONARY_BAD_REQUEST',
      title: 'Bad Request',
      detail: 'Invalid language code',
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
    return false;
  }

  // New Dictionary instance
  const dictionary = new Dictionary(req.query.lang.toString());

  if (!dictionary.words.includes(simplifyString(req.query.word.toString()))) {
    /**
     * {JSON:API}
     *
     * STATUS CODE: 204
     * RESPONSE: Results
     */
    res.status(204).json({
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
      data: {},
      meta: {
        keyword: req.query.word.toString(),
        dictionaryLanguage: req.query.lang.toString(),
      },
    });
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
      data: {
        id: 0,
        type: 'word',
        attributes: {
          length: req.query.word.toString().length,
        },
      },
      meta: {
        keyword: req.query.word.toString(),
        dictionaryLanguage: req.query.lang.toString(),
      },
    });
  }
};
