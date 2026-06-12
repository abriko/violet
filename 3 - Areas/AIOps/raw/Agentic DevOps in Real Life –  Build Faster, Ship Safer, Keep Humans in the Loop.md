---
title: "Agentic DevOps in Real Life –  Build Faster, Ship Safer, Keep Humans in the Loop"
source: "https://www.youtube.com/watch?v=MtzTpoots-A"
author:
  - "[[Microsoft Visual Studio]]"
published: 2025-12-22
created: 2026-04-21
description: "In this Live! 360 keynote, Brian Randell and Mickey Gousset unpack how agentic AI is reshaping DevOps—from coding and code review to automation, security, and incident response. You’ll see how GitHub"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=MtzTpoots-A)

In this Live! 360 keynote, Brian Randell and Mickey Gousset unpack how agentic AI is reshaping DevOps—from coding and code review to automation, security, and incident response. You’ll see how GitHub Copilot, agent workflows, and new Azure capabilities let teams automate the repetitive work, keep humans in the loop where it matters, and accelerate delivery without sacrificing safety.  
  
Through real demos in GitHub, Azure DevOps, Visual Studio Code, and Azure’s new “agent” preview, you’ll learn how agents collaborate with developers and IT pros, where they excel, where they fail, and how to build a practical 30/60/90-day adoption plan for rolling this out in your own organization without losing control, quality, or security.  
  
🔑 What You’ll Learn  
• What “agentic DevOps” means and how AI agents collaborate with humans  
• How GitHub Copilot Agents handle issues, PRs, refactoring, and multi-step workflows  
• Using Agent HQ to monitor, steer, and audit active agent sessions  
• How Copilot integrates with Azure DevOps for pull requests and automation  
• Security essentials: code scanning, secret scanning, and AI-powered autofixes  
• Responsible AI practices & the importance of keeping humans in the loop  
• How Visual Studio Code’s agent modes (Ask, Edit, Plan, Agent) improve developer workflows  
• Azure’s new autonomous agent for monitoring & incident response  
• A 30/60/90-day roadmap for bringing agentic workflows into your organization  
  
⏱️ Chapters  
00:00 Introductions & the evolution of DevOps  
03:26 What “agentic DevOps” means  
06:20 Demo: GitHub Copilot Agents in action  
09:10 Agent HQ: monitoring and steering agents  
12:30 Copilot + Azure DevOps workflows  
18:00 AI models, trust, and human-in-the-loop practices  
23:30 What’s new in VS Code for agentic development  
30:20 Demo: reviewing AI-generated PRs  
35:51 Security: code scanning, secret scanning & autofix  
40:00 Real-world pitfalls & responsible AI  
48:48 The productivity paradox & adoption challenges  
51:32 30/60/90-day rollout plan  
53:05 Azure’s autonomous agent for cloud monitoring  
56:11 Final takeaways  
  
🔗 Links  
• Explore more Live! 360 sessions: https://aka.ms/L360Orlando25  
• Join us at upcoming VS Live! events: https://aka.ms/VSLiveEvents  
  
👤 Speakers: Brian Randell & Mickey Gousset  
  
#devops #githubcopilot #agenticAI #azure #vscode

## Transcript

### Introductions & the evolution of DevOps

**0:00** · Our first speaker is Brian Randall. Um he's a partner for MCW Technologies. Uh he was a Microsoft MVP for over 17 years before joining GitHub for a multi-year stint. Today he's a consultant working for Microsoft and other companies small and large. He's co-authored a few books, most recently Essential DevOps. Um and then our second speaker today is Mickey Sta staff DevOps architect for GitHub.

**0:24** · He is passionate about DevOps and helping developers achieve their goals.

**0:27** · He speaks on DevOps and cloud topics.

**0:29** · And if you don't follow him on LinkedIn, you should because he's always posting these really great short little snippet videos of how to do things you might not have known how to do. So free high quality learning right there for Mr.

**0:42** · Guousay. So thank you. And with no further ado, commence with your keynote.

**0:48** · Thank you very much.

**0:51** · \[applause\] As Angela said, I'm Brian Randall and this is my very good friend Mickey Gusay. We have a lot to cover and the key thing we want to cover here is we're gonna have a lot of concepts and stuff because it's keynote, but Mickey and I are developers first and so we are going to do a couple demos if that's okay with you. Uh that said, the slide deck has a lot of data in it. I will be posting the deck and I will be giving you a list to the resources where I got the numbers from. So there's going to be a lot of numbers and I do mention one study in particular on there that you can quickly Google for or or Bing it. In addition, I have a quote from Microsoft, but otherwise there's a lot of numbers on there that don't have attribution because you wouldn't be able to read it on the slides anyway. Those will be included. So please check the conference website at the end of the week. There'll be a PDF with all that there because part of the goal here as we talk about Aentic DevOps and what that means and how it fits in is for you to go back to your organizations and be successful.

**1:50** · That's our goal here. So to get started, what's our agenda? We got kind of four themes we want to cover. First is the arrival of the Gentech into Zevos. What does that mean? Then we're going to go in and talk about how you integrate AI agents into your workflow. Talk about keeping humans in the loop. And finally, how do you level up your team in a 30, 60, 90day plan? So without further ado, let's get started and talk about the arrival of agentic AI and DevOps. And whenever you talk about this, you first got a level set on what is DevOps. This is my favorite definition that DevOps is the union of people, process, and products. And it's all about enabling continuous delivery of value to your end users. Everything you do in building a software solution. And I know this is a mixed audience. You're not all developers. We got some IG pros in here.

**2:39** · We may have some data scientists. This whole keynote is for everybody. There is going to be a heavier developer focus because that's where we're seeing some of the core initial innovation in AI for DevOps. But DevOps is something that belongs to everybody. as part of the process of both building and delivery, but also deploying and managing and monitoring a software solution. So, literally from idea to a system being torn down, DevOps encompasses that. No offense to anybody in the room, but I really dislike organizations that have a I'm the DevOps engineer. No, DevOps is everyone's responsibility. It is an organizational transformation first. Now so how do we fit aentic into this Mickey? Well well that's a very good question there Brian. So we've come up with or we've found this definition of agentic devops right the next evolution of DevOps reimagined for a world where intelligent agents collaborate with you. And that collaborate word I find is very important because it's not just they're just going to go do it. They're going to collaborate with you and with each other and to optimize and automate every stage of the software life cycle.

### What “agentic DevOps” means

**3:55** · And when we think about this, the idea is that you're going to extend the people on your team through these agents. And the key is both from a interactive experience of the agent, but also the term you're going to hear is autonomous where you can have them do things automatically on their behalf.

**4:13** · So, one of the demos we're going to do at the end for more of the IT pros is Microsoft has them preview what's called the S sur agent for Azure and it has autonomy based upon your desires and what you want to give it to do things on your behalf on a regular basis and I'm going to demonstrate something that I set up yesterday and how that got here today. So, the whole point is you to focus on the work that matters and we're going to talk about some different situations where this plays out.

**4:40** · Understand that we're just like you. I like to stay employed. I've got a 22-year-old and a 19-year-old who are at probably one of the most expensive stages in my life, especially because my mother's no longer around to buy them toys, clothes, um, and pay for the car insurance.

**4:55** · So, fundamentally, I want to stay employed, too. Okay. So I am looking at how that I enable people like you and I'm basically anyone in the technology field to embrace AI safely and yes stay employed so you can pay the mortgage, buy food and you know like a lot of us being an indoor enthusiast although I know some of you are more fit than that.

**5:16** · All right. So, we start looking at how AI is going to be shaping development, right? We've been seeing a lot of major milestones. Now, we have a bias, right?

**5:25** · Vicki works at GitHub. I used to work in GitHub. I have a former Microsoft MVP. This is a Microsoft ccentric conference.

**5:32** · So, obviously, there's a ton of things going on in AI every day. We're going to kind of highlight some things related to the major milestones and how they have affected what we're doing. And one of those is this evolution of agent AI in co-pilot itself. So if we look at what happened at GitHub Universe just a few weeks ago, they announced something called agent HQ. And the idea behind agent HQ is that you will be able to use agents from everyone to do things on your behalf. And we're going to demonstrate that in just a second. In fact, you know what I realized, Mickey?

**6:06** · What did you realize, Brian? These agents, they're indoor enthusiasts as well. So, they don't just know how to run, you know, a flat, you know, 60 really quick. We might want to get an agent started so we can prove to this is actually real and not smoking mirror.

### Demo: GitHub Copilot Agents in action

**6:22** · That's a great idea. Let's do it.

**6:23** · So, if you don't mind, we're going to stop with the slides and Mickey's going to show you how you use GitHub C-Pilot in agent mode from the web. Okay. So we've got this application that we've written that's int net 8. And unfortunately if you look at how we did a lot of our naming in this application we actually put the version of net in the name of the files and the name of the folders and all kind of places.

**6:47** · My bad.

**6:48** · Brian did that. So we want to fix this right. And I could go in there and fix it manually. I could tell Brian to fix it manually but that's I mean that's going to take a while and it's very much drudgery work. So instead, we're going to make use of C-pilot coding agent to help us out with this. And there's multiple ways that we could ask copilot coding agent to do this. And one of them is simply to create an issue, a work item in the repository. So here I have created an issue and I've given it a title, you know, prepared net 10 upgrade and I've given some basic instructions of what I want it to do. Find all the places it finds eight and just remove it so that we're no longer being tied to a specific version of net. And then all I do is come over here to assign assignees and assign it to copilot.

**7:36** · And by assigning it to copilot, it then prompts me with a couple of pieces of information. Make sure I'm in the the right repository where I want it to create a pull request. What branch? I could have other custom agents that I also use for this. I don't have any right now, but I could. And I could also provide other prompt instructions. And then I simply click assign. And then finally, we create the issue.

**7:59** · And by creating the issue in just a moment here, Co-Pilot's actually going to should pop up some little eyeballs here for us to show us that it's actually picking this up.

**8:10** · Are you using Cloudflare on your phone?

**8:12** · I'm not on my not on my phone right now.

**8:14** · There you go.

**8:15** · Oh, there you go.

**8:16** · There we go.

**8:17** · Okay, I'm off.

**8:18** · Oh, co-pilot's unavailable. Service is temporarily unavailable. Please try again.

**8:21** · Did it really say that?

**8:22** · That's exactly what it says. average.

**8:27** · Well, then guess what? We plan for these things. So, by planning for these things, what you actually end up getting.

**8:35** · So, let me go to the other end and we will open up and see the lovely turkey that I met by being Julia Child's is you end up with, like I said, co-pilot comes out here and it's going to throw some eyeballs at it. And then it starts it will go and create a pull request where then that pull request is it's going to start grinding in the background. It's going to start evaluating the instructions I gave it and start looking at the files, start looking at the folder, start making those changes, make doing tests, trying to verify everything works and then it finally comes back with a pull request where I can review those changes.

### Agent HQ: monitoring and steering agents

**9:10** · Why don't you show them go to agent HQ?

**9:12** · So go to the hamburger menu and then go over to agents and go to your past runs.

**9:17** · And what it can show you is that you can get this breakdown of what's going on. First of all, you could interact with it in real time, but also you have the history of what happened in that session. Um, and so one of the things about interaction in real time, you can actually steer it. You if you see it doing something, you go, "Oh, wait, wait, wait. I want to have you do this." You can actually interact in a conversational fashion in that session.

**9:39** · So you could let it be autonomous. just go do the work and then have the reveal when it's done or you can actually be a part of it. It's really up to you. Um any love there?

**9:49** · Oh, look at that. Oh, wait. Yeah, there we go.

**9:51** · Oh, is it running?

**9:52** · It's it's starting.

**9:53** · Okay, it came back. So, he is actually going to run that there. Now, this is a feature that is part of GitHub Copilot when using um GitHub with your code.

**10:04** · Anybody use Azure DevOps?

**10:08** · All right. Who loves you? I love you. So, let me come over here and I'm going to go to my browser and sure we got GitHub, but I've also got Azure DevOps and it turns out that Microsoft is bringing co-pilot agents to Azure DevOps. Now, yeah, I think now a couple things about it. It is in preview and it's what they call private preview.

**10:33** · They did a kind of hey, who wants to try it? And they got guess what? Enormous response from customers like you. So, you can't get it right now today. That said, it's Ignite week. Maybe it'll open it up further. We'll see. But the bottom line is once it's available, what you'll be able to do is you go into your team project in Azure DevOps. And let's make the font a little bigger. There we go.

**10:56** · And what you do is you come over here and yes, there is a GitHub component because it is GitHub copilot.

**11:02** · GitHub is the the center of the universe for Microsoft's developer agentic tooling. Um and while it integrates with different places like Azure and in this case Azure DevOps, you still have to link it up to GitHub. So that is one of the things to be aware of. And what you do is in the world of GitHub, we manage co-pilot agents access on a repository basis. In Azure DevOps, you can have a team project which has multiple repositories. So you have to decide how you want to link things. You'll see I've already done that. I've linked a specific repo on the GitHub side that has C-pilot enabled just like Mickey did. But now I can come over here and just like if I was in GitHub, but now with Azure DevOps, I can say let's create a new work item and let's say add Aspire to reading time.

**12:01** · And we're going to come over here and make sure I'm logged on as the right version of Brian. I am good. And we'll come over here and we will save. And we'll be committed. Do lots of magic. Okay.

**12:22** · And then what I'll do is I'll come over here and we'll go back to work items and we'll add a new task. Now again you could do this with the PBI. I just defends my sensibility to actually have the work associated there. And we'll say add the latest compatible version of Net Aspire. Even though they renamed it to Aspire, I'm still going to call it Net Aspire. SP uh spelling's hard to the web app.

### Copilot + Azure DevOps workflows

**12:57** · If you'll notice right there, all of a sudden I have a copile. And so I will come over and click the dropdown and say create poll requests with GitHub copile. Now it's going to say no work on data available for show the work on content. Try again. Oh, you mean you want me to tell you what to do? Oh, all right. Please add Net Aspire support to the web app and all its goodness.

**13:32** · And of course, the world's not complete without emoji. Save. And now the pull request picks the GitHub repository because your team project can point to repositories. You can change it if you've picked the wrong one. And then finally, special instructions. Make it simple, make it fast, keep it safe, keep it secret.

**14:00** · So, what's happening behind the scenes?

**14:02** · It is talking to GitHub and it is spinning up an agent. You'll see it's right there spinning. What we're going to do is we'll come back and check on this in a little bit. But these are both real-time things. We're both working on the same repo, but it's git. So we've got branches and we've got two agents working on our behalf while we sit stand here and pontificate about the good end of AI.

**14:26** · Switch back.

**14:27** · Switch back to me just a second. are you I just want to show yeah I just want to show something which is so here we are in what we're calling agent HQ where we've got a centralized location where we can see when we kick off all these different co-pilot coding agents what's going on but what I want to show you is you can see here that it's you know going through doing all this stuff uh reading running tests running bash scripts but you have the ability right here steer active session while co-pilot is working so as you're reading through this as this as this is running and doing something if you realize oh I forgot to tell it something or oh, I see I saw it do something. I needed to do something a little bit different. You can add those instructions while it's running. It will pick those up and incorporate those into what it's doing.

**15:07** · Fantastic. And because he showed it, I now have to do it there. Here's agent HQ for my account and it's doing my work on my behalf. So whether you're in GitHub as your day-to-day hosting experience or if you primarily want to use Azure DevOps as long as you put your code over in GitHub, you can get the same Agentics AI experience that we have in GitHub.

**15:30** · And this includes all the new stuff, which means for example, I can have the copilot agent, but I also can use the codeex agent. That's a new enhancement I'll show you a bit later. So let's let this run for a bit and we will come back to the story we need to tell on how you're going to do this in your job. So GitHub universe was a big step because that's where it introduced this agent HQ this extension of the the co-pilot uh agent experience cloud sonnet 45 that was a big thing right when you are looking for agents and you're looking for a way to have these team members be intelligent they're intelligence is driven two ways number one it's driven by the foundation of the model it's using also refer to the big models as frontier models And Sonnet is definitely one of the better ones out there. I am a huge fan of this. I use a lot. That's my personal bias. As I told some people in the previous talk, uh I hang out on Reddit a little bit. And if you hang out on Reddit, you will find people every day who hate a particular model and who love a model. Now, sometimes the people who love it feel like they're astroturfy. Uh but the reality is that it's a personal choice. It really is. You're going to have to use the models with your code and figure out what works best. Okay?

**16:44** · Most of the models work really well with a lot of the most popular languages. Right in the state of the Octiverse report for 2025, the most popular programming language in the world right now is Typescript, which is the compiled version of JavaScript that Microsoft puts out. That's pretty impressive. Python, I believe, is still number two. Um, and then beyond that, it gets there's always a fight going on. Uh, the year before it was really weird.

**17:08** · Terraform's language, uh, HCL was just hugely popular. And believe it or not, Bash scripts are amazingly popular. So, take that for what it is. Um, and the bottom line is developers were seeing this explosion in adoption.

**17:23** · However, not all is rosy because when we start thinking about this, there's some job displacement. And there are some myths here. Now, let's be clear. This is looking at the data we have today. In five years, it could all be different. We're trying to look at a crystal ball.

**17:38** · We know how well it could be because if it was that good, I wouldn't be on stage here. I'd be sipping a pinina colada on vacation because I would have all this money from knowing how to bet the stock market. Okay, but this is the data we have today. Yes, there will be displacement. I had a a a young lady I dated in high school and her first job was working at Wells Fargo in their typing pool. Yes, this is still in the 80s, but they had a typing pool where they got documents that they would sit there and type up. She doesn't do that anymore, thank goodness, because I'm obviously a little older than in my 20s.

### AI models, trust, and human-in-the-loop practices

**18:14** · But what I'm getting at is that this is a continuous process where jobs come and go. That said, AI has been a little scary because it's been so fast, right?

**18:22** · It's been kind of freaking people up.

**18:25** · Anything you want to say about this before I go on? Just the fact that you can is the the fears there, right? We've seen jobs that have been been let go based off of the fact people saying it was related to AI, but then there's also the World Economic Forum is anticipating 78 million new jobs net by the 2030. So, it's not about it's about using these agents and this agentic devops process to work collaboratively with the with the agents to get stuff done. So, you're not going to go away. Now we start thinking about starting an agentic mindset, right? You really got to shift from that very traditional view of writing every line of code yourself, right? And you focus on the more critical things. So a good example is I was doing some code writing which is one of the great things about my job. I get to write code every day and we were making some changes to their website and the website is already in existence. It uses ASP uh ASP.NET uh core um and currently it's on 8.0 0 it uses an SQL server database. So we have some very standard patterns on what we do right we display data they can edit the data we talk to the database we have transactions etc that is the kind of code that once you lay the foundation the way you want you can guide the agent to do a new screen and you can say I need a new screen with these type of data elements etc and it will follow the patterns and you can even use in the case of co-pilot what's called an instructions file you can give it explicit rules around how you want to do things. You can even give it specific subset files based on the data types. So for example for SQL I have some compulsions about how I like my DDL and my DML code to look. For example, I'll give you a simple one. When I have a create statement, say a create table, create table books. And after that, you have a choice where that parenthesis goes. You can put it right after it or you can put on a new line. I'm a new line kind of guy. And so that goes into my instructions. That way when any code is written for me on my behalf by co-pilot or any other agent, it will follow those rules. So you can steer it either in real time like Mickey was doing or you can actually do it um as part of an instructions file. And so what happens is you start looking at that bottom at the developer workflow.

**20:44** · What you're seeing there is define a goal. That sounds like something we do right now, right? Hopefully you don't just sit down, come to work every day and go, "Hey yolo, I'm going to write some code. Uh, what do I feel like doing? I don't know. I think I'm going to write a WPF app. No, you're probably going to have some type of backlog of work that you're doing. Maybe you're old school and you've got post-it notes on the board, right? Maybe using Azure DevOps, so you go in and look at something there. The bottom line is you probably have a work list that tells you what to do. The difference is you're going to maybe be able to do what we just did. take that issue, take that work item and hand it to an agent. Then you review the output. Maybe while it's working on something, you work on something new. Again, this notion of the exemplar, here's how we do something in our application becomes critical to providing that baseline for the application. When we talk about AI and agents and you start implementing AI in your app, we have to talk about different patterns for injecting our well-known data into the equation into the data pipeline. Rag retrieval augmented generation. This is a way to do that by providing these examplers to your app. So then you keep going. You provide feedback. Ah, you didn't do it exactly the way I wanted. Now you can have a choice. Sometimes they'll go, "Oh, I asked you to do this and you didn't do it." Or, "Oops, I screwed up.

**22:09** · I didn't tell you explicitly that I wanted you to use this version.

**22:14** · Well, it's just going to modify code in a branch, make the changes yourself. You can be a part of it or you can have it do it if it's a bigger change. Then you go through agent refineses, human approves, right? Everything that's out here is designed to have you in the loop. So now in the last 90 days, we've had a lot of changes. Um, for those of you living the lifestyle in the Microsoft ecosystem, they have this little tool called Visual Studio Code. Few of you maybe use it.

**22:43** · Now, the great thing about Visual Studio Code is it is for developers, but it's also for IT pros. It's also a great tool for data scientists, people using Python, people using Jupyter notebooks.

**22:55** · It is an all-in-one crossplatform developer and code editing machine that allows you to create and configure things that are going on. Last Thursday, they released the latest version of Visual Studio Code Regular. There's also what's called Visual Studio Code Insiders, which gets updated almost every night and is where you can live for the uh paid sorry for the the coolest features out there, bleeding edge, um that's going on. And so what they did was they shipped that. Now are you doing okay? Did you want to show something?

**23:29** · It is still running.

### What’s new in VS Code for agentic development

**23:30** · Okay.

**23:30** · So still thinking I'm going to pause here and show you a couple things that changed in Visual Studio Code. And again, while it is primary for developers, it's for all of you if you're in it. It's a great place to write Markdown. In fact, it turns out that a lot of people don't realize they have this thing called profile. So I'm going to come over here to Visual Studio Code. And right now, if you look over here, I have the squirrel profile. Now, it's not really the squirrel profile. You get to choose the icon. I've called this my modern base one, which is basically it has all the extensions I use to build a modern.net application with .NET 8 or later.

**24:08** · It turns out that you can have multiple profiles. So, you'll see I have C for video. This was something I used a lot when I was at GitHub and I wanted to record a video. So, I'd had it set up a certain way, certain extensions. I have one here called Dockriter. Let's just pick this one. Now watch what happens when I choose it. My profile color changed.

**24:28** · My tools changed. If we go to the extension, you're going to see a bunch of tools relating to working with markdown. Okay, let's click over here again and let's go to another profile. How about Olama with C? Olama is a local engine allows you to run LMS on your machine.

**24:48** · When I do that, I for example have an extension called continue. This basically is an agent kind of like co-pilot that runs all locally and talks to a llama locally, which means I can work with an AI agent on a plane without internet or anything else. So you can have these different setups. And if you're an IT pro and you're focused on infrastructure code, maybe you have to write bicep. Well, there's a bicep extension. You're a data scientist, you can pick the data scientist profile. So, if I pick one of these profiles like modern bass, it'll show you the extensions I need. And then if we come over here to the other side, what you're going to see is nothing because it turned it off. So, we'll come over and open it up. You have Copilot. And when you work with C-Pilot, you'll see there's a few different things going on.

**25:32** · Number one, generate agent instructions.

**25:35** · when you open it up with some code or some other type of textbased artifact that it doesn't know about, it'll say, "Hey, do you want to tell me anything about this project? Do you want to tell me anything about the way you work?" By default, we store those in the repo, and that's how we can use it. But then, if you come down here, you get that familiar interface. Now, let me just zoom out so you can just see it, right?

**25:54** · It's the typical chat interface. You'll notice that we have a couple things that have changed. First of all, we now have four modes when interacting with it. The existing ask mode is the traditional I'm going to ask a question. I'm going to get a response back.

**26:11** · There's edit mode, which was introduced over a year ago, which was their first attempt in having C-Pilot make changes to the code for you instead of you doing the typing. Then they introduced agent mode. in agent mode runs locally inside the Visual Studio context and will modify the files. But the problem we've realized is developers want more. You want to be able to say go do these 10 things and come back.

**26:46** · And in order to do that, we realize that if we give the agent too much autonomy, sometimes bad things happen. It implements things not the way you want it. So what we found was instruction files. And then we found that how about you create a plan? I'll give you some information and you tell me how you're going to implement it beforehand. And so this this is new addition of planning mode. It'll do explicit steps about what is going on. Okay. Now, couple other things that you can do. Configure custom agents. Well, if you take a look over here, we have this new feature called agent sessions. And you'll notice you have your local chat agent, the co-pilot cloud agent. So now you saw Mickey and I both kick off work via a work item, an issue. We define some stuff, fed it to the agent, and it's up running in the cloud. If I use agent mode and VS Code, by default, it runs locally. It uses my CPU GPU combination.

**27:52** · Maybe I've got a big task that I want some power. Well, it turns out that I can come over here and I can either do it from this screen on this side or I can zoom over here. See that little button down there? I can take the command and it will actually spin it up in GitHub for me. So you have lots of flexibility about where the code runs and how it works. Now going back over here though, I want to show you this other piece of the new announcement.

**28:18** · Copilot works particular way. It has a data pipeline where it takes the request, feeds it up into the Azure backend and it runs through the Microsoft responsible AI pipeline where they look at the input parameters. They then feed it down into the coding model of choice. If it's one of our hosted models, it's all processed in our data centers. If on the other hand, you have chosen for example Anthropics model or say Gemini as an example, it takes enough of the information, sends it out across the wire to their particular endpoint and brings back the results.

**28:51** · Regardless, it takes a look at the response before it goes back to you and it checks it for things like, is this code going to introduce a security vulnerability?

**29:00** · Is this going to introduce some not safe for work content? It will do all that validation as part of the responsible AI pipeline and bring that back through the proxy into Copot and it does this often in milliseconds.

**29:13** · Some people aren't always happy though with the way it's processed. They perceive that for example using OpenAI directly with their agent which is called Codeex is better. Or maybe they prefer Claude. They've tested and found it gives them better results with their codebase. GitHub and Microsoft said that's great.

**29:34** · We're going to give you that choice. And through this new open agent HQ architecture and in this first release with Visual Studio Code, I can now use the OpenAI codeex agent right here from within Visual Studio Code without signing up for an account with OpenAI.

**29:54** · This is included in the box with your co-pilot license and other partners like Anthropic and Google etc. are on tap to bring them there and you'll be able to do this both the Visual Studio Code and sooner Visual Studio proper as well as in the GitHub cloud and again it's all about giving you the choice you need to bring this aentic workflow into your environment. So again, we want to show you some results that this actually does do something. So here we are back in agent HQ looking at the agent session and everything that happened. And you can see we've got a lot of details of all the different stuff that it's done.

### Demo: reviewing AI-generated PRs

**30:33** · Here's where it was doing different renames. It shows you the commands that it's running. And we can actually see it created a draft pull request for us. And we don't have to necessarily leave agent HQ to be able to see the change the files that are being changed in that draft pull request. But at the same token, we can go view that pull request.

**30:50** · Now, here's the thing I want to point out that goes back to your um agents do humans approve it. It as sorry, it put me as a reviewer on this pull request.

**31:02** · So, since I asked this agent to go do all those things that we saw in the in the agent HQ, then it comes back and it says, "Okay, now it's your turn to actually verify this. Make sure the file ch Wow, 77 file changes, Brian. That would have taken you a while.

**31:17** · Yes, it would have.

**31:18** · Um it's but it's up to me now to say, "Okay, this looks good to review this and then be able to take it from a draft to a full pull request and take it through our process where then it might have um checks that run against it to make sure that it builds and tests pass, etc. This is what we want, right? Do things that yes, I can do. I'm qualified, but I do I really want to do it, right? I mean, no offense to anybody in the audience, but for the developers in the room, you're inherently lazy. I mean, who else embraces inheritance, right? Ry once, reuse.

**31:51** · And so, having agents be able to do those things that are repetitive that have to be done for the applications we build because we really haven't hit that nirvana of the 4GL, 5G where you can just write something and it builds it completely correctly without code. We're still building solutions today with code. Now, Mickey did it. Mine is still running. And what I want to show you when you're in a Oh, it just finished.

**32:13** · Look at that. I just got the green check mark there. And I want to show you that you can see how long it took. So, it took 17 minutes and 55 seconds to do what was going on. I will tell you as someone who has played with Aspire. I haven't used it in much anger, but it would not have taken me that long. It would taken me much longer to get that set up. Now, Mickey looked at his poll request and say, "Hey, looks good." What you really should do with any poll request, and you have to review the code, is I should pull it down. and I should try and run it and test it. But you'll notice it even ran my unit test.

**32:47** · It did some checks and all those things. And when I come back up here to the top and go to Azure DevOps, you'll see that no longer does it say Copilot is working, but it tells me my poll request is ready for review right there in Azure DevOps. I don't have to sit there and monitor an Agent HQ if I don't want to.

**33:05** · I can see it there. My team can see it and I can assign other reviewers. They can go through it. By default, the way GitHub copilot works when it's doing work on your behalf, whether it's from GitHub issues or from Azure DevOps or any of the other mechanisms is that the person who started the request cannot do the final approver to merge into your parent branch. Obviously, we want that extra safety balance with the human in the loop. So, that is pretty darn cool.

**33:34** · So, again, lots of changes, Visual Studio Code, really impressive what's there today. And again, I encourage the non-developers to take a look as well.

**33:42** · It's a powerful tool that you can configure for your subset of work that you do even if you don't write code on a regular basis. Now, integrating AI agents into your workflow means thinking about different tools. So, definitely Microsoft and GitHub are focused on how do they bring it to you first in the developer experience, but also in other environments outside there um like the Azure cloud. And this is where we get into this notion of how can the IT pros in life do this. Right? For years, we've been trying to get IT pros to embrace automation, to embrace the motto of cattle, not pets.

**34:21** · Now, what do I mean by that? Mickey and I, we like food. You might be able to figure that out by our body shapes. Um, so cow is something we both like. Oh, you're going to suck it in. Nice. Yeah, I like that. Can you hold that the whole time? Nope.

**34:38** · The idea is simple, right? Particularly in the 90s when I got started and doing stuff for for pay and work and even into the odds. If you set up a Windows server, you had to give it a name. And people often had very thoughtful names.

**34:51** · Maybe this was the Froto server or it was the Ferrari server, right? You had car names, you had various science fiction fantasy names. And so when people said, "Well, where's the files?"

**35:02** · Oh well, you know, go over to the Bezabub server and pull down the files.

**35:06** · Okay, the problem with that is that you've now given it a name. Now you have to care for it. You have to feed it. You have to love it. We don't want to do that. We want to do it through things like PowerShell and other technologies like infrastructure as code. And this is an example where aic technologies can really help you. Who likes writing YAML?

**35:24** · Anybody? Buler, Ferris, JSON, ARM files, ARM files, who likes that? HCL? No, you don't. Right. You want the results. You want the new server stood up the way you want it. You want your cloud deployment to be repeatable. These tools can help you. Now, security posture is another big one. The reality is that we're not doing enough and we're trying, but it's hard.

**35:50** · And so, at GitHub, we have something called GitHub advanced security. And what's really nice about this is that not only does it help you do the right thing, it stops you from doing the wrong thing. Mickey, you want to tell them anything about this? So, yeah. So, with get the two main areas that you should be doing, whether you're using honestly advanced security or some other tool is secret scanning and code scanning. You should be checking to make sure you're not putting secrets in your code. You should be scanning your code to make sure that you're writing good quality code and not doing things like SQL injections, stuff like that. Now, we've had secret scanning and code scanning for a while, but now we started adding co-pilot on top of it. So, now we're doing things such as allowing Copilot to actually tell you how to fix the problem that it finds automatically. So, you want to get ready for that. Yep. So, the key thing to put in context and again this is package as a developer feature because it's GitHub. But remember, if you're an IT pro or a data scientist, you should be using version control as well. And all of us are guilty of doing this. We're going to need to connect to something. A data scientist wants to connect to some data store. In order to do that, you have to provide information about where it's at, the connection string. And then there's that dreaded piece of, well, how do I authenticate?

### Security: code scanning, secret scanning & autofix

**37:08** · And we've all been lazy and said, I'm not going to build the OOTH 2 interactive login experience. I'm going to use a PAT or I'm going to use a password. and you say to yourself, I'm only going to put it in this source file, in this Excel configuration, in this Python file for just a minute. I just want to see if it works.

**37:30** · And then a week later, yeah, what's up, boss? Can you explain this $100,000 AWS bill for our S3 buckets? Looks like we're using 22 terabytes of storage for I don't want to say this out loud.

**37:50** · My mama taught me better. No, you don't want that. The number of keys that get out there for AWS, for Azure, the passwords is ridiculous. Real quick. Oh, yeah. In 2024, GitHub advanced security secret protection prevented over 4.4 4 million credential leaks.

**38:14** · You folks are still doing it. Okay. No, no, not you. I know none of you were doing that because there are 180 million developers on GitHub. Um, but you're not doing it. So, Miggy's going to show you one of the great features that's facilated to the agentic part, which is copot autofix.

**38:30** · Exactly.

**38:30** · So, we have a little saying at GitHub is found means fixed. So if we're able to find a problem in your code, we should also be able to help you fix that problem in your code. So here I've got an alert that we have found with our code scanning, which is database query being built from user controlled sources. And there's lots of information here, and we actually give you a lot of details on how you could go fix this yourself. But let's face it, it'd be a lot easier if somebody would fix it for me.

**38:58** · Well, it would because you know, your developer skills are sometimes questionable.

**39:01** · That is very true. But what we've got is a generate fix button and we simply click that generate fix button and give it. You'll see it's AI is generating fix suggestion. Copilot's now taking the issue that was found looking at the code and trying to come back and tell us how it would potentially solve this problem. And here you can see it's already come back in the alert itself.

**39:26** · It's showed us this is what the problem is. This is how I would fix it. And down here, I even have the ability to go ahead and commit that to a new branch or to an existing branch and then create a pull request and start going through whatever my process is to be able to get that fix pushed off into deployment. And this is a really compelling feature because it's something that you can put into your workflow so that when developers bring code to the server environment, right, when they bring it to the repo and push it up into a pull request, it can run automatically.

**39:59** · I've been playing around with vibe coding and vibe coding is one of those things that you know makes a lot of professional developers kind of get nauseous in their mouth and in looking at this because we know that building things is hard. The idea that you're going to sit down and yolo stuff and ship something for production, you know, you can vibe code, but can you vibe debug it? Well, I've been having fun with it because I wanted an extension to help me manage my URLs. My name is Brian and I have a bookmark problem. Um, I am one of those people that will have multiple browser sessions each with 30 tabs open and you know there's some good stuff. I really will get back to read it and so I thought it'd be great. Hey, let's learn how to write a extension. So I thought I'd do it in Chrome and of course that means JavaScript and while semicolons are there for my C bias, it's not the same. So I said I'm going to vibe code it and I started doing it. I was using Cloud and Cloud's really good.

### Real-world pitfalls & responsible AI

**40:52** · I even had codeex review the code that claude wrote looked good. I pushed it up to GitHub. I have advanced security turn on which by the way GitHub advanced security is a paid product for private repos. But if you do public, so you want to just do it for fun or you're doing open source, you get it for free. I have it turned on. Guess what it did? It found a URL injection attack in my code.

**41:22** · multiple times.

**41:24** · So, I used two different smart AI agents and they still screwed up and GitHub had my back. So, this is something that is super compelling to help you not only prevent secrets from getting in, but preventing bad code from getting into your application. So, this is really great stuff. 4.4 million, that's a huge number. I can't wait to see the figures for 2025. I pray they go down. I don't think it will. In fact, I think it's going to go up in the name of vibe coding. Um, reduction of security review times. If you save half your time on security review, that means you're shipping faster, means you're delivering value faster. Um, and of course, faster vulnerability fixes. If we find a pattern, we can help you fix that. All this means that we need to have humans in the loop, though, because even though the AI is really smart, it's far from perfect. And we are the ones that know our application domain the best, right?

**42:20** · We know how our application is used. We know the critical aspects and we also know when not to goldplate. One of the downsides to AI sometimes it's like, oh, you've asked me to do that. Sure, I'll do. And you're like, I asked you to change one file, dude. Um, so we really got to make sure the human's in the loop. And so we think about this starting with security first. And so this idea that you're going to generate code, but you're going to go through this multiplestep process of taking that idea and that code and getting it all the way to step 10 where you can do that continuous monitoring. When we think about security best practices and warning signs, we've got kind of a list for you here. And it looks like I got a little wrap there. U but the bottom line is we see some warning signs, right?

**43:03** · Ignoring the happy green check boxes, as assisted commits are merged four times faster bypassing reviews.

**43:12** · That means people are trying to look more productive. And one way they do that is they use AI and then they just say, well, I'm sure it's awesome, right?

**43:21** · Because this is the latest and greatest model. \[clears throat\] Okay, the next one freaks me out. 322% more privilege escalation paths in AI code. Again, here's the internet. Rainbows, unicorns, kittens, puppy dogs. Over here, things we don't talk about imply company. The frontier models are often trained on all of that. And when they're even distilled down to be focused on code, there is code that has been trained on that isn't necessarily always the best.

**44:00** · Okay. Now, that's why Copilot works really hard to look at the inbound and outbound that's going on. You don't necessarily have that guarantee with every IDE and every a enabled tool out there in the industry. So, be aware of that. More design flaws and 40% increase in CRI secrets exposure risk. I can tell you from experience multiple times as I've been working with the various agents to test things out, I have had it more often than not offer the cheap and easy way of authentication passwords and pats over the more complicated but safer ooth or other type of authentication format. Be aware you have to have your your uh eyes wide open. So start with logging and this is beyond the normal application logging but you got to think about AI enabled logging. When you start thinking about what to log we've got some categories for you in some different areas. Again you'll get the slides you can go through the details but ultimately you need to be tracking and monitoring what's going on. YOLO is not going to cut it in production and real applications.

**45:06** · No I've got nothing to add to that.

**45:07** · That's 100% correct.

**45:08** · Okay.

**45:08** · There's various tools. For example, GitHub has very rich audit logging. Um, you go the other extreme, there's tools like Splunk, um, and, uh, Permit.io and all these tools that are designed to help you data mind your logging information. Um, and this is going to go across the board and this has to be part of a cohesive strategy as you roll out AI into your organization.

**45:32** · You got to think about the various compliance frameworks as well, right?

**45:35** · This is a place where for example picking a company like say Microsoft or Amazon might be better than the latest startup who isn't necessarily at that point where they're investing in compliance and this might be anything from soft compliance to HIPPA right the number of bad things I've seen in organizations without AI related to HIPPA freaks me out to think of what they'll do once they add AI to the puzzle right because AI is driven by data it's ultimately a data problem now we start looking at AI versus human control, right? We want to have the appropriate automation, but make sure that the human maintains control where necessary and there's a lot of different places you're going to look in there.

**46:15** · When we get to this on the data, right, we have some interesting numbers, right?

**46:19** · They don't plan to use II for deployment and monitoring, right? This is a lot of stuff I've heard for years in the IT Pro community when it came to doing things like automated database deployments, right? I know lots of DBAs, the deeders, the debies of the world that will not let developers use automated deployment tools. They require that you provide them with the SQL scripts and they will look at and they will manually deploy them themselves.

**46:45** · We're going to run into the same friction with using AI for some of this stuff, right? Uh project planning, uh preserve mental energy during repetitive tasks. There's some good and there's some bad. The key thing is coding is not typing, right? It's much more than just that. And so as we embrace AI, we have to be careful that we don't bring the AI slop to our application process.

**47:09** · Here's a set of essential human controls, right? Performance optimization, security, threat modeling.

**47:15** · You really need to be actively a part of this situation. Now, where is AIXL?

**47:20** · Right? Here's some stuff we found in 2025. This is based on the data. Again, I will give you links to the resources. Everything from 30% average code acceptance rate, 84% increase in successful builds. AI is really good at some of those things where it can find syntax errors. Oh, you forgot the slash. You left out a colon, right? These are the little pieces. It's good at that.

**47:43** · Right? Concepts and architecture, it might need some help. In fact, when we start looking at where it struggles, right? those complex architectural decisions, it doesn't always know because the way it's trained, it's looking at the results of what someone or some set of people did. You start looking at things like edge cases for handling training data. Uh thinking about what is considered responsible AI for your organization, right? When I work at GitHub and Mickey works at GitHub, GitHub in certain parts of the company, you know, people don't care if you use a little not safe for work language, right? In other companies, that's just not done. When you build a system for your customers, you have to understand what their tolerance is to that experience, right?

**48:25** · You have the extremes where Elon Musk and what he's offering through X AI and and and Grock and stuff is, hey, we have these, you know, more adult modes, whereas, you know, if you're enabling AI for your local church, you may really want to make sure it's it's well behaved vocally as well as other formats, right?

**48:43** · So again all these things require you the human to be invested in the experience. This is where we get into this meter study which talks about the productivity paradox. We have the expectation that AI is going to help us go faster.

### The productivity paradox & adoption challenges

**48:58** · But sometimes you have to go slower to go faster because you have to do it safely. Right? The Germans have something called the autobond. The Autobond is well known because there are parts of it that do not have speed limits, which makes people think, "Oh, all right. I want to go there and drive as fast as I can." But every German who holds a driver's license knows that speed is only a partial component of being prepared to use the autobond effectively. And one of the thing is recognizing your skills.

**49:32** · How fast can you drive based upon your experience?

**49:36** · based upon your tolerance for pain and suffering if you screw up and understanding the law. For example, you're not allowed to drive in the fast lane unless you are going fast. And the expectation is you're only there to pass. Those are rules that have to be respected by every driver. And so when we think about how we're going to work with AI, you're going to have to find out what your tolerance and trust is.

**50:03** · And so therefore, we're finding people are slower on average. They think they're faster because they see things spinning out. They see more files generated. It's that feeling of paper pushing where I'm really busy. I'm really busy. I move the paper on this side of the desk over here, this paper over here. Right?

**50:21** · And some people are saying, "Yeah, I'm using AI, but it's not having a real effect on my ability to ship the features I want with the quality and what I want." So, it's not all roses.

**50:31** · There is some data out there that says we need to think about this. And so we're really seeing this trust gap and having to really deal with the fact that we need to build up the trust based upon working with it on a regular basis in our domain. You don't have to be on the latest piece of AI technology to be using AI. Just because a new frontier model comes out doesn't mean that that's the one you all switch to. Because anytime you adopt a new tool means you have to spend time learning how to use the tool, right? You might see the latest and greatest uh you know kitchen tool and so you go spend all the money because some chef like Emerald says, "Oh, it's going to help you make this great meal." And you realize you can't make the meal with 10 of the greatest tools because you don't have the skills.

**51:17** · So be aware of that. So the bottom line, our key insight is AI is powerful but not magic, right? you're really going to have to invest in how you bring it onto your team just like you would invest in bringing another human onto your team. Now, as we start thinking about 11 up to success, we start running into this 30 60day, sorry, 30, 60, 90day playbook.

### 30/60/90-day rollout plan

**51:39** · And so, we've written down some ideas on how you can approach your first one to 30 days, how you can go on to the next level of 31 to 60, and how you can do it on 61 to 90 where you really get into the optimization. And the idea is that you're looking for these metrics. You want to look at progressive success where you're seeing real return on investment but not necessarily boiling the ocean. Right? That's one of the big problems I've seen with people when they approach an agent. They give it too much at once. Break down the work very much like you would as a human. Now, when we start thinking about adopting AI, we start looking at how do we upskill in our different roles. And so, again, we've got some different breakdowns on what you can do as developers. One of the first things is learn how to write good prompts. The number of people that will write one sentence and expect magic from AI don't get the results they're looking for. You need to think about being articulate. And in fact, when you are articulating what you want in a question, this is where actually having decent language skills works out. You know, the joke is, you know, I'm a developer. I'm not an English major.

**52:39** · Well, it turns out the better you can write, the better results you're going to get from your AI, your code review skills, security awareness, all these things matter. DevOps engineers, I don't like the term, but the reality is that I know it exists in organizations, the people that focus on really building the pipelines, maybe under the ones that understand infrastructure as code, etc.

**53:00** · There's a lot of different things you can do there. security teams, threat modeling, incident response, and in fact, let's talk about instance incident response and how you might be able to monitor your code. So, for this last thing before we get wrapped up here, we're going to go over here to Azure. And Azure has this new feature called the S um agent. And this agent is in preview.

### Azure’s autonomous agent for cloud monitoring

**53:26** · And what you'll see here is once you configure it, you specify what you want to monitor. So you can come in and you pick what's called a resource group. And a resource group is a container in Azure that you use to bring things together. Web services, containers, databases. So you'll see I have a couple available.

**53:45** · I'm already monitoring one. So I could add another one. And you'll see that over here I have activities. The one thing is I can chat with it. But more importantly, it'll go through and do things like incident management. when it finds something happened, it can actually be given the permission to be autonomous and try and fix it. It also can come through here and provide me with reports. So you see I have a report from yesterday. What this is telling me is that it went through and did not find any security issues or incidents and that my current app group that's monitoring is healthy and it provides me with all this data on a regular basis.

**54:19** · So, I now have this site reliability engineer that is on my team that I've given autonomous ability to monitor and alert me when something goes on. So, rather than me having to look for an email notification or god forbid the old pager or my phone, I have this rich report and this tool that's constantly checking on behalf and I can give it the rights to fix certain conditions. This is available in preview. If you're using Azure, you should take a look at it.

**54:48** · It's easy to set up and play with. And so we start thinking about how these agents come in. We start looking at how we find the drudgery. We find the things that take a lot of time but have to be done. And instance response is an example. Better yet, get your sea levels to upscale, right? They need to understand that AI isn't just about saving money and about replacing the humans because this whole idea of keeping the human in the loop means they need to use AI effectively and you need to be trained. So we've got this idea behind learning resources. everything from Microsoft learn certification programs the community and things like LinkedIn learning and coserup then we have these patterns that we've got for you the interrupt and resume pattern the human as a tool pattern it's not as bad as it sounds uh an approval flow pattern and then a fallback escalation pattern these are different ways to inject AI agents and agentic workflows into your DevOps platforms we have a bunch of critical decision points and approval requirements that are also relevant and when we think about collaboration.

**55:47** · There's these big three here. Human in the loop, human on the loop, and human out of the loop. Let's be honest, the first two are where you're going to be actively involved in a part of the process.

**55:59** · Human out of the loop means you have established a workflow where you trust the AI to do the right thing on a consistent basis. I currently have nothing that I use that is human out of the loop. Five key takeaways. Number one, start Monday with an action plan.

### Final takeaways

**56:16** · go back to work and think about how you're going to do it. Security comes first. We cannot increase that number every year with the number of uh secrets that we find in things like GitHub advanced security. Keep the human in the loop. AI suggests humans decide.

**56:34** · Measure everything. Right? This is a critical point in the transformation of how we build and deliver solutions and monitor and maintain them for our customers. It's how we deliver value as developers, as IT pros, as data scientists, as DBAs. Focus on value. It's that continuous delivery of value that's going to keep us all employed, not how many lines of code we can generate with AI.

**57:02** · So, you got your next steps, your final thoughts, right? It's a transformation. It really is. You can be a part of it or you can stick your head in the sand and say, "I ain't doing AI." You're probably not going to do very well with that. You're going to find on the slides our contact information. Like I said, I have a free copy of the book to give away.

**57:18** · You can harass Mickey, especially if you need some help with GitHub. Thank you so much for attending this keynote. Be good humans. We'll talk to you later.

**57:31** · Heat.

**57:37** · \[music\] \[music\] Heat.