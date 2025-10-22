export const textToImageSample = (options) => [
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
      model: '${options.name}',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
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
        "model":"${options.name}",
        "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
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
    "model": "${options.name}",
    "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
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
  "model": "${options.name}",
  "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
}`,
  },
];
