from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
  return [{'start': 4, 'end': 10, 'label': 'ORG'}, {'start': 84, 'end': 96, 'label': 'ORG'}, {'start': 111, 'end': 118, 'label': 'ORG'}, {'start': 124, 'end': 130, 'label': 'ORG'}, {'start': 167, 'end': 179, 'label': 'ORG'}]