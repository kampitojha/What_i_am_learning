require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with your API Key from the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runGeminiDemo() {
  console.log("-----------------------------------------");
  console.log("Starting Gemini API Demo...");
  
  const userPrompt = "Explain what an API is in one sentence.";

  // Get the generative model (using gemini-1.5-flash for speed and lower cost/free tier availability)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  console.log("Your Prompt: " + userPrompt);
  console.log("Waiting for response...");

  try {
    // Generate content based on the prompt
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("\nGemini Response:");
    console.log(text);
    console.log("-----------------------------------------");
  } catch (error) {
    console.error("Error connecting to Gemini:", error.message);
    if (error.message.includes("API key")) {
        console.log("Hint: Make sure you put your valid API key in the .env file!");
    }
  }
}

runGeminiDemo();
