import type {NextApiRequest, NextApiResponse} from 'next';
import {createJsonTranslator, createLanguageModel} from 'typechat';

type Prop = {
    schema: string;
    table: string;
    input: string;
}
const model = createLanguageModel(process.env);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { input, schema, table } = JSON.parse(req.body) as Prop;
    // console.log(schema);
    // console.log(table);
    const translator = createJsonTranslator(model, schema, table);
    const response = await translator.translate(input);
    console.log(response);
    if (!response.success) {
        console.log(response.message);
        res.status(500).send({ error: response.message })
        return;
    }
    res.status(200).send({ res: response.data });
}



