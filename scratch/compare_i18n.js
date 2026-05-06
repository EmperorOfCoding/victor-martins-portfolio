const fs = require('fs');

function getKeys(obj, prefix = '') {
    return Object.keys(obj).reduce((res, el) => {
        if (Array.isArray(obj[el])) {
            res.push(prefix + el);
        } else if (typeof obj[el] === 'object' && obj[el] !== null) {
            res.push(...getKeys(obj[el], prefix + el + '.'));
        } else {
            res.push(prefix + el);
        }
        return res;
    }, []);
}

const pt = JSON.parse(fs.readFileSync('messages/pt.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));

const ptKeys = getKeys(pt);
const enKeys = getKeys(en);
const esKeys = getKeys(es);

console.log('--- Missing in EN ---');
ptKeys.filter(k => !enKeys.includes(k)).forEach(k => console.log(k));

console.log('\n--- Missing in ES ---');
ptKeys.filter(k => !esKeys.includes(k)).forEach(k => console.log(k));

console.log('\n--- Extra in EN ---');
enKeys.filter(k => !ptKeys.includes(k)).forEach(k => console.log(k));

console.log('\n--- Extra in ES ---');
esKeys.filter(k => !ptKeys.includes(k)).forEach(k => console.log(k));
