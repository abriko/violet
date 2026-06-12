---
title: "Building AI Into Observability Workflows:  Automating Dashboards, Alerts with MCP & Agents | Grafana"
source: https://www.youtube.com/watch?v=qipWEGaTWsg
author:
  - "[[3 - Areas/AIOps/wiki/entities/Grafana]]"
published: 2025-06-07
created: 2026-04-13
description: Grafana’s Yasir Ekinci takes us behind the scenes of building AI into observability workflows. Learn how LLMs, the MCP protocol, and multi-agent architectures power the new Grafana AI assistant—capabl
tags:
  - clippings
---
![](https://www.youtube.com/watch?v=qipWEGaTWsg)

Grafana’s Yasir Ekinci takes us behind the scenes of building AI into observability workflows. Learn how LLMs, the MCP protocol, and multi-agent architectures power the new Grafana AI assistant—capable of querying data, editing dashboards, and helping you reason about your systems.  
  
Chapters  
00:00 – Intro + Why AI in Grafana?  
01:36 – From Curve Fitting to ChatGPT  
02:20 – The Rise of Single-Call LLMs  
03:15 – Making LLMs Understand Grafana  
04:10 – Tool Calling + Private Context  
05:49 – Meet MCP: The USB-C of AI Tools  
06:43 – Grafana MCP in Action  
08:25 – Live Demo: Auto-Build Dashboards  
11:03 – Adding Latency Metrics with AI  
12:47 – What If AI Could Drive Grafana?  
14:22 – Why Observability Needs Agents  
16:12 – Agency: The LLM Superpower  
17:55 – How We Evaluate LLM Agents  
19:25 – Cutting Token Noise with Natural Output  
21:12 – Mocking Environments for Evals  
22:04 – From Monolithic Agent to Modular  
23:39 – Multi-Agent Coordination Strategy  
24:25 – What’s Next for Grafana AI  
  
Links:  
Learn about Grafana Assistant: https://grafana.com/blog/2025/05/07/llm-grafana-assistant/?src=yt&mdm=social&cnt=description  
  
Check out the LLM plugin documentation: https://grafana.com/docs/grafana-cloud/alerting-and-irm/machine-learning/llm/?src=yt&mdm=social&cnt=description  
  
☁️ Grafana Cloud is the easiest way to get started with Grafana dashboards, metrics, logs, and traces. Our forever-free tier includes access to 10k metrics, 50GB logs, 50GB traces and more. Sign up: https://grafana.com/get/?src=yt&mdm=social&cnt=description  
  
❓ Have a question that isn't related to this video? Check out the Official Grafana Community Forums: https://community.grafana.com/?src=yt&mdm=social&cnt=description  
  
\-----  
👍 If you found this video useful, be sure to give it a thumbs up and subscribe to our channel for more helpful Grafana videos.  
  
📱 Follow us for the latest and greatest on all things Grafana and our other OSS projects.  
  
X: (https://www.twitter.com/grafana)  
LinkedIn: (https://www.linkedin.com/company/grafana-labs/)  
Facebook: (https://www.facebook.com/grafana)  
  
#Grafana #Observability #AI #LLM #Automation #MCP #Agents

## Transcript

### Intro + Why AI in Grafana?

**0:00** · My name is Yasir Ekinci or Yas for short, and today I'm going to be talking about AI at Grafana. Now before I do, I should not forget my clicker, which is here. I'm going to need that.

**0:11** · But let's start. So before we start, we've got the QR code again.

**0:15** · So we'll be using Slido. If you want to ask any questions, you can scan the code, add your questions there, and we'll try to answer as much of them as we can at the end.

**0:23** · I will show this slide again at the end, so don't worry if you don't have it now.

**0:26** · You can also add your questions at the end as well. So very quickly about me, I'm Yas. I'm based in Belgium. This should be the Belgium flag, but it says BE which is the first two letters.

**0:38** · The other thing is I want to make the case for: stop calling French fries French fries, because they're actually fresh fries and you should give a shout out to the Belgians because that's where they're coming from. One person likes that.

**0:51** · And the last thing is I like to be under the sea as much as I like to be on the surface, which is why I live in Belgium. Best place to dive. Just kidding, that's me. Let's have a look at what we'll be talking about today.

**1:04** · In the next 25 minutes, I'm going to talk about how we're going from using AI just as a text response to actually getting things done in Grafana using AI.

**1:13** · And now yesterday we showed you a glimpse of this.

**1:15** · We showed you Grafana assistant, and it's like how we're thinking about building agentic LLMs straight into Grafana itself.

**1:22** · Today I want to talk a bit more about the journey of how we got there.

**1:26** · So let's go all the way back to the beginning.

**1:29** · It's 1800 BCE and Babylonian astronomers are trying to model the movement of the stars. And they did this by every day they looked at the stars and they wrote where the star was, I'm assuming, on some kind of stone tablet.

### From Curve Fitting to ChatGPT

**1:44** · And at some point they had a bunch of points on this stone tablet.

**1:48** · And then they tried to look at, okay, what if we fit something in between?

**1:51** · What if I draw a line in between and see where the start is going to be next?

**1:55** · And that was the first known instance of curve fitting.

**1:59** · Now this might have been a bit too far back, but if you fast forward a few thousand years and you add a bunch of NVIDIA GPUs, you gather data on all of humankind and finally do a metric ton more curve fitting. You get the ChatGPT moment, we get our first LLM.

**2:16** · And these LLMs have been super useful.

### The Rise of Single-Call LLMs

**2:20** · They gave developers a way to access the context of the internet, albeit like a static snapshot of it using natural language in a single API call. And that's super useful, because we can feed some predefined context and instructions to the LLM and get a natural answer back. And this enables some new experiences. For example, in Pyroscope, we can feed profile data to an LLM and get a human understandable explanation out. And because the LLMs, they have internet context, we can get recommendations based on the code, the methods, and even the open source libraries that are used in the profile.

**2:57** · So this really helps us accelerate the understanding.

**2:59** · It lowers the barriers to understanding profiles and that's single call LLMs. But LLMs, they only know what they've seen in training.

**3:09** · They don't know about your Grafana, they don't know about your dashboards, they don't know how to query data. Your Prometheus, your Loki.

### Making LLMs Understand Grafana

**3:18** · Well, I should say they didn't know until recently.

**3:22** · So let me talk about how we're making LLM speak Grafana, so that they can interact with your observability. Now imagine this, if you go to ChatGPT today and you ask which active incidents I have, obviously it won't be able to answer that.

**3:38** · It doesn't have access to your instance, it doesn't know about your alerts, your incidents, your dashboards and so on. Although if I'm honest, it's not going to stop it from trying to make up one sometimes, but that's just ChatGPT. But to go beyond this, tool calling was introduced. And tool calling, it gave developers a way to define a set of tools.

**4:00** · Like think about API calls, functions, custom actions and then give those tools to the LLM and give the LLM a choice to choose which tool it can use. If it deems its helpful to answer a question.

### Tool Calling + Private Context

**4:12** · And that's quite useful because it allows the LLM to do two things.

**4:15** · It allows it to go beyond internet context.

**4:18** · It can call APIs with private context, it can search a dashboard and get back that your private private context dashboard from your instance.

**4:26** · And also it can take actions that go beyond just the chat response.

**4:30** · You can create, for example, you can create a PR in your private repo.

**4:34** · You can trigger other actions and other systems.

**4:37** · And this was something that LLMs previously without tool calling couldn't do.

**4:41** · Now this all started relatively as a wild west.

**4:44** · It was very vendor specific for every kind of integration you needed to build it yourself in a custom way. If you wanted to add GitHub support or Slack support, you needed to do all of that from scratch. But very quickly, a new OSS project came out from Anthropic and they proposed the model context protocol standard or short for MCP.

**5:05** · And it was really designed to make it easier, to make it easier for AI to interact with your apps, with your data sources.

**5:12** · And you can kind of think of it like it's like USB-C for AI apps.

**5:16** · And it's really useful, because it simplifies the development and usage of these tools.

**5:21** · As a product owner, if I own Gmail or if I'm the product owner of Slack, now instead of having each developer define their own way of how to interact with Slack, Slack can actually own that interaction.

**5:33** · They can own the MCP server.

**5:35** · They can define this is how you interact with Slack, these are the actions that are available, these are the tools that are available in Slack.

**5:42** · The other thing as an app developer, if I'm developing an app that uses tools, now I don't need to build all of this myself. I can just use a Slack MCP, I can use the Gmail MCP and then I can just focus on the experience and rather than the implementation of the individual tools. And finally as a user, if you're using Cursor or cloud code or ChatGPT, you can bring these MCP servers to your MCP client.

### Meet MCP: The USB-C of AI Tools

**6:07** · And that means you can now just extend the capabilities of your local development experience, your local chat experience.

**6:14** · Now we were very early to adopt this. So very early on we were like, okay, this makes sense to us. We adopted it and we got a bit lucky OpenAI, I think a month after we open sourced this, OpenAI also decided to use MCP as a standard.

**6:28** · So that kind of solidified its position. And the Grafana MCP server, it's open source and it exposes the core parts of Grafana to LLMs. It really tells LLMs, this is how you can interact with the observability context. And you can do things like you can search and update dashboards, you can query data sources, you can manage incidents, find alerts that are firing and so much more. And this is just a start.

### Grafana MCP in Action

**6:53** · You can expect us to add much more coverage of all the other things that you can do in Grafana. But yeah, that's Grafana MCP.

**7:02** · So if we go back to the question at the start, this is now how it looks like: now when we ask that question for which active instance I have, the Grafana MCP server will signal to the LLM, like these are all the tools that are available.

**7:17** · Then the LLM can make a decision: okay, based on this question I'm going to choose the get incidents tool.

**7:22** · It can even set parameters like only give me the active incidents.

**7:26** · That goes to Grafana.

**7:27** · Grafana gives a list of incidents to the LLM and then the LLM can finally answer this question. And let me just show you very quickly how you can get started with MCP yourself. It's pretty straightforward.

**7:38** · You can install the binary or you can use our prebuilt docker image to set up the MCP server. Then you just configure the MCP client, whether that's Cursor, Claude Code or anything else to use Grafana MCP.

**7:52** · And then you just point at your instance with a token and you're good to go.

**7:56** · And you can see that MCP servers like your clients, sorry, will discover what they can do.

**8:01** · They will discover here are all the tools available to me.

**8:04** · And you can even do stuff like you can stack multiple MCP servers and let them work together. For example, you could have the Grafana server together with the GitHub MCP server.

**8:14** · But we can do more than just answer simple questions.

**8:18** · So let me show you a demo of how you can use the Grafana MCP server to actually make changes using observability. So if we can swap back to my screen, what we have here is just to give you an idea, I have a simple Node app, it says hello world and randomly it will error out just to make it a bit more interesting. It is exporting a bunch of metrics here, just basic ones and the HTTP requests.

### Live Demo: Auto-Build Dashboards

**8:43** · I have a Prometheus instance and I have a Grafana instance that has nothing in it. And just to show you, this is hooked up to the Grafana MCP server. So again, you can see all of the tools that we have there. So if I go back, what I want to do first is I'm going to pull up the Cursor agent.

**9:00** · I'm going to try to see if this make this a bit bigger. And I'm going to ask it, okay, based on, can you create a dashboard based on the metrics in this code? There's nothing like custom going on here, by the way.

**9:15** · There's nothing, no custom Cursor rules or anything.

**9:18** · This is all just like I took Cursor, I just hooked it up to the MCP and then just trying to see what it does.

**9:24** · So you can see it searches like, okay, what data sources do I have?

**9:28** · Is there a dashboard already available?

**9:30** · You can see it's listing out certain Prometheus metrics to see what metrics are available and what values do they have. And then finally it goes, okay, I've got something. Do you want me to create the dashboard? And I'm like, okay, go ahead.

**9:45** · And hopefully fingers crossed that will and should create the dashboard.

**9:50** · This might take a while depending on internet, depending on if Anthropic is happy. Okay, so it says it used the update dashboard tool and it says your Grafana dashboard has been created. So if I refresh this, I get a dashboard fully created based on my code.

**10:11** · Thank you. Okay, so now this dashboard is looking good, but I'm missing latency metrics.

**10:18** · So I'm going to ask it to actually add latency metrics to my code and then also add it to the dashboard. So I can just ask like, can you add latency metrics to this?

**10:30** · Let's see. Now what it should be doing now is that it's going to go, okay, well actually there is no latency metric in your code. So it's going to go, I need to do this. Sometimes I need to confirm its action.

**10:42** · And so it came up with a plan and now it needs confirmation.

**10:46** · So I'm just going to say, yeah, add it to the code.

**10:51** · And that should create a code change that allows, adds the metric to it.

**10:56** · My app is hot reloading. So as the code changes, so it's now going to the index file, it's making a change. And if my app has hot reloaded, I can refresh this and you can see now I have a new metric. Cool.

### Adding Latency Metrics with AI

**11:11** · Now I can actually ask, okay, can you also add it to the dashboard?

**11:16** · And the nice thing about LLMs is it's smart enough to know when I say "that dashboard", it's referring to the dashboard we just created before.

**11:24** · So now that should, using the change that we just did, it's going to update the dashboard. And if I go back, refresh this and we have a latency metric, I can maybe zoom this in a bit. And there we go.

**11:41** · That's making changes with observability.

**11:44** · So let's go back to the slides.

**11:54** · Let's go back to the slides please. There we go.

**11:58** · So I just showed you how we're making LLMs speak Grafana and bringing Grafana context to your environment, whether that's your IDE your CLI, your chat client and so on.

**12:09** · And they can be quite powerful because having the knowledge of your code making changes to your code, but then also being able to use that to make changes to your observability can really help both speed up our development and also make our observability better as well. But what if we could take one more step beyond this?

**12:26** · We did a single call LLM, I talked about the tool calling LLM, but what if we could do one step more and actually have LLMs actually drive Grafana? What happens if an LLM can use Grafana in the same way that we do?

**12:39** · In the same way we can navigate and go places, we can run queries, we can edit dashboards, make changes and even more. And ultimately have something that can assist you in your observability workflows, but also solve a bit more complex tasks on your behalf.

### What If AI Could Drive Grafana?

**12:57** · So let's talk about it. Let's explore that.

**12:59** · Let's talk about what agents are and how we're building agents that can drive Grafana. But before I do, why do we actually want to do this?

**13:08** · Why do we need something that can drive Grafana?

**13:11** · And really it's about observability.

**13:13** · Observability is about understanding and operating complex systems, and it's not easy. It takes a lot of time, it takes a lot of effort and takes a lot of knowledge to do this.

**13:23** · Think about how many people that have never even used Grafana before or the amount of people that have never created a dashboard, the amount of people that don't know about the Prometheus query language or even people that have just joined your team and they don't know about your system or your expertise. And there are a lot of other solutions that are trying to solve this question, this problem in a different way.

**13:48** · But LLMs have one trick up their sleeve, which is natural interaction.

**13:52** · Natural language interaction.

**13:54** · And the natural interaction is a key part because language, when you think about it, it's how you think. It's how you express our thoughts, how you express what you want to do.

**14:05** · So imagine we have a box where we can just ask anything about your system and actually get things done in Grafana, for example, you can ask it, how can I get started with SLOs, who's on call today?

**14:16** · You can add something to your dashboard or even you can ask what's wrong with my system?

### Why Observability Needs Agents

**14:22** · This gives you a way to naturally interact with Grafana, but just hooking up this box with a tool calling LLM, it's not enough and it's not enough because well, observability is hard.

**14:34** · Observability questions are hard to answer because everybody's using a different way. Everybody has a different Grafana setup. Some people have logs, some people don't have logs, some people have dashboards set up already.

**14:46** · Some people are just starting out. And some of these questions, they take multiple steps. Think about when you're trying to debug a problem, how many steps you're taking to actually solve that question.

**14:57** · So doing this in a simple click is not straightforward.

**15:00** · So we need something that can solve complex multi-step tasks.

**15:05** · The other thing is: LLMs, like I said, they know about the internet, they can handle general questions about the internet.

**15:12** · And Grafana is open source. So it can actually handle things about Grafana, general questions about Grafana, but it doesn't know about your context. And being able to solve these tasks means we need to be able to find relevant Grafana context for every question. What Grafana context do we need?

**15:31** · And this is not as simple as a simple search because you can have so much things in Grafana, you can have so many thousands of dashboards.

**15:38** · If you think about metrics, you can have millions of series and finding the ones that are actually relevant to the question, that in itself is also a hard problem. And then finally, this is an open text box, so people can put anything they want in this box.

**15:52** · This essentially means you have infinite variety, you need to be able to handle any question in any way.

**15:58** · And also there's no single standard way that people use Grafana.

**16:02** · So whatever we build, we need to make sure that it needs to be fully dynamic and practically it needs to be general purpose. It needs to be able to adapt to every environment. So to solve this, we need to give our LLM one more trick and it's agency.

### Agency: The LLM Superpower

**16:21** · Agency to decide what to do, which tool to call in, what order, and also adapt as more information comes in.

**16:30** · And this is the promise of LLM agents: based on a task that you give them, the LLM can then take an action, for example, it can query a data source, then get feedback from its environment, for example, get the results of that query, and then based on those results, it can decide what to do next. If it can answer the question, cool, it can stop there, answer the question case done.

**16:53** · But sometimes it needs to do more. It maybe might also need to go to your logs.

**16:57** · So you can then decide, actually I need to call another tool again and stay in this action feedback loop until it has everything it needs to solve your task. This is quite cool because essentially it's like allowing it to come up with a new recipe for every single request.

**17:13** · And that means also we can handle that massive infinite variety of questions we need to handle.

**17:20** · So we wanted to see how this would play out in the Grafana world.

**17:23** · And it really all started with hackathon. We spent a week, we combined this concept of the LLM agent.

**17:29** · We combined it with all of the tools that we built, like I've shown you with MCP and also we used our years of experience to put all of the instructions on how to actually use Grafana into this agent.

**17:39** · And all of this resulted in a really impressive demo and it was built in a single week. But making these agents really reliable and effective, it does come with some significant challenges.

**17:50** · So I just want to show you two of these things in particular and how we're tackling them. The first main question is, is it any good?

### How We Evaluate LLM Agents

**17:58** · Now in ML, you never have binary, it's yes or no answers to this question.

**18:03** · It's more about how good is it actually, is it good?

**18:06** · Nine times out of 10 is a good one, time out of 10. So to figure this out, we need to start with evals. We need to test this thing and we have vibe coding, so we could also obviously do vibe testing as well and just test the agent manually with some random inputs and see what we get.

**18:21** · And basically if it looks good enough, take that at face value.

**18:25** · But this only gets you so far. If you want to iterate on this with confidence, we need to make sure that we can reproduce and test these LLMs with what we call evaluations or evals for short.

**18:37** · And let me show you an example of some of these iterations. So the first one is we started with just checking, okay, we have these tools, but are these tools being used as we expect them to be by LLMs?

**18:48** · And we found that sometimes it can fail in interesting ways. So for example, here we are asking the LLM show me some logs. So what I expected to do is like, okay, it should find the data sources that have to do with logs.

**18:59** · In our case Loki. So even though it's calling the data sources tool, it's not adding the type filter. Now the benefit of these reproducible tests, is we can run them, we can change the instructions, we can update things and actually fix it, and then we can run the test again and everything passes that way.

**19:15** · The other thing we can do is we're optimizing for lower cost and latency.

**19:20** · These tools, they can generate a lot of large outputs and consume a lot of tokens. So we're trying to see: what can we do about this?

### Cutting Token Noise with Natural Output

**19:28** · And we try to reduce this by what I'll call reducing token noise. And let me explain that because if you think about APIs, APIs respond typically in a structured format.

**19:42** · They'll use things like JSON and that's really great if you're building systems that interact through code. But when you're interacting with LLMs, they're optimized for natural language. So all of these things that JSON adds, like all of these symbols, they just A) add tokens, they add noise.

**19:57** · And also if you think about it, there's no semantic explanation of what's going on in that output.

**20:04** · So we found that by turning this output into something that's more natural, as you can see in this example, we can do two things.

**20:12** · One is we can both optimize cost and latency. This example, we're using four times less tokens. So that really makes a dent. Obviously, less tokens also means less processing and less latency.

**20:24** · But finally we also found that it actually improves the quality of the outputs because it's semantically easier for the LLM to parse something that's more natural than something that's built for interacting with code.

**20:38** · And then finally, if we bring it all together, we also observe and test the entire end-to-end flow. We do this, we have some reproducible scenarios and expectations that we set up and then we just mock and we have a controlled environment essentially where we control Grafana, control the responses that it can get from the data sources where it is.

**20:59** · And that's quite cool that we can mock the environment. We don't mock the LLM, you still need to test with real LLMs, you still need to get them to actually run these completions.

**21:08** · But we control the environment where we can test them in so that we can reproduce them. And these tests, we can run them on multiple levels.

### Mocking Environments for Evals

**21:15** · We can run them fully end to end like the whole agent.

**21:18** · We can call up the whole agent, we can run them at the individual tool level and even in what I'll call sub agents, which I'm going to talk about in the next section.

**21:27** · So that was evals. Let's talk about the agent, or maybe I should say agents. Agent architectures, they're still relatively new and there's many, many different approaches popping up of how you can set up these architectures.

**21:42** · For us, the main driving force has been around how do we make this a bit more modular?

**21:47** · How do we make it extensible?

**21:48** · Because Grafana has so much new features popping up, Grafana itself changes and evolves over time.

**21:55** · And there's new things like new features, new data sources that are being added every month.

**22:00** · So how can we make something that's a bit more accessible? We started with a single agent, a single general purpose agent.

### From Monolithic Agent to Modular

**22:07** · We gave it a lot of instructions to give you an idea.

**22:10** · I think one of those first situations, we're talking about more than 10,000 tokens in a system prompt that's like 40 pages worth of instructions.

**22:18** · And obviously anytime you change something in those 40 pages and you try to iterate on it, it's really hard to debug because it can fix one flow, but it can break 10 other flows. And that's where those evals come in as well.

**22:31** · The other thing is we give it all of the tools. We started with one, then 10, then 20, then 30.

**22:36** · But you can see as we scale up the number of tools that we give to the LLM, it's also going to get a bit more confusing for the LLM to choose the right tool for the answer that it needs to give. And we have a single conversation history.

**22:50** · So everything that you ask about it just keeps getting added to the history.

**22:54** · And that also means all of those tokens need to be carried to the next and the next message in the prompt.

**23:02** · So to kind of get around this, we thought, okay, out instead of having one big agent, we have multiple smaller agents, we try different approaches. We landed on this approach, which is the multi-agent with delegation.

**23:14** · And this kind of means we have a single coordinator agent that has a much smaller system prompt, and that's the one that the user interacts with.

**23:21** · And then for every task, the coordinator agent can then decide, oh, somebody's asking about, they have a support question about how can I add a certain data source? Cool, I'll pass that to the support agent. Then a support agent can go, it has this support specific tools, it can search the docs, gets an answer and then gets back. And same if you ask about dashboards, it can use the dashboard agent to edit, modify, update your dashboard.

### Multi-Agent Coordination Strategy

**23:45** · And the nice thing is now it's a bit more modular.

**23:48** · All of these agents individually are smaller.

**23:51** · The conversation threads happen separately. So anything that support agent does, it still stays in only that thread and not in the main conversation.

**23:59** · And it's a bit more modular, so it's easier to expand.

**24:02** · There's only one downside: it's that there is some overhead.

**24:05** · Every time the coordinator has to hand off or route to another expert, that means it needs to pass a task and also at the end it needs to get back an answer. So that does add a bit of overhead and we're still working on how can we optimize that a bit further as well. I'm aware of time, so I'm just going to very quickly skip the recap, but this is what we did.

### What’s Next for Grafana AI

**24:25** · Quick actions, quick assist, MCP, go try it out.

**24:29** · You can also build your own stuff on top of MCP. Go do that, give us feedback.

**24:33** · And then finally, the agent, if you're interested, you can sign up for the private preview very briefly, on some things that are coming.

**24:42** · So MCP obviously one of the first things is how can we expand that more?

**24:45** · How can we have more tools? On the agent side, one thing is about finding things in Grafana.

**24:52** · So we are thinking of how can we use Grafana, knowledge graphs to help the agent find things inside of Grafana.

**24:58** · You can expect more specialized observability agents, things that also will help you with your alerts. And finally, we talked about evals.

**25:06** · I'll be happy to say we are thinking of how can we also open this up, help open up some of these evals, especially for things like query generation and have both the community contribute to that as well.