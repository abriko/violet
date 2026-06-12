---
title: "Now what? Kubernetes troubleshooting with AI?"
source: "https://www.cncf.io/blog/2024/07/11/now-what-kubernetes-troubleshooting-with-ai/"
author:
  - "[[Jessie]]"
published: 2024-07-11
created: 2026-04-14
description: "Ambassador post originally published on Medium by Emin Alemdar We all know that Kubernetes troubleshooting is difficult and it can get pretty complex from time…"
tags:
  - "clippings"
---
*Ambassador post originally published on [Medium](https://eminalemdar.medium.com/) by Emin Alemdar*

We all know that Kubernetes troubleshooting is difficult and it can get pretty complex from time to time. We can easily get lost in the logs, jumping between pods, searching through events and what have you. Most importantly, finding a meaningful explanation can be an extremely huge problem because not all of the logs are easily understandable. We also have to accept that it is time consuming. Of course we can use an external observability tool or even an observability stack with all of the components but still not all of the outputs are easy to understand and even read. At the end of the day, diagnose times and of course the troubleshooting times are extending drastically as a result.

But let’s talk about the elephant in the room here. Can AI help us here? Especially for Kubernetes troubleshooting. Because we started using **AI** and mostly **LLMs** everyday not just in our jobs but in our daily activities as well. There are of course some **AIOps** tools out there that help us implement the observability solution with the help of AI but almost all of those tools consume huge amounts of GPU resources and that increases the underlying cost and of course the maintainability issue here.

So, in this blog post, I want to introduce a **CNCF Sandbox** project to you which is a really powerful tool designed to simplify Kubernetes management using AI and natural language processing. The project is called **K8sGPT** and K8sGPT is a tool for scanning your Kubernetes clusters, diagnosing and triaging issues in simple English. So basically, K8sGPT integrates with various AI backends, including OpenAI, Azure OpenAI, and Amazon Bedrock, to provide clear and actionable insights into your Kubernetes environment and it provides these insights in a user friendly format.

![K8SGPT Kubernetes Superpowers](https://www.cncf.io/wp-content/uploads/2024/07/image-10.png)

K8SGPT Kubernetes Superpowers

## Key Features of K8sGPT

Before sharing some examples of K8sGPT usage, I want to share some specific key features of it. Let’s break them down into bullet points.

- **Workload Health Analysis**

Of course we should start with this because that is one of the most important reasons this tool is here. K8sGPT scans your Kubernetes clusters to identify critical issues affecting your workloads. It transforms complex diagnostic data and logs into simple, understandable suggestions, making it easier to maintain cluster health. Yes, K8sGPT also provides suggestions for the problems it detects in the cluster.

- **AI-Powered Diagnostics**

This one is obvious. K8sGPT leverages AI and LLMs. K8sGPT provides detailed explanations of detected issues in plain English. This feature is powered by integrations with leading AI platforms like OpenAI. Basically, by using these AI platforms, K8sGPT transforms the diagnostic data into a very human friendly format.

- **Built-in and Custom Analysers**

K8sGPT includes several built-in analyzers for various Kubernetes resources, such as Pods, Services, and Nodes. But of course with additional integrations, you can also create custom analysers to meet specific needs. K8sGPT has integrations with AWS, Prometheus, KEDA and Trivy. With these native integrations, you can have more detailed analysis. Of course I believe this list is going to be extended and more integrations will be added here in the future.

- **Continuous Monitoring and Integration**

You can also deploy K8sGPT as a Kubernetes Operator within a Kubernetes cluster. K8sGPT can continuously monitor the environment and integrate seamlessly with existing tools like Prometheus and Alertmanager in the cluster. You can see the components that the K8sGPT Operator instals and manages from the diagram below.

![Diagram flow showing K8sGPT as a Kubernetes Operator within a Kubernetes cluster](https://www.cncf.io/wp-content/uploads/2024/07/image-11.jpg)

Diagram flow showing K8sGPT as a Kubernetes Operator within a Kubernetes cluster

- **Security CVE Review**

With the Trivy integration, K8sGPT helps in identifying and addressing security vulnerabilities within your Kubernetes clusters. Once you activate the Trivy integration, Trivy Kubernetes Operator will be installed into the Kubernetes cluster and make it possible for K8sGPT to interact with the results of the Operator.

I also want to specifically talk about the **AWS** integration here. I’m pretty sure you’re already familiar with the **AWS Controllers for Kubernetes (ACK)** project but if not, I also have a blog post about that and you can check that out from [here](https://medium.com/@eminalemdar/manage-your-aws-resources-from-kubernetes-with-ack-3cf06a4b0770). In short, ACK allows you to manage AWS services from your Kubernetes clusters with CRDs. This integration also helps K8sGPT to interact with the AWS resources managed by ACK. As a result, you can use K8sGPT to analyse and manage not only your Kubernetes resources but also your AWS resources that are under the management of ACK.

## Let’s play with K8sGPT

Installation of K8sGPT CLI is extremely easy and you can use popular packet managers like Brew to install it on your machine. After the installation, you will need to authenticate with your chosen AI provider. I’m using OpenAI here with GPT4 but you can of course choose the appropriate one for you:

```
k8sgpt auth list
Default:
> openai
Active:
> openai
Unused:
> localai
> azureopenai
> cohere
> amazonbedrock
> amazonsagemaker
> google
> noopai
> huggingface
> googlevertexai
> oci
```

You can use `k8sgpt auth add` command to add the provider backend authentication.

After this step, it’s pretty straightforward actually. Let’s start the first analysis with the `k8sgpt analyse` command. But before running the command let me just deploy a broken Pod to see the actual diagnosis part.

```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
name: broken-pod
namespace: default
spec:
containers:
- name: broken-pod
image: nginx:1.a.b.c
livenessProbe:
httpGet:
path: /
port: 81
initialDelaySeconds: 3
periodSeconds: 3
EOF
```

As you can see the image part of this Pod definition is wrong. So let me run the `k8sgpt analyse` command and see the output.

![code example](https://www.cncf.io/wp-content/uploads/2024/07/image-11-1.jpg)

code example

We can see the error but not in detail but there is a flag for us to use here. If we add the `k8sgpt analyse --explain` flag here, K8sGPT will connect to the AI provider and LLM here.

![code example](https://www.cncf.io/wp-content/uploads/2024/07/image-11-2.jpg)

code example

So now we have some more details about the issue and also some recommendations as well. I know this is a very basic example but let’s extend this. I will now enable two integrations, AWS and Trivy. If we look at the filters we can use now, we see the added filters coming from the integrations.

![code example](https://www.cncf.io/wp-content/uploads/2024/07/image-11.png)

code example

Let’s start with the EKS filter and see if there’s anything wrong with that.

![code example](https://www.cncf.io/wp-content/uploads/2024/07/image-12.png)

code example

Brilliant! No problems here but let’s see the results of the Vulnerability Report from Trivy.

![code example](https://www.cncf.io/wp-content/uploads/2024/07/image-13.jpg)

code example

Wow! That’s a lot! Let’s dive in to understand some of these issues.

![code example](https://www.cncf.io/wp-content/uploads/2024/07/image-13-1.jpg)

code example

![code example](https://www.cncf.io/wp-content/uploads/2024/07/image-13-2.jpg)

code example

As you can see from the screenshots, We have very detailed information about each issue and again some really good recommendations on how to solve the problems.

Let me also deploy some other resources to the cluster and see the information about those.

![code example](https://www.cncf.io/wp-content/uploads/2024/07/image-13-3.jpg)

code example

As you can see from the broken resources, I now have a very good understanding of what is really happening in my cluster here.

Some final words here. Of course we all have some questions around security of these AI backends but there is also another option here called anonymise which basically anonymise the data before sending it to the AI backend.

## Conclusion

In the future K8sGPT might turn into one of the tools that’s going to transform Kubernetes management, problem diagnosis and of course troubleshooting by making it more accessible and efficient. Whether you’re an SRE, DevOps Engineer or Platform Engineer, K8sGPT can help you reduce troubleshooting times. It is extremely easy to get started with K8sGPT, you can just install it on your Kubernetes environment or on your local machine, authenticate with your chosen AI backend, and connect it to your cluster. In my opinion, you should definitely give K8sGPT a try.