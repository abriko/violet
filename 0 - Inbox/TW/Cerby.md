Thanks for the detailed business overview yesterday. We understand Cerby's goal is to set up a new region in China, a full replica of the US region.
Please correct me if I am wrong.

So for today can we have a introduce about the Cerby System Architecture?

*Overview*

1. For architecture design, if the China region is a replica of the US region, do we need to transfer data between them, or are all regions independent?
   >no us
2. How about SGP region, what is use for.
   >1 
3. From email said "We have Potential challenges for AWS (not a blocker at the moment)" can we have more details?
4. Program language.
   > PY and Node
5. For Cerby what is the Amazon pinpoint use for? Amazon pinpoint not available in China Region.
6. Which service provides the Cerby-managed email address and phone number?
   > 1
7. Has plan have test envs in China.
   > 1
8. infra provide by Terraform
   > 99% TF

---
*How to integrate*
1. Can we have example Cerby how to integrate with social media like TikTok, twitter. it's via public API or something else. 
2. Can we share technical details document for integrate. We want to use to evaluate onboard china social media.
3. I don't should we have faced before. How to integrate if social media didn't provide public API.

---
*Progress*

1. Can we know current China deployment progress.
   >1
2. Current highest priority issues?

----
*Monitor*

1. Could we walk through the current monitoring setup?
>1

2. Sentry captures errors from both the frontend and the backend? Or just frontend side.
   >1

slack alert

---
*Spike doc*

1. Previously shared a spike document about GitHub action runner connective issue. What’s current status? Is the deployment issue resolved?
2. In Spike document mentioned ECS, but this service not in diagram. What ECS use for?
   > jobs
3. Do we any other known issues during setup China region.

----
*CN domain*

1. In the previously meeting said "domain issue?" it's related CN domain registration? Can we share more details about this?
   >1


EMR <- EC2
89% serverless

---

First I want thanks Francesoco super detailed sharing yesterday. We have review current information and compare to backlog shared to us Cerby in setup China region, Cerby uses the right tech to solve this problem, and it's Clear and straightforward.

For the upcoming assessment, we're plan targeting the China region blocker.  We'll explore alternative solutions, such as  domain, DX

We also want to share some demos of best practices for setting up a CI/CD environment and monitoring stack in China.  This will help Cerby succeed in China.

About this plan any feedback suggestion or concerns or anything we missed.


．
---
First will be IoT SIM card, some mobile network operator are offering IoT SIM card, which is best way to getting a large number of phone number.
But the operator API only can control the SIM card level things, something like active card, deactive card, recharge card. For Cerby will required physical devices and developing the feature by itself.
If the Cerby US provider can retrieve SMS via API, compare to this way are more complex obviously.

Second will be virtual phone number or call private phone number, the Alibaba cloud and Huawei cloud are offering this kind of service. Basically you can have mulitable virtual number phone number linked to a physical number, similar to alias. Cerby can use different virtual number link to different service.
But the limitations are we still need a physical number still needed. And this feature we will verify from product document, because to use this virtual number required enterprise certified account, which current we don't have it.

The last one is we test RED and Bilibili both support use US phone number to registering or switch current China phone to US phone number, and we also verified the content or user view things is no difference between two conntries phone register users.
like I said current we only verified RED and Bilibili, the rest of social media we will continue investigation. If there is no major problem we believe Cerby can continue use currentlly phone provider.


---
Ok for email part, since some social media platforms still support email login, and it's the easiest way for us to manage, we went ahead and investigated email options.
Our understanding is currently, SES and Pinpoint not available in AWS China. 

But unfortunately cloud providers in China didn't provide program friendly feature compare to AWS SES.

We can see email related services have been split into two types, one is focus on delivery mail, or we call notification service. Another one is the traditional mailbox, license by how many accounts needed, and because is real mail account so need to use the POP3 protocol to retrieve mail.


**

This is a workflow to Purchase virtual phone number, I have marked some steps where we'll need to wait or get approval.

  

As we can see on step 2 will review company info by huawei

  

At setp 5 will review qualification by network operator,

  

At the step 7 will need to have real name verification, finally we can getting our number.

  

I want Mentioned step 5，there have a lot docs need to prepare，

  

I want highlight here We declare the need to use SMS，and we also get scenario by why need to SMS

---
**So for SMS alternative solution, current we have 4 options, first one is purchase IoT SIM card, second one is virtual phone number provide by huawei cloud, next one we also tried change social media account phone number to Cerby managed-phone in US on biz sile. Last one we investigate few current SMS platforms.

As you can see, we don't have a perfect solution at this time, each options has limitations or risk.

  

For SMS receive platform, there is no official channel or reliable service provider, and this kind of services often used in legally gray areas, we wouldn't recommend going with this one.

And for Cerby managed-phone, we test all social media, expect weibo the rest of all support change to cbery phone, also there have potential risk for real-name authentication we went to highlight here.

  

For IoT SIM and Virtual phone number let’ go to the details one by one.**
**

the operator's API can only manage SIM card-level functions, such as activating, deactivating, and recharging cards.

If Cerby want use IoT sim card build Cerby managed-SMS, this will required Cerby need have physical devices and similar will build a SMS receive platform by our self.

Or we also known there have Third-party operation can help customer opera SMS receive platform, but this will required SP License, about this license will getting more details later.

  
  
**
**

For virtual phone number we compared products from cloud provide Alibaba and Huawei cloud, Basically you can have multiple virtual number phone number linked to a physical number. But unfortunately Alibaba cloud not allowed follower SMS, we have rule out that it. 

Huawei cloud also has Limitations, Since this is a virtual number, unlike a real phone number, you'll need to link it to at least one real phone number before you can use it. and can not send SMS via API, one real number only allowed attach to 5 virtual numbers.

 Technically it meets all our requirements, before we going next slide any questions?

**

**We believe have two ways integrate to our system.

So for method 1, we can line virtual phone number to Cerby managed-phone

Pros is

  

Cons is

  

The another way is**

We can integrate our system with huawei cloud, every time has new SMS the virtual phone number service can sent a callback to our endpoint. The payload like this

  

That mean integrate our system by this way

  

Pros is

  
  

Cons

  

Any questions about this two high level integraate solution

  

So everything looks fine right, except how to Purchase this service

**

And Use of words for calling, because this kind of service mainly use to taxi or food takeout delivery kind of service to Protect real information from being accessed by service provider. But the service provide the cerby managed-phone Legally, it's kind of a gray area. It's not technically forbidden, but it might break phone-based verification.  And in China, that's how real-name authentication works. You can see if you want getting some new number，you need finish real name verification，but use Cerby managed-phone to anothers many has legal problem，as you know TW are not good at this, it's best to have it checked by professionals legal dept.

  

Back to the application， We're worried that if we tell the operator about the actual Cerby usage, they might ask us for an SP license.

**