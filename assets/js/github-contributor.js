/**
 * GitHub Contribution Handler
 * This script handles interactions with GitHub's API for non-technical contributors
 */

class GitHubContributor {
  constructor(options = {}) {
    this.clientId = options.clientId || '';
    this.redirectUri = options.redirectUri || '';
    this.repoOwner = options.repoOwner || '';
    this.repoName = options.repoName || '';
    this.baseBranch = options.baseBranch || 'main';
    this.token = null;
    this.username = null;
  }

  /**
   * Initiates GitHub OAuth flow
   */
  initiateOAuth() {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=public_repo`;
    window.location.href = authUrl;
  }

  /**
   * Exchanges OAuth code for token (requires server component)
   * @param {string} code - The OAuth code from GitHub
   * @returns {Promise<string>} - Access token
   */
  async exchangeCodeForToken(code) {
    // Note: This step requires a server endpoint due to CORS restrictions
    // GitHub does not allow client-side code exchange
    try {
      const response = await fetch('/api/github/exchange-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }
      
      const data = await response.json();
      this.token = data.access_token;
      await this.fetchUserInfo();
      return this.token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  /**
   * Fetches user information from GitHub
   * @returns {Promise<Object>} - User info
   */
  async fetchUserInfo() {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      
      const data = await response.json();
      this.username = data.login;
      return data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  /**
   * Forks the repository if user hasn't already
   * @returns {Promise<Object>} - Fork info
   */
  async forkRepository() {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/forks`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fork repository');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error forking repository:', error);
      throw error;
    }
  }

  /**
   * Creates a new branch in the forked repository
   * @param {string} branchName - Name for the new branch
   * @returns {Promise<Object>} - Branch creation result
   */
  async createBranch(branchName) {
    try {
      // First, get the SHA of the latest commit on the base branch
      const refResponse = await fetch(`https://api.github.com/repos/${this.username}/${this.repoName}/git/refs/heads/${this.baseBranch}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!refResponse.ok) {
        throw new Error('Failed to get reference for base branch');
      }
      
      const refData = await refResponse.json();
      const sha = refData.object.sha;
      
      // Now create the new branch
      const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repoName}/git/refs`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: sha
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create branch');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating branch:', error);
      throw error;
    }
  }

  /**
   * Creates a file in the specified branch
   * @param {string} path - File path in the repository
   * @param {string} content - File content
   * @param {string} message - Commit message
   * @param {string} branch - Branch name
   * @returns {Promise<Object>} - File creation result
   */
  async createFile(path, content, message, branch) {
    try {
      const encodedContent = btoa(unescape(encodeURIComponent(content)));
      
      const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repoName}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          content: encodedContent,
          branch: branch
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create file: ${errorData.message}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating file:', error);
      throw error;
    }
  }

  /**
   * Uploads an image file to the repository
   * @param {Object} imageData - Image data from FileReader (data URL)
   * @param {string} imageName - Original file name
   * @param {string} branch - Branch name
   * @returns {Promise<string>} - Path to the uploaded image
   */
  async uploadImage(imageData, imageName, branch) {
    try {
      // Generate a unique file name based on timestamp and original name
      const timestamp = Date.now();
      const extension = imageName.split('.').pop();
      const safeName = imageName.split('.')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
      const fileName = `${safeName}-${timestamp}.${extension}`;
      const imagePath = `assets/images/contributions/${fileName}`;
      
      // Convert data URL to base64 content (remove data URL prefix)
      const base64Content = imageData.split(',')[1];
      
      const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repoName}/contents/${imagePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Upload image for contribution`,
          content: base64Content,
          branch: branch
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to upload image: ${errorData.message}`);
      }
      
      const data = await response.json();
      return imagePath;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  /**
   * Creates a pull request
   * @param {string} title - PR title
   * @param {string} body - PR description
   * @param {string} head - Head branch (username:branch)
   * @param {string} base - Base branch to merge into
   * @returns {Promise<Object>} - Pull request creation result
   */
  async createPullRequest(title, body, head, base) {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/pulls`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          body: body,
          head: `${this.username}:${head}`,
          base: base
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create pull request');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating pull request:', error);
      throw error;
    }
  }

  /**
   * Formats form data into Markdown content
   * @param {Object} formData - The form data
   * @param {string} imagePath - Path to uploaded image (if any)
   * @returns {string} - Formatted Markdown content
   */
  formatMarkdownContent(formData, imagePath = null) {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    let frontMatter = `---
layout: explanation
title: "${formData.title}"
category: "${formData.category}"
tags: [${formData.tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
author: "${formData.author}"
date: ${dateString}
---\n\n`;
    
    let content = `## Simple Definition\n\n${formData.simpleDefinition}\n\n`;
    
    content += `## Key Points\n\n${formData.keyPoints}\n\n`;
    
    content += `## Practical Example\n\n${formData.example}\n\n`;
    
    content += `## Why It Matters\n\n${formData.whyMatters}\n\n`;
    
    // Add image if provided
    if (imagePath) {
      content += `## Visual Explanation\n\n![${formData.title} Visual Explanation](/${imagePath})\n\n`;
    }
    
    if (formData.related && formData.related.trim()) {
      content += `## Related Concepts\n\n`;
      const relatedConcepts = formData.related.split('\n');
      relatedConcepts.forEach(concept => {
        if (concept.trim()) {
          const slug = concept.trim().toLowerCase().replace(/\s+/g, '-');
          content += `- [${concept.trim()}](/explanations/${slug}/)\n`;
        }
      });
    }
    
    return frontMatter + content;
  }

  /**
   * Handles the entire contribution workflow
   * @param {Object} formData - Form data from the contributor
   * @returns {Promise<Object>} - The result of the contribution process
   */
  async submitContribution(formData) {
    if (!this.token || !this.username) {
      throw new Error('Not authenticated with GitHub');
    }
    
    try {
      // Fork the repository
      await this.forkRepository();
      
      // Wait a moment for the fork to be created
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create a branch
      const branchName = `contribution/${formData.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      await this.createBranch(branchName);
      
      // Upload image if provided
      let imagePath = null;
      if (formData.image) {
        imagePath = await this.uploadImage(formData.image.data, formData.image.name, branchName);
      }
      
      // Format content
      const content = this.formatMarkdownContent(formData, imagePath);
      
      // Create file path with sanitized category and title
      const categorySlug = formData.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const titleSlug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const filePath = `_explanations/${categorySlug}/${titleSlug}.md`;
      
      // Create the file
      await this.createFile(
        filePath,
        content,
        `Add explanation for ${formData.title}`,
        branchName
      );
      
      // Create pull request
      const prResult = await this.createPullRequest(
        `Add explanation: ${formData.title}`,
        `This explanation was contributed by ${formData.author} using the easy contribution form.`,
        branchName,
        this.baseBranch
      );
      
      return {
        success: true,
        pullRequestUrl: prResult.html_url,
        message: 'Your contribution has been submitted successfully!'
      };
    } catch (error) {
      console.error('Error submitting contribution:', error);
      return {
        success: false,
        message: `Error: ${error.message}`
      };
    }
  }
}

// Export for browser or module use
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = GitHubContributor;
} else {
  window.GitHubContributor = GitHubContributor;
}
