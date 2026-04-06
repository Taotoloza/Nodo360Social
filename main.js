/* 
    Nodo360 Social - Main Scripts
*/

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('Nodo360 Social Website Loaded');

    // 1. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(245, 241, 234, 0.98)';
        } else {
            header.classList.remove('scrolled');
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(245, 241, 234, 0.9)';
        }
    });

    // 3. Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Mobile Menu Toggle (Simplified)
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }

    // 5. Initialize Splide Carousel
    if (document.getElementById('image-carousel')) {
        new Splide('#image-carousel', {
            type   : 'loop',
            perPage: 3,
            gap    : '20px',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            focus  : 'center',
            breakpoints: {
                968: {
                    perPage: 2,
                },
                640: {
                    perPage: 1,
                },
            },
        }).mount();
        console.log('Instagram Carousel Initialized');
    }

    // 6. Contact Button Interaction
    const ctaButtons = document.querySelectorAll('.btn-primary, .instagram-link, .btn-secondary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('User interaction with CTA');
        });
    });
});
