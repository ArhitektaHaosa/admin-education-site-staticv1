/**
 * Language switcher component
 * 
 * Provides interactive dropdown for switching between 16 locales
 * Stores user preference in localStorage
 */

(function() {
  'use strict';
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    const toggle = document.querySelector('.lang-switcher-toggle');
    const menu = document.querySelector('.lang-switcher-menu');
    
    if (!toggle || !menu) return;
    
    // Toggle menu on button click
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('show', !isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.lang-switcher')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
        toggle.focus();
      }
    });
    
    // Store language preference when switching
    const langLinks = menu.querySelectorAll('a');
    langLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        const locale = link.getAttribute('hreflang');
        if (locale) {
          try {
            localStorage.setItem('preferredLocale', locale);
          } catch (e) {
            // localStorage not available, continue anyway
          }
        }
      });
    });
    
    // Auto-redirect to preferred language on homepage
    try {
      const preferredLocale = localStorage.getItem('preferredLocale');
      const currentPath = window.location.pathname;
      
      // Only redirect from root index.html
      if (preferredLocale && (currentPath === '/' || currentPath === '/index.html')) {
        const currentLocale = document.documentElement.lang;
        if (currentLocale !== preferredLocale) {
          window.location.href = `/${preferredLocale}/index.html`;
        }
      }
    } catch (e) {
      // localStorage not available
    }
  }
})();
