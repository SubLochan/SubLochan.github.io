// Selectors
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    });
});

// Header scroll effect & Active Link Updates
window.addEventListener('scroll', () => {
    // Header shadow and shrink
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active link highlight based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-right');
const skillBars = document.querySelectorAll('.skill-progress');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            
            // If it's a progress bar container, we can reset and animate the bar
            // Note: Since we have width applied inline, the CSS transition handles it 
            // once the parent block becomes visible.
            
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Make progress bars animate width from 0 on load/reveal
skillBars.forEach(bar => {
    const finalWidth = bar.style.width;
    bar.style.width = '0';
    bar.style.transition = 'width 1.5s cubic-bezier(0.5, 0, 0, 1) 0.5s';
    
    // Create an observer just for the skill bars to trigger their animation
    const barObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.width = finalWidth;
                }, 200);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    barObserver.observe(bar);
});
