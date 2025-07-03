---
layout: default
title: Easy Contribution
permalink: /easy-contribute/
---

<div class="page-container">
  <article class="explanation">
    <header class="page-header">
      <h1>Contribute Without GitHub Knowledge</h1>
    </header>
    
    <div class="page-content">
      <div class="title-with-image" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <p class="intro" style="flex: 1; margin-right: 20px;">You don't need to know Git or Markdown to contribute to SimpleConcepts. Use this form to create your explanation, and we'll handle the technical details for you!</p>
        <img src="../assets/images/write.png" alt="Computer illustration" class="feature-image" style="max-width: 120px; flex-shrink: 0;">
      </div>

      <div id="contribute-form" class="contribute-form">
        <div class="form-group">
          <label for="title">Concept Title*</label>
          <input type="text" id="title" class="form-control" placeholder="e.g., Dependency Injection" required>
        </div>

        <div class="form-group">
          <label for="category">Category*</label>
          <input type="text" id="category" class="form-control" placeholder="e.g., Programming, Cloud Computing, DevOps" required>
          <small class="form-help">Feel free to enter an existing category or create a new one</small>
        </div>

        <div class="form-group">
          <label for="tags">Tags (comma-separated)*</label>
          <input type="text" id="tags" class="form-control" placeholder="e.g., design-pattern, java, spring" required>
        </div>

        <div class="form-group">
          <label for="author">Your Name*</label>
          <input type="text" id="author" class="form-control" placeholder="e.g., Jane Smith" required>
        </div>

        <div class="form-group">
          <label for="email">Your Email* (won't be published)</label>
          <input type="email" id="email" class="form-control" placeholder="e.g., jane@example.com" required>
        </div>

        <div class="form-group">
          <label for="simple-definition">Simple Definition* (1-2 sentences)</label>
          <textarea id="simple-definition" class="form-control" rows="2" placeholder="A clear, concise definition of the concept." required></textarea>
        </div>

        <div class="form-group">
          <label for="key-points">Key Points* (One point per line)</label>
          <textarea id="key-points" class="form-control" rows="4" placeholder="- First important point about the concept
- Second important point about the concept
- Third important point about the concept" required></textarea>
        </div>

        <div class="form-group">
          <label for="example">Practical Example*</label>
          <textarea id="example" class="form-control" rows="6" placeholder="Describe a real-world example of this concept. Include code if applicable." required></textarea>
        </div>

        <div class="form-group">
          <label for="why-matters">Why It Matters*</label>
          <textarea id="why-matters" class="form-control" rows="4" placeholder="Explain why this concept is important and where it's used." required></textarea>
        </div>

        <div class="form-group">
          <label for="image-upload">Explanatory Image (Optional)</label>
          <div class="image-upload-container">
            <input type="file" id="image-upload" class="image-upload" accept="image/png, image/jpeg, image/gif, image/svg+xml">
            <div class="image-preview-container">
              <img id="image-preview" class="image-preview" src="" alt="Preview">
              <button type="button" id="remove-image" class="remove-image-btn"><i class="fas fa-times"></i></button>
            </div>
          </div>
          <small class="form-help">Upload an image to help explain your concept (max 2MB). Images will be stored in /assets/images/explanations/[concept-name]/</small>
        </div>

        <div class="form-group">
          <label for="related">Related Concepts (One per line)</label>
          <textarea id="related" class="form-control" rows="3" placeholder="Concept Name 1
Concept Name 2"></textarea>
        </div>

        <div class="github-auth">
          <p>To submit your contribution, you'll need to have a GitHub account and authorize our application:</p>
          <div class="github-auth-steps">
            <div class="auth-step">
              <span class="step-number">1</span>
              <p><strong>Create a GitHub account</strong> if you don't already have one at <a href="https://github.com/signup" target="_blank">github.com/signup</a></p>
            </div>
            <div class="auth-step">
              <span class="step-number">2</span>
              <p><strong>Authorize our application</strong> to create a contribution on your behalf</p>
            </div>
          </div>
          <button id="github-auth-button" class="github-button">
            <i class="fab fa-github"></i> Authorize with GitHub
          </button>
          <div id="auth-status" class="auth-status"></div>
        </div>

        <button id="submit-contribution" class="submit-button" disabled>Submit Contribution</button>
        
        <div id="submission-result" class="submission-result"></div>
      </div>

      <div class="info-box">
        <h3>What happens after submission?</h3>
        <p>Your contribution will be submitted as a pull request to our GitHub repository. Our team will review it for:</p>
        <ul>
          <li>Clarity and simplicity</li>
          <li>Technical accuracy</li>
          <li>Adherence to our guidelines</li>
          <li>Grammar and spelling</li>
        </ul>
        <p>You'll receive an email notification when your contribution is published or if we have any questions.</p>
      </div>
    </div>
  </article>
</div>

<style>
  .title-with-image {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 20px !important;
    flex-wrap: nowrap !important;
  }
  
  .title-with-image .intro {
    flex: 1 !important;
    margin-right: 20px !important;
  }
  
  .title-with-image .feature-image {
    max-width: 120px !important;
    flex-shrink: 0 !important;
    order: 2 !important;
  }
  
.intro {
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 30px;
}

.contribute-form {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
}

textarea.form-control {
  resize: vertical;
}

.github-auth {
  background-color: #f0f7ff;
  border-radius: 6px;
  padding: 20px;
  margin: 30px 0;
  text-align: center;
}

.github-button {
  background-color: #24292e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.github-button:hover {
  background-color: #000;
}

.submit-button {
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.submit-button:hover {
  background-color: #005bb5;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.auth-status {
  margin-top: 10px;
  font-weight: bold;
}

.submission-result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
}

.info-box {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}

.form-help {
  display: block;
  margin-top: 5px;
  color: #6c757d;
  font-size: 0.875em;
}

.image-upload-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.image-upload {
  padding: 8px;
  background-color: #f8f9fa;
  border: 1px dashed #ddd;
  border-radius: 4px;
}

.image-preview-container {
  position: relative;
  display: none;
  width: 200px;
  height: 200px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.remove-image-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.github-auth-steps {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.auth-step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #0066cc;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

.auth-step p {
  margin: 0;
  line-height: 1.4;
}

.feature-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const authButton = document.getElementById('github-auth-button');
  const submitButton = document.getElementById('submit-contribution');
  const authStatus = document.getElementById('auth-status');
  const submissionResult = document.getElementById('submission-result');
  
  // Image upload handling
  const imageUpload = document.getElementById('image-upload');
  const imagePreview = document.getElementById('image-preview');
  const imagePreviewContainer = document.querySelector('.image-preview-container');
  const removeImageBtn = document.getElementById('remove-image');
  
  let accessToken = null;
  let uploadedImage = null;
  
  // GitHub OAuth parameters
  const clientId = 'YOUR_GITHUB_CLIENT_ID'; // You'll need to register an OAuth app on GitHub
  const redirectUri = window.location.origin + '/easy-contribute/';
  
  // Check if we're returning from GitHub auth
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  if (code) {
    // Clear the code from the URL
    window.history.replaceState({}, document.title, '/easy-contribute/');
    
    // Exchange code for token (would need a server endpoint in real implementation)
    // This is a placeholder - in a real app, you would send this code to your server
    authStatus.innerHTML = 'Successfully authenticated with GitHub!';
    authStatus.style.color = 'green';
    submitButton.disabled = false;
    
    // In a real implementation, your server would handle the OAuth exchange and return a token
    // accessToken = await exchangeCodeForToken(code);
    
    // For demo purposes only:
    accessToken = 'demo_token';
  }
  
  // Image upload preview
  imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size exceeds 2MB limit. Please choose a smaller image.');
      imageUpload.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
      imagePreview.src = event.target.result;
      imagePreviewContainer.style.display = 'block';
      uploadedImage = {
        data: event.target.result,
        name: file.name,
        type: file.type
      };
    };
    reader.readAsDataURL(file);
  });
  
  // Remove image button
  removeImageBtn.addEventListener('click', function() {
    imageUpload.value = '';
    imagePreview.src = '';
    imagePreviewContainer.style.display = 'none';
    uploadedImage = null;
  });
  
  authButton.addEventListener('click', function() {
    // Redirect to GitHub authorization page
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=public_repo`;
    window.location.href = authUrl;
  });
  
  submitButton.addEventListener('click', async function() {
    if (!validateForm()) {
      return;
    }
    
    submitButton.disabled = true;
    submissionResult.innerHTML = 'Submitting your contribution...';
    submissionResult.style.backgroundColor = '#fff3cd';
    
    try {
      // Get form data
      const formData = {
        title: document.getElementById('title').value.trim(),
        category: document.getElementById('category').value.trim(),
        tags: document.getElementById('tags').value.trim(),
        author: document.getElementById('author').value.trim(),
        email: document.getElementById('email').value.trim(),
        simpleDefinition: document.getElementById('simple-definition').value.trim(),
        keyPoints: document.getElementById('key-points').value.trim(),
        example: document.getElementById('example').value.trim(),
        whyMatters: document.getElementById('why-matters').value.trim(),
        related: document.getElementById('related').value.trim(),
        image: uploadedImage
      };
      
      // In a real implementation, this would interact with GitHub's API to:
      // 1. Fork the repository (if the user hasn't already)
      // 2. Create a new branch
      // 3. Create the markdown file with the content
      // 4. If an image is included:
      //    - Generate a sanitized concept name from the title (e.g., "AWS Lambda" -> "aws-lambda")
      //    - Create directory /assets/images/explanations/[concept-name]/ if it doesn't exist
      //    - Upload the image to that directory with a sanitized filename
      //    - Add an image reference in the markdown: ![Alt text](/assets/images/explanations/[concept-name]/[image-filename])
      // 5. Submit a pull request
      
      // This is a placeholder for demonstration purposes
      setTimeout(() => {
        submissionResult.innerHTML = 'Thank you for your contribution! We\'ve received your submission and will review it soon.';
        submissionResult.style.backgroundColor = '#d4edda';
        submissionResult.style.color = '#155724';
        submissionResult.style.padding = '15px';
        submissionResult.style.borderRadius = '4px';
        
        // Reset form
        document.getElementById('contribute-form').reset();
        imagePreview.src = '';
        imagePreviewContainer.style.display = 'none';
        uploadedImage = null;
      }, 2000);
    } catch (error) {
      submissionResult.innerHTML = 'Error: ' + error.message;
      submissionResult.style.backgroundColor = '#f8d7da';
      submissionResult.style.color = '#721c24';
      submitButton.disabled = false;
    }
  });
  
  function validateForm() {
    const requiredFields = [
      'title', 'category', 'tags', 'author', 'email', 
      'simple-definition', 'key-points', 'example', 'why-matters'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(field => {
      const element = document.getElementById(field);
      if (!element.value.trim()) {
        element.style.borderColor = 'red';
        isValid = false;
      } else {
        element.style.borderColor = '#ddd';
      }
    });
    
    if (!isValid) {
      submissionResult.innerHTML = 'Please fill in all required fields.';
      submissionResult.style.backgroundColor = '#f8d7da';
      submissionResult.style.color = '#721c24';
      submissionResult.style.padding = '15px';
      submissionResult.style.borderRadius = '4px';
    }
    
    return isValid;
  }
  
  // For a complete implementation, you would need to include:
  // - Functions to format the contribution as Markdown
  // - Functions to interact with GitHub API for forking, creating branches, etc.
  // - Error handling and user feedback mechanisms
});
</script>
