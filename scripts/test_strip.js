
const fs = require('fs');
const path = require('path');

const filePath = '/home/carlmarxt/Documents/Sitio web/Aritmetica.html';
const content = fs.readFileSync(filePath, 'utf8');

// Remove scripts
const noScripts = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "");
// Remove styles
const noStyles = noScripts.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, "");
// Remove links
const noLinks = noStyles.replace(/<link\b[^>]*>/gm, "");

console.log(`Original size: ${content.length}`);
console.log(`New size: ${noLinks.length}`);
console.log('--- First 500 chars ---');
console.log(noLinks.substring(0, 500));

fs.writeFileSync('/home/carlmarxt/Documents/Sitio web/Aritmetica_stripped.html', noLinks);
