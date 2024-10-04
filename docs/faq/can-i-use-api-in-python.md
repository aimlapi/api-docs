---
icon: circle-question
---

# Can I use API in Python?

Of course you can! Here is a quick guide on how to configure your environment and use our API.

## Installation

Our API is just an interface, which means you need to use it within some application or code. When you choose Python, you first need to install it on your system.

### Is it already installed?

Depending on your operating system and version, it might already be installed out-of-the-box. To test it, you need to open the [terminal ](../glossary/concepts.md#terminal)and type one of the following commands:

```bash
python3 --version
python --version
py --version
```

If any of these commands print a Python version higher than 3.8, as shown below, then Python is properly installed:

```bash
Python 3.10.6
```

If your result is different (for example, if it just prints "Python" without a version or if on Windows 11 the Microsoft Store opens), then it isn't installed.

### On Windows

You can install Python from the [Microsoft Store marketplace](https://apps.microsoft.com/detail/9pjpw5ldxlz5?hl=en-US\&gl=US) if you are using a newer version of Windows 11, or you can follow the [official Python distribution site](https://www.python.org/downloads/) and install it as a usual executable from there. You can safely install version 3.10 as most modern modules support it, or the latest version if you wish.

### On Mac

There are several good articles that describe the installation process. You can look at one [here](https://docs.python-guide.org/starting/install3/osx/) or search the Internet for more options.

### On Linux

The installation process varies depending on your Linux distribution. Here is an example for Ubuntu (make sure that Python isn't installed, as described in the beginning):

```bash
sudo apt update
sudo apt install -y python3-venv
```

## Using

Test your installation and you can proceed with the tutorial on the [quickstart](broken-reference) page.
