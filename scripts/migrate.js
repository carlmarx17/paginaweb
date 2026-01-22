
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = '/home/carlmarxt/Documents/Sitio web';
const DEST_DIR = path.join(SOURCE_DIR, 'pages/articles');
const TEMPLATE_PATH = path.join(DEST_DIR, 'template.html');

// Read Template
const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Get all HTML files in Source Dir
const files = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith('.html') && file !== 'index.html');

console.log(`Found ${files.length} files to migrate.`);

let successCount = 0;


files.forEach(file => {
    const srcPath = path.join(SOURCE_DIR, file);

    // Skip if directory
    if (fs.lstatSync(srcPath).isDirectory()) return;

    // Read content
    let rawContent = fs.readFileSync(srcPath, 'utf8');

    // Check if the file contains encoded HTML
    // We look for the "&lt;!DOCTYPE html&gt;" pattern or similar.
    let contentToProcess = rawContent;

    // Regex to capture the encoded HTML block. 
    // It usually starts with &lt;!DOCTYPE html&gt; and ends with &lt;/html&gt;
    // We take the largest block found.
    const encodedMatch = rawContent.match(/&lt;!DOCTYPE html&gt;[\s\S]*?&lt;\/html&gt;/i);

    if (encodedMatch) {
        console.log(`  -> Found encoded content in ${file}, extracting...`);
        let encoded = encodedMatch[0];
        // Decode HTML entities
        contentToProcess = encoded
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');
    } else {
        console.log(`  -> No encoded content found in ${file}, using raw.`);
    }

    // Extract Title (Simple regex from the PROCESSED content)
    const titleMatch = contentToProcess.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace('Profesor Carlos Martinez - ', '').trim() : file.replace('.html', '');

    console.log(`Processing: ${file} -> ${title}`);

    let content = contentToProcess;

    // --- Cleanup Strategy ---

    // 1. Remove Scripts and Styles (and meta, link, comments)
    content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, "");
    content = content.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gmi, "");
    content = content.replace(/<link\b[^>]*>/gmi, "");
    content = content.replace(/<meta\b[^>]*>/gmi, "");
    content = content.replace(/<!--[\s\S]*?-->/gmi, "");

    // 2. Remove Navigation/Header/Footer/Skip links created by Google Sites
    content = content.replace(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gmi, "");
    content = content.replace(/<header\b[^>]*>([\s\S]*?)<\/header>/gmi, "");
    content = content.replace(/<footer\b[^>]*>([\s\S]*?)<\/footer>/gmi, "");

    // Remove "Skip to main content" buttons
    content = content.replace(/<div[^>]*>Skip to main content<\/div>/gmi, "");
    content = content.replace(/Skip to main content/gmi, "");

    // 3. Remove SVG icons
    content = content.replace(/<svg\b[^>]*>([\s\S]*?)<\/svg>/gmi, "");

    // 4. Strip outer HTML tags to get just the body content
    content = content.replace(/<!DOCTYPE html>/gi, "");
    content = content.replace(/<html\b[^>]*>/gi, "");
    content = content.replace(/<\/html>/gi, "");
    content = content.replace(/<head\b[^>]*>([\s\S]*?)<\/head>/gi, "");
    content = content.replace(/<body\b[^>]*>/gi, "");
    content = content.replace(/<\/body>/gi, "");

    // 5. Clean Attributes
    content = content.replace(/\s(jscontroller|jsaction|jsname|jsmodel|data-[a-z0-9-]+)="[^"]*"/gi, "");
    content = content.replace(/\sstyle="[^"]*"/gi, "");
    content = content.replace(/\sclass="[^"]*"/gi, "");

    // 6. Fix Links
    content = content.replace(/href="Principal\.html"/gi, 'href="../../index.html"');
    content = content.replace(/href="Guias%20??(de)?%20??Estudio\.html"/gi, 'href="../../pages/guias.html"');
    content = content.replace(/href="Mundos%20??(Literarios)?%20??Excusive\.html"/gi, 'href="../../pages/mundos.html"');

    // 7. Final Trim
    content = content.replace(/<div>\s*<\/div>/gmi, "");
    content = content.replace(/<span>\s*<\/span>/gmi, "");

    // Inject into Template
    let html = template.replace('{{TITLE}}', title);
    html = html.replace('{{CONTENT}}', content);

    // Save
    const destPath = path.join(DEST_DIR, file);
    fs.writeFileSync(destPath, html);
    successCount++;
});


console.log(`Successfully migrated ${successCount} files.`);
