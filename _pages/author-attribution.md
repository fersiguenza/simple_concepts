# Author Attribution in SimpleConcepts

---
layout: page
title: Author Attribution
permalink: /author-attribution/
---

This guide explains how author attribution works in the SimpleConcepts project.

## How Author Information is Stored

All articles in SimpleConcepts include author information in their front matter:

```yaml
---
title: "Article Title"
author: "Author Name"  # Legacy field, kept for compatibility
authors:
  - name: "Author Name"
    github: "github-username"  # Links to GitHub profile
date: 2025-07-03
category: "Category"
tags: ["tag1", "tag2"]
---
```

## Adding Yourself as an Author

When you make a significant contribution to an article:

1. **Creating a new article**: Add yourself as both the `author` and in the `authors` list
2. **Major revisions**: Add yourself to the `authors` list while keeping the original author

### Example of Multiple Authors

```yaml
---
title: "AWS Bedrock"
author: "Fer Sigüenza"  # Original author
authors:
  - name: "Fer Sigüenza"
    github: "fersiguenza"
  - name: "Jane Smith"
    github: "janesmith123"  # Second contributor
date: 2025-07-03
category: "AWS"
tags: ["generative AI", "AWS"]
---
```

## How Authors Are Displayed

- Authors are displayed in the article header with links to their GitHub profiles
- Multiple authors are separated by commas
- The order of authors in the front matter is preserved in the display

## Automated Attribution

Our site also supports automated attribution through git history:

1. We have a Jekyll plugin that can extract contributors from git history
2. A GitHub Action can automatically update author information when PRs are merged

## Attribution Guidelines

- **Respect original authors**: Don't remove existing author attributions
- **Significant contributions**: Only add yourself for substantial changes, not minor fixes
- **GitHub username**: Always include your GitHub username for proper linking
- **Consistency**: Use the same name format throughout the site

For questions about author attribution, please contact the project maintainers.
