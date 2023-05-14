import { Configuration, OpenAIApi } from "openai";
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config()
// Configuration for Open AI
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
userInterface.prompt()
userInterface.on("line", async (input) => {
    openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: input },
      ],
    })
    .then((response) => {
      console.log(response.data.choices[0].message);
      userInterface.prompt()
    })
    .catch((error) => console.log(error));
})

