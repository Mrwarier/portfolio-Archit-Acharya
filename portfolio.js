

document.addEventListener('DOMContentLoaded', () => {
    
    const HEADER_HEIGHT_DESKTOP = 80;
    const HEADER_HEIGHT_MOBILE = 70; 

    
    // Select all elements that have animations defined in your CSS
    const animatedElements = document.querySelectorAll('.section, .profile-container, .project-card, .contact-info');
    
    // 1. Pause animations immediately so they don't play while hidden
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
    });

    // 2. Create an observer to detect when elements enter the screen
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Resume the animation
                entry.target.style.animationPlayState = 'running';
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px"
    });

    // 3. Start observing
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Determine current header height based on screen width
                const headerHeight = window.innerWidth < 768 ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP;
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    const sections = document.querySelectorAll('section');
    
    const highlightActiveSection = () => {
        const headerHeight = window.innerWidth < 768 ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP;
        // Add a little buffer (e.g., 100px) so it highlights before the section hits the very top
        const scrollPosition = window.scrollY + headerHeight + 100;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);

            if (navLink) {
                // Check if scroll position is within this section
                if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightActiveSection);

    const footerText = document.querySelector('.footer p');
    if (footerText) {
        const year = new Date().getFullYear();
        // Preserves the existing text structure
        footerText.innerHTML = `&copy; ${year} Archit Acharya. All rights reserved.`;
    }
});