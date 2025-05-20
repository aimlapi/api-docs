# gptr

## About

[GPT Researcher](https://docs.gptr.dev/docs/gpt-researcher/getting-started/introduction) is an autonomous agent that takes care of the tedious task of research for you, by scraping, filtering and aggregating over 20+ web sources per a single research task.

## Installation

```sh
pip install gpt-researcher
```

System requirements:

* Python 3.10+
* pip package manager

Two other usage options are also available: **End-to-End Application** and **Multi-Agent System with LangGraph**. You can find installation and deployment instructions in the project’s official documentation.&#x20;

Here's a usage option comparison table:

<table><thead><tr><th width="193">Feature</th><th width="156">PIP Package</th><th width="187">End-to-End Application</th><th>Multi Agent System</th></tr></thead><tbody><tr><td>Ease of Integration</td><td>High</td><td>Medium</td><td>Low</td></tr><tr><td>Customization</td><td>High</td><td>Medium</td><td>High</td></tr><tr><td>Out-of-the-box UI</td><td>No</td><td>Yes</td><td>No</td></tr><tr><td>Complexity</td><td>Low</td><td>Medium</td><td>High</td></tr><tr><td>Best for</td><td>Developers</td><td>End-users</td><td>Researchers/Experimenters</td></tr></tbody></table>

## How to Use AIML API with GPT Researcher

### Agent Example

If you're interested in using GPT Researcher as a standalone agent, you can easily import it into any existing Python project. Below, is an example of calling the agent to generate a research report:

{% code overflow="wrap" %}
```python
from gpt_researcher import GPTResearcher
import asyncio

async def fetch_report(query):
    """
    Fetch a research report based on the provided query and report type.
    """
    researcher = GPTResearcher(query=query)
    await researcher.conduct_research()
    report = await researcher.write_report()
    return report

async def generate_research_report(query):
    """
    This is a sample script that executes an async main function to run a research report.
    """
    report = await fetch_report(query)
    print(report)

if __name__ == "__main__":
    QUERY = "What happened in the latest burning man floods?"
    asyncio.run(generate_research_report(query=QUERY))
```
{% endcode %}

You can further enhance this example to use the returned report as context for generating valuable content such as news article, marketing content, email templates, newsletters, etc.

You can also use GPT Researcher to gather information about code documentation, business analysis, financial information and more. All of which can be used to complete much more complex tasks that require factual and high quality realtime information.

## Our Supported Models

* [OpenAI ChatGPT](broken-reference)
* [Google Gemini](broken-reference)
* [Claude (Anthropic)](broken-reference)
* [Llama 3](broken-reference)
* [Groq](broken-reference)
* [Mistral](broken-reference)
* [Embedding models](broken-reference)

To learn more about GPT Researcher, check out the [documentation page](https://docs.gptr.dev/docs/gpt-researcher/getting-started/introduction).
