import {describe, expect, it} from 'vitest';
import {TableProps} from './table';
import {DataWriter} from './dataWriter';

const tableInfo: TableProps = {
    name: 'SentimentResponse',
    fields: [
        {
            id: 'fld8t4vEEN',
            type: 1,
            name: 'content',
            property: {},
        },
        {
            id: 'fld1g8LMRX',
            type: 3,
            name: 'sentiment',
            property: {
                options: [{
                    id: 'optdhSv28L',
                    name: 'negative',
                    color: 0,
                },
                    {
                        id: 'opt7HpQCOH',
                        color: 1,
                        name: 'neutral',
                    },
                    {
                        id: 'opt3UsIu8H',
                        color: 2,
                        name: 'positive',
                    }],
            },
        },
        //多选
        {
            id: 'fldfZnyFTg',
            type: 4,
            name: 'fruit',
            property: {
                options: [{
                    id: 'optdh2v28L',
                    name: '橘子',
                    color: 0,
                },
                    {
                        id: 'opt3HpQCOH',
                        color: 1,
                        name: '苹果',
                    },
                    {
                        id: 'opt1UsIu8H',
                        color: 2,
                        name: '菠萝',
                    }],
            },
        },
    ],
};

const resultExample = { content: 'TypeChat is awesome!', sentiment: 'positive' };
const resultExample2 = { content: '我喜欢吃苹果和橘子', fruit: ['苹果', '橘子'] };
describe('dataWriter init', () => {
    it('should init', function () {
        expect(new DataWriter(tableInfo)).toBeDefined();
    });
    it('should get table title', () => {
        const core = new DataWriter(tableInfo);
        expect(core.load(resultExample).res).toBeDefined();
    });
});


describe('parse text', () => {
    const core = new DataWriter(tableInfo);
    it('should format text by str', () => {
        expect(core.exportText('test')).toEqual({ type: 'text', text: 'test' });
    });

    it('shoulde get item by field name', () => {
        expect(core.load(resultExample).getItem('content')).toBe('TypeChat is awesome!');
    });

    it('should parse one field', () => {
        expect(core.load(resultExample).parseOneField(tableInfo.fields[0])).toEqual({
            type: 'text',
            text: 'TypeChat is awesome!',
        });
    });
});

describe('parse select', () => {
    const core = new DataWriter(tableInfo);
    it('should parse select field', () => {
        expect(core.load(resultExample).parseOneField(tableInfo.fields[1])).toEqual({
            id: 'opt3UsIu8H',
            text: 'positive',
        });
    });
});

describe('parse multi select', () => {
    const core = new DataWriter(tableInfo);
    it('should parse multi select field', () => {
        expect(core.load(resultExample2).parseOneField(tableInfo.fields[2])).toEqual([
            {
                id: 'opt3HpQCOH',
                text: '苹果',
            },
            {
                id: 'optdh2v28L',
                text: '橘子',
            }
        ]);
    });
})


describe('parse all type', () => {
    const core = new DataWriter(tableInfo);
    it('should parse all', () => {
        expect(core.load(resultExample).recordFormat).toEqual(
            {
                ["fld8t4vEEN"] : {
                    type: 'text',
                    text: 'TypeChat is awesome!',
                },
                ["fld1g8LMRX"] : {
                    id:'opt3UsIu8H',
                    text: 'positive',
                }
            })
    });
});
