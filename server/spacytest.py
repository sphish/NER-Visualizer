import spacy
from spacy import displacy

text = """But Google is starting from behind. The company made a late push
into hardware, and Apple’s Siri, available on iPhones, and Amazon’s Alexa
software, which runs on its Echo and Dot devices, have clear leads in
consumer adoption."""

nlp = spacy.load("en_core_web_sm")
doc = nlp(text)

#  return json.dumps({'html': 'When <mark data-entity="person">Sebastian Thrun</mark> started working on self-driving cars at <mark data-entity="org">Google</mark> in <mark data-entity="date">2007</mark>, few people outside of the company took him seriously.<br><br>“I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said <mark data-entity="person">Thrun</mark>, now the co-founder and CEO of online higher education startup <mark data-entity="org">Udacity</mark>, in an interview with <mark data-entity="person">Recode</mark> <mark data-entity="date">earlier this week</mark>.'})
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

print(gen_html(parse_ents(doc), text))
