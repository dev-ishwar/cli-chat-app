import { Configuration, OpenAIApi } from "openai";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

// Configuration for Open AI
const configuration = new Configuration({
    organization: "org-ZhV4x8aQND5EDQTdTZw6pKql",
    apiKey: "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"
})

const openai = new OpenAIApi(configuration)


const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})

app.post('/', async (request, response) => {
    const { chats } = request.body;
    console.log('req', request.body)
    
    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are a helpful assistant."},
            ...chats,
        ]
    })
    response.json(result.data.choices[0].message)
})
