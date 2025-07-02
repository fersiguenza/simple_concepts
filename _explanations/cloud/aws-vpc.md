---
title: "AWS VPC: Virtual Private Cloud Explained"
author: "Fernando Sigüenza"
date: 2025-07-02
category: "Cloud"
tags: ["aws", "networking", "vpc", "cloud-infrastructure"]
---

## What is it?

A Virtual Private Cloud (VPC) is your own isolated section of the AWS cloud where you can launch resources in a defined virtual network.

## Simple Explanation

Think of a VPC as your own private data center within AWS. Just like a physical data center has rooms, security, and rules about who can enter and exit, a VPC has similar concepts:

- **Subnets**: These are like rooms in your data center. Some rooms (public subnets) have doors to the outside world, while others (private subnets) are internal only.

- **Internet Gateway**: This is the main door to your building. It allows resources in your public subnets to connect to the internet, and for the internet to reach them.

- **Route Tables**: These are like signposts that tell traffic where to go. They determine whether traffic goes to the internet, stays within the VPC, or goes elsewhere.

- **Network ACLs and Security Groups**: These are like security guards. They decide which traffic is allowed in or out based on rules you set.

## Example

A common VPC setup has:
- Public subnets for web servers that need internet access
- Private subnets for databases that should only be accessible from within your network

```
┌────────────────────────────────────────┐
│ VPC (10.0.0.0/16)                      │
│                                        │
│  ┌─────────────┐    ┌─────────────┐    │
│  │Public Subnet│    │Private      │    │
│  │(10.0.1.0/24)│    │Subnet       │    │
│  │             │    │(10.0.2.0/24)│    │
│  │ ┌─────────┐ │    │ ┌─────────┐ │    │
│  │ │Web Server│ │    │ │Database │ │    │
│  │ └─────────┘ │    │ └─────────┘ │    │
│  └──────┬──────┘    └─────────────┘    │
│         │                              │
└─────────┼──────────────────────────────┘
          │
    ┌─────┴────┐
    │Internet  │
    │Gateway   │
    └──────────┘
          │
          ▼
      Internet
```

## Why it matters

VPCs provide network isolation and security for your cloud resources. They let you:
- Control network traffic with precise rules
- Isolate sensitive systems from the internet
- Connect your cloud resources to your on-premises network
- Create multi-tier applications with different security requirements

## Related concepts

- [Subnets](/explanations/cloud/subnets.md)
- [Security Groups](/explanations/cloud/security-groups.md)
- [Network ACLs](/explanations/cloud/network-acls.md)
