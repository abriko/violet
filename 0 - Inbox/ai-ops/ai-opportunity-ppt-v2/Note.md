
Hi I'm Vin from HK devosp team, let's connitune our AI opportunity form a devops perspective.

## P8  
What this slide says is simple.

Our current way of operating is reaching its limit.

In Q1, we ran a survey across the HK team,  
and got 136 responses.

The message was very clear.  
The biggest pain point was release and deployment procees, with 118 mentions.  
Jenkins was next, with 83 mentions.  
And 54 percent of people said Jenkins was the hardest tool to use.

At the same time,  
our service footprint keeps growing.  
Across all environments,  
we already manage more than 3,700 service deployments.

So these numbers are not just complaints.  
They show that the scale is growing,  
but our operations are still too manual,  
and too reactive.

That is why we need to change now.

## P9  
Let’s make the challenge more specific.

For one normal BAU task,  
it is usually not just one service in one place.  
It often involves multiple services,  
across multiple environments.

To finish one deployment,  
the engineer may go through CI, release, and CD pipelines.  
So the whole process feels like a matrix.

If we look at *Jenkins*,  
the first thing you notice is the amount of navigation:  
projects,  
environment folders,  
service folders,  
pipelines,  
and then the steps inside each pipeline.

So engineers keep jumping between pages,  
just to get one task done.  
That is the unhappy path.

Before this,  
even one environment deployment could take around nine manual actions.  
And even if everything went well,  
it still took about 40 minutes,  
with someone watching the whole process.

If something breaks,  
it gets even worse.  
The engineer has to click through different views,  
search logs,  and try to figure out the root cause.

We can see this too complex, and for someone without experience
the easiest path is just to send everything to DevOps  
and ask DevOps to troubleshoot it.

So here I want to show a different path.

This is still in POC stage.  
But now the engineer just selects the services,  
runs a batch deployment with one click,  
and if something goes wrong,  
just clicks Analyze.

Then the system gives an AI-based diagnosis  
and suggested next steps.

This is the happy path we want to build.

## P10
So where do we go next?

We do not see AIOps as one isolated tool.  
We see it as three connected capability tracks.

Right now, the main focus is UC1:  
Delivery & Release Intelligence.

This is the fastest path to visible value.  
L1 is already live.  
L2, L3 are the next practical steps.

Then on top of the same shared agent layer, we extend into UC2 and UC3.

UC2 is about going from monitoring, to diagnosis, to safe automation.  
That means proactive signals, RCA support, and controlled auto-fix in safe scenarios. 
For example, environments restart sometime break service, 
service can't start Normally, we can use AI auto-fix this.

UC3 is FinOps AI.
We want to provide cost observability and recommendations for all HK projects.

(The key point is that we are not pushing all three tracks equally on day one.  
We lead with UC1 first,  
because it delivers value sooner and builds the foundation for the other two.)

## P11 
Now let’s talk about ROI.

Today, incident handling is still mostly manual.  
And with the AliCloud migration, the pressure is only getting higher.

In the last three months,  
we saw more than 50 incidents per month.  
And on average,  
each one took about two and a half hours to resolve.

That creates two problems.  
Delivery gets blocked.  
And DevOps gets dragged into firefighting again and again.

What Delivery & Release Intelligence changes first is speed.  
Instead of spending hours reading logs and routing issues by hand,  
engineers can get a first diagnosis in one to two minutes.

That means faster recovery,  
less interruption,  
and less dependency on DevOps.

So the value is not just lower MTTR.  
It also gives engineers more time to build,  
instead of chasing failures.

## P12
The second ROI area is cost.

We already have one real example.  
This year, one manual DB review saved about 100 thousand US dollars.

That saving was real.  
But it came from one human review, and on one resource type.

We have not yet done the same kind of review across Redis, MQ, deployments, and many other cloud resources.

So The point is that the current manual approach only finds isolated opportunities.

If we put FinOps AI into BAU,  
it can scan more resources,  
more often,  
and at a much bigger scale.

So 100 thousand is not the limit.  
It just proves the opportunity is real.


# safely related

In our current design, the governance Layer makes sure AIOps stays safe and enterprise-ready.
AI can help with analysis and recommendations, but it cannot bypass control.
We keep RBAC, human approval for production, full audit trails, and a most important policy checks on what actions are allowed.
So we improve speed, without losing governance.


Q: How do you make sure AIOps is secure?
A:
Our principle is simple:
AI can accelerate operations, but it cannot bypass governance.
For production, we keep a human approval gate.
Access still follows RBAC, actions are policy-controlled, and every AI session is fully auditable.

Q: Can AI make production changes automatically?
A:
For production, the default is human approval plus policy checks.
So AI can recommend and prepare actions, but it does not bypass change control.

Q: How do you prevent hallucination?
A:
We do not rely on free-form answers alone.
We want evidence-linked RCA, tied back to logs, metrics, or events.
If confidence is low, the case escalates to a human instead of acting automatically.

Q: What about data leakage to external LLMs?
A:
That is a core control.
Sensitive data, especially PII, should not go to external models.
So model routing, masking, and output filtering are built into the governance layer.

Q: How do you audit what the AI did?
A:
We log the full session context:
prompt, tool calls, model used, outputs, and cost.
So every AI-assisted action is traceable and reviewable.


Q: What if the AI gives the wrong recommendation?
A:
Then it should fail safe, not fail open.
Low-confidence or high-risk cases should escalate to a human.
Our goal is to reduce manual effort, not remove human judgment where it still matters.
