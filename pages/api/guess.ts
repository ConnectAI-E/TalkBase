

import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

type Prop = {
    tsString: string; // TypeScript string of the table

}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const getTableDescription = async (tsString: string) => {
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role:"system", content: "根据下面的类型文件结构，判断出此表格的作用，只说结论，不超过20字",},
            {role: "user", content: tsString,}],
    }) as any;
    return chatCompletion.data.choices[0].message.content;

}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tsString } = JSON.parse(req.body) as Prop;
    const result = await getTableDescription(tsString);
    console.log(result);
    res.status(200).send({ result });
}

export default handler;

