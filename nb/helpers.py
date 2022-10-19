import boto3
import os
from dotenv import load_dotenv
from pandas import json_normalize
import urllib.request, json 

load_dotenv()

ACCESS_ID = os.getenv('ACCESS_ID')
SECRET_KEY = os.getenv('SECRET_KEY')

def uploadToS3(filename):
    session = boto3.session.Session()
    client = session.client('s3',
                            region_name='fra1',
                            endpoint_url='https://fra1.digitaloceanspaces.com',
                            aws_access_key_id=ACCESS_ID,
                            aws_secret_access_key=SECRET_KEY)
    try:
        client.upload_file(f'{filename}', 'severin', f'hslu/{filename}', {"ACL": "public-read", "ContentType": "application/json"})
        return "success"
    except:
        return "error"

def getPreprocessedFile():
    with urllib.request.urlopen("https://severin.fra1.digitaloceanspaces.com/hslu/RoadTrafficPreProcessed.json") as url:
        data = json.load(url)
    return json_normalize(data) 

def getS3File(filename):
    with urllib.request.urlopen(f"https://severin.fra1.digitaloceanspaces.com/hslu/{filename}") as url:
        data = json.load(url)
    return json_normalize(data) 