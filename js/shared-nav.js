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
        <footer class="footer" style="background: #0f172a; color: #f8fafc; padding: 5rem 0 2rem; border-top: 4px solid var(--color-secundario); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%); pointer-events: none;"></div>
            <div class="container">
                <div class="footer-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 4rem; position: relative; z-index: 1;">
                    <div class="footer-column">
                        <a href="${basePath}index.html" class="logo" style="text-decoration: none; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 12px;">
                            <div class="logo-icon" style="width: 45px; height: 45px; background: var(--gradiente-primario); display: flex; align-items: center; justify-content: center; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.25);">
                                <i class="fas fa-graduation-cap" style="color: white; font-size: 1.2rem;"></i>
                            </div>
                            <span style="font-size: 1.4rem; font-weight: 800; color: white;">Carlos Martínez</span>
                        </a>
                        <p style="color: #94a3b8; line-height: 1.8; font-size: 1rem; margin-bottom: 2rem;">
                            Transformando la educación a través de la pasión por la ciencia y las humanidades. 
                            Tutorías personalizadas que inspiran curiosidad y excelencia académica.
                        </p>
                        <div class="social-links" style="display: flex; gap: 1rem;">
                            <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.1);"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.1);"><i class="fab fa-instagram"></i></a>
                            <a href="https://wa.me/573103106954" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.1);"><i class="fab fa-whatsapp"></i></a>
                        </div>
                    </div>

                    <div class="footer-column">
                        <h4 style="color: white; font-size: 1.1rem; font-weight: 700; margin-bottom: 2rem; position: relative; padding-bottom: 10px;">
                            Explorar Contenido
                            <span style="position: absolute; bottom: 0; left: 0; width: 40px; height: 2px; background: var(--color-secundario);"></span>
                        </h4>
                        <ul class="footer-links" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                            <li><a href="${basePath}index.html" style="color: #94a3b8; text-decoration: none; transition: all 0.3s ease; display: flex; align-items: center; gap: 10px;"><i class="fas fa-arrow-right" style="font-size: 0.7rem; color: var(--color-secundario);"></i> Inicio</a></li>
                            <li><a href="${basePath}pages/guias.html" style="color: #94a3b8; text-decoration: none; transition: all 0.3s ease; display: flex; align-items: center; gap: 10px;"><i class="fas fa-arrow-right" style="font-size: 0.7rem; color: var(--color-secundario);"></i> Guías de Estudio</a></li>
                            <li><a href="${basePath}pages/mundos.html" style="color: #94a3b8; text-decoration: none; transition: all 0.3s ease; display: flex; align-items: center; gap: 10px;"><i class="fas fa-arrow-right" style="font-size: 0.7rem; color: var(--color-secundario);"></i> Mundos 3D</a></li>
                            <li><a href="${basePath}pages/noticias.html" style="color: #94a3b8; text-decoration: none; transition: all 0.3s ease; display: flex; align-items: center; gap: 10px;"><i class="fas fa-arrow-right" style="font-size: 0.7rem; color: var(--color-secundario);"></i> Noticias</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4 style="color: white; font-size: 1.1rem; font-weight: 700; margin-bottom: 2rem; position: relative; padding-bottom: 10px;">
                            Contacto Directo
                            <span style="position: absolute; bottom: 0; left: 0; width: 40px; height: 2px; background: var(--color-secundario);"></span>
                        </h4>
                        <ul class="footer-links" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1.25rem;">
                            <li style="display: flex; gap: 15px; align-items: flex-start;">
                                <div style="width: 35px; height: 35px; background: rgba(37, 99, 235, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--color-secundario); flex-shrink: 0;">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <a href="mailto:carlossibaja644@gmail.com" style="color: #94a3b8; text-decoration: none; font-size: 0.95rem;">carlossibaja644@gmail.com</a>
                            </li>
                            <li style="display: flex; gap: 15px; align-items: flex-start;">
                                <div style="width: 35px; height: 35px; background: rgba(37, 99, 235, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--color-secundario); flex-shrink: 0;">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <a href="tel:+573103106954" style="color: #94a3b8; text-decoration: none; font-size: 0.95rem;">+57 310 310 6954</a>
                            </li>
                            <li style="display: flex; gap: 15px; align-items: flex-start;">
                                <div style="width: 35px; height: 35px; background: rgba(37, 99, 235, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--color-secundario); flex-shrink: 0;">
                                    <i class="fab fa-whatsapp"></i>
                                </div>
                                <a href="https://wa.me/573103106954" style="color: #94a3b8; text-decoration: none; font-size: 0.95rem;">WhatsApp Chat</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom" style="margin-top: 5rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <p style="color: #64748b; font-size: 0.9rem;">&copy; ${new Date().getFullYear()} Carlos Martínez. Todos los derechos reservados.</p>
                    <div style="display: flex; gap: 2rem;">
                        <a href="#" style="color: #64748b; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Privacidad</a>
                        <a href="#" style="color: #64748b; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Términos</a>
                    </div>
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
