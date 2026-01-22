/* --- Gestión de Noticias Científicas --- */

// Base de datos de noticias (puede ser reemplazada por una API)
const newsData = [
    // Ejemplo de noticias - estas pueden ser reemplazadas por datos reales
    {
        id: 1,
        title: "Nuevo descubrimiento en física cuántica",
        excerpt: "Científicos han logrado un avance significativo en el entrelazamiento cuántico, abriendo nuevas posibilidades para la computación cuántica.",
        category: "fisica",
        date: "2025-01-15",
        image: null,
        icon: "fas fa-atom",
        link: "#"
    },
    {
        id: 2,
        title: "Avances en la síntesis de nuevos materiales",
        excerpt: "Investigadores desarrollan materiales con propiedades únicas que podrían revolucionar la industria tecnológica.",
        category: "quimica",
        date: "2025-01-14",
        image: null,
        icon: "fas fa-flask",
        link: "#"
    },
    {
        id: 3,
        title: "Descubrimiento de nueva especie marina",
        excerpt: "Biólogos marinos identifican una nueva especie en las profundidades del océano, revelando la diversidad de la vida submarina.",
        category: "biologia",
        date: "2025-01-13",
        image: null,
        icon: "fas fa-dna",
        link: "#"
    },
    {
        id: 4,
        title: "Nueva misión espacial a Marte",
        excerpt: "La agencia espacial anuncia los detalles de la próxima misión que buscará evidencia de vida pasada en el planeta rojo.",
        category: "astronomia",
        date: "2025-01-12",
        image: null,
        icon: "fas fa-rocket",
        link: "#"
    },
    {
        id: 5,
        title: "Resolución de problema matemático centenario",
        excerpt: "Matemáticos logran resolver un problema que ha desafiado a la comunidad científica durante más de 100 años.",
        category: "matematicas",
        date: "2025-01-11",
        image: null,
        icon: "fas fa-calculator",
        link: "#"
    }
];

// Estado de filtros
let currentFilter = 'all';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initNewsFilters();
    renderNews();
});

/**
 * Inicializa los filtros de noticias
 */
function initNewsFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Agregar active al botón clickeado
            e.currentTarget.classList.add('active');
            
            // Actualizar filtro actual
            currentFilter = e.currentTarget.dataset.filter || 'all';
            
            // Re-renderizar noticias
            renderNews();
        });
    });
}

/**
 * Renderiza las noticias según el filtro actual
 */
function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    // Filtrar noticias
    const filteredNews = currentFilter === 'all' 
        ? newsData 
        : newsData.filter(news => news.category === currentFilter);
    
    // Si no hay noticias, mostrar mensaje vacío
    if (filteredNews.length === 0) {
        newsGrid.innerHTML = `
            <div class="news-empty" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <h3>No se encontraron noticias</h3>
                <p>No hay noticias en esta categoría por el momento</p>
            </div>
        `;
        return;
    }
    
    // Generar HTML de las noticias
    newsGrid.innerHTML = filteredNews.map(news => createNewsCard(news)).join('');
}

/**
 * Crea el HTML de una tarjeta de noticia
 */
function createNewsCard(news) {
    const date = new Date(news.date);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const imageContent = news.image 
        ? `<img src="${news.image}" alt="${news.title}">`
        : `<div class="icon-placeholder"><i class="${news.icon}"></i></div>`;
    
    return `
        <article class="news-card">
            <div class="news-card-image">
                ${imageContent}
            </div>
            <div class="news-card-content">
                <span class="news-card-category ${news.category}">${getCategoryName(news.category)}</span>
                <h3 class="news-card-title">${news.title}</h3>
                <p class="news-card-excerpt">${news.excerpt}</p>
                <div class="news-card-meta">
                    <div class="news-card-date">
                        <i class="far fa-calendar"></i>
                        <span>${formattedDate}</span>
                    </div>
                    <a href="${news.link}" class="news-card-read-more">
                        Leer más <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}

/**
 * Obtiene el nombre legible de una categoría
 */
function getCategoryName(category) {
    const names = {
        'fisica': 'Física',
        'quimica': 'Química',
        'biologia': 'Biología',
        'astronomia': 'Astronomía',
        'matematicas': 'Matemáticas'
    };
    return names[category] || category;
}

/**
 * Agrega una nueva noticia (para uso futuro con formulario de administración)
 */
function addNews(news) {
    newsData.push({
        ...news,
        id: newsData.length > 0 ? Math.max(...newsData.map(n => n.id)) + 1 : 1,
        date: news.date || new Date().toISOString().split('T')[0]
    });
    renderNews();
}

// Exportar funciones para uso externo si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { newsData, addNews };
}
