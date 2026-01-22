/**
 * Script para estandarizar las páginas HTML con navegación compartida
 * 
 * Este script busca y actualiza las páginas HTML para usar el sistema de navegación compartido.
 * 
 * Uso: node scripts/standardize-pages.js [ruta-archivo]
 * 
 * Si no se proporciona ruta, procesa todos los archivos HTML en pages/articles/
 */

const fs = require('fs');
const path = require('path');

// Configuración
const ARTICLES_DIR = path.join(__dirname, '../pages/articles');
const PAGES_DIR = path.join(__dirname, '../pages');

/**
 * Determina la ruta relativa al directorio raíz basado en la ubicación del archivo
 */
function getBasePath(filePath) {
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    const depth = relativePath.split(path.sep).length - 1;
    
    if (relativePath.startsWith('pages/articles')) {
        return '../../';
    } else if (relativePath.startsWith('pages')) {
        return '../';
    }
    return './';
}

/**
 * Obtiene los enlaces CSS correctos según la ubicación del archivo
 */
function getCSSLinks(basePath) {
    if (basePath === '../../') {
        return `    <link rel="stylesheet" href="${basePath}css/style.css">
    <link rel="stylesheet" href="${basePath}css/components.css">`;
    } else if (basePath === '../') {
        return `    <link rel="stylesheet" href="${basePath}css/style.css">
    <link rel="stylesheet" href="${basePath}css/components.css">`;
    } else {
        return `    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/components.css">`;
    }
}

/**
 * Obtiene los enlaces de scripts correctos
 */
function getScriptLinks(basePath) {
    const sharedNavPath = basePath === '../../' ? '../../js/shared-nav.js' : 
                         basePath === '../' ? '../js/shared-nav.js' : 
                         'js/shared-nav.js';
    
    return `    <script src="${sharedNavPath}"></script>`;
}

/**
 * Actualiza un archivo HTML para usar la navegación compartida
 */
function standardizeHTMLFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const basePath = getBasePath(filePath);
        const fileName = path.basename(filePath);
        
        // Verificar si ya tiene el placeholder de navegación compartida
        if (content.includes('id="shared-navbar"') || content.includes('shared-nav.js')) {
            console.log(`✓ ${fileName} ya está estandarizado`);
            return false;
        }
        
        // Buscar y reemplazar el head para asegurar que tenga los CSS correctos
        const cssLinks = getCSSLinks(basePath);
        const fontAwesomeLink = '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">';
        const googleFontsLink = `    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet">`;
        
        // Buscar el cierre de </head>
        if (content.includes('</head>')) {
            // Asegurar que los CSS estén presentes
            if (!content.includes('css/style.css')) {
                content = content.replace('</head>', `${cssLinks}\n</head>`);
            }
            
            // Asegurar Font Awesome
            if (!content.includes('font-awesome')) {
                content = content.replace('</head>', `${fontAwesomeLink}\n</head>`);
            }
            
            // Asegurar Google Fonts
            if (!content.includes('fonts.googleapis.com')) {
                content = content.replace('</head>', `${googleFontsLink}\n</head>`);
            }
        }
        
        // Buscar y reemplazar navbar existente
        const navbarPatterns = [
            /<header[^>]*class="navbar"[^>]*>[\s\S]*?<\/header>/gi,
            /<nav[^>]*class="navbar"[^>]*>[\s\S]*?<\/nav>/gi,
            /<header[^>]*>[\s\S]*?navbar[\s\S]*?<\/header>/gi,
        ];
        
        let navbarReplaced = false;
        navbarPatterns.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, '<div id="shared-navbar"></div>');
                navbarReplaced = true;
            }
        });
        
        // Si no se encontró navbar, buscar dónde insertarlo (después de <body>)
        if (!navbarReplaced) {
            const bodyMatch = content.match(/<body[^>]*>/);
            if (bodyMatch) {
                const bodyIndex = content.indexOf(bodyMatch[0]) + bodyMatch[0].length;
                content = content.slice(0, bodyIndex) + '\n    <div id="shared-navbar"></div>' + content.slice(bodyIndex);
            }
        }
        
        // Buscar y reemplazar footer existente
        const footerPatterns = [
            /<footer[^>]*class="footer"[^>]*>[\s\S]*?<\/footer>/gi,
        ];
        
        let footerReplaced = false;
        footerPatterns.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, '<div id="shared-footer"></div>');
                footerReplaced = true;
            }
        });
        
        // Si no se encontró footer, insertarlo antes de </body>
        if (!footerReplaced) {
            const bodyCloseIndex = content.lastIndexOf('</body>');
            if (bodyCloseIndex !== -1) {
                content = content.slice(0, bodyCloseIndex) + '    <div id="shared-footer"></div>\n' + content.slice(bodyCloseIndex);
            }
        }
        
        // Asegurar que el script de navegación compartida esté presente
        const scriptLinks = getScriptLinks(basePath);
        if (!content.includes('shared-nav.js')) {
            const bodyCloseIndex = content.lastIndexOf('</body>');
            if (bodyCloseIndex !== -1) {
                content = content.slice(0, bodyCloseIndex) + `    ${scriptLinks}\n` + content.slice(bodyCloseIndex);
            }
        }
        
        // Guardar el archivo actualizado
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Actualizado: ${fileName}`);
        return true;
        
    } catch (error) {
        console.error(`✗ Error procesando ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Procesa todos los archivos HTML en un directorio
 */
function processDirectory(dir, recursive = true) {
    const files = fs.readdirSync(dir);
    let updated = 0;
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && recursive) {
            updated += processDirectory(filePath, recursive);
        } else if (file.endsWith('.html') && !file.includes('template')) {
            if (standardizeHTMLFile(filePath)) {
                updated++;
            }
        }
    });
    
    return updated;
}

// Ejecutar el script
const targetFile = process.argv[2];

if (targetFile) {
    // Procesar un archivo específico
    const filePath = path.isAbsolute(targetFile) ? targetFile : path.join(__dirname, '..', targetFile);
    if (fs.existsSync(filePath)) {
        standardizeHTMLFile(filePath);
    } else {
        console.error(`Archivo no encontrado: ${filePath}`);
    }
} else {
    // Procesar todos los archivos en pages/articles/
    console.log('Estandarizando páginas HTML...\n');
    const updated = processDirectory(ARTICLES_DIR);
    console.log(`\n✓ Proceso completado. ${updated} archivos actualizados.`);
}
