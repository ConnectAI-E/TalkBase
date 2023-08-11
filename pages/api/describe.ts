

import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

type Prop = {
    tsString: string; // TypeScript string of the table
    lang?: 'en' | 'zh';
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const getTableDescription = async (tsString: string,lang='en') => {
    const ifZh = lang === 'zh';
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role:"system", content: "According to the following table structure, judge the target of table, describe in natural language，only say the conclusion, no more than 30 words."+(ifZh?" 记住用中文来描述":"Describe in English")},
            {role: "user", content: tsString,}],
    }) as any;
    return chatCompletion.data.choices[0].message.content;

}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tsString,lang } = JSON.parse(req.body) as Prop;
    const result = await getTableDescription(tsString,lang);
    // console.log(result);
    res.status(200).send({ result });
}

export default handler;




