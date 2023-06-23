from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import requests
import pickle
import json

app = FastAPI()

class url_input(BaseModel):
    url: str

# Loading the saved model
filename = 'url_classifier.sav'
url_classifier_model = pickle.load(open(filename, 'rb'))

@app.post('/url_classifier')
def url_pred(input: url_input):

    input_data = input.json()
    input_dict = json.loads(input_data)

    url = input_dict["url"]
    input_list = [
        entropy(url), 
        count_digits(url), 
        length(url), 
        count_params(url), 
        count_frags(url), 
        has_HTTP(url)
        ]
    # Returns a 1 if the model classifies the features as malicious, and 0 if classified as benign.
    prediction = url_classifier_model.predict([input_list])

    if prediction == 1:
        return True
    else:
        return False

def entropy(url):
    prob = [float(url.count(c)) / len(url) for c in dict.fromkeys(list(url))]
    entropy = sum([(p * np.log(p) / np.log(2.0)) for p in prob])
    return entropy

def count_digits(url):
    return sum(c.isdigit() for c in url)

def length(url):
    return len(url)

def count_params(url):
    split = url.split('?')
    if len(split) > 1:
        return len(split[1].split('&'))
    else:
        return 0
    
def count_frags(url):
    return len(url.split('#')) - 1

def has_HTTP(url):
    if "http:" in url:
        return 1
    else:
        return 0

