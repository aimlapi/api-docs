---
icon: code
description: Use the API to list all available models and compare their responses.
---

# Models comparsion

The API used in this example is listed on the [model-database.md](../api-references/model-database/model-database.md "mention") page.

### Example

For example, you can send requests to two random models and compare the results:

{% code overflow="wrap" %}
```javascript
const { OpenAI } = require('openai');
const { Axios } = require('axios');
const main = async () => {
  const BASE_URL = '{{baseUrl}}';
  const API_TOKEN = '{{token}}';
  const axios = new Axios({
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    baseURL: BASE_URL,
  });
  const openai = new OpenAI({ baseURL: BASE_URL, apiKey: API_TOKEN });
  const vendorByModel = await axios.get('/models').then((res) => JSON.parse(res.data));
  const models = Object.keys(vendorByModel);
  const shuffledModels = [...models].sort(() => Math.round(Math.random()));
  const selectedModels = shuffledModels.slice(0, 2);
  const systemPrompt = `You are an AI assistant that only responds with jokes.`;
  const userPrompt = `Why is the sky blue?`;
  for (const model of selectedModels) {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model,
    });
    const message = completion.choices[0].message.content;
    console.log(`--- ${model} ---`);
    console.log(`USER: ${userPrompt}`);
    console.log(`AI  : ${message}`);
  }
};
main();

```
{% endcode %}

Will return something like this:

{% code overflow="wrap" %}
```
--- zero-one-ai/Yi-34B-Chat ---
USER: Why is the sky blue?
AI  : Why is the sky blue? Because it's full of blueberries!
--- allenai/OLMo-7B-Instruct ---
USER: Why is the sky blue?
AI  : Because the white sun beams enter the blue Earth's atmosphere and get dispersed, resulting in the beautiful color we call "sky blue." It's like looking at paint being blown on a canvas by the wind! Just a joke, but the real answer is physics. 😎

```
{% endcode %}
