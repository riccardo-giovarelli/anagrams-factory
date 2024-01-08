import { searchWord } from '../controller/dictionary/dictionaryController';

const express = require('express'),
  router = express.Router();

/**
 * Search a word in dictionary
 *
 * @name /search
 * @param word
 */
router.get('/search', searchWord);

export default router;
