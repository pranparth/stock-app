import math
import pickle
import sqlite3
import time
import os
from datetime import datetime
from bs4 import BeautifulSoup
from datetime import timedelta, date
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import numpy as np
import random
import scipy.io
import sklearn
import numpy as np
import requests
from scipy.interpolate import spline
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split


DATABASE_NAME = 'classify/article_info3.db'
MODEL_PATH = ['model1.p', 'model2.p', 'model3.p', 'model4.p']

def select_all_from_articles(conn):
    c = conn.cursor()
    new_text = []
    ids = []
    for data in c.execute('Select * from articletext'):
        new_text.append(data[1])
        ids.append(data[0])
    big_array = np.array([ids,new_text]).T
    return big_array


class ArticleClassifier():
	def __init__(self, classifier_choice, article_url):
		self.classifier_choice = classifier_choice
		self.article_url = article_url
	def get_body(self, soup):
	    paragraphs = soup.find_all('p')
	    story = ""
	    for p in paragraphs:
	        text = p.get_text()
	        story = story + text
	    return story
	def scrape_article(self):
		user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009'+str(random.randint(1,100000))+' Firefox/3.0.7'
		headers={'User-Agent':user_agent,}
		response = requests.get(self.article_url,headers=headers)
		data = response.content
		soup = BeautifulSoup(data, 'html.parser')
		return self.get_body(soup)
	def start_classification(self):
		conn = sqlite3.connect(DATABASE_NAME)
		classifier = pickle.load(open("classify/" + MODEL_PATH[self.classifier_choice], "rb"))
		articles = select_all_from_articles(conn)[:, 1]
		list_of_articles = list(articles)
		list_of_articles.append(self.scrape_article())
		vectorizer = sklearn.feature_extraction.text.TfidfVectorizer(analyzer="word",decode_error="ignore",sublinear_tf=True,
		                                                             max_features=500,stop_words='english',min_df=0.0001,max_df=0.4,ngram_range=(1,2))
		X = vectorizer.fit_transform(list_of_articles).todense()
		prediction = classifier.predict_proba(X)
		return prediction[-1]



