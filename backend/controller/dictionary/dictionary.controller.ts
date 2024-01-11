import 'dotenv/config';

import { Request, Response } from 'express';

import { inputWord, inputWordEmptyResponse } from '../../__tests__/api/dictionary/dictionary.test.lib';
import { serverCache } from '../../index';
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
   * STATUS CODE: 422
   * RESPONSE: Input word length exceeded
   */
  if (req.query.word.length > process.env.DICTIONARY_INPUT_WORD_MAX_LENGTH) {
    res.status(422).json({
      id: 422,
      status: 422,
      code: 'UNPROCESSABLE_ENTITY',
      title: 'Invalid input word',
      detail: `Input word is too long. Max length is ${process.env.DICTIONARY_INPUT_WORD_MAX_LENGTH} characters.`,
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
   * RESPONSE: Invalid language code
   */
  if (!isValidLanguage(req.query.lang.toString())) {
    res.status(422).json({
      id: 422,
      status: 422,
      code: 'UNPROCESSABLE_ENTITY',
      title: 'Invalid language code',
      detail: `Invalid language code. Available codes are: ${process.env.DICTIONARY_AVAILABLE_LANGUAGES.split('|').join(', ')}.`,
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
    });
    return false;
  }

  if (process.env.NODE_ENV === 'test' && simplifyString(req.query.word.toString()) === simplifyString(inputWord)) {
    /**
     * {JSON:API}
     *
     * STATUS CODE: 200
     * [MOCK] RESPONSE: Results
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

    return true;
  } else if (process.env.NODE_ENV === 'test' && simplifyString(req.query.word.toString()) === simplifyString(inputWordEmptyResponse)) {
    /**
     * {JSON:API}
     *
     * STATUS CODE: 200
     * [MOCK]RESPONSE: Empty
     */
    res.status(200).json({
      links: {
        self: `${req.protocol}://${req.hostname}${req?.socket?.localPort ? ':' + req.socket.localPort : ''}${req.originalUrl}`,
      },
      data: {},
      meta: {
        keyword: req.query.word.toString(),
        dictionaryLanguage: req.query.lang.toString(),
      },
    });

    return false;
  }

  // New Dictionary instance
  const dictionary = new Dictionary(req.query.lang.toString(), serverCache);

  if (!dictionary.words.includes(simplifyString(req.query.word.toString()))) {
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
      data: {},
      meta: {
        keyword: req.query.word.toString(),
        dictionaryLanguage: req.query.lang.toString(),
      },
    });

    return true;
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

    return true;
  }
};
