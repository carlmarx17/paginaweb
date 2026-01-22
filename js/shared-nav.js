/* --- Navegación Compartida para todas las páginas --- */

/**
 * Determina la ruta relativa al index.html basado en la ubicación actual
 */
function getBasePath() {
    const path = window.location.pathname;
    const depth = path.split('/').filter(p => p && !p.endsWith('.html')).length;
    
    // Si estamos en la raíz
    if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
        return './';
    }
    
    // Si estamos en pages/
    if (path.includes('/pages/')) {
        return '../';
    }
    
    // Si estamos en pages/articles/
    if (path.includes('/pages/articles/')) {
        return '../../';
    }
    
    // Por defecto, asumimos que estamos en la raíz
    return './';
}

/**
 * Crea el header/navbar unificado
 */
function createSharedNavbar() {
    const basePath = getBasePath();
    const currentPath = window.location.pathname;
    
    // Determinar página activa
    let activePage = '';
    if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        activePage = 'inicio';
    } else if (currentPath.includes('guias.html')) {
        activePage = 'guias';
    } else if (currentPath.includes('mundos.html')) {
        activePage = 'mundos';
    } else if (currentPath.includes('noticias.html')) {
        activePage = 'noticias';
    }
    
    return `
        <header class="navbar">
            <div class="container">
                <a href="${basePath}index.html" class="logo">
                    <div class="logo-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    Carlos Martínez
                </a>
                <div class="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav>
                    <ul>
                        <li><a href="${basePath}index.html" class="${activePage === 'inicio' ? 'active' : ''}">Inicio</a></li>
                        <li><a href="${basePath}pages/guias.html" class="${activePage === 'guias' ? 'active' : ''}">Guías Estudio</a></li>
                        <li><a href="${basePath}pages/mundos.html" class="${activePage === 'mundos' ? 'active' : ''}">Mundos 3D</a></li>
                        <li><a href="${basePath}pages/noticias.html" class="${activePage === 'noticias' ? 'active' : ''}">Noticias Científicas</a></li>
                        <li><a href="${basePath}index.html#contacto" class="nav-highlight">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
}

/**
 * Crea el footer unificado
 */
function createSharedFooter() {
    const basePath = getBasePath();
    
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-column">
                        <h4>Carlos Martínez</h4>
                        <p>Tutorías de ciencias personalizadas para estudiantes de todos los niveles. Comprometido con tu éxito académico.</p>
                    </div>
                    <div class="footer-column">
                        <h4>Enlaces Rápidos</h4>
                        <ul class="footer-links">
                            <li><a href="${basePath}index.html"><i class="fas fa-chevron-right"></i> Inicio</a></li>
                            <li><a href="${basePath}pages/guias.html"><i class="fas fa-chevron-right"></i> Guías</a></li>
                            <li><a href="${basePath}pages/mundos.html"><i class="fas fa-chevron-right"></i> Mundos 3D</a></li>
                            <li><a href="${basePath}pages/noticias.html"><i class="fas fa-chevron-right"></i> Noticias</a></li>
                            <li><a href="${basePath}index.html#contacto"><i class="fas fa-chevron-right"></i> Contacto</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Contacto</h4>
                        <ul class="footer-links">
                            <li><a href="mailto:carlossibaja644@gmail.com"><i class="fas fa-envelope"></i> carlossibaja644@gmail.com</a></li>
                            <li><a href="tel:+573103106954"><i class="fas fa-phone"></i> +57 310 310 6954</a></li>
                            <li><a href="https://wa.me/573103106954"><i class="fab fa-whatsapp"></i> WhatsApp</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Carlos Martínez - Tutorías de Ciencias. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    `;
}

/**
 * Inicializa la navegación compartida
 * Busca elementos con id="shared-navbar" y "shared-footer" y los reemplaza
 */
function initSharedNavigation() {
    // Inyectar navbar
    const navbarPlaceholder = document.getElementById('shared-navbar');
    if (navbarPlaceholder) {
        navbarPlaceholder.outerHTML = createSharedNavbar();
    } else {
        // Si no hay placeholder, buscar el primer header.navbar y reemplazarlo
        const existingNav = document.querySelector('header.navbar, nav.navbar');
        if (existingNav) {
            existingNav.outerHTML = createSharedNavbar();
        } else {
            // Insertar al inicio del body
            const body = document.body;
            if (body) {
                body.insertAdjacentHTML('afterbegin', createSharedNavbar());
            }
        }
    }
    
    // Inyectar footer
    const footerPlaceholder = document.getElementById('shared-footer');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = createSharedFooter();
    } else {
        const existingFooter = document.querySelector('footer.footer');
        if (existingFooter) {
            existingFooter.outerHTML = createSharedFooter();
        } else {
            const body = document.body;
            if (body) {
                body.insertAdjacentHTML('beforeend', createSharedFooter());
            }
        }
    }
    
    // Inicializar funcionalidad del menú móvil
    initMobileMenu();
}

/**
 * Inicializa el menú móvil y el scroll del navbar
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navbar nav');
    const navbar = document.querySelector('.navbar');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Agregar efecto de scroll al navbar
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedNavigation);
} else {
    initSharedNavigation();
}
