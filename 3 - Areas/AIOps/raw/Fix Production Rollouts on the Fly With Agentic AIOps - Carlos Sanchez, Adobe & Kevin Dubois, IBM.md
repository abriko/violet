---
title: "Fix Production Rollouts on the Fly With Agentic AIOps - Carlos Sanchez, Adobe & Kevin Dubois, IBM"
source: "https://www.youtube.com/watch?v=wxRDMmiDIU4"
author:
  - "[[CNCF [Cloud Native Computing Foundation]]]"
published: 2025-11-25
created: 2026-04-14
description: "Don't miss out! Join us at our next Flagship Conference: KubeCon + CloudNativeCon events in Amsterdam, The Netherlands (23-26 March, 2026). Connect with our current graduated, incubating, and sandbox"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=wxRDMmiDIU4)

Don't miss out! Join us at our next Flagship Conference: KubeCon + CloudNativeCon events in Amsterdam, The Netherlands (23-26 March, 2026). Connect with our current graduated, incubating, and sandbox projects as the community gathers to further the education and advancement of cloud native computing. Learn more at https://kubecon.io  
  
Fix Production Rollouts on the Fly With Agentic AIOps - Carlos Sanchez, Adobe & Kevin Dubois, IBM  
  
Your software rollouts to production are probably always flawless, right? For the rest of us, once in a while we do run into issues when releasing code to production. Argo Rollouts is a great tool to help mitigate these issues by progressively delivering software to production, and automatically rolling back new features if anything doesn’t go right.  
  
Wouldn’t it be nice if we can take this functionality to the next level? We can take advantage of the advances made in Agentic AI and instruct a model to analyze the logs when a rollout fails. Then thanks to the use of agents, it can take action on our behalf, such as fixing the code or the deployment manifests on the fly, creating new PRs and sending notifications. The sky is really the limit.  
  
Come to this session to learn how to combine Argo Rollouts with Agentic AI to achieve the most seamless release experience yet.

## Transcript

**0:01** · All right, thanks for joining our session. We're going to talk a little bit about uh AI because nobody talks about AI these days. So, we figured we should um but it's going to be interesting because uh we're going to talk about how to um actually roll out to production and if something goes wrong, we're gonna see if AI can help us with uh recovering from that. So, uh my name is Kevin Dubis. Uh I work at IBM now uh from Red Hat to IBM. And then uh with me is Carlos.

**0:35** · Yeah, Carlos Sanchez. I work at Adobe as a principal scientist and I've been involved with the open source community for a long time now. So excellent.

**0:43** · Hope you like it.

**0:45** · Yeah.

**0:45** · So um last year I was traveling. I was in Berlin and the crowd strike thing happened. I don't know if you remember this. uh a lot of issues with the airlines. So I got stranded for the whole weekend in Berlin because uh something was rolled out and um it caused some caused some issues and it was quite hard to recover from that. And so yeah, a lot of people like me were, you know, ran into a lot of issues and um then they kind of uh did their post-mortem and uh figured out that they probably shouldn't have rolled out to you know the entire production and maybe do staged rollouts and um well that just so happens to be something that you can do with Argo rollouts. So maybe, you know, if they had watched our session before they No, I'm \[laughter\] just kidding.

**1:41** · Or use Argo Rollout. That's been around for a while.

**1:44** · Yeah, exactly. Argo rollouts has been around for a while and uh both Carlos and I have been talking about it for a while. Um so just out of curiosity here, who has uh who who knows about Argo rollouts?

**1:59** · So we see a fair amount of hands, which is good. Then who here is uh works for Crowd Strike?

**2:05** · \[laughter\] All right. So, for those who don't know what Argo rollouts is or or what progressive delivery is is what you can accomplish with Argo Rollouts, uh I I tried to create this uh kind of uh with with with AI of course to try to uh show what what it means in a non kind of software diagram thing because sometimes it's nice to kind of show it in a different way. But yeah, you can see here in the first image that 90% of the traffic in this case still goes over the old bridge. Somebody created a new bridge and then uh gradually they're going to send a couple people over this new bridge to see how everything is going. And it's the same in software, right? So you send a little bit of your traffic to your canary and then see how everything is behaving. And with Argo rollouts, you can then verify how uh your rollout is going. You can check the logs. can see what kind of metrics are uh going on and then if something doesn't go right then Argo rollouts can you can define your success criteria or your failure criteria and then Argo rollouts is going to notice that well maybe uh we can see here in the second picture there are some cracks on the bridge uh so we should probably roll back send everybody back to the old bridge and um then hopefully nobody died Um, so that's kind of the concept of of Argo rollouts.

**3:35** · We're not going to go too deep into the basics of it, but just to kind of give you an idea of how it works is that you create this uh um ago rollouts uh custom resource and then you define uh an analysis template that you can uh call and you define these steps to um basically roll out to a certain amount of traffic. So in this case you can see below you can see the steps set weight 30 then pause then set weight what is it uh 40 then 60 80 and whatever more. So you just gradually roll out to more um traffic to more users, then take a pause, analyze what's going on thanks to the analysis template, and then if everything is going well, then you keep rolling out and to more and more traffic until finally you've rolled it \[snorts\] out to to everybody or not, right? Or if something goes wrong, then you automatically roll it back. So in this success template um that we've previously kind of uh were showing and doing we were using Prometheus but you can use many tools.

**4:44** · So in our case we had a template where we called Prometheus and we looked at some uh metrics. So we created a success condition that said if um not more than 95% is successful then roll back. And what 95% are we looking for? In this case, kind of a really simple example.

**5:05** · We just looked for any kind of 500 type error. And if we saw that more than 5% of uh our our logs would show five or our metrics showed um that kind of uh error code, then we would roll back. So this was great, but you need to define the success criteria. And what if something is kind of not exactly defined in what you created in your PromQL, right? \[snorts\] So instead of creating this uh custom PromQL, why not use AI to actually analyze your logs, your metrics? And that's actually that AI is fairly good at, right? Analyzing things and then seeing if there's an anomalies and then we can define what the success criteria is based on that. So it could be that we give it some sort of confidence score of how confident it is that there are issues or not and then based on that we can uh either continue rolling out or roll back.

**6:07** · So Carlos you you did create a nice uh diagram and uh so basically how it goes is so you uh commit your code right so you make some code changes you deploy it your canary runs we do the analysis and then AI is going to look at the logs and verify and metrics whatever you want to throw at it you can give it access in our case uh we created an an agent an actual agent that's running in Java with Caucus um that's uh sending the logs to a model and has access to the Kubernetes cluster as well. So we can go log into the pods as well and verify in the canary that everything is going well. So that's kind of our our agent that's going to see is everything going well.

**6:57** · Okay, that's great. Keep rolling out or if not well then roll back. So this is pretty cool. Carlos, you you did most of this work. So, uh it's uh I can I can definitely say it's cool to say it about yourselves. Maybe I I did create the the Kubernetes agent based on what he created, but I was like, well, we need to make it in in Quarkus because it's uh more performant than whatever he was using supposedly.

**7:24** · \[laughter\] Anyway, so if you're a Java person, you should check out the source code. It's it's uh it's actually pretty cool that you can do it with Java. So the way that it works on the Argo side is that you know you you have to create a plugin and so you can see here that we create a config map and we provide uh the uh the source code for the plugin and and load it up and then uh we can call that plugin as part of a template. So you can see this is the same kind of Argo rollout but in this case our template is pointing to this canary analysis AI agent and this canary analysis AI agent or in this case success rate AI same difference you can see that a typo small typo yeah um you can see we have a provider with a plugin and the plugin is pointing to our uh Kubernetes agent that's running in our cluster in this case in the in the Argo your rollouts uh name space, but you know you can run it of course anywhere and then we pass in the label that it's needs to look for for the stable pods and then the labels for the canary pods and then it can compare those two and then we have that success condition uh in this case results more than 50% and that basically means uh the model defines that it's more than 50% confident that there is uh well that everything is going well and if not well then you should roll back. So this is great. So we can actually analyze logs and then roll back which which is fantastic. But actually there's there's more that we added to this to make it even more cool with uh with more AI.

**9:10** · \[laughter\] Well everything is weather with more.

**9:12** · Yes, of course. So we added another component to this. So if something isn't going right, we're going to analyze what is going wrong and we're going to uh look at the source code and let AI try to figure out based on the error logs, what went wrong, look at the source code, and then provide try to provide a fix for us, create a pull request for us as well. And then if you're really really uh yolo if you're very yolo you can even say like oh just auto approve it and let it fix itself and then re-roll out. Um, of course I wouldn't necessarily do that in production, but you know, it's already cool that you can create a pull request and then analyze, you know, yeah, actually based on the logs, it provided this uh this fix. maybe it's good and you can approve the pull request and then roll out the fix and then uh well hopefully then everything goes well and if not you can do the same cycle again where AI is going to analyze the logs again and then see if everything is going well or not and then uh well create another pull request.

**10:16** · Yeah. So that's right.

**10:18** · Yeah.

**10:20** · Um Yeah. So the so the way that we added um the GitHub part of it, so create a poll request uh we just added this GitHub URL to the context that we're sending to the agent and the agent is then taking that GitHub URL as well as uh where to find the pods and then it's able to pull pull all those things together so it has access to the source code. uh we create uh we give it a a GitHub token so it can uh actually create the pull requests and then um yeah that's about it I think in terms of how everything is working other than diving into the code.

**10:59** · Are you ready for a demo of this?

**11:01** · So the the internet's been a little interesting here. So we'll see how everything is going but uh yeah I'm rooting for you Carlos.

**11:10** · Okay.

**11:10** · Yeah. What could go wrong anyway?

**11:13** · Yeah. \[snorts\] Um, so we have a roll out here and if you probably has maybe have seen this demo already from rollouts, uh, you we have a service that is returning the color green all the time and it's keeping doing requests to my service, my Canary demo service and it's now stable and uh, yeah, so returning green all the time. I I'm not going to show you how this works when everything goes well. I'll show you what happens when things can go wrong.

**11:45** · It's way more fun.

**11:46** · It's more more fun. So, if I deploy something and I of course I deploy directly to the cluster because yolo um I a new uh a new Canary rollout is happening. Uh you can see it here how it's going. Let's show a bit. Um, so it's going it's creating a one pod and in a second it's going to start doing the AI analysis. AI analysis it's uh the plug-in that I wrote for uh Argo. Uh you see it's returning multiple colors.

**12:19** · That's the new version, the Canary version and eventually it should fail and roll it back automatically which is what you are used to see with Argo rollouts.

**12:30** · The plug-in you run it on the Argo rollouts with a configuration we showed before and then the um what it does it does calls an agent. You can write whatever agent you want using A2A protocol and uh yeah you can even add uh your own business requirements access to your document internal documentation or whatever. And the uh what else? So it in this case in this example not only has access to the logs but also has access to tools MCP tools.

**13:08** · So you can uh run get pod describe pod look at uh things things like that. And of course the demo did not work.

**13:19** · Okay. So let's try it again because what could go wrong again?

**13:25** · Yeah. So, so what uh what happened here is that it wasn't successful, but it wasn't necessarily a failure either. So, you see at the bottom there, there's the three um with the little red thing next to it. But yeah, here it's probably because the network here is not super great. And so, let's see.

**13:46** · Yeah.

**13:46** · \[snorts\] So, if there were real failures, then it would have rolled back. But in this case, it's not able to get the results back correctly. And so then it's it's not going to roll it back automatically. It's just going to say I wasn't really able to get the analysis.

**14:02** · Um yeah, you would see the analysis run here. Uh like any an other analysis run is just with this plugin, the analysis run is this whole AI uh AI thing. and we can show you. Let's let's give it a a second to see if uh this one this one should succeed. So I can go back and do uh let's do the promotion.

**14:27** · So we can go back and try to break it again. is also with AI because it's nondeterministic. Sometimes it can tell you oh this this exception but u I think it's okay or so so sometimes you never depending on the rules you say and the prompts you use uh you have to be careful and the context you give to the AI model. So let's try it again.

**14:54** · Yeah.

**14:54** · So there's about the the bath one. Yeah, there's quite a bit v of variables here. Like like Carlos said, you have to make sure that you craft your prompt really well and then make sure you create your tools that uh that your agent has access to and that they're able to correctly get the pods and then uh well depends on which model you're using as well. So we created the um the agent with in this case we're using I think Google Gemini but we've also you can plug in whatever model you want to use. Yeah, this is running on Google cloud cluster uh kernel engine using Gemini for the analysis. You can also on your agent I mean there's an example agent that you can choose which model you want to use but uh obviously if you build your own agent with your own data or whatnot uh you can use anything you want and this is going too fast and I think this is not going to fail again because it should have failed already.

**15:55** · Okay. So yes, always these things and we can see in the analysis run uh what happened? Oh, agent return 500 error. Okay. So there's a problem. There was a problem on the agent.

**16:08** · Let's see.

**16:10** · Uh okay. So I guess we we this is what it is.

**16:16** · So \[snorts\] in the in the bottom you can see that it said like remediation steps taken and then it's a PR link and stuff like that. So I believe it is creating uh a couple pull requests based on whatever the AI thinks that it needs to create PRs. I'll show you what what's happened uh what has happened before because we were trying this.

**16:40** · Um okay so 3 hours ago when I was this was working. And so the agent says, "Okay, I recommend the the roll out to stop and be rolled back." And the plug-in will go and create a GitHub issue. And and the GitHub issue is also asking the AI, give me an a description of what the problem is. So here you have a very detailed description of why the AI thinks this should have been rolled back. Uh this Canary P is experiencing frequent panics uh leading to application instability index out of range errors. Uh it compares the stable and canary. So it's not just is the canary good or bad is compared to the stable how good or bad it is and the analysis is the root cause is an unhandled scenario where the slice is empty and go and so on. recommended actions inter immediately aboard the canary rollout and it did this before uh implement a code fix manually apply the fix and so on. So this is already good, right? The rollout failed, create a GitHub issue for it.

**17:51** · But so yeah, and I think for platform engineers, this is fantastic to at least get an idea of what is going wrong without immediately going to the you know finding the software engineer on call that maybe can analyze the logs and stuff like that to already have an idea of what might have gone wrong. Then you can tell and this has happened after uh the roll back, right? So you have very limited impact on your users, right?

**18:18** · And what we do also with the metrics uh with this metric AI plug-in is assign it to Google jewels. Google jewels is a coding assistant. Uh you could use a GitHub copilot assistant. You can use clo whatever you whatever you want. We didn't want to rewrite that part.

**18:36** · Basically, you create the J is the GitHub issue, assign it to whatever coding assistant you want, and Jules uh said in like a few minutes, went on it and created a PR for it. So, Jules tells me, okay, here is a PR that fixes the issue. went on changed the files and fixed the problem which was if the array the slice was empty it was panicking and I the only and it even added a test for me so if I wanted I can go here click merge this gets deployed again and rolls out again so that's why we are calling this uh self-healing rollouts and uh and the nice thing is well even if it didn't quite fix the issue Well, as long as it uh still rolls back after only impacting the next 10% of people. \[laughter\] No, don't do that.

**19:34** · So, yes. And uh quickly show some of the bits here. Uh this is what we were showing before the roles, the GitHub URL, and uh let's see. And here we have the prompt somewhere. Uh, let me see. Prompt. There was this. No.

**20:03** · Ah, no. H, sorry. I I'm I'm I cannot find it right now. What was the I think it was prompt.

**20:13** · Ah, never mind.

**20:14** · It's too many prompts.

**20:15** · Too many prompts. \[laughter\] Uh, basically the prompt was I think it was here in the log somewhere also on the down here.

**20:23** · It's very verbose but it was saying imagine you are a you are a devops say a specialist you have access to these tools you can get logs inspect bots uh describe all these things that you want and it will go and use those tools to figure out okay maybe the p crash with a memory out of memory the pod so it's not just looking at the logs but other things the beauty of it is with metrics you need to know what could go wrong and you need to set up those metrics and you need to set alerts for those metrics. With this it can be an addition also that you don't need to switch everything to this. With this you get this uh fussy thing of what's right, what's wrong. So you don't for things that you don't know the unknown unknowns. That's that's cool for for that. Um yes I think better.

**21:21** · Yeah.

**21:21** · So uh takeaways um rolling out changes to all users at once is risky. I think we can all agree on that that ideally if we can use canary kind of uh deployments we only impact a small subset of our users the impact is going to be less. Um and canary rollouts and feature flags are a good way to do that.

**21:45** · Um, and I think and hope that we show that, okay, maybe it seems a little bit gimmicky to use AI, but I think this really has value and I I think it really can be an added feature to your uh to your rollouts to give you more of an idea of what might have gone wrong and even give some suggestions of uh of some potential fixes. And then it's still up to you. you're still fully in control to decide whether um the AI is completely hallucinating or not, but at least you have an an added tool in your toolbox to be able to do that. So, I don't think it necessarily has any kind of detractor in in that sense because like Carlos said, you can still use the same Argo rollout templates that you were using before to look at the metrics and to have all that uh stuff that you have.

**22:38** · this is just an added little feature that might be able to to help you. So I I think you know we can all kind of uh follow along with our AI overlords and uh embrace it, right? So \[laughter\] So with that uh here's a couple links for the plugin that uh Carlos created and then the plugin is in the Argo Argo product labs and it's actively being developed. So if you want to give it a look.

**23:06** · Yeah. And of course, anybody's welcome to contribute to it as well.

**23:10** · And then we'll we'll apply AI on the contributions.

**23:12** · Yes, of course. Of course. And then uh yeah, please leave us uh some feedback with um I think this is a SKED app, right?

**23:20** · Yeah.

**23:20** · Yep. That's for the feedback. Please leave feedback.

**23:23** · Cool.

**23:24** · Especially good feedback. Yes.

**23:25** · Yeah. Thank you. We appreciate it.

**23:26** · All right. All right.

**23:27** · Thank you.

**23:28** · Thank you. \[applause\]