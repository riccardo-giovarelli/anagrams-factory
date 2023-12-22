import { getAnagrams } from '../controller/anagram';

const express = require('express'),
  router = express.Router();

/**
 * Generate anagrams
 * @name /make
 * @param text
 */
router.get('/make', getAnagrams);

export default router;
