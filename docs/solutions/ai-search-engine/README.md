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
**As a general** [**chat completion**](../../capabilities/completion-or-chat-models.md) **solution** (but searching on the internet): enter a query in the prompt and receive an internet-sourced answer, similar to asking a question on a search engine through a browser. See the API Schema below or check how this call is made in the Python example on the bottom of this page.
{% endstep %}
{% endstepper %}

### API Schema

{% openapi src="../../api-references/web-search-models/bagoodex/bagoodex-search-v1.json" path="/v1/chat/completions" method="post" %}
[bagoodex-search-v1.json](../../api-references/web-search-models/bagoodex/bagoodex-search-v1.json)
{% endopenapi %}

## Example #1

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

## Example #2: Using the IP Parameter for Personalized Model Output

When using regular search engines in browsers, we can simply ask, 'Weather today' without specifying our location. In this case, the search engine automatically uses your IP address to determine your location and provide a more relevant response. The AI Search Engine also supports IP-based personalization.

In the example below, the query does not specify a city, but since the request includes an IP address registered in Stockholm, the system automatically adjusts, and the response will contain today's weather forecast for that city.

{% hint style="warning" %}
Note that when making a request via Python, this parameter should be included in the extra\_body parameter (see examples below).
{% endhint %}

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

<details>

<summary>Response When Using IP Parameter</summary>

{% code overflow="wrap" %}
```
"According to the forecast, today's weather in Stockholm is partly cloudy with light winds. The temperature is expected to be around 6°C (43°F) with a gentle breeze. \n\nThe forecast also mentions that the weather will be sunny intervals and light winds throughout the day."
```
{% endcode %}

</details>

{% hint style="warning" %}
Keep in mind that the system caches the IP address for a period of two weeks. This means that after specifying an IP address once, any queries without an explicit location will continue to return responses linked to Stockholm for the next two weeks, even if you don't include the IP address in subsequent requests. If you need to change the location, simply provide a new IP address in your next request.
{% endhint %}

<details>

<summary>Response when the IP parameter is used (from Stockholm), but the request also includes a different location (San Francisco)</summary>

{% code overflow="wrap" %}
```
"According to the weather forecast, today in San Francisco, there will be a strong cold front moving through the Bay Area from late morning into the afternoon, boosting wind speeds with gusts at around 45 mph midday and featuring high rain rates at times. This may lead to localized runoff issues. The high temperature is expected to be around 56F, with a chance of rain 100% and rainfall near a half an inch. \n\nYou can check the latest forecast and weather conditions on websites such as [https://weather.com/weather/today/l/USCA0987:1:US] or [https://www.accuweather.com/en/us/san-francisco/94103/weather-forecast/347629]."
```
{% endcode %}

</details>

