"""anagram.py

Functions to generate anagrams

--------------------------------------

This file is part of Anagrams Factory.

Anagrams Factory is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Anagrams Factory is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Anagrams Factory.  If not, see <http://www.gnu.org/licenses/>.

Copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>
"""

import json


""" getAnagrams

Return all possible anagrams for the word provided

@param text:  word for generate anagrams
@return:      all possible anagrams
"""


def getAnagrams(text):
    return json.dumps(getAnagrams(text))


""" swap

Swap two chars in a list

@param text:  word for generate anagrams
@return:      all possible anagrams
"""


def swap(chars, i, j):
    chars = list(chars)
    tmp = chars[i]
    chars[i] = chars[j]
    chars[j] = tmp
    return ''.join(chars)


""" generateAnagrams

Generate all possible anagrams for the word provided

@param string:  word for generate anagrams
@return:      all possible anagrams
"""


def generateAnagrams(string):
    string = list(string)
    stringLength = len(string)
    chars = string
    anagrams = []
    counter = []
    i = 0

    for x in range(stringLength):
        counter.insert(x, 0)

    anagrams.append(''.join(string).upper())

    while i < stringLength:
        if counter[i] < i:
            start = counter[i] if (i % 2 == 1) else 0
            chars = swap(chars, start, i)
            counter[i] += 1
            i = 0
            anagrams.append(''.join(chars).upper())
        else:
            counter[i] = 0
            i += 1
    return anagrams
