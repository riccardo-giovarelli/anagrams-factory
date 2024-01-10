import { searchWord } from '../controller/dictionary/dictionary.controller';

const express = require('express'),
  router = express.Router();

/**
 * Search a word in dictionary
 *
 * @name /search
 * @param {string} word Word to search in the dictionary
 * @param {string} lang Language code
 */
router.get('/search', searchWord);

export default router;
