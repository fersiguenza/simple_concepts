# Explanation Images

This directory contains images used in SimpleConcepts explanations.

## Directory Structure

```
/assets/images/explanations/
  ├── [concept-name]/
  │    ├── [image1.png]
  │    └── [image2.jpg]
  └── another-concept/
       └── diagram.svg
```

## Guidelines

1. Store images for each explanation in a directory with the same name as the explanation file (kebab-case)
2. Use descriptive filenames
3. Optimize images for web (compress them to reduce file size)
4. Prefer SVG for diagrams and PNG for screenshots
5. Maximum image size: 2MB

## How to Reference Images in Markdown

In explanation markdown files, reference images like this:

```markdown
![Alt text describing the image](/assets/images/explanations/concept-name/image-filename.png)
```
