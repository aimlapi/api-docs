# Code Snippets

## How to Use

### Presequences

Add the following to the `<head>` section of your site:

```html
<script async type="module" src="https://cdn.aimlapi.com/assets/snippets/bundle.js"></script>
<link rel="stylesheet" href="https://cdn.aimlapi.com/assets/snippets/bundle.css">
```

### Adding the Snippet

The script finds elements that match the selector `snippet[data-name]`. On your page, you should add snippets in the following way:

```html
<snippet data-name="open-ai.chat-completion"></snippet>
```

After page initialization, the script finds these snippets and attaches code to them.

### Snippet Templating

Snippets are built based on templates, and we currently use the Handlebars templating format.

For example, the template for OpenAI chat completion can look like the following:

```hbs
const api = new OpenAI({
  baseURL: '{{baseUrl}}',
  apiKey: '{{apiKey}}',
});
```

If any of the template values are defined by default within the snippet configuration, they will be set to the corresponding value.

You can overwrite any default templated value by setting the same template variable as a data attribute:

```html
<snippet data-name="open-ai.chat-completion" data-base-url="https://api.aimlapi.com/v2"></snippet>
```

This change updates the `baseUrl` template value to use the `v2` route, and the template will be generated with this updated route.

> **Warning**: Be careful if you wish to use a variable named `name`, as it is already used as a template name.
## Structure and Modification

Snippets are stored in the `/shared/snippets` directory. Each snippet is organized by group and name, alongside its default configuration and support for multiple languages.

### Structure Example

```yml
snippets:
  open-ai: # Name of the group
    chat-completion: # Name of the snippet
      - config.json   # Snippet configuration
      - js.hbs        # Snippet code in JavaScript using Handlebars template format
      - py.hbs        # Snippet code in Python using Handlebars template format
    chat-completion-code: # Another snippet under the same group
      - config.json
      - js.hbs
      - py.hbs
  together-ai:
    chat-completion-vision: # A snippet under a different group
      - config.json 
      - js.hbs
      - py.hbs
```
### Configuration Example

The configuration file is stored in the template folder and named `config.json`. This file contains information about the snippet and default values, which are used as template variables.

```json
{
  "title": "Create an embedding", // This title will be used as a title in the snippet header
  "docs": "https://docs.aimlapi.com/api-overview/text-models-llm/embeddings", // If a link exists, it will be shown in the snippet
  "payload": {
    "baseUrl": "https://api.aimlapi.com/v1",
    "apiKey": "<YOUR_API_KEY>"
  }
}
```

You can add any values to the `payload` section and use them in a way that Handlebars format supports. These values will be used as defaults and can be overwritten by data attributes.

> **Warning**: It's advisable to set template names in camel case notation because overwriting them with data attributes might be challenging. Data attributes automatically convert from kebab case (commonly used) to camel case.
## Adding the Snippets

### Check if the Group Already Exists

Snippet groups are based on the payload type being used. For example, if the chat completion format is used by multiple providers and a snippet uses the OpenAI SDK, then you should place this snippet in the same folder.

If the group does not exist, you can create a new group (folder) and name it appropriately.

### Creating a Snippet

1. **Create a New Folder:** Inside the necessary group, create a new folder with a readable snippet name in kebab case.

2. **Create Configuration File:** Inside this snippet folder, create the configuration file `config.json`. Although it can be empty initially, it's recommended to add `title`, `docs`, and any future templated values to the `payload` object as described earlier.

3. **Create Template Files:** Create one or more files named after programming languages or formats with `.hbs` extensions. Examples of valid names include:
   - `python.hbs`
   - `py.hbs`
   - `html.hbs`
   - `js.hbs`

   Invalid examples:
   - `code.hbs`
   - `js.txt`
   - `template`

4. **Write Snippet Code:** Inside these files, write your snippet code using Handlebars templating features.

Examples of written scripts can be found in the [/shared/snippets](/shared/snippets) directory.

> **Warning**: Ensure you use kebab-case notation for folders and files. Preferably use camel case notation for templating values to avoid conflicts when they are converted automatically from data attributes.
> 
## Deploying
After pushing changes to the `main` branch, they automatically propagate and are applied. In some cases, there might be a delay in seeing the results due to script caching by Cloudflare.