"""dictionary.py

Functions to use dictionary on anagrams

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
from pprint import pprint


def getDictionary(lang):
    """Return dictionary by lang

    Args:
      lang (string): Language for the dictionary

    Returns:
      string: Json with the dictonary
    """

    with open('./asset/dictionary/' + lang + '.json') as json_file:
        return json.load(json_file)


def getTrueWorld(worlds):
    """Return real world in the dictonary from the anagrams

    Args:
      worlds (list): Words list to test

    Returns:
      list: List of real word
    """
    dictionary = getDictionary('en')
    results = []
    for world in worlds:
        if (world.lower() in dictionary):
            results.append(
                {'world': world, 'definition': dictionary[world.lower()]}
            )
    return results
