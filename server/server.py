import spacy
from spacy import displacy
from flask import Flask
from flask import request
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_sm")

@app.route('/', methods = ['GET', 'POST'])
def getResult():
  if request.method == 'GET':
    return "hello"
  elif request.method == 'POST':
    body = request.get_json()
    print(body)
    inputText = body['text']
    doc = nlp(inputText)
    ents = parse_ents(doc)
    resp = gen_html(ents, inputText)
    return json.dumps({"html": resp})

def parse_ents(doc, options={}):
    """Generate named entities in [{start: i, end: i, label: 'label'}] format.

    doc (Doc): Document do parse.
    RETURNS (dict): Generated entities keyed by text (original text) and ents.
    """
    ents = [
        {"start": ent.start_char, "end": ent.end_char, "label": ent.label_}
        for ent in doc.ents
    ]
    title = doc.user_data.get("title", None) if hasattr(doc, "user_data") else None
    return ents

def gen_html(ents, text):
  cur = 0
  segments = []
  for ent in ents:
    segments.append((ent['start'] - cur, ""))
    segments.append((ent['end'] - ent['start'], ent["label"]))
    cur = ent['end']
  segments.append((len(text) - cur, ""))

  html = ""
  cur = 0
  for seg in segments:
    raw = text[cur:cur + seg[0]]
    cur += seg[0]
    if seg[1] == "":
      html += raw
    else:
      html += '<mark data-entity="%s">%s</mark>' % (seg[1].lower(), raw)
  return html