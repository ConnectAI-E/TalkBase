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
    // console.log(req.body);
    const { input, schema, table } = JSON.parse(req.body) as Prop;
    const translator = createJsonTranslator(model, schema, table);
    const response = await translator.translate(input);
    if (!response.success) {
        console.log(response.message);
        return;
    }
    res.status(200).send({ ...response.data });
}



