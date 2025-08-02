// Educational Technology Developer Portfolio - Custom JavaScript
// Optimized for performance and accessibility

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initCertificateModal();
    initAccessibility();
    initPerformanceOptimizations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-nav');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Smooth scroll animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .card, .skill-category');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Certificate modal functionality
function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const certificateImages = document.querySelectorAll('.certificate-image');
    
    if (modal && modalImg) {
        certificateImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                
                // Focus management for accessibility
                modal.focus();
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal functionality
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('close')) {
                closeModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Accessibility enhancements
function initAccessibility() {
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main-content';
    }
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('skeleton');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        './images/pic.png',
        './css/modern-style.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'image';
        document.head.appendChild(link);
    });
}

// Contact modal functionality
function openModal() {
    // Simple contact alert for now - can be enhanced with a proper modal
    const contactInfo = `
Contact Information:
📧 Email: joshuaagyekum21@gmail.com
📱 Phone: +47 46399384
📍 Location: Oslo, Norway

Feel free to reach out for EdTech development opportunities!
    `;
    alert(contactInfo);
}

// Navigation toggle function (called from HTML)
function toggleNav() {
    const navMenu = document.getElementById('navbar-nav');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Certificate functions (called from HTML)
function openCertificate(src) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = src;
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Export functions for global access
window.toggleNav = toggleNav;
window.openModal = openModal;
window.openCertificate = openCertificate;
window.closeCertificate = closeCertificate;