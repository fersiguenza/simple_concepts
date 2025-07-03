---
title: "BERT: Bidirectional Encoder Representations from Transformers"
author: "Fer Sigüenza"
authors:
  - name: "Fer Sigüenza"
    github: "fersiguenza"
date: 2025-07-03
category: "AI"
tags: ["NLP", "transformers", "language models", "deep learning"]
---

## What is it?

BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained language model developed by Google that revolutionized natural language processing by deeply understanding context in text through bidirectional training.

## Simple Explanation

Imagine you're learning a new language by reading books. When you encounter an unfamiliar word, you look at the surrounding words for context. BERT works similarly, but instead of just looking at words before or after, it looks at the entire sentence at once to understand each word's meaning.

Traditional language models read text in one direction (left-to-right or right-to-left). BERT is different because it's bidirectional - it can look at both directions simultaneously, giving it a much richer understanding of language.

## How BERT Works

BERT uses a transformer architecture with three key components:

1. **Tokenization**: Breaking text into tokens (words or parts of words)
2. **Embeddings**: Converting tokens into numerical vectors
3. **Transformer layers**: Processing these vectors through multiple layers of attention mechanisms

BERT is pre-trained on a massive corpus of text using two main tasks:

1. **Masked Language Modeling (MLM)**: BERT randomly masks (hides) words in a sentence and tries to predict them based on surrounding context
2. **Next Sentence Prediction (NSP)**: BERT predicts whether two sentences naturally follow each other or are randomly paired

```python
# Example of loading a pre-trained BERT model
from transformers import BertModel, BertTokenizer

# Load pre-trained model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Prepare input by tokenizing text
text = "BERT understands context better than previous models."
encoded_input = tokenizer(text, return_tensors='pt')

# Get BERT embeddings
outputs = model(**encoded_input)
```

## BERT Variants

Several versions of BERT exist:

- **BERT Base**: 12 transformer layers, 110 million parameters
- **BERT Large**: 24 transformer layers, 340 million parameters
- **DistilBERT**: A smaller, faster version with 40% fewer parameters
- **RoBERTa**: An optimized version of BERT with improved training methodology
- **ALBERT**: A lite version of BERT with parameter-sharing techniques

## What Makes BERT Special

BERT's breakthrough contributions to NLP include:

1. **Contextual understanding**: Words have different meanings in different contexts, and BERT captures these nuances
2. **Bidirectional context**: Understanding words based on their entire surroundings, not just what comes before
3. **Transfer learning**: The ability to apply general language knowledge to specific tasks
4. **State-of-the-art performance**: BERT set new records on multiple NLP benchmarks upon release

## Applications of BERT

BERT can be applied to numerous NLP tasks through [fine-tuning]({{ site.baseurl }}/explanations/fine-tuning-techniques/):

- **Question answering**: Understanding questions and finding answers in text
- **Sentiment analysis**: Determining if text expresses positive, negative, or neutral sentiment
- **Named entity recognition**: Identifying people, organizations, locations in text
- **Text classification**: Categorizing documents by topic or intent
- **[CV-Job matching]({{ site.baseurl }}/explanations/fine-tuning-bert-for-cv-matching/)**: Matching resumes to job descriptions

## Limitations

Despite its power, BERT has some limitations:

1. **Computational requirements**: BERT models are large and require significant computing resources
2. **Context length**: Original BERT has a 512 token limit, making it challenging for long documents
3. **Domain specificity**: General BERT may need adaptation for specialized domains like legal or medical text
4. **No generation capability**: As an encoder-only model, BERT doesn't naturally generate text

## Related Concepts

- [Transformer Architecture]({{ site.baseurl }}/explanations/transformer-architecture/)
- [Fine-Tuning Techniques]({{ site.baseurl }}/explanations/fine-tuning-techniques/)
- [Text Embeddings]({{ site.baseurl }}/explanations/text-embeddings/)
- [Transfer Learning in NLP]({{ site.baseurl }}/explanations/transfer-learning-nlp/)

## Wrapping Up

BERT represents a significant milestone in NLP by introducing truly bidirectional context understanding. Its ability to grasp the nuances of language has enabled advances across numerous applications and spawned an entire family of transformer-based language models.

While newer models continue to advance the state of the art, BERT's approach to language understanding remains foundational to modern NLP.
