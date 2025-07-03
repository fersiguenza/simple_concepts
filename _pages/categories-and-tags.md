---
layout: default
title: Browse
permalink: /categories-and-tags/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/components/categories-and-tags.css">

<div class="page-container">
  <div class="page-categories-and-tags">
    <div class="browse-header">
      <div class="title-with-image">
        <div>
          <h1>Browse</h1>
          <p class="browse-intro">Explore our collection of explanations by category or tag. Find the perfect explanation for your needs by navigating through our organized content structure.</p>
        </div>
        <img src="{{ site.baseurl }}/assets/images/ligth.png" alt="Light bulb illustration" class="feature-image">
      </div>
    </div>

    <!-- Categories Section -->
    <div class="section" id="categoriesSection">
      <div class="category-header">
        <h2>Categories</h2>
        <!-- Search Filter for Categories -->
        <div class="search-filter">
          <input type="text" id="categories-search" placeholder="Search categories..." class="search-input">
          <button id="clear-categories-search" class="btn-secondary"><i class="fas fa-times"></i></button>
        </div>
      </div>
      
      <div class="tag-cloud categories-cloud">
        {% assign all_categories = "" | split: "" %}
        
        {% for explanation in site.explanations %}
          {% if explanation.category %}
            {% assign all_categories = all_categories | push: explanation.category %}
          {% elsif explanation.categories[0] %}
            {% assign all_categories = all_categories | push: explanation.categories[0] %}
          {% endif %}
        {% endfor %}
        
        {% assign all_categories = all_categories | uniq | sort %}
        
        {% for category in all_categories %}
          <a href="#{{ category | slugify }}" class="tag category-tag" data-category="{{ category | slugify }}">
            <i class="fas fa-folder"></i> {{ category }} 
            <span class="count" id="count-{{ category | slugify }}"></span>
          </a>
        {% endfor %}
      </div>
      <p id="categories-no-results-message" style="display: none;">No categories found. Try a different search term.</p>
    </div>
    
    <!-- Category Explanations Section (initially hidden, shown when category is selected) -->
    <div class="section category-explanations-section" style="display: none;" id="category-explanations-section">
      <div class="category-header">
        <h2>Explanations in <span id="selected-category-name-explanations"></span></h2>
        
        <!-- Search Filter for Category -->
        <div class="search-filter">
          <input type="text" id="category-explanation-search" placeholder="Search in this category..." class="search-input">
          <button id="clear-category-search" class="btn-secondary"><i class="fas fa-times"></i></button>
        </div>
      </div>
      
      <!-- Popular Tags for this Category -->
      <div class="popular-tags-section">
        <h3>Filter by tag</h3>
        <div class="tag-cloud" id="popular-category-tags">
          <!-- Popular tags will be populated by JavaScript -->
        </div>
        <button class="btn-text" id="show-all-tags">Show all tags <i class="fas fa-chevron-down"></i></button>
      </div>
      
      <div id="category-explanation-list">
        <!-- Will be populated by JavaScript -->
      </div>
      <p id="category-no-results-message" style="display: none;">No results found. Try a different search term.</p>
      <button class="btn-primary back-button" id="back-to-categories-from-explanations"><i class="fas fa-arrow-left"></i> Back to Categories</button>
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
        {% if explanation.category %}
        category: {{ explanation.category | jsonify }},
        categorySlug: {{ explanation.category | slugify | jsonify }},
        {% elsif explanation.categories[0] %}
        category: {{ explanation.categories[0] | jsonify }},
        categorySlug: {{ explanation.categories[0] | slugify | jsonify }},
        {% else %}
        category: "",
        categorySlug: "",
        {% endif %}
        tags: {{ explanation.tags | jsonify }},
        date: {{ explanation.date | date: "%B %d, %Y" | jsonify }},
        excerpt: {{ explanation.content | strip_html | truncatewords: 30 | jsonify }}
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>

<script src="{{ site.baseurl }}/assets/js/categories-and-tags.js"></script>
