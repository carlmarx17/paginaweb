/* --- Lógica de Bibliotecas (Guias y Mundos) --- */
import { guidesData, booksData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Detectar página actual
    const isGuidesPage = document.getElementById('guidesGrid');
    const isWorldsPage = document.getElementById('libraryGrid');

    if (isGuidesPage) {
        initGuides();
    } else if (isWorldsPage) {
        initWorlds();
    }
});

/* ================== GUÍAS (Académico) ================== */
function initGuides() {
    let currentType = 'all';
    let searchQuery = '';

    const grid = document.getElementById('guidesGrid');
    const resultCount = document.getElementById('resultCount');

    // Filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // UI
            filterBtns.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget; // Use currentTarget to ensure we get the button
            target.classList.add('active');

            // Logic
            currentType = target.dataset.filter;
            // Handle specific level visibility if needed
            const levelContainer = document.getElementById('levelFilterContainer');
            if (levelContainer) {
                if (['matematicas', 'fisica', 'quimica', 'biologia'].includes(currentType)) {
                    levelContainer.classList.remove('hidden');
                } else {
                    levelContainer.classList.add('hidden');
                }
            }

            render();
        });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            render();
        });
    }

    function getCategoryFromId(id) {
        if (id.startsWith('m-')) return 'matematicas';
        if (id.startsWith('f-')) return 'fisica';
        if (id.startsWith('q-')) return 'quimica';
        if (id.startsWith('b-')) return 'biologia';
        if (id.startsWith('l-')) return 'literatura';
        return 'otro';
    }

    function render() {
        if (!grid) return;

        const filtered = guidesData.filter(item => {
            const cat = getCategoryFromId(item.id);
            const matchesType = (currentType === 'all')
                ? true
                : (currentType === 'literatura' ? item.type === 'literatura' : cat === currentType);

            // Búsqueda
            const matchesSearch = item.title.toLowerCase().includes(searchQuery) ||
                item.desc.toLowerCase().includes(searchQuery);

            return matchesType && matchesSearch;
        });

        // Update UI
        grid.innerHTML = '';
        if (resultCount) resultCount.textContent = `${filtered.length} guías encontradas`;

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'guide-card';
            card.onclick = () => openModal(item, 'guide');

            // Icono
            const iconClass = `fas ${item.icon}`;

            // Colors logic could be improved to use CSS variables, but keeping it simple for migration
            // We'll rely on the classes existing in the CSS or map them if needed.
            // For now, assuming standard classes.

            card.innerHTML = `
                <div class="guide-header ${item.bg}">
                    <i class="${iconClass}"></i>
                    ${item.status === 'pronto' ? '<span class="status-badge">Pronto</span>' : ''}
                </div>
                <div class="guide-body">
                    <h3 class="guide-title">${item.title}</h3>
                    <p class="guide-desc">${item.desc}</p>
                    <div class="guide-topics">
                        <i class="fas fa-list"></i> ${item.subtopics.length} temas
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Init
    render();
}

/* ================== MUNDOS (Literatura 3D) ================== */
function initWorlds() {
    let currentFilter = 'all';
    let searchQuery = '';
    const grid = document.getElementById('libraryGrid');

    // Filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            const target = e.currentTarget;
            target.classList.add('active');

            // Logic would need to know what filter this button represents
            // Assuming text content or data attribute. Let's assume data-filter.
            if (target.dataset.filter) {
                currentFilter = target.dataset.filter;
                render();
            }
        });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            render();
        });
    }

    function render() {
        if (!grid) return;

        const filtered = booksData.filter(book => {
            const matchFilter = currentFilter === 'all' || book.genre === currentFilter;
            const matchSearch = book.title.toLowerCase().includes(searchQuery) ||
                book.author.toLowerCase().includes(searchQuery);
            return matchFilter && matchSearch;
        });

        grid.innerHTML = '';

        filtered.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-container';
            card.onclick = () => openModal(book, 'book');
            // Helper to set color variable if needed
            card.style.setProperty('--book-color', getBookColor(book.color));

            card.innerHTML = `
                <div class="book-cover">
                    <div class="book-title">${book.title}</div>
                    <i class="fas ${book.icon} book-icon"></i>
                    <div class="book-author">${book.author.split(' ').pop()}</div>
                </div>
                <!-- Shelf shadow is handled by CSS on container or ::after -->
            `;
            grid.appendChild(card);
        });
    }

    function getBookColor(tailwindClass) {
        // Map common tailwind colors to hex for inline boolean logic if needed
        // Or simply add the class to the element and let CSS handle it.
        // For the 3D effect which might use variables:
        const map = {
            'bg-emerald-900': '#064e3b',
            'bg-emerald-800': '#065f46',
            'bg-indigo-500': '#6366f1',
            'bg-indigo-900': '#312e81',
            'bg-amber-700': '#b45309',
            'bg-amber-600': '#d97706',
            'bg-green-800': '#166534',
            'bg-slate-800': '#1e293b',
            'bg-pink-900': '#831843',
            'bg-orange-800': '#9a3412',
            'bg-sky-800': '#075985',
            'bg-blue-900': '#1e3a8a',
            'bg-purple-900': '#581c87',
            'bg-red-800': '#991b1b',
            'bg-stone-800': '#292524',
            'bg-lime-900': '#365314',
            'bg-cyan-900': '#164e63',
            'bg-teal-950': '#042f2e',
            'bg-rose-950': '#4c0519',
            'bg-gray-800': '#1f2937'
        };
        return map[tailwindClass] || '#4a5568';
    }

    // Init
    render();
}

/* ================== MODAL GLOBAL ================== */
function openModal(item, type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';

    let contentHTML = '';

    if (type === 'guide') {
        const subtopics = item.subtopics.map(sub =>
            `<li><a href="${sub.url}" target="_blank">${sub.name}</a></li>`
        ).join('');

        contentHTML = `
            <div class="modal-content">
                <div class="modal-header ${item.bg}">
                    <i class="fas ${item.icon}"></i>
                    <h2>${item.title}</h2>
                </div>
                <div class="modal-body">
                    <p>${item.desc}</p>
                    <h3>Temas Disponibles</h3>
                    <ul class="subtopics-list">
                        ${subtopics || '<li>Próximamente</li>'}
                    </ul>
                    <div class="modal-footer">
                        <button class="btn btn-secondary close-modal">Cerrar</button>
                        ${item.mainUrl !== '#' ? `<a href="${item.mainUrl}" target="_blank" class="btn btn-primary">Ver Guía</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    } else {
        // Book Modal
        const scienceTags = item.science ? item.science.map(tag => `<span class="tag">${tag}</span>`).join(' ') : '';
        const subtopics = item.subtopics ? item.subtopics.map(sub =>
            `<li><a href="${sub.url}" target="_blank">${sub.name}</a></li>`
        ).join('') : '';

        contentHTML = `
            <div class="modal-content dark">
                <div class="modal-body">
                    <h2>${item.title}</h2>
                    <p class="author">${item.author}</p>
                    <p class="desc">${item.desc}</p>
                    
                    <div class="tags-container">
                        ${scienceTags}
                    </div>

                    ${subtopics ? `<ul class="subtopics-list">${subtopics}</ul>` : ''}

                    <div class="modal-footer">
                           <button class="btn btn-secondary close-modal">Cerrar</button>
                           ${item.mainUrl !== '#' ? `<a href="${item.mainUrl}" target="_blank" class="btn btn-primary">Leer Análisis</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    modal.innerHTML = contentHTML;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}
