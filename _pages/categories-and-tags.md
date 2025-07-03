---
layout: default
title: Browse
permalink: /categories-and-tags/
---

<div class="page-container">
  <div class="page-categories-and-tags">
    <div class="browse-header">
      <div class="title-with-image">
        <div>
          <h1>Browse</h1>
          <p class="browse-intro">Explore our collection of explanations by category or tag. Find the perfect explanation for your needs by navigating through our organized content structure.</p>
        </div>
        <img src="../assets/images/ligth.png" alt="Light bulb illustration" class="feature-image">
      </div>
    </div>

    <!-- Categories Section -->
    <div class="section" id="categoriesSection">
      <h2>Categories</h2>
      <div class="tag-cloud categories-cloud">
        {% assign categories = site.explanations | map: "category" | uniq | sort %}
        {% for category in categories %}
          <a href="#{{ category | slugify }}" class="tag category-tag" data-category="{{ category | slugify }}">
            <i class="fas fa-folder"></i> {{ category }} 
            <span class="count" id="count-{{ category | slugify }}"></span>
          </a>
        {% endfor %}
      </div>
    </div>
    
    <!-- Tags Section (initially hidden, shown when category is selected) -->
    <div class="section tags-section" style="display: none;" id="tags-for-category">
      <h2>Tags for <span id="selected-category-name"></span></h2>
      <div class="tag-cloud" id="category-tags">
        <!-- Tags will be populated by JavaScript -->
      </div>
      <button class="btn-primary back-button" id="back-to-categories"><i class="fas fa-arrow-left"></i> Back to Categories</button>
    </div>
    
    <!-- Explanations Section (initially hidden, shown when tag is selected) -->
    <div class="section explanations-section" style="display: none;" id="explanations-section">
      <h2>Explanations tagged with <span id="selected-tag-name"></span></h2>
      
      <!-- Search Filter -->
      <div class="search-filter">
        <input type="text" id="explanation-search" placeholder="Search in results..." class="search-input">
        <button id="clear-search" class="btn-secondary"><i class="fas fa-times"></i></button>
      </div>
      
      <div id="explanation-list">
        <!-- Will be populated by JavaScript -->
      </div>
      <p id="no-results-message" style="display: none;">No results found. Try a different search term.</p>
      <button class="btn-primary back-button" id="back-to-tags"><i class="fas fa-arrow-left"></i> Back to Tags</button>
    </div>
  </div>
</div>

<!-- Data for JavaScript -->
<script>
  const allExplanations = [
    {% for explanation in site.explanations %}
      {
        title: {{ explanation.title | jsonify }},
        url: {{ site.baseurl | append: explanation.url | jsonify }},
        category: {{ explanation.category | jsonify }},
        categorySlug: {{ explanation.category | slugify | jsonify }},
        tags: {{ explanation.tags | jsonify }},
        date: {{ explanation.date | date: "%B %d, %Y" | jsonify }},
        excerpt: {{ explanation.content | strip_html | truncatewords: 30 | jsonify }}
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Get all required DOM elements
    const categoriesSection = document.getElementById('categoriesSection');
    const tagsSection = document.getElementById('tags-for-category');
    const explanationsSection = document.getElementById('explanations-section');
    const selectedCategoryName = document.getElementById('selected-category-name');
    const selectedTagName = document.getElementById('selected-tag-name');
    const categoryTags = document.getElementById('category-tags');
    const explanationList = document.getElementById('explanation-list');
    const backToCategories = document.getElementById('back-to-categories');
    const backToTags = document.getElementById('back-to-tags');
    const searchInput = document.getElementById('explanation-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const noResultsMessage = document.getElementById('no-results-message');
    
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
      showTagsForCategory(categoryParam);
    } else if (tagParam) {
      const matchingExplanations = allExplanations.filter(exp => 
        exp.tags.some(tag => tag.toLowerCase() === tagParam.toLowerCase() || tag.toLowerCase().replace(/\s+/g, '-') === tagParam.toLowerCase())
      );
      
      if (matchingExplanations.length > 0) {
        const tag = matchingExplanations[0].tags.find(t => 
          t.toLowerCase() === tagParam.toLowerCase() || t.toLowerCase().replace(/\s+/g, '-') === tagParam.toLowerCase()
        );
        showExplanationsForTag(tag);
      }
    }
    
    // Set up event listeners for category tags
    document.querySelectorAll('.category-tag').forEach(categoryTag => {
      categoryTag.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        if (category) {
          showTagsForCategory(category);
          history.pushState(null, null, `?category=${category}`);
        } else {
          // No category data attribute found on clicked element
        }
      });
    });
    
    // Back button functionality
    backToCategories.addEventListener('click', function() {
      // Hide tags section with fade out effect
      tagsSection.classList.add('fade-out');
      
      setTimeout(() => {
        tagsSection.style.display = 'none';
        tagsSection.classList.remove('fade-out');
        
        // Show categories section with fade in effect
        categoriesSection.style.display = 'block';
        categoriesSection.classList.add('fade-in');
        
        setTimeout(() => {
          categoriesSection.classList.remove('fade-in');
        }, 300);
      }, 300);
      
      history.pushState(null, null, window.location.pathname);
    });
    
    backToTags.addEventListener('click', function() {
      // Hide explanations section with fade out effect
      explanationsSection.classList.add('fade-out');
      
      setTimeout(() => {
        explanationsSection.style.display = 'none';
        explanationsSection.classList.remove('fade-out');
        
        // Show tags section with fade in effect
        tagsSection.style.display = 'block';
        tagsSection.classList.add('fade-in');
        
        setTimeout(() => {
          tagsSection.classList.remove('fade-in');
        }, 300);
      }, 300);
      
      const category = selectedCategoryName.textContent;
      history.pushState(null, null, `?category=${category.toLowerCase().replace(/\s+/g, '-')}`);
    });
    
    function showTagsForCategory(categorySlug) {
      // Find category name from slug
      const matchingExplanation = allExplanations.find(exp => 
        exp.categorySlug && exp.categorySlug.toLowerCase() === categorySlug.toLowerCase()
      );
      
      if (!matchingExplanation) {
        return;
      }
      
      const categoryName = matchingExplanation.category;
      selectedCategoryName.textContent = categoryName;
      
      // Get all tags for this category
      const tags = new Set();
      const tagCounts = {};
      
      allExplanations
        .filter(exp => exp.categorySlug && exp.categorySlug.toLowerCase() === categorySlug.toLowerCase())
        .forEach(exp => {
          if (exp.tags) {
            exp.tags.forEach(tag => {
              tags.add(tag);
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        });
      
      // Populate tags
      categoryTags.innerHTML = '';
      
      if (tags.size === 0) {
        categoryTags.innerHTML = '<div class="empty-state"><i class="fas fa-info-circle"></i><p class="no-content-message">No tags available for this category.</p></div>';
      } else {
        Array.from(tags).sort().forEach(tag => {
          const tagLink = document.createElement('a');
          tagLink.href = `?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`;
          tagLink.className = 'tag';
          tagLink.innerHTML = `<i class="fas fa-tag"></i> ${tag} <span class="count">(${tagCounts[tag]})</span>`;
          tagLink.addEventListener('click', function(e) {
            e.preventDefault();
            showExplanationsForTag(tag);
            history.pushState(null, null, this.href);
          });
          categoryTags.appendChild(tagLink);
        });
      }
      
      // Hide categories section with fade out effect
      categoriesSection.classList.add('fade-out');
      
      setTimeout(() => {
        categoriesSection.style.display = 'none';
        categoriesSection.classList.remove('fade-out');
        
        // Show tags section with fade in effect
        tagsSection.style.display = 'block';
        tagsSection.classList.add('fade-in');
        
        setTimeout(() => {
          tagsSection.classList.remove('fade-in');
        }, 300);
      }, 300);
    }
    
    function showExplanationsForTag(tag) {
      selectedTagName.textContent = tag;
      
      // Get all explanations with this tag
      const explanations = allExplanations.filter(exp => 
        exp.tags && exp.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      
      // Populate explanations
      explanationList.innerHTML = '';
      
      if (explanations.length === 0) {
        explanationList.innerHTML = '<div class="empty-state"><i class="fas fa-info-circle"></i><p class="no-content-message">No explanations available with this tag.</p></div>';
      } else {
        explanations.forEach(exp => {
          const expDiv = document.createElement('div');
          expDiv.className = 'explanation-card';
          expDiv.innerHTML = `
            <h3><a href="${exp.url}">${exp.title}</a></h3>
            <p>${exp.excerpt}</p>
            <div class="card-meta">
              <span class="category"><i class="fas fa-folder"></i> ${exp.category}</span>
              <span class="date"><i class="far fa-calendar-alt"></i> ${exp.date}</span>
            </div>
          `;
          explanationList.appendChild(expDiv);
        });
      }
      
      // Hide tags section with fade out effect
      tagsSection.classList.add('fade-out');
      
      setTimeout(() => {
        tagsSection.style.display = 'none';
        tagsSection.classList.remove('fade-out');
        
        // Show explanations section with fade in effect
        explanationsSection.style.display = 'block';
        explanationsSection.classList.add('fade-in');
        
        setTimeout(() => {
          explanationsSection.classList.remove('fade-in');
        }, 300);
      }, 300);
    }
    
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
        showExplanationsForTag(tag);
      }
    }
    
    // Search functionality
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      filterExplanations(searchTerm);
    });
    
    clearSearchBtn.addEventListener('click', function() {
      searchInput.value = '';
      filterExplanations('');
    });
    
    function filterExplanations(searchTerm) {
      const explanationCards = explanationList.querySelectorAll('.explanation-card');
      let visibleCount = 0;
      
      explanationCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        
        if (searchTerm === '' || title.includes(searchTerm) || content.includes(searchTerm)) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show/hide no results message
      noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
</script>

<style>
.browse-header {
  margin-bottom: 30px;
  text-align: center;
}

.browse-intro {
  max-width: 800px;
  margin: 0 auto 20px;
  color: #666;
  font-size: 1.1em;
  line-height: 1.5;
}

.tag .count {
  font-size: 0.85em;
  opacity: 0.8;
}

.section {
  margin-bottom: 40px;
  position: relative;
}

.section h2 {
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.section h2:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 3px;
}

.empty-state {
  padding: 30px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 8px;
  color: #666;
  margin: 20px 0;
}

.empty-state i {
  font-size: 2em;
  color: #ddd;
  margin-bottom: 10px;
  display: block;
}

/* Animation classes */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

.fade-out {
  animation: fadeOut 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(10px); }
}

.tag.active {
  background-color: var(--primary-color);
  color: white;
}

.back-button {
  margin-top: 20px;
  display: inline-block;
  transition: transform 0.2s ease;
}

.back-button:hover {
  transform: translateX(-3px);
}

.search-filter {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease;
}

.search-filter:focus-within {
  transform: scale(1.02);
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.btn-secondary {
  background-color: #eee;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding: 8px 12px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #ddd;
}

.explanation-card {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.explanation-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.card-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9em;
  color: #666;
}

#no-results-message {
  margin: 20px 0;
  color: #666;
  font-style: italic;
}

.no-content-message {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  text-align: center;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .browse-intro {
    padding: 0 20px;
  }
}
</style>
