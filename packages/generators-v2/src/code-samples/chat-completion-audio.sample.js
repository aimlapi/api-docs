export const chatCompletionAudioSample = (options) => [
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
      model: '${options.name}',
      messages:[
          {
              role:'user',
              content: 'Hello'
          }
      ],
      modalities: ['text', 'audio'],
      audio: { voice: 'alloy', format: 'pcm16' },
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
        "model":"${options.name}",
        "messages":[
            {
                "role":"user",
                "content":"Hello"
            }
        ],
        "modalities": ["text", "audio"],
        "audio": {"voice": "alloy", "format": "pcm16"}
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
    "model": "${options.name}",
    "messages": [
      {
        "role": "user",
        "content": "hi"
      }
    ],
    "modalities": ["text", "audio"], 
    "audio": {"voice": "alloy", "format": "pcm16"}
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
  "model": "${options.name}",
  "messages": [
    {
      "role": "user",
      "content": "hi"
    }
  ],
  "modalities": ["text", "audio"], 
  "audio": {"voice": "alloy", "format": "pcm16"}
}`,
  },
];
