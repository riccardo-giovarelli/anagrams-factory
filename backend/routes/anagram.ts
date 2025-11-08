import express from 'express';

import { getAnagrams } from '../controller/anagram/anagram.controller';

const router = express.Router();

/**
 * Generate anagrams
 *
 * @name /make
 * @param text
 */
router.get('/make', getAnagrams);

export default router;
