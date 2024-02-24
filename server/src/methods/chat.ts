import OpenAI from "openai";

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const openai = new OpenAI({ apiKey: process.env.openai_key });

async function findValueInText(text, query) {
    try {
        const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Text: ${text}` },
          { role: "user", content: `Find the answer to: ${query}` }],
      });
  
      const answer = (completion.choices[0].message.content);
      console.log(`Answer: ${answer}`);
      return completion;

    } catch (error) {
      console.error("Error:", error);
    }
  }

export default findValueInText;