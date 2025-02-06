---
icon: brackets-curly
---

# Upload Audio

## API Reference

{% swagger src="https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27" path="/v2/generate/audio/minimax/upload" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27](https://api.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27)
{% endswagger %}

## Examples

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// npm install node-fetch form-data
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";

const upload = async () => {
  const url = "https://api.aimlapi.com/v2/generate/audio/minimax/upload";
  const fileName = "filename.mp3";
  const filePath = path.resolve(fileName); // Path to your file

  const purpose = "song"; // Possible values: "song", "voice", "instrumental"

  const formData = new FormData();
  formData.append("purpose", purpose);
  formData.append("file", fs.createReadStream(filePath), {
    filename: fileName,
    contentType: "audio/mpeg",
  });

  const apiKey = "<YOUR_API_KEY>"; 

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Upload successful:", data);
    } else {
      console.error("Upload failed:", response.status, await response.text());
    }
  } catch (error) {
    console.error("Error during upload:", error.message);
  }
}

upload();

```
{% endtab %}

{% tab title="Python" %}
```python
import requests

def upload():
    api_key = '<YOUR_API_KEY>'
    url = 'https://api.aimlapi.com/v2/generate/audio/minimax/upload'
    file_name = 'file_name.mp3'
    # Your path to the song
    file_path = 'file_path.mp3'

    purpose = 'song' # Possible values: 'song', 'voice', 'instrumental'

    payload = {
        'purpose': purpose,
    }
    files = [
        ('file', (file_name, open(file_path, 'rb'), 'audio/mpeg'))
    ]
    headers = {
        'authorization': 'Bearer ' + api_key,
    }

    response = requests.request('POST', url, headers=headers, data=payload, files=files)
    print(response.json())

if __name__ == '__main__':
    upload()

```
{% endtab %}
{% endtabs %}

### Upload file with link

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// npm install node-fetch form-data
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";

const upload = async () => {
  const url = "https://api.aimlapi.com/v2/generate/audio/minimax/upload";
  const audioUrl = "url_to_file.mp3";  // Replace with the actual URL of the file
  const fileName = "filename.mp3";  // The name you want to give to the uploaded file
  const purpose = "song"; // Possible values: "song", "voice", "instrumental"

  const apiKey = "<YOUR_API_KEY>";  // Replace with your actual API key

  try {
  // Download the file from the URL
  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch file from URL: ${audioUrl}`);
  }
  
  const fileBuffer = await response.arrayBuffer(); // Get the file as a buffer

  // Upload the file to the server using FormData
  const formData = new FormData();
  formData.append("purpose", purpose);
  formData.append("file", Buffer.from(fileBuffer), {
    filename: fileName,
    contentType: "audio/mpeg",
  });

  const uploadResponse = await fetch(url, {
    method: "POST",
    headers: {
    Authorization: `Bearer ${apiKey}`,
    ...formData.getHeaders(),
    },
    body: formData,
  });

  if (uploadResponse.ok) {
    const data = await uploadResponse.json();
    console.log("Upload successful:", data);
  } else {
    console.error("Upload failed:", uploadResponse.status, await uploadResponse.text());
  }
  } catch (error) {
  console.error("Error during upload:", error);
  }
};

upload();

```
{% endtab %}

{% tab title="Python" %}
```python
import requests

def upload():
    url = 'https://api.aimlapi.com/v2/generate/audio/minimax/upload'
    audio_url = 'url_to_file.mp3'  # Replace with the actual URL of the file
    file_name = 'filename.mp3'  # The name you want to give to the uploaded file
    purpose = 'song'  # Possible values: 'song', 'voice', 'instrumental'

    api_key = '<YOUR_API_KEY>'  # Replace with your actual API key

    try:
        # Step 1: Download the file from the URL
        response = requests.get(audio_url)
        if response.status_code != 200:
            print(f'Failed to download file from URL: {audio_url}')
            return
        
        payload = {
            'purpose': purpose,
        }
        # Step 2: Upload the file to the server
        files = {
            'file': (file_name, response.content, 'audio/mpeg')  # File content as bytes
        }
        headers = {
            'Authorization': f'Bearer {api_key}'
        }

        upload_response = requests.post(url, headers=headers, files=files, data=payload)

        if upload_response.status_code == 200:
            data = upload_response.json()
            print('Upload successful:', data)
        else:
            print('Upload failed:', upload_response.status_code, upload_response.text)
    
    except requests.exceptions.RequestException as error:
        print(f'Error during upload: {error}')

if __name__ == '__main__':
    upload()

```
{% endtab %}
{% endtabs %}
