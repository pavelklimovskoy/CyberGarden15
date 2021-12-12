import urllib.request
from urllib.error import HTTPError
import requests
from flask import Flask, jsonify, request, render_template, json
from flask_cors import CORS
import codecs
from PIL import Image
import json
from urllib.request import urlopen
from bs4 import BeautifulSoup
from backend.image_search import *
from backend.logo_generator import *

app = Flask(__name__)
app.config['SECRET_KEY'] = '1a2d5a33a7f02c888ff796a9f5f422bf96f4eb1c '
app.config['JSON_AS_ASCII'] = False
app.config.from_object(__name__)
#app.config.update(dict(DATABASE=os.path.join(app.root_path, 'main.db')))
CORS(app)


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
    return render_template('index.html')

@app.route('/img/<strn>', methods = ['GET'])
def img(strn):
    if request.method == 'GET':
        name = "/" + result_generate(strn)
        return name

@app.route('/referat/')
def referat():
    url = 'https://yandex.ru/referats/creator/write/?t='
    req = requests.get(url)
    return req.text


if __name__ == '__main__':
    app.run(debug=True, port=80)