import {NextApiRequest, NextApiResponse} from 'next';
import {Configuration, OpenAIApi} from 'openai';
import {a} from 'vite-node/types-e8623e9c';

type Prop = {
    tsString: string; // TypeScript string of the table
    lang?: 'en'|'zh';
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
Q: export interface book {
book_name: string;
is_novel: boolean;
}
A: harry potter
Q: ${ tsStr }
A: `;
}

function generateZhTemplate(tsStr: string) {
    return `Q： export interface food {
size: "large" | "middle" | "small";
meat: string;
staple_food: "rice" | "noodles" | "dumplings";
full_content: string;
spicy: boolean;
}
A： 鸡蛋炒饭不要辣椒
Q:  export interface SentimentResponse {
content: string;
sentiment: "negative" | "neutral" | "positive";
}
A: 今天做的不错 
Q: export interface book {
book_name: string;
is_novel: boolean;
}
A: 色戒
Q: ${ tsStr }
A: `;
}


const getTableAdvice = async (tsString: string, lang :string) => {
    const ifZh = lang === 'zh';
    console.log(ifZh);
    const messages= [
            {
                role: 'system',
                content: ifZh ? 'According to the following type file structure, after judging the function of this form, assuming the appropriate situation, use human natural language to give an example input, be natural  and no more than 20 words. 记住，用中文回答 ' : 'According to the following type file structure, after judging the function of this form, assuming the appropriate situation, use human natural language to give an example input, be natural  and no more than 20 words.Must Answer in English',
            },
            { role: 'user', content: ifZh ? generateZhTemplate(tsString) : generateTemplate(tsString) }] as any;
    const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: messages
    }) as any

    return chatCompletion.data.choices[0].message.content;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tsString,lang } = JSON.parse(req.body) as Prop;
    const result = await getTableAdvice(tsString,lang as string);
    // console.log(result);
    res.status(200).send({ result });
};

export default handler;




