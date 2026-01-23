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

// --- QUIZ LOGIC ---
function checkAnswer(element, isCorrect, quizId) {
    const parent = element.parentElement;
    const options = parent.querySelectorAll('.opcion');

    // Clear previous results in this quiz
    options.forEach(opt => {
        opt.classList.remove('correcta', 'incorrecta');
    });

    if (isCorrect) {
        element.classList.add('correcta');
        // Play success sound or animation if needed
        element.style.animation = 'pulse 0.5s ease-in-out';
    } else {
        element.classList.add('incorrecta');
        // Subtle shake animation
        element.style.animation = 'shake 0.4s ease-in-out';
    }

    // Feedback message if quizId provided
    const feedbackEl = document.getElementById(quizId);
    if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.style.padding = '15px';
        feedbackEl.style.marginTop = '10px';
        feedbackEl.style.borderRadius = '10px';
        feedbackEl.style.fontWeight = 'bold';

        if (isCorrect) {
            feedbackEl.style.background = '#d4edda';
            feedbackEl.style.color = '#155724';
            feedbackEl.innerHTML = '¡Excelente! Respuesta correcta. 🌟';
        } else {
            feedbackEl.style.background = '#f8d7da';
            feedbackEl.style.color = '#721c24';
            feedbackEl.innerHTML = 'Casi... intenta de nuevo. 💡';
        }
    }
}

// --- ANIMATIONS FOR QUIZ ---
const style = document.createElement('style');
style.innerHTML = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// --- INICIALIZACIÓN ---
window.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initAnimations();
    initCounters();
});
