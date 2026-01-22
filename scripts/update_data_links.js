
const fs = require('fs');
const path = require('path');

const dataPath = '/home/carlmarxt/Documents/Sitio web/js/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// Replace link: "Filename.html" with link: "articles/Filename.html"
// Avoid touching already absolute or relative paths if any (though currently they are filenames).
// We assume all local html links need to go to articles/
content = content.replace(/link:\s*"(?!http)(?!articles\/)([^"]+\.html)"/g, 'link: "articles/$1"');

fs.writeFileSync(dataPath, content);
console.log('Updated links in js/data.js');
