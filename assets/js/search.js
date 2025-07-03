(function() {
  function displaySearchResults(results, store) {
    const searchResults = document.getElementById('header-results-container');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (results.length) {
      // Limit to 5 results for the dropdown
      const limitedResults = results.slice(0, 5);
      
      limitedResults.forEach(function(result) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = result.url;
        link.textContent = result.title;
        item.appendChild(link);
        searchResults.appendChild(item);
      });
      
      // If there are more results than shown, add a "see all" link
      if (results.length > 5) {
        const seeAll = document.createElement('li');
        seeAll.className = 'see-all-results';
        const seeAllLink = document.createElement('a');
        seeAllLink.href = window.location.origin + '/categories-and-tags/';
        seeAllLink.textContent = 'Browse all results';
        seeAll.appendChild(seeAllLink);
        searchResults.appendChild(seeAll);
      }
      
      // Show the dropdown
      document.querySelector('.search-results-dropdown').classList.add('active');
    } else {
      const item = document.createElement('li');
      item.className = 'no-results';
      item.textContent = 'No results found';
      searchResults.appendChild(item);
      document.querySelector('.search-results-dropdown').classList.add('active');
    }
  }

  function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  const headerSearchInput = document.getElementById('header-search-input');
  if (headerSearchInput) {
    let searchIndex = null;
    let searchTimeout = null;
    
    console.log('Search initialization started');
    
    // Load the search index
    const searchJsonUrl = window.location.origin + (window.location.pathname.indexOf('/SimpleConcepts/') === 0 ? '/SimpleConcepts/' : '/') + 'search.json.liquid';
    console.log('Fetching search index from:', searchJsonUrl);
    
    fetch(searchJsonUrl)
      .then(response => {
        console.log('Search index response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        searchIndex = data;
        console.log('Search index loaded successfully:', data.length, 'items');
      })
      .catch(error => {
        console.error('Error loading search index:', error);
        // Try an alternative path - for both local development and GitHub Pages
        const alternativePaths = [
          window.location.origin + '/simple_concepts/search.json.liquid',
          window.location.pathname + 'search.json.liquid',
          '../../search.json.liquid'
        ];
        
        console.log('Trying alternative paths:', alternativePaths);
        
        // Try each path one by one
        function tryNextPath(index) {
          if (index >= alternativePaths.length) {
            console.error('All alternative paths failed');
            return;
          }
          
          console.log('Trying path:', alternativePaths[index]);
          fetch(alternativePaths[index])
            .then(response => {
              if (!response.ok) throw new Error('Not found');
              return response.json();
            })
            .then(data => {
              searchIndex = data;
              console.log('Search index loaded from alternative path:', data.length, 'items');
            })
            .catch(err => {
              console.error('Error loading from path', alternativePaths[index], ':', err);
              tryNextPath(index + 1);
            });
        }
        
        tryNextPath(0);
      });
    
    // Handle input in the search box
    headerSearchInput.addEventListener('input', function() {
      console.log('Search input detected:', this.value.trim());
      
      // Clear previous timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      
      const query = this.value.trim();
      
      // Hide dropdown if query is empty
      if (!query) {
        document.querySelector('.search-results-dropdown').classList.remove('active');
        return;
      }
      
      // Set a timeout to avoid searching on every keystroke
      searchTimeout = setTimeout(function() {
        if (!searchIndex) return;
        
        // Tokenize the query string and convert to lowercase
        const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        
        // Search for matching items
        const results = searchIndex.filter(function(item) {
          const title = item.title ? item.title.toLowerCase() : '';
          const category = item.category ? item.category.toLowerCase() : '';
          const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : '';
          const content = item.content ? item.content.toLowerCase() : '';
          
          // Check if any query term is found in title, category, tags, or content
          return queryTerms.some(term => 
            title.indexOf(term) !== -1 || 
            category.indexOf(term) !== -1 || 
            tags.indexOf(term) !== -1 ||
            content.indexOf(term) !== -1
          );
        });
        
        displaySearchResults(results, searchIndex);
      }, 300);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      const dropdown = document.querySelector('.search-results-dropdown');
      const searchContainer = document.getElementById('header-search-container');
      
      if (dropdown && dropdown.classList.contains('active') && 
          searchContainer && !searchContainer.contains(event.target)) {
        dropdown.classList.remove('active');
      }
    });
    
    // Handle Enter key press
    headerSearchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        // Redirect to browse page with search query
        window.location.href = window.location.origin + '/categories-and-tags/?q=' + encodeURIComponent(this.value);
      }
    });
    
    // Search button click
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
      searchButton.addEventListener('click', function() {
        const query = headerSearchInput.value.trim();
        if (query) {
          window.location.href = window.location.origin + '/categories-and-tags/?q=' + encodeURIComponent(query);
        }
      });
    }
  }
  
  // Handle search query on the browse page
  const pathName = window.location.pathname;
  if (pathName.endsWith('/categories-and-tags/') || 
      pathName.endsWith('/categories-and-tags')) {
    const searchQuery = getQueryVariable('q');
    if (searchQuery) {
      // Handle the search query on the browse page
      console.log('Search query on browse page:', searchQuery);
      // Implement highlighting or filtering on the browse page
      document.addEventListener('DOMContentLoaded', function() {
        // First make sure the categoriesSection is visible
        const categoriesSection = document.getElementById('categoriesSection');
        if (categoriesSection) categoriesSection.style.display = 'block';
        
        // Highlight matching items or filter content based on searchQuery
        const explanationCards = document.querySelectorAll('.explanation-card');
        explanationCards.forEach(card => {
          const cardText = card.textContent.toLowerCase();
          if (!cardText.includes(searchQuery.toLowerCase())) {
            card.style.display = 'none';
          }
        });
      });
    }
  }
})();
