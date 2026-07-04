/* ========================================
   NOWFI ARSHAD - Vanilla JavaScript
   Modern Interactive Website Functionality
   ======================================== */

// ========================================
// 1. Mobile Navigation Toggle
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// 2. Sticky Navigation Bar
// ========================================

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// 3. Smooth Scrolling for Navigation Links
// ========================================

document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
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

// ========================================
// 4. Scroll to Section Function
// ========================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ========================================
// 5. Lightbox Gallery Functionality
// ========================================

let currentImageIndex = 0;
const galleryItems = 8; // Number of gallery items

function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    modal.style.display = 'block';
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(n) {
    currentImageIndex = (currentImageIndex + n + galleryItems) % galleryItems;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.querySelector('.lightbox-image');
    const galleryLabels = [
        'Casual Collection',
        'Traditional Wear',
        'Evening Dresses',
        'Abayas',
        'Summer Collection',
        'Essentials',
        'Formal Wear',
        'Fashion Forward'
    ];
    
    lightboxImage.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-image" style="font-size: 4rem; margin-bottom: 20px;"></i>
            <p style="color: #999; font-size: 1.1rem; margin-top: 10px;">${galleryLabels[currentImageIndex]}</p>
            <p style="color: #666; font-size: 0.9rem; margin-top: 5px;">${currentImageIndex + 1} / ${galleryItems}</p>
        </div>
    `;
}

// Close lightbox when clicking outside the image
window.addEventListener('click', (event) => {
    const modal = document.getElementById('lightboxModal');
    if (event.target === modal) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('lightboxModal');
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeLightboxImage(1);
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    }
});

// ========================================
// 6. Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !phone || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]{7,}$/;
    if (!phoneRegex.test(phone)) {
        showFormMessage('Please enter a valid phone number.', 'error');
        return;
    }
    
    // ========================================
    // BACKEND INTEGRATION NOTE
    // ========================================
    // This is a static website. To actually send form data, implement one of:
    //
    // Option 1: Use Formspree (Free & Easy)
    // - Sign up at https://formspree.io/
    // - Replace form action with your Formspree endpoint
    // - No backend required
    //
    // Option 2: Use Netlify Forms (Free for Netlify hosting)
    // - Add netlify attribute to form
    // - Deploy on Netlify
    //
    // Option 3: Use EmailJS (Free tier available)
    // - Sign up at https://www.emailjs.com/
    // - Add EmailJS SDK and use their API
    //
    // Option 4: Implement your own backend
    // - Create API endpoint (Node.js, Python, PHP, etc.)
    // - Send POST request to your backend
    // - Backend processes and sends email
    //
    // Example implementation with fetch API:
    // =========================================
    /*
    const formData = {
        name: name,
        phone: phone,
        email: email,
        message: message,
        timestamp: new Date().toISOString(),
        website: 'nowfiarshad.com'
    };
    
    fetch('https://your-backend-api.com/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showFormMessage('Message sent successfully! We will contact you soon.', 'success');
            contactForm.reset();
        } else {
            showFormMessage(data.message || 'Error sending message. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormMessage('Error sending message. Please try again later.', 'error');
    });
    */
    
    // ========================================
    // DEMONSTRATION RESPONSE
    // ========================================
    // For now, show success message (no actual sending)
    // Replace with backend integration above in production
    
    showFormMessage('✓ Thank you for your message! We will contact you shortly at ' + phone + '.', 'success');
    
    // Clear form
    contactForm.reset();
    
    // Optional: Scroll to form message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
}

// ========================================
// 7. Scroll Animations (Optional Enhancement)
// ========================================

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all collection cards and why-choose items
document.querySelectorAll('.collection-card, .why-choose-item, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========================================
// 8. Active Navigation Link Highlighting
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 9. Add CSS for Active Nav Link
// ========================================

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ========================================
// 10. Prevent Default on Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
        } else if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// 11. Lazy Loading Support (Future Enhancement)
// ========================================

// When replacing image placeholders with real images, uncomment:
/*
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
*/

// ========================================
// 12. Copy to Clipboard Functionality (Optional)
// ========================================

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copied to clipboard!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Add animation styles for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(notificationStyle);

// ========================================
// 13. Page Performance Monitoring
// ========================================

// Monitor page load time
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    }
});

// ========================================
// 14. Analytics & Tracking (Optional)
// ========================================

// Track user interactions for analytics
// Uncomment and integrate with your analytics service (Google Analytics, etc.)

/*
function trackEvent(eventName, eventData) {
    // Example: Send to Google Analytics
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    
    // Or send to custom backend
    console.log('Event:', eventName, eventData);
}

// Track section views
document.querySelectorAll('section[id]').forEach(section => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_view', {
                    section_id: section.id,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
    observer.observe(section);
});
*/

// ========================================
// 15. Error Handling & Logging
// ========================================

window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    // In production, send to error logging service
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    // In production, send to error logging service
});

// ========================================
// 16. Print Optimization
// ========================================

function printPage() {
    window.print();
}

// ========================================
// 17. Initialization
// ========================================

console.log('NOWFI ARSHAD website loaded successfully!');
console.log('Contact: +971 58 667 8790');
console.log('Instagram: @nowfi.arshad');
