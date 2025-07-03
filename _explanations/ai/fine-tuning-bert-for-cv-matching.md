---
title: "CV-Job Matching with BERT"
author: "Fer Sigüenza"
authors:
  - name: "Fer Sigüenza"
    github: "fersiguenza"
date: 2025-07-03
category: "AI"
tags: ["BERT", "fine-tuning", "job matching", "NLP", "HR tech"]
---

## What is it?

CV-Job matching with BERT is a practical application that combines [BERT language models]({{ site.baseurl }}/explanations/bert-language-model/) and [fine-tuning techniques]({{ site.baseurl }}/explanations/fine-tuning-techniques/) to create AI systems that automatically match job candidates' resumes to relevant job descriptions, streamlining the recruitment process.

## Simple Explanation

Imagine you have a hiring manager who's extremely good at matching people to jobs because they understand both technical skills and "reading between the lines" of resumes and job descriptions.

BERT is like a digital language expert that already understands English very well. Fine-tuning BERT for CV matching is like training this digital expert to specifically understand the language of resumes and job postings by showing it thousands of examples of good and bad matches.

The process works in three main steps:
1. **Start with pre-trained BERT**: Use the model that already understands language
2. **Provide matching examples**: Feed the model pairs of resumes and job descriptions with labels showing whether they're good matches
3. **Adjust the model**: Fine-tune BERT's parameters to recognize patterns specific to job matching

## Benefits

- **Understands context**: Recognizes that "full-stack developer" and "front-end and back-end programming" might be referring to similar skills
- **Captures nuance**: Can detect soft skills and culture fit beyond just keyword matching
- **Improves over time**: Gets better as it processes more hiring data from your organization

## Example Use Case

A recruiter uploads 200 applications for a software engineering position. The fine-tuned BERT model ranks candidates based on how well their qualifications match the job requirements, saving hours of manual screening time.

WandB is a Machine Learning Operations (MLOps) platform that helps in tracking experiments, managing, and visualising machine learning models. It offers several key benefits:

- **Experiment Tracking**: WandB logs hyperparametres, metrics, and model performance, creating a detailed history of our iterations.
- **Visualisation**: The platform generates real-time, interactive visualisations of our training progress, helping us quickly identify and address issues like overfitting.
- **Model Versioning**: We use WandB to maintain version control for our models, making it easy to compare performance across iterations or revert to previous states when needed.

By leveraging these features, we maintain a structured, data-driven approach to developing and refining our CV-Job Description matcher, including logging our training progress, such as loss and evaluation metrics for each epoch.

```
wandb: 
wandb: Run history:
wandb:   accuracy █▁▁▁▁▁▁▁▁▁
wandb:      epoch ▁▁▂▂▃▃▃▃▄▄▅▅▆▆▆▆▇▇██
wandb:   f1_score ▁▁▁▁▁▁▁▁▁▁
wandb:  precision ▁▁▁▁▁▁▁▁▁▁
wandb:     recall ▁▁▁▁▁▁▁▁▁▁
wandb: train_loss █▆▃▃▃▂▂▂▁▁
wandb: 
wandb: Run summary:
wandb:   accuracy 0
wandb:      epoch 5
wandb:   f1_score 0
wandb:  precision 0
wandb:     recall 0
wandb: train_loss 0.47498
```

## What Do These Values Mean?

- **Accuracy** measures the proportion of correct predictions out of all predictions. For example, if your model correctly classified 500 images out of a total of 1000 images, your accuracy would be 500/1000 = 0.5 for 50%.
- **Recall**, also known as sensitivity or true positive rate, measures the proportion of correct positive predictions over the actual positive instances. For example, if your task is to classify images as either "cat" or "not a cat", and your model correctly identifies 500 cat images but also misidentifies 100 non-cat images as "cat", your recall would be 500/600 = 0.83 or 83%.
- **Epoch** refers to a complete cycle of training on a dataset. The number of epochs you train for determines how many times your model has seen the complete dataset and had the opportunity to adjust its parameters based on the error signals.
- **Precision** measures the proportion of correct positive predictions out of all predicted positives. Continuing with the animal classification example, if your model confidently predicts 600 images as "cat" but only 250 of those are actually cats, your precision would be 250/600 = 0.4167 or 41.67%.
- **F1 score** is a measure generally used in the field of binary classification problems. It is the harmonic mean of the precision and recall of the model, calculated as: F1 = 2 * (precision * recall) / (precision + recall). A high F1 score suggests that the model accurately identifies relevant CVs for a given job description (high precision) while capturing a large proportion of the relevant CVs (high recall).

## Initial Implementation (step by step)

Here's an overview of our process for implementing the model:

1. We started with a dataset containing pairs of CVs and job descriptions, labelled as matches or non-matches.
2. We used a pre-trained BERT model ('bert-base-uncased') and added a classification layer on top for our binary matching task.

```python
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
```

3. We tokenised the CV and job description pairs using BERT's tokeniser, with a maximum sequence length of 512 tokens.

```python
max_length = 512
tokeniser = BertTokeniser.from_pretrained('bert-base-uncased')
```

4. Our initial training process ran for 5 epochs, using AdamW optimiser with a learning rate of 2e-5. AdamW is an optimisation algorithm commonly used to train deep-learning models. It incorporates a technique called decoupled weight decay regularisation, which, in simpler words, "avoids our model getting too complicated." This means the BERT model can learn to match CVs and job descriptions accurately, without becoming too complex or specific to the training data.

```python
num_epochs = 5
optimiser = AdamW(model.parameters(), lr=2e-5)
```

## Initial Results

While our baseline model showed promising results, we identified several areas for improvement, particularly regarding some false positives—matches that were not necessarily accurate.

As shown in this example, we were looking for a Cassandra DBA while sending the profile of a Front-end Engineer. Although this candidate had some database experience, they lacked experience with Cassandra, yet we were getting a 38% match. This discrepancy indicated that something might be amiss.

As we can see, even though the Job description and the CV are not a potential match, our model is giving 38.6% which might not be accurate. Let's take a step back to understand how is our model doing the calculations, so we can think of ways to optimise it.

## How is the match calculated?

Our model calculates the match between a CV and a job description by outputting a probability score, from 0 to 1. A score closer to 1 means it thinks it's a great match, while a score closer to 0 means the opposite.

We use three main ways to check how well our matchmaker is doing:

- **Precision**: It's like checking how many times it correctly picks the right person for a job.
- **Recall**: It's like making sure we don't miss any good candidates.

By adjusting the threshold for what we consider a "match" (e.g., probability > 0.5), we can balance between precision and recall.

Experimenting with different thresholds will help you optimise your model. However in our code during training, the model is optimised using binary cross-entropy loss (BCEWithLogitsLoss). This doesn't involve a threshold directly, but what does this mean in simple terms?

Imagine teaching a computer to rate movies on a scale of 0 to 100:
- "Binary cross-entropy loss" is like a scoring system that measures how accurate the computer's ratings are compared to expert critics' ratings.
- We don't tell the computer "anything above 50 is a good movie" (that would be a threshold).

## Conclusion

As we look to the future, it's clear that the intersection of advanced NLP techniques and human resource management holds immense promise for creating more efficient, effective, and equitable hiring processes. CV-Job matching with BERT is just one example of how AI can transform traditional processes in HR and recruitment.

To understand the underlying technologies in more depth, explore our articles on:
- [BERT Language Models]({{ site.baseurl }}/explanations/bert-language-model/) - The powerful language understanding system that forms the foundation
- [Fine-Tuning Techniques]({{ site.baseurl }}/explanations/fine-tuning-techniques/) - The process of adapting pre-trained models for specific tasks
