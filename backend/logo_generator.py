import random

from image_search import download_image_from_query
from style_transfer import StyleTransferer
import sys
import cv2

true_queries = ['лев', 'ястреб', 'дерево', 'гора']

class LogoGenerator:
    st = None

    def __init__(self) -> None:
        self.st = StyleTransferer()

    def generate(self, query: str):
        image_path = download_image_from_query(query)
        if image_path:
            styled_img = self.st.transfer_random_style(image_path)
            styled_img_path = f'{image_path}'
            cv2.imwrite(styled_img_path, styled_img)
            return styled_img_path
        else:
            true_query = random.choice(true_queries)
            image_path = download_image_from_query(true_query)
            if image_path:
                styled_img = self.st.transfer_random_style(image_path)
                styled_img_path = f'{image_path}'
                cv2.imwrite(styled_img_path, styled_img)
                return styled_img_path
        return 'default.jpg'


def result_generate(str):
    lg = LogoGenerator()
    #print(lg.generate(str))
    return lg.generate(str)

#if __name__ == '__main__':
#    __main__()