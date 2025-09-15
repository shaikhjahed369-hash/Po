// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillItems = document.querySelectorAll('.skill-item');
const projectModal = document.getElementById('projectModal');
const contactForm = document.getElementById('contactForm');

// Project data for modal
const projectData = {
    'student-management': {
        title: 'Student Management System',
        description: 'A comprehensive Object-Oriented Programming based record management system built using Java CLI. Features include full CRUD operations (Create, Read, Update, Delete) for student records, data validation, and efficient file handling. The system demonstrates advanced OOP concepts including inheritance, encapsulation, and polymorphism.',
        technologies: ['Java', 'OOP', 'CLI', 'File Handling']
    },
    'amazon-clone': {
        title: 'Amazon Clone',
        description: 'A pixel-perfect responsive UI clone of Amazon\'s homepage showcasing modern web design principles and advanced CSS techniques. Features include responsive grid layouts, interactive navigation, product carousels, and mobile-first design approach. Demonstrates proficiency in HTML5, CSS3, and responsive web design.',
        technologies: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid']
    },
    'personal-details': {
        title: 'Personal Details Management System',
        description: 'A full-stack web application for managing user personal details with complete CRUD functionality. Built with PHP backend and MySQL database, featuring user authentication, data validation, and secure database operations. Includes responsive frontend design and RESTful API architecture.',
        technologies: ['PHP', 'MySQL', 'CRUD Operations', 'Authentication', 'REST API']
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeFadeInAnimations();
    setupHeroElements();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetHref = this.getAttribute('href');
            console.log('Nav link clicked:', targetHref);
            
            if (targetHref && targetHref.startsWith('#')) {
                const targetSection = document.querySelector(targetHref);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            resetHamburger();
        });
    });

    // Hero CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetHref = this.getAttribute('href');
            console.log('CTA button clicked:', targetHref);
            
            if (targetHref && targetHref.startsWith('#')) {
                const targetSection = document.querySelector(targetHref);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Services CTA button
    const servicesCTA = document.querySelector('.services-cta .btn');
    if (servicesCTA) {
        servicesCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetHref = this.getAttribute('href');
            console.log('Services CTA clicked:', targetHref);
            
            if (targetHref && targetHref.startsWith('#')) {
                const targetSection = document.querySelector(targetHref);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

// Reset hamburger menu animation
function resetHamburger() {
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
    });
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Skills animation
function initializeSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkills();
                skillsAnimated = true;
            }
        });
    }, observerOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Animate skill progress bars
function animateSkills() {
    skillItems.forEach((item, index) => {
        const level = item.dataset.level;
        const progressBar = item.querySelector('.skill-progress');
        
        setTimeout(() => {
            if (progressBar) {
                progressBar.style.width = level + '%';
            }
        }, index * 100);
    });
}

// Fade in animations
function initializeFadeInAnimations() {
    const animatedElements = document.querySelectorAll('.card, .project-card, .service-card, .timeline-item, .skill-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        fadeInObserver.observe(element);
    });
}

// Project modal functionality - Make these functions global
window.openProjectModal = function(projectId) {
    console.log('Opening modal for project:', projectId);
    const project = projectData[projectId];
    if (!project) {
        console.log('Project not found:', projectId);
        return;
    }

    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.description;
    
    // Clear and populate technologies
    if (modalTech) {
        modalTech.innerHTML = '';
        project.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            modalTech.appendChild(techTag);
        });
    }

    if (projectModal) {
        projectModal.classList.remove('hidden');
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};

window.closeProjectModal = function() {
    console.log('Closing modal');
    if (projectModal) {
        projectModal.classList.remove('show');
        projectModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

// Modal event listeners
if (projectModal) {
    // Close modal when clicking outside
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('show')) {
        closeProjectModal();
    }
});

// Contact form handling
function initializeContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        console.log('Form submitted:', { name, email, message });
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const baseStyles = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform var(--duration-normal) var(--ease-standard);
        font-family: var(--font-family-base);
    `;
    
    notification.style.cssText = baseStyles;
    
    if (type === 'success') {
        notification.style.borderLeft = '4px solid var(--color-success)';
        notification.style.background = 'rgba(var(--color-success-rgb), 0.1)';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid var(--color-error)';
        notification.style.background = 'rgba(var(--color-error-rgb), 0.1)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Resume download functionality - Make this function global
window.downloadResume = function() {
    console.log('Download resume clicked');
    showNotification('Resume download initiated! In a real application, this would download a PDF file.', 'success');
    
    // In a real implementation, you would link to an actual PDF file:
    // const link = document.createElement('a');
    // link.href = 'assets/Shaikh_Jahed_Rouf_Resume.pdf';
    // link.download = 'Shaikh_Jahed_Rouf_Resume.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
};

// Setup hero elements animation
function setupHeroElements() {
    // Set initial styles for hero elements
    const heroElements = document.querySelectorAll('.profile-image, .hero-name, .hero-tagline, .hero-bio, .hero-buttons');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.profile-image, .hero-name, .hero-tagline, .hero-bio, .hero-buttons');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 500); // Add delay for initial load
    });
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for notification content
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-12);
    }
    
    .notification-message {
        color: var(--color-text);
        font-size: var(--font-size-sm);
        line-height: 1.4;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--color-text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all var(--duration-fast) var(--ease-standard);
        flex-shrink: 0;
    }
    
    .notification-close:hover {
        background: var(--color-secondary);
        color: var(--color-text);
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Debug function to check if elements exist
function debugElements() {
    console.log('Navbar:', navbar);
    console.log('Nav links:', navLinks);
    console.log('Project modal:', projectModal);
    console.log('Contact form:', contactForm);
    console.log('Hero buttons:', document.querySelectorAll('.hero-buttons .btn'));
    console.log('View project buttons:', document.querySelectorAll('.view-project'));
}

// Call debug function after DOM is loaded
setTimeout(debugElements, 1000);

// Ensure all view project buttons work
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-project')) {
        e.preventDefault();
        const onclick = e.target.getAttribute('onclick');
        if (onclick) {
            // Extract project ID from onclick attribute
            const match = onclick.match(/openProjectModal\('([^']+)'\)/);
            if (match) {
                openProjectModal(match[1]);
            }
        }
    }
});

// Performance optimization: Lazy load images if any were added
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}