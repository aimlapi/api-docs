# Browser Use

## About

[Browser Use](https://docs.browser-use.com/introduction) is an LLM-powered browser automation tool that allows language models to control a real browser via structured system and user prompts. The LLM decides which browser actions to perform (open pages, navigate, click, read content), while the execution is handled by the browser runtime. The integration works with any supported LLM and does not rely on model-specific features.

## Installation

**Environment requirements**

* Python 3.12
* Supported operating systems: macOS / Linux / Windows
* Chromium is used (installed automatically)

**Environment setup**

```sh
pip install uv
uv venv --python 3.12
source .venv/bin/activate
# Windows:
.venv\Scripts\activate
```

**Installing dependencies**

```sh
uv pip install browser-use python-dotenv
uvx browser-use install
```

## How to Use AIML API with Browser Use

**General concept**

Browser Use works as follows:

* The user provides system and user prompts to the LLM.
* The LLM returns instructions.
* The browser executes the actions.

{% hint style="info" %}
**Important notes:**

* It does _not_ require any special tool-calling APIs.
* It does _not_ rely on model-specific features.
* All decision-making logic lives entirely in the LLM.
* The browser only executes the commands returned by the model.
{% endhint %}

There is no tight coupling to a specific model. All our LLMs are supported.

***

**Setting up your API key**

You can create a dedicated `.env` file and store your AIMLAPI key there once, then reference this file from your code.

```python
AIMLAPI_KEY=YOUR_KEY
```

Alternatively, you can place the key directly in your code, as shown in the example code below.

***

## **Example Code**

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import asyncio
import os
from dotenv import load_dotenv
from browser_use import Agent, ChatOpenAI

load_dotenv()

llm = ChatOpenAI(
    model = "x-ai/grok-4-07-09",             # Insert the ID of one of our LLMs
    base_url = "https://api.aimlapi.com",
    api_key = os.getenv("<YOUR_AIMLAPI_KEY>"),        # Insert your AIMLAPI Key
)

agent = Agent(
    task = 'Find the number of stars of the browser-use repo', # Insert the instruction
    llm = llm,
    use_vision = True,
)

async def main():
    await agent.run(max_steps=10)

asyncio.run(main())
```
{% endcode %}
{% endtab %}
{% endtabs %}

## **Supported Models**

All our [LLMs](../api-references/text-models-llm/) are supported.

## More

For further information about the framework, please check [the official documentation](https://docs.browser-use.com/introduction).

For additional examples, check out [the repo](https://github.com/browser-use/browser-use-rsi).
