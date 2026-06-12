---
title: "Is AIOps the Future of Operations? Real Use Cases From the Tre... Iveri Prangishvili & Danilo Banjac"
source: "https://www.youtube.com/watch?v=-aA8j4uUiBo"
author:
  - "[[CNCF [Cloud Native Computing Foundation]]]"
published: 2026-04-14
created: 2026-04-14
description: "Don't miss out! Join us at our next KubeCon + CloudNativeCon events in Mumbai, India (18-19 June, 2026), Yokohama, Japan (29-30 July, 2026), and Shanghai, China (8-9 September, 2026). Connect with our"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=-aA8j4uUiBo)

Don't miss out! Join us at our next KubeCon + CloudNativeCon events in Mumbai, India (18-19 June, 2026), Yokohama, Japan (29-30 July, 2026), and Shanghai, China (8-9 September, 2026). Connect with our current graduated, incubating, and sandbox projects as the community gathers to further the education and advancement of cloud native computing. Learn more at https://kubecon.io  
  
Is AIOps the Future of Operations? Real Use Cases From the Trenches - Iveri Prangishvili & Danilo Banjac, Adobe  
  
This session presents real-world AIOps use cases at Adobe, demonstrating how Agentic workflows can automate on-call tasks, streamline issue diagnosis and drive continuous improvement. Attendees will gain practical insights into building autonomous agents for operational space, leveraging AIOps for scaling operations and reducing manual effort.

## Transcript

**0:00** · Thank you all for coming. My name is Danilo. For the past five years, I've been at Adobe uh as part of the cloud infrastructure team. For the past year and a half, I've been working on AI ops.

**0:12** · So, what all the fancy stuff you saw today, we are trying to apply to our business to scale better and faster. So, I will start with setting up some context. So today we operate across more than 70 clusters, more than 20,000 namespaces with more than 200,000 services. So to be able to scale all of that, especially for the on call engineers, we need help. So we can either bet on humans or bet on agents.

**0:46** · Uh at the moment, our money is all on agents.

**0:51** · So basically when we started we had a couple of requirements that we wanted to meet. The first one was to scale. So we wanted to scale faster and better. Then reduce MTR. So this is meantime to recovery. So basically when the incident happens we want to as quickly as possible have the RCA with some recommendations uh proposal fixes and be able to run them.

**1:19** · and then at the end reduce the on call toil. So as you can imagine you did the on call all of you and uh when you need to do it you need to get your hands dirty look into different systems like a splank prometheus uh correlate these metrics and uh fix the issue or follow the runbook to fix the issue. So we want to save this time and use it for something else to innovate or build something new and uh not spend time looking at logs or metrics. So that was our kind of core requirements that we had at the beginning. Then how this whole agentic AI fits into the whole picture is basically as you know and as I mentioned we started with logs metrics release day uh release data knowledge bases all this information then as it was done for the past god knows how many years we did uh doising cleaning that data anomaly detection correlating with other systems and um that was it. Then we had the deterministic algorithms and by that I mean uh we can observe uh metrics and see if let's say there is a CPU spike and then we can just um basically scale up and uh this was pretty deterministic and it works for some use cases but not all where the agentic AI comes in is uh for the nondeterministic use cases. So that means that while deterministically we can cover some cases, majority is still needs the RCA investigation, pull up this data, pull up that data, get the runbook, uh figure out what to do and provide the recommendations for the alert at hand and then at the end route this all through the on call and actually help people resolve the issues for our customers.

**3:14** · So some results that we gathered for the past months. Uh we have a 550 automated alerts per month. So it's around 30% of all alerts for AM. Uh that maps to approximately 91 hours of engineering time, probably more, but we were kind of letting it be. And uh basically our accuracy of the RCAs is at the moment measured at around 71%.

**3:43** · And I will explain later how we measure this accuracy and how we uh evaluate and improve.

**3:51** · So basically when we started building this on call agent or agents at the moment uh as you all know and heard it 100 times today we need uh capabilities like tools. We need a knowledge base to give it some context to ground the answers and we need some kind of agentic loop to do some reasoning. It can maybe formulate diagnostics uh figure out service dependencies and uh much more. But what I want to speak about here is the autonomy spectrum that you can see. So when we started like as I think many of you did we wanted to agents to be like a fully autonomous fully flexible they can do bunch of stuff they can pull uh this data write splunk acquiries do all of this and then basically give you the RCA and as you can imagine it did not really work uh and and uh then we tried a completely other spectrum like deterministic tools very narrowed cases but that also doesn't scale because you would need to build an agent or a tool variation per alert and then it doesn't scale basically. So the middle ground is somewhere in between as you will see. So it's not a fully autonomous run everything go crazy but it's not as well per use case it's it's somewhere in between.

**5:18** · So what the interesting part is how we built this whole infrastructure all all the agents that are doing the RCAs and uh performing the analysis.

**5:29** · So what we built is what we call the uh agent marketplace. So if you can imagine AM is a vast product. It contains a lot of subsystems, a lot of components and having one agent to troubleshoot this was not possible. So what we envisioned is that let's build a playground for teams that we call marketplace where you can very easily on board your agent that can cover certain aspect like a CDN or replication or whatever team you're coming from and uh provide this as a knowledge to our team of agents so that when the next alert comes uh it can be properly routed to this agent and the answer is much more narrowed. uh for that topic. So as you can see we built this marketplace and uh in order to scale faster and not rebuild everything from scratch with our partners from Microsoft they help us to kind of using best practices derive the best infrastructure to scale this and uh how it's working now since the beginning is that we deploy our tools as MCPs to the Azure functions we deploy our agents to the Azure foundry and our knowledge bases this to the Azure AI search marketplace is a binding of all these features together. So when you create your PR, you merge it to main uh we start the pipeline. The pipeline gets the YML of the agent uh builds the knowledge base, builds the toolings, deploy the tools and then at the end you have everything running on the cloud.

**7:08** · And today it takes maybe half a day to spin up the agent for a specific use case and teams can scale faster on board their use cases and provide this functionalities to the overall team. One component I want to add on top is the API gateway. So this was a big topic for us because at the time when we built this uh MCP was new uh it didn't support authorization and it was really hard to properly make sure that the agents cannot do outside of of their boundaries that everything that they run they run on the user authentication and that wasn't very easy to do. So what we do at the gateway level is that we get the user octa token. We use octa. You can use any other IDP. We validate the token and then we propagate that token all down the chain so that when the agent is running tools it's running on your authority and not on someone else's.

**8:06** · There are no master accounts super powerful pseudo users or something.

**8:10** · Whatever you can do the agent can as well do. So that was the the the big and hard requirement that we had since the beginning.

**8:19** · Now I just wanted to show you how an agent looks like on the marketplace. So basically as you can see you have a name description which is just a description and instructions is a system prompt. Uh you specify the tools we have a different types of tools. I didn't want to confuse you. So I use like a file search is a rag basically. Uh metrics tool is the tool built on the marketplace and it it has type of the marketplace tool. Uh we have different types of tool like a code interpreter.

**8:49** · In that case basically uh together with the agent we would deploy a sandboxed environment where the agent can run code. It cannot call any services. So it has no access to the internet but it can run some scripts if necessary internally so that maybe calculate something or analyze a CSV or whatever you upload.

**9:10** · And then the interesting part is at the bottom knowledge basis. So what we do basically is that you link it a GitHub repo. We have our internal runbooks. We have a bunch of stuff that we want to expose to agent code. You just link it and then when the deploy step comes, it will index all of that knowledge into the agent and it will keep it in sync.

**9:29** · So basically when you change something in your repo or your knowledge base, it will keep that in sync and the agent will always work on the fresh set of information.

**9:42** · So now we come to this specific on call agent that I want to discuss. So basically what we do is with the Prometheus we scrape the Kubernetes metrics and uh when the alert comes we have a two different ways. one we ping the on call shift to investigate and then the other shift is uh we trigger alert handling be if we know exactly what this is the small set of solutions that I mentioned at the beginning that if we know exactly what needs to be done we can do it deterministically like maybe scale up or down or whatever that was done before but now we have this extra part which is a gentic automation so what we do is basically when the alert comes we dispatch the alert to the on call but at the same time in parallel the agent is doing the RCA. So the agent is picking up the alert it is pulling uh different uh so the orchestrator comes in it is pulling different sub aents they provide their perspective their uh they pull data from different sources like Splunk Prometheus as I said knowledge bases and then they provide the RCA all together on Slack. So that means that when you see the alert on Slack, you see the RCA of the agent and then below you see the recommendations that they recommend you to do and um then the uncle shift can pick up from there maybe even continue the discussion in the thread and uh solve the issue much quicker than before because before you need to do all of this from scratch and by hand.

**11:14** · So what the uncle call agent goal is doing is to basically gather all of these information metrics logs everything find the root cause if possible so identify what is problematic with the system and then at the end provide the resolution steps and the links to the relevant documentation.

**11:34** · Where we are going with this is that hopefully even in a couple of months we want the automatic remediation with the human in the loop. What that means is that if they see that the pod is stuck, they can delete it. But the encore shift needs to approve the action. So this is where we want to go. Maybe for even some actions that we are certain cannot cause the damage to the system, we can just let the agent do it. But I personally still prefer to uh run everything by a human eyes and then confirm the mutable actions.

**12:07** · Then basically when we build these agents there are two topics on which we iterated the most. These are tools and knowledge bases. Everything else we let to Azure so that we don't think about where the agent is running. Uh this and that we can focus on the business logic and the business logic was toolings and knowledge bases. And what I would like to share with you is some useful findings that we got on the way. the stuff that can work and may not work or can be better. So for the I will take for example the metrics tool at the beginning it was super broad you it was composable adaptable uh the agent has had a high agency meaning it could run arbitrary Prometheus queries look into the system. Our idea at that time was okay if we give it the right runbook he will figure out which Prometheus plank query he needs to run then he would write that and run and it was super dynamic but it didn't really work. It was unpredictable. So every time the same alert would come it would take a a different uh trajectory. It might as well do a 10 different queries to figure out. So it was polluting the context.

**13:27** · Maybe one metric was good, one bad. It would then shift the direction completely and then two out of 10 times would actually give the useful answer back. So what we do and this is I will now go back to the spectrum. I said we started with like a fully autonomous did not work. We are now moving back and what we did is if you think about it as a human when you get the alert you open let's say graphana dashboard and then you see graphs and charts and tables and try to correlate blah blah blah and you are not looking at the raw data and that was our motivation behind these types of toolings is that we kind of provide a report to an agent so the agent gets some kind of already curated report with described metrics so that they can immediately see the whole picture from just one tool call and not imagine expensive Prometheus queries run 10 in a row or or concurrently and then and then at the end get nothing out of it. And this has like also drawbacks but for our use cases it worked pretty well. So it's less agency. So that means that for some super weird edge cases it might not be able to find it but uh we are happy where we are today with this kind of approach.

**14:54** · Then that means that uh we encode this autonomy with deterministic tools and we try to limit the scope by filtering out the noise. Uh avoid polluting the uh context window. uh limit data types and the set of tools that are available and uh with um some other techniques we are really trying to make them not that much autonomous but at the same time not that much strict somewhere in between was our kind of rule of thumb.

**15:29** · So now the same thing applies to the knowledge bases. If you if you can imagine like uh no one here can tell to me that they have a very good runbooks.

**15:41** · So usually they're okayish uh but they don't cover each case or they're not updated regularly and that was as well a a problem for us. So so basically there what we did is as I showed we created a super curated knowledge basis where we pull all these different things. we try to improve it. We let the agent run the loop, provide the RCA, then we store this RCA in a GitHub repo so that the next time the agent runs, it has that knowledge. So it's it's never performing the analysis twice. It will do the RCA if the RCA gets into the golden data set and I will show that how it happens later. It will be reused next time. So as you can imagine we have um thousands or hundreds alerts per day and doing the same thing each time would be expensive.

**16:35** · So we don't want that to to to uh to happen.

**16:39** · So then I come to the point I was saying uh I was saying and this is the automation evaluation. So basically what we do is we collect the engineering le investigations and actions per alert and compare them with the AI responses. So we are creating this data set so that we can see how accurate we are what we can store and reuse for the next investigation and what not and as well collect user feedback because it's all happening real time on Slack. we can see what the people are chatting about and uh derive some uh useful information from these uh chats. And this is how we create as I said this golden data set that we store again as a knowledge base so that the next time the agent runs can just pull the same information and uh provide the RCA faster as well. really important thing is to basically uh build the trust. So what we want is that the agent not only gives you the answer but as well gives you the resources from where it got these answers. So for example if it says okay I see uh this metric spike take a look here or I see these kind of logs in Splunk take a look here. And uh that means that uh the on call engineer can at any time always go back to the resources that were mentioned or the runbooks and assure that that the correct flow is used that the correct queries were ran and uh basically just double check what the agent does. And this enables the handover perfectly from the agent to the on call engineer. And um at the moment we integrate this handover across a different suite of a client applications. We have a um CLI chat that you can chat with our agents on the marketplace. We have a Slack integrations that you can configure per channel. So if your team on boarded uh two agents, you can call them from your channel and then they would automatically perform the analysis on users questions or whatever. Last month we added finally the UI because a lot of people especially um further away from engineering were requesting, oh I want a UI, I need a UI. And then we did finally the UI behind the whole marketplace that basically uh allows people to you can just ask the question the uh coordinator agent will just dispatch to the right team or sub agent and you will get the answer for whatever uh troubleshooting uh case you have at hand.

**19:40** · And now we come to something we call a progressive autonomy. So we didn't start with immediately agent recommending actions like we needed to start somewhere and uh the first step was just the agent doing the RCA. So that means that it would look at these metrics uh logs and then would say okay I think this is the problem that's it and then from there what we did is we added the recommendations. So we improved the runbooks, improved the tools and then the agent started saying okay I see that you have a CPU spike you can run this cubectl command that I got from that runbook to fix the issue. This already helped our teams a lot so that they don't need to look into the systems think what needs to run they can just run and uh lastly what we want now to happen is that they can basically perform changes and it's what I said at the beginning so first we want to basically confirm this by human so when the alert comes on Slack the RCA is there but then there is the action okay do you want me to delete this pod yes or no or do you want me to scale up this environment? Yes or no? And then hopefully for some very simple and narrow cases, we might potentially be able to just let the agent run the command without the human consent. And as you can see in this loop, we are always curating this postmortem database or knowledge base which is then again read by the next iteration. So the agents are kind of self-improving each time they do the RCA.

**21:22** · And basically lastly some takeaways. So as you can see we latched on Microsoft a lot. This is because we don't want to build the same stuff. Uh we need a place where uh we can run our agents. We don't need to think about uh monitoring observability uh prompt shields. This all comes out of the box. we can set it up uh adjust but we wanted to solve the business issues and help the business grow and scale and this is why we made certain decisions the way we did and uh basically one more important thing was the authentication on the tool level everything that the agent runs runs on your permissions so there is no way that it can do stuff or see logs that you cannot see that was for us and from our legal department very important thing to happen and uh basically as I said 80% of our work went on building good tools and providing good knowledge bases so that they can basically run and provide us a good RCA in return.

**22:29** · So I think that's all for today. Thank you very much.

**22:38** · I think we have time for some questions.

**22:40** · I think two minutes are there. I hope that's fine.

**22:44** · Yeah, there are. Yeah. Yeah. Yeah.

**22:57** · Yeah.

**22:57** · I just wanted to ask um first of all it's interesting how do you implement uh alert to agent routing? Is it just hardcoded? So you know that this alert is handled by this agent or so basically we have internal systems that bridge the gap between Slack and the agent and these internal systems developed by the internal teams allow us to cross that bridge. So they can in a web hook manner tell us that this alert is coming in and we can attach our agentic flow on that web hook so that we can fully propagate the information to the agent and uh let it run and then they all work on slack. So basically the alert comes on slack we get the web hook call and we provide our response on slack as well.

**23:50** · this uh system for bridging as I said it's done by internal teams.

**23:56** · I see. Thank you. Uh if anybody else question thanks for the talk. Uh I am not on the SE now but this is something I have dreamed of uh five years ago. Um anyway uh something that is not super clear to me. You said that when the event alert fires you dispatch it to the agent to do the troubleshooting. But you also said that uh everything the agent does is done by your permission. So while human is still not involved whose permissions are uh used.

**24:31** · So you mean you mean on the on the slack route?

**24:35** · Yeah. Yeah. While while the agent is working on the RCA autonomously before the human gets into the loop um in this parallel.

**24:46** · Yeah.

**24:46** · Yeah.

**24:46** · Yeah. So we have a two different or three different entry points for this system. One is CLI over CLI and UI we do a complete user impersonation for the Slack route. We have I can show you later we have per tooling our own authentication and authorization which is happening with the kind of persona that we built for the RCA specifically. So we restrict the uh this persona to perform only certain actions and we and we validate this at a tool level. So we kind of fake a user for this case. But if the person continues chat then it runs on the user's behalf.

**25:31** · But for this initial RCA we have a persona which has a very limited and strict access that we again validate on the tool call and through the whole chain. That's a good question. Yeah.

**25:42** · Yeah. Got it. Thanks. Thank you.

**25:45** · Uh thank you very much for your speech. I have one question about how did you evaluate the performance of your approach? Maybe some maybe you can share some metrics uh approaches to check the quality of answers of your agents.

**26:00** · So sorry I well so so so basically as I said we built this golden data set and we get this information from Slack because on Slack we can see the alert we can see the RCA and we can see the discussion between the uh uncle engineer and the LLM and then we use another LLM to evaluate the discussion and tell us whether using another LLM. Okay. Yeah. Yeah.

**26:33** · Yeah. Yeah.

**26:34** · Thank you very much.

**26:34** · Yeah.

**26:37** · Hi, I'm Eduardo. I'm from Swiss based in Durich. First of all, really great talk.

**26:43** · Thank you so much. Great stuff. Uh my question is a few slides ago you showed something where that had a post-mortem database basically that you're feeding in more more basic basically pseudo training data for the next sessions that come in after my question is how do you prevent from that postmodern database from getting too big or getting too much context that might not be that useful for the next sessions that are coming in because that part is done manually right so we don't automate that part we do it manually as I said with this golden data data set, right?

**27:15** · We run the evaluations ourselves and then update the golden data set. This is the only way or only part where we are not dynamically or autonomously doing because we tried this and it didn't work out well. So we needed to put a stop there and uh run this on a two free daily basis or weekly basis and so it's the refinement process of the prompt. Let's put it this way. It would be manual.

**27:43** · Exactly. Yeah.

**27:43** · Okay. Yeah, thank you.

**27:44** · Thank you. I think I think that's it. But uh yeah, just Yeah, thank you for the thank you for the talk. It's really exciting. I just have another question.

**27:55** · Uh can you maybe tell a little bit about how you structure the knowledge base? Is there any like magic source or it's just empty files?

**28:05** · Uh this is a specific one because you have a chunk size and stuff when you index stuff. So especially for the runbooks, huge runbooks will be split into chunks and that wasn't great for us because it can match a similar commands from five different runbooks and these chunks would be added to the context and it wasn't really giving accurate responses. So we reduced the sizes of the runbooks per very concrete use case.

**28:34** · So this is one learning that we did during building of the knowledge bases. to just give it a bit less tokens so that maybe ideal runbook can filter in a single chunk of maybe 5k tokens or uh 4k tokens. Yeah.

**28:51** · Okay. Thank you. Nice tip.

**28:53** · Thank you.

**28:54** · And one quick question. Uh in what form do you write this golden database of?

**29:00** · It's markdown.

**29:01** · No. So no vector database.

**29:03** · No, no, no. At the moment because we curate it ourselves, we push this to GitHub repo and link it back to agent. So we curate this ourselves with the just markdown and then it gets indexed into the vector database.

**29:15** · Okay. Thank you.

**29:16** · Thank you.

**29:18** · I think. Thank you.