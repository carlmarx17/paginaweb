/* --- Lógica de Bibliotecas (Guias y Mundos) --- */
import { booksData } from './data.js';
import { openModal } from './library-utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const isWorldsPage = document.getElementById('libraryGrid');

    if (isWorldsPage) {
        initWorlds();
    }
});

/* ================== MUNDOS (Literatura 3D) ================== */
function initWorlds() {
    let currentFilter = 'all';
    let searchQuery = '';
    const grid = document.getElementById('libraryGrid');

    if (!grid) return;

    // Filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');

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
            card.onclick = () => {
                const sound = document.getElementById('bookSound');
                if (sound) {
                    sound.currentTime = 0;
                    sound.play().catch(e => console.log("Audio play failed:", e));
                }
                openModal(book, 'book');
            };
            card.style.setProperty('--book-color', getBookColor(book.color));

            card.innerHTML = `
                <div class="book-cover">
                    <div class="book-spine-effect"></div>
                    <div class="book-title">${book.title}</div>
                    <i class="fas ${book.icon} book-icon"></i>
                    <div class="book-author">${book.author.split(' ').pop()}</div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function getBookColor(tailwindClass) {
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

    render();
}
