document.addEventListener('DOMContentLoaded', function() {
  // Get all required DOM elements
  const categoriesSection = document.getElementById('categoriesSection');
  const categoryExplanationsSection = document.getElementById('category-explanations-section');
  const selectedCategoryNameExplanations = document.getElementById('selected-category-name-explanations');
  const popularCategoryTags = document.getElementById('popular-category-tags');
  const categoryExplanationList = document.getElementById('category-explanation-list');
  const backToCategoriesFromExplanations = document.getElementById('back-to-categories-from-explanations');
  const categorySearchInput = document.getElementById('category-explanation-search');
  const clearCategorySearchBtn = document.getElementById('clear-category-search');
  const categoryNoResultsMessage = document.getElementById('category-no-results-message');
  const showAllTagsBtn = document.getElementById('show-all-tags');
  
  // New category search elements
  const categoriesSearchInput = document.getElementById('categories-search');
  const clearCategoriesSearchBtn = document.getElementById('clear-categories-search');
  const categoriesNoResultsMessage = document.getElementById('categories-no-results-message');
  
  // Add a message if there are no explanations
  if (allExplanations.length === 0) {
    const categoriesCloud = document.querySelector('.categories-cloud');
    if (categoriesCloud) {
      categoriesCloud.innerHTML = '<div class="empty-state"><i class="fas fa-info-circle"></i><p class="no-content-message">No explanations have been added yet. Check back soon!</p></div>';
    }
  } else {
    // Update category counts
    updateCategoryCounts();
  }
  
  // Function to update category counts
  function updateCategoryCounts() {
    const categoryCounts = {};
    
    // Count explanations per category
    allExplanations.forEach(exp => {
      if (exp.categorySlug) {
        categoryCounts[exp.categorySlug] = (categoryCounts[exp.categorySlug] || 0) + 1;
      }
    });
    
    // Update count display
    Object.keys(categoryCounts).forEach(slug => {
      const countElement = document.getElementById(`count-${slug}`);
      if (countElement) {
        countElement.textContent = `(${categoryCounts[slug]})`;
      }
    });
  }
  
  // Get category from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const tagParam = urlParams.get('tag');
  
  if (categoryParam) {
    showExplanationsForCategory(categoryParam);
  } else if (tagParam) {
    // If tag is in URL, find which category it belongs to first
    const matchingExplanations = allExplanations.filter(exp => 
      exp.tags && exp.tags.some(tag => 
        tag.toLowerCase() === tagParam.toLowerCase() || 
        tag.toLowerCase().replace(/\s+/g, '-') === tagParam.toLowerCase()
      )
    );
    
    if (matchingExplanations.length > 0) {
      const tag = matchingExplanations[0].tags.find(t => 
        t.toLowerCase() === tagParam.toLowerCase() || 
        t.toLowerCase().replace(/\s+/g, '-') === tagParam.toLowerCase()
      );
      
      // Get the category and show category view with tag filter
      const categorySlug = matchingExplanations[0].categorySlug;
      showExplanationsForCategory(categorySlug, tag);
    }
  }
  
  // Set up event listeners for category tags
  document.querySelectorAll('.category-tag').forEach(categoryTag => {
    categoryTag.addEventListener('click', function(e) {
      e.preventDefault();
      const category = this.getAttribute('data-category');
      if (category) {
        showExplanationsForCategory(category);
        history.pushState(null, null, `?category=${category}`);
      } else {
        // No category data attribute found on clicked element
      }
    });
  });
  
  // Back button functionality
  backToCategoriesFromExplanations.addEventListener('click', function() {
    // Hide category explanations section with fade out effect
    categoryExplanationsSection.classList.add('fade-out');
    
    setTimeout(() => {
      categoryExplanationsSection.style.display = 'none';
      categoryExplanationsSection.classList.remove('fade-out');
      
      // Show categories section with fade in effect
      categoriesSection.style.display = 'block';
      categoriesSection.classList.add('fade-in');
      
      setTimeout(() => {
        categoriesSection.classList.remove('fade-in');
      }, 300);
    }, 300);
    
    history.pushState(null, null, window.location.pathname);
  });
  
  // Handle tag parameter from URL if present
  if (tagParam) {
    const matchingExplanations = allExplanations.filter(exp => 
      exp.tags && exp.tags.some(tag => 
        tag.toLowerCase() === tagParam.toLowerCase() || 
        tag.toLowerCase().replace(/\s+/g, '-') === tagParam.toLowerCase()
      )
    );
    
    if (matchingExplanations.length > 0) {
      const tag = matchingExplanations[0].tags.find(t => 
        t.toLowerCase() === tagParam.toLowerCase() || 
        t.toLowerCase().replace(/\s+/g, '-') === tagParam.toLowerCase()
      );
      const categorySlug = matchingExplanations[0].categorySlug;
      showExplanationsForCategory(categorySlug, tag);
    }
  }
  
  // Category search functionality
  categorySearchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    filterCategoryExplanations(searchTerm);
  });
  
  clearCategorySearchBtn.addEventListener('click', function() {
    categorySearchInput.value = '';
    filterCategoryExplanations('');
    // Reset active tag
    const allTags = document.querySelectorAll('#popular-category-tags .tag');
    allTags.forEach(t => t.classList.remove('active'));
    const allTagElement = document.querySelector('#popular-category-tags .tag[data-tag="all"]');
    if (allTagElement) {
      allTagElement.classList.add('active');
    }
  });
  
  // Categories search functionality
  categoriesSearchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    filterCategories(searchTerm);
  });
  
  clearCategoriesSearchBtn.addEventListener('click', function() {
    categoriesSearchInput.value = '';
    filterCategories('');
  });
  
  function filterCategories(searchTerm) {
    const categoryTags = document.querySelectorAll('.categories-cloud .category-tag');
    let visibleCount = 0;
    
    categoryTags.forEach(tag => {
      const categoryName = tag.textContent.toLowerCase().trim();
      
      if (searchTerm === '' || categoryName.includes(searchTerm)) {
        tag.style.display = 'inline-flex';
        visibleCount++;
      } else {
        tag.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    categoriesNoResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
  }
  
  function filterCategoryExplanations(searchTerm) {
    const explanationCards = categoryExplanationList.querySelectorAll('.explanation-card');
    let visibleCount = 0;
    
    explanationCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const content = card.querySelector('p').textContent.toLowerCase();
      const tags = card.dataset.tags || '';
      
      if (searchTerm === '' || 
          title.includes(searchTerm) || 
          content.includes(searchTerm) || 
          tags.includes(searchTerm)) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    categoryNoResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
  }
  
  function showExplanationsForCategory(categorySlug, initialTagFilter = null) {
    // Find category name from slug
    const matchingExplanation = allExplanations.find(exp => 
      exp.categorySlug && exp.categorySlug.toLowerCase() === categorySlug.toLowerCase()
    );
    
    if (!matchingExplanation) {
      return;
    }
    
    const categoryName = matchingExplanation.category;
    selectedCategoryNameExplanations.textContent = categoryName;
    
    // Get all explanations for this category
    const categoryExplanations = allExplanations.filter(exp => 
      exp.categorySlug && exp.categorySlug.toLowerCase() === categorySlug.toLowerCase()
    );
    
    // Get all tags for this category
    const tags = new Set();
    const tagCounts = {};
    
    categoryExplanations.forEach(exp => {
      if (exp.tags) {
        exp.tags.forEach(tag => {
          tags.add(tag);
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    // Populate popular tags (top 5 by count)
    popularCategoryTags.innerHTML = '<a href="#" class="tag active" data-tag="all">All <span class="count">(' + categoryExplanations.length + ')</span></a>';
    
    if (tags.size > 0) {
      // Convert to array, sort by count (descending) and take top 5
      const sortedTags = Array.from(tags).sort((a, b) => tagCounts[b] - tagCounts[a]);
      const popularTags = sortedTags.slice(0, 5);
      
      popularTags.forEach(tag => {
        const tagLink = document.createElement('a');
        tagLink.href = `?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`;
        tagLink.className = 'tag';
        tagLink.dataset.tag = tag;
        tagLink.innerHTML = `<i class="fas fa-tag"></i> ${tag} <span class="count">(${tagCounts[tag]})</span>`;
        tagLink.addEventListener('click', function(e) {
          e.preventDefault();
          filterExplanationsByTag(this, tag);
        });
        popularCategoryTags.appendChild(tagLink);
      });
      
      // Show "Show all tags" button only if there are more than 5 tags
      if (tags.size > 5) {
        showAllTagsBtn.style.display = 'inline-block';
        
        // Store the remaining tags
        const remainingTags = sortedTags.slice(5);
        
        // Add click handler to show all tags in the current view
        showAllTagsBtn.addEventListener('click', function() {
          // Toggle button text and icon
          if (this.innerHTML.includes('Show all')) {
            this.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
            
            // Add all the remaining tags to the popularCategoryTags container
            remainingTags.forEach(tag => {
              const tagLink = document.createElement('a');
              tagLink.href = `?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`;
              tagLink.className = 'tag';
              tagLink.dataset.tag = tag;
              tagLink.innerHTML = `<i class="fas fa-tag"></i> ${tag} <span class="count">(${tagCounts[tag]})</span>`;
              tagLink.addEventListener('click', function(e) {
                e.preventDefault();
                filterExplanationsByTag(this, tag);
              });
              popularCategoryTags.appendChild(tagLink);
            });
          } else {
            this.innerHTML = 'Show all tags <i class="fas fa-chevron-down"></i>';
            
            // Remove all tags except the first 6 (All + 5 popular tags)
            const allTags = popularCategoryTags.querySelectorAll('.tag');
            for (let i = 6; i < allTags.length; i++) {
              allTags[i].remove();
            }
          }
        });
      } else {
        showAllTagsBtn.style.display = 'none';
      }
    } else {
      showAllTagsBtn.style.display = 'none';
    }
    
    // Populate explanations
    categoryExplanationList.innerHTML = '';
    
    if (categoryExplanations.length === 0) {
      categoryExplanationList.innerHTML = '<div class="empty-state"><i class="fas fa-info-circle"></i><p class="no-content-message">No explanations available in this category.</p></div>';
    } else {
      categoryExplanations.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'explanation-card';
        expDiv.dataset.tags = exp.tags ? exp.tags.join(',').toLowerCase() : '';
        expDiv.innerHTML = `
          <h3><a href="${exp.url}">${exp.title}</a></h3>
          <p>${exp.excerpt}</p>
          <div class="card-meta">
            <div class="tags-list">
              ${exp.tags ? exp.tags.map(tag => `<span class="mini-tag" data-tag="${tag.toLowerCase()}"><i class="fas fa-tag"></i> ${tag}</span>`).join('') : ''}
            </div>
            <span class="date"><i class="far fa-calendar-alt"></i> ${exp.date}</span>
          </div>
        `;
        
        // Add event listeners to mini-tags for filtering
        setTimeout(() => {
          expDiv.querySelectorAll('.mini-tag').forEach(miniTag => {
            miniTag.addEventListener('click', function() {
              const tagName = this.getAttribute('data-tag');
              // Find and click the corresponding tag in the popular tags
              const tagLink = document.querySelector(`.tag[data-tag="${tagName}"]`);
              if (tagLink) {
                tagLink.click();
              } else {
                // If tag not in popular tags, filter directly
                const allTags = document.querySelectorAll('#popular-category-tags .tag');
                allTags.forEach(t => t.classList.remove('active'));
                filterCategoryExplanations(tagName);
              }
            });
          });
        }, 0);
        
        categoryExplanationList.appendChild(expDiv);
      });
    }
    
    // Hide categories section with fade out effect
    categoriesSection.classList.add('fade-out');
    
    setTimeout(() => {
      categoriesSection.style.display = 'none';
      categoriesSection.classList.remove('fade-out');
      
      // Show category explanations section with fade in effect
      categoryExplanationsSection.style.display = 'block';
      categoryExplanationsSection.classList.add('fade-in');
      
      setTimeout(() => {
        categoryExplanationsSection.classList.remove('fade-in');
      }, 300);
      
      // Apply tag filter if provided
      if (initialTagFilter) {
        const tagElement = document.querySelector(`#popular-category-tags .tag[data-tag="${initialTagFilter.toLowerCase()}"]`);
        if (tagElement) {
          tagElement.click();
        } else {
          // If tag not in popular tags, we're adding it
          const allTag = document.querySelector('#popular-category-tags .tag[data-tag="all"]');
          if (allTag) {
            allTag.classList.remove('active');
          }
          
          // Create a temporary tag for filtering
          const tempTag = document.createElement('a');
          tempTag.className = 'tag active';
          tempTag.dataset.tag = initialTagFilter;
          popularCategoryTags.appendChild(tempTag);
          
          // Apply the filter
          filterCategoryExplanations(initialTagFilter.toLowerCase());
        }
      }
    }, 300);
  }
  
  function filterExplanationsByTag(tagElement, tagName) {
    // Update active state
    const allTags = document.querySelectorAll('#popular-category-tags .tag');
    allTags.forEach(t => t.classList.remove('active'));
    tagElement.classList.add('active');
    
    if (tagName === 'all') {
      // Show all explanations
      const cards = categoryExplanationList.querySelectorAll('.explanation-card');
      cards.forEach(card => card.style.display = 'block');
      categoryNoResultsMessage.style.display = 'none';
    } else {
      filterCategoryExplanations(tagName);
    }
  }
});
