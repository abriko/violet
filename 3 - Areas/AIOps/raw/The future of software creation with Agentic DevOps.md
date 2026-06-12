---
title: "The future of software creation with Agentic DevOps"
source: "https://www.youtube.com/watch?v=4HqusF5gAh4"
author:
  - "[[Microsoft Reactor]]"
published: 2026-01-28
created: 2026-04-21
description: "Picture a DevOps workflow where GitHub Copilot and AI agents work together to streamline every step of SDLC, from planning to deployment. In this forward-looking demo session, see how teams build inte"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=4HqusF5gAh4)

Picture a DevOps workflow where GitHub Copilot and AI agents work together to streamline every step of SDLC, from planning to deployment. In this forward-looking demo session, see how teams build intelligent, multi-agent workflows using tools and agents that adapt to your style and flow.  
  
Experience the next generation of DevOps: faster delivery, less manual work, and smarter collaboration. Get inspired by what’s possible and find practical ideas you can start exploring today.  
  
📖 Explore the Learn Path- https://aka.ms/ADOL/appdev-GitHub  
📌 This session is a part of a series! Learn more here - https://aka.ms/AgenticDevOpsLive  
  
Chapters:  
0:09 — Session Welcome & Introduction  
0:16 — Producer Introduction (Anna)  
0:27 — Code of Conduct & Housekeeping  
0:45 — Chat & Links Overview  
0:52 — Recording & On‑Demand Info  
0:57 — Speaker Introduction  
1:04 — Andrew Introduces Agentic DevOps  
1:28 — Agenda Overview  
2:05 — Problem Statement: AI Adoption & Growth  
2:41 — AI Agents in Apps & Industry Stats  
3:13 — AI Infusion, Velocity Uptick & Challenges  
4:04 — New Problems for Developers  
4:16 — Model Selection & Model Diversity  
5:14 — Security Challenges  
5:58 — Quality & Testing Challenges  
6:54 — Shift to Agent Development  
7:58 — Integrating Agents Into Existing Systems  
8:44 — Need for New DevOps Framework  
9:04 — DevOps History & Evolution  
10:37 — The Three Pillars of Agentic DevOps  
11:54 — Developer Experience & Copilot Evolution  
12:56 — Human‑Agent Collaboration  
13:52 — Agents Across the SDLC  
15:03 — Copilot Evolution Timeline  
16:44 — From Pair Programmer to AI Teammate  
17:52 — Developer & Agent Roles Evolving  
19:01 — Where Developers Spend Their Time  
20:04 — Copilot Adoption Across GitHub & Microsoft  
21:16 — Impact Examples Across Microsoft  
22:04 — The Vision Behind Agentic DevOps  
23:06 — Demo Setup: Testing Task  
24:54 — Creating a Custom Test Engineer Agent  
25:50 — Assigning the Agent to the Issue  
26:12 — Beginning Implementation in VS Code  
27:03 — Model & Mode Selection in VS Code  
28:06 — Auto Model Selection  
29:05 — Extensibility with Model Context Protocol  
30:02 — Fetching GitHub Issue Details  
31:00 — Planning with Plan Mode  
32:02 — Using SpecKit vs Plan Mode  
33:11 — Refining Questions & Clarifications  
34:30 — Finalizing Answers for Plans  
36:04 — Generating Plan Files  
36:54 — Reviewing the Plans  
37:58 — Using Cloud Agent to Implement Plans  
39:01 — Reviewing Agent Sessions  
40:12 — CodeQL Security Scan  
40:44 — Prototype Review  
41:19 — Assigning Copilot as Reviewer  
42:15 — Governance & Controls Concerns  
42:38 — Code Review Output  
43:05 — GitHub Insights & Model Governance  
44:08 — Model Controls  
46:09 — MCP Server Allowlist  
47:00 — Security Remediation with Copilot Autofix  
49:02 — Site Reliability Engineering Example  
51:04 — Incident GitHub Issue Creation  
52:46 — Recap of Agentic DevOps Vision  
55:28 — Closing & Call to Action  
  
#MicrosoftReactor #learnconnectbuild  
  
\[eventID:26634\]

## Transcript

### Session Welcome & Introduction

**0:09** · Hey everyone, thank you for joining us for our next session, the future of software creation with Agentic DevOps.

### Producer Introduction (Anna)

**0:16** · My name is Anna. I'll be your producer for this session. I'm an event planner for Reactor joining you from Redmond, Washington.

**0:23** · Before we start, I do have some quick housekeeping.

### Code of Conduct & Housekeeping

**0:27** · Please take a moment to read our code of conduct.

**0:30** · We seek to provide a respectful environment for both our audience and presenters. While we absolutely encourage engagement in the chat, we ask that you please be mindful of your commentary. Remain professional and on topic.

**0:43** · Keep an eye on that chat. We'll be dropping helpful links and checking for questions for our presenter to answer.

### Chat & Links Overview

**0:49** · Our session is recorded and it will be available to view on demand right here on the Reactor channel.

### Recording & On‑Demand Info

**0:56** · With that, I'd love to turn it over to our speakers for today. Thank you so much for joining.

### Speaker Introduction

**1:01** · Hey everybody, it's great to be here. Uh my name is Andrew Flick and I'm a senior director over here at Microsoft over the developer tools area. Today we're going to be talking about Agentic DevOps, the future of software creation and I'm here with my partner in crime, Patrick. You want to say hi?

### Andrew Introduces Agentic DevOps

**1:18** · Hey there. Super excited to chat about Gent DevOps and I report to Andrew and super excited about anything developer tools.

**1:26** · Awesome. So, let's uh jump in. So, today's agenda uh we're going to start with just an overview of what is Agentic DevOps? What do we mean by it? Where did it come from? How did it get started?

### Agenda Overview

**1:37** · And just our definition, the problem space, what we see there. Then we'll move in and talk a little bit about GitHub Copilot and AI agents. We'll shift gears a little bit and talk about GitHub copilot at Microsoft and then we'll do a pretty end pretty big end toend demo where we talk about you know the full life cycle and the full SDLC about how Agentive DevOps uh plays in that space.

**2:00** · So let's start with the problem statement. You know there's a new class of software assets that's being developed and you know the expectations for this is huge. Uh I think IDC is forecasting 1.3 billion agents by 2028.

### Problem Statement: AI Adoption & Growth

**2:16** · Uh and you know on top of that it's not just agentic development it's just AI in the software life cycle. The recent state of the octiverse that GitHub published showed that about 1.1 million repos in GitHub uh used an LLM SDK. So it's just massive explosion of AI adoption AI usage in the apps that are being built. Patrick, can you tell us a little bit about like how AI uh agents are going to be integrated in apps?

### AI Agents in Apps & Industry Stats

**2:43** · Yeah, for sure. And this is what we see in the industry. Currently, around 82% of orgs intend to integrate AI agents within the first one to three years. And Gardner was also saying 90% of software engineers, so down to the individual level, will utilize AI coding assistance at the same time frame. as well as something that we've seen is for all new GitHub users 80% of them leverage GitHub copilot in the first week. You know what I think that that you see these two things happening. You see the first thing which is you know this AI infusion. The second thing which is more agents being used in the SDLC. And you know I'd say like we've also seen a correlation in velocity uptick as well.

### AI Infusion, Velocity Uptick & Challenges

**3:28** · You know we're going from in 2024 about 35 million pull requests were merged. Uh in 2025 uh that was up to 43.2 million.

**3:38** · Likewise, we saw an increase in the number of code pushes from 65 million to 82 million in the same period. So just velocity uptick, faster delivery, agents in the workforce and you know working inside of the the SDLC and then you know this notion of AI apps being built but that is actually introducing a whole new set of problems and you know there are a lot of them on the slide. Uh but I think the key point is is these aren't just generic problems. These are problems that I as a developer would have to worry about. So let's double click on a couple of them. Like the first one that I want to talk a little bit about is just model selection and model diversity. You know, Foundry, a Foundry from Microsoft has over what 11,000 models in its model catalog. And you know, when I was thinking about this, there's a there's an app that I've been partnering on and I looked at it. Uh they're using seven different models to build a single voice powered agent. Um, another prototype that I've been toying with on the side, you know, I was trying to do some image gener generation and I was using a dolly and, you know, it's great for generating an image, but then I wanted to add text to the image and then there was a question of like, do I manually overlay text or do I choose a different model? And then, you know, every week it seems like there's a new model that's shipping that I need to go figure out just model palooa and I'm trying to figure out like what do I need? And, you know, as a developer, I've got to balance those tradeoffs. Um, you know, Patrick, I think you've been thinking about the security aspects. Can you tell us a little bit about what's going on there?

### New Problems for Developers

### Model Selection & Model Diversity

**5:11** · Yeah, totally. Like, especially with the speed of delivery and the agentic explosion of code, we actually have increased the surface vector. Right now, developers have to think about the traditional layer and they're also thinking about the AI layer. And on top of that, devs are also now learning these new skills on how to work with AI.

### Security Challenges

**5:34** · and it's starting to become hard to prioritize like is the question around innovation and remediation and security time is that a trade-off and what we've been seeing is when it comes to some of these stats we see for critical security defects it could be 116 days or around 17% of our vulnerability backlogs are actually flagged as critical. Well, that's crazy. And I, you know, like thinking about just quality in general, you know, my background, I come from the the testing space, many, many years in that space. And AI is really just turning that whole space on its head. I mean, when you're dealing with AI, um, like back in the past in the traditional world, you know, you would, you know, plan for a test, execute a test, get an expected result. But now you're getting non-deterministic outcomes. And you know, not only does it make it really hard to do kind of the traditional testing, but even when it comes to reproducing a bug, you know, that brings a whole new challenge. And you know, that's just the traditional aspects of quality management and and kind of that world. But we haven't even talked about the need for like how do you test for fairness, compliance, or any ethical or regulatory concerns? Like there's just a whole bunch of stuff that's making this new wave of software development increasingly complicated.

### Quality & Testing Challenges

**6:51** · Um, so let's double click a little bit on this and just talk about agent development specifically in general. So we're going from what we just talked about a deterministic kind of a request response type application to more of a runtime decision system and you know the logic then becomes a bit more adaptive where you know the AI will go gather context it'll you know make some tool or API calls it'll update its state and then it'll retry and adjust its its result and you know the result may be you know perfectly plausible behavior that makes a lot of sense but it could just be a wrong answer or the result could be uh done in the wrong order. So it's it's no longer you know just that expected outcome. It it means that you know the engineering discipline needs to change. It needs to go uh and and and bake in reliability. So you have data guard rails eval and observability. So like just a bunch of changes. What do you think Patrick?

### Shift to Agent Development

**7:54** · And I hear you Andrew. So agent development and getting started is hard but Andrew what happens after we do agent development we also have to integrate it to the existing system that we have.

### Integrating Agents Into Existing Systems

**8:08** · Oh yeah you know actually that reminds me there was a customer that I just spoke to and they had just integrated an agent into their uh sales system and everything worked fantastic worked in development everything was great. They shipped it to production uh and then the agent just started recommending you know competitors products which is crazy.

**8:28** · \[clears throat\] So you know what they did about it was turn it off and revert changes like that was that was their DevOps practice and how they managed that.

**8:41** · So it seems like with all these changes we don't have a framework yet to handle this new worldview. And like this is why I'm super excited to see this because before we talk about products and demos and other the possible like Andrew like can you tell the crowd how we can like ground ourselves in this emerging DevOps practice?

### Need for New DevOps Framework

**9:02** · Yeah, sure. So like you know DevOps was coined I think back in 2009. It was popularized by a talk from Flickr and that's where this notion of dev and ops collaboration started to come out quickly emerged. uh you know Microsoft talked about for many years as the union of people, process and technology to continuously deliver value to end users.

### DevOps History & Evolution

**9:24** · You know also during this era you know there was I think the canonical book by Jez Humble which kind of gave you the the principles of store your code and source control you know use continuous integration drive towards continuous delivery. It was really really good guidance and then I'd say late 2010s dev sec ops came out and it was like hey security is really important and we should push that into the the life cycle. Now there was a big debate on whether it's dev sec ops or securing devops that happened during that time too. Um but really you know developers got more and more responsibility and then you come to 2018 and the cloud era is in full swing and that's when containers starting to come into play and you know that also brought more things because now developers not only had to worry about you know testing their code securing the code but now they had to worry about their code all the way down into as it's being deployed out to production you know and I think that leads us to today and given the challenges that we just saw and the way that applications are changing I think the ability to bring AI into the DevOps life cycle to handle certain tasks is what's emerging and something that you know we've coined here at Microsoft that we call Agentic DevOps.

**10:34** · Awesome. So if we look at Agentic DevOps essentially we could see it in like three different pillars and I think it makes sense to start with pillar number one where we focus on the developer and developer experience. C-Pilot has like evolved in quite a bit especially since back in 2021 and since then we've seen the rise of five coders to spec driven development to now multi- aent orchestrations for these developers and like devops it's not just a tool in this case it's a full system of challenges and a process challenge that needs to be overcome and then to the second pillar and this is where it's really cool because it's evolved from just like the software creation in the editor all the way to infusing agents across like the life cycle. Now we've seen combinations of like site reliability agents working with developer agents down to like security scenarios like Andrew when we talk later you'll see the cast of agents that I have working across the life cycle and then finally infusing AI into building AI. We're seeing the maturity of apps go from just chat bots to chat bots of rag to essentially multi- aents.

### The Three Pillars of Agentic DevOps

**11:52** · Yeah, it's uh it's kind of crazy because so you think about like all of these AI agents, you know, helping you with tasks that you mentioned, helping you write better code, and you know, there's all this debate on like where does where does developers sit in the whole system or, you know, what's the job of knowledge workers, you know, and all that kind of stuff. And I think you know we kind of get down to like these three kind of verticals like you know what do the humans know what work can they do and and how much time can do they have to do it and and you know I again I'm probably dating myself again but I remember the early days of TDD and you know some developers they weren't really good at testing and you know the build would fail and they'd see the reason was you know some certain test would be failing and so they'd delete the tests and so like I look at this and say like you know this future of of Agentic DevOps I think this actually makes it easier to realize the vision that's been promised and it puts developers at the the very forefront. I think developers become, you know, force multipliers when when paired with a team of agents that can handle some of these tasks. And, you know, you mentioned some of them a second ago, but we've gone from this notion of just code completion to agents that are helping with red teaming, site reliability, uh, you know, even modernizing applications. So, just a big shift.

### Developer Experience & Copilot Evolution

### Human‑Agent Collaboration

**13:14** · And Andrew, have you seen the shift in me as a force multiplier with working on these agents this year?

**13:19** · I mean, I'm waiting to see in the demo what kind of force multiplier you are. So, I'm looking forward to that.

**13:25** · Okay, before we get there, let's let's talk about essentially the foundations that we're building on. Okay, so Microsoft GitHub, I truly believe provides the world's most widely adopted developer platform. For example, 100 million developer accounts bet on GitHub. 90% of the Fortune 500 fully use it. And with these tools, we wonder why this ecosystem is so trusted. And after talking to a ton of customers, it's the trust, the scalability, and the connected uh ability for it to be one ecosystem. And one thing I'm super excited for is recently we just launched the new release of the GitHub Copilot SDK. If anything like VS Code and its ADK extensions, I'm excited to see the adoption innovation that comes with this SDK.

### Agents Across the SDLC

**14:17** · You know what, you're spot on because you know like developer tools that we have are, you know, they are really well loved, but they're truthfully when you look at all of the development tools out there. Uh these tools are the platform that development companies build on and so just exposing more capabilities, the future's bright to see where this goes.

**14:38** · Awesome. So Andrew, we've both been there since the beginning of GitHub Copilot, but do you want to share how like we've seen some of the evolvements as the years have progressed?

**14:48** · Sure.

**14:48** · I'd say like way back in June 2021 is when you know we first announced uh the preview of of co-pilot, you know, based on top of codeex. I think it's there's a blog post out there somewhere from way back when. And that time was like it was a time of very you know very much excitement but like the use cases were kind of interesting. It was you know going from single line completion to multi-line completion was was super cool to see what it could do and it was really exciting and then you know we introduced chat and then you know at one point we got to multifile edits where you could now make changes across different files really changing the way we do refactoring. Uh, I'd probably say it was right around that time where, you know, my, you know, my world shifted and I started to use uh, use Copilot to just help write applications and and really get into things that maybe I normally wouldn't have taken time because I I didn't have the time to go go do things.

### Copilot Evolution Timeline

**15:45** · So, it's a big change there. And then agent mode came out and that was a a bigger change using natural language and kind of pair coding with uh, with co-pilot. Then coding agent came out a little bit later. Uh and then you know that was where you could delegate to a pure programmer. Um you started to see access to more models. Model selection went from just you know OpenAI to to Gemini and to Claude. And then in October this year you know you saw plan mode come out you know custom agents uh the ability to find your own one there.

**16:17** · Agent HQ and just more integration on top of the GitHub graph. And you know as I look towards the future you know you just mentioned the the co-pilot uh SDK and you know all the CLI innovation just co-pilot is like amazing on how the velocity of ships has happened. It's just break neck speed new features coming all the time. It's just an exciting time and I think with all these innovations you just mentioned uh we really start to take a look at the role and how we collaborate with GitHub copilot and I think even that has changed like fundamentally when I understood it's a parrogrammer to a peer programmer to an AI teammate it's just really helped me work better with it and Andrew would love your thoughts on that. Yeah, I mean I think you you kind of covered it was like you know you'd do some work and it would make some suggestions on how to do method completion and then you know you'd be able to talk a little bit natural language and the use cases then were were again still a little bit on the basic side but like the thing that's changed is like the models continue to get significantly better and I think that as we get into this pure programming world where you've now got deep reasoning models that can do or all sorts of implementations like it's an amazing time as we get into this new world of agentic development and it's not just about coding it extends into other agents and does this count as like since I'm delegating to these agents does that count as manager experience I mean I think that you know you're kind of being tongue-in-cheek in this but like the the thinking here is is like you when you think about three agents maybe doing some tasks and committing code in like you're still having work to do that orchestration work is work and it is management work and so like I don't know if it's the same level of of people management but I think there's a certain level of like groing three separate tasks and how to pull them together and make sure they all coordinate and work in the same way.

### From Pair Programmer to AI Teammate

### Developer & Agent Roles Evolving

**18:28** · Agreed. And I'll make sure the culture is good too. So looking at these agents across the software development life cycle, I've really seen them uh show up in different ways from coding to code reviews to even some scenarios that customers are super excited to talk about which is modernization from upgrading versions to full modernization projects. And I'm curious to see what other custom workflows there are.

**18:54** · Yeah.

**18:54** · And I think like when you think about that and you look across the SL SDLC, let's let's take a step back like developers as much as they love to spend all of their time banging out new new uh code or you know learning new new libraries. And the the truth is is like that's not the majority of their time.

### Where Developers Spend Their Time

**19:12** · They're spending a lot of time doing design work, planning, refactoring and maintenance tasks. Like there's just a whole bunch of work do going on that isn't allowing them to speed up their delivery. And you know, I think that um you know, bringing in AI agents across the SDLC and handling some of those repetitive tasks is really a shift and it's how developers are going to be able to change the way they spend their time and just evolve the way DevOps works itself.

**19:43** · Yeah.

**19:43** · And if I could share a story within GitHub, we're seeing agents like coding agent and code review actually really creep up there for like the productivity and contributions we've seen like this governance ensures us that these capabilities are being used securely and effectively and essentially is supporting our business objectives.

**20:03** · Yeah, I know it worked for you because I don't see you on here. You'd probably be number one right there next to next to co-pilot. But like looking at you know the broader Microsoft world um you know it's it's not just really about adoption. I think our own developers are seeing significant gains across speed efficiency and the delivery of customer value. You know I I think about this and I think about like the Visual Studio Code team um you know looking at the productivity gains they've got they continue to see there. You know they've moved to monthly releases and they're moving to daily releases. So if you're on VS Code Insiders, you're getting all sorts of new stuff all the time. It's it's pretty amazing. I mean, I think even one of the product managers on the VS Code team was able to use some of the co-pilot capabilities to spec out and create a prototype of some functionality that she thought would be amazing inside of VS Code and, you know, then it got hardened up and put in the product. Like it's just seeing this notion of the way collaboration is changing and the way development is changing that's happening right here inside of Microsoft. And if you if you look at VS Code, it's happening in the open. So you can actually see the innovation that's happening. It's just an amazing time.

### Copilot Adoption Across GitHub & Microsoft

### Impact Examples Across Microsoft

**21:16** · Yeah.

**21:16** · And at Microsoft, uh here are just some of the examples of impact across the life cycle. So for example, we've seen 91% of Microsoft's global engineering team use GitHub Copilot. Another example is Xbox looking at app modernization and migration efforts.

**21:36** · They're using GitHub Copilot to help with that by 88%. And then finally, uh the amount of time that we've saved, so 10.5K hours and 7K plus incidents have all been indicated with this agent called the site reliability engineer agent. I mean that's pretty amazing. The impact of Microsoft, I mean we are on the frontier and we're kind of pushing forward with this, but like I think that's comes to you know like the vision. Um, you know, you think about it, you've got uh the GitHub graph, which provides a whole bunch of insights and and capabilities. You've got co-pilot having access to the graph. Uh, and then you have just the sheer number of agents that are coming into play.

### The Vision Behind Agentic DevOps

**22:19** · And, you know, some of these are are based on copilot. Some of these are based on GitHub features. Some of these are based on you know Azure capabilities like the site reliability agent or playright agent on top of playright or you know even some partners are are building just like infusing across the SDLC and essentially when you think about those integration points and the way that's changing software development this is aic devops and so like I think we should really shift gears and probably see it in action. I'd love to see uh your demo skills. And Patrick, I know you've got uh you've got a pretty long backlog and I know that you're suffering a little bit on the quality aspects. Tell me about what you've got to go do.

**23:04** · For sure. So, let's switch over to my screen. Uh so, Andrew, I've been working on that Zava website uh with all the smart gear, right? And I'm looking at all these issues and I think the first one I want to work on today focused on testing. So let me click on the first one. As I can see, it's improving testing coverage for this application.

### Demo Setup: Testing Task

**23:26** · What I need to do is essentially get the test coverage to around like 90%. So Andrew, traditionally, I could work on this, but now we live in a world of agentic devops. So what I'm actually going to do is assign this to an agent. And in this agent, I can see, as you can see, there's all these custom agents. But let's go and create another custom agent. Okay.

**23:52** · So, Andrew, as you can see here, I actually spent the time to write a full MD for a test engineer. And you can see it's has quite a bit of it.

**24:03** · Cool. So, like looking at the anatomy here, you've got kind of description of what it is. You've got some MCP server uh for Playright, which you know, I I love Playright. It's uh you know, a great web testing framework. um you know it can go do that kind of stuff. Uh you've got you know a list of of tasks of what it can do, some patterns, some anti-atterns.

**24:25** · Um you know this looks good. It's pretty cool. Like uh looking forward to seeing how it how it behaves and and curious to see how it manages uh object recognition.

**24:35** · Yeah.

**24:35** · So instead of sending out an org email that it's now part of the team, I'll just commit it. So test engineer, welcome to the team. Commit change. All right, let's put it to work. Okay, so back to the issue. Let's come into here, assign. And just like that, we have the test engineer. I can give it a little more instructions, but I think this has enough details. So, let me hit assign.

### Creating a Custom Test Engineer Agent

**25:01** · Just like that, a pull request is created. It's already seen the work. And yeah, uh we'll come back to it. And I see the pull request is right here.

**25:11** · Yeah.

**25:11** · Well, while you were working on this testing, I noticed you pulled a fast one on me. Um, I was checking out your work on the the Zava web page and uh looks like the pro data nano sensors page you didn't uh didn't implement it.

**25:28** · I thought it was there but it wasn't there. Uh what's up with that? I focus on aesthetics and I just saw I got assigned a issue because before there was no issue and there it is and I saw Yeah, I know you don't do work unless it's in your backlog. I get it. So like I added it there real quick once I saw it was missing. And as you think about implementing this, you know, uh I'm all about scope creep. Can we do a light mode, a dark mode, maybe a 3D mode? Like what do you got? Like let's let's go and implement this thing. Okay. So, kudos to this detailed uh get of issue. Again, I'm glad I'm in this world of like agents where I can work with multiple agents to get this done. Okay, Andre, I saw you already assigned it to me. Cool.

### Assigning the Agent to the Issue

### Beginning Implementation in VS Code

**26:14** · All right, let's get started. So, let me switch into VS Code. Uh so in VS Code uh working with GitHub Copilot, there's actually a bit of anatomy that I love going into because it helps me see all the different capabilities that I can get started with. Okay, so I go into chat and as you can see in chat here, Andrew, I actually get to pick before I start any task to go with agent mode like how you were talking about pair programming, pure programming and all that to ask, edit, and even plan. So I essentially allow it to work through uh collaborative ways so that it's not going off the rails.

**26:52** · Yeah, that's great because like looking at this that's uh that's got covered all of the different things we talked about in the GitHub co-pilot roadmap just a second ago. So you're just seeing them light up in the product here.

### Model & Mode Selection in VS Code

**27:03** · And I see my new hire test engineer right there too.

**27:06** · Okay.

**27:06** · So um the other part you were talking about was models, right? As you can see, um, it's shipped to VS Code when all these models come out. And the cool thing is if I hit manage models, I'm able to see, uh, some of the capabilities, uh, all these different models, the cost, and if I wanted some other models, essentially, I have all this here.

**27:32** · Oh, yeah. That's great because like not only do we have just a ton of models that come shipping with GitHub C-Pilot, but we've also got I mentioned uh Foundry and Foundry's got those 11,000 models. So, you can you can choose that. Now, quick question because you do have a lot of models here and I know what you do. You default to Opus45 on everything.

**27:53** · Uh is there anything that may be a little bit smarter and help you pick when you don't need a a reasoning model like that?

**28:00** · No, that's fair. That's fair. Okay. So, what I use is essentially auto. As you can see, for auto, it goes and helps me actually pick the best model based on capacity and performance on what I'm working on. And I actually even get a 10% discount uh when I have it selected. So, it's a good way to start when you're first starting a project.

### Auto Model Selection

**28:23** · You know, that's great because like I know you you would just use the excuse, I forgot to get out of Opus. Like, I get it. I'm a big fan. Well, okay, there's models and then there's modes and then there's agents. But Andrew, you know me, I want to stay in my editor as much as I can versus going other places. And this is where I can supercharge these models with essentially uh extensions.

**28:50** · Uh what I can leverage essentially is model context protocol. and model context protocol allows me to go and access different tools and allows GitHub copilot the agent that I'm working with to essentially engage with it.

### Extensibility with Model Context Protocol

**29:05** · That's fantastic. So, just like uh we've got 80,000 extensions, this is another type of extension. Uh it's fantastic to see that there's a whole bunch of them already pre-enabled inside of VS Code. And you know, I guess the the power here is single click install.

**29:21** · Exactly.

**29:21** · All right. So, how about we see this in action because again, Andrew, you did a great job writing a very detailed, uh, GitHub issue that you want me to go work on. So, uh, let's start with it. So, I think let's do give me the details on the issue, uh, you essentially applied for me. One sec.

**29:44** · Okay. Right here.

**29:46** · \[snorts\] And essentially what I'm using is the GitHub MCP server to pull down that issue uh into it. Okay. So it's fetching essentially GitHub issue number 30.

**30:01** · And Andrew, as you can see all the details over there. Anything missing?

### Fetching GitHub Issue Details

**30:05** · Yeah, light mode and dark mode. Clearly I I just expected you to know. \[laughter\] Okay. Uh so now that we have that done, uh let me go and I see it's already switched over to plan mode. What I want to go do next is take this GitHub issue and build two distinct plans. Okay, so essentially get uh one sec.

**30:30** · So I want two separate plans uh based on this GitHub issue. Essentially one that is light mode and one that is dark mode. Okay. And again, as you can see, I'm using plan mode. So, it should give me a pretty good plan.

**30:44** · Awesome. It looks like it's off doing its thing. Uh, it's coming up with the reasoning, coming up with the tasks and how it goes and implements it. And, you know, I love plan mode because it's, you know, it's baked into VS Code. It's pretty quick, pretty easy. Um, but I'll be honest, I've also used SpecKit, which you can go out and download and install.

### Planning with Plan Mode

**31:02** · It's it's uh, you know, fantastic. Uh, you know, it gives you a little bit more ceremony. you have to deci you have to define your you know your constitution then you kind of give the specification the what and why you're trying to build uh then you move into planning and planning gets a little bit more details on the tech stack which I think is always interesting because you can reason on that uh and then you ask it to break it down into tasks and then those tasks you know what I've been impressed with was the ability to say like here's the number of engineers to implement these tasks and which tasks can be done in parallel um you know I actually wrote a the shell of a e-commerce site on a 14-hour flight back from Singapore uh using SpecKit, which was a pretty cool use case. Uh I've been using Planbo a lot lately just for some of the implementation on some of those Agentic apps that I was talking about. Um works pretty good to break things out and if I do needed to break it into tasks and all that stuff, it's there. But it's just great to see it just integrated into the project. I don't have to think about it.

### Using SpecKit vs Plan Mode

**32:02** · It's right there. It's just a switch of a mode. And my favorite part uh is and Andrew, you know my background. What I like about plan mode is that it asks the questions that I may have missed. For example, I took your GitHub issue. It's super detailed, but there's further clarification. And this is where that collaboration with the agent works really, really well. Uh, and it just makes sure that when we go and create something, it doesn't go different ways.

**32:35** · And it, as you can see right now, the agent is going in reading all the different files. So, I just wanted to make sure it's super detailed. But the good thing is, Andrew, I actually worked on one. So, let's skip over to that.

**32:51** · So, as you can see, uh, it essentially started with, uh, building a plan out here. So, Andrew, the dark mode you asked for and then a separate uh light mode you asked for. But do you see something interesting here, which is the questions right here are actually different than the plan mode of the questions over here. And the reason is because it's building two different specs. It's thinking about, okay, uh accessibility pieces. is making sure uh for example this one was a great question asking should we implement a toggle but it also knows that it's a prototype and that's why essentially what I did was hey for plan one no need hey for plan two also uh like here are like the answers and essentially the agent and I worked back and forth until we got to something that like we were actually like quite happy with uh and once that was good essentially we could go look at imple implementation. So I see uh this one uh so going back to this or this is uh going through the pieces. Okay. So after we have this uh essentially we can answer a few more questions and then we can get it to uh work through it. Okay.

### Refining Questions & Clarifications

**34:17** · So like quickly for the Oh actually sorry it was like right here um right here. So let's say for plan A uh it's asking the tool tip and we can say centered uh for number two animated budget we can say reduce motion and uh we'll just say maintain and then number three uh close uh tool tip and then for plan B so plan over here. Uh let's see the question. It says do you want to display the toggle?

### Finalizing Answers for Plans

**35:00** · And we'll just say remain uh dark only. Uh for this it says a silent toggle. We'll just say silently. And then for the third one essentially what we can say is maintain uh dark.

**35:18** · And it should take these. And then once uh it's ready to go essentially we should be able to implement it. So as you can see it says final working plans coming through. That's fantastic. You've been collaborating back and forth. I do question when you said we're both happy with it. It seems like I think hoping you're happy with it. \[laughter\] No. Exactly. Okay cool. So now we have two plans. Traditionally, uh I would have to work through each plan in in a linear uh motion. But Andrew, what's cool about it is now there's these different kind of agents and what I can click on is open an editor and it essentially will take those two plans and create two MD files for it. All right. So let's see. It's creating two plans. If I come over here, uh it's still developing. Okay. So, it's working on those two plans. Let me create the content. Okay. And just like that, I just got a notification.

### Generating Plan Files

**36:24** · Andrew, do do these work? Looks great. I mean, like now you have the ability to save one or pass those off to the marketing team and say, does this meet the right specification or save it as documentation, which is great. So, you can save them in your repo for future use. This is a just a good just step of categorizing and giving you know context to your thought process and your reasoning as you as you thought about implementing this new page. Exactly. So now we have two prompt files. What I'm going to do next is work with another agent. Okay. So uh as you can see right here multiple agents, right? Uh Andrew, do you want to tell the group of brown about the background agent while I assign this to the cloud agent?

### Reviewing the Plans

**37:06** · Sure.

**37:06** · So why don't we talk about this?

**37:07** · So, uh, you saw a little bit of of work before where, uh, Patrick was doing back and forth, um, you know, kind of this collaboration and plan mode. The same kind of natural language experience works in agent mode where you can ask the agent to do work and, uh, you'll see that same reasoning right in front of you uh, as it goes through the tasks.

**37:28** · Uh, background agent uh, actually runs those in behind the scenes, which is, you know, sometimes you don't want to see it, you want to be working on something else, which is great. Uh and then you know it'll it'll prompt you if it needs some elevated level of permissions or ask some questions. Uh what you just saw is he's assigning it to cloud agent which is his peer programmer. There's this uh this actually operates in the cloud uh on his behalf. We'll answer questions, we'll reason and we'll kind of go through all of the the reasoning by itself without asking. Um and then you also saw the codeex agent which is you know just seeing open AAI plugged in again into the broad ecosystem the open ecosystem here. So you get all sorts of capabilities and ways of integrating and then just one centralized place to see all of the agents. Pretty cool stuff.

### Using Cloud Agent to Implement Plans

**38:17** · Yes.

**38:18** · So uh back to what Andrew was saying uh fired off the two cloud agents and now we have agent sensions right here that I essentially can see everything that's going on. So I can essentially govern do the governance. And what's cool is as you can see the pull request also shows up here. So let's now leave the editor.

**38:37** · The agents are doing the work. Angel, let's go back to github.com as because remember we uh fired off quite a few different agents working together on stuff.

**38:47** · Okay.

**38:49** · So uh as you can see here, Andrew, uh this is where a bunch of the work that we just just started to assign right here. For example, execute plan for the light mode, the dark mode, uh the test coverage that we did at the very beginning, which was my task until you got me distracted. But uh let's go look at a finished one. Okay, so here is one of the sessions that was for the light theme. And what I really like about it is you get to see how the agent is going through thinking. So it's essentially uh firing off the servers. It's looking at the prompt MD like we set up right here.

### Reviewing Agent Sessions

**39:35** · And then work on the good thing about it is once we start to go down a little bit, it actually has an implementation plan. and before it has the implementation plan.

**39:47** · Andrew, are you familiar with CodeQL?

**39:51** · You know, uh, looks like you're going to tell me about a security scan based on the the definition there. Tell me a little bit more about it.

**39:59** · Exactly.

**39:59** · So, KitQL, uh, makes is a code scanning tool which looks for vulnerabilities in the code that we create. And as you can see, it says, let me run a security scan with CodeQL.

### CodeQL Security Scan

**40:12** · And right here, no alerts. And the reason why we do this is because if we had an explosion of uh agentic uh developments, that tech debt will continue to increase. We made sure to have code shifted left even at the agentic level so that the tech debt won't increase. And then after that, it did a code review, security scans, accessibility, responsive design. Let's go and look at the page.

**40:38** · took all the details uh that you provided and the copy and just like that we have a prototype for you to take a look at.

### Prototype Review

**40:47** · That's beautiful. I love it. I love to see that you were able to do two implementations in parallel. Um that we had playright testing set up that we had CodeQL for security. So by the time a PR hits your inbox for you to take a look at it's already got a level of safety for it. And so like I'm hoping that uh you will actually uh maybe take a look at those implementations before you send it my way.

**41:13** · For sure. For sure. Okay. So I'm going to review it and then after uh I'm reviewing it, I also want to use AI on AI. So what I can do here is actually assign co-pilot as a reviewer. Okay. So like that. And then essentially I'm going to approve the workflows to run. What it's going to do is essentially do a code review on the work that is here.

### Assigning Copilot as Reviewer

**41:41** · And what it will provide it is essentially any suggestions or any changes that needs to be done and once that is ready to go then Andrew I'll assign it to you.

**41:52** · Yeah, that's great because like having a code review agent speeds up review cycle time. Uh, so you're getting a review first and also it's gonna it, you know, it's not going to judge if you forgot a semicolon or something like that. Like this is, you know, fantastic to get just a quick check before you, you know, you get another person involved, which is, you know, great. But like, as you're going through this, you know, I'm getting a little bit concerned because you've been saying the agent wrote my tests, the agent planned, the agent did this. Um, you know, how do I know what you're doing? Is there some level of governance that we have in play where we can either you know take a look at the different agents using the MCP servers like is there anything to protect me there?

### Governance & Controls Concerns

**42:35** · No for sure. So uh quickly to close off it uh code review came back gave me a table and actually had a quick change and if I wanted to accept it uh after I review it I just do commit suggestion.

### Code Review Output

**42:46** · But Andrew you're right and I think it leads to a few questions. One is how do we look and see if there was a dashboard on all the analytics and everything going on and also how do we do some control?

**43:00** · I'm excited to announce uh at GitHub universe and recently we focus a ton on uh these different pieces. So Andrew at the or level and at the enterprise level essentially if you hit insights you're actually able to start to see a native dashboard that has all this info.

### GitHub Insights & Model Governance

**43:18** · Guilty. Guilty. There it is. Claude Ovis 4.5. I knew it. I knew it.

**43:23** · You know, you I can't hide from the data.

**43:26** · You showed me that you were using you were using sonnet, but no. Nope. Nope. There it is. Proof is in the pudding.

**43:31** · Got you, buddy.

**43:32** · Yeah.

**43:32** · Okay. So, as we go down, as you can see, you can start to see the models. And Andrew, you're right. It is close though. Sonnet 4.5 38% versus cloud office 39%.

**43:48** · So you get all this data and you get to see the languages used. So, it's a great way to even start to think about how we look at ROI once we have all this data, right? But then Andrew, I'm sure you're thinking about, cool, that's the data we can build an ROI, but what about the AI controls? How do we start to like secure all of this, right? So, let's go on to AI controls in also at this level. And I think first thing you can see is the two agents that we were talking about coding agent coder view and also what you see here is custom agents because we're really trying to build that open platform. So we can bring in Jrog and bring in pedag duty all these other agents and the best part about it is you're able to essentially manage it by organizations.

### Model Controls

**44:40** · That's awesome. you know, looking at this, I think this is just another level of of visibility and security. It's great, you know, especially since you've been out creating custom agents all over the place. \[laughter\] No, that's fair. That's fair. Okay, so how about let's go one level deeper into the co-pilot level. And I think it's exactly what we were talking about like the different models. So in here as well, Andrew, if you didn't want me to use a specific le uh model, you can actually come in and like govern it by enabling it at the org level, at the repo level, and that's what I would be uh have access to. And then what is also really neat is enablement of models.

**45:24** · So let's say Andrew, you wanted us to essentially develop a model with Foundry. were actually able to do the governance of it where I could if you turned it on for me I could use the Zava Azure AI model when I was doing that page.

**45:40** · That's awesome. And and you know what like I think this is one of those things where we are shipping you know models almost as virtually as soon as they're available. And so like if you're a developer out there and you're in VS Code and you're noticing that a model is not available, it might be just as simple as reaching out to your your GitHub or admin and saying like, "Hey, can you can you expose that for me?" Uh just to make sure it's there and readily available for you.

**46:04** · And then final piece, uh as you saw, I was able to stay in the editor and all that because I was able to use monocontext protocol or at the coding agent being able to do playright and other tools because of this extensibility. But there's also a security piece of it, right, that we have to think about. And that's why Andrew at this level, what you'll be able to do is a registry allow list.

### MCP Server Allowlist

**46:30** · You know what that's fantastic because like getting access to every all the context that uh MCP servers give access to does make me a little nervous. Like you saw the security uh stuff that we talked about at the beginning. I mean bad actors are using AI and and you know the more security controls we have the better.

**46:50** · So Andrew on that we also applied AI to that security world. So in the past uh what we were able to leverage was GitHub advance security which was great on notifying. The only issue with notifying is we need to do something about it and like you and I were talking about does it become a trade-off which is never a great conversation when it comes to security.

### Security Remediation with Copilot Autofix

**47:18** · So in here I go into code scanning alerts and I \[snorts\] see all these alerts and traditionally um what I would have to do is do some research, go to Stack Overflow, figure out how to go and remediate it and remediation has always just been a tough piece and I honestly think if we don't figure out remediation that text uh that will just continue to grow. So here's an example. Here is one of the code vulnerabilities and we see what we have access to is C-pilot autofix part of GitHub advanced security and it gives us a summary and actually even provides us like the code change and once I review it I'm good to go I can commit to new branch.

**47:59** · That's pretty cool like uh and I think your stats in the beginning of the presentation were spot on. I saw about 114 vulnerabilities in your repo and most of them looked like they were flagged critical. So you're you're matching the stats like I hope you deploy this agent a little bit more but like truthfully the security thing is never fun just like tech debt is never fun. It sneaks up on you. Um you know the number of repos that I've got that have got you know dependency alerts that pop up all the time. You know I I can't say that I've gone a single week without my own personal website crashing or not crashing or popping up with a you know dependency problem. Every single week there's something new. So like you know this is something where I think agents coming in to make a play and helping out with is is something that just really brings us forward. Um but security you know that's one of the kind of reliability issues that we got to keep on top of. Are there any other things that we should be concerned of or any other ways that agents can help us?

**48:53** · Yeah

**48:53** · for sure. I think Andrew it goes back to what we were talking about agents across the development life cycle especially where agents almost act as personas where we can work between different personas like dev sec ops. But here's another example site reliability engineering where it's able to have two agents work together. And here's an example. I just actually got an alert that on top of the page not being built.

### Site Reliability Engineering Example

**49:22** · I think there's also an issue with the inventory and I know you just had it set up, but I think it's the popularity of Zava recently. Oh yeah. Okay. It's definitely not showing up. \[snorts\] I'm sure you just didn't start the the the the app server. I'm sure the API server is not started. It can't be me.

**49:40** · Okay.

**49:40** · Well, the good thing is uh the site reliability agent was able to catch it. Uh so it caught it and what it was able to do was first give us the description uh and it was the pager of duty that actually um like triggered it and I think Andrew do you want to share how SR agent able to connect to quite a few things? Yeah, I mean like ultimately, you know, you're connecting to your GitHub repo to give context of of the codebase and then you've got the ability to connect into either Azure Azure monitor or service now or pager duty. Just a bunch of different ways to get kind of the the alerting that's coming from there. But this is also, as you can see, Patrick's in Azure. So, we're also seeing the underlying information that's being surfaced there.

**50:23** · So, there's just a bunch of context that helps us uh, you know, trigger different alerts.

**50:28** · And what I love about it is the data that it can provide. For example, right here it's a visual with like the requests by the moment. And then I think what is also great about it is especially for S sur before the developer on call wakes up to go answer it, it has a safe interim remediation and it's essentially scaling up and down that Azure container. Uh the other thing it does though is because the site reliability engineer agent has access to a GitHub MCP server, it actually can create a GitHub issue in github.com. So let's go take a look at that quickly. As you can see, P1 incident here was the cache manager and it actually already assigned co-pilot to it. Again, part of GitHub MCP server. And what it ended up doing was essentially figuring out how we can increase the cash rate here as a permanent fix.

### Incident GitHub Issue Creation

**51:27** · Uh and once it has that essentially has the session done and then it uh what if I'm good with it do the code review again assign uh an agent for the code review after and then I can assign it to you Andrew.

**51:41** · That's you know fantastic looking at this like just the time savings there. I mean, you just kind of talked about the vision that makes up Agentic DevOps. You started the conversation um you know, with a with a task of like, hey, I want the agents to make a first pass uh of doing some testing for me and then I'll go validate the work that was done and make sure that all of the test scenarios are done. You use plan mode to kind of plan out a feature uh and kind of say, I need to go implement this based on a GitHub issue uh and getting context from an MCP server. used the the cloud agent to actually implement that that uh markdown file which was fantastic. So you got kind of the guard rails up in place to make sure you didn't just kind of go off and just go off a single prompt. Uh and you had done a little bit of work where you'd gone back and forth with it. You know, then you had had shown me how like you could assign a you know an agent to do a you know a code review based on the pull request after you' done some modifications. So you're getting a little extra touch there. it had used CodeQL to do some security scanning. Um and then you know after you had your app out and running you were also picking up you know an issue in production which was was pretty amazing because you know the site reliability uh engineering agent was able to uh detect the issue um look at investigate you know the root cause a GitHub issue assign GitHub co-pilot and co-pilot go ahead and you know created a a proposed fix all without kind of human intervention which is fantastic. you just get a pull request to review and you know that cycles down the amount of time that you may have been woken up by a pager in the middle of the night. you know, overall this is the vision of Agentic DevOps and so like switching back to slides because like this is uh this is the kind of the open platform and you're starting to see where humans and agents are collaborating together and you're seeing um a few other things that I think are really powerful like uh you mentioned when you looked at the MCP server the number of different uh MCP servers that were there from different developer partners out there that you know are very popular um you know GitHub copilots uh VS Code extension we open sourced that so it's out in the open the copilot SDK just became available we've got the copilot CLI so a lot of this is just out there in the open uh you also saw you know not just the MCP server support but you also saw you know the number of models that are there uh both shipping with or the ability to bring your own model inside of VS Code um the different agents that were there both custom and then you know I'd say like the GitHub graph underneath all of this giving context to the agent like this. This brings together not only the vision of Agentic DevOps which is you know uh you know for future for us to think about like what are the processes and you know people skilling that we need to put in place but there's a platform that brings it all together and so that's the that's the genesis of this series and what we hope to talk about. Uh so I hope that everybody you enjoyed the session um and come join us in the future. Uh we're going to be doing this every week. So, we got another one coming up where we talk about uh how Agentic AI is accelerating software developer here development here at Microsoft. We'll go a little bit deep on our our engineering practices here. And then we'll continue out throughout the next uh next month or so with with a new series that kind of uh a new session that talks about Agentic DevOps and the future there. Uh thank you everyone for time.

### Recap of Agentic DevOps Vision

**55:13** · Thank you.

### Closing & Call to Action

**55:28** · Thank you all for joining and thanks again to our speakers. This session is part of a series. To register for future shows and watch past episodes on demand, you can follow the link on the screen or in the chat.

**55:43** · We're always looking to improve our sessions and your experience. If you have any feedback for us, we would love to hear what you have to say. You can find that link on the screen or in the chat. And we'll see you at the next one.

**56:11** · \[music\] \[music\] \[music\] \[music\]