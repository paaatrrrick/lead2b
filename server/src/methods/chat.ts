import OpenAI from "openai";

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const openai = new OpenAI({ apiKey: process.env.openai_key });

const findValueInText = async (text : string, query : string) : Promise<string> =>{

        const prompt = `Given the following text representation of a website extract the follow infomation:\n\nNeeded information:\n${query}\n\nIf the text does not contain the information, return "N/A". If it does, answer the question in the most concise way possible. You should not restate the question. only answer the question.\n\n\nText:\n\n${text}`;
        console.log(prompt)
        try {
            const completion = await openai.chat.completions.create({
            temperature: 0,
            model: "gpt-3.5-turbo-16k",
            messages: [
            { role: "system", content: "You are a webscraper who is given the textual representation of a website and is told to extract a value from it. You response are extremely concise. When you respond you only state the answer to the question. DO NOT restate the question. YOU must say N/A if you cannot answer the question." },
            { role: "user", content: prompt}]
        });
    

        const answer = (completion.choices[0].message.content);
        if (!answer || answer === "N/A" || answer.trim() === "" || answer === "N/A." || answer === "N/A." || answer === "N/A" || answer === "N/A.") {
            return "N/A";
        }
        return answer;
        } catch (error) {
            console.error("Error:", error);
            return "N/A";
        }
  }

export default findValueInText;