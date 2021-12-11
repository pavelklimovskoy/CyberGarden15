import requests
import random
import uuid

API_KEY = '12273106-6c94b3c628bda3a31120be6af'

REQUEST_LIMIT = 20

def save_image_from_url(image_url: str):
    img_data = requests.get(image_url).content
    img_name = f'{uuid.uuid4()}.jpg'
    with open(img_name, 'wb') as handler:
        handler.write(img_data)
    return img_name

# Words in the query should be divided by '+' sign
def get_image_url_from_query(query: str):
    response = requests.get(f'https://pixabay.com/api/?key={API_KEY}&q={query}&lang=ru&per_page={REQUEST_LIMIT}')
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


def __main__():
    query_result = download_image_from_query('пупа')
    print(query_result)

if __name__ == '__main__':
    __main__()