/**
 * Implements lazy loading for tag and category pages
 * - Only renders sections that are visible in the viewport or close to it
 * - Improves performance for pages with many tags or categories
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a tags or categories page
  const isTagsPage = document.querySelector('body.page-tags') !== null;
  const isCategoriesPage = document.querySelector('body.page-categories') !== null;
  
  if (!isTagsPage && !isCategoriesPage) return;
  
  const sections = document.querySelectorAll('.section-container');
  if (!sections.length) return;
  
  // Hide all sections initially except the first few
  let visibleCount = 0;
  sections.forEach((section, index) => {
    if (index > 4) { // Show first 5 sections initially
      section.classList.add('lazy-section');
    } else {
      visibleCount++;
    }
  });
  
  // Lazy load sections as user scrolls
  const lazyLoad = function() {
    sections.forEach(section => {
      if (section.classList.contains('lazy-section')) {
        const rect = section.getBoundingClientRect();
        const buffer = 500; // Load sections before they come into view
        
        // Check if section is close to viewport
        if (rect.top < window.innerHeight + buffer) {
          section.classList.remove('lazy-section');
        }
      }
    });
  };
  
  // Call lazyLoad initially to load visible sections
  lazyLoad();
  
  // Set up scroll listener with throttling
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        lazyLoad();
        scrollTimeout = null;
      }, 200);
    }
  });
});
