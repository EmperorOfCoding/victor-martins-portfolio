import json
import os

def get_keys(data, prefix=''):
    keys = set()
    if isinstance(data, dict):
        for k, v in data.items():
            full_key = f"{prefix}.{k}" if prefix else k
            keys.add(full_key)
            keys.update(get_keys(v, full_key))
    elif isinstance(data, list):
        for i, v in enumerate(data):
            full_key = f"{prefix}[{i}]"
            keys.add(full_key)
            keys.update(get_keys(v, full_key))
    return keys

def check_missing():
    locales = ['pt', 'en', 'es']
    messages = {}
    for locale in locales:
        path = f"c:/Users/Intel/OneDrive/Desktop/Projetos Github/victor-martins-portfolio/messages/{locale}.json"
        with open(path, 'r', encoding='utf-8') as f:
            messages[locale] = json.load(f)
    
    all_keys = set()
    keys_by_locale = {}
    for locale in locales:
        k = get_keys(messages[locale])
        keys_by_locale[locale] = k
        all_keys.update(k)
    
    for locale in locales:
        missing = all_keys - keys_by_locale[locale]
        if missing:
            print(f"Locale {locale} is missing keys: {sorted(list(missing))}")
        else:
            print(f"Locale {locale} is complete.")

if __name__ == "__main__":
    check_missing()
