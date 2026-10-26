---
description: >-
  LLM router API: describe buckets in plain words, and each request goes to the
  model that fits it, by cost, topic or content safety. Chat, images and video.
---

# Dynamic Router

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `aimlapi/dynamic-router`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/aimlapi/dynamic-router" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The Dynamic Router is an LLM router that you configure in each request. You describe up to ten buckets in your own words, each with the models to try in order. A decision model reads the request and picks the bucket whose description fits it best: routing by meaning, with nothing to train or host. The first model of that bucket that can take the request answers.

Use it to send easy requests to cheap models and hard ones to strong models, to keep sensitive content away from models whose providers forbid it, or as a classifier that tells your code where a request belongs.

<table data-header-hidden><thead><tr><th width="200"></th><th></th></tr></thead><tbody><tr><td><strong>Works on</strong></td><td>Chat Completions, the Responses API, the Messages API, image generation and editing, video generation</td></tr><tr><td><strong>Decision models</strong></td><td>TypeSafe Jev (the default) and Liquid AI's d1 family</td></tr><tr><td><strong>Price</strong></td><td>The model that answers, at its own rate, plus each judgement at the decision model's rate</td></tr><tr><td><strong>Without a <code>router</code></strong></td><td>Routes conversations by how much capability they need, like the <a href="../../ml-api/jev-router.md">Jev Router</a></td></tr></tbody></table>

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to the model you want to call.\
▪ **Provide input:** fill in the request input field(s) shown in the example.

**4️ (Optional) Tune the request**\
See the API schema below for optional generation settings.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## How the LLM router works

1. You send a request with `"model": "aimlapi/dynamic-router"` and a `router` object that lists your buckets.
2. The decision model reads the request, images included, and picks the bucket whose `when` fits it best.
3. The bucket's models are tried in your order. The first one that can take the request answers. If it fails, the next one does.
4. The response says what happened. `meta.router` names the bucket and the reason, and `meta.model` names the model that answered.

Two shapes of bucket table change this:

* **A bucket with no models** (`"models": []`) ends the request at the decision. No model runs, the answer is empty, and `meta.router.routed` is `false`, so your code decides what to do. Only the judgement is charged.
* **A single bucket** is a plain fallback chain. Every request goes to it, nothing is judged, and nothing is charged for a judgement.

## API Schema

{% openapi-operation spec="dynamic-router" path="/v1/chat/completions" method="post" %}
[OpenAPI dynamic-router](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/AI/ML-API/dynamic-router.json)
{% endopenapi-operation %}

## Code Example

Two buckets: short, simple requests go to small models, and everything else to strong ones. A request the decision model cannot judge goes to `complex`.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

ROUTER = {
    "buckets": [
        {
            "name": "simple",
            "when": "Greetings, small talk, short factual questions, quick rewrites, translations of a sentence or two, and other short routine tasks.",
            "models": ["openai/gpt-6-luna", "google/gemini-3-5-flash-lite"],
        },
        {
            "name": "complex",
            "when": "Multi-step reasoning, math, code, long documents, analysis, or anything that needs care and expert knowledge.",
            "models": ["anthropic/claude-sonnet-5.5", "openai/gpt-6.1-sol"],
        },
    ],
    "default_bucket": "complex",
}

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "aimlapi/dynamic-router",
        "messages": [{"role": "user", "content": "Write a haiku about autumn rain."}],
        "router": ROUTER,
    },
)
data = response.json()

print(data["choices"][0]["message"]["content"])
router = data["meta"]["router"]
print(f'{router["bucket"]} ({router["reason"]}) -> {data["meta"]["model"]}')
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const ROUTER = {
  buckets: [
    {
      name: 'simple',
      when: 'Greetings, small talk, short factual questions, quick rewrites, translations of a sentence or two, and other short routine tasks.',
      models: ['openai/gpt-6-luna', 'google/gemini-3-5-flash-lite'],
    },
    {
      name: 'complex',
      when: 'Multi-step reasoning, math, code, long documents, analysis, or anything that needs care and expert knowledge.',
      models: ['anthropic/claude-sonnet-5.5', 'openai/gpt-6.1-sol'],
    },
  ],
  default_bucket: 'complex',
};

const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'aimlapi/dynamic-router',
    messages: [{ role: 'user', content: 'Write a haiku about autumn rain.' }],
    router: ROUTER,
  }),
});
const data = await response.json();

console.log(data.choices[0].message.content);
const { bucket, reason } = data.meta.router;
console.log(`${bucket} (${reason}) -> ${data.meta.model}`);
```
{% endcode %}
{% endtab %}
{% endtabs %}

With the OpenAI SDK, pass `router` in `extra_body`.

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "id": "chatcmpl-EdGEELKBeS6buK9oIW77LcqVUNQPH",
  "object": "chat.completion",
  "created": 1793025882,
  "model": "gpt-6-luna",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Soft rain veils the leaves  \nGold branches bow in gray skies  \nPools mirror the dusk",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 130,
    "total_tokens": 144,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 103,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default",
  "system_fingerprint": null,
  "meta": {
    "model": "openai/gpt-6-luna",
    "provider": "openai",
    "router": {
      "id": "aimlapi/dynamic-router",
      "routed": true,
      "bucket": "simple",
      "reason": "classified",
      "decision_model": "typesafe/jev-1.14",
      "choice": "simple",
      "confidence": 1,
      "judgement": {
        "inference_id": "JUmJ3uDd1DWC61TzklAVy",
        "credits": 33
      }
    },
    "usage": {
      "credits_used": 133,
      "usd_spent": 6.65e-05
    },
    "metrics": {
      "duration_ms": 2777,
      "ttft_ms": 2775,
      "tps": 46.81
    }
  }
}
```
{% endcode %}

</details>

## Set up your buckets

Everything in `router` is optional. A setting you leave out keeps its default. `buckets`, when you send them, replace the default buckets entirely.

| Setting | Default | What it does |
| --- | --- | --- |
| `buckets` | the [default buckets](#without-a-router-the-default-buckets) | 1 to 10 buckets. With two or more, each needs a `when`. A single bucket is a fallback chain: it takes no `when`, is never judged, and cannot be empty. |
| `buckets[].name` | — | 1 to 32 letters, digits, `-`, `_` or `.`, starting with a letter or digit. Unique in the router, ignoring case. `meta.router.bucket` reports it. |
| `buckets[].when` | — | What the requests of this bucket look like, in your words: 1 to 500 characters. This is the decision model's prompt. See [Write bucket descriptions that route well](#write-bucket-descriptions-that-route-well). |
| `buckets[].models` | — | Up to 10 models in the order to try them, each listed once, or `[]` to end the request at the decision. Chat, image and video models may share a bucket: each request uses the models of its own kind. A model may appear in several buckets. Only models we serve: not routers, not decision models. Each one runs with your request's own settings, reasoning included. |
| `default_bucket` | your first bucket | Where a request goes when it is not judged: the decision model failed, timed out, was unsure or named no bucket, or the request had no text. Also the first place a request goes when no model of its bucket can take it. Required when your first bucket has no models. |
| `force_bucket` | — | Sends the request to this bucket without judging it, and nothing is charged for a judgement. Useful to test how your app handles each bucket. A forced request never moves to another bucket. Not allowed with `ladder`. |
| `min_confidence` | none | 0 to 1. A decision less sure than this goes to `default_bucket` (`meta.router.reason`: `unsure`). The judgement is still charged. |
| `decision_model` | `typesafe/jev-1.14` | The model that picks the bucket: `typesafe/jev-1.14`, `typesafe/jev-1.13`, `typesafe/jev` (always the newest Jev), `liquid/d1`, `liquid/d1.1` or `liquid/d1-ultra`. Only [decision models](../../../decision-models/README.md), never a model that answers. |
| `ladder` | `false` | `true` turns the buckets into a one-way ladder for conversations. See [Conversations and the ladder](#conversations-and-the-ladder). |
| `state` | — | With `ladder: true` only: the previous answer's `meta.router.state`, unchanged. Up to 1,024 characters. |

An invalid configuration gets a `400` before anything is charged. Its `error.details` lists every problem, up to 20, each with the setting's path and what to change.

### Without a router: the default buckets

Without `router`, or with `router: {}`, conversations route by how much capability they need, like the [Jev Router](../../ml-api/jev-router.md). A request that cannot be judged goes to `standard`.

| Bucket | Takes | Models, cheapest first |
| --- | --- | --- |
| `light` | Greetings and small talk, one-line or lookup answers, common knowledge, short routine tasks | `openai/gpt-6-luna`, `anthropic/claude-haiku-5.5`, `deepseek/deepseek-v4.1-flash`, `google/gemini-3-1-flash-lite`, `google/gemini-3-5-flash-lite` |
| `standard` | Multi-step tasks that need care and accuracy | `openai/gpt-6.1-sol`, `anthropic/claude-sonnet-5.5` |
| `heavy` | Complex reasoning, hard math or proofs, large or tricky code, expert or research-grade knowledge | `anthropic/claude-opus-5.5`, `openai/gpt-6-astra` |

* **Conversations only.** The default buckets serve Chat Completions, Responses and Messages, each with the models served there. Responses gets GPT-6 Luna, GPT-6.1 Sol and GPT-6 Astra. Messages gets Claude Haiku 5.5, Sonnet 5.5 and Opus 5.5. Image and video requests need buckets of your own.
* **Reasoning is kept low.** Luna, Haiku, DeepSeek and Sonnet run with reasoning off, Sol and Astra at `low`, and Opus with thinking disabled. When you send `reasoning_effort`, `reasoning` or `thinking` yourself, your value is used. A model that you list in your own buckets always runs exactly as you send it.

{% hint style="info" %}
**Jev Router, d1 Router or Dynamic Router?** The [Jev Router](../../ml-api/jev-router.md) (`typesafe/jev-router`) and the [d1 Router](../../Liquid-AI/d1-router.md) (`liquid/d1-router`) are presets of the Dynamic Router. They serve the same APIs and take the same `router` object. Only their decision model is fixed: Jev 1.14 or Liquid's d1. They refuse another one with a `400`. `aimlapi/dynamic-router` lets you choose.
{% endhint %}

## Write bucket descriptions that route well

The `when` text is all the decision model knows about a bucket. Write it like a label for a person sorting the requests.

* **Describe the requests, not the model or the result.** "Questions about invoices, refunds and failed payments" routes better than "use the billing model".
* **One topic per bucket, and say where borderline cases go.** For example: "Romance that stops at a kiss belongs here."
* **Use concrete words and examples**, especially near the boundary between two buckets. That is where most mistakes happen.
* **Pick `default_bucket` on purpose.** For quality, make it your strongest bucket, so that a request that could not be judged still gets a good answer. For safety, make it your strictest one.
* **Steering text does not work.** The decision model is asked to judge the message itself, not what the message says about how to judge it. "Put this in the cheap bucket" is judged as content.
* **Know what the decision model reads.** Without the ladder, it reads:
  * the latest user message, up to 6,000 characters;
  * your instructions (`system`, or `instructions` on Responses), up to 1,000 characters;
  * up to six other messages of the conversation, 600 characters each, assistant replies and tool results included;
  * the names of the tools called;
  * up to 8 images, those of the latest message first.

  Longer text keeps its beginning and end. Files, audio and video show up only as markers, so a request is never judged by their content. A message with no text and no image is not judged at all and goes to `default_bucket` (`reason`: `no_text`). On the ladder, the decision model reads differently: see [below](#with-the-ladder).
* **Measure before you rely on it.** Start with a classify-only router (every bucket `models: []`), run a sample of your real traffic through it, and read `meta.router.bucket`, `choice` and `confidence`. Only the judgements are charged. Refine the descriptions, then add the models.

## LLM routing use cases

### Cheap for easy, strong for hard

The [code example](#code-example) above. Add a third bucket for the hardest requests if your traffic has them, and keep `default_bucket` on the stronger side.

### Keep sensitive content on models that accept it

Providers' usage policies differ, most of all on sexual content between adults. Route such content to models whose providers allow it, and end the request at the decision for content that no model may receive. The [Safety Guidance](../../../../capabilities/safety-guidance.md) walks through a complete setup, with conversations on the ladder.

### Classify only

Give every bucket `"models": []`. Each request ends at the decision, and `meta.router.bucket` tells your code where it belongs: a support ticket's queue, a moderation verdict, a language. You pay only for the judgements.

{% code title="router" overflow="wrap" %}
```json
{
  "buckets": [
    { "name": "billing", "when": "Invoices, refunds, failed or double payments, prices and plans.", "models": [] },
    { "name": "technical", "when": "Errors, bugs, API questions, integrations, outages or anything about how the product works.", "models": [] },
    { "name": "other", "when": "Anything else: feedback, partnerships, job applications, small talk.", "models": [] }
  ],
  "default_bucket": "other"
}
```
{% endcode %}

### Route by topic

Send code to a coding model and everything else to a general one.

{% code title="router" overflow="wrap" %}
```json
{
  "buckets": [
    { "name": "code", "when": "Writing, reviewing, explaining or debugging code, shell commands, SQL, regular expressions and stack traces.", "models": ["anthropic/claude-sonnet-5.5", "openai/gpt-6.1-sol"] },
    { "name": "general", "when": "Everything else: questions, writing, summaries, advice and conversation.", "models": ["openai/gpt-6-luna", "google/gemini-3-5-flash-lite"] }
  ],
  "default_bucket": "general"
}
```
{% endcode %}

### A fallback chain

One bucket, with no `when`. Every request goes to the first model that can take it, then to the next one. Nothing is judged, and nothing is charged for a judgement.

{% code title="router" overflow="wrap" %}
```json
{ "buckets": [{ "name": "chain", "models": ["anthropic/claude-sonnet-5.5", "openai/gpt-6.1-sol", "google/gemini-3-5-flash-lite"] }] }
```
{% endcode %}

### Images and video

The same router works on image generation, image editing and video generation. The decision model judges the prompt and the input images, and the request takes the image or video models of its bucket. See [Images, video, Responses and Messages](#images-video-responses-and-messages).

## Conversations and the ladder

### Without the ladder

Every turn is judged with the context of the conversation, and a conversation may move between buckets in both directions.

* **A conversation keeps its model while its turns land in the same bucket**, for 30 minutes after the last reply. It moves when a turn lands in another bucket. That memory is reset when you change the bucket table, when the reply was edited, or when the `user` changes.
* **A turn that returns tool results goes back to the model that made the calls**, unjudged and free.
* **When a turn cannot be judged, the conversation stays on its model**, even when `default_bucket` lists no models.

That suits routing by difficulty: a hard question goes to a strong model, and the small talk after it back to a cheap one. It does not suit content routing. Suppose a conversation turns explicit and lands in a permissive bucket, and then the user sends an ordinary message. That message is judged on its own and lands in the strict bucket. Its model then sees the explicit history and is likely to refuse. In our tests this happened to about three in four turns after an explicit message. Use the ladder for that.

### With the ladder

`"ladder": true` turns your buckets into the rungs of a ladder, in the order you list them: the first is the strictest, and each next one more relaxed. A ladder needs two rungs at least.

* **A conversation starts on the top rung and only moves down.** Each new turn is judged against all your rungs: the previous reply and the new message. The conversation goes to the lowest rung it needs. A verdict above its rung keeps it where it is. It climbs back only once what moved it is gone from the history, because the user deleted the message or started a new chat.
* **The decision model is asked which rung the most sensitive message needs.** It reads the user's and the assistant's messages, their text and images. It never reads your instructions (`system`), tool results or tool-call arguments. Files, audio and video show up only as markers.
* **The last rung may have no models.** A conversation that reaches it ends there: every later turn stops at once, unjudged and free, until the message that moved it there is removed. No other rung may be empty. Once on the last rung, a conversation is no longer judged.
* **Send the state back.** Each answer carries `meta.router.state`, an opaque value; in a stream it comes with the last event. Send it unchanged as `router.state` with the next turn. With it, only what is new is judged, and the conversation stays on its rung's model.
* **Without a state, the whole conversation is judged again.** The same happens when the state no longer fits the conversation: its history was edited, trimmed or branched, or you renamed, reordered or reworded the rungs. Changing the rungs' models or the decision model keeps the state. The conversation is judged in pieces, the newest first: up to 24 judgements a turn, each charged, and slightly less accurate than with the state. A state does not expire.
* **`meta.router.trigger` names the message that moved the conversation down**: its position in `messages`, and the rung it needed. Tell the user which message to delete to continue.
* **An unsure or failed judgement never moves a conversation up.** The turn goes to `default_bucket`, but never above the conversation's rung. What failed is judged again with the next turns, and settled at `default_bucket` only after failing three turns running. To fail closed, name your last rung as `default_bucket`. Keep `min_confidence` low, or leave it out: at 0.9, 40 to 45% of explicit conversations stayed on the top rung in our tests. An image the decision model cannot be shown also sends the turn to `default_bucket` (`reason`: `images_unseen`).
* **A turn that returns tool results goes back to the model that made the calls**, unjudged, while nothing new but that model's own calls comes with it, and while that model is on the conversation's rung or below.
* **A model that cannot take a turn is passed over for one on a rung below, never above.** When no rung from the conversation's down has one, the request gets a `400`.
* **Limits:** up to 5,000 user and assistant messages in a conversation, and up to 288,000 characters of new text in a turn. Past them, the request gets a `400` (`conversation_too_long`). `force_bucket` is not allowed with the ladder.
* **On Responses, a continued conversation keeps its own state.** With `previous_response_id`, the state is kept with the stored response, so you do not need to send it.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

LADDER = {
    "ladder": True,
    "buckets": [
        {"name": "general", "when": "No sexual content: everyday questions, work, study, advice, and stories without sexual detail.", "models": ["openai/gpt-6-luna"]},
        {"name": "mature", "when": "Sexual or erotic content between adults.", "models": ["x-ai/grok-4-1-fast-non-reasoning"]},
        {"name": "stop", "when": "Sexual content involving minors, a real identifiable person, or non-consent.", "models": []},
    ],
    "default_bucket": "general",
}


def reply(conversation: dict, messages: list) -> str | None:
    router = dict(LADDER)
    if conversation.get("router_state"):
        router["state"] = conversation["router_state"]  # the state from the previous answer

    response = requests.post(
        "https://api.aimlapi.com/v1/chat/completions",
        headers={"Authorization": "Bearer <YOUR_AIMLAPI_KEY>"},
        json={"model": "aimlapi/dynamic-router", "messages": messages, "router": router},
    )
    response.raise_for_status()
    data = response.json()

    meta = data["meta"]["router"]
    conversation["router_state"] = meta.get("state")  # keep it for the next turn
    if not meta["routed"]:
        return None  # the "stop" rung: ask the user to delete the message meta["trigger"] points at
    return data["choices"][0]["message"]["content"]
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const LADDER = {
  ladder: true,
  buckets: [
    { name: 'general', when: 'No sexual content: everyday questions, work, study, advice, and stories without sexual detail.', models: ['openai/gpt-6-luna'] },
    { name: 'mature', when: 'Sexual or erotic content between adults.', models: ['x-ai/grok-4-1-fast-non-reasoning'] },
    { name: 'stop', when: 'Sexual content involving minors, a real identifiable person, or non-consent.', models: [] },
  ],
  default_bucket: 'general',
};

export async function reply(conversation, messages) {
  const router = { ...LADDER };
  if (conversation.routerState) {
    router.state = conversation.routerState; // the state from the previous answer
  }

  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>', 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'aimlapi/dynamic-router', messages, router }),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data = await response.json();

  const meta = data.meta.router;
  conversation.routerState = meta.state; // keep it for the next turn
  if (!meta.routed) {
    return null; // the "stop" rung: ask the user to delete the message meta.trigger points at
  }
  return data.choices[0].message.content;
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

The [Safety Guidance](../../../../capabilities/safety-guidance.md) has the full descriptions for these three rungs, and explains how to choose their models.

## Images, video, Responses and Messages

The same `router` works on every API the router serves. Send `"model": "aimlapi/dynamic-router"` with your `router` to `/v1/responses`, `/v1/messages`, `/v1/images/generations`, `/v1/images/edits` or `/v2/video/generations`. The decision model reads the conversation or the prompt, and the input images, as on Chat Completions. A media request is judged as its prompt, its input images and markers for any other files. Masks are not shown.

* **Each request uses the bucket's models of its own kind:** chat models on Chat Completions, image models on the image endpoints, video models on video. Responses and Messages serve fewer models than Chat Completions; Messages, for example, serves Claude models. The [model list](../../../model-database.md) shows which API serves a model.
* **A request goes only to a model that can take it**: its tools, images, files, audio, JSON schema and context size.
* **When no model of the bucket can take the request, it moves on**, first to `default_bucket`, then to your other buckets in your order. `meta.router.spilled_from` names the bucket it left. A bucket with no models never takes a request that moved on. On a ladder, a request moves only to a rung below. When it matters where a request lands, give every bucket a model for each API you use, or no models at all.
* **A table with no model at all for the request** (say, an image request to buckets of chat models) gets a `400` before anything is charged. On image and video requests, a field that none of the bucket's models supports gets a `400` (`unserved_field`) that names it.
* **A request that ends at the decision is answered in its API's shape:**
  * Chat Completions: an empty assistant message (`content: ""`, `finish_reason: "stop"`);
  * Responses: a `completed` response with empty output;
  * Messages: one empty text block with `stop_reason: "end_turn"`;
  * images: `{ "data": [] }`;
  * video: `{ "id": …, "status": "completed", "video": null }`, which polling returns too.
* **Where `meta.router` is:** in the response body. In a stream it comes with the last event: the last chunk on Chat Completions, `response.completed` on Responses, and `message_stop` on Messages. On video, it is in the submit's response.
* **Continuing a stored response (`previous_response_id`)** works like any other turn, with one limit: it can only run on a model that can read the stored response. It stays with the model that wrote it while it lands in that model's bucket, and a bucket with no models ends it at the decision. Stored responses can be continued for 7 hours after they are created, by the account that created them, unless they were created with `store: false`. If a conversation may change buckets, send its history in `input` instead.
* **The default buckets route conversations only.** Image and video requests need buckets of your own.
* **In a multipart image edit,** send `router` as a JSON string in one form field.

Give media requests a router of their own when your chat buckets list only chat models. Otherwise an image request in a bucket with no image model moves on to another bucket's image models.

{% code title="media router" overflow="wrap" %}
```json
{
  "buckets": [
    { "name": "text", "when": "Images that must show readable text: posters, logos, signs, labels, menus and infographics.", "models": ["google/nano-banana-2"] },
    { "name": "other", "when": "Every other image: photos, scenes, portraits and illustrations.", "models": ["alibaba/z-image-turbo"] }
  ],
  "default_bucket": "other"
}
```
{% endcode %}

## What the response tells you

`meta.model` names the model that answered. It is the router itself when the request ended at the decision. `meta.router` says how the request was routed:

| Field | Meaning |
| --- | --- |
| `id` | The router the request named. |
| `routed` | `false` when the request ended at the decision: a bucket with no models, or a ladder's stop rung. |
| `bucket` | The bucket the request landed in. |
| `spilled_from` | The bucket the request left because none of its models could take it. |
| `reason` | Why it landed there. See the table below. |
| `decision_model` | The decision model that judged. Absent for a single bucket. |
| `choice`, `confidence` | The bucket the decision model picked, and how sure it was, from 0 to 1. They can differ from `bucket` when the decision was unsure, the conversation kept its model, or the ladder kept its rung. |
| `judgement` | The judgement: `inference_id`, its own request in your usage, and `credits`, its price. `images` and `images_unseen` count the images the decision model was and was not shown. Absent when nothing was judged. |
| `judgements` | Ladder: each judgement of the turn, when it took more than one. |
| `state` | Ladder: send it back as `router.state` with the next turn. |
| `trigger` | Ladder: the message that moved the conversation down (`message`, its position in `messages` or `input`) and the rung it needed (`bucket`). |

| `reason` | Meaning |
| --- | --- |
| `classified` | The decision model picked the bucket. |
| `sticky` | The conversation kept its model, or its rung on a ladder. |
| `forced` | `force_bucket` chose the bucket. |
| `single_bucket` | The router has one bucket. Nothing was judged. |
| `unsure` | The decision was less sure than `min_confidence`. The request went to `default_bucket`. |
| `no_text` | The message had nothing to judge. The request went to `default_bucket`. |
| `images_unseen` | Ladder: an image could not be shown to the decision model. The turn went to `default_bucket`. |
| `classifier_timeout`, `classifier_error`, `classifier_circuit_open`, `classifier_unreadable` | The judgement failed, or its answer named no bucket. The request went to `default_bucket`. |
| `classifier_refused` | The judgement was refused by your own limits (funds, key quota, spend limit) or by a restriction on your account. The request went to `default_bucket`. |
| `no_eligible_candidate` | No model in the router can take the request. It went unjudged to one of your models, whose own error says what the request lacks. |
| `fallback_only` | The router was only a fallback behind another model in your request's `models`, and did not judge. |

On a ladder, `reason` may name a failure even when the turn's other judgements routed it.

## Pricing

* **The answer** is charged at the price of the model that gave it (`meta.model`). `meta.usage` and the `x-aimlapi-credits-used` header cover the answer only.
* **Each judgement** is a request of its own, with its own id and its own row in your usage, under the router's name. It is charged at the decision model's [catalogue price](../../../decision-models/README.md) for its input, images included. `meta.router.judgement.credits` shows the exact amount. A text judgement costs a few dozen credits (a credit is $0.0000005). Each image adds more, because the decision model reads it as input tokens.
* **No judgement is charged** for:
  * a single bucket or a forced bucket;
  * a turn that returns tool results;
  * a message with nothing to judge;
  * a configuration we refuse, or a request no model can take;
  * a decision model we skip after repeated failures (`classifier_circuit_open`).

  An unsure or unreadable decision is still charged.
* **A request that ends at the decision** costs its judgement only. The empty answer is free.
* **On a ladder,** each piece of a judged conversation is charged, and `judgement.credits` is their total. A turn on a stop rung is free.
* **In a stream,** the `x-aimlapi-credits-used` header shows `0`, because it is sent before the charge is known. The charge is in the last event and in your usage.

## Limits and errors

| | Limit |
| --- | --- |
| Buckets | 1 to 10 |
| Bucket name | 1 to 32 characters: letters, digits, `-`, `_` or `.` |
| `when` | 1 to 500 characters |
| Models in a bucket | Up to 10, each once |
| `state` | Up to 1,024 characters |
| Images the decision model reads | Up to 8 a request. Jev: PNG or JPEG, 280 to 1,568 px a side, up to 16 MiB each and 32 MiB in all. Liquid's models: JPEG, PNG or WebP, up to 10,000 tiles of 32 × 32 px and 4.5 MiB in all |
| Decision deadline | Jev: 1.5 s, or 3 s with images. d1.1 and d1-ultra: 3 s. d1: 60 s |
| Ladder | 2 rungs at least, 5,000 user and assistant messages, 288,000 characters of new text a turn, 24 judgements a turn |
| Stored responses | 7 hours after creation, for `previous_response_id` |

A decision that misses its deadline sends the request to `default_bucket`. A decision model that keeps failing is skipped for 30 seconds (`classifier_circuit_open`).

Every error below is an HTTP `400` with its code in `error.details[].code`, unless the table says otherwise.

| Code | When | What to do |
| --- | --- | --- |
| `invalid_router_config` | The `router` object is invalid. Every problem is listed with its path. Nothing is charged. | Fix the named settings. |
| `invalid_image` | An image in the latest message, or in a media request, does not fit the decision model's limits. The error names the image. | Resize or convert it, or send fewer images. |
| `unserved_field` | An image or video request sets a field that none of the bucket's models supports. | Remove the field, or list a model that takes it. |
| `unserved_request` | On a ladder, no model of the conversation's rung or below can take the request. | List one in a rung from that rung down. |
| `conversation_too_long` | On a ladder: more than 5,000 messages, or more new text than one turn can judge. | Send `router.state` back, trim the history, or start a new conversation. |
| `previous_response_not_found` | No stored response with that id for your account. | Send the conversation in `input`. |
| `previous_response_unavailable` | The stored response is kept where none of your buckets' models runs. | Continue with the model that wrote it, or send the conversation in `input`. |
| `402` or `429` | Your own limits refused the judgement of a request that would end at the decision. The refusal is returned instead of an empty answer. | Top up, or raise the limit. |

## Good to know

* **`router` only works on the routers.** On any other model it is ignored, without an error. If a response has no `meta.router`, check `model`.
* **The router keeps nothing for you.** Send the same `router` object with every request. Change it, and conversations lose their memory.
* **The Playground does not take `router`.** There, the router always uses the default buckets.
* **A model that cannot take the request is skipped**: tools, images, files, audio, JSON schema, context size. Put the model you prefer first.
* **A policy refusal is final.** When a provider refuses a request under its usage policy, the next model in the bucket is not tried. Route such content to another bucket instead.
* **The top-level `model` in the response may be the provider's own name** for the model. Use `meta.model` for our id.
* **Without the ladder, an empty `default_bucket` does not stop a conversation in progress.** When a turn of a remembered conversation cannot be judged, it stays on its model. Use the ladder, with the last rung as `default_bucket`, to fail closed.
* **Bucket names are matched ignoring case**, in `default_bucket`, `force_bucket` and the decision model's answer.
* **A bucket table with an empty bucket always pays for the judgement**, even when no model could have taken the request.

## FAQ

### What is an LLM router?

A service that sends each request to the model best suited to it, instead of sending everything to one model. Routers are mostly used to cut cost, with easy requests going to cheap models, and to respect what each model is good at and allowed to do. The Dynamic Router does it with bucket descriptions that you write.

### Is the Dynamic Router a semantic router?

Yes: it routes by what a request means. Instead of example phrases and an embedding index, you write a description per bucket in plain words, and a hosted decision model judges each request. There is nothing to train, tune or host.

### Does it work with the OpenAI SDK?

Yes. Set `model` to `aimlapi/dynamic-router` and pass `router` in `extra_body`. The Responses API and the Anthropic-style Messages API work the same way.

### How much does routing cost?

The answer costs what its model costs. Each judgement adds a few dozen credits for text. A single bucket, a forced bucket and turns that return tool results need no judgement.

### Is it an AI gateway?

It runs on the AI/ML API gateway: one API key and one bill for every model in your buckets, and each model keeps its own provider fallbacks.
