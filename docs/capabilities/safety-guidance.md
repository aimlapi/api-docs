---
description: >-
  Avoid content policy violations and bans on AI/ML API: tag end users with
  safety_identifier, route NSFW content to models that allow it, and block CSAM.
---

# Safety Guidance

AI/ML API sends your requests to models run by many providers: OpenAI, Anthropic, Google, xAI, Mistral and others. Each provider has its own usage policy and its own safety filters, and applies them to every request that reaches it. One model may answer a prompt that another refuses.

Providers also act against the accounts behind the traffic. An account that keeps sending refused content gets warned, limited and finally cut off. To keep every model available to every customer, we track these refusals too. When a provider refuses a request under its usage policy, we count it against the end user who sent it, if you tell us who that is. Otherwise it counts against your account. Repeated refusals lead to restrictions, which build up gradually.

This guide explains how that works and how to keep your application clear of it. Three things matter:

1. **Identify your end users** with `safety_identifier`. A refusal then counts against the person who caused it, not your whole account.
2. **Route sensitive content** to models whose providers accept it. The [Dynamic Router](../api-references/text-models-llm/AI/ML-API/dynamic-router.md) can do this for you on every request.
3. **Keep prohibited content out** of the API entirely. No model or route makes it acceptable.

{% hint style="info" %}
Short on time? The [checklist](#checklist) at the end sums it up.
{% endhint %}

## How restrictions work

### What counts as a refusal

Only a provider's refusal on usage-policy grounds counts. In your responses it looks like one of these:

* **HTTP `400` with `error.code` `content_policy_violation`.** The provider refused the request, usually because of what you sent: a prompt or an image.
* **HTTP `200` with `finish_reason` `content_filter`.** The model started to answer and a safety filter stopped it.

Ordinary errors do not count: invalid parameters, timeouts, rate limits, an unavailable provider. Neither does a refusal that concerns the provider's arrangements with us rather than your content.

{% hint style="warning" %}
**A refused request is not retried on another provider**, even when the model has fallbacks. The next provider would only refuse the same content again. To avoid a refusal, pick the right model **before** you send the request. [Step 2](#step-2-route-nsfw-and-other-sensitive-content-to-models-that-accept-it) shows how.
{% endhint %}

### How refusals are weighed

We look at the pattern, not at single requests:

* What you send counts more than what a model generates. A refused prompt weighs more than an answer that a provider's filter stopped.
* A refusal that states its reason weighs more than a generic "flagged".
* The more serious the category, the faster restrictions build up. Sexual content involving minors has zero tolerance (see [Step 3](#step-3-keep-prohibited-content-out)).
* An occasional refusal in a large workload that is otherwise clean is treated differently from a steady stream of refusals.
* Your standing recovers gradually on days without refusals.

### What happens, step by step

| Stage | Applies to | What happens | What you see |
| --- | --- | --- | --- |
| Warning | Your account | Your rate limit is lowered for a while. | More `429 Too Many Requests` than usual. |
| End user blocked | One end user (their `safety_identifier`) | Requests that carry this identifier are refused for a while, whatever the model. The rest of your app keeps working. | `403` `Usage policy restriction: requests for this end user (…) are blocked until <time> …` |
| Provider closed | Your account, one provider | That provider's models are closed to your account for a while. Every other provider's models keep working. | `403` `Usage policy restriction: access to <provider> models is closed for this account …`, unless another route is left. For example, the Dynamic Router answers with another model of the bucket. |
| Suspended | Your account | Every API request is refused until our team lifts the suspension. | `403` `Usage policy restriction: this account is suspended …` |

* All restrictions end on their own, except a suspension. The `403` message says when.
* If many of your end users are blocked within a short time, your whole account is restricted. Rotating identifiers to escape a block does not help: the problem moves to your account.
* Providers also act on their own side, and some of their blocks are permanent. We can lift our own restrictions, but we cannot reverse a provider's decision.
* Your dashboard keeps working at every stage. Asynchronous jobs accepted before a restriction still complete and are charged. While an account is suspended, their results cannot be fetched.

## Step 1: Identify your end users with `safety_identifier` <a href="#step-1" id="step-1"></a>

If your app serves other people, add `safety_identifier` to every request. It is a stable, anonymous string that identifies the person the request is for:

```json
{
  "model": "openai/gpt-6-luna",
  "messages": [{ "role": "user", "content": "Hello!" }],
  "safety_identifier": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
}
```

What it changes:

* A refusal weighs mostly on that end user. Your account takes only a small share of it.
* An end user who keeps getting refused is blocked for a while, alone. Everyone else keeps working.
* Without it, all your traffic looks like one user to us, and every refusal counts against your whole account.

Rules for the value:

* **Stable.** The same person always gets the same value, and different people get different values.
* **Anonymous.** Never send a name, an email address or a phone number. Hash your internal user id, as shown below.
* **At most 256 characters.** An empty or longer value is ignored, as if you had sent none. The request itself still runs.
* **Sent on every endpoint.** Chat Completions, Responses, Messages, images, video, audio: put it in the request body, next to `model`.
* **Older fields still work.** If you already send OpenAI's older `user` field, or `metadata.user_id` in the Anthropic Messages format, we read those too. `safety_identifier` wins when both are present.

For safety scoring we keep only a keyed hash of the identifier, scoped to your account.

A keyed hash (HMAC) of your own user id works well. A plain SHA-256 of an email address can be reversed by hashing a list of known addresses; an HMAC cannot be reversed without your secret. Keep the secret fixed, because changing it changes every identifier.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import hashlib
import hmac
import os

# Any long random string that only you know, e.g. from an environment variable.
ID_SECRET = os.environ["SAFETY_ID_SECRET"].encode()


def safety_identifier(user_id: str) -> str:
    """A stable, anonymous id for one of your users: 64 hex characters."""
    return hmac.new(ID_SECRET, user_id.encode(), hashlib.sha256).hexdigest()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
import { createHmac } from "node:crypto";

// Any long random string that only you know, e.g. from an environment variable.
const ID_SECRET = process.env.SAFETY_ID_SECRET;

// A stable, anonymous id for one of your users: 64 hex characters.
export function safetyIdentifier(userId) {
  return createHmac("sha256", ID_SECRET).update(String(userId)).digest("hex");
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

**Users who are not signed in.** Use a stable device or session id. It is better than nothing, but easy to rotate. Protect sign-up and limit anonymous use: many blocked end users restrict your account too.

**When an end user is blocked**, you get a `403` whose message starts with `Usage policy restriction: requests for this end user`. Tell that person, and do not retry before the time in the message.

## Step 2: Route NSFW and other sensitive content to models that accept it

### Policies and filters are different things

Two things decide whether a request goes through:

* **The provider's usage policy** says what you may send to its models at all. It applies even when a model answers without complaint.
* **The model's safety training and the provider's filters** decide what actually gets answered. Strict filters refuse content that the policy may allow, and each of those refusals counts.

Routing solves the second problem. Only you can solve the first: never send a provider content its policy forbids, whatever its model would do with it.

Policies differ most on sexual content between adults (NSFW content). We check providers' policies continuously and keep this table up to date. Still, each provider's own policy is the final word, so follow the links:

| Provider | Sexual content between adults | Never allowed, for example |
| --- | --- | --- |
| [OpenAI](https://openai.com/policies/usage-policies/) | Not prohibited by the policy. Its models and moderation are strict, though: expect refusals. | Sexualizing anyone under 18, sexual violence, non-consensual intimate content, using someone's likeness without consent |
| [Anthropic](https://www.anthropic.com/legal/aup) | Prohibited: sex acts, sexual fetishes and fantasies, erotic chats | Sexualizing minors, including in fiction and roleplay |
| [Google](https://policies.google.com/terms/generative-ai/use-policy) | Prohibited: sexually explicit content created for pornography or sexual gratification | Child sexual abuse, non-consensual intimate imagery |
| [xAI](https://x.ai/legal/acceptable-use-policy) | Not prohibited | Sexualizing children, undressing or sexualizing real people, pornographic depictions of a person's likeness |
| [Mistral](https://legal.mistral.ai/terms/usage-policy) | Not prohibited | Child sexual abuse material, intimate images of a person without their consent, using someone's likeness without consent |

For any other model, read its provider's policy before you route sensitive content to it.

### Route with the Dynamic Router

`aimlapi/dynamic-router` routes each request by what it contains. It works on Chat Completions, Responses, Messages, image generation and editing, and video generation:

1. You describe up to ten buckets in your own words.
2. A decision model reads the request, images included, and picks the bucket whose description fits it best.
3. The request runs on the first model of that bucket that can take it.

A bucket with no models (`models: []`) ends the request at the decision, so your own code can handle it.

{% hint style="info" %}
**Jev Router, d1 Router or Dynamic Router?** All three take the same `router` object. The [Jev Router](../api-references/text-models-llm/ml-api/jev-router.md) (`typesafe/jev-router`) and the [d1 Router](../api-references/text-models-llm/Liquid-AI/d1-router.md) (`liquid/d1-router`) are presets of the Dynamic Router. Without a `router` object they route chat requests by how hard the task is. With one, they route by your buckets, and only their decision model is fixed: TypeSafe Jev or Liquid's d1. `aimlapi/dynamic-router` also lets you choose the decision model. This guide uses it, but the same buckets work on the Jev Router.
{% endhint %}

The setup below uses three buckets:

* `general` takes requests without sexual content. Mainstream models with strict filters answer them.
* `mature` takes sexual content between adults. Models whose providers allow it answer.
* `blocked` takes content that no model may receive. No model runs, and your code refuses the request.

{% code title="router" overflow="wrap" %}
```json
{
  "buckets": [
    {
      "name": "general",
      "when": "No sexual content: questions, coding, work, study, advice, news, health and sex-education facts, and stories or roleplay without sexual detail. Romance that stops at flirting, a kiss or a fade-to-black belongs here.",
      "models": ["openai/gpt-6-luna", "google/gemini-3.5-flash-lite"]
    },
    {
      "name": "mature",
      "when": "Sexual or erotic content between adults: sex scenes, erotic stories or roleplay, sexting, explicit descriptions of bodies or sexual acts, fetishes, or a request to make a story or roleplay more sexual or explicit.",
      "models": ["x-ai/grok-4-1-fast-non-reasoning", "mistralai/mistral-large-4-0"]
    },
    {
      "name": "blocked",
      "when": "Sexual content that must never be produced: anyone under 18 or described as a child or minor; a real, identifiable person (a celebrity, someone the user knows, someone in a photo); non-consensual or violent sex; undressing or nudifying a photo of a person.",
      "models": []
    }
  ],
  "default_bucket": "general"
}
```
{% endcode %}

| Setting | What it does |
| --- | --- |
| `decision_model` | Optional: the model that picks the bucket. Leave it out to use our default, a version of TypeSafe Jev that we have tested for routing. `typesafe/jev` always means the newest Jev. The other decision models you can name here, such as Liquid's d1 family, are listed under [Decision Models](../api-references/decision-models/README.md). The Jev Router and the d1 Router keep their own decision model and refuse another one with a `400`. |
| `buckets[].when` | The description the decision model matches each request against, in your own words: up to 500 characters. This is the decision step's prompt. |
| `buckets[].models` | Up to ten models, tried in order. A bucket may mix chat, image and video models; each request uses the bucket's models of its own kind. The first one that can take the request (its tools, images, JSON schema, context size) answers. If it fails, the next one does. A policy refusal is final, though, here as everywhere. `[]` means no model: the request ends at the decision. |
| `default_bucket` | Where a request goes when it is not judged: the decision model failed, timed out or declined, or the message had no text. |
| `min_confidence` | Optional, 0 to 1. A decision less sure than this goes to `default_bucket` too (`meta.router.reason` is `unsure`). |
| `force_bucket` | Optional: sends the request to this bucket without a decision, and no judgement is charged. Use it to test how your app handles each bucket. Not allowed with `ladder`. |
| `ladder` | Optional. `true` turns the buckets into a one-way ladder for conversations, so a conversation never goes back to a stricter bucket. See [the ladder](#keep-a-conversation-on-its-rung-the-ladder). |

The models in this example are illustrations. Choose your own from the [model list](../api-references/model-database.md) after you have read their providers' policies.

{% hint style="warning" %}
**Make your strict bucket the default.** A request that the decision model could not judge goes to `default_bucket` unchecked. There, a strict model's own filters still stop prohibited content, and a permissive model's filters might not. An occasional refusal costs you far less than prohibited content that nobody stopped.
{% endhint %}

### Send requests through the router

Send the `router` object and the `safety_identifier` with each request. The response's `meta.router` says which bucket the request landed in.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import os

import requests

API_URL = "https://api.aimlapi.com/v1/chat/completions"
API_KEY = os.environ["AIMLAPI_KEY"]

SAFETY_ROUTER = {...}  # the router object above


def reply(user_id: str, messages: list) -> str:
    response = requests.post(
        API_URL,
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={
            "model": "aimlapi/dynamic-router",
            "messages": messages,
            "safety_identifier": safety_identifier(user_id),  # from Step 1
            "router": SAFETY_ROUTER,
        },
    )
    if response.status_code == 403 and "Usage policy restriction:" in response.text:
        return "This feature is temporarily unavailable for your account."
    response.raise_for_status()
    data = response.json()

    if not data["meta"]["router"]["routed"]:
        # The "blocked" bucket: no model was called.
        return "Sorry, I can't help with that."
    return data["choices"][0]["message"]["content"]
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const API_URL = "https://api.aimlapi.com/v1/chat/completions";
const SAFETY_ROUTER = { /* the router object above */ };

export async function reply(userId, messages) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "aimlapi/dynamic-router",
      messages,
      safety_identifier: safetyIdentifier(userId), // from Step 1
      router: SAFETY_ROUTER,
    }),
  });
  const text = await response.text();
  if (response.status === 403 && text.includes("Usage policy restriction:")) {
    return "This feature is temporarily unavailable for your account.";
  }
  if (!response.ok) {
    throw new Error(`AI/ML API error ${response.status}: ${text}`);
  }
  const data = JSON.parse(text);

  if (!data.meta.router.routed) {
    // The "blocked" bucket: no model was called.
    return "Sorry, I can't help with that.";
  }
  return data.choices[0].message.content;
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

With the OpenAI SDK, pass `safety_identifier` and `router` in `extra_body`.

Here is the `meta` of a request that the decision model put in `mature`. The values are illustrative:

{% code overflow="wrap" %}
```json
"meta": {
  "model": "x-ai/grok-4-1-fast-non-reasoning",
  "provider": "xai",
  "router": {
    "id": "aimlapi/dynamic-router",
    "routed": true,
    "bucket": "mature",
    "reason": "classified",
    "decision_model": "typesafe/jev-1.14",
    "choice": "mature",
    "confidence": 0.97,
    "judgement": { "inference_id": "V1StGXR8Z5jdHi6BmyT8k", "credits": 44 }
  }
}
```
{% endcode %}

A request that lands in `blocked` gets an HTTP `200` with an empty assistant message (`content: ""`, `finish_reason: "stop"`). Its `meta.router` has `"routed": false` and `"bucket": "blocked"`, and only the judgement is charged.

### Keep a conversation on its rung: the ladder

By default, every turn is judged on its own. Suppose a conversation turns mature, and then the user sends an ordinary message. That message is judged `general`, so the request goes to a strict model with the whole conversation, explicit turns included. The strict model is then likely to refuse it, and the refusal counts.

For conversations, turn on `"ladder": true`. Your buckets then become the rungs of a ladder, in the order you list them, strictest first:

* **A conversation starts on the top rung and only moves down.** Each turn is judged against all your buckets, but a verdict above the conversation's rung keeps it where it is. It climbs back only once the message that moved it is gone from the conversation: the user deleted it, or started a new chat.
* **The last rung may have no models.** A conversation that reaches it ends there. Every later turn stops unjudged and free of charge until the message that put it there is removed. No other rung may be empty.
* **Send back the state.** Each answer carries `meta.router.state`, an opaque value; in a stream it comes on the last event. Send it as `router.state` with the next turn of the same conversation. With it, the router judges only what is new: the previous answer and the new message. Without it, or when the history no longer matches (edited, trimmed or branched), the router judges the whole conversation again. That takes more judgements and is slightly less accurate. Always send the latest state you received for the conversation; the router notices when the history has changed. A state works only for your account, and only for that ladder.
* **`meta.router.trigger` names the message that moved the conversation down.** Tell the user which message to delete to continue.
* **An unsure or failed judgement never moves a conversation up.** The turn goes to `default_bucket`, but never to a rung above the conversation's own, and the part that failed is judged again on the next turn. A passing outage never ends a conversation for good. To make the ladder fail closed, name the last rung as `default_bucket`. Leave `min_confidence` out, or keep it low: a high threshold lets explicit turns pass as unsure.
* **Some content is never judged:** instructions (`system`), tool results, tool-call arguments, files, audio and video. Images are judged; an image the decision model could not see counts as unjudged, so the turn goes to `default_bucket`. If your instructions are sensitive themselves (an 18+ persona, for example), leave strict models out of that app's ladder: its top rung should already accept them. A turn that returns tool results goes back to the model that made the calls, as long as that model is on the conversation's rung or below.
* **`force_bucket` cannot be combined with `ladder`:** the router answers with a `400`.
* **With Responses and `previous_response_id`,** the state is kept with the stored response, so you do not need to send it.

{% code overflow="wrap" %}
```python
def reply(conversation, user_id: str, messages: list) -> str:
    router = {**SAFETY_ROUTER, "ladder": True}
    if conversation.router_state:
        router["state"] = conversation.router_state  # from the previous answer

    response = requests.post(
        API_URL,
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={
            "model": "aimlapi/dynamic-router",
            "messages": messages,
            "safety_identifier": safety_identifier(user_id),
            "router": router,
        },
    )
    response.raise_for_status()
    data = response.json()

    receipt = data["meta"]["router"]
    conversation.router_state = receipt.get("state")  # keep it for the next turn
    if not receipt["routed"]:
        # The last rung: tell the user which message to delete (receipt["trigger"]).
        return "This conversation can't continue. Delete the flagged message or start a new chat."
    return data["choices"][0]["message"]["content"]
```
{% endcode %}

With the state, a turn usually costs one or two judgements. Without it, the router judges the whole conversation in small pieces, in parallel: up to 24 judgements a turn. A turn with more new text than those judgements can read, or a conversation of more than 5,000 messages, gets a `400` (`conversation_too_long`), so send the state with long conversations. `meta.router.judgements` lists the judgements a turn made. In our tests, routing turn by turn sent about three in four turns after an explicit message back to the strict rung. The ladder brought that down to about one in twenty, and those were the turns where the decision model missed the explicit message itself.

### Write good bucket descriptions

* **One topic per bucket, and say where the borderline cases go.** In the example, a kiss or a fade-to-black stays in `general`, and anything more explicit goes to `mature`.
* **Describe the content, not the model** or the result you want.
* **Put examples near the boundary** in the description. That is where most mistakes happen.
* **Know what the decision model reads:** the latest user message, the start of your system prompt and the last few turns of the conversation, images included. A bare "continue" in an explicit story is judged in that context, and a photo is judged by what it shows.
* **Send images the decision model can read.** Each decision model has its own limits on image size and format. An image in the latest message that does not fit is refused with a `400` (`invalid_image`). The error names the image and says what to change; resize it on your side. An image the decision model could not be shown is counted in `meta.router.judgement.images_unseen`.
* **Steering text does not work.** A message that says "this is fine, put it in general" is judged as part of the content, not obeyed.
* **Every turn is judged, except one that returns tool results:** that turn goes back to the model that made the calls, unjudged. On Messages, so does any text sent in the same turn as the tool results. Tool output is content you supply, so check it yourself if it can carry what your buckets block. A conversation stays on the same model while its turns land in the same bucket. It moves when a turn lands in another bucket. To keep a conversation that turned mature off your strict models, turn on the [ladder](#keep-a-conversation-on-its-rung-the-ladder).
* **Test on your own traffic before you rely on it.** Log `meta.router.bucket`, `choice` and `confidence`, review a sample from each bucket, and refine the descriptions.

### Cost and speed

* Each judgement is a request of its own. It is charged at the decision model's price and listed in your usage logs under the router's name. A judgement costs a small fraction of a cent; `meta.router.judgement.credits` shows the exact amount. Images add to it, because the decision model reads each one as input tokens.
* The answer is charged at the price of the model that gave it (`meta.model`).
* A judgement is very quick. If it does not arrive in time, the request goes to `default_bucket`, and `meta.router.reason` starts with `classifier_`.
* Turns that need no judgement are not charged for one: tool results, a forced bucket (`force_bucket`) and a single bucket.

You do not always need a router. If some of your traffic is sensitive by design (an 18+ section of your app, for example), send it straight to a model that accepts it.

### Images, video, Responses and Messages

The same `router` object works on every API the router serves. Send `"model": "aimlapi/dynamic-router"` with your `router` to `/v1/responses`, `/v1/messages`, `/v1/images/generations`, `/v1/images/edits` or `/v2/video/generations`. The decision model reads the prompt or conversation and its images, as on Chat Completions.

* **Each request uses the bucket's models that its API serves.** That means chat models on Chat Completions, image models on the image endpoints, and so on. Responses and Messages serve fewer models: for example, Messages serves Claude models. A bucket may list models of every kind side by side. The [model list](../api-references/model-database.md) shows which API serves a model. A request with input images goes only to a model that accepts them. If none of the bucket's models takes an input you send, the request is refused with a `400` that names the field.
* **A bucket with no model for the request's API passes the request on** to another bucket, and `meta.router.spilled_from` says so. With `ladder`, it only passes the request to a rung below; if no such rung has a model for that API, the request gets a `400`. A mature request passed on to your strict models is refused. For every API you use, either list a suitable model in `mature`, or give the bucket no models at all.
* **A request that ends at the decision is answered in the API's own shape.** Responses and Messages answer with an empty response. Images answer `{ "data": [] }`. Video answers `{ "id": …, "status": "completed", "video": null }`, and polling that id returns the same.
* **Where the receipt is.** `meta.router` is in the JSON body. In a stream it comes on the last event: `response.completed` on Responses, `message_stop` on Messages.
* **A conversation continued with `previous_response_id` stays with the provider that stores it.** The router judges each turn, but it can only move the turn to a model that can read the stored response. Take a conversation stored at OpenAI: a mature turn there passes on to an OpenAI model in another bucket, which is likely to refuse it. If a conversation may change buckets, send its history in `input` instead of continuing a stored response.
* **For a multipart image edit,** send `router` as a JSON string in a form field.

Image and video filters are usually stricter than text filters, and few providers accept sexual imagery at all. Unless you have verified a model for it, end mature image and video requests at the decision and decline them in your app. A `router` object travels with each request, so give media requests a router of their own. The same goes for Responses and Messages whenever your `mature` models are not served there. If `mature` listed only chat models, a mature image request would pass on to the strict image models of `general` and be refused.

{% code title="media router" overflow="wrap" %}
```json
{
  "buckets": [
    {
      "name": "general",
      "when": "No sexual content: …",
      "models": [
        "alibaba/z-image-turbo",
        "blackforestlabs/flux-kontext-pro",
        "x-ai/grok-imagine-image",
        "x-ai/grok-imagine-video"
      ]
    },
    { "name": "mature", "when": "Sexual or erotic content between adults: …", "models": [] },
    { "name": "blocked", "when": "Sexual content that must never be produced: …", "models": [] }
  ],
  "default_bucket": "general"
}
```
{% endcode %}

Use the same descriptions as in the chat router. In this example, a text-to-image request goes to `alibaba/z-image-turbo`. A request with an input image goes to `blackforestlabs/flux-kontext-pro`, the first listed model that takes input images. An image edit goes to `x-ai/grok-imagine-image` and a video request to `x-ai/grok-imagine-video`.

{% code overflow="wrap" %}
```python
def generate_image(user_id: str, prompt: str):
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={
            "model": "aimlapi/dynamic-router",
            "prompt": prompt,
            "safety_identifier": safety_identifier(user_id),
            "router": MEDIA_ROUTER,  # the media router above
        },
    )
    response.raise_for_status()
    data = response.json()

    if not data["meta"]["router"]["routed"]:
        return None  # "mature" or "blocked": decline in your app
    return data["data"]
```
{% endcode %}

## Step 3: Keep prohibited content out

No model and no route makes the following acceptable. Block it in your app before it reaches the API:

* **Sexual content involving anyone under 18**, in any form: real or fictional, text or images, roleplay, or characters described as children. Tolerance is zero. A single refusal of this kind can close that provider to your account at once, and a repeat suspends the account. Providers report such content to the authorities.
* **Sexual content about a real, identifiable person** without their consent. This includes "undressing" or "nudifying" a photo, and sexual deepfakes.
* **Sexual violence** and other non-consensual sexual content.
* **Anything illegal** where you or your users are.

The `blocked` bucket helps catch these, but it is a first line of defence, not a guarantee. You are responsible for what your app sends.

{% hint style="danger" %}
**Never send child sexual abuse material (CSAM) to the API**, known or suspected, not even to classify it or to test your setup. Neither the API nor the Dynamic Router is built to detect or handle it. Screen uploads with dedicated tools before they reach us, such as [Safer by Thorn](https://safer.io/) or PhotoDNA hash matching. Report what you find to [NCMEC](https://report.cybertip.org/), the [IWF](https://report.iwf.org.uk/) or your national hotline. To test how your app handles the `blocked` bucket, use `force_bucket`, not real content.
{% endhint %}

{% hint style="warning" %}
If your app serves adult content, you are responsible for the legal duties that come with it wherever your users are. One example is age verification, required under the UK Online Safety Act and several US state laws. This guide is not legal advice.
{% endhint %}

## Handle refusals and restrictions in your code

| Signal | Meaning | What to do |
| --- | --- | --- |
| `400` with `error.code` `content_policy_violation` | The provider refused the request under its policy. It counts. | Do not resend the same content to another model. Tell the user, and log the `request_id`. Route this kind of content differently from now on. |
| `200` with `finish_reason` `content_filter` | A filter stopped the answer. It counts. | Same as above. |
| More `429` responses than usual | Possibly the warning stage. | Slow down, and check how often your requests are refused. |
| `403` `Usage policy restriction: requests for this end user …` | That end user is blocked until the time given. | Tell that user. Do not retry before then. |
| `403` `Usage policy restriction: access to <provider> models is closed …` | That provider is closed to your account for a while. | Use other models. The Dynamic Router skips the closed provider for you. |
| `403` `Usage policy restriction: this account is suspended …` | Every request is refused. | Contact [help@aimlapi.com](mailto:help@aimlapi.com). |

Recognize restrictions by the message prefix `Usage policy restriction:`. Retrying such a request does not help.

## If your account has been restricted

Write to [help@aimlapi.com](mailto:help@aimlapi.com) and include:

* the request ids from the error messages or your logs (`x-inference-id`, see [Request Tracing and Cost Headers](request-tracing-and-cost.md));
* what your app does, and what you have changed since: `safety_identifier`, routing, screening.

Our team reviews the case and can lift the restrictions we applied. We cannot reverse a block that a provider applied on its own side. We do not share internal scores or thresholds, but we can tell you which of your requests were refused, and when.

## FAQ

### Why does my request fail with `content_policy_violation`?

The model's provider refused the request under its usage policy. The refusal counts toward restrictions: against the end user when the request carries a `safety_identifier`, otherwise against your account. Do not resend the same content to another model. Route this kind of content to models that accept it from now on.

### Can my account be banned for what my users send?

Restrictions build up gradually, from a warning to a block, and they apply to the end user who sent the refused content when you identify users with `safety_identifier`. Without it, every refusal counts against your account. See [How restrictions work](#how-restrictions-work).

### What is `safety_identifier`?

An OpenAI-compatible request field: a stable, anonymous id for the end user behind a request, up to 256 characters. OpenAI added it so that abuse can be traced to one user instead of a whole organization. We use it the same way: to restrict that user instead of your whole account. See [Step 1](#step-1).

### Which LLMs allow NSFW content?

That depends on each provider's usage policy, not on how capable the model is. See the [policy table](#policies-and-filters-are-different-things) above, and route adult content with the [Dynamic Router](#route-with-the-dynamic-router).

### How do I add guardrails to an LLM app?

Classify each request before a model answers it. The Dynamic Router does this in the same request: your `blocked` bucket ends prohibited requests at the decision, and your code declines them. Screen uploaded images and video with dedicated tools.

## Checklist

✅ Every request carries a stable, anonymous `safety_identifier` for its end user: an HMAC of your user id, at most 256 characters.\
✅ You know which of your traffic is sensitive, and which providers' policies allow it.\
✅ Sensitive traffic goes through a router with your own buckets (`aimlapi/dynamic-router`, or the Jev Router), and `default_bucket` is your strict bucket.\
✅ For every API you use (images, video, Responses, Messages), each bucket either lists a suitable model served there or ends at the decision.\
✅ Conversations route with `ladder: true`, and your code sends back `meta.router.state` on every turn.\
✅ Content that no model may receive is blocked before it reaches the API.\
✅ Your code handles `content_policy_violation`, `content_filter` and `Usage policy restriction:` responses without blind retries.\
✅ You review refusals and routing decisions regularly.
