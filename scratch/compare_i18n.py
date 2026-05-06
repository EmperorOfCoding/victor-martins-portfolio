import json
import os

def get_keys(data, prefix=''):
    keys = set()
    if isinstance(data, dict):
        for k, v in data.items():
            new_prefix = f"{prefix}.{k}" if prefix else k
            keys.add(new_prefix)
            keys.update(get_keys(v, new_prefix))
    elif isinstance(data, list):
        # We don't usually care about list indices for simple key check, 
        # but next-intl raw might use them. For now, let's just track the list itself.
        pass
    return keys

path = 'c:/Users/Intel/OneDrive/Desktop/Projetos Github/victor-martins-portfolio/messages'
pt = json.load(open(os.path.join(path, 'pt.json'), encoding='utf-8'))
en = json.load(open(os.path.join(path, 'en.json'), encoding='utf-8'))
es = json.load(open(os.path.join(path, 'es.json'), encoding='utf-8'))

pt_keys = get_keys(pt)
en_keys = get_keys(en)
es_keys = get_keys(es)

print("Missing in EN:")
for k in sorted(pt_keys - en_keys):
    print(f"  {k}")

print("\nMissing in ES:")
for k in sorted(pt_keys - es_keys):
    print(f"  {k}")

print("\nExtra in EN (might be old keys):")
for k in sorted(en_keys - pt_keys):
    print(f"  {k}")

print("\nExtra in ES (might be old keys):")
for k in sorted(es_keys - pt_keys):
    print(f"  {k}")
