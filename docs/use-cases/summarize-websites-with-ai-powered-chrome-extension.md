---
icon: arrows-to-circle
---

# Summarize Websites with AI-Powered Chrome Extension

## Intro

In this tutorial, we’ll show how to build a Chrome extension from scratch using an AI/ML API. You’ll set up the development environment, install the necessary tools, and implement key components such as:

* `manifest.json`: Contains essential metadata about your extension.
* `script.js`: Defines the extension's functionality and behavior.
* `style.css`: Adds styling for a polished look.
* `popup.html`: Provides the user interface for your extension.
* `popup.js`: Handles interactions and functionality within the popup interface.

Throughout the tutorial, we’ll highlight best practices for building Chrome extensions and managing user interactions effectively. By the end, you’ll have a strong foundation for creating Chrome extensions and the skills to develop your own AI-powered solutions.

## Getting Started with Chrome Extensions

Building a Chrome extension requires understanding its structure, permissions, and interaction with web pages. In this section, we’ll set up our development environment and create the foundational files necessary to start building an extension.

### Setting Up Your Development Environment

Before diving into coding, ensure you have the following prerequisites:

* _Chrome Browser_: This is where we’ll load, test, and debug our extension.
* _Text Editor or IDE_: Tools like Visual Studio Code, Sublime Text, or Atom are excellent choices for editing code.
* _Basic Knowledge of HTML, CSS, and JavaScript_: Familiarity with these core web technologies is essential for building Chrome extensions.

### Creating the Project Structure

A minimal Chrome extension requires at least three key files:

1. _manifest.json_: Contains metadata and configuration for the extension, such as its name, version, permissions, and the scripts it uses.
2. _script.js_: Includes the JavaScript code that defines the extension's functionality.
3. _style.css_: Provides styling for any user interface elements in the extension.

As we progress through this tutorial, we will also create:

* _popup.html_: A file that defines the structure of the extension's popup interface.
* _popup.js_: A script to manage the interactivity and logic of the popup.

### Setting Up the Project

1. Create a new directory for your extension project.
2. Inside this directory, create the following three files:some text
   * _manifest.json_
   * _script.js_
   * _style.cs&#x73;_&#x200D;

Once your project structure is in place, you’ll be ready to begin writing the code for your extension.

### **Understanding manifest.json**

The _manifest.json_ file is the core of your Chrome extension. It provides the browser with essential information about your extension, including its purpose, functionality, and the permissions it requires. Let’s explore how to configure this file effectively.

#### **Key Elements in&#x20;**_**manifest.json**_**&#x20;for the "Summarize" Extension**

The following configuration demonstrates the essential and additional fields in the _manifest.json_ file for the "Summarize" Chrome extension.

#### **Essential Fields**

* _manifest\_version_: Specifies the version of the manifest file format. This extension uses version 3, the latest standard for Chrome extensions.
* _name_: The name of the extension, "Summarize", indicates its purpose.
* _version_: The initial release version is "1.0", following semantic versioning.

#### **Additional Metadata and Permissions**

* _description_: A concise summary of the extension’s functionality: "Write a summary of a website or text".
* _host\_permissions_: The wildcard \*://\*.aimlapi.com/\* grants access to all subdomains of aimlapi.com, enabling integration with the AI/ML API.
* _permissions_: Includes "activeTab", allowing the extension to interact with the content of the current active browser tab.
* _content\_scripts_: Defines scripts and styles to be injected into web pages:some text
  * _matches_: Targets all URLs with _\<all\_urls>_.
  * _js_: Loads scripts.js, which defines the extension’s behavior on web pages.
  * _css_: Loads styles.css for any necessary styling.
* _icons_: Specifies paths to the extension’s icons in three sizes:some text
  * 16x16: Small icon for toolbars and buttons.
  * 48x48: Default-sized icon.
  * 128x128: Large icon for extension details in the Chrome Web Store.

### Generating an Icon

You can create an icon for your Chrome extension using tools like ChatGPT or AI/ML platforms. Here’s the prompt I used to generate an icon:

```markdown
Generate a black-and-white icon for my 'Summarize' Chrome extension. 
This extension enables users to highlight specific text on a website 
or summarize the entire page. It’s an AI-powered tool. 
The icon should feature a solid white background.
```

Download the icon and rename it appropriately. You can use a single icon for different sizes.

### Developing scripts.js

The _scripts.js_ file contains the logic that defines your extension's behavior. In this section, we’ll outline the key functionalities your script needs to implement.

#### **Variables and Initialization**

Begin by setting up the essential variables:

* `AIML_API_KEY`: Obtain an API key from the AI/ML API platform to authenticate your requests.
* `MODEL`: Define which AI/ML model you want to use for processing the text.
* `overlay`: A variable to manage the overlay that will display the summary or other relevant information on the page.

```javascript
const getSummary = async text => {
    try {
        const headers = {
            Authorization: `Bearer ${AIML_API_KEY}`,
            'Content-Type': 'application/json',
        };
        const jsonData = {
            model: MODEL,
            messages: [
                {
                    role: 'assistant',
                    content:
                        `You are an AI assistant who 
                        provides summaries for long texts. 
                        You are using HTML tags to format 
                        your response.`,
                },
                {
                    role: 'user',
                    content: 
                    	`Please summarize the following 
                        text: ${text}`,
                },
            ],
        };
        const response = await fetch(
            'https://api.aimlapi.com/v1/chat/completions',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(jsonData),
            }
        );
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
```

In the message, we specified that the model should send HTML in the response. This is crucial for preserving the original markup and formatting, ensuring that the content is displayed correctly on the web page.

#### **Creating the Summary Overlay**

Let’s create a function to generate the overlay. This function will add the overlay and a button to the DOM. Additionally, we’ll attach a click event listener to the button, which will trigger the `getSummary` function and display the response to the user.

```javascript
const createSummaryOverlay = text => {
    overlay = document.createElement('div');
    overlay.id = 'summary-overlay';
    overlay.style.display = 'none';

    const summaryButton = document.createElement('button');
    summaryButton.id = 'summary-button';
    summaryButton.textContent = 'Summarize';

    overlay.appendChild(summaryButton);
    document.body.appendChild(overlay);

    summaryButton.addEventListener('click', async () => {
        summaryButton.textContent = 'Summarizing...';
        summaryButton.disabled = true;
        try {
            const summary = await getSummary(text);
            summaryButton.textContent = 'Summary';
            const summaryContainer = document.createElement('div');
            summaryContainer.innerHTML = summary;
            overlay.appendChild(summaryContainer);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    });
};
```

The next function is `showOverlay`, which is responsible for displaying the overlay in the appropriate location on the page.

```javascript
const showOverlay = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    overlay.style.display = 'flex';
    overlay.style.top = `${window.scrollY + rect.top - 50}px`;
    overlay.style.left = `${rect.left}px`;
};

document.addEventListener('mouseup', event => {
    if (event.target.closest('#summary-overlay')) return;

    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 200 && selectedText.length < 7000) {
        if (!overlay) createSummaryOverlay();

        showOverlay();
    } else if (overlay) {
        document.body.removeChild(overlay);
        overlay = null;
    }
});
```

#### **Full code:**

<details>

<summary>Expand</summary>

```javascript
const AIML_API_KEY = 'Your API KEY'; // Replace with your AIML_API_KEY
const MODEL = 'Your model';

let overlay = null;

const getSummary = async text => {
    try {
        const headers = {
            Authorization: `Bearer ${AIML_API_KEY}`,
            'Content-Type': 'application/json',
        };
        const jsonData = {
            model: MODEL,
            messages: [
                {
                    role: 'assistant',
                    content:
                        `You are an AI assistant who 
                        provides summaries for long texts. 
                        You are using HTML tags to format 
                        your response.`,
                },
                {
                    role: 'user',
                    content: 
                    	`Please summarize the following 
                        text: ${text}`,
                },
            ],
        };
        const response = await fetch(
            'https://api.aimlapi.com/v1/chat/completions',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(jsonData),
            }
        );
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const createSummaryOverlay = text => {
    overlay = document.createElement('div');
    overlay.id = 'summary-overlay';
    overlay.style.display = 'none';

    const summaryButton = document.createElement('button');
    summaryButton.id = 'summary-button';
    summaryButton.textContent = 'Summarize';

    overlay.appendChild(summaryButton);
    document.body.appendChild(overlay);

    summaryButton.addEventListener('click', async () => {
        summaryButton.textContent = 'Summarizing...';
        summaryButton.disabled = true;
        try {
            const summary = await getSummary(text);
            summaryButton.textContent = 'Summary';
            const summaryContainer = document.createElement('div');
            summaryContainer.innerHTML = summary;
            overlay.appendChild(summaryContainer);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    });
};

const showOverlay = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    overlay.style.display = 'flex';
    overlay.style.top = `${window.scrollY + rect.top - 50}px`;
    overlay.style.left = `${rect.left}px`;
};

document.addEventListener('mouseup', event => {
    if (event.target.closest('#summary-overlay')) return;

    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 200 && selectedText.length < 7000) {
        if (!overlay) createSummaryOverlay();

        showOverlay();
    } else if (overlay) {
        document.body.removeChild(overlay);
        overlay = null;
    }
});
```

</details>

### Styling with styles.css

To ensure a smooth and intuitive user experience, your extension should feature a clean and user-friendly interface.

#### **Styling the Overlay and Button**

Define styles for the following elements:

* **Overlay Positioning**: use absolute positioning to place the overlay near the selected text.

```css
#summary-overlay {
    max-width: 500px;
    max-height: 500px;
    overflow-y: scroll;
    cursor: pointer;
    position: absolute;
    border-radius: 4px;
    background-color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    z-index: 10000;
    color: #fff;
}
```

* **Button Appearance**: style the <kbd>Summarize</kbd> button to match the overlay design and ensure it is easily clickable.

```css
#summary-button {
    background: transparent;
    border: none;
    font-size: 14px;
    cursor: pointer;
    z-index: 10001;
}
```

* **Hover Effects**: add hover effects to the button to improve user interaction and provide visual feedback.

```css
#summary-button:hover {
    color: #000;
    padding: 2px;
    border-radius: 4px;
}
```

* **Disabled State**: clearly indicate when the button is disabled, helping users understand its functionality.

```css
#summary-button:disabled {
    color: #aaa;
    cursor: default;
}
```

We’ve completed the first part - now you can select text and receive a summary of it. The next step is to configure the interface to summarize the entire website.

To enable summarization of the entire website, we need to make the following additions:

### Add New Files

* _popup.html_:

This file will define the user interface for the popup, allowing users to initiate a site-wide summary.

* _popup.js:_

This script will handle the logic for the popup, including interacting with the main script and triggering the summarization process.

#### **Update manifest.json**

Add the following lines to configure the extension’s popup:

```javascript
"action": {
    "default_title": "Summarize site",
    "default_popup": "popup.html"
}
```

* _default\_title_: Specifies the title displayed when users hover over the extension icon in the browser toolbar.
* _default\_popup_: Points to the popup.html file, which defines the popup’s user interface.

With these updates, users will be able to interact with the extension via a popup to generate a summary for the entire website.

#### **Full&#x20;**_**manifest.json**_**&#x20;code**

```javascript
{
    "manifest_version": 3,
    "name": "Summarize",
    "version": "1.0",
    "description": "Write a summary of a website or text",
    "host_permissions": ["*://*.aimlapi.com/*"],
    "permissions": ["activeTab", "scripting"],

    "action": {
        "default_title": "Summarize site",
        "default_popup": "popup.html"
    },
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": ["scripts.js"],
            "css": ["styles.css"]
        }
    ],
    "icons": {
        "16": "icons/icon.png",
        "48": "icons/icon.png",
        "128": "icons/icon.png"
    }
}
```

### Adding Code to popup.html

Open the _popup.html_ file and insert the following code. This code defines the structure of the popup window, includes inline styles for simplicity, and connects the _popup.js_ script.

```javascript
<!DOCTYPE html>
<html>
    <head>
        <title>Summarizer</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 10px;
                width: 400px;
                background-color: #333;
                color: white;
            }
            button {
                padding: 8px 12px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <h3>Summarize site</h3>
        <button id="summarize-btn">Summarize site</button>
    </body>
    <script src="popup.js"></script>
</html>
```

### Adding Code to _popup.js_

The final step is to implement the functionality for the _popup.js_ file. The following code adds an event listener to a button in the popup, enabling it to trigger the summarization process on the active browser tab:

```javascript
document
    .getElementById('summarize-btn')
    .addEventListener('click', async function clickSummary() {
        const bntSummary = document.getElementById('summarize-btn');
        // Update button text to indicate the process has started
        bntSummary.innerText = 'Summarizing...'; 
        // Prevent multiple clicks during execution
        bntSummary.removeEventListener('click', clickSummary); 
         // Change button style for feedback
        bntSummary.style.backgroundColor = '#0053ac';

        // Identify the active tab in the current browser window
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });

        // Execute the summarizeText function 
        //in the context of the active tab
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            // Function to run in the tab's environment
            func: summarizeText, 
        });
    });
```

#### **Explanation of the Code**

1. Event Listener Setup:
   * The code adds a click event listener to a button with the ID _summarize-btn._ When clicked, the _clickSummary_ function is executed.
2. Button Feedback:
   * The button’s text is changed to 'Summarizing...' to provide feedback that the summarization process has started.
   * The event listener is removed immediately after the first click to prevent multiple triggers while the function executes.
   * The button’s background color is updated to indicate a change in state visually.
3. Tab Query:
   * _chrome.tabs.query_ is used to find the currently active tab in the browser window. This ensures that the summarization script runs only on the visible tab.
4. Executing the Summarization Script:
   * _chrome.scripting.executeScript_ injects and runs the _summarizeText_ function  (we will add it later) in the context of the active tab.

### Adding Communication Between Content Scripts and the Popup

The next step is to handle communication between the _content\_script_ (executing in the context of the webpage) and the popup script (_popup.js_). This ensures that the summarization results are displayed in the popup after being processed.

The following code snippet demonstrates how to listen for messages from the _content\_script_ and dynamically update the popup UI to show the summarization result:

```javascript
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    // Remove the summarize button once
    // the summary is available
    document.getElementById("summarize-btn").remove();

    // Create a new container to display the summary
    const summaryContainer = document.createElement("div");
    // Set the received summary as the container's content
    summaryContainer.innerHTML = request.text;

    // Add the container to the popup's body
    document.body.appendChild(summaryContainer);
  }
);
```

#### **Explanation of the Code**

1. Listening for Messages:
   * The _chrome.runtime.onMessage.addListener_ method listens for messages sent by other parts of the extension, such as the _content\_script_.
   * The _request_ parameter contains the data sent by the sender. In this case, it’s expected to have a _text_ property with the summarization result.
2. Removing the Button:
   * Once the summarization result is received, the _summarize-btn_ button is removed from the popup to avoid redundant actions.
3. Displaying the Summary:
   * A new _\<div>_ element is created to display the summarization result dynamically.
   * The _innerHTML_ property of the container is set to the text from the _request_, ensuring the summary is shown in the popup.
   * Finally, the new container is appended to the popup's _\<body>_.

### Adding the Summarize Functionality

To complete the _summarization_ process, the <kbd>summarizeText</kbd> function needs to be added. This function extracts the text content of the webpage and communicates with other parts of the extension to send the summarized result. Here’s the code for the function:

```javascript
const summarizeText = async () => {
    // Extracts all visible text from the webpage
    const bodyText = document.body.innerText; 
    // Calls an external or predefined function to generate a summary
    const summary = await getSummary(bodyText); 
    // Sends the summary to other parts of the extension
    chrome.runtime.sendMessage({ text: summary }); 
};
```

#### **What This Code Does**

1. Extracting Text Content:
   * The function uses _document.body.innerText_ to retrieve all visible text content on the webpage.This includes text from elements like paragraphs, headings, and lists but excludes hidden or non-text elements.
2. Generating a Summary:
   * The <kbd>getSummary</kbd> function (written in _script.js_) is called with the extracted text (_bodyText_) as an argument.
3. Sending the Summary:
   * Once the summary is generated, it is sent to other parts of the extension using _chrome.runtime.sendMessage_. This allows the extension’s popup or background script to receive the summary and display it to the user.

## **Results**

**The extension is complete!**&#x20;

The final steps are: to integrate the API key, choose the desired model, and add the extension to Chrome for use.

Feel free to use the following links:

[**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).

[**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

[**Browse our Models**](../#models-by-task)
