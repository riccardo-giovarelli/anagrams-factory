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

from flask import Flask, request
from flask_cors import CORS
from anagram import getAnagrams

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/anagrams', methods=['GET'])
def returnAnagrams():
    return getAnagrams(request.args['text'])


if __name__ == "__main__":
    CORS(app)
    app.run(host='127.0.0.1', port=4300)
