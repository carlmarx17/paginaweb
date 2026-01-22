
import { guidesData, booksData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const filename = window.location.pathname.split('/').pop();
    // Assuming structure is articles/Filename.html
    const currentPath = `articles/${filename}`;
    let decodedPath = decodeURIComponent(currentPath);

    // Flatten all topics to find current and adjacents
    // Guides have subtopics. Books have subtopics.

    let allLinks = [];

    // Helper to add links
    const addLink = (title, url, type, contextTitle) => {
        // Normalize
        if (url && url !== '#') {
            // Handle relative paths if needed, but data.js has "articles/Name.html"
            allLinks.push({
                title: title,
                url: url,
                type: type,
                context: contextTitle
            });
        }
    };

    // 1. Process Guides
    guidesData.forEach(guide => {
        // Add main guide page if it exists
        addLink(guide.title, guide.mainUrl, 'guide', 'Guía Principal');

        // Add subtopics
        guide.subtopics.forEach(sub => {
            addLink(sub.name, sub.url, 'subtopic', guide.title);
        });
    });

    // 2. Process Books
    booksData.forEach(book => {
        addLink(book.title, book.mainUrl, 'book', 'Libro');
        book.subtopics.forEach(sub => {
            addLink(sub.name, sub.url, 'subtopic', book.title);
        });
    });

    // Find Index
    // We try to match with decoded path (e.g., "articles/Números.html")
    // or just filename matching.

    const currentIndex = allLinks.findIndex(link => {
        // Check exact match
        if (link.url === decodedPath) return true;
        // Check filename match
        if (link.url.endsWith(filename)) return true;
        // Check decode match
        if (decodeURIComponent(link.url).endsWith(decodeURIComponent(filename))) return true;

        return false;
    });

    if (currentIndex !== -1) {
        const navContainer = document.getElementById('article-navigation');
        if (!navContainer) return;

        // Prev Link
        if (currentIndex > 0) {
            const prev = allLinks[currentIndex - 1];
            // Fix URL to be relative to current article page (which is inside articles/)
            // So if link is "articles/Foo.html", we need "Foo.html" (sibling).
            // data.js has "articles/Foo.html". 
            // We want just "Foo.html" if we are in "articles/".

            const prevUrl = prev.url.replace('articles/', '');

            navContainer.innerHTML += `
                <a href="${prevUrl}" class="article-nav-btn article-nav-prev">
                    <i class="fas fa-arrow-left"></i>
                    <div>
                        <span class="article-nav-label">Anterior (${prev.context})</span>
                        <span class="article-nav-title">${prev.title}</span>
                    </div>
                </a>
            `;
        } else {
            // Placeholder for spacing
            navContainer.innerHTML += `<div></div>`;
        }

        // Next Link
        if (currentIndex < allLinks.length - 1) {
            const next = allLinks[currentIndex + 1];
            const nextUrl = next.url.replace('articles/', '');

            navContainer.innerHTML += `
                <a href="${nextUrl}" class="article-nav-btn article-nav-next">
                    <div>
                        <span class="article-nav-label">Siguiente (${next.context})</span>
                        <span class="article-nav-title">${next.title}</span>
                    </div>
                    <i class="fas fa-arrow-right"></i>
                </a>
            `;
        }

        // Dynamic Back Button Logic
        const currentItem = allLinks[currentIndex];
        const backBtn = document.querySelector('.btn-secondary'); // The "Volver al Inicio" button

        if (backBtn && currentItem) {
            // Determine parent category based on context or type
            // My allLinks objects have: type, context
            // context is 'Guía Principal' or 'Title of Guide'

            // Simple heuristic: check if it's from books data
            const isBook = booksData.some(b => b.title === currentItem.context || b.mainUrl.includes(filename));

            if (isBook) {
                backBtn.href = '../../pages/mundos.html';
                backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Volver a Mundos';
            } else {
                backBtn.href = '../../pages/guias.html';
                backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Volver a Guías';
            }
        }
    }
});
