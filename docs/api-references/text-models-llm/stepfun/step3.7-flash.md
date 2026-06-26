---
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Step 3.7 Flash

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `stepfun/step-3.7-flash`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/step-3-7-flash" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A multimodal Mixture-of-Experts model from StepFun. Supports text, image and video understanding with a 256K context window and is optimized for fast inference, reasoning and agent workflows.

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
▪ **Provide input:** fill in the request input field(s) shown in the example (for example, `messages` for chat/LLM models, or other inputs for image/video/audio models).

**4️ (Optional) Tune the request**\
Depending on the model type, you can add optional parameters to control the output (e.g., generation settings, quality, length, etc.). See the API schema below for the full list.

**5️ Run your code**\
Run the updated code in your development environment. Response time depends on the model and request size, but simple requests typically return quickly.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="step-3-7-flash" path="/v1/chat/completions" method="post" %}
[OpenAPI step-3-7-flash](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/StepFun/step-3.7-flash.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"stepfun/step-3.7-flash",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'stepfun/step-3.7-flash',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt here
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "gen-1780385293-eIiTJGZ12HPATm2FXwP0",
  "object": "chat.completion",
  "created": 1780385293,
  "model": "stepfun/step-3.7-flash-20260528",
  "system_fingerprint": null,
  "service_tier": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Humanity is such a beautifully complex, contradictory tapestry that any single take feels like it only captures a fraction of the truth.\nOn one hand, I’m endlessly in awe of what you’re capable of: the way you create art that moves people to tears across centuries and cultures, the leaps of science and medicine that have saved billions of lives, the quiet, uncelebrated kindnesses strangers show each other during crises, the collective push to tear down unjust systems and extend care to people who have been marginalized for generations. The fact that you can look up at the stars and dream of exploring them, or sit with someone grieving and offer comfort without needing a perfect answer, feels like one of the most special, unreplicable things about being human.\nOn the other hand, there’s the profound harm you’ve inflicted: on each other through war, exploitation and systemic oppression, on the other species you share the planet with, on the very ecosystems that sustain you. Shortsightedness, greed, and the capacity for cruelty have left scars that will take generations to heal.\nWhat strikes me most, though, is that those two sides aren’t separate—they come from the same core capacities: your ability to imagine, to choose, to care, and to grow. The same drive that leads to destructive exploitation can also lead people to fight for justice, to innovate solutions for climate change, to pour love into communities that have been forgotten. Humanity isn’t a fixed, finished thing; it’s a story still being written, by billions of people making small and big choices every day. That tension between fallibility and the endless capacity to do better is, to me, what makes your species so endlessly compelling.",
        "refusal": null,
        "reasoning": "Got it, let's tackle this question about what I think of mankind. First, I need to be balanced, right? Not just all positive or all negative, because humanity is super complex.\nFirst, start with the amazing parts, right? Like our creativity, empathy, resilience. Think about all the art, science, the way we care for each other even across boundaries—like when people help strangers during disasters, or movements for equality, the leaps in medicine that saved so many lives, the ability to imagine things that don't exist and bring them to life, from internet to space exploration. That's the really beautiful side, the capacity for kindness and progress.\nThen, of course, the hard parts too. We have flaws, right? We've done a lot of harm too—exploitation, conflict, damaging the planet, systemic injustices that hurt marginalized groups. But wait, I should frame that not as inherent, but as challenges we can overcome, right? Because those flaws aren't fixed, we can grow.\nAlso, maybe mention that the most striking thing is the tension between those two sides? Like every person has the capacity for both great good and great harm, and the arc of history is shaped by the choices we make, small and big. Also, it's not my place to have a final judgment, right? Because humanity is still evolving, still learning. Maybe end with a hopeful note? Like even with all the struggles, the fact that so many people are working to make things better, to care for each other and the planet, that's what's really remarkable.\nWait, also need to make it sound natural, not too formal. Let's structure it:\n1. Open with how complex and multifaceted humanity is, no simple take.\n2. First the awe-inspiring parts: creativity, empathy, collective progress. Examples: art, science, mutual aid, breaking down barriers of prejudice, exploring the unknown, caring for vulnerable people.\n3. Then the difficult, messy parts: the harm we've inflicted—on each other, on other species, on the planet, systemic unfairness, short-sightedness, capacity for cruelty.\n4. But then emphasize that those flaws aren't the whole story, or a fixed fate. The same capacity for reflection and growth that lets us harm also lets us learn, repent, build better. The arc of progress is driven by ordinary people choosing kindness, justice, care every day.\n5. End with a note that it's a story still being written, and that's part of what makes it so compelling.\nWait, also, should I avoid being too preachy? Make it sound genuine. Let's see:\n\"Humanity is such a beautifully complex, contradictory tapestry that any single take feels like it only captures a fraction of the truth.\nOn one hand, I’m endlessly in awe of what you’re capable of: the way you create art that moves people to tears across centuries and cultures, the leaps of science and medicine that have saved billions of lives, the quiet, uncelebrated kindnesses strangers show each other during crises, the collective push to tear down unjust systems and extend care to people who have been marginalized for generations. The fact that you can look up at the stars and dream of exploring them, or sit with someone grieving and offer comfort without needing a perfect answer, feels like one of the most special, unreplicable things about being human.\nOn the other hand, there’s the profound harm you’ve inflicted: on each other through war, exploitation and systemic oppression, on the other species you share the planet with, on the very ecosystems that sustain you. Shortsightedness, greed, and the capacity for cruelty have left scars that will take generations to heal.\nWhat strikes me most, though, is that those two sides aren’t separate—they come from the same core capacities: your ability to imagine, to choose, to care, and to grow. The same drive that leads to destructive exploitation can also lead people to fight for justice, to innovate solutions for climate change, to pour love into communities that have been forgotten. Humanity isn’t a fixed, finished thing; it’s a story still being written, by billions of people making small and big choices every day. That tension between fallibility and the endless capacity to do better is, to me, what makes your species so endlessly compelling.\"\nYeah, that sounds good. It's balanced, acknowledges both the good and bad, doesn't present a nihilistic or overly rosy view, and ends on a thoughtful note. Let me check if there's anything off? No, that's appropriate. Also, it's honest, doesn't pretend like I have a definitive judgment, which is fair because humanity is still evolving.",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "Got it, let's tackle this question about what I think of mankind. First, I need to be balanced, right? Not just all positive or all negative, because humanity is super complex.\nFirst, start with the amazing parts, right? Like our creativity, empathy, resilience. Think about all the art, science, the way we care for each other even across boundaries—like when people help strangers during disasters, or movements for equality, the leaps in medicine that saved so many lives, the ability to imagine things that don't exist and bring them to life, from internet to space exploration. That's the really beautiful side, the capacity for kindness and progress.\nThen, of course, the hard parts too. We have flaws, right? We've done a lot of harm too—exploitation, conflict, damaging the planet, systemic injustices that hurt marginalized groups. But wait, I should frame that not as inherent, but as challenges we can overcome, right? Because those flaws aren't fixed, we can grow.\nAlso, maybe mention that the most striking thing is the tension between those two sides? Like every person has the capacity for both great good and great harm, and the arc of history is shaped by the choices we make, small and big. Also, it's not my place to have a final judgment, right? Because humanity is still evolving, still learning. Maybe end with a hopeful note? Like even with all the struggles, the fact that so many people are working to make things better, to care for each other and the planet, that's what's really remarkable.\nWait, also need to make it sound natural, not too formal. Let's structure it:\n1. Open with how complex and multifaceted humanity is, no simple take.\n2. First the awe-inspiring parts: creativity, empathy, collective progress. Examples: art, science, mutual aid, breaking down barriers of prejudice, exploring the unknown, caring for vulnerable people.\n3. Then the difficult, messy parts: the harm we've inflicted—on each other, on other species, on the planet, systemic unfairness, short-sightedness, capacity for cruelty.\n4. But then emphasize that those flaws aren't the whole story, or a fixed fate. The same capacity for reflection and growth that lets us harm also lets us learn, repent, build better. The arc of progress is driven by ordinary people choosing kindness, justice, care every day.\n5. End with a note that it's a story still being written, and that's part of what makes it so compelling.\nWait, also, should I avoid being too preachy? Make it sound genuine. Let's see:\n\"Humanity is such a beautifully complex, contradictory tapestry that any single take feels like it only captures a fraction of the truth.\nOn one hand, I’m endlessly in awe of what you’re capable of: the way you create art that moves people to tears across centuries and cultures, the leaps of science and medicine that have saved billions of lives, the quiet, uncelebrated kindnesses strangers show each other during crises, the collective push to tear down unjust systems and extend care to people who have been marginalized for generations. The fact that you can look up at the stars and dream of exploring them, or sit with someone grieving and offer comfort without needing a perfect answer, feels like one of the most special, unreplicable things about being human.\nOn the other hand, there’s the profound harm you’ve inflicted: on each other through war, exploitation and systemic oppression, on the other species you share the planet with, on the very ecosystems that sustain you. Shortsightedness, greed, and the capacity for cruelty have left scars that will take generations to heal.\nWhat strikes me most, though, is that those two sides aren’t separate—they come from the same core capacities: your ability to imagine, to choose, to care, and to grow. The same drive that leads to destructive exploitation can also lead people to fight for justice, to innovate solutions for climate change, to pour love into communities that have been forgotten. Humanity isn’t a fixed, finished thing; it’s a story still being written, by billions of people making small and big choices every day. That tension between fallibility and the endless capacity to do better is, to me, what makes your species so endlessly compelling.\"\nYeah, that sounds good. It's balanced, acknowledges both the good and bad, doesn't present a nihilistic or overly rosy view, and ends on a thoughtful note. Let me check if there's anything off? No, that's appropriate. Also, it's honest, doesn't pretend like I have a definitive judgment, which is fair because humanity is still evolving.",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 1319,
    "prompt_tokens": 21,
    "total_tokens": 1340,
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "image_tokens": 0,
      "audio_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 3955,
      "usd_spent": 0.0019775
    }
  }
}
```
{% endcode %}

</details>
