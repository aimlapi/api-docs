# Find Images

## Overview

This is a description of one of the six use cases for the `bagoodex/bagoodex-search-v1` model—retrieving internet images related to the requested subject.

<details>

<summary>An output example</summary>

Request: _"giant dragonflies"_

Response:

{% code overflow="wrap" %}
```json
[
  {
    "source": "",
    "original": "https://images.theconversation.com/files/234118/original/file-20180829-195319-1d4y13t.jpg?ixlib=rb-4.1.0&rect=0%2C7%2C1200%2C790&q=45&auto=format&w=926&fit=clip",
    "title": "Paleozoic era's giant dragonflies ...",
    "source_name": "The Conversation"
  },
  {
    "source": "",
    "original": "https://s3-us-west-1.amazonaws.com/scifindr/articles/image3s/000/002/727/large/meganeuropsis-eating-roach_lucas-lima_3x4.jpg?1470033295",
    "title": "huge dragonfly ...",
    "source_name": "Earth Archives"
  },
  {
    "source": "",
    "original": "https://s3-us-west-1.amazonaws.com/scifindr/articles/image2s/000/002/727/large/meganeuropsis_lucas-lima_4x3.jpg?1470033293",
    "title": "huge dragonfly ...",
    "source_name": "Earth Archives"
  },
  {
    "source": "",
    "original": "https://static.wikia.nocookie.net/prehistoricparkip/images/3/37/Meganeurid_bbc_prehistoric_.jpg/revision/latest?cb=20120906182204",
    "title": "Giant Dragonfly | Prehistoric Park Wiki ...",
    "source_name": "Prehistoric Park Wiki - Fandom"
  },
  {
    "source": "",
    "original": "https://i.redd.it/rig989kttmc71.jpg",
    "title": "This pretty large dragonfly we found ...",
    "source_name": "Reddit"
  },
  {
    "source": "",
    "original": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Meganeurites_gracilipes_restoration.webp",
    "title": "Meganisoptera - Wikipedia",
    "source_name": "Wikipedia"
  },
  {
    "source": "",
    "original": "https://upload.wikimedia.org/wikipedia/commons/3/31/Meganeuramodell.jpg",
    "title": "Ancient Dragonflies Were Huge, Larger ...",
    "source_name": "Roaring Earth -"
  },
  {
    "source": "",
    "original": "https://sites.wustl.edu/monh/files/2019/12/woman-and-meganeura-350x263.jpeg",
    "title": "Dragonflies and Damselflies of Missouri ...",
    "source_name": "Washington University"
  },
  {
    "source": "",
    "original": "https://static.sciencelearn.org.nz/images/images/000/004/172/original/INSECTS_ITV_Image_map_Aquatic_insects_Dragonfly.jpg?1674173331",
    "title": "Bush giant dragonfly — Science ...",
    "source_name": "Science Learning Hub"
  },
  {
    "source": "",
    "original": "http://www.stancsmith.com/uploads/4/8/9/6/48964465/meganeuropsis-giantdragonfly_orig.jpg",
    "title": "Ginormous Dragonfly - Stan C ...",
    "source_name": "Stan C. Smith"
  }
]
```
{% endcode %}

</details>

{% hint style="info" %}
The output will be the requested information retrieved from the internet—or empty brackets `[]` if nothing was found or if the entered query does not match the selected search type (for example, entering 'owtjtwjtwjtwojo' instead of a valid image-related subject).

Individual fields for which no information was found are also returned empty.
{% endhint %}

## How to make a call

First, you must first call the standard chat completion endpoint with your query. (Check how this call is made in the [example ](find-images.md#example)below.)

{% hint style="success" %}
Note that queries can include advanced search syntax:

* **Search for an exact match:** Enter a word or phrase using `\"` before and after it.\
  For example, `\"tallest building\"`.
* **Search for a specific site:** Enter `site:` in front of a site or domain. For example, `site:youtube.com cat videos`.
* **Exclude words from your search:** Enter `-` in front of a word that you want to leave out. For example, `jaguar speed -car`.
{% endhint %}

The chat completion endpoint returns an ID, which must then be passed as the sole input parameter `followup_id` to the `bagoodex/images` endpoint below.

## API Schema

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/bagoodex/images" method="get" %}
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
                "content": "giant dragonflies",
            },
        ],
    )
    
    # Extract the ID from the response
    gen_id = response.id  
    print(f"Generated ID: {gen_id}")
    
    # Call the Bagoodex endpoint with the generated ID
    get_images(gen_id)

def get_images(gen_id):
    params = {'followup_id': gen_id}
    headers = {'Authorization': f'Bearer {API_KEY}'}
    response = requests.get(f'{API_URL}/v1/bagoodex/images', headers=headers, params=params)
    
    print(response.json())

# Run the function
complete_chat()
```
{% endcode %}

<details>

<summary><strong>Model Response</strong></summary>

{% code overflow="wrap" %}
```json
[
  {
    "source": "",
    "original": "https://images.theconversation.com/files/234118/original/file-20180829-195319-1d4y13t.jpg?ixlib=rb-4.1.0&rect=0%2C7%2C1200%2C790&q=45&auto=format&w=926&fit=clip",
    "title": "Paleozoic era's giant dragonflies ...",
    "source_name": "The Conversation"
  },
  {
    "source": "",
    "original": "https://s3-us-west-1.amazonaws.com/scifindr/articles/image3s/000/002/727/large/meganeuropsis-eating-roach_lucas-lima_3x4.jpg?1470033295",
    "title": "huge dragonfly ...",
    "source_name": "Earth Archives"
  },
  {
    "source": "",
    "original": "https://s3-us-west-1.amazonaws.com/scifindr/articles/image2s/000/002/727/large/meganeuropsis_lucas-lima_4x3.jpg?1470033293",
    "title": "huge dragonfly ...",
    "source_name": "Earth Archives"
  },
  {
    "source": "",
    "original": "https://static.wikia.nocookie.net/prehistoricparkip/images/3/37/Meganeurid_bbc_prehistoric_.jpg/revision/latest?cb=20120906182204",
    "title": "Giant Dragonfly | Prehistoric Park Wiki ...",
    "source_name": "Prehistoric Park Wiki - Fandom"
  },
  {
    "source": "",
    "original": "https://i.redd.it/rig989kttmc71.jpg",
    "title": "This pretty large dragonfly we found ...",
    "source_name": "Reddit"
  },
  {
    "source": "",
    "original": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Meganeurites_gracilipes_restoration.webp",
    "title": "Meganisoptera - Wikipedia",
    "source_name": "Wikipedia"
  },
  {
    "source": "",
    "original": "https://upload.wikimedia.org/wikipedia/commons/3/31/Meganeuramodell.jpg",
    "title": "Ancient Dragonflies Were Huge, Larger ...",
    "source_name": "Roaring Earth -"
  },
  {
    "source": "",
    "original": "https://sites.wustl.edu/monh/files/2019/12/woman-and-meganeura-350x263.jpeg",
    "title": "Dragonflies and Damselflies of Missouri ...",
    "source_name": "Washington University"
  },
  {
    "source": "",
    "original": "https://static.sciencelearn.org.nz/images/images/000/004/172/original/INSECTS_ITV_Image_map_Aquatic_insects_Dragonfly.jpg?1674173331",
    "title": "Bush giant dragonfly — Science ...",
    "source_name": "Science Learning Hub"
  },
  {
    "source": "",
    "original": "http://www.stancsmith.com/uploads/4/8/9/6/48964465/meganeuropsis-giantdragonfly_orig.jpg",
    "title": "Ginormous Dragonfly - Stan C ...",
    "source_name": "Stan C. Smith"
  }
]
```
{% endcode %}

</details>
