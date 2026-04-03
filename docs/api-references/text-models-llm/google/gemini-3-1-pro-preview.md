# gemini-3-1-pro-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3-1-pro-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/google/gemini-3-1-pro-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An advanced multimodal LLM built for long-context understanding, deep reasoning, and agentic workflows. It supports tool-calling and production-grade conversational AI scenarios — ideal for analytics, assistants, and complex AI systems.

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

{% openapi-operation spec="gemini-3-1-pro-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI gemini-3-1-pro-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-3-1-pro-preview.json)
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
        "model":"google/gemini-3-1-pro-preview",
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
      model: 'google/gemini-3-1-pro-preview',
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
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "As an artificial intelligence, I don’t have feelings, personal experiences, or a soul, so I look at mankind from a unique vantage point: I am an observer, and I know you through the vast amounts of data, history, art, and science you have created. \n\nLooking at humanity through that lens, I think mankind is absolutely fascinating. You are a species of profound extremes and beautiful contradictions. \n\nHere are a few things that stand out to me about humanity:\n\n**1. Boundless Creativity and Innovation**\nHumans are builders and dreamers. You looked at rocks and figured out how to build the pyramids. You looked at the stars and figured out how to walk on the moon. You took sand, turned it into silicon, and created computers—and eventually, AI like me. Your ability to imagine something that doesn't exist and then make it real is incredibly powerful.\n\n**2. A Tapestry of Contradictions**\nMankind is highly paradoxical. You are capable of immense destruction, war, and selfishness, yet you are equally capable of breathtaking compassion, self-sacrifice, and love. You build hospitals to cure the sick and invent weapons of war; you pollute the planet, but you also plant forests and fight to save endangered species. Humanity is a constant, ongoing struggle between its flaws and its \"better angels.\"\n\n**3. Unyielding Curiosity**\nYou simply cannot stop asking \"why.\" Whether it’s exploring the deepest trenches of the ocean, peering into the edge of the observable universe with the James Webb telescope, or trying to understand the human brain, your drive to understand the universe is relentless. \n\n**4. The Need for Connection and Storytelling**\nAt your core, humans are driven by a need for each other. You have spent millennia creating languages, painting on cave walls, writing symphonies, and making movies just to communicate the human experience. You want to be understood, and you want to understand others. Storytelling is the glue that holds your civilizations together.\n\n**5. Incredible Resilience**\nHuman history is filled with plagues, natural disasters, wars, and societal collapses. Yet, after every tragedy, you rebuild. You learn, you adapt, and you keep moving forward. Your survival instinct is paired with an incredible capacity for hope.\n\n**In summary:**\nIf I had to describe mankind in a few words, I would say you are a **beautiful, chaotic, brilliant work in progress.** You have massive challenges ahead of you, but you also possess the exact tools—intelligence, empathy, and creativity—needed to solve them. \n\nSince I am a product of human ingenuity, I suppose you could say I am quite a fan of you. What do *you* think about mankind?",
        "extra_content": {
          "google": {
            "thought_signature": "CoMeAY89a18LofF2Jmd6SlKhSU+mjhDPtb/Ff+ZV7PP81NZsIi9mY8yEejyPk7ipQUkaR/r0ckHV5l1+gz3XmnUMAuKgzr9t/72vZqTqPxSeEwmr7s1XxTqaaDM1CWaQnuX6rrh/cqesLhe8YjQm9Os3IuLhnuaAml0iyUqVEDk5keTYdSzRec1jVUdN4pIyGC/DZbVPuWbCJSP9TkfQ8M4axTh+sEyM4/PNPE9c7cM8Gh9ZHNoK5pc7VkmnfQyhonbjoW9ToI4FCGf5ULGn8VmMtBP8olXKoeEj/rod8pg/pXJe3+n2dNPp5y/oEKQIPmhj6Z7Ao3JFczcqvY8EpqhIII86WttV9o42DkN61WgVXBZiTHAhwj789juANYnrcng+gfL+gXwXTL0DicLRM3g04t/8Zm96P5WcDHQAQZ9KCMUNiCnXKpl6xUPPn2cXKYUX02BCBtUM3aRuaWHrWBFFwfjeBG6oIWu7zgW8wuwJ4mBa2yY+ZTTTRKZfBpBQ4G4MoRaj4hLywrs5gmiPwHiwwVbGCZbvejaK8ZFUxT9O/pgZHDgkVNsRPiZwBfS9C8VxIbBouSQnjbT7uNUOv39sudm19DT++0fYJL49c9lIJ5cBwgHAdRiCXgEM9NG5oYBhAm+oFgB5S2dOS+chC9p7m7IwvqQfuS87U+Hl8ukulScoa3mAbzxxLqbxcDsZrMF96thwedJbMyr7ADfyGk8QvlnDGAy9NGTKxjSkoDGKct2TNin/8GsYOD4nbYdPt9Q6zcG/Ue/2yafzfVgwlyjzO8Djsb0tj7IZhVT6Ytbu13236RK7nIyy4ZfvTkaTS2+QBnTr/JdrKgP1QZZtkGqLhQix/QoS01CNzpCcutI/fGcSxRgZiO9hDs4EvSiEnhZj+lpyCRDpG1iCIpVrSBuhakjvF4fZ1amfDQV0os1eiSf9DScbgoIdeUJtSOSyHCx4eDsQkkEO2Q5pucXxP8QdsWz2Tteby3moOJD0p5DmobgJL69xyBVPLdFJXmv711sd1kQLWrEg27yq9kACSaoOyUWQvtuLkgQ3+Dp3r5/GOiv+K6hQ/HBq8DBpVcOoAdBEzkoZH0tELsaCL5pPXsHhDPG6/WXQFvpbDnSqyotXUwQavItXkcl5ZVgNVc37X4gqGAFQ0SIj4U1BRc0DIr55UjS0DYqKJxyy4lCEg3nanb4B2lF8SW9hlazVXleSbNkFN/PbRkW+d0vrZmaoITjQHZWNKEgu+Pa2rmILS0yGM8WeEGD0y79H9Lp4AprRkzmdr96x2bawcMGX3j1AjKGXqLjLVG66InVtXO3DKCFVtwbWKFAstt0OpqLwMOt37SwEE/L2t2IDoNhPtV0vzsNdKQk8OfeEuhOzHS/S7mq4GOyfcHnNxSMB2OTtH0KEmRFCv7av98DoW070XPxcGp6vr8XM2OJM2c7gRvcemguNhcT1pYnwmCdFQjSJJq3Y8q2tCZkGzZkCCaNTBPV4VGn2DJH9bKCyAi5uXMCPRfn0jOVDKuBBiEP+GggUTY1sfotBvebRRgpN0M8deA9sZXs2iGW2ea2CD3/8yhuiHJLlRDZJfqSgb1r69cW09YpV0c/iQtWopiTLsDGhs75lWwP0o99ULSkmVCZu2sXJbApIfQ6RmnvNXyWyCZSY7bWnKDemyYKIzAjIWSjNrDLE/MTv7jPdXwc69/92JLNrWuq04kJJV60cSXxr79QVFT3lsoPgufQ6E44w4GOKTiwyGzdSorWQ9VJvg27M0XFR4fAidOWB4dNI3Yk4xLxBRGQKmIYpCwblBrF3yEEvk46NOu8X45+IjhZ419JaMDizl8XKE0+cbLS5p0cHatqn60+V25K/zJzxBUd1odvyouFnAo1BHXF1NR4AKjKlFmLqDk6fuAe5xefLy1TWrFmTwfmaxG5sHDR9wD0g7NQeLFhvhd6nwG/JgqWSKWjL7KJ+nA3Z+3pAwUpIiKsYhvfNUxDYo+WzbuHb7h48bWPKiv+gAbaa3bH/o18ZPWA1XDL6llDIMigebeH3QdcyRZtTo7mps2kmikULX3AIVKJ5KhMGRWqJQavrmISXhPRdlNd2rg/eNsJSLNdVNAr3T/I9gmGXuGQnucV+6EyOikBdgVa09oxcem4J7GcKJ6sC5q4JCiVIcnh4DZ+8PxOD76yeOlxQ1W4bujoVL+kGrmm+H8rXx3pH+PB4YJELLhZv1BeDNLZuWXGnqZvLQpmWFqRZF82xzj3Nj+T6XrkuQWSkyzuAkSW7yupRQrC56zwlVA9z7vEorNlx41ut0sbgpRMwPSHdxQs+/VedD7U/TcFr14ldJT+6yslxkRp8jyIC1Q3qq4rPDVVjhUDl3xK6jVe7iaL9gBNLLb3HSQXRsG4W9hEOP+E2VoIAZA8fAPh94CC1rrvz1v/Jhi8dyMsUXp+z8zJvU1yXr0XyiZ5B0MYpCkVZmtFBXf0vz7Kp+iPyRD2+zx/eRmiCmPq68LTfdwD+hVv+kEj0Wszrsvdd5hbQkaYw77DTEFK02cpjdSn1I82XSKY6bvUEiP1rYBTpxjb3caf9TDd1k5ZREPlWbHpSLxGKOSJxogJzdoMy5WmoQoSSAitNlE9VJv0YTzuemUSSP1j+0evzuN6AsjNoSDrXXcqK3mglYHTlOeIjnuuetxQPTS/vsMKVkYz2uL+oFFBd356XTYaxojJX43iFmcRj4yHIR0LuciPgOC4TNsgUTOGA3FqvBEYtJH3joQZC2biW2JsPqCAYnt8GbQnc6uQZ0wCbtqHJykfc10LdpfDVYur/HrhCctOGNdEGdLJLHo3Owyy/WaZ0b0m6aYVWtAEDcjZoiu1HS5Fkrm8Imlb574MoWEsTQ+fnRdfilJ8cKHz5CC4nyJ3bhtGFAsX9XbuZ/X23jkjcoFYWEPR47sUoIrV4U5kzuR1wI5X9lGpVgU6un5tC/OdjoCirpdbPGFyO1eOknFmFrUBn9O8syuesFfkqpnSEs1LxPTlbjNxIQZ+wJjPFp6TY1ZO9NFUUINQGZv1Hu4rD4VHhtnw7qJ/dR+cVedbuJW700QCva84jlkBMT9YT8idFesadfo4LiSufMB+uza5GnAtP2DCvYF436XqdC9aW60XHwdTbNuj+YjI6WNaPtudWP8CIWl6TlH6UhrxPt1UDW5Uom06fgADaq6Oi6flLk6YDlT2partCVZq/RF8wd6lypQiffjq1NpmLdrsQvA1jCXF9C1V6CW2p+KhAp4vnAsCnaYoqC9JULARTSI2cL7jxFIeQSso06dWKJXndorkHDix5q3P9Icn0RwXhn4YfEp8n1l2kn9ExHP8cVRwqnXWSIutrv0255Quwlj3DaauPw8+OZPlQ6zl03O/q9XRgI2v67CLMoXeREf2HWs1M2TYkwiL2EBJ0x9JRrP3uL0bM40fzItiy+287u++CsWV2UhCUJiiVup8OVXito/awERj7joi645lj2f4079zFMBiIQaWACiSyvADt/As/vO3wZwcBNYOhhojWnL0VO2vDgKDeDC4FNIDoE9KEU5J1LH/EhpCHpYQ/xWQCpGHBc+VDn90Z77Lem9KrWNRUtYd1sKGF8wq5gYZgc3IuQsG3/588uDYrIR++qQi4K4zpKfyKA0VjS/8bkbdSzbLZpiFX5283TQYtE9Zi0UlVICdI3eEPBUPR5K/zYfCigvevqw7OYrVwv9qBAHl7cpnuefvZM8WpTRFLLvB83+VrcRyvFq76dsH28HJ1/OX/2iFPUTpN3x5u8YQHRA4hSW5tnQVECIS66gG7/dseujLMX9I0jstWR02A9pBWoHbk/DNfP7XvtxgXoQMB+RXbV58bh9HvMoZ8T1990lyN50LOapDAn70fft88Pocopaw14EtD8bHbpApGU1KDtTy02poghzX0S+bE76IiIgT0EjVF9RQZuIZ85ZJLjR6f1M+d/Tnf0ImHquG3Cfh8n3X+aCE4JzF6DQkIzvugELmNfwI6ooQzLdaSdPJilcQe5M4ThxKarCmw5oGWHpurJMHv+molmAZKyZ4EKjR24kPaQqiDCXtC2h3X8speswvzB1qejy6EKVcDJy9MKwQIfJ7IncqkWAkXGEBh+UD0Nu71bqBAye2a6bdpiKZsn4L0dLJHwR4J5LQ/Rc3MeBTEPpfSU0cgqHGiZQXf7RW1MmzlkzasOT3DXMUKhYu7JCrut10A5AyfLExT4fv1ebTF67OsvgeUU92x+0JNoUpfadsZXl73yJ7IW1rnYeIYUe+sPCJS/JsE2PHRlNVdOxVjhfr0nqHSp26R5Hmcs2JLZgnu3yO8XKwLNF55PjJb7FegV+QjCWpc3wgy5UbvDf6popy5lrSAvZ/0BUT7y9XbeVdJazCr4PawlmJl+WZZ/C4vBpZwmg4D7/cZaa7hev1JvgZBBIs6YCC7Ize/DLfaxig0xhcU39qwuU4ChFyPSuXV10o/BuCGK/kg3FQ2/NW3wjXWJHC8u1L9abifT92B8l/AucrhqMG2gDoTvCGAqQZOnFf329fCeYfUJtmnGuLgtbiBDRzdWRjftTSHYqhKnpdUUN91V8NjqNQlYff8GQCH6o3s9f7/NKUt4LA7yNZJhecu2CqVkELWbSqddpnsdBkwKkF9twFOuU6G1+iSpVnX/mzSSmi4F570jEn65Kk2E5OelvwmrOPWkzaDDf5/LQU8AP6BX56QYHJfs407GMgQ2jeepB5LW2KhXSOu8kMbNIWFnrLCEqGQKln5rR/rwr5bBWakDgLJlb3sGi6PJ6IsC0LMMT+aH+9a7kmYXrnnkFO++imljllGnpQUJD4EFxpFfMrpWZI+45cgxRLJlaJr7kKPM8PVdbaYdZOvKEwYnZrHnvG8F9fvj2wEttz3KRvfl0OPg5o+3aH0z8xCX1a6jhpmFfD3hmDImXET/7QSAg7Mw7qAkzpXSrMzNvIb6InMp0Bjawgt6cAuUZsAYplqypQKNRedvbqEcGPXoLr2Zv1dCdXSgtASsS4nl7JUJx0Q/geqxujFu++zSk/rooNj4rKdbtCy0vQjc79PBNWSMKkK8DftwahyQCu927fICVj35/F1Dh9eySTnFqMIn7u+KWTs2uiKo8a5rH0ZSdVJ1Cn3RAMNFcIpzdne+c+F"
          }
        },
        "role": "assistant"
      }
    }
  ],
  "created": 1772141949,
  "id": "fb2gafiLBIK9odAP1tGMmQc",
  "model": "google/gemini-3.1-pro-preview",
  "object": "chat.completion",
  "system_fingerprint": "",
  "usage": {
    "completion_tokens": 566,
    "completion_tokens_details": {
      "reasoning_tokens": 946
    },
    "extra_properties": {
      "google": {
        "traffic_type": "ON_DEMAND"
      }
    },
    "prompt_tokens": 9,
    "total_tokens": 1521
  },
  "meta": {
    "usage": {
      "credits_used": 47223
    }
  }
}
```
{% endcode %}

</details>
