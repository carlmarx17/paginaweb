
const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = '/home/carlmarxt/Documents/Sitio web/pages/articles';
const DATA_PATH = '/home/carlmarxt/Documents/Sitio web/js/data.js';

// Helper to slugify
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .trim();
}

// 1. Index Local Files
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.html'));
const fileMap = {}; // slug -> filename

files.forEach(file => {
    const name = file.replace('.html', '');
    const slug = slugify(name);
    fileMap[slug] = file;
    // Also handle case without accents in filename just in case
    // But Google usually handles this well.
});

console.log(`Indexed ${Object.keys(fileMap).length} local articles.`);

// 2. Read Data
let content = fs.readFileSync(DATA_PATH, 'utf8');

// 3. Replace URLs
// We look for "url": "..." or "mainUrl": "..."
// The values matches usually end with the slug.
// We can use a regex replacer function.

content = content.replace(/(url|mainUrl):\s*`\${config\.base[^`]+`|"(https:\/\/sites\.google\.com[^"]+)"/g, (match) => {
    // This is getting complicated to match the exact slug.
    // Instead, let's iterate over ALL slugs and string replace globally? 
    // No, that's inefficient and risky.

    // Better: parse the URL if possible, or just extract the last segment.
    return match; // Placeholder, see logic below
});

// Since the file uses template literals with variables, parsing is hard.
// BUT, the slugs are predictable.
// Example: ${config.baseUrlGuias}/matematicas-segundaria/aritmetica${config.suffix}
// The slug is "aritmetica".
// Example: .../aritmetica/numeros-enteros-y-racionales${config.suffix}
// Slug: "numeros-enteros-y-racionales"

// Strategy: Iterate over all known file slugs and replace their occurrences in the file.
// We look for `/slug${config.suffix}` or `/slug"` or `/slug?`
// And replace with `../../pages/articles/Filename.html"` (but we are in js/data.js, so we need absolute or relative to the HTML page using it).
// The HTML pages are in `pages/` (guias.html) or `pages/` (mundos.html). 
// So `articles/Filename.html` is the correct path from `pages/`.

let replacedCount = 0;

Object.keys(fileMap).forEach(slug => {
    const filename = fileMap[slug];
    const newPath = `articles/${filename}`; // Relative to pages/

    // Regex identifying the slug at the end of a URL structure
    // Matches: /slug${config.suffix}  OR  /slug" 
    // We replace the WHOLE URL value with "articles/filename.html"

    // Case 1: Template literal ending in slug + suffix
    // key: `${...}/slug${config.suffix}`
    // We want to replace `${...}/slug${config.suffix}` with "articles/Filename.html"
    // Note: The key in the file is `url: ...`

    const regexTemplate = new RegExp(`\`\\$\\{config\\.[^}]+\\}[^$]*\\/${slug}\\$\\{config\\.suffix\\}\``, 'g');
    if (regexTemplate.test(content)) {
        content = content.replace(regexTemplate, `"${newPath}"`);
        replacedCount++;
    }

    // Case 2: Simple strings if any
    const regexString = new RegExp(`"https:\\/\\/sites\\.google\\.com\\/[^"]+\\/${slug}"`, 'g'); // Simplified
    // Not actually handling strings much based on the file view, mostly templates.
});

// Special case for 'Principito' -> 'principito' vs 'el-principito'
// My slugify might not match exactly Google's behavior or filenames.
// But it's a good start.

fs.writeFileSync(DATA_PATH, content);
console.log(`Replaced ${replacedCount} links in js/data.js`);
