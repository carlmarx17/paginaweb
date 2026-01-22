/* --- App Principal (Global) --- */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initAnimations();
    initContactForm();
});

// --- Navbar & Mobile Menu ---
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navbar nav');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveLink();
        });
    }

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
}

// --- Smooth Scroll & Active Link ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// --- Animations (Intersection Observer) ---
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.servicio-card, .sobre-mi-content > *, .contacto-content > *');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// --- Contact Form (EmailJS) ---
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Initialize EmailJS
    // Note: It's better to load this via the script tag in HTML, but we can check if it exists
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded');
        return;
    }

    try {
        emailjs.init("rpJQgG9n_1cC-TO1U");
    } catch (e) {
        console.error("Error initializing EmailJS", e);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validation
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const materia = document.getElementById('materia').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        if (!nombre || !email || !materia || !mensaje) {
            showErrorModal('Por favor, completa todos los campos obligatorios (*)');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showErrorModal('Por favor, ingresa un email válido');
            return;
        }

        // Loading State
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        const templateParams = {
            nombre,
            email,
            telefono,
            materia,
            mensaje,
            fecha: new Date().toLocaleString('es-CO', {
                timeZone: 'America/Bogota',
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            })
        };

        emailjs.send('service_kpy79fu', 'template_7d4bgzv', templateParams)
            .then(function (response) {
                showConfirmationModal();
                form.reset();
            })
            .catch(function (error) {
                console.error('FAILED...', error);
                let errorMessage = 'Hubo un error al enviar el mensaje. ';
                if (error.text && error.text.includes('Invalid template ID')) errorMessage += 'Error de configuración del template.';
                else if (error.text && error.text.includes('Invalid service ID')) errorMessage += 'Error de configuración del servicio.';
                else errorMessage += 'Por favor, intenta nuevamente o contáctame directamente por WhatsApp.';

                showErrorModal(errorMessage);
            })
            .finally(function () {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });

    // Modals
    setupModals();
}

function setupModals() {
    const confirmModal = document.getElementById('confirmationModal');
    const errorModal = document.getElementById('errorModal');

    // Close buttons
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirmModal) confirmModal.classList.remove('active');
            if (errorModal) errorModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close on click outside
    [confirmModal, errorModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        alert('¡Mensaje Enviado! Gracias por contactarme.');
    }
}

function showErrorModal(message) {
    const modal = document.getElementById('errorModal');
    if (modal) {
        const msgEl = document.getElementById('errorMessage');
        if (msgEl) msgEl.textContent = message;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        alert(message);
    }
}
