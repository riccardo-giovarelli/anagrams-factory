import NodeCache from 'node-cache';
import fs from 'node:fs';
import { EOL } from 'os';

import { simplifyString } from '../../utils/lib/string.lib';

/**
 * Dictionary class
 */
class Dictionary {
  languageCode: string;
  cache: NodeCache;

  /**
   * Class constructor
   *
   * @param {string}code Language code
   * @param {NodeCache} serverCache Cache instance of server
   */
  constructor(code: string, serverCache: NodeCache) {
    this.languageCode = code;
    this.cache = serverCache;
  }

  /**
   * Words getter
   *
   * @return {string[]} Words
   */
  get words(): string[] {
    const words = this.cache.get(`dictionary_${this.languageCode}_words`);
    if (words === undefined) {
      try {
        const output = fs.readFileSync(`${__dirname}/../../data/dictionaries/${this.languageCode.toUpperCase()}.txt`, 'utf8');
        const data = output
          .split(EOL)
          .filter(Boolean)
          .map((word: string) => simplifyString(word));
        this.cache.set(`dictionary_${this.languageCode}_words`, data, 3600);
        return data;
      } catch (err) {
        console.error('[AF Error]', err);
      }
    } else {
      return [];
    }
  }
}

export default Dictionary;
