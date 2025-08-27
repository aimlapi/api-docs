function generateCodeSample(fetchedModels, modelName) {
  const model = fetchedModels.find((m) => m.name === modelName);
  if (!model) {
    return;
  }
  const additionalParamsMap = {
    chatAudio: {
      python: `,
        "modalities": ["text", "audio"],
        "audio": {"voice": "alloy", "format": "pcm16"}`,
      js: `,
        modalities: ['text', 'audio'],
        audio: { voice: 'alloy', format: 'pcm16' },`,
      curl: `,
    "modalities": ["text", "audio"], 
    "audio": {"voice": "alloy", "format": "pcm16"}`,
      http: `,
  "modalities": ["text", "audio"], 
  "audio": {"voice": "alloy", "format": "pcm16"}`,
    },
    textToImage: {
      python: `,
        "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."`,
      js: `,
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',`,
      curl: `,
    "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."`,
      http: `,
  "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."`,
    },
    imageToImage: {
      python: `,
        "prompt": "Add a crown to the T-rex's head.",
        "${
          modelName.includes('image-to-image') || modelName === 'triposr'
            ? 'image_url'
            : 'image'
        }": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"`,
      js: `,
      prompt: "Add a crown to the T-rex's head.",
      ${
        modelName.includes('image-to-image') || modelName === 'triposr'
          ? 'image_url'
          : 'image'
      }: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',`,
      curl: `,
    "prompt": "Add a crown to the T-rexs head.",
    "${
      modelName.includes('image-to-image') || modelName === 'triposr'
        ? 'image_url'
        : 'image'
    }": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"`,
      http: `,
  "prompt": "Add a crown to the T-rex's head.",
  "${
    modelName.includes('image-to-image') || modelName === 'triposr'
      ? 'image_url'
      : 'image'
  }": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"`,
    },
  };
  let additionalParamKey;
  if (modelName.includes('-audio-')) {
    additionalParamKey = 'chatAudio';
  } else if (model.category === 'image-models') {
    additionalParamKey = model.features?.includes('image-to-image')
      ? 'imageToImage'
      : 'textToImage';
  }
  if (model.category === 'text-models-llm') {
    return [
      {
        lang: 'JavaScript',
        source: `async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: '${modelName}',
      messages:[
          {
              role:'user',
              content: 'Hello'
          }
      ]${additionalParamKey ? additionalParamsMap[additionalParamKey].js : ''}
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();`,
      },
      {
        lang: 'Python',
        source: `import requests

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        "Content-Type":"application/json", 
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
    },
    json={
        "model":"${modelName}",
        "messages":[
            {
                "role":"user",
                "content":"Hello"
            }
        ]${
          additionalParamKey
            ? additionalParamsMap[additionalParamKey].python
            : ''
        }
    }
)

data = response.json()
print(data)`,
      },
      {
        lang: 'cURL',
        source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v1/chat/completions' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "model": "${modelName}",
    "messages": [
      {
        "role": "user",
        "content": "hi"
      }
    ]${additionalParamKey ? additionalParamsMap[additionalParamKey].curl : ''}
  }'`,
      },
      {
        lang: 'HTTP',
        source: `POST /v1/chat/completions HTTP/1.1
Host: api.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json
Accept: */*
Content-Length: 59

{
  "model": "${modelName}",
  "messages": [
    {
      "role": "user",
      "content": "hi"
    }
  ]${additionalParamKey ? additionalParamsMap[additionalParamKey].http : ''}
}`,
      },
    ];
  } else if (modelName === 'openai/gpt-image-1') {
    return [
      {
        lang: 'JavaScript',
        source: `import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function main() {
  const formData = new FormData();
  formData.append('model', 'openai/gpt-image-1');
  formData.append('prompt', "Add a crown to the T-rex's head.");
  formData.append('image', fs.createReadStream('<YOUR_IMAGE_PATH.png>'), {
    filename: '<IMAGE_NAME>',
    contentType: 'image/png',
  });

  const response = await fetch('https://api.aimlapi.com/v1/images/edits', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      ...formData.getHeaders(),
    },
    body: formData,
  });

  const data = await response.json();
  console.log(data);
}

main();`,
      },
      {
        lang: 'Python',
        source: `import requests
with open("<YOUR_IMAGE_PATH.png>", "rb") as file:
    files = {"image": ("<IMAGE_NAME>", file, "image/png")}
    response = requests.post(
        "https://api.aimlapi.com/v1/images/edits",
        headers={
            "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        },
        data={
            "model":"${modelName}",
            "prompt": "Add a crown to the T-rex's head."
        },
        files=files
    )

    data = response.json()
    print(data)`,
      },
      {
        lang: 'cURL',
        source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v1/images/edits' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --form "prompt=Add a crown to the T-rex's head." \\
  --form "image=@<YOUR_IMAGE_PATH.png>;type=image/png;filename=<IMAGE_NAME>"`,
      },
      {
        lang: 'HTTP',
        source: `POST /v1/images/edits HTTP/1.1
Host: api.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="model"

${modelName}
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="prompt"

Add a crown to the T-rex's head.
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="<IMAGE_NAME>"
Content-Type: image/png

(data)
------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
      },
    ];
  } else if (model.category === 'image-models') {
    return [
      {
        lang: 'JavaScript',
        source: `async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: '${modelName}'${
          additionalParamKey ? additionalParamsMap[additionalParamKey].js : ''
        }
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();`,
      },
      {
        lang: 'Python',
        source: `import requests

response = requests.post(
    "https://api.aimlapi.com/v1/images/generations",
    headers={
        "Content-Type":"application/json", 
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
    },
    json={
        "model":"${modelName}"${
          additionalParamKey
            ? additionalParamsMap[additionalParamKey].python
            : ''
        }
    }
)

data = response.json()
print(data)`,
      },
      {
        lang: 'cURL',
        source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v1/images/generations' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "model": "${modelName}"${
          additionalParamKey ? additionalParamsMap[additionalParamKey].curl : ''
        }
  }'`,
      },
      {
        lang: 'HTTP',
        source: `POST /v1/images/generations HTTP/1.1
Host: api.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json
Accept: */*

{
  "model": "${modelName}"${
          additionalParamKey ? additionalParamsMap[additionalParamKey].http : ''
        }
}`,
      },
    ];
  }
}

module.exports = generateCodeSample;
