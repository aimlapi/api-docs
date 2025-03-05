# AI Search Engine

## Overview

AI Web Search Engine is designed to retrieve real-time information from the internet. This solution processes user queries and return relevant data from various online sources, making them useful for tasks that require up-to-date knowledge beyond static datasets. It supports **two** usage options:

{% stepper %}
{% step %}
**Using six specialized API endpoints**, each designed to search for only one specific type of information. These endpoints return structured responses, making them more suitable for integration into specialized services (e.g., a weather widget). Here are the types of information you can retrieve this way:

* [Links](https://docs.aimlapi.com/api-overview/web-search-models/bagoodex/bagoodex-bagoodex-search-v1/find-links)
* [Images](https://docs.aimlapi.com/api-overview/web-search-models/bagoodex/bagoodex-bagoodex-search-v1/find-images)
* [Videos](https://docs.aimlapi.com/api-overview/web-search-models/bagoodex/bagoodex-bagoodex-search-v1/find-videos)
* [Weather details for a specified location](https://docs.aimlapi.com/api-overview/web-search-models/bagoodex/bagoodex-bagoodex-search-v1/find-the-weather)
* [Locations](https://docs.aimlapi.com/api-overview/web-search-models/bagoodex/bagoodex-bagoodex-search-v1/find-a-local-map)
* [Knowledge about a topic, structured as a small knowledge base](https://docs.aimlapi.com/api-overview/web-search-models/bagoodex/bagoodex-bagoodex-search-v1/get-a-knowledge-structure)

See API references and examples on the subpages.
{% endstep %}

{% step %}
**As a general** [**chat completion**](../../capabilities/completion-or-chat-models.md) **solution** (but searching on the internet): enter a query in the prompt and receive an internet-sourced answer, similar to asking a question on a search engine through a browser. See the API Schema below or check how this call is made in the Python example on the bottom of this page.
{% endstep %}
{% endstepper %}

### API Schema

{% openapi src="../../api-references/web-search-models/bagoodex/bagoodex-search-v1.json" path="/v1/chat/completions" method="post" %}
[bagoodex-search-v1.json](../../api-references/web-search-models/bagoodex/bagoodex-search-v1.json)
{% endopenapi %}

## Example

```python
import requests
from openai import OpenAI

# Insert your AIML API Key instead of <YOUR_API_KEY>:
API_KEY = '<YOUR_API_KEY>'
API_URL = 'https://api.aimlapi.com'

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
                
                # Enter your query here
                "content": 'how to make a slingshot',
            },
        ],
    )
    
    
    print(response.choices[0].message.content)


# Run the function
complete_chat()
```

**Response**:

{% code overflow="wrap" %}
```
To make a slingshot, you can follow the instructions provided in the two sources:

**Option 1: Make a Giant Slingshot**

* Start by cutting two 2x4's to a length of 40 inches each, which will be the main arms of the slingshot.
* Attach the arms to a base made of plywood using screws, and then add side braces to support the arms.
* Install an exercise band as the launching mechanism, making sure to tighten it to achieve the desired distance.
* Add a cross brace to keep the arms rigid and prevent them from spreading or caving in.

**Option 2: Make a Stick Slingshot**

* Find a sturdy, Y-shaped stick and break it down to the desired shape.
* Cut notches on the ends of the stick to hold the rubber bands in place.
* Create a pouch by folding a piece of fabric in half and then half again, and then cutting small holes for the rubber bands.        
* Thread the rubber bands through the holes and tie them securely to the stick using thread.
* Decorate the slingshot with coloured yarn or twine if desired.

You can choose to make either a giant slingshot or a stick slingshot, depending on your preference and the materials available.  
```
{% endcode %}

