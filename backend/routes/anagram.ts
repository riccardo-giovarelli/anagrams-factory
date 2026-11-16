import { Router } from "express";

import { getAnagrams } from "../controller/anagram/anagram.controller";

const router = Router();

/**
 * Generate anagrams
 *
 * @route GET /make
 * @query {string} text - Input string to anagram (required)
 * @query {number} [limit=100] - Max results per page
 * @query {number} [offset=0] - Starting index
 * @query {boolean} [unique=false] - Whether to return only unique anagrams
 */
router.get("/make", getAnagrams);

export default router;
