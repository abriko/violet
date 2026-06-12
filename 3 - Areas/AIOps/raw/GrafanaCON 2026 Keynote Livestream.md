---
title: "GrafanaCON 2026 Keynote Livestream"
source: "https://www.youtube.com/watch?v=UazoZQHW0kI"
author:
  - "[[Grafana]]"
published: 2026-04-22
created: 2026-05-13
description: "Join Grafana Labs CEO and co-founder Raj Dutt, Grafana creator Torkel Ödegaard, and leaders from across the Grafana Labs team for the GrafanaCON keynote in Barcelona.In this keynote, the team shares"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=UazoZQHW0kI)

Join Grafana Labs CEO and co-founder Raj Dutt, Grafana creator Torkel Ödegaard, and leaders from across the Grafana Labs team for the GrafanaCON keynote in Barcelona.  
  
In this keynote, the team shares what’s new across the Grafana ecosystem, including Grafana 13, Loki’s new architecture, OpenTelemetry updates, Grafana Assistant, AI observability, and GCX — the Grafana Cloud CLI for bringing observability context into your terminal and agentic coding workflows.  
  
Timestamps:  
00:00 Welcome to GrafanaCON Barcelona  
00:33 GrafanaCON history and Grafana’s Barcelona roots  
02:14 Celebrating the Grafana community and open source ecosystem  
05:41 Grafana Labs’ journey and vision for observability  
08:07 Grafana Labs and ecosystem growth  
13:11 What’s new in Grafana 13  
17:50 Dashboard templates, saved queries, and learning paths  
20:27 GitSync and managing dashboards as code  
24:51 Loki’s new architecture for faster, scalable logs  
33:46 OpenTelemetry updates and stabilization  
41:54 Grafana Labs’ AI strategy  
42:56 Grafana Assistant overview  
47:34 Grafana Assistant for OSS and Enterprise  
52:15 Introducing GCX, the Grafana Cloud CLI  
01:00:02 AI observability in Grafana Cloud  
  
📱 Follow us for the latest and greatest on all things Grafana and our other OSS projects.  
  
X: https://twitter.com/grafana  
LinkedIn: https://www.linkedin.com/company/grafana-labs/mycompany  
Facebook: https://www.facebook.com/grafana  
  
#Grafana #Observability #GrafanaCON #OSS #AI

## Transcript

### Welcome to GrafanaCON Barcelona

**0:00** · Please welcome Grafana Labs CEO and co-founder, Raj Dutt and Grafana creator, Torkel Ödegaard.

**0:15** · Hello. Wow, there's a lot of people here.

**0:17** · Are we glad to be here to kick off GrafanaCON? Yeah.

**0:24** · Very cool. Well, my name's Raj Dutt.

**0:26** · I'm one of the co-founders and the CEO here at Grafana Labs.

**0:29** · And my name is Torkel Ödegaard. I'm also a co-founder and CGO.

### GrafanaCON history and Grafana’s Barcelona roots

**0:33** · So it's great to be here. We're back in Europe for our annual GrafanaCON event.

**0:38** · Just wanted to welcome everyone. Our last conference was in Seattle, and this is actually our 10th GrafanaCON and it's our best and biggest yet by far. I remember our first GrafanaCON, we had like 30 people in one of our early user Squarespace's office.

**0:53** · We thought it was amazing and our expectations just keep getting reset every year and it's bigger, better, and I think this is going to be the best one yet.

**1:02** · So Barcelona, I'm a huge fan of, but I think Torkel - Barcelona, I recently learned, has a special place in the Grafana history. Is that true?

**1:10** · Yeah, that's definitely true.

**1:12** · So my sister used to live here for more than 10 years.

**1:15** · So back in 2013, just a couple of days after I started working on what would become Grafana, I was traveling here for a Christmas holiday and I got a cold that whole day and I spent most of the time in bed just working on Grafana nonstop. And even after got better, I stayed kind of locked in my room, working on Grafana.

**1:38** · I didn't spend hardly any time with the family.

**1:41** · I was already kind of obsessed with what I was building.

**1:46** · So what you're saying is Grafana is actually Spanish.

**1:50** · We've been telling people that Grafana is Swedish and you're from Sweden, but Grafana was actually made in Barcelona.

**1:55** · Yeah, in a sense. The first foundation, the key features of the first version was actually written mostly here in Barcelona.

**2:03** · We might have to tell our marketing team about this.

**2:04** · Do we need to rename the project? Do you have any ideas?

**2:06** · Yeah. Well, we could name it Grafaña (Grafanya) or this could become GrafañaCON (GrafanyaCON), but yeah, we'll see. But yeah, let's move on.

### Celebrating the Grafana community and open source ecosystem

**2:14** · All right. Well, like I said, welcome to GrafanaCON or GrafañaCON.

**2:17** · I think we're going to go with GrafanaCON.

**2:19** · This is our flagship open source event. It's all about our technology, all about the community, our open source projects, new releases, tech talks.

**2:28** · It's really a big party to celebrate the wider ecosystem and community.

**2:31** · It's one of two flagship events we have. The other is ObservabilityCON, which we also have every year.

**2:36** · That's where it's more commercially focused and we talk about our commercial flagship product, Grafana Cloud.

**2:42** · But we put on a tremendous amount of events at Grafana Labs every year.

**2:45** · It kind of blows my mind. We did over 7,000 workshop signups last year.

**2:51** · There were 80,000 people that attended a webinar, and we've just got an incredible global marketing and events team that does a stellar, stellar job. It blows my mind that we are having multiple events, sometimes on the same day in all corners of the world. I can't even attend them all if I wanted to. And believe me, I spend a lot of time on an airplane.

**3:11** · So it takes a lot to put an event like this together. It's a lot of work.

**3:14** · It's a lot of prep. It's a lot of logistics. So before we get going, I just wanted to give a big thanks and shout out to our events and marketing team who've worked tirelessly to put this together.

**3:24** · Please give them a warm round of applause.

**3:32** · So we're here this week to celebrate the wider Grafana community, get an update on what's new from Grafana and our other open source projects, and to hear from speakers across this community of what they've been up to this past year and how they can use these open source tools to solve every new interesting challenges.

**3:52** · So the Grafana community is growing and it's growing fast.

**3:56** · New meetups are happening, and we now just crossed over a hundred Grafana champions worldwide.

**4:02** · So a Grafana champion is someone who doesn't work for Grafana Labs, but kind of organizes meetups, organizes events, and teaches others to be better at using Grafana and these open source tools. So what's exciting, I think, is that new champions are emerging through mentorships from other community members and other champions.

**4:25** · I think a sign of a really healthy community. So for Grafana Labs, as a company, "open" has always been our strategy. And with open, we don't just mean working on open source software.

**4:38** · That is still kind of the foundation and core of what we do.

**4:41** · Majority of software we write is still open source, but it's more than that.

**4:45** · It's about investing in open standards.

**4:48** · Standards like OpenTelemetry and working with open ecosystems like the Pometheus ecosystem and ecosystems that belong to other communities and other companies like Elastic or ClickHouse.

**5:00** · And what I think is kind of cool and fun is how Grafana then connects these different ecosystems together, both in the application, but also through events like GrafanaCON. And lastly, an open culture is also really key to Grafana Labs.

**5:17** · And it's not just how we do business and how we communicate internally, but also how we share the good and the bad with the community through a blog post about a security incident or through, for example, a talk about an outage like you'll hear later today.

**5:34** · So Raj, can you tell us a little bit more about Grafana Labs and our journey?

### Grafana Labs’ journey and vision for observability

**5:41** · Yeah, absolutely, Torkel. So like Torkel mentioned, an open culture is a big part of who we are. We're always transparent, both internally and externally.

**5:49** · Hopefully you feel that in all your interactions with us as a company.

**5:53** · So I'd like to tell you a little bit about the journey that we've been on as a company for a few minutes and where we're going.

**5:58** · So this slide kind of represents where we've been, where we're going.

**6:03** · And I guess my message is, this has been a shared journey that we've all been on.

**6:07** · Because we're an open source company and we do stuff in the open, we've been on this journey with all of you and it's been an evolution.

**6:13** · So step one and step two are kind of obvious. Who here is using Grafana?

**6:18** · Maybe a silly question. Right. That's not surprising.

**6:21** · But step one was really becoming the default dashboard for everything. This was a really fun time in Grafana Lab's history. We had no customers, we had no revenue, we had no problems, we had no stress.

**6:34** · We were just building open source software, trying to make it popular.

**6:37** · And it was, I miss those days. Life's a lot more complicated now.

**6:41** · Where we are now is really step three and step four, which we're going to hear a lot about today.

**6:47** · We're making observability easier for every software team.

**6:50** · We've put a lot of work into that over the last few years, and it's a key theme for this week's conference.

**6:59** · And an exciting thing that's going on more recently is, of course, AI.

**7:04** · And internally at Grafana Labs, we've been sort of transformed over the last year and we really believe that we're at this new paradigm in observability and that agents are going to become a primary consumer of observability tools and data. And this is going to change fundamentally the way that we all interact and the way that we operate our software and interact with observability tools like Grafana.

**7:28** · So we're really excited about this change.

**7:30** · We don't only want to be the leading open observability cloud, we want to become the leading agentic observability cloud.

**7:36** · So there's a lot in this keynote and over the next two days that kind of shares our vision on this topic. And then finally, we want to take everything that we're doing in IT observability and bring it to the rest of the business over time.

**7:49** · So that means looking at things not just like requests, but maybe revenue, not just latency, but maybe LTV.

**7:56** · And we see a convergence happening of business data and observability data, especially as companies become more and more software led.

**8:04** · So this is just a little taste of where we've been, where we're going. Obviously we didn't write this plan in advance 10 years ago.

### Grafana Labs and ecosystem growth

**8:10** · It's a not-so-secret master plan that we wrote retroactively because we've zigged and zagged along the way.

**8:16** · This company's always been agile and it's kind of fun to think about where we're going and where we've been. And again, I just want to reinforce that this journey has been our shared journey because we've gotten so much great feedback, input, pull requests, all of the above from so many people in the community, including many people in this room.

**8:35** · So I really wanted to thank everyone here for helping us go on this journey that we're accelerating on as we speak. So speaking of accelerating on this journey, wanted to share some key stats in terms of Grafana Labs, the company and the ecosystem.

**8:49** · So we're at 35 million Grafana users active around the world, which just blows my mind. There's over a million companies using Grafana.

**8:58** · And I just wanted to stop here and go off script for a second, which is going to alarm Torkel. And I'm sure all of you here feel the same way, but I think it's just incredible that after 12 years of a project that my co-founder Torkel created, he's still involved in writing code for it almost every day.

**9:17** · You're going to see features talked about today that Torkel had a hand in.

**9:20** · And I just find that so cool and impressive and honestly just amazing that my co-founder Torkel is still active in Grafana 12 years later on this open source project that he created here in Barcelona, we just discovered. So just give a round of applause for Torkel.

**9:41** · Didn't expect that, didn't you?

**9:42** · No.

**9:44** · So we've got about, like I said, a million companies using Grafana and we've got less than 10,000 customers.

**9:51** · Now in the early days, this used to alarm investors.

**9:55** · They'd come up to us and say, wait a minute, how can you convert less than 1% of your users to customers?

**10:01** · That isn't a business model. That's a disaster.

**10:05** · And these investors did not understand open source, right? Generally, those investors that felt that way didn't end up becoming investors because they didn't understand open source. Our model has been very simple from day one.

**10:18** · We want to grow an amazingly wide community by creating valuable open source software, and we want to capture a small piece of what is hopefully a very large pie.

**10:28** · And that strategy has really started to work and accelerate over the last few years.

**10:32** · Grafana Labs as a company has hit over $400 million in annualized recurring revenue. We're the largest privately held observability company in the world at this point, and there's over 1,600 Grafanistas in 40 different countries that I have the pleasure of working with every day.

**10:51** · So it's just been amazing progress and super, super happy with the trajectory that we're on. And speaking of trajectory, there's one more thing I'd like to share with all of you.

**11:02** · Who here has heard of the analyst firm, Gartner? All right, a fair bit of people. So Gartner has a quadrant, a magic quadrant, they call it, that they publish every year in observability. Now, we made our debut on Gartner's Magic Quadrant about three years ago in 2023. And on this quadrant, we're a whole bunch of observability companies, and this was kind of cool when we made our debut because we felt like we'd finally been seen by Gartner.

**11:30** · We were finally beginning to be taken seriously as an observability platform.

**11:35** · Now, we weren't in the upper right quadrant.

**11:37** · We were technically in the lower right quadrant as a visionary rather than a leader, but it was a good debut. The next year we made some progress.

**11:46** · We went to the upper right, and this was cool because we started to become part of the same conversations and RFPs with customers who were looking for the best observability platform.

**11:58** · There were companies in this quadrant that we had admired and continue to admire. When we started the company, we really looked up to, and to be clear, we continued to look up to in some ways companies like Datadog and Dynatrace.

**12:11** · And it was really cool that the cloud platform that we built, built on Open was now being taken seriously and being mentioned in the same breadth of these other leading observability platforms. Well, what happened last year was really spectacular, and we were really happy about this. So last year, just several months ago, Gartner published their new Magic Quadrant for observability, and Grafana Labs made it furthest to the right in terms of completeness of vision, clustered around other top observability companies.

**12:43** · And obviously we're pretty happy with this result, but the reason I'm sharing this is because I think so many of you, our community deserves to share in this credit because the way we've built this and the way we've evolved our product over the last three years has really been with all your help and your input. It's been a truly collaborative experience.

**13:01** · So give yourself a round of applause because you've helped us become a leading observability platform.

### What’s new in Grafana 13

**13:11** · Okay. So let's move on to what we're really here for, an update of what we've been doing this past year.

**13:19** · So we've grouped things into three general themes, easy to get started, built for scale, and available everywhere.

**13:26** · And let's start by diving into what's new in Grafana 13. And to help me do that, I want to invite David Kalsmit up to the stage.

**13:34** · David has been working on Grafana since 2018, first as a developer, the manager and director, and he's now VP of engineering.

**13:41** · And he's been running the Grafana engineering team for the past three years.

**13:45** · So let's give it up for David and let's hear what's new in Grafana 13.

**13:55** · Thank you, Torkel. Thank you, Raj. Hola, Barcelona.

**14:02** · Yes. All of Barcelona. Yeah. I'm David.

**14:07** · I run the Grafana team and I'm here to talk to you about Grafana 13.

**14:11** · So much has happened in a year, and so I'm here to also show you a bit the things that I'm excited about that we managed to get in to the product since Grafana 12. So Grafana, as always, is your trusted and reliable source of single pane of glass. Yes, sorry.

**14:29** · And with that comes a huge range of data sources. Yeah, I'm just dazzled by that number there.

**14:34** · And so we stand for open observability and we don't really mandate where you store your data. And I think we're quite unique in that regard.

**14:43** · And so over the last year, we also had a few more, and these are maintained by us now, Jenkins, SolarWinds. So as always, it's a mix of telemetry and productivity signals.

**14:56** · So now we have 170 data sources in the catalog and with 120 ways to visualize it. And if that map there checks out, it's really a ton of flexibility.

**15:05** · But let me tell you about one more way to visualize data.

**15:10** · Let me introduce you to the Graphviz panel.

**15:13** · And I know it's only in private preview right now, but it's really too cool not to show you. Who here has heard of Graphviz.

**15:21** · All right. Yeah. There's a few people. Awesome.

**15:23** · So we have wrapped it in a panel, and so now you can define flow charts.

**15:28** · And essentially whatever you can envision in the dot language, which is part of Graphviz, you can visualize then in Grafana.

**15:35** · And so you can map metrics onto labels and you can define sort of how the edges and nodes look based on thresholds in your data.

**15:45** · And so this is extremely powerful. And in this example here also, we're using Graphviz itself to render its own rendering pipeline, and that's pretty cool. Obviously, you can showcase your own business processes with this as well.

**15:59** · So we're also working on a visual refresh of our main panel components, and we started off with the gauge panel, and I think these are looking pretty slick, and there's more to come here later this year.

**16:13** · Next step is annotations. So they've been a bit of a pain point for a while, and I think it's a bit of a shame because I think events like modeled as annotations, it can be a really powerful source when you're starting to troubleshoot an issue. But if you really have a lot of them, there's sort of too much overlap.

**16:33** · It's difficult to tell the various sources apart and it makes it impossible to read, but we shipped a few improvements.

**16:41** · And so look at this detail right there. So these are our multi-row annotations.

**16:45** · So you can have a row for deployments, one for incidents, and another one for alerts, for example. And if you have a lot of them, also then they can get clustered.

**16:57** · And next step is dynamic dashboards.

**17:00** · So this is something we introduced last year, and so it's an easy way to make your dashboards a lot more interactive, and it has a conditional rendering engine, and it's generally more responsive.

**17:14** · And with tab layouts, also you can make them a lot better organized.

**17:18** · And so we're excited to announce that they're now generally available, so thank you dashboarding team. And personally, also, I think tabs are really cool. And so internally, we have a lot of, really just a lot of them in our own dashboards, except Grafana is getting adopted by bigger and bigger organizations.

**17:36** · And over the last year, we worked really hard on making it easier to also onboard whole teams.

**17:42** · And so I'm going to show you three features that really also help you establish Grafana in your organization. This is a feature I always wanted, right? So when I work with slides or something like this, I really don't want to start from scratch. I really like templates.

### Dashboard templates, saved queries, and learning paths

**17:58** · And so I don't know about you, but I always found it easier to just edit something that's already there or remove some panels that I don't like.

**18:07** · And so this is how dashboard templates was born.

**18:09** · And so right now we're shipping Grafana with a few templates based on common methodologies. So think DORA metrics, use method, red method, or golden signals.

**18:21** · And so we're still working on a way also to define your own org templates, right? Because then you really have a way also to ensure how templates kind of work across Teams and make it really easy for you to kind of feel at home.

**18:36** · And templates really just work how you think they do.

**18:39** · And here's an example of the use method dashboard.

**18:43** · And you start off with example data and then you start replacing queries or just remove some panels. And so the layout is there.

**18:51** · You can write the queries yourself or use the assistant, or you can use this next feature, saved queries.

**18:58** · And I don't know if your organization's anything like mine, but there's usually a few people who know how to write queries a bit better than others. And so these people can now set up the rest of your team up for success.

**19:09** · And it's not just writing the queries, it's also just agreeing on what certain queries mean.

**19:14** · So something like active users or something, right?

**19:17** · So that query can be defined and then shared with your team and really sort of bring some consistency.

**19:24** · And if you combine this with the other, with the dashboard templates I showed earlier, so you can really see how someone who just started out in your team can really be really productive in building powerful dashboards.

**19:41** · So this last one here is my favorite, interactive learning paths.

**19:44** · So sometimes I'm dazzled how many features we're shipping, and we now build something inside the product in near the help menu to really make sense of some of the new stuff.

**19:56** · And it's really good at two things.

**19:59** · It can show you what you're looking at right now and give you sort of instant help there. So if it's, I don't know, like editing a panel or something, or it can guide you through a whole workflow flow in the user interface and really show you where to click all inside the product.

**20:12** · And the best thing is you can modify these guides and really sort of suit your organization and onboard new people, and so you can really customize it.

**20:22** · You don't have to start from scratch.

**20:23** · There's a whole catalog of pre-made learning paths in the docs. Just go check them out.

### GitSync and managing dashboards as code

**20:28** · You can also chime on play.grafana.com right now or here outside in the self demo booths, which is pretty cool. All right, let's talk about operations. So who here is running a Grafana for other people?

**20:43** · Any operations people? All right. Yeah. More than Graphviz. Awesome.

**20:47** · So this next feature is really going to up your game there. GitSync, right?

**20:52** · So it's something we teased last GrafanaCON and we really got far there now.

**20:58** · So GitSync allows you to manage your dashboards properly as code with a proper two-way integration.

**21:05** · So imagine sort of modifying your dashboards here in the user interface, then you create a pull request that gets reviewed by your team.

**21:12** · And if it gets merged to the repo, then it's sort of saved there.

**21:16** · And then you can also use other tooling to modify the code when that gets merged into the repo, then Grafana picks it up and shows you the changes, like a proper two-way integration. And we really had to do a major rework of the data model and the architecture to make this work.

**21:34** · So a lot of work went into this, but now we think it's rock solid because it's also just a great disaster recovery mechanism.

**21:41** · And I'm really proud to say that it's now ready for production.

**21:45** · So one more thing about GitSync, this also makes it possible to have a proper publishing workflow.

**21:50** · So really think like you can try new dashboards in Dev, promote them to staging, and then eventually the prod.

**21:57** · And so we're also bringing you more connectors now, not just GitHub, but also GitLab, Bitbucket, and PureGit.

**22:05** · So this is really a great way to manage dashboards at scale.

**22:10** · Speaking of scale, there's sort of startup scale and there's enterprise scale, but then there's Google scale.

**22:17** · So Google's SRE culture always played a big role in GoFundMe's engineering.

**22:22** · We even make newly hired engineers read the Google SRE book.

**22:26** · And so about a year ago, Google approached us to see if it's possible to run Grafana visualization inside of Google for their own internal monitoring.

**22:36** · And I'm super proud to say that that partnership is in full swing and also it's a bit crazy to me, right? So the company that popularized SRE not wants to use our software for exactly that purpose, I'm just blown away.

**22:51** · So yeah, we can now count Google among our customers. Super proud of this.

**22:56** · And this also brought some interesting enhancements back into Grafana as product.

**23:01** · So Google is very disciplined in sort of the way they approach monitoring.

**23:06** · And so this is something you need when you have really layers and layers of services that's sort of being worked on by various teams.

**23:14** · And so they're very big on this concept of reusability in dashboards.

**23:18** · And so there's a ton of features that went into the product now and we're going to show you in a later session. All right. Grafana.

**23:27** · to trusted single pane of glass, brings all your data together, really trying to be more open and composable.

**23:34** · And one more thing I have for this. So you've seen this number earlier, 170 data sources we have in a catalog, but we believe there's room for more. Room for more data sources, more apps. So also you can think normal telemetry, but also it goes a bit beyond, like hardware, industrial or IoT.

**23:58** · And so we started with a select group of partners now and they have built the first few apps and they're already in the catalog.

**24:06** · And you can also try them out. And it's early days.

**24:09** · So we're doing things a bit differently.

**24:10** · So we're still looking a bit of feedback on what are other apps that you would like to see in this marketplace.

**24:16** · Or if you want to partner with us and start publishing your own plugins on this marketplace, just come and have a chat.

**24:26** · All right. That was Grafana 13, your trusted single pane of glass, gave you a set of new tools to bring teams into your organizations.

**24:34** · Git Sync is finally ready for production, and we have a marketplace pilot that allows you also to participate more in the Grafana ecosystem. All right. Next up, to talk about my favorite Logs database, Poyzan.

### Loki’s new architecture for faster, scalable logs

**24:51** · Thank you, David.

**24:57** · Hello, everyone. My name is Poyzan. I'm running the EMEA Group in Loki, and I'm very excited today to be here with you to tell you all about Loki's new architecture.

**25:08** · So Loki is designed to be lightweight.

**25:11** · It operates with the core principle of you don't need to index every bit of every log line.

**25:18** · It makes logs available immediately and heavily leans on object storage, and it has been excellent at what it does.

**25:26** · It made it possible to have petabytes of logs data, all an affordable infrastructure, but we know that the world of logging is shifting and we are evolving Loki with it.

**25:38** · So structure logging is now the default and OpenTelemetry adoption is accelerating it.

**25:44** · Log volumes are increasing along with number of fields in every log line.

**25:49** · So what used to be a simple error message now has key value pairs that carries things like service name, trace IDs, status codes, or like order IDs, transaction IDs that has business logic in it.

**26:06** · And the way you query this data is changing too.

**26:10** · So you're not gripping over the error messages anymore.

**26:14** · You're running targeted analytic queries over massive volumes, drilling down by service, aggregating over the status quo, or wanting to get like business insights from those custom fields.

**26:26** · And when those queries takes minutes or never return result at all, that's where the frustration starts.

**26:34** · So to meet these new requirements, we are rebuilding the foundations of Loki with three major changes.

**26:41** · First is a ingestion pipeline that separates reason rights without compromising on high availability, a brand new query engine that filters data closer to the source and distributes work better and a columnar storage that natively supports reading selectively to make that all smart filtering possible.

**27:04** · So let's do a mini deep dive. On the left today, classic Loki distributes span out right to three ingestor zones and these replicate data and then flashed object storage.

**27:17** · The same ingestors are serving recent read queries.

**27:21** · So a heavy query hit that may need a multiple stream selectors, it can stall your rights and this is an incredible operational headache to manage and replication comes with it costs too.

**27:35** · So Loki is designed to flush the same data only once to object storage, but when ingestors go out of sync, it can actually cause duplicates on the persistence layer. So on the right today, we are adding Kafka in our right pipeline.

**27:50** · Distributors are right to the Kafka partitions and each partition is consumed by a single ingestion. Now rights are durable before the ingestors.

**28:00** · We can completely separate reads and rights. This is a massive win.

**28:04** · We wanted for years and there's more.

**28:09** · Remember the duplicates I mentioned on the storage layer.

**28:12** · So data shows that Loki can end up storing up to 2.3 times the same log data on object storage.

**28:20** · This is a lot when you operate at the petabyte scale that Loki can do.

**28:25** · So with Kafka, we can guarantee that every log line is written once.

**28:32** · And when an ingestor dies, the new one just picks up and replace it.

**28:36** · So we are not compromising from durability while doing so.

**28:41** · Operational complexity of running Kafka is a very difficult trade-off, but the read and write isolation with a more robust write path is more than justified as complexity.

**28:54** · So let's move on to the read side.

**28:57** · The biggest lever we have for a more performance query path is reading less data in the first place.

**29:04** · The new query engine filters data closer to the storage layer.

**29:09** · So what does this mean?

**29:12** · So the data that doesn't match your query never enters the pipeline to be parsed, and it is backed by a scheduler that distributes work over a pool of workers. So results are dramatically faster on large range aggregation queries and drill downs. To make it all possible, we rely on a format that supports selective reading natively.

**29:40** · That's where column R comes in now.

**29:43** · Loki's original storage chunks made a lot of sense for what it was designed for, flush fast and scan at query time. However, across millions of log lines, trying to filter a subset of selective fields becomes the bottleneck.

**30:00** · On the scanning level.

**30:02** · So the column R format flips this logic. Now, each field can live on its own column. Looking at the example here, so get me all the services running at a given time.

**30:14** · Classic Loki will have to parse every log line, every metadata to be able to filter the service name. Column R just returns it.

**30:23** · And this is still schemaless. So you don't have to define columns upfront.

**30:28** · You continue to send your logs and Loki source them, organize them for you.

**30:34** · The best bit, let's talk about results.

**30:36** · We are running one of the largest cloud logs instances to monitor Grafana Cloud itself.

**30:43** · And these numbers are coming from our internal cluster that can do gigabytes per second throughput, which will turn into couple petabytes a month.

**30:51** · And 20 times less data scanned, returned 10 times faster.

**30:57** · This is a massive win on the scale that we operate.

**31:01** · And these are still preliminary results.

**31:04** · We are actively working on different new revenues.

**31:07** · So stay tuned for better performance.

**31:13** · Did we solve it all then? Not really.

**31:16** · So if you ask Loki to get a specific string without in-stream selectors, look at all my log lines and return results. It will still be slow.

**31:25** · We call them needle in the haystack queries.

**31:28** · And Column R does not really unlock this out of the box.

**31:32** · We attempted to solve this problem a couple of years ago, but our solution did not scale. But we hear you, we know this is a real need.

**31:41** · So Grafana Labs made an acquisition to bring Jason Nochlin and his technology to Loki.

**31:48** · Jason implemented targeted secondary indexes that can result up to 99% drop in ByteScan.

**31:56** · This is currently being developed on cloud first and it's already in private preview. We are working on making it available on open source data this year.

**32:08** · I hear you asking. Well, how are we going to try this?

**32:12** · So the new architecture format with all its components will be available on all modes of Loki. And we are committed to a great monotic experience known as single binary.

**32:23** · So if you're running Loki on your local or on a single node today, we will not be forcing the Kafka overhead on your workloads.

**32:33** · However, if you need a larger scale, Loki distributed is the future.

**32:38** · And the diagram here today is representing how we are testing our internal migration strategy.

**32:46** · So you can see that we are writing both new and the old formats and running them against the engine today and the new engine that we are developing.

**32:56** · And we have an open source component called Querity that can allow you to choose the preferred engine you want or race results.

**33:05** · This allows us to continue to iterate safely and compare results side by side at any time. As we are moving forward to Loki 4.0, we will be iterating over a simplified migration path for you and we'll help you there. If you're running Loki by a helm, Tanka of your own setup, we'll meet you where you are. So everything we build, we build for scale on open standards, and that's the Grafana way that we are very proud of.

**33:37** · Now to tell you all about OpenTelemetry, I want to hand it over to Ted Young.

### OpenTelemetry updates and stabilization

**33:46** · Thank you. Thank you. Thank you. Thanks, Poyzan. Hi, everyone. I'm Ted Young, Grafanista, an OpenTelemetry co-founder, back with your friendly neighborhood OpenTelemetry updates.

**33:58** · You could definitely say that structured logs were indeed a big event last year in OpenTelemetry. So what's coming up this year? OpenTelemetry, as I like to think of it, is a high throughput, high latency organization.

**34:10** · We all win when we bet on open standards. I really firmly believe that.

**34:14** · And Grafana Labs has been betting big on OpenTelemetry, and you can see that reflected in all the initiatives and components that we've been working on and sponsoring.

**34:24** · But what's the project's top goal for this coming year?

**34:28** · I'm excited to announce that it's to be as boring as possible.

**34:35** · Yes, that's right. You heard me right. Boring. Now that might sound crazy, but it is crazy. And it's important to remember though with telemetry, the opposite of boring isn't interesting. It's frustrating.

**34:49** · So actually, when you think about it, boring is amazing and it's harder to be boring than one might imagine.

**34:56** · So this year, we're trying to get back to our standardsy routes and trying to be as boring as possible.

**35:02** · And that's why our top priority is actually to stabilize all the things. What could be more boring than this? Not changing things.

**35:13** · But it's actually amazing because it means that we've reached the end of the road for the original goals of the project, tracing metrics and logs, stable, unified, everywhere.

**35:25** · These are the final pieces that OpenTelemetry needs to finally graduate from the CNCF. So what does stabilization mean exactly?

**35:35** · Is it really that OpenTelemetry is so unstable? No, of course not.

**35:40** · OpenTelemetry has been in production for years and we've made quite a bit of defacto stable software along the way, but we do have some cleaning up to do in order to make reality ...

**35:51** · Sorry. In order to make our software actually reflect that reality.

**35:54** · Some organizations have security rules that ban the installation of software marked as beta. We want OpenTelemetry to be available to everyone everywhere, which means we need a simple and reliable way to ensure that OpenTelemetry only contains stable packages.

**36:10** · That means everything important in OpenTelemetry needs to become 1.0.

**36:16** · So the final boss of this stabilization effort actually isn't the collector or the SDKs or OB or any other core component.

**36:25** · It's the instrumentation. That's where the surface area gets enormous.

**36:31** · We've been stabilizing the core semantic conventions, the data definitions for things like HTTP and SQL and message queues, that kind of a thing. It's boring but important work, but the real heavy lifting comes in rolling out all of those stable semantic conventions to all of the actual instrumentation packages in every single language. So going forwards, we'll be engineering a two-stage rollout.

**36:56** · Most instrumentation packages are in a state of defacto stable.

**37:01** · That means they work fine, they're safe, they're reliable, but the data could be better.

**37:06** · Identifying these packages and marking them as 1.0 brings our concept of stability better into alignment with user expectations.

**37:15** · Stage two will be lifting that data up everywhere to the latest version of the semantic conventions once they become available via another major version bump.

**37:24** · This is harder than it sounds, and it's the last remaining piece.

**37:29** · We're going to need to invent new tools and potentially apply new coding techniques in order to handle the scale of instrumenting all the software on the planet. Boring is harder than it looks.

**37:41** · But why stop there?

**37:43** · What could be even more boring than stabilizing the definition for database queries? How about installing all of these bits?

**37:52** · I'm talking about package management, the amazing place where software and the mail finally meet.

**37:59** · Some background. In order to make OpenTelemetry work, the correct instrumentation needs to be installed into every application, and that creates this little matching game that we have to play.

**38:10** · The way this matching game works, OpenTelemetry first has to identify all of the libraries and frameworks that your application uses.

**38:17** · Then it needs to identify the matching pieces of instrumentation.

**38:21** · Then it needs to combine those two things together. Of course, we have automation that plays this matching game for you, but the only issue is right now, the way you configure and use those automated tools works differently in every language.

**38:34** · And learning how those tools work can make OpenTelemetry difficult to install the first time that you try it. It's not just confusing though.

**38:43** · The current automation requires developers to touch every single application one by one. What we want is a single click way to install OpenTelemetry system wide, and that brings us to the people we like to call operators, SREs, infrastructure teams, sysadmins, people like that. Today, operators can install and manage some parts of OpenTelemetry, basically the collector and OB plus a couple of languages, but there are still many cases where it isn't possible to apply the language specific automation in a comprehensive way. That's a problem.

**39:19** · Not just because we like the operators, but because at many organizations, it's the operators who are charged with installing and managing observability.

**39:28** · Often operators are the only way to get a sort of quick, consistent rollout across an entire organization.

**39:38** · While it's fabulous if application teams can manage their own observability, most organizations are designed to give their teams independence, which means trying to do a coordinated rollout where every single team has to do a bit of work is going to be really difficult.

**39:55** · But don't worry, we have a solution.

**40:00** · What I would like to call integrated OpenTelemetry.

**40:03** · A set of initiatives that when combined create a new way to instantly and consistently install OpenTelemetry everywhere. Let's get into how it works.

**40:13** · Starting with Linux. How should you install OpenTelemetry on Linux?

**40:18** · I believe it should be the same way that you install anything else via package management. That's right.

**40:24** · apt-get install OpenTelemetry is coming to a Linux box near you.

**40:29** · Under the hood, OB, the injector, language automation, all of these things are doing a lot of heavy lifting to make it work, but you don't have to worry about any of that. Just install the package, add a few lines to a comp file, and by default, everything that can be instrumented will be.

**40:46** · From one machine, it's easy to scale up everywhere because this is the part of the system that operators control. And if you're using Kubernetes, it will be just as easy.

**40:56** · We've had an OpenTelemetry operator for a while, and it's a popular solution.

**41:00** · With these additions, all of its current limitations will be removed.

**41:05** · And of course, if you're familiar with Instrumentation Hub from Grafana Cloud, it will use the same mechanisms under the hood to manage these bits for you.

**41:14** · Of course, right now, we're only focused on Linux, but once we've stabilized things here, we plan to look at Windows and Macs next, as well as potentially looking at development environments, not just production.

**41:27** · So that's integrated OpenTelemetry, easy for everyone to install, easy to scale, amazing, simple, boring. Just the way we want OpenTelemetry to be.

**41:38** · All right. So enough with all the boring stuff, right?

**41:41** · Let's have some actual fun and excitement. For that, I believe you need a British accent.

**41:46** · So I'd like to welcome Mat Ryer up onto stage to talk about artificial intelligence and all the amazing things going on in that department.

### Grafana Labs’ AI strategy

**41:54** · Thanks, Ted. Amazing.

**42:00** · Hello everybody.

**42:01** · I'm very excited to tell you about the continued investment that we're going to make into AI here at Grafana Labs.

**42:08** · We want to be a first AI native platform, and that means dealing with non-deterministic inputs that we see now.

**42:16** · It means dealing with scale. Now, anybody can write complex queries just by prompting in natural language through the assistance or through agents.

**42:25** · And it means making sure that the APIs are giving data back in a way that the agents can deal with. It's not going to blow out the context window.

**42:33** · So more than ever, we're dedicated to building safe, secure, actually useful AI. And we take this quite seriously.

**42:40** · We don't want to ship slop. We don't want to be a slop shop.

**42:45** · So everything we deliver, everything we're doing here is about guaranteeing when we ship something to you, it is going to actually make a big difference in your day-to-day work.

### Grafana Assistant overview

**42:56** · So actually useful, like the Grafana Assistant. This is our flagship app.

**43:01** · This is a sidebar chat app that's integrated deeply into Grafana, and it helps more and more people every day.

**43:07** · We're thrilled by the success of this, and it's great to see all the stories that people tell us about how this helps them. If you haven't tried Assistant, let me tell you a few reasons why you might like to.

**43:19** · So it's an LLM integrated into the very fabric of Grafana. It helps you do everything you need. You can just ask it questions.

**43:28** · It knows how to write complex queries so it can go and dig into the telemetry and give you the insights that you need and it's in a loop.

**43:36** · So it can go around and gather relevant context so it can make informed assessments.

**43:42** · That means it can investigate issues and it mixes signals like only pros know how to do. A lot of people know about metrics and logs.

**43:51** · Fewer people have experience with tracing and profiling while the assistant, these agents, they know it all.

**43:58** · They can also build deep links so they can take you where you need to go in Grafana, not just to the right page, but to the actual view filtered for you, because all the filters are just in the URL parameters and we taught it how to build those URL parameters. Of course, it's Grafana, so it can build dashboards as well, beautiful dashboards, in fact.

**44:21** · We have fantastic user base already, and some of the things we hear from them is just great for us. We love this.

**44:30** · And for some people, it's really supercharged their teams.

**44:35** · They're able to automate things, they're able to get things done more quickly, and this means that it frees them up so they can do more important things, and they're delivering systems more reliable than ever before because of it.

**44:49** · And I'm not surprised they love it.

**44:51** · The team is fantastic and they're moving so quickly. Genuinely, if you use Assistant, you will notice new features every week dropping in there.

**45:01** · Now, how do we keep the quality high? I'll tell you about that in a minute.

**45:06** · But first, I want to tell you about a couple of my favorite features here.

**45:11** · So the first one, assistant investigations. We knew that one assistant was good, and we thought, what if we had lots of these? And so it works.

**45:21** · So what you can do is prompt the investigator, you give it as much context as you know, and it will swarm multiple agents around the problem.

**45:30** · They'll follow and chase down different leads and they cooperate together so you can really get a good analysis going before you've even reached your computer.

**45:41** · So this is all driven by cutting edge research that we're doing at Grafana Labs, and it's very exciting to see, and we're going to keep developing this as well.

**45:50** · All our agents ship with good quality, good knowledge, expertise that's been prompted by the world-class engineer operators that we have at Grafana Cloud and Grafana Labs, but they don't know your systems quite how you do.

**46:07** · So this suite of tools allows you to control how your agents behave, how they answer questions, and what actions they take.

**46:16** · You spend years developing high standards for your systems.

**46:20** · Those agents should have those same high standards.

**46:23** · And if you can mix this with trusted MCP servers, you really start to level up what you can do. New is automations.

**46:33** · Automations let you schedule regular work, so you can get a morning report with your coffee. Maybe you say every week, have a look at the past week's incidents and tell me if there's any common themes or common root causes.

**46:49** · And you just prompt it in natural language, in any language.

**46:54** · It does support Spanish. Pause for applause.

**46:59** · Yeah. Okay. Yeah. Why not?

**47:03** · So you can plug this now and build these kind of amazing workflows, and that's Grafana Assistant. We love it. Our users love it.

**47:10** · It answers questions. It can dig into telemetry. It can take action.

**47:14** · And of course, this is the first question we always get.

**47:18** · Is this available on- prem? Is this available in open source?

**47:22** · So far that answer has been no, but I'm going to introduce somebody now who ...

**47:27** · You know what he's going to say probably. Please welcome Sven Grossman.

### Grafana Assistant for OSS and Enterprise

**47:35** · Thank you. Exactly.

**47:39** · So as Mat mentioned, user feedback for Grafana's assistant has been great over the last year, and it's helping more and more people with their workflows every day. However, so far, Grafana System has only been available in Grafana Cloud. Well, now Grafana Assistant is available everywhere, not just exactly.

**48:05** · Not just for cloud customers, but also for Grafana OSS and Grafana enterprise.

**48:11** · As we are making Grafana more and more innovative, we think this should not be limited to just Grafana Cloud, and we believe that you and all of our on- prem users should benefit from this awesome tool as well. So let me show you how you can use Grafana assistant.

**48:27** · The Grafana system plugin will live alongside your Grafana installation, and for the assistant to work properly, you will need to connect it to Grafana Cloud account, which will handle all the LLM communication for you. But obviously, this also works with our Grafana Cloud free forever plan.

**48:44** · Your data does not have to live in cloud, and only relevant pieces will be sent as part of your conversation with Grafana Assistant.

**48:52** · This allows us to manage multiple frontier models for all kinds of use cases.

**48:57** · Some will be better at certain tasks, some are faster, and some are better than others, and all of that is managed and maintained by us for you and Grafana.

**49:07** · But enough slides, let's see it in action.

**49:17** · In a minute. There we are.

**49:20** · So after you install Grafana assistant in your local Grafana, as I did here now, you will need to connect it to your Gavana cloud account.

**49:29** · All this requires is basically two clicks and sunglasses because this portal is very bright. So you select your account here, authorize the connection, and that's basically it.

**49:42** · So after you go back to your Grafana plugin, this connection between your on- prem install and Grafana cloud has now been made. So now Grafana assistant, after this is done, the loading should be here ready for you in Grafana, wherever you are as this little site buyer chat up. However, if you prefer a more full page view of the assistant and more agentic workflows, you can use Grafana Assistant's new workspace feature as I did here, and I asked Assistant to investigate an issue in the product catalog service.

**50:10** · So Assistant did all the querying for me and did this investigation, also created some nice panels, but now I want to persist this investigation as a dashboard. In Workspace, it's as simple as one click on this button, and this will basically continue the same conversation within the assistant, and it prompted the assistant to create a dashboard based on this past conversation.

**50:37** · So now Grafana assistant is, like kicking off, is thinking and reasoning about this problem, and is basically laying out a plan how to best create this dashboard for you.

**50:50** · And in a minute, some panels should appear.

**50:53** · And then one of the goodest things I believe is that Assistant basically always knows about these new features. As Dave mentioned earlier, tabs are now GA and also assistant knows about tabs.

**51:04** · So you might not need to learn how to create tabs best.

**51:07** · Just use Assistant and you will see in 20 seconds in just one prompt, you will get a dashboard like this with a nice incident summary and an overview tab and then detailed tabs that help you organize your dashboards.

**51:23** · So that was my little demo. Back to the slides, very brief look and just some part of what a system is capable of.

**51:36** · And if you are looking to use and to try out Grafana system, we offer a very general three tier that is actually useful and it includes three users and does not require any contract or any credit card, which is way easier than checking into my hotel this week.

**51:53** · So now everybody can use Grafana Assistant, whether you're in Gavana Cloud, Grafana OSS, or Grafana Enterprise, but we want to show you even more places, how you can integrate it into your day-to-day workflow. And for that, please welcome Ward Becker.

### Introducing GCX, the Grafana Cloud CLI

**52:15** · Thanks so much, Sven. Hello, everybody. All right.

**52:19** · So as Sven showed, Grafana Assistant really changed the game and we moved from writing PromQL, LogQL by hand to actually chatting with your telemetry.

**52:32** · We moved from also to automated root cause analysis, so that's really cool. And from cloud, we moved now beyond cloud to yourself hosting the environments, so that's awesome. But today, we're actually taking this to yet another place.

**52:50** · Introducing the Grafana Cloud CLI called GCX.

**52:55** · GCX beings the full power of Grafana Cloud and the assistant to your command line, and more importantly, to your agentic coding environments. With GCX, your terminal truly becomes a window into your production stack.

**53:11** · It bridges the gap between your local dev environment and key observability insights from Grafana Cloud.

**53:18** · And that window is becoming more important than ever because the way that we write codes nowadays has changed dramatically.

**53:29** · In the last few months, the adoption of agentic coding tools like cloud code or cursor have dramatically changed. You are writing code faster than ever before, but there is a dangerous gap. The agent can see your code, but it doesn't know your production reality.

**53:50** · They don't see the latency spikes or whether you're actually hitting your SLOs or whether there's a huge amount of CPU burn.

**53:59** · They write codes based on what could happen, not what is actually happening.

**54:05** · And we designed GCX to bridge that gap. Let me show you.

**54:13** · So I have a web shop.

**54:14** · I'm selling rods that yellow for creature you saw in the beginning, and my web shop is not very happy. Actually, the order process is down. So if I look in my synthetic monitoring checks here, as you can see, there is ...

**54:31** · And I might need to click another button. I think it's now going to run then.

**54:37** · So there we go. Somebody's helping me. Great.

**54:42** · So the growth shop is not very happy.

**54:45** · We can actually see in my center monitoring checks that all my probes are failing to reach my website or that's a specific part of the process.

**54:55** · And we can also see that there's an investigation ready for me because the alert that triggered kicked out automatic root cause analysis for me.

**55:03** · So I have an assistant investigation report for me available. Well, I'm using cloud code a lot. So what I want is from cloud code, from my actual code of my webshop, want to fix the issue.

**55:17** · So what GCX allows me to do is actually bringing all that context from Grafana Cloud into my terminal right where I want to improve my code.

**55:27** · So here you can see actually GCX executing all kinds of commands against the Grafana cloud stack. So it gets metrics, it gets logs, if it needs to, and of course synthetic monitoring checks. In this case, it actually fetches the assistant investigation context and it allows, of course, to combine that full context.

**55:47** · So no manual copy and pasting from Grafana Cloud, just the full context, and it allows me to indeed fix the issue in the right place.

**55:56** · So this looks good. This is indeed the recommended fix that I want to execute.

**56:01** · So next up would be to ask Claude Code to do it for me because that is of course the benefit of using agentic coding tools. So please do that for me.

**56:10** · So based on the investigation findings, redevelopment source codes, identified root cause, that we want to double verify because we always want to make sure that the agent is doing all the heavy lifting and making sure there's no mistakes.

**56:25** · So it actually found those three issues in the current version of my code, so that's great. And it's now actually modifying the code for me. Great.

**56:33** · Awesome. So in this case, just before this short demo, typically you would have a proper CI/CD life cycle where you have a very controlled flow with reviews going to production. Today, this is running on my own Kubernetes cluster running on Docker.

**56:50** · So I'm going to have a very lightweight shipping to production.

**56:53** · So actually a cloud code is already doing that for me, as you can see here.

**56:57** · So it is building the new images with the new code.

**57:00** · It actually patched the Postgres database, so it has an index right now and the deploy is successful. Great.

**57:07** · Okay. Let's see if it actually fixed the issue.

**57:11** · So it's now checking whether the actual code, the synthetic monitoring check is going to be healthy.

**57:18** · So is it actually able to reach that critical endpoint of the order process? Is literacy correct? So it's checking here the metrics.

**57:26** · And the cool thing is you don't need to tell cloud code how to use GCX.

**57:31** · It's able to figure it out themselves.

**57:33** · So we put a lot of effort in making it great for Agentic use cases.

**57:37** · So it's able to see that indeed, yes. Okay, great folks.

**57:41** · The synthetic monitoring check is green, so we fixed the issue. Well done.

**57:46** · I couldn't have done it without you. So that is great. So actually, if we look in Grafana cloud, we can actually see that the alerts have been resolved and now we're in the green. So the latacy is great and the check is no longer failing.

**58:02** · So that's great. We fixed it with GCX, well done team.

**58:12** · So GTX is really designed to do a lot of that heavy lifting for you.

**58:17** · It allows you to move from a greenfield project to full observability in minutes, not days.

**58:23** · It's about reducing the alert noise or to optimize resource costs, and of course, fixing those critical issues before they become like outages as we just saw in my web shop.

**58:37** · So I would like to invite you to install it, point it at your stack, fix or improve that struggling service in minutes, not days.

**58:47** · That's GCX. It's in public preview today. Thank you very much.

**58:57** · Please welcome back Mat and Sven to stage.

**59:00** · Thank you, Ward. Wow.

**59:01** · That is so exciting to see now the power of Grafana bought into your terminal and into your coding agent. It works with Assistant.

**59:09** · It also works without Assistant.

**59:11** · And I think we want that to also be good if you're not using Grafana Assistant where you get all the bells and whistles.

**59:18** · And so we are announcing a open observability benchmark, and this is to set the standard for the models, the LLMs, and how they deal with common observability tasks.

**59:32** · We're helping to establish these industry standards for agentic performance, and that means we can build dependable, safe, secure AI software.

**59:43** · And if you've been building with agents yourself, you'll know that working with these non-deterministic inputs and these non-deterministic results brings brand new challenges.

**59:54** · So how do we know that we're making things better when we do work?

**59:58** · How do we know when we fix something over here Here, we aren't breaking something over there. We rely on our test suite normally for that.

### AI observability in Grafana Cloud

**1:00:05** · We don't quite have the same thing here since the agents behave differently every time. And so to address this, we'd like to introduce a brand new AI observability solution with this short video that came from a recent hackathon.

**1:00:38** · You can't tell from here, but the world is different.

**1:00:42** · It doesn't look different. Trees, traffic. Where's that?

**1:00:47** · Washing machines? Oh, I see, because life goes on. Yeah, no. Well, I was expecting another... like trees, traffic. Yeah. Increasingly, we're building agents. Agents are building agents.

**1:00:59** · Metrics, logs, traces, and profiles are helping us to see how those agents are performing, but not how they are behaving. Are they answering properly?

**1:01:08** · Are they doing the right work? How much are they hallucinating?

**1:01:13** · Are they actually useful? How much does each one cost?

**1:01:17** · This modern problem requires a new modern signal.

**1:01:48** · Yes, we are thrilled to announce AI observability, brand new in Grafana Cloud.

**1:01:55** · This new app gives you a complete end-to-end solution for building modern, professional agentic applications.

**1:02:02** · You get the 10,000 foot view so you can see where time and tokens are going and therefore dollars.

**1:02:10** · You can drill down and get forensic detail into the agents, what they're doing and what they're thinking while they're interacting with users. And so you can iterate at AI speed. This came out of, from the same team that built the assistant, came from a lot of hard lessons that we learned running this at scale.

**1:02:28** · And Sven, please, please Sven, tell us what does this unlock for people?

**1:02:33** · Yeah. Let me talk you through four of my favorite features, at least from the AI observability app.

**1:02:40** · So after you instrument your agents with our SDKs, Metrics will provide all kinds of insights for you.

**1:02:46** · And that makes it very easy to spot slow tool calls, the most used models, or the most expensive agents.

**1:02:52** · And it lets also drill into conversations straight from that.

**1:02:57** · And we treat conversations as a new primitive freely in AI age.

**1:03:01** · It lets you deback right down to every sub-agent, every tool call, every word, every token, even.

**1:03:07** · And seeing how your users use agents in that detail really unlocks the new potential of debugging and improving your agentic applications.

**1:03:16** · The AI observability app offers concrete improvements for your agents, and it analyzes the system prompts and the tool definitions based on real conversations that your users have with the agents.

**1:03:27** · That unlocks the new potential of debugging and improving these applications.

**1:03:32** · And we use this also quite often in legal funnel system experience.

**1:03:37** · And this is one of my favorite - online evaluations. So online evaluations, you can implement real time continuous evaluations of your agents in production.

**1:03:47** · And this will ,more than ever, allow you to monitor if your system prompt changes really improve the agent's quality or not.

**1:03:54** · And combining this with Grafana alerting really unlocks the new potential and gives this complete feedback loop.

**1:04:01** · Yeah. We think that most software now is going to become agentic in some way or interacting with agentic software in some way.

**1:04:08** · And we want to be there right with you as you enter into this AI age.

**1:04:13** · And we do this together and don't create more AI slop, please. So that's AI observability in Grafana Cloud.

**1:04:22** · Everything you need to build AI agents, AI technology at scale.

**1:04:28** · And that was our Grafana AI update. Easier to get started now with Assistant.

**1:04:33** · You can just self-serve it. You can ask it questions.

**1:04:36** · You don't feel embarrassed asking the obvious question that everyone else knows and you don't.

**1:04:41** · It's going to turn your whole team into observability superheroes.

**1:04:45** · If you're building agents, try our new AI observability.

**1:04:49** · This unlocks the next generation of insights into the AI's performance and behavior.

**1:04:54** · And take advantage of all the customization tools that we offer so you can really make assistant your own and scale it across your org. If you use the desktop coding agents, then you're going to love the new CLI GCX, plugs right into your terminal and into your coding apps. And thanks to Sven, Grafana Assistant is now available everywhere.

**1:05:16** · So now we're going to hand back to Raj and Torkel to take us home. Thank you.

**1:05:29** · Thanks, Mat. Thanks, Sven.

**1:05:30** · Lots of amazing AI stuff going on in case you can't tell. And also thanks, Mat, for your amazing British accent. We all love it. So speaking of AI, one of the themes I really wanted to get across is there's a lot of hype, there's a lot of "marketecture," there's a lot of slop, there's a lot of false promises with AI. Pardon my Spanish.

**1:05:54** · There's a lot of bullshit. And I think this hype is really annoying people.

**1:05:58** · I don't know if people here are kind of annoyed at how much false promises, marketing driven solutions and kind of BS there is in the AI world right now. Do other people feel it? Yeah, that's what I thought.

**1:06:14** · And so our strategy at Grafana Labs, we've used the word actually useful AI.

**1:06:20** · So last year there wasn't a lot of AI topics at GrafanaCON.

**1:06:25** · There were some, but not a lot. This year we're kind of all in and full on.

**1:06:29** · And the reason why that is, is because we really believe this stuff is actually useful.

**1:06:34** · That's a key requirement for us. We're an engineering driven company.

**1:06:39** · We're kind of allergic to marketing hype. We're allergic to false claims.

**1:06:44** · Our engineers are very skeptical people, like many engineers.

**1:06:47** · And so we really need to make sure that this stuff is actually useful and provides real value, and we're confident that it does.

**1:06:54** · So our AI strategy isn't just about a particular product, but it's really interwoven in our overall roadmap.

**1:07:01** · So there's a couple of examples here. The new Loki engine that we talked about, massively improved performance. Yes, that's going to be really important even for non-AI use cases, but for the agentic world, these things are running in an interactive debugging loop. Speed is highly important, right? Agents are very iterative, they run hypotheses.

**1:07:21** · And so the query performance of Loki becomes paramount in this new agentic world, and we're thinking ahead on that. Similar with the new Grafana schema, yes, that locks down the definition for a Grafana dashboard.

**1:07:34** · Is that a good thing? Absolutely. But in the agentic world, it's particularly important because that means that agents are going to be able to more easily build Grafana dashboards and then test and validate them using the schema. So we're really excited about all this stuff.

**1:07:49** · And one of the things that we talked about in the keynote that I'm honestly really excited about, but also quite afraid of is the fact that we're offering Grafana Assistant to the 99%. It's not just going to be limited to the 1% of Grafana users.

**1:08:03** · As we mentioned, we're going wide and we're making Grafana Assistant available for free to the 35 million Grafana users around the world. Now, I was talking to our Chief Financial Officer about this and he was kind of worried. So I'm excited. Please use it, but maybe not too much because we're going to have to figure it out as we go.

**1:08:26** · But in all seriousness, we're really excited about getting Grafana Assistant in the hands of everybody, and we really look forward to your feedback.

**1:08:33** · But the really cool thing about our AI story is it's a way that it comes back to our original roots and some of our original goals. Torkel?

**1:08:40** · Yeah. So one thing that strikes me after seeing everything presented today is how well it ties back to one of our early posters, in fact, the first poster, democratize metrics.

**1:08:52** · This was unveiled more than 10 years ago at the very first GrafanaCON in 2015. And back in those days, it was a simpler time. Grafana just did metrics. And with it, we wanted to really rally around making monitoring and data visualization tools easy to use and more powerful.

**1:09:15** · And I think a lot of what we've been doing this past decade has been working towards this mission.

**1:09:22** · And with this kind of recent features in Grafana 13 and especially the new AI features, I think they fulfill this mission in ways that I could never have envisioned over a decade ago. So really, really exciting times.

**1:09:36** · And with that, I want to thank everyone who's been part of the keynote, and I want to thank all of you for being here. I hope you have a great conference.

**1:09:45** · Grab me in the hallway if you have a feature request or pet peeve about Grafana.

**1:09:49** · I'm sure you do. I want to hear them. And with that, I hope you have a great conference and welcome to GrafanaCON.

**1:09:57** · See you, everyone.