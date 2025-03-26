---
description: >-
  Description, API schema, and usage examples of the specialized solution — AI
  Search Engine.
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# AI Search Engine

## Overview

AI Web Search Engine is designed to retrieve real-time information from the internet. This solution processes user queries and return relevant data from various online sources, making them useful for tasks that require up-to-date knowledge beyond static datasets. It supports **two** usage options:

{% stepper %}
{% step %}
**Using six specialized API endpoints**, each designed to search for only one specific type of information. These endpoints return structured responses, making them more suitable for integration into specialized services (e.g., a weather widget). Here are the types of information you can retrieve this way:

* [Links](find-links.md)
* [Images](find-images.md)
* [Videos](find-videos.md)
* [Weather details for a specified location](find-the-weather.md)
* [Locations](find-a-local-map.md)
* [Knowledge about a topic, structured as a small knowledge base](get-a-knowledge-structure.md)

See API references and examples on the subpages.
{% endstep %}

{% step %}
**As a general** [**chat completion**](../../../capabilities/completion-or-chat-models.md) **solution** (but searching on the internet): enter a query in the prompt and receive an internet-sourced answer, similar to asking a question on a search engine through a browser. See the API Schema below or check how this call is made in the Python example on the bottom of this page.
{% endstep %}
{% endstepper %}

## How to make a call

&#x20;Check how this call is made in the [examples](./#example-1) below.

{% hint style="success" %}
Note that queries can include advanced search syntax:

* **Search for an exact match:** Enter a word or phrase using `\"` before and after it.\
  For example, `\"tallest building\"`.
* **Search for a specific site:** Enter `site:` in front of a site or domain.\
  For example, `site:youtube.com cat videos`.
* **Exclude words from your search:** Enter `-` in front of a word that you want to leave out.\
  For example, `jaguar speed -car`.
{% endhint %}

{% hint style="success" %}
You can also personalize the AI Search Engine output by passing the `ip` parameter. \
See [Example #2](./#example-2-using-the-ip-parameter-for-personalized-model-output) below.
{% endhint %}

### API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/solutions/Bagoodex/bagoodex-search-v1.json" path="/v1/chat/completions" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/solutions/Bagoodex/bagoodex-search-v1.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/solutions/Bagoodex/bagoodex-search-v1.json)
{% endopenapi %}



## Example #1

{% tabs %}
{% tab title="Python" %}
```python
import requests
from openai import OpenAI

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
API_KEY = '<YOUR_AIMLAPI_KEY>'
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
{% endtab %}

{% tab title="JavaScript" %}
```javascript
// Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
const API_KEY = '<YOUR_AIMLAPI_KEY>';
const API_URL = 'https://api.aimlapi.com/v1/chat/completions';

async function completeChat() {
    const requestBody = {
        model: "bagoodex/bagoodex-search-v1",
        messages: [
            {
                role: "user",
                content: "how to make a slingshot"
            }
        ]
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log(data.choices[0].message.content);
    } catch (error) {
        console.error("Error fetching completion:", error);
    }
}

// Run the function
completeChat();

```
{% endtab %}
{% endtabs %}

<details>

<summary><strong>Response</strong></summary>

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

</details>

## Example #2: Using the IP Parameter for Personalized Model Output

When using regular search engines in browsers, we can simply ask, '_Weather today_' without specifying our location. In this case, the search engine automatically uses your IP address to determine your location and provide a more relevant response. The AI Search Engine also supports IP-based personalization.

In the example below, the query does not specify a city, but since the request includes an IP address registered in Stockholm, the system automatically adjusts, and the response will contain today's weather forecast for that city.

{% hint style="warning" %}
Note that when making a request via Python, the `ip` parameter should be included inside the `extra_body` parameter (see example below). When using other languages, this is not required, and the `ip` parameter can be passed like any other parameter.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
from openai import OpenAI

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
API_KEY = '<YOUR_AIMLAPI_KEY>'
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
                "content": "Weather today",
            },
        ],
        
        # insert your IP into this section
        extra_body={
            'ip': '192.44.242.19' # we used a random IP address from Stockholm
        }
    )
    print(response.choices[0].message.content)
    return response


# Run the function
complete_chat()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
import fetch from 'node-fetch';

// Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
const API_KEY = '<YOUR_AIMLAPI_KEY>';
const API_URL = 'https://api.aimlapi.com/v1/chat/completions';

async function completeChat() {
    const requestBody = {
        model: "bagoodex/bagoodex-search-v1",
        messages: [
            {
                role: "user",
                content: "Weather today"
            }
        ],
        extra_body: {
            ip: "192.44.242.19" // We used a random IP address from Stockholm
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        console.log(data.choices[0].message.content);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
completeChat();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response When Using IP Parameter</summary>

{% code overflow="wrap" %}
```
"According to the forecast, today's weather in Stockholm is partly cloudy with light winds. The temperature is expected to be around 6°C (43°F) with a gentle breeze. \n\nThe forecast also mentions that the weather will be sunny intervals and light winds throughout the day."
```
{% endcode %}

</details>

{% hint style="warning" %}
Keep in mind that the system caches the IP address for a period of two weeks. This means that after specifying an IP address once, any queries <mark style="background-color:orange;">**without an explicit location**</mark> will continue to return responses linked to Stockholm for the next two weeks, even if you don't include the IP address in subsequent requests. If you need to change the location, simply provide a new IP address in your next request.
{% endhint %}

If an IP address registered in one location is used while explicitly specifying a different location in the query, AI Search Engine will prioritize the location from the query:

<details>

<summary>Response when the IP parameter is used (from Stockholm), but the request also includes a different location (San Francisco)</summary>

{% code overflow="wrap" %}
```
"According to the weather forecast, today in San Francisco, there will be a strong cold front moving through the Bay Area from late morning into the afternoon, boosting wind speeds with gusts at around 45 mph midday and featuring high rain rates at times. This may lead to localized runoff issues. The high temperature is expected to be around 56F, with a chance of rain 100% and rainfall near a half an inch. \n\nYou can check the latest forecast and weather conditions on websites such as [https://weather.com/weather/today/l/USCA0987:1:US] or [https://www.accuweather.com/en/us/san-francisco/94103/weather-forecast/347629]."
```
{% endcode %}

</details>
