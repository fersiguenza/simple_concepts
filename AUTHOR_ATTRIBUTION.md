# Contributing to Authorship

## How Authorship Works in SimpleConcepts

This project automatically tracks and displays the authors who contribute to each explanation article. Here's how it works:

### Multiple Authors

Articles in this project can have multiple authors. We track authorship in three ways:

1. **Git History**: We automatically extract contributors from Git history
2. **Manual Attribution**: Authors can be manually added in the front matter
3. **GitHub Actions**: Contributors are automatically updated when PRs are merged

### Author Format in Front Matter

When creating or editing an article, you can use this format in the front matter:

```yaml
---
title: "Your Article Title"
author: "Primary Author Name"  # Kept for compatibility
authors:
  - name: "Author One"
    github: "github-username"  # Optional GitHub username
  - name: "Author Two"
    github: "another-username"
---
```

### When You Contribute

When you make a contribution:

1. **New Articles**: Add yourself as the author in the front matter
2. **Existing Articles**: Your contribution will be automatically tracked through Git history
3. **Major Edits**: For significant contributions to existing articles, you can add yourself to the `authors` list

### Attribution in Action

- The article page displays all contributors with links to their GitHub profiles
- The primary author (first in the list) is emphasized
- Contributors are ordered by significance of contribution

## Guidelines

- Don't remove existing authors when you contribute
- For minor edits (typos, formatting), attribution is tracked but may not be displayed
- Respect the original author's work when making changes
