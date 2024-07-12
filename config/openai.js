import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// const configuration = new Configuration({
//     apiKey: 
// });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default openai;
