import OpenAI from "openai";

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const openai = new OpenAI({ apiKey: process.env.openai_key });

const findValueInText = async (text, query) : Promise<string> =>{
        try {
            const completion = await openai.chat.completions.create({
            temperature: 0,
            model: "gpt-3.5-turbo-16k",
            messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Text: ${text}` },
            { role: "user", content: `Given the text: "${text}", find the answer to the following query: "${query}". Provide a very short answer of your best guess to the answer. If the text absolutely does not answer the question, return "N/A".` }
            ]
        });
    

        const answer = (completion.choices[0].message.content);
        // console.log(`Answer: ${answer}`);
        return answer;

        } catch (error) {
            console.error("Error:", error);
            return "N/A";
        }
  }

export default findValueInText;