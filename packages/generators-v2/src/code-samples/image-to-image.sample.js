export const imageToImageSample = (options, schema) => {
  const properties =
    schema?.paths?.['/v1/images/generations']?.post?.requestBody?.content?.[
      'application/json'
    ]?.schema?.properties;

  const imageParamName = properties?.image
    ? 'image'
    : properties?.image_url
    ? 'image_url'
    : 'image_urls';

  const prompt =
    imageParamName === 'image_urls'
      ? 'Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.'
      : "Add a crown to the T-rex’s head.";

  const imageValue =
    imageParamName === 'image_urls'
      ? [
          'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',
          'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg',
        ]
      : 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png';

  const jsonBody = JSON.stringify(
    {
      model: options.name,
      prompt,
      [imageParamName]: imageValue,
    },
    null,
    2
  );
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
    "https://api.aimlapi.com/v1/images/generations",
    headers={
        "Content-Type":"application/json", 
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
    },
    json=${jsonBody.replace(/\n/g, '\n    ')}
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
  --data '${jsonBody.replace(/'/g, "\\'").replace(/\n/g, '\n    ')}'`,
    },
    {
      lang: 'HTTP',
      source: `POST /v1/images/generations HTTP/1.1
Host: api.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json
Accept: */*

${jsonBody}`,
    },
  ];
};
