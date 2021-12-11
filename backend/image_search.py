import codecs

import requests
import random
import uuid

API_KEY = '24759739-1c15f0fab08852f08e3bacecf'

REQUEST_LIMIT = 20


def save_image_from_url(image_url: str):
    img_data = requests.get(image_url).content
    img_name = f'{uuid.uuid4()}.jpg'
    with open(img_name, 'wb') as handler:
        handler.write(img_data)
    return img_name


def get_only_keywords(query: str):
    file = codecs.open('./banword', encoding='utf-8')

    split_line = query.split()
    for i in range(559):
        str1 = file.readline()
        str1 = str1.replace("\r\n", "")
        if str1 in split_line:
            split_line.remove(str1)
    lst = []
    strForSearch = ""
    for i in range(len(split_line)):
        strForSearch += split_line[i] + "+"

    return strForSearch


# Words in the query should be divided by '+' sign
def get_image_url_from_query(query: str):
    strForSearch = get_only_keywords(query)

    response = requests.get(f'https://pixabay.com/api/?key={API_KEY}&q={strForSearch}&lang=ru&per_page={REQUEST_LIMIT}')
    hits = response.json()['hits']
    if not len(hits):
        return None
    hit_url = random.choice(hits)['webformatURL']
    return hit_url


def download_image_from_query(query: str):
    url = get_image_url_from_query(query)

    if not url:
        return None

    image_path = save_image_from_url(url)
    return image_path


def result(search_query):
    query_result = download_image_from_query(search_query)
    return query_result