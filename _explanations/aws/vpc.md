---
title: "AWS VPC: Virtual Private Cloud"
author: "Fer Sigüenza"
authors:
  - name: "Fer Sigüenza"
    github: "fersiguenza"
date: 2025-07-03
category: "AWS"
tags: ["networking", "vpc", "cloud-infrastructure", "security"]
---

## What is it?

A Virtual Private Cloud (VPC) is your own isolated section of the AWS cloud where you can launch resources in a defined virtual network with complete control over IP addressing, routing, and security.

## Simple Explanation

Think of a VPC as your own private data center within AWS. Just like a physical data center has rooms, security, and rules about who can enter and exit, a VPC has similar concepts:

- **Subnets**: These are like rooms in your data center. Some rooms (public subnets) have doors to the outside world, while others (private subnets) are internal only.

- **Internet Gateway**: This is the main door to your building. It allows resources in your public subnets to connect to the internet, and for the internet to reach them.

- **Route Tables**: These are like signposts that tell traffic where to go. They determine whether traffic goes to the internet, stays within the VPC, or goes elsewhere.

- **Network ACLs and Security Groups**: These are like security guards. They decide which traffic is allowed in or out based on rules you set.

## Key Benefits

1. **Security**: Isolate your resources and control traffic with multiple security layers
2. **Control**: Define your own network architecture and IP address ranges
3. **Customization**: Configure routing to direct traffic exactly where you want it
4. **Connectivity options**: Connect to your on-premises network or other VPCs
5. **Resource organization**: Group related resources together by function or security requirements

## Common Use Cases

- **Web Applications**: Public-facing servers in public subnets, databases in private subnets
- **Corporate Networks**: Extension of your on-premises network into the cloud
- **Regulated Workloads**: Isolated environments for compliance requirements
- **Private Subnet**: No direct internet access (like secure office areas)

```
VPC CIDR: 10.0.0.0/16
Public Subnet: 10.0.1.0/24
Private Subnet: 10.0.2.0/24
```

### Internet Gateway
Like the main entrance to our building. It allows traffic to flow between your VPC and the internet.

```
# Route table for public subnet
Destination    Target
10.0.0.0/16    local
0.0.0.0/0      internet-gateway-id
```

### Route Tables
Like building directories that tell people which way to go. They control where network traffic is directed.

### Network ACLs (NACLs)
Like security guards checking IDs at each floor. They are stateless firewalls that control traffic at the subnet level.

```
# Example NACL rule
Rule #  Type       Protocol  Port Range  Source     Allow/Deny
100     HTTP       TCP       80          0.0.0.0/0  ALLOW
```

### Security Groups
Like keycards that only open specific doors. They control traffic at the instance level and are stateful (return traffic is automatically allowed).

```
# Example Security Group rule
Type     Protocol  Port Range  Source
SSH      TCP       22          10.0.0.0/16
HTTP     TCP       80          0.0.0.0/0
```

## Example Architecture

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

## Traffic Flow Example

When you access an EC2 instance from the internet:

1. Traffic arrives at the Internet Gateway
2. Route Table directs traffic to the correct subnet
3. NACL checks if the traffic is allowed into the subnet
4. Security Group checks if the traffic is allowed to the instance

## Why it matters

VPCs provide network isolation and security for your cloud resources. They let you:
- Control network traffic with precise rules
- Isolate sensitive systems from the internet
- Connect your cloud resources to your on-premises network
- Create multi-tier applications with different security requirements
- Comply with security and regulatory requirements

## Related concepts

- [AWS Private Subnets](/explanations/aws/private-subnets.md)
- [Security Groups](/explanations/aws/security-groups.md)
- [Network ACLs](/explanations/aws/network-acls.md)
- [Network Security Best Practices](/explanations/security/network-security.md)
- [Load Balancing in AWS](/explanations/aws/load-balancing.md)
