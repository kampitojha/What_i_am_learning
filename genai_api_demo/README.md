# GenAI API Integration Demo

This project demonstrates how to integrate ChatGPT (OpenAI) and Gemini (Google) APIs using Node.js.

## Setup

1.  **Install Dependencies**:
    Dependencies are already installed. If you need to reinstall, run:

    ```bash
    npm install
    ```

2.  **Get API Keys**:
    - **OpenAI (ChatGPT)**: Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) and create a new secret key. You might need to add credit ($5) to your account to use the API.
    - **Google Gemini**: Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and create a generic API key. This is currently free for low-volume usage.

3.  **Configure Environment**:
    Open the `.env` file in this folder and paste your keys replacing `YOUR_GEMINI_API_KEY_HERE` and `YOUR_OPENAI_API_KEY_HERE`.

    Example `.env`:

    ```env
    GEMINI_API_KEY=AIzaSyD......
    OPENAI_API_KEY=sk-proj-.....
    ```

## Running the Code

### To test ChatGPT:

```bash
node openai_demo.js
```

### To test Gemini:

```bash
node gemini_demo.js
```

## Explanation

- **`openai_demo.js`**: Connects to OpenAI servers using the `openai` library. It sends a message ("user prompt") to the `gpt-3.5-turbo` model and prints the reply.
- **`gemini_demo.js`**: Connects to Google servers using the `@google/generative-ai` library. It uses the `gemini-1.5-flash` model to generate text based on your prompt.
