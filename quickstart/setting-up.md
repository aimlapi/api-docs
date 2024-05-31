# Setting Up

**Generating an API Key**

To use the AI/ML API, you need to create an account and generate an API key. Follow these steps:

1. [**Create an Account**](https://aimlapi.com/app/sign-up)**:** Visit the AI/ML API website and create an account.
2. [**Generate an API Key**](https://aimlapi.com/app/keys)**:** After logging in, navigate to your account dashboard and generate your API key.

**Configure Base URL**

Set the base URL for API requests as follows:

```arduino
https://api.aimlapi.com
```

**Making Your First API Call**

**Example in Python**

```python
import openai

system_content = "You are a travel agent. Be descriptive and helpful."
user_content = "Tell me about San Francisco"

client = openai.OpenAI(
    api_key="your_api_key_here",
    base_url="https://api.aimlapi.com",
)

chat_completion = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    messages=[
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_content},
    ],
    temperature=0.7,
    max_tokens=128,
)

response = chat_completion.choices[0].message.content
print("AI/ML API:\n", response)
```

**Example in Node.js**

```javascript
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "your_api_key_here",
  baseURL: "https://api.aimlapi.com",
});

(async () => {
  const chatCompletion = await openai.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      { role: "system", content: "You are a travel agent. Be descriptive and helpful" },
      { role: "user", content: "Tell me about San Francisco" }
    ],
    temperature: 0.7,
    max_tokens: 128,
  });
  console.log("AI/ML API:\n", chatCompletion.choices[0].message.content);
})();
```

**Versioned URLs**

The AI/ML API supports both versioned and non-versioned URLs, providing flexibility in your API requests. You can use either of the following formats:

**Non-versioned URL:**

`https://api.aimlapi.com/chat/completions`

**Versioned URL:**

`https://api.aimlapi.com/v1/chat/completions`

Using versioned URLs can help ensure compatibility with future updates and changes to the API. It is recommended to use versioned URLs for long-term projects to maintain stability.
