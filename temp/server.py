from flask import Flask	
from flask import request	
from flask_cors import CORS	
import json	
app = Flask(__name__)	
CORS(app)	


@app.route('/', methods = ['GET', 'POST'])	
def getResult():	
  if request.method == 'GET':	
    return "hello"	
  elif request.method == 'POST':	
    body = request.get_json()	
    print(body)	
    inputText = body['text']	
    ents = [{"start": 1, "end": 4, "label": "ORG"}, {"start": 6, "end": 8, "label": "LOC"}]
    # resp = gen_html(ents, inputText)	
    return json.dumps({"text": body['text'], "ents": ents})

def parse_ents(doc, options={}):	
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