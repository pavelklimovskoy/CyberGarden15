from typing import Any
import tensorflow_hub as hub
import tensorflow as tf
from matplotlib import pyplot as plt
import numpy as np
import cv2
import os
import random
import sys

class StyleTransferer:
    model = None

    styles_dir = 'styles'

    def __init__(self):
        self.model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

    @staticmethod
    def load_image(img_path: str):
        img = tf.io.read_file(img_path)
        img = tf.image.decode_image(img, channels=3)
        img = tf.image.convert_image_dtype(img, tf.float32)
        img = img[tf.newaxis, :]
        return img
        
    @staticmethod
    def get_random_style() -> str:
        styles = os.listdir(StyleTransferer.styles_dir)
        style = random.choice(styles)
        return style

    def transfer_style(self, content_img_path: str, style_img_path: str):
        content_image = self.load_image(content_img_path)
        style_image = self.load_image(style_img_path)

        stylized_image = self.model(tf.constant(content_image), tf.constant(style_image))[0]

        result_img = cv2.cvtColor(np.squeeze(stylized_image)*255, cv2.COLOR_BGR2RGB)
        
        return result_img


    def transfer_random_style(self, content_img_path: str):
        content_image = self.load_image(content_img_path)
        style: str = self.get_random_style()
        style_image = self.load_image(os.path.join(self.styles_dir, style))

        stylized_image = self.model(tf.constant(content_image), tf.constant(style_image))[0]

        result_img = cv2.cvtColor(np.squeeze(stylized_image)*255, cv2.COLOR_BGR2RGB)
        
        return result_img

def __main__():
    style_transferer = StyleTransferer()
    for i in os.listdir(StyleTransferer.styles_dir):
        styled_img = style_transferer.transfer_style(sys.argv[1], os.path.join(StyleTransferer.styles_dir, i))
        cv2.imwrite(f'generated_img_airplane_{i}', styled_img)

if __name__ == '__main__':
    __main__()