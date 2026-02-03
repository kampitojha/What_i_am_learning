require('dotenv').config();
const OpenAI = require("openai");

// Initialize OpenAI with your API Key from the .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runChatGPTDemo() {
  console.log("-----------------------------------------");
  console.log("Starting ChatGPT API Demo...");
  const userPrompt = "Explain what an API is in one sentence.";

  console.log("Your Prompt: " + userPrompt);
  console.log("Waiting for response...");

  try {
    // Calling the Chat Completions API
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userPrompt }],
      model: "gpt-3.5-turbo", // You can use "gpt-4" if you have access
    });

    console.log("\nChatGPT Response:");
    console.log(completion.choices[0].message.content);
    console.log("-----------------------------------------");
  } catch (error) {
    console.error("Error connecting to OpenAI:", error.message);
    if (error.message.includes("API key")) {
        console.log("Hint: Make sure you put your valid API key in the .env file!");
    }
  }
}

runChatGPTDemo();
