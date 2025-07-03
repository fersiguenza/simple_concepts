---
title: "AWS Bedrock Cost Reduction Strategies"
author: "Fer Sigüenza"
authors:
  - name: "Fer Sigüenza"
    github: "fersiguenza"
date: 2025-07-03
category: "AWS"
tags: ["generative AI", "bedrock", "cost optimization", "serverless"]
---

## What is it?

AWS Bedrock cost reduction strategies are methods to optimize spending when using [Amazon's fully managed service for foundation models]({{ site.baseurl }}/explanations/aws-bedrock/) while maintaining performance and functionality.

## Simple Explanation

Imagine you're using a premium taxi service (AWS Bedrock) that gives you access to different luxury cars (AI models like Claude, Llama, etc.). These taxis charge by distance traveled and time used. Cost reduction strategies are like learning the best routes, choosing the right vehicle for each trip, and sharing rides when possible.

For AWS Bedrock, this means:

1. **Model selection**: Choosing the right AI model for your specific needs (smaller models for simpler tasks)
2. **Token optimization**: Making your prompts more efficient to use fewer "words" (tokens)
3. **Caching**: Storing common responses so you don't have to "take the taxi" for the same destination repeatedly
4. **Batching**: Grouping similar requests together instead of making separate API calls

## Key Strategies

- **Right-size your models**: Use smaller, cheaper models for simpler tasks
- **Prompt engineering**: Create efficient prompts that require fewer tokens
- **Implement caching**: Store frequent responses to avoid repeated model calls
- **Token windowing**: Process long documents in overlapping chunks instead of all at once
- **Request batching**: Combine multiple requests into a single API call

## Real Impact

A typical enterprise application might see cost reductions of 40-70% by implementing these strategies without sacrificing quality or user experience.

## Our Initial Approach: Self-Hosted LLM on EC2

We deployed our model on a AWS EC2 G5 instance, using the g5.xlarge instance type, incurring a monthly cost of approximately $160. To ensure a seamless connection between our model and various client applications, we developed a set of APIs in Python and connected them with custom Slackbots, Jira, and Visual Studio Code plugins. We achieved excellent performance, operating with 250-400 tokens and an average response time of 10 seconds.

Certainly, this approach wasn't without its challenges. The provisioning of an EC2 instance required meticulous configuration and setup to ensure compatibility with the machine learning model. This involved installing dependencies, CUDA libraries, and building APIs to facilitate seamless integration. Nevertheless, with the right security configurations, we maintained control over our data.

## Why Not Use AWS SageMaker Jumpstart?

With SageMaker infrastructure, you can provision resources for training a new model from scratch or choose from a variety of pre-built models available through Jumpstart, including those from HuggingFace. SageMaker also provides the flexibility to refine compatible models. While offering enhanced control over your ML projects, it does demand additional setup.

It's important to note that endpoint usage comes with associated charges. If you shut down a notebook on an instance without closing the instance, you'll still incur charges. Additionally, shutting down Studio notebooks won't delete supplementary resources created with Studio, such as SageMaker endpoints, Amazon EMR clusters, and Amazon S3 buckets. Therefore, exercising caution when using SageMaker is essential to avoid unexpected costs.

Our cost comparison between LLM on Amazon EC2 and Amazon SageMaker revealed nearly identical expenses, with no significant differences. Although setting up SageMaker Jumpstart was easier and faster, it requires careful management to prevent unnecessary costs. In contrast, using the LLM on EC2 is just as simple as stopping and restarting the instance, making it an equally convenient option with more control over costs and flexibility.

## Introducing AWS BedRock

Amazon BedRock is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies like AI 21 Labs, Anthropic, Cohere, Meta, Stability AI, and Amazon. This service comes with a single API, along with a broad set of capabilities needed to build generative AI applications, simplifying development while maintaining privacy and security.

It provides three distinct pricing models:
1. On-Demand
2. Provisioned Throughput
3. Model customisation (fine-tuning)

In this article, we delve deeper into the On-Demand model, where essentially AWS provides an API to consume different models without the need to provision any infrastructure. Charges are incurred solely based on demand for requests and the quantity of tokens used. AWS consistently expands its collection, currently boasting approximately ten different models.

## Our Serverless Approach with BedRock

In our quest to minimise cloud costs, we opted for a serverless API. We created a simple REST API using API Gateway and Lambda functions to consume BedRock and test the different models.

We created a lambda function with the boto3 client and by transforming the request payload into the right prompt depending on the model and setting up the parameters, we have a ready-to-go serverless API to invoke BedRock.

A few considerations:
- You might need to add a Lambda layer containing the latest Boto3 dependencies to support BedRock.
- You can use InvokeModelStream for a better user experience.
- If you decide to use Lambdas, keep in mind cold starts.

## Cost Comparison

When comparing the costs between our EC2-hosted LLM and BedRock, we found significant differences. While there was little variation between different models in BedRock, the cost difference compared to the LLM hosted on EC2 was substantial, with BedRock offering a more cost-effective solution for our needs.

## Final Thoughts

If you're seeking a solution to develop custom bots and plugins to optimize your business operations while maintaining data security and cost efficiency, BedRock is the perfect choice for you.

Stay tuned for our next post, where we'll delve into training and provisioned throughput over BedRock.

For a comprehensive overview of what AWS Bedrock is and how it works, see our article on [AWS Bedrock]({{ site.baseurl }}/explanations/aws-bedrock/).
