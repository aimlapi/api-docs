# Find the Weather

## Overview

This is a description of one of the six use cases for the `bagoodex/bagoodex-search-v1` model—retrieving a weather forecast for the requested location based on information from the internet.

Provides only an 8-day weather forecast (daily and hourly).

<details>

<summary>An output example (a fragment)</summary>

{% code overflow="wrap" %}
```json
{
  "type": "weather_result",
  "temperature": "77",
  "unit": "Fahrenheit",
  "precipitation": "10%",
  "humidity": "61%",
  "wind": "6 mph",
  "location": "Delhi, India",
  "date": "Friday",
  "weather": "Partly cloudy",
  "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdc545ed9c61f19c827f0c61fdfb6829e6.png",
  "forecast": [
    {
      "day": "Thursday",
      "temperature": {
        "high": "79",
        "low": "53"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea29a6d5d11c931cb1c6b8961c5a701ac4a.png",
      "weather": "Light rain",
      "humidity": "94%",
      "precipitation": "45%",
      "wind": "8 mph"
    },
    {
      "day": "Friday",
      "temperature": {
        "high": "77",
        "low": "53"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea2db13b12386fa4894bed175a78b1a73d4.png",
      "weather": "Partly cloudy",
      "humidity": "61%",
      "precipitation": "10%",
      "wind": "6 mph"
    },
    {
      "day": "Saturday",
      "temperature": {
        "high": "75",
        "low": "52"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea237f4cdb1738823c11db9661a9008b26b.png",
      "weather": "Partly cloudy",
      "humidity": "61%",
      "precipitation": "10%",
      "wind": "8 mph"
    },
    {
      "day": "Sunday",
      "temperature": {
        "high": "78",
        "low": "51"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea231f7bed0f82344fc6f02aff2997c4fbf.png",
      "weather": "Sunny",
      "humidity": "57%",
      "precipitation": "0%",
      "wind": "7 mph"
    },
    {
      "day": "Monday",
      "temperature": {
        "high": "81",
        "low": "54"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea2487fa0071c8c05c5d8cab80602121baf.png",
      "weather": "Mostly sunny",
      "humidity": "53%",
      "precipitation": "0%",
      "wind": "6 mph"
    },
    {
      "day": "Tuesday",
      "temperature": {
        "high": "83",
        "low": "58"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea2672ffbd0b88fdead232eb139fe4be010.png",
      "weather": "Partly cloudy",
      "humidity": "52%",
      "precipitation": "10%",
      "wind": "7 mph"
    },
    {
      "day": "Wednesday",
      "temperature": {
        "high": "89",
        "low": "64"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea24e9a609cde5258c4721caaca9f044f2b.png",
      "weather": "Mostly cloudy",
      "humidity": "40%",
      "precipitation": "10%",
      "wind": "5 mph"
    },
    {
      "day": "Thursday",
      "temperature": {
        "high": "87",
        "low": "65"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea2bf3a11e7710bbb1110889fa0b00f8ffd.png",
      "weather": "Cloudy",
      "humidity": "46%",
      "precipitation": "10%",
      "wind": "7 mph"
    }
  ],
  "hourly_forecast": [
    {
      "time": "Thursday 9:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "62",
      "precipitation": "5%",
      "humidity": "94%",
      "wind": "8 mph"
    },
    {
      "time": "Thursday 10:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "61",
      "precipitation": "15%",
      "humidity": "96%",
      "wind": "8 mph"
    },
    {
      "time": "Thursday 11:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png",
      "weather": "Clear with periodic clouds",
      "temperature": "60",
      "precipitation": "15%",
      "humidity": "95%",
      "wind": "8 mph"
    },
    {
      "time": "Friday 12:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png",
      "weather": "Clear with periodic clouds",
      "temperature": "59",
      "precipitation": "0%",
      "humidity": "95%",
      "wind": "7 mph"
    },
    {
      "time": "Friday 1:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png",
      "weather": "Clear with periodic clouds",
      "temperature": "58",
      "precipitation": "0%",
      "humidity": "96%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 2:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "57",
      "precipitation": "0%",
      "humidity": "98%",
      "wind": "5 mph"
    },
    {
      "time": "Friday 3:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "56",
      "precipitation": "0%",
      "humidity": "97%",
      "wind": "5 mph"
    },
    {
      "time": "Friday 4:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "55",
      "precipitation": "0%",
      "humidity": "96%",
      "wind": "4 mph"
    },
    {
      "time": "Friday 5:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "54",
      "precipitation": "0%",
      "humidity": "96%",
      "wind": "4 mph"
    },
    {
      "time": "Friday 6:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "53",
      "precipitation": "0%",
      "humidity": "100%",
      "wind": "4 mph"
    },
    {
      "time": "Friday 7:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "54",
      "precipitation": "0%",
      "humidity": "99%",
      "wind": "3 mph"
    },
    {
      "time": "Friday 8:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "56",
      "precipitation": "0%",
      "humidity": "99%",
      "wind": "2 mph"
    },
    {
      "time": "Friday 9:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "61",
      "precipitation": "0%",
      "humidity": "86%",
      "wind": "2 mph"
    },
    {
      "time": "Friday 10:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "67",
      "precipitation": "0%",
      "humidity": "71%",
      "wind": "2 mph"
    },
    {
      "time": "Friday 11:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "73",
      "precipitation": "0%",
      "humidity": "57%",
      "wind": "2 mph"
    },
    {
      "time": "Friday 12:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "76",
      "precipitation": "0%",
      "humidity": "47%",
      "wind": "3 mph"
    },
    {
      "time": "Friday 1:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "77",
      "precipitation": "5%",
      "humidity": "46%",
      "wind": "3 mph"
    },
    {
      "time": "Friday 2:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Mostly cloudy",
      "temperature": "77",
      "precipitation": "10%",
      "humidity": "46%",
      "wind": "4 mph"
    },
    {
      "time": "Friday 3:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "77",
      "precipitation": "5%",
      "humidity": "46%",
      "wind": "5 mph"
    },
    {
      "time": "Friday 4:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "76",
      "precipitation": "5%",
      "humidity": "47%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 5:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Mostly sunny",
      "temperature": "75",
      "precipitation": "0%",
      "humidity": "52%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 6:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "71",
      "precipitation": "5%",
      "humidity": "60%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 7:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Mostly cloudy",
      "temperature": "67",
      "precipitation": "10%",
      "humidity": "72%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 8:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      "weather": "Cloudy",
      "temperature": "63",
      "precipitation": "10%",
      "humidity": "84%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 9:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      "weather": "Cloudy",
      "temperature": "61",
      "precipitation": "10%",
      "humidity": "91%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 10:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      "weather": "Cloudy",
      "temperature": "60",
      "precipitation": "10%",
      "humidity": "95%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 11:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      "weather": "Cloudy",
      "temperature": "59",
      "precipitation": "10%",
      "humidity": "96%",
      "wind": "6 mph"
    },
```
{% endcode %}

</details>

{% hint style="info" %}
The output will be the requested information retrieved from the internet—or empty brackets `{}` if nothing was found or if the entered query does not match the selected search type (for example, querying 'How to get to Mars?' instead of requesting a weather forecast for a specific location).
{% endhint %}

## How to make a call

First, you must first call the standard chat completion endpoint with your query. (Check how this call is made in the [example ](find-the-weather.md#example)below.)

{% hint style="success" %}
Note that queries can include advanced search syntax:

* **Search for an exact match:** Enter a word or phrase using `\"` before and after it.\
  For example, `\"tallest building\"`.
* **Search for a specific site:** Enter `site:` in front of a site or domain. For example, `site:youtube.com cat videos`.
* **Exclude words from your search:** Enter `-` in front of a word that you want to leave out. For example, `jaguar speed -car`.
{% endhint %}

The chat completion endpoint returns an ID, which must then be passed as the sole input parameter `followup_id` to the `bagoodex/weather` endpoint below.

## API Schema

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/bagoodex/weather" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

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
                "content": "Weather in Delhi tomorrow",
            },
        ],
    )
    
    # Extract the ID from the response
    gen_id = response.id  
    print(f"Generated ID: {gen_id}")
    
    # Call the Bagoodex endpoint with the generated ID
    get_weather(gen_id)

def get_weather(gen_id):
    params = {'followup_id': gen_id}
    headers = {'Authorization': f'Bearer {API_KEY}'}
    response = requests.get(f'{API_URL}/v1/bagoodex/weather', headers=headers, params=params)
    
    print(response.json())

# Run the function
complete_chat()
```
{% endcode %}

**Model Response**:

<details>

<summary>An output fragment</summary>

{% code overflow="wrap" %}
```json
{
  "type": "weather_result",
  "temperature": "77",
  "unit": "Fahrenheit",
  "precipitation": "10%",
  "humidity": "61%",
  "wind": "6 mph",
  "location": "Delhi, India",
  "date": "Friday",
  "weather": "Partly cloudy",
  "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdc545ed9c61f19c827f0c61fdfb6829e6.png",
  "forecast": [
    {
      "day": "Thursday",
      "temperature": {
        "high": "79",
        "low": "53"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea29a6d5d11c931cb1c6b8961c5a701ac4a.png",
      "weather": "Light rain",
      "humidity": "94%",
      "precipitation": "45%",
      "wind": "8 mph"
    },
    {
      "day": "Friday",
      "temperature": {
        "high": "77",
        "low": "53"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea2db13b12386fa4894bed175a78b1a73d4.png",
      "weather": "Partly cloudy",
      "humidity": "61%",
      "precipitation": "10%",
      "wind": "6 mph"
    },
    {
      "day": "Saturday",
      "temperature": {
        "high": "75",
        "low": "52"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea237f4cdb1738823c11db9661a9008b26b.png",
      "weather": "Partly cloudy",
      "humidity": "61%",
      "precipitation": "10%",
      "wind": "8 mph"
    },
    {
      "day": "Sunday",
      "temperature": {
        "high": "78",
        "low": "51"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea231f7bed0f82344fc6f02aff2997c4fbf.png",
      "weather": "Sunny",
      "humidity": "57%",
      "precipitation": "0%",
      "wind": "7 mph"
    },
    {
      "day": "Monday",
      "temperature": {
        "high": "81",
        "low": "54"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea2487fa0071c8c05c5d8cab80602121baf.png",
      "weather": "Mostly sunny",
      "humidity": "53%",
      "precipitation": "0%",
      "wind": "6 mph"
    },
    {
      "day": "Tuesday",
      "temperature": {
        "high": "83",
        "low": "58"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea2672ffbd0b88fdead232eb139fe4be010.png",
      "weather": "Partly cloudy",
      "humidity": "52%",
      "precipitation": "10%",
      "wind": "7 mph"
    },
    {
      "day": "Wednesday",
      "temperature": {
        "high": "89",
        "low": "64"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea24e9a609cde5258c4721caaca9f044f2b.png",
      "weather": "Mostly cloudy",
      "humidity": "40%",
      "precipitation": "10%",
      "wind": "5 mph"
    },
    {
      "day": "Thursday",
      "temperature": {
        "high": "87",
        "low": "65"
      },
      "thumbnail": "https://serpapi.com/searches/67b753af5f068c54e9730a02/images/bfaadf278c5af1fdfcd2f19c8fed7ea2bf3a11e7710bbb1110889fa0b00f8ffd.png",
      "weather": "Cloudy",
      "humidity": "46%",
      "precipitation": "10%",
      "wind": "7 mph"
    }
  ],
  "hourly_forecast": [
    {
      "time": "Thursday 9:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "62",
      "precipitation": "5%",
      "humidity": "94%",
      "wind": "8 mph"
    },
    {
      "time": "Thursday 10:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "61",
      "precipitation": "15%",
      "humidity": "96%",
      "wind": "8 mph"
    },
    {
      "time": "Thursday 11:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png",
      "weather": "Clear with periodic clouds",
      "temperature": "60",
      "precipitation": "15%",
      "humidity": "95%",
      "wind": "8 mph"
    },
    {
      "time": "Friday 12:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png",
      "weather": "Clear with periodic clouds",
      "temperature": "59",
      "precipitation": "0%",
      "humidity": "95%",
      "wind": "7 mph"
    },
    {
      "time": "Friday 1:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png",
      "weather": "Clear with periodic clouds",
      "temperature": "58",
      "precipitation": "0%",
      "humidity": "96%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 2:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "57",
      "precipitation": "0%",
      "humidity": "98%",
      "wind": "5 mph"
    },
    {
      "time": "Friday 3:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "56",
      "precipitation": "0%",
      "humidity": "97%",
      "wind": "5 mph"
    },
    {
      "time": "Friday 4:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "55",
      "precipitation": "0%",
      "humidity": "96%",
      "wind": "4 mph"
    },
    {
      "time": "Friday 5:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "54",
      "precipitation": "0%",
      "humidity": "96%",
      "wind": "4 mph"
    },
    {
      "time": "Friday 6:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Clear",
      "temperature": "53",
      "precipitation": "0%",
      "humidity": "100%",
      "wind": "4 mph"
    },
    {
      "time": "Friday 7:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "54",
      "precipitation": "0%",
      "humidity": "99%",
      "wind": "3 mph"
    },
    {
      "time": "Friday 8:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "56",
      "precipitation": "0%",
      "humidity": "99%",
      "wind": "2 mph"
    },
    {
      "time": "Friday 9:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "61",
      "precipitation": "0%",
      "humidity": "86%",
      "wind": "2 mph"
    },
    {
      "time": "Friday 10:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "67",
      "precipitation": "0%",
      "humidity": "71%",
      "wind": "2 mph"
    },
    {
      "time": "Friday 11:00 AM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      "weather": "Sunny",
      "temperature": "73",
      "precipitation": "0%",
      "humidity": "57%",
      "wind": "2 mph"
    },
    {
      "time": "Friday 12:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "76",
      "precipitation": "0%",
      "humidity": "47%",
      "wind": "3 mph"
    },
    {
      "time": "Friday 1:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "77",
      "precipitation": "5%",
      "humidity": "46%",
      "wind": "3 mph"
    },
    {
      "time": "Friday 2:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Mostly cloudy",
      "temperature": "77",
      "precipitation": "10%",
      "humidity": "46%",
      "wind": "4 mph"
    },
    {
      "time": "Friday 3:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "77",
      "precipitation": "5%",
      "humidity": "46%",
      "wind": "5 mph"
    },
    {
      "time": "Friday 4:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "76",
      "precipitation": "5%",
      "humidity": "47%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 5:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Mostly sunny",
      "temperature": "75",
      "precipitation": "0%",
      "humidity": "52%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 6:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Partly cloudy",
      "temperature": "71",
      "precipitation": "5%",
      "humidity": "60%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 7:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      "weather": "Mostly cloudy",
      "temperature": "67",
      "precipitation": "10%",
      "humidity": "72%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 8:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      "weather": "Cloudy",
      "temperature": "63",
      "precipitation": "10%",
      "humidity": "84%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 9:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      "weather": "Cloudy",
      "temperature": "61",
      "precipitation": "10%",
      "humidity": "91%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 10:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      "weather": "Cloudy",
      "temperature": "60",
      "precipitation": "10%",
      "humidity": "95%",
      "wind": "6 mph"
    },
    {
      "time": "Friday 11:00 PM",
      "thumbnail": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      "weather": "Cloudy",
      "temperature": "59",
      "precipitation": "10%",
      "humidity": "96%",
      "wind": "6 mph"
    },
```
{% endcode %}

</details>
