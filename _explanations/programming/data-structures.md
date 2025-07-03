---
title: "Data Structures"
author: "Fer Sigüenza"
authors:
  - name: "Fer Sigüenza"
    github: "fersiguenza"
date: 2025-07-03
category: "Programming"
tags: ["data-structures", "algorithms", "computer-science", "programming", "optimization"]
---

## What is it?

Data structures are specialized formats for organizing, storing, and accessing data efficiently in computer memory. They form the foundation of algorithms and determine how quickly programs can process information.

## Simple Explanation

Think of data structures like containers for your data. Just as you might store groceries differently (refrigerator, pantry, freezer) based on what they are and how often you need them, programmers choose different data structures depending on:

- How often they need to access the data
- In what order they need to retrieve items
- How frequently they'll add or remove items

Choosing the right data structure can make your program run dramatically faster.

## Common Data Structures

### Arrays
Like a row of numbered mailboxes where each item is stored at a specific position.
- **Strengths**: Fast access to any element if you know its position
- **Weaknesses**: Slow insertion/deletion in the middle

### Linked Lists
Like a scavenger hunt where each item points to the next one.
- **Strengths**: Fast insertion/deletion anywhere in the list
- **Weaknesses**: Slow access to specific elements (must traverse from beginning)

### Hash Tables (Dictionaries/Maps)
Like a dictionary where you can look up values by their associated keywords.
- **Strengths**: Very fast lookups, insertions, and deletions
- **Weaknesses**: No inherent ordering of elements

### Trees
Like a family tree with hierarchical relationships between elements.
- **Strengths**: Good for representing hierarchical data
- **Weaknesses**: More complex to implement than linear structures

### Graphs
Like a network of friends where connections go in multiple directions.
- **Strengths**: Perfect for representing complex relationships
- **Weaknesses**: Can be memory-intensive and complex to work with

# Access by position (index)
today_temp = temperatures[0]  # Returns 72
```

**Best for**: Direct access by position when size is fixed

### Linked Lists
Like a scavenger hunt where each clue points to the next location:

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Create: 1 -> 2 -> 3
head = Node(1)
head.next = Node(2)
head.next.next = Node(3)
```

**Best for**: Frequent insertions/deletions

### Hash Tables (Dictionaries)
Like a dictionary where you look up a word to find its definition:

```python
# A hash table mapping countries to capitals
capitals = {
    "France": "Paris",
    "Japan": "Tokyo",
    "Brazil": "Brasilia"
}

# Access by key
japan_capital = capitals["Japan"]  # Returns "Tokyo"
```

**Best for**: Fast lookups by key

### Trees
Like a family tree with branches:

```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Create a binary search tree
root = TreeNode(10)
root.left = TreeNode(5)
root.right = TreeNode(15)
```

**Best for**: Hierarchical data and efficient searching

## Why it matters

The right data structure can:
- Make your program run significantly faster
- Reduce memory usage
- Simplify your code and make it more readable
- Enable operations that would otherwise be impractical

For example, searching an unsorted array takes O(n) time, but a binary search tree can do it in O(log n) - the difference between seconds and milliseconds for large datasets.

## Related concepts

- [Algorithms](/explanations/programming/algorithms.md)
- [Big O Notation](/explanations/programming/big-o-notation.md)
- [Memory Management](/explanations/programming/memory-management.md)
