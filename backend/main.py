import urllib.request
from urllib.error import HTTPError
import requests
from flask import Flask, jsonify, request, render_template, json
from flask_cors import CORS
import codecs
import json
from urllib.request import urlopen
from bs4 import BeautifulSoup
from backend.image_search import *

app = Flask(__name__)
app.config['SECRET_KEY'] = '1a2d5a33a7f02c888ff796a9f5f422bf96f4eb1c '
app.config['JSON_AS_ASCII'] = False
app.config.from_object(__name__)
#app.config.update(dict(DATABASE=os.path.join(app.root_path, 'main.db')))
CORS(app)

headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/605.1.15 '
                  '(KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Origin': 'https://yandex.ru',
    'Referer': 'https://yandex.ru/',
}


# Открытие веб-страницы
def openHTML(url):
    url = url.encode('ascii', 'ignore').decode('ascii')
    try:
        html = urlopen(url)
        bsObj = BeautifulSoup(html.read(), "html.parser")
        return bsObj
    except HTTPError as e:
        print("Page not found")


# Основная страница
@app.route('/')
def index():
    return render_template('index.html', title='Timeline')

@app.route('/img/<strn>', methods = ['GET'])
def img(strn):
    if request.method == 'GET':
        return result(strn)

@app.route('/balaboba/<str>')
def bablaboba(str):
    url = 'https://zeapi.yandex.net/lab/api/yalm/text3'
    payload = {"filter": 1, "intro": 0, "query": str}
    params = json.dumps(payload).encode('utf8')
    req = urllib.request.Request(url, data=params, headers=headers)
    response = urllib.request.urlopen(req)
    return response.read().decode('unicode-escape')


if __name__ == '__main__':
    app.run(debug=True, port=80)