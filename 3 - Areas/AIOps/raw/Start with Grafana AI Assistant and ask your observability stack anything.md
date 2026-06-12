---
title: Start with Grafana AI Assistant and ask your observability stack anything
source: https://www.youtube.com/watch?v=JrXGSw2rU0A
author:
  - "[[3 - Areas/AIOps/wiki/entities/Grafana]]"
published: 2026-04-09
created: 2026-04-13
description: Ask a question, get a system-wide answer. Grafana Assistant maps your architecture, builds service diagrams, and runs queries behind the scenes, so you can troubleshoot faster without writing complex
tags:
  - clippings
---
![](https://www.youtube.com/watch?v=JrXGSw2rU0A)

Ask a question, get a system-wide answer. Grafana Assistant maps your architecture, builds service diagrams, and runs queries behind the scenes, so you can troubleshoot faster without writing complex code or hunting through dashboards.  
  
Links/resources:  
Learn about AI at Grafana: https://grafana.com/products/cloud/ai-tools-for-observability/  
Get started with Grafana Assistant: https://grafana.com/docs/grafana-cloud/machine-learning/assistant/get-started/  
Get started with the Grafana Cloud forever-free tier: https://grafana.com/g/cloud  
Have a question? Ask Grot, your AI helper: https://grafana.com/grot/  
Reach out in our community forums: https://gra.fan/communityyf  
  
\---  
Thanks for watching!  
  
👍 Was this video helpful? Like and subscribe to our channel for more videos.  
  
Connect with Grafana Labs:  
X: (https://www.twitter.com/grafana)  
LinkedIn: (https://www.linkedin.com/company/grafana-labs/)  
Facebook: (https://www.facebook.com/grafana)  
  
#Grafana #Observability #ai #aihelp

## Transcript

**0:00** · \[music\] \[music\] I'm going to just say starting off a simple question that will work. You can use this in your instance today. Build me a service diagram of what services we have and how does data flow between them? Basically, this is what this is going to do is you can see it here doing some thinking. It's going to try to understand what services we have in this instance.

**0:25** · \[music\] And so while it's doing that, I'm going to show you a couple things that are happening in the background. You actually saw here it did this retrieve infrastructure memory step. \[music\] And so something that is really cool, again, while this is working in the sidebar, if I go over to here, something that we have built in order to be able to make this Grafana Assistant even stronger is the ability to basically build a knowledge base of your systems before you even ask a query. So you can see here it retrieved infrastructure memory and weekly on a cadence we have it run this basically crawl the infrastructure.

**1:04** · And then the Grafana Assistant stores in a database important context to know so that when I say build me a service diagram, it already knows, for example, this is our application, these are the regions that it runs in, it's a Kubernetes environment, here are the services that exist. So it already knew this before I even asked the question.

**1:25** · So now by the time it builds us the service diagram, it can show us exactly how our system works, all the things that it's connected to, and basically how to get to build the entire sort of like tree of searchable space for any future queries that I might ask it.

**1:43** · And an example of one of those future queries is I could say, which service is using the most CPU?

**1:51** · Again, and another way to think about this is now imagine that I asked you to answer this question of your applications that you work on, which service is using the most CPU, you would probably have to go find a dashboard, you'd probably have to go maybe write a query in the explorer panel, something like that. Again, this is something that I can ask this and rather than me have to go click around and find the dashboard that contains this information, I can just ask this and I can talk to you on this call. If I was in in my actual sort of day-to-day work, I'd probably be going to check Slack or Teams, figure out what's going on while it's doing all of this. And we can actually look into what's happening here. So it knows that this is a question that it should ask of Prometheus.

**2:40** · Um here it's if we actually uncollapse some of these, we can actually see, oops, sorry, I scrolled \[music\] a little too far there. We can actually see some of the queries that it's making to answer this question. So here top 10 CPU services, it's pulling up what the ranking is. And so again, it doesn't show you all this information by default it hides this, but if you do want to see what's going on behind the scenes, you can jump in here and you can see, for example, some of the queries that it's actually making in order to to answer this question. Um so give it another second here to do some queries. If you are familiar with the knowledge graph and you have the knowledge graph set up in Grafana, it can also leverage the knowledge graph under the hood. If you don't know what that is, that's another talk for another day. But here we go, we finally get an answer back that's telling us that our yes, our front end our Kafka is what's using the most CPU here. Yeah, and so this is a good example of again, it made seven queries here to answer this question. \[music\] And I would imagine that if I asked you to write a query to answer this, even our foremost kind of PromQL experts here, I would suspect that if you had to write this query just straight from memory, it's very likely that you would forget an asterisk or forget a curly brace or not close your parentheses, something like that. And so this is a good example of how you can turn a natural language query into an actual result that answers the question that you're trying to look for.