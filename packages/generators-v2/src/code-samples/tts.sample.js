export const ttsSample = (options, fullSchema) => {
  const params = {
    model: options.name,
  };
  const schema =
    fullSchema?.paths?.['/v1/tts']?.post?.requestBody?.content?.[
      'application/json'
    ]?.schema;
  const requiredModelParams = schema?.required || [];
  if (requiredModelParams?.includes('text')) {
    Object.assign(params, {
      text: 'Hello',
    });
  } else if (requiredModelParams?.includes('script')) {
    Object.assign(params, {
      script: 'Hello',
    });
  }
  const jsonBody = JSON.stringify(params, null, 2);

  return [
    {
      lang: 'cURL',
      source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v1/tts' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '${jsonBody.replace(/'/g, "\\'").replace(/\n/g, '\n    ')}'`,
    },
    {
      lang: 'JavaScript',
      source: `async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/tts', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(${jsonBody.replace(/\n/g, '\n    ')}),
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
    "https://api.aimlapi.com/v1/tts",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    },
    json=${jsonBody.replace(/\n/g, '\n    ')}
)

data = response.json()
print(data)`,
    },
  ];
};
