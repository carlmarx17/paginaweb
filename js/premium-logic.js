// --- MODO OSCURO MEJORADO ---
function initDarkMode() {
    const btnModo = document.getElementById('botonModo');
    if (!btnModo) return;

    btnModo.addEventListener('click', () => {
        document.body.classList.toggle('modo-oscuro');
        const icono = btnModo.querySelector('i');
        if (document.body.classList.contains('modo-oscuro')) {
            if (icono) icono.className = 'fas fa-sun';
            btnModo.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            if (icono) icono.className = 'fas fa-moon';
            btnModo.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
            localStorage.setItem('theme', 'light');
        }
        // Dispatch event for components that need to redrawn (like canvas)
        window.dispatchEvent(new Event('themeChanged'));
    });

    // Load preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('modo-oscuro');
        const icono = btnModo.querySelector('i');
        if (icono) icono.className = 'fas fa-sun';
        btnModo.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    }
}

// --- FUNCIONES DE NAVEGACIÓN ---
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// --- ANIMACIONES ON SCROLL ---
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible'); // For CSS to handle if needed
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animacion-entrada').forEach(el => observer.observe(el));
}

// --- CONTADORES DINÁMICOS ---
function initCounters() {
    function actualizarContadores() {
        const visitasEl = document.getElementById('contador-visitas');
        const ejerciciosEl = document.getElementById('contador-ejercicios');

        if (visitasEl) {
            let visitas = parseInt(visitasEl.textContent.replace(/,/g, '')) || 1234;
            visitasEl.textContent = (visitas + Math.floor(Math.random() * 10)).toLocaleString();
        }
        if (ejerciciosEl) {
            let ejercicios = parseInt(ejerciciosEl.textContent) || 567;
            ejerciciosEl.textContent = ejercicios + 1;
        }
    }

    setInterval(actualizarContadores, 10000);
}

// --- INICIALIZACIÓN ---
window.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initAnimations();
    initCounters();
});
