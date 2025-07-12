// WhatsApp Integration
const whatsappNumber = "5511999999999";

function openWhatsApp(customMessage = null) {
    const defaultMessage = "Olá! Gostaria de falar com o atendimento da Central do Cliente.";
    const message = customMessage || defaultMessage;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function openWhatsAppService(message) {
    openWhatsApp(message);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    // Implementação básica do menu mobile
    const nav = document.querySelector('.desktop-nav');
    if (nav.style.display === 'none' || nav.style.display === '') {
        nav.style.display = 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'white';
        nav.style.flexDirection = 'column';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.display = 'none';
    }
}

// Smooth Scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    header.style.transition = 'transform 0.3s ease';
});

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// WhatsApp Float Button Animation
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    // Add pulse animation on page load
    setTimeout(() => {
        whatsappFloat.style.animation = 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite';
    }, 3000);
});

// Add pulse keyframe via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        }
        50% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.8), 0 0 0 10px rgba(37, 211, 102, 0.2);
        }
        100% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        }
    }
`;
document.head.appendChild(style);

// Form validation and interactions (if needed for future enhancements)
function validateForm(formData) {
    // Basic validation function for future use
    const required = ['name', 'email', 'message'];
    const errors = [];
    
    required.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            errors.push(`${field} é obrigatório`);
        }
    });
    
    if (formData.email && !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track WhatsApp clicks
function trackWhatsAppClick(source = 'general') {
    trackEvent('whatsapp_click', {
        source: source,
        timestamp: new Date().toISOString()
    });
}

// Update WhatsApp functions to include tracking
const originalOpenWhatsApp = openWhatsApp;
openWhatsApp = function(customMessage = null, source = 'general') {
    trackWhatsAppClick(source);
    return originalOpenWhatsApp(customMessage);
};

// Performance optimization: Lazy load images if added in the future
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);