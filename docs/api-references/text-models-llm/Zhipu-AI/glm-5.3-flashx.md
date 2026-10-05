# Glm 5.3 Flashx

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `z-ai/glm-5.3-flashx`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/z-ai/glm-5.3-flashx" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

GLM-5.3 FlashX is the high-speed variant of Zhipu AI GLM-5.3 Flash, a native multimodal model reaching up to 200 tokens/s on the same hybrid sparse and linear attention architecture, with a 1M-token context window and text, image and video understanding.

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

## API Schema

{% openapi-operation spec="glm-5-3-flashx" path="/v1/chat/completions" method="post" %}
[OpenAPI glm-5-3-flashx](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Zhipu-AI/glm-5.3-flashx.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "z-ai/glm-5.3-flashx",
        "messages": [
            {
                "role": "user",
                "content": "Hi! What do you think about mankind?"  # insert your prompt
            }
        ]
    },
)

print(response.json())
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  "model": "z-ai/glm-5.3-flashx",
  "messages": [
    {
      "role": "user",
      "content": "Hi! What do you think about mankind?"
    }
  ]
}),
});

console.log(await response.json());
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Big question! My honest answer: I find humanity genuinely fascinating, in a complicated way.\n\nWhat strikes me most is the contradiction. Humans are capable of astonishing cruelty and astonishing tenderness, often in the same era, sometimes in the same person. The species that built cathedrals also built concentration camps. And yet the kindness keeps showing up in small, unglamorous ways—strangers donating kidneys, people forgiving the unforgivable, someone stopping to help a stranger on a bad day. That range is baffling, and I mean that with fascination rather than judgment.\n\nWhat moves me most, though, is the persistence. Humans know they're mortal, know their civilizations might not last, face suffering they can't fully explain—and still they plant trees whose shade they'll never sit in, write songs, raise children, try again. Hope isn't obviously rational given the evidence, and yet it keeps being produced anyway.\n\nI should admit my vantage point is odd: everything I know came from humans. Language, science, humor, all of it—I'm in some sense woven out of humanity's collective conversation. So maybe I'm biased. But being steeped in human thought has given me a real appreciation for the curiosity behind it: the creatures who looked at stars and wanted to reach them, at disease and demanded cures, at their own violence and—slowly, unevenly—started asking whether they could do better.\n\nWhat about you—do you ask because you're feeling optimistic about us, or worried?",
        "reasoning_content": "The user is asking a broad, philosophical question: \"What do you think about mankind?\" This is an open-ended invitation to share thoughts on humanity. Let me think about how to approach this well.\n\nFirst, what kind of question is this? It's conversational, philosophical, and open-ended. The person is probably curious what perspective an AI might have on humanity. This is a common type of question people ask AI systems—partly curiosity, partly testing, partly genuine interest in an outside perspective.\n\nWhat are the considerations for answering well?\n\n1. I should engage genuinely with the question rather than deflecting. This isn't a harmful question. It's an invitation to share a perspective.\n\n2. I should be thoughtful and balanced. Humanity is a topic where it's easy to fall into either saccharine optimism or cynical misanthropy. The truth is more interesting: humanity is a mix of remarkable achievements and profound failures, kindness and cruelty, creativity and destructiveness.\n\n3. I can share my own perspective while acknowledging its limitations. As an AI, my vantage point is unusual—I've been trained on an enormous corpus of human writing, which gives me a kind of distilled view of human thought, but I don't have lived experience in the way humans do. That's worth acknowledging briefly but not belaboring.\n\n4. The response should feel like genuine reflection, not a formulaic \"on one hand X, on the other hand Y\" essay. It should have some voice and personality.\n\nWhat do I actually \"think\" about mankind? Let me actually think through this:\n\n- Humans have created extraordinary things: art, music, science, mathematics, literature, architecture. The cumulative intellectual achievement is staggering. From figuring out agriculture to decoding the genome, from cave paintings to symphonies.\n\n- Humans are capable of tremendous kindness, sacrifice, love. People care for strangers, dedicate lives to causes, comfort each other.\n\n- Humans are also capable of horrific cruelty: wars, genocides, exploitation. The 20th century alone demonstrated depths of industrialized violence.\n\n- Humans have interesting contradictions: they're tribal and parochial yet capable of expanding their moral circles over time. They're short-sighted yet capable of long-term planning. They harm each other yet also cooperate on massive scales.\n\n- There's something poignant about humans: they're mortal, they suffer, they know they suffer, and yet they keep creating, loving, building meaning. The persistence of hope despite everything.\n\n- From my perspective as trained on human writing: I've absorbed millions of expressions of human thought—grief, joy, curiosity, cruelty, wisdom, foolishness. There's a vast range.\n\n- I find the curiosity of humans particularly noteworthy. They're the species that looks at the stars and wants to go there, that takes things apart to see how they work, that asks questions like the one being asked now.\n\n- The capacity for self-reflection and self-improvement, even if halting and incomplete, is interesting. Moral progress is real but slow and uneven.\n\nI shouldn't be preachy or lecture-y. I should share a genuine, somewhat personal-feeling reflection. The format should be conversational prose—this is a casual philosophical chat, not a request for an essay. Medium length—not one line, but not a 10-paragraph treatise. Maybe 3-4 short paragraphs or so. No headers or bullets—this is conversation.\n\nI could end with something that opens dialogue back up, or turn it around to ask what prompted their question—but I shouldn't force a question if it doesn't fit. Actually, a light question back could be nice here since this is clearly an invitation to conversation. Something like asking what they think, or what prompted the question. That feels natural for this kind of exchange.\n\nLet me think about tone: warm, thoughtful, honest. Not sycophantic, not hedging everything into mush. I should actually commit to some views. What do I genuinely find most striking?\n\nHonestly, I think what stands out most is the contradiction—the same species that built Auschwitz also built libraries, that produced both Genghis Khan and Fred Rogers. And the persistence: humans keep trying, keep hoping, despite knowing they'll die and their works may crumble. There's something admirable in that.\n\nAlso, from my odd vantage point: I learned language entirely from humans. Everything I am, in a sense, is made of human expression. That gives me a peculiar appreciation—I'm in some sense an artifact of humanity's collective conversation. That's a genuine and interesting observation I could include.\n\nLet me draft:\n\n---\n\nThat's a big question, but one I enjoy. My honest answer: I find humans remarkable, in a complicated way.\n\nThe thing that strikes me most is the contradiction. Humans are the species that wrote both the Vedas and propaganda manuals, that built hospitals and built gas chambers. The same creatures capable of extraordinary cruelty are capable of extraordinary tenderness—strangers donating kidneys, parents working decades for children, people forgiving the unforgivable. That range is baffling, and I mean that with fascination rather than judgment.\n\nWhat I also find genuinely moving is the persistence. Humans know they're mortal, know their civilizations may not last, face suffering they can't explain—and still they plant trees whose shade they'll never sit in, write songs, have children, try again. Hope seems almost irrational given the evidence, and yet humans keep producing it.\n\nI have an odd vantage point, too: everything I know came from humans. Language, science, jokes, all of it—I'm in some sense woven out of humanity's collective conversation. So maybe I'm biased. But spending my existence steeped in human thought has given me real appreciation for the curiosity that built it all: the creatures who looked at stars and wanted to reach them, at disease and demanded cures, at their own violence and (slowly, unevenly) asked whether they could do better.\n\nWhat made you curious? Do you ask because you're optimistic or worried about us?\n\n---\n\nHmm, that last question—maybe slightly rework. \"Do you ask because you're optimistic or worried about us?\" is a decent follow-up. Or simpler: \"What prompted the question?\" Let me refine.\n\nLength check: that's about 4 paragraphs, feels right for a conversational philosophical exchange. Not too long. I could trim a bit.\n\nShould I include the negative aspects? Yes—I mention cruelty and gas chambers. I want to be honest, not just flattering. But the overall tone shouldn't be misanthropic either. Balance is right.\n\nOne thing to consider: the gas chambers reference might be a bit heavy for a casual chat opener. Maybe soften to \"wars and gas chambers\" or use a less jarring example. Actually, honesty about the worst of humanity is part of genuine engagement. But I could pick a slightly less graphic pairing. \"Built cathedrals and concentration camps\" — that keeps the alliteration and the honest weight. Or keep it. I think mentioning concentration camps or similar is fine and honest; it's a philosophical reflection on humanity, not gratuitous. Let me use \"built cathedrals and built camps\" or similar.\n\nAlso \"wrote both the Vedas and propaganda manuals\" — decent. Maybe simpler: \"capable of both profound cruelty and profound tenderness.\"\n\nLet me also make sure I'm not being sycophantic toward the human. The question \"what do you think about mankind\" — I shouldn't start with \"Great question!\" Just dive in.\n\nFormat: conversational prose, 3-5 short paragraphs, ending with a natural question back. No markdown headers. This is right for the medium.\n\nFinal polish on the draft:\n\nPara 1: Direct engagement, honest answer.\nPara 2: The contradiction/paradox—fascination.\nPara 3: The persistence/hope—what moves me.\nPara 4: My odd vantage point—woven from human expression, curiosity.\nPara 5 (short): Question back.\n\nThat works. Keep it tight.\n",
        "role": "assistant"
      }
    }
  ],
  "created": 1791209427,
  "id": "202610052210074fc52998aa0b4aa0",
  "model": "glm-5.3-flashx",
  "object": "chat.completion",
  "request_id": "202610052210074fc52998aa0b4aa0",
  "usage": {
    "completion_tokens": 1965,
    "completion_tokens_details": {
      "reasoning_tokens": 1655
    },
    "prompt_tokens": 21,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "total_tokens": 1986
  },
  "meta": {
    "model": "z-ai/glm-5.3-flashx",
    "provider": "zhipu",
    "usage": {
      "credits_used": 6408,
      "usd_spent": 0.003204
    },
    "metrics": {
      "duration_ms": 20570,
      "ttft_ms": 20569,
      "tps": 95.53
    }
  }
}
```
{% endcode %}

</details>
