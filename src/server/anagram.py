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


def swap(chars, i, j):
    """Swap two chars in a list

    Args:
      text (string): Thw word for generate anagrams

    Returns:
      string: String with characters swapped
    """

    chars = list(chars)
    tmp = chars[i]
    chars[i] = chars[j]
    chars[j] = tmp
    return ''.join(chars)


def getAnagrams(string):
    """Generate all possible anagrams for the word provided

    Args:
      string (string): Thw word for generate anagrams

    Returns:
      stream: All possible anagrams
    """

    string = list(string)
    stringLength = len(string)
    chars = string
    counter = []
    i = 0

    for x in range(stringLength):
        counter.insert(x, 0)

    yield ''.join(string).upper() + ','

    while i < stringLength:
        if counter[i] < i:
            start = counter[i] if (i % 2 == 1) else 0
            chars = swap(chars, start, i)
            counter[i] += 1
            i = 0
            yield ''.join(chars).upper() + ','
        else:
            counter[i] = 0
            i += 1
