# gemini-3-flash-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3-flash-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=google/gemini-3-flash-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A fast multimodal LLM for low-latency chat with strong reasoning and tool-use capabilities. Supports text input and optional image understanding for vision-based prompts.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet). :black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure the key is enabled on the UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find a code example that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key. :black\_small\_square: Adjust the input field used by this model (for example, prompt, input text, instructions, media source, or other model-specific input) to match your request.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup> **Adjust other optional parameters if needed**

Only the required parameters shown in the example are needed to run the request, but you can include optional parameters to fine-tune behavior. Below, you can find the corresponding **API schema**, which lists all available parameters and usage notes.

:digit\_five: **Run your modified code**

Run your modified code inside your development environment. Response time depends on many factors, but for simple requests it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step-by-step, feel free to use our [**Quickstart guide.**](https://docs.aimlapi.com/quickstart/setting-up)
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="gemini-3-flash-preview" path="/chat/completions" method="post" %}
[OpenAPI gemini-3-flash-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-3-flash-preview.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"google/gemini-3-flash-preview",
        "messages":[
            {
                "role":"user",
                # Insert your question for the model here:
                "content":"Hi! What do you think about mankind?"
            }
        ],
        "max_tokens":15000,
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
  try {
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages:[
            {
                role:'user',

                // Insert your question for the model here:
                content: 'Hi! What do you think about mankind?'
            }
        ],
        max_tokens: 15000,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Error', error);
  }
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
    "id": "gen-1765999996-ACx5YQHD6LKvBVhtfuIA",
    "model": "google/gemini-3-flash-preview",
    "object": "chat.completion",
    "created": 1765999996,
    "choices": [
        {
            "logprobs": null,
            "finish_reason": "stop",
            "native_finish_reason": "STOP",
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Learning Python is one of the best decisions you can make if you are interested in coding. It is famous for being \"beginner-friendly\" because its syntax looks a lot like English.\n\nHere is a step-by-step roadmap to go from zero to a functional Python developer:\n\n---\n\n### Step 1: Set Up Your Environment\nDon't get bogged down in complex tools yet.\n*   **Download Python:** Go to [python.org](https://www.python.org/) and download the latest version.\n*   **Pick an Editor:** \n    *   **Thonny:** Great for absolute beginners because it shows you what the computer is thinking.\n    *   **VS Code:** The industry standard. Flexible and powerful.\n    *   **Replit:** If you don't want to install anything, you can code directly in your browser.\n\n### Step 2: Master the Fundamentals\nDon't rush this part. These concepts are the \"LEGO bricks\" of every program:\n1.  **Variables and Data Types:** Learn about strings (text), integers (numbers), and booleans (True/False).\n2.  **Basic Math:** `+`, `-`, `*`, `/`, `%` (remainder).\n3.  **Conditionals:** `if`, `elif`, and `else`. This is how programs make decisions.\n4.  **Loops:** `for` and `while` loops. This is how you repeat tasks.\n5.  **Functions:** How to wrap a block of code so you can use it over and over.\n6.  **Data Structures:** Lists, Dictionaries, and Sets. These are how you store and organize data.\n\n### Step 3: Best Resources (mostly free)\n*   **For the \"Reading\" Learner:** [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/) by Al Sweigart. It is free online and focuses on practical things you can actually use.\n*   **For the \"Watching\" Learner:** \n    *   **Corey Schafer (YouTube):** The best deep-dive tutorials available.\n    *   **Programming with Mosh:** Good for a fast (1-6 hour) crash course.\n    *   **FreeCodeCamp:** Extensive 10-hour+ courses on YouTube.\n*   **For the \"Interactive\" Learner:** \n    *   **University of Helsinki MOOC:** Arguably the best free Python course on the internet. It includes exercises that are graded automatically.\n\n### Step 4: Stop Watching, Start Doing\nThe \"Tutorial Hell\" trap is real—where you watch videos but can't write code on your own. To avoid this, build these tiny projects:\n*   **Calculator:** Takes two numbers and adds/subtracts them.\n*   **Number Guessing Game:** The computer picks a number and tells you if your guess is \"Higher\" or \"Lower.\"\n*   **To-Do List:** Let the user add, delete, and view tasks in the terminal.\n*   **Simple Web Scraper:** Pull the price of a product off a website.\n\n### Step 5: Choose a Specialization\nOnce you know the basics, Python branches out into different \"careers.\" Pick one:\n*   **Data Science / AI:** Learn libraries like `Pandas`, `NumPy`, and `Scikit-learn`.\n*   **Web Development:** Learn `Django` or `Flask` to build websites.\n*   **Automation:** Use `Selenium` or `BeautifulSoup` to automate repetitive browser tasks.\n*   **Game Dev:** Learn `Pygame`.\n\n### Key Tips for Success:\n1.  **Code Every Day:** Even if it’s just for 15 minutes. Coding is a \"muscle memory\" skill.\n2.  **Hand-write your code:** If you are struggling with a concept, write it out on a whiteboard or paper. \n3.  **Don't memorize:** You don't need to memorize every command. Real developers Google things and use Documentation every single day.\n4.  **Use AI wisely:** You can ask ChatGPT or Claude to \"Explain this line of code to me like I'm five.\" But **never** just copy-paste code you don't understand.\n\n**The Golden Rule:** The moment you finish a tutorial, try to change one thing in the code to see if you can make it do something different. That is when the real learning happens.",
                "refusal": null,
            }
        }
    ],
    "usage": {
        "prompt_tokens": 5,
        "completion_tokens": 1330,
        "total_tokens": 1335,
        "prompt_tokens_details": {
            "cached_tokens": 0,
            "audio_tokens": 0,
            "video_tokens": 0
        },
        "completion_tokens_details": {
            "reasoning_tokens": 371,
            "image_tokens": 0
        }
    },
    "meta": {
        "usage": {
            "credits_used": 8846
        }
    }
}
```
{% endcode %}

</details>
