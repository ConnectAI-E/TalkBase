import {NextApiRequest, NextApiResponse} from 'next';
import {Configuration, OpenAIApi} from 'openai';

type Prop = {
    tsString: string; // TypeScript string of the table
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


function generateTemplate(tsStr: string) {
    return `Q： export interface food {
size: "large" | "middle" | "small";
meat: string;
staple_food: "rice" | "noodles" | "dumplings";
full_content: string;
spicy: boolean;
}
A：Fried rice with egg and chili pepper.
Q:  export interface SentimentResponse {
content: string;
sentiment: "negative" | "neutral" | "positive";
}
A: Well done today
Q: ${ tsStr }
A: `;
}


const getTableDescription = async (tsString: string) => {
    const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: [
            {
                role: 'system',
                content: 'According to the following type file structure, after judging the function of this form, assuming the appropriate situation, use human natural language to give an example input, be natural  and no more than 20 words',
            },
            { role: 'user', content: generateTemplate(tsString) }],
    }) as any;
    return chatCompletion.data.choices[0].message.content;

};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tsString } = JSON.parse(req.body) as Prop;
    const result = await getTableDescription(tsString);
    console.log(result);
    res.status(200).send({ result });
};

export default handler;




