/* 
    Nodo360 Social - Main Scripts
    UI/UX Pro Max Edition: Accesibilidad, Rendimiento y Validación
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Nodo360 Social • UI/UX Pro Experience Loaded');

    // 1. Inicializar animaciones de scroll respetando prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof AOS !== 'undefined' && !prefersReducedMotion) {
        AOS.init({
            duration: 750,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 50
        });
    }

    // 2. Header Scroll Visual Elevation
    const header = document.getElementById('header');
    if (header) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
        }, { passive: true });
    }

    // 3. Smooth Scroll Navigation Accesible con compensación de altura del Header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Cerrar menú móvil si está desplegado
                const navLinks = document.querySelector('.nav-links');
                const menuToggle = document.getElementById('mobile-menu-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }

                const headerHeight = header ? header.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 10;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                // Accesibilidad: Enfocar el elemento de destino
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({ preventScroll: true });
            }
        });
    });

    // 4. Mobile Menu Toggle con soporte para teclado y ARIA
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        // Cerrar al presionar Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }

    // 5. Inicializar Splide Carousel (6 publicaciones de Instagram)
    if (document.getElementById('image-carousel')) {
        new Splide('#image-carousel', {
            type: 'loop',
            perPage: 3,
            gap: '24px',
            autoplay: !prefersReducedMotion,
            interval: 3800,
            pauseOnHover: true,
            focus: 'center',
            pagination: false,
            arrows: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                    gap: '20px'
                },
                768: {
                    perPage: 1,
                    gap: '16px'
                }
            }
        }).mount();
    }

    // 6. Filtro Interactivo de Servicios (Tablist accesible)
    window.filterServices = function(category) {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            const btnText = btn.textContent.toLowerCase();
            const isMatch = (category === 'all' && btnText.includes('todos')) ||
                            (category === 'personas' && btnText.includes('personas')) ||
                            (category === 'organizaciones' && btnText.includes('organizaciones'));

            if (isMatch) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-service');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }, 30);
            } else {
                card.style.display = 'none';
            }
        });
    };

    // 7. Envío de Formulario con Feedback Accesible e Inmediato
    const contactForm = document.getElementById('social-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const typeInput = document.getElementById('type');
            const name = nameInput ? nameInput.value.trim() : 'Estimado/a';
            const type = typeInput ? typeInput.value : 'discovery';

            const formContainer = document.querySelector('.contact-form-container');
            if (formContainer) {
                let messageDetail = "Nos pondremos en contacto contigo a la brevedad para coordinar la orientación solicitada.";
                let titleMsg = `¡Muchas gracias, ${name}!`;

                if (type === 'discovery') {
                    titleMsg = `¡Sesión Discovery Solicitada!`;
                    messageDetail = "Nuestro equipo de Trabajadoras Sociales se comunicará contigo para agendar tu sesión de 60 minutos y preparar tu diagnóstico inicial sin costo.";
                } else if (type === 'organizacion') {
                    messageDetail = "Nos pondremos en contacto para presentar una propuesta personalizada de bienestar laboral y gestión preventiva para tu empresa.";
                }

                formContainer.setAttribute('role', 'status');
                formContainer.setAttribute('aria-live', 'polite');
                formContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px 15px;" data-aos="zoom-in">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: #E1EFEB; color: #2ECC71; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem; font-weight: bold; border: 2px solid #2ECC71;">
                            ✓
                        </div>
                        <h3 style="color: var(--primary-dark); font-size: 1.45rem; margin-bottom: 12px;">${titleMsg}</h3>
                        <p style="color: var(--text-color); font-size: 1.02rem; line-height: 1.6; margin-bottom: 25px;">
                            ${messageDetail}
                        </p>
                        <button onclick="window.location.reload();" class="btn btn-outline" style="font-size: 0.95rem;">
                            Enviar otra consulta
                        </button>
                    </div>
                `;
            }
        });
    }
});
