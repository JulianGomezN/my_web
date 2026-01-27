/**
 * Main Application Entry Point
 * Initializes theme, i18n, navigation, and contact form
 */

import { initTheme } from './theme';
import { initI18n, getCurrentLanguage, getTranslations } from './i18n';
import emailjs from '@emailjs/browser';

/**
 * EmailJS Configuration
 * IMPORTANT: Replace these with your actual EmailJS credentials
 * Get them from: https://www.emailjs.com/
 */
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',      // Replace with your service ID
  templateId: 'YOUR_TEMPLATE_ID',    // Replace with your template ID
  publicKey: 'YOUR_PUBLIC_KEY',      // Replace with your public key
};

/**
 * Initialize EmailJS
 */
function initEmailJS(): void {
  try {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
  }
}

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbarHeight = 70;
    const sectionTop = section.offsetTop - navbarHeight;
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth',
    });
  }
}

/**
 * Handle navigation link clicks
 */
function initNavigation(): void {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
          navMenu.classList.remove('active');
        }
      }
    });
  });
  
  // Handle scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator a');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection('about');
    });
  }
}

/**
 * Handle mobile menu toggle
 */
function initMobileMenu(): void {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Update icon
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
}

/**
 * Update active navigation link on scroll
 */
function initScrollSpy(): void {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Add scroll animation to navbar
 */
function initNavbarScroll(): void {
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show form message
 */
function showFormMessage(type: 'success' | 'error', message: string): void {
  const messageElement = document.getElementById('form-message');
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageElement.className = 'form-message';
    }, 5000);
  }
}

/**
 * Handle contact form submission
 */
function initContactForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const submitButton = document.getElementById('contact-submit');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const nameInput = document.getElementById('contact-name') as HTMLInputElement;
    const emailInput = document.getElementById('contact-email') as HTMLInputElement;
    const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;
    
    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const message = messageInput?.value.trim();
    
    // Validate inputs
    if (!name || !email || !message) {
      const lang = getCurrentLanguage();
      const t = getTranslations(lang);
      showFormMessage('error', t.contact.form.error);
      return;
    }
    
    if (!isValidEmail(email)) {
      showFormMessage('error', 'Please enter a valid email address.');
      return;
    }
    
    // Disable submit button
    if (submitButton) {
      const lang = getCurrentLanguage();
      const t = getTranslations(lang);
      submitButton.textContent = t.contact.form.sending;
      submitButton.setAttribute('disabled', 'true');
    }
    
    try {
      // Check if EmailJS is configured
      if (
        EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID' ||
        EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID' ||
        EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY'
      ) {
        throw new Error('EmailJS not configured. Please add your credentials in main.ts');
      }
      
      // Send email using EmailJS
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Your Name', // Replace with your name
      };
      
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );
      
      // Show success message
      const lang = getCurrentLanguage();
      const t = getTranslations(lang);
      showFormMessage('success', t.contact.form.success);
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Email send error:', error);
      const lang = getCurrentLanguage();
      const t = getTranslations(lang);
      
      // If EmailJS is not configured, show helpful message
      if (error instanceof Error && error.message.includes('not configured')) {
        showFormMessage('error', 'Contact form not configured yet. Please check the console for instructions.');
        console.warn(`
          ⚠️ EmailJS Configuration Required:
          
          1. Sign up at https://www.emailjs.com/
          2. Create an email service
          3. Create an email template
          4. Get your credentials
          5. Update EMAILJS_CONFIG in src/main.ts with your credentials
        `);
      } else {
        showFormMessage('error', t.contact.form.error);
      }
    } finally {
      // Re-enable submit button
      if (submitButton) {
        const lang = getCurrentLanguage();
        const t = getTranslations(lang);
        submitButton.textContent = t.contact.form.send;
        submitButton.removeAttribute('disabled');
      }
    }
  });
}

/**
 * Add scroll animations to elements
 */
function initScrollAnimations(): void {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe skill cards, stat cards, etc.
  const animatedElements = document.querySelectorAll(
    '.skill-category, .stat-card, .info-card'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Initialize application
 */
function init(): void {
  // Initialize core systems
  initTheme();
  initI18n();
  initEmailJS();
  
  // Initialize UI interactions
  initNavigation();
  initMobileMenu();
  initScrollSpy();
  initNavbarScroll();
  initContactForm();
  initScrollAnimations();
  
  console.log('✨ Portfolio website initialized successfully!');
  console.log('📧 Remember to configure EmailJS in src/main.ts');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
