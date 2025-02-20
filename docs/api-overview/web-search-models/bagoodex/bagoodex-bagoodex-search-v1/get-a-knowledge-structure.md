# Get a Knowledge Structure

## Overview

This is a description of one of the six use cases for the `bagoodex/bagoodex-search-v1` model—retrieving a small structured knowledge base on the requested subject based on information from the internet.

An output example:

{% code overflow="wrap" %}
```json
{
  'title': 'Nikola Tesla', 
  'type': 'Engineer and futurist', 
  'description': None, 
  'born': 'July 10, 1856, Smiljan, Croatia', 
  'died': 'January 7, 1943 (age 86 years), The New Yorker A Wyndham Hotel, New York, NY'
}
```
{% endcode %}

{% hint style="info" %}
The output will be the requested information retrieved from the internet—or empty brackets `{}` if nothing was found or if the entered query does not match the selected search type  (for example, querying something like "I love Antarctica" instead of some topic).
{% endhint %}

## How to make a call

First, you must first call the standard chat completion endpoint with your query. (See the Chat Completion call in the [corresponding section](https://docs.aimlapi.com/api-overview/text-models-llm/chat-completion) of this documentation or check how this call is made in the [example ](get-a-knowledge-structure.md#example)below.)&#x20;

{% hint style="success" %}
Note that queries can include Google's advanced search syntax:

* **Search for an exact match:** Enter a word or phrase inside quotes. For example, `"tallest building"`.&#x20;
* **Search for a specific site:** Enter `site:` in front of a site or domain. For example, `site:youtube.com cat videos`.
* **Exclude words from your search:** Enter `-` in front of a word that you want to leave out. For example, `jaguar speed -car`.
{% endhint %}

The chat completion endpoint returns an ID, which must then be passed as the sole input parameter `followup_id` to the `bagoodex/knowledge` endpoint below.

## API Schema

{% swagger src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/bagoodex/knowledge" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endswagger %}

### Example

{% code overflow="wrap" %}
```python
import requests
from openai import OpenAI

# Insert your AIML API Key instead of <YOUR_API_KEY>:
API_KEY = '<YOUR_API_KEY>'
API_URL = 'https://api.aimlapi.com'

# Call the standart chat completion endpoint to get an ID
def complete_chat():
    client = OpenAI(
        base_url=API_URL,
        api_key=API_KEY,
    )    

    response = client.chat.completions.create(
        model="bagoodex/bagoodex-search-v1",
        messages=[
            {
                "role": "user",
                "content": "Who is Nicola Tesla",
            },
        ],
    )
    
    # Extract the ID from the response
    gen_id = response.id  
    print(f"Generated ID: {gen_id}")
    
    # Call the Bagoodex endpoint with the generated ID
    get_knowledge(gen_id)

def get_knowledge(gen_id):
    params = {'followup_id': gen_id}
    headers = {'Authorization': f'Bearer {API_KEY}'}
    
    response = requests.get(f'{API_URL}/v1/bagoodex/knowledge', headers=headers, params=params)
    print(response.json())

# Run the function
complete_chat()
```
{% endcode %}

**Model Response**:

{% code overflow="wrap" %}
```json
{
  'title': 'Nikola Tesla', 
  'type': 'Engineer and futurist', 
  'description': None, 
  'born': 'July 10, 1856, Smiljan, Croatia', 
  'died': 'January 7, 1943 (age 86 years), The New Yorker A Wyndham Hotel, New York, NY'
}
```
{% endcode %}
