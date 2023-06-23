import json
import requests

# This file was to used to test the functionality of ml_api.

LOCAL_HOST = "http://127.0.0.1:8000/"
END_POINT = "url_classifier"

api_url = LOCAL_HOST + END_POINT

safe_urls = [
    {"url": "https://github.com/NUS-FinTechLab/nce-frontend"},
    {"url": "https://www.youtube.com/"},
    {"url": "https://outlook.live.com/mail/0/"},
    ]

for url in safe_urls:
    input_json = json.dumps(url)
    response = requests.post(api_url, data=input_json)
    print(response.text)

# Please don't click on these!
malicious_urls = [
    {"url": "http://tla95r.omenmy.ru"},
    {"url": "https://aadhyadvikdentalcare.com/img/blog/comment/ede/app/login.php"},
    {"url": "https://meta-business-case-9a00a.firebaseapp.com/"},
    ]

for url in malicious_urls:
    input_json = json.dumps(url)
    response = requests.post(api_url, data=input_json)
    print(response.text)