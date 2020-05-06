
from flask import Flask, request
from flask_cors import CORS
from anagram import calculateAnagrams

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/anagrams', methods=['GET'])
def returnAnagrams():
    return calculateAnagrams(request.args['text'])


if __name__ == "__main__":
    CORS(app)
    app.run(host='127.0.0.1', port=4300)
