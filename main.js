/* 
    Nodo360 Social - Main Scripts
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Nodo360 Social Brand Website Loaded');

    // 1. Initialize Scroll Animations (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            easing: 'ease-out-quad',
            once: true,
            mirror: false
        });
    }

    // 2. Header Scroll Visual Styling
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Smooth Scroll Navigation with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const menuToggle = document.getElementById('mobile-menu-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                }

                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Mobile Menu Toggle Burger Icon
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 5. Initialize Splide Carousel (6 Instagram posts)
    if (document.getElementById('image-carousel')) {
        new Splide('#image-carousel', {
            type: 'loop',
            perPage: 3,
            gap: '24px',
            autoplay: true,
            interval: 3500,
            pauseOnHover: true,
            focus: 'center',
            pagination: false,
            arrows: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                768: {
                    perPage: 1,
                    gap: '15px'
                }
            }
        }).mount();
        console.log('Splide Carousel Mounted Successfully');
    }

    // 6. Interactive Filter for Services (B2C & B2B)
    window.filterServices = function(category) {
        // Update tab buttons active state
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            const btnText = btn.textContent.toLowerCase();
            if (category === 'all' && btnText.includes('todos')) {
                btn.classList.add('active');
            } else if (category === 'personas' && btnText.includes('personas')) {
                btn.classList.add('active');
            } else if (category === 'organizaciones' && btnText.includes('organizaciones')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Filter cards
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-service');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Trigger fade in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transition = 'opacity 0.4s ease';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    };

    // 7. Mock Contact Form Submission with dynamic response
    const contactForm = document.getElementById('social-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const type = document.getElementById('type').value;

            // Generate premium success notification modal or text inline
            const formContainer = document.querySelector('.contact-form-container');
            if (formContainer) {
                let messageDetail = "Nos pondremos en contacto contigo a la brevedad para orientarte.";
                if (type === 'organizacion') {
                    messageDetail = "Una de nuestras trabajadoras sociales se comunicará con tu organización para coordinar una propuesta de bienestar social.";
                }

                formContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;" data-aos="zoom-in">
                        <div style="font-size: 4rem; color: #2ecc71; margin-bottom: 20px;">✓</div>
                        <h3 style="color: var(--primary-dark); margin-bottom: 15px;">¡Muchas gracias, ${name}!</h3>
                        <p style="color: var(--text-color); font-size: 1.05rem; line-height: 1.6; margin-bottom: 30px;">
                            Tu consulta ha sido enviada con éxito. ${messageDetail}
                        </p>
                        <button onclick="window.location.reload();" class="btn btn-primary">Enviar otro mensaje</button>
                    </div>
                `;
            }
        });
    }
});
