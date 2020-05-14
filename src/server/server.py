"""server.py

Implements anagrams web service

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

from flask import Flask, request, abort
from flask_cors import CORS
from anagram import getAnagrams
from dictionary import getTrueWorld
import json

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'


# ROUTE: anagrams
@app.route('/anagrams', methods=['GET'])
def returnAnagrams():
    return getAnagrams(request.args['text'])


# ROUTE: dictionary
@app.route('/dictionary', methods=['POST'])
def returnTrueWorld():
    if request.json and 'list' in request.json:
        results = getTrueWorld(request.json['list'])
        if (len(results) > 0):
            return json.dumps(results), 200
        else:
            return '', 204


# Run Server
if __name__ == "__main__":
    CORS(app)
    app.run(host='127.0.0.1', port=4300)
