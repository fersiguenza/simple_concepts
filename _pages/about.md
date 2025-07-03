---
layout: default
title: About
permalink: /about/
---

<div class="page-container">
  <article class="explanation">
    <header class="page-header">
      <h1>About SimpleConcepts</h1>
    </header>
    
    <div class="page-content">
      <div class="title-with-image">
        <h2>Our Story</h2>
        <img src="/assets/images/ligth.png" alt="Light bulb illustration" class="feature-image">
      </div>
      <p>SimpleConcepts was born from a simple observation: complex concepts are often explained in overly complicated ways. We believe in making knowledge accessible to everyone through clear, concise explanations.</p>

      <h2>Our Mission</h2>

      <p>Our mission is to demystify complex concepts across technology, science, finance, and more through:</p>

      <div class="mission-cards">
        <div class="mission-card">
          <h3>Accessibility</h3>
          <p>Everyone should be able to understand complex concepts</p>
        </div>
        <div class="mission-card">
          <h3>Clarity</h3>
          <p>Explanations should be concise and to the point</p>
        </div>
        <div class="mission-card">
          <h3>Real-world Application</h3>
          <p>Examples are essential for understanding</p>
        </div>
        <div class="mission-card">
          <h3>Collaboration</h3>
          <p>Community input leads to better explanations</p>
        </div>
      </div>

      <h2>How It Works</h2>

      <p>SimpleConcepts is built on GitHub Pages, making it easy for anyone to contribute. Each explanation follows a standard format that includes:</p>
      <ul>
        <li>A brief definition</li>
        <li>A simple explanation in plain language</li>
        <li>Practical examples</li>
        <li>Why the concept matters</li>
      </ul>

      <h2 id="contributing">Contributing to SimpleConcepts</h2>

      <p>We welcome contributions from experts and beginners alike. By sharing your knowledge, you're helping make complex concepts accessible to everyone.</p>

      <div class="contribution-options">
        <div class="contribution-option">
          <h3><i class="fas fa-code"></i> For Developers</h3>
          <p>If you're comfortable with GitHub and Markdown, you can contribute directly through our repository.</p>
          <a href="https://github.com/fersiguenza/simple_concepts" class="option-link">Contribute via GitHub</a>
        </div>
        <div class="contribution-option">
          <h3><i class="fas fa-magic"></i> For Everyone Else</h3>
          <p>Not familiar with GitHub? No problem! Use our simple form to create your explanation.</p>
          <a href="/easy-contribute/" class="option-link">Use Easy Contribution Form</a>
        </div>
      </div>

      <h3>Contribution Guidelines</h3>

      <h4>Writing Guidelines</h4>
      <ol>
        <li><strong>Keep it simple</strong>: Explain the concept as if you're talking to someone with no prior knowledge</li>
        <li><strong>Be concise</strong>: Aim for 200-300 words for the core explanation</li>
        <li><strong>Use examples</strong>: Include at least one practical example</li>
        <li><strong>Avoid jargon</strong>: If you must use technical terms, explain them</li>
        <li><strong>Use visuals</strong>: Diagrams or images can help explain complex concepts</li>
      </ol>

      <h4>File Format</h4>
      <p>All explanations are written in Markdown with YAML frontmatter. Here's a template:</p>

      <div class="code-block">
<pre>---
layout: explanation
title: "Concept Name"
category: "Category"
tags: ["tag1", "tag2", "tag3"]
author: "Your Name"
date: 2025-07-02
---

## Simple Definition

A clear, concise definition of the concept in 1-2 sentences.

## Key Points

- First important point about the concept
- Second important point about the concept
- Third important point about the concept

## Practical Example

```code
// Example code if applicable
```

## Why It Matters

Explanation of why this concept is important and where it's used.

## Related Concepts

- [Related Concept 1](link-to-related-concept)
- [Related Concept 2](link-to-related-concept)
</pre>
      </div>

      <h4>Submission Process</h4>
      <ol>
        <li>Fork the repository on GitHub</li>
        <li>Create a new branch for your explanation</li>
        <li>Add your explanation file to the <code>_explanations</code> directory under the appropriate category</li>
        <li>Submit a pull request with a brief description of your contribution</li>
      </ol>

      <div class="help-box">
        <h4>Need Help?</h4>
        <p>If you're new to GitHub or need assistance, feel free to open an issue first describing the explanation you'd like to add, and we'll help guide you through the process.</p>
        <a href="https://github.com/yourusername/SimpleConcepts/issues/new" class="github-link"><i class="fab fa-github"></i> Open an Issue</a>
      </div>

      <h4>Review Process</h4>
      <p>All submissions will be reviewed for:</p>
      <ul>
        <li>Clarity and simplicity</li>
        <li>Technical accuracy</li>
        <li>Adherence to the template</li>
        <li>Grammar and spelling</li>
      </ul>
      <p>We may request changes or improvements before merging your contribution.</p>

      <div class="contribute">
        <div class="contribute-inner">
          <img src="/assets/logo.png" alt="SimpleConcepts Logo" class="contribute-logo">
          <h3><i class="fas fa-code-branch"></i> Join our community</h3>
          <p>Ready to contribute? 
            <a href="https://github.com/yourusername/SimpleConcepts" class="contribute-link">
              <i class="fab fa-github"></i> Visit our GitHub repository
            </a>
          </p>
        </div>
      </div>
    </div>
  </article>
</div>

<style>
.mission-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.mission-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mission-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.mission-card h3 {
  margin-top: 0;
  color: var(--primary-color);
}

.code-block {
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: 20px;
  margin: 20px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
}

.help-box {
  background-color: #f0f7ff;
  border-left: 4px solid #0066cc;
  padding: 20px;
  margin: 30px 0;
  border-radius: 0 6px 6px 0;
}

.github-link {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #24292e;
  color: white !important;
  border-radius: 4px;
  text-decoration: none;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.github-link:hover {
  background-color: #000;
  color: white !important;
}

.contribute {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 5px;
  margin-top: 40px;
}

.contribute-inner {
  border: 2px dashed #ddd;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
}

.contribute-logo {
  width: 80px;
  height: auto;
  margin-bottom: 15px;
}

.contribute-link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #0066cc;
  color: white !important;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.contribute-link:hover {
  background-color: #005bb5;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
  color: white !important;
}

.contribution-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px 0;
}

.contribution-option {
  flex: 1;
  min-width: 300px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.contribution-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.contribution-option h3 {
  color: #0066cc;
  margin-top: 0;
}

.option-link {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #0066cc;
  color: white !important;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.option-link:hover {
  background-color: #005bb5;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
  color: white !important;
}

.intro-section {
  display: flex;
  align-items: flex-start;
  margin: 0 0 20px 0;
}

.title-with-image {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.title-with-image h2 {
  margin: 0;
}

.title-with-image .intro {
  flex: 1;
  margin-right: 15px;
}

.feature-image {
  max-width: 110px;
  margin-left: 15px;
  flex-shrink: 0;
}
</style>
