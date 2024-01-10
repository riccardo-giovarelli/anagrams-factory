import { searchWord } from '../controller/dictionary/dictionary.controller';

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
