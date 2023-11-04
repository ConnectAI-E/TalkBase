import {describe, expect, it} from 'vitest';
import {DataWriter} from './dataWriter';
import {IFieldMeta} from '@lark-base-open/js-sdk';
import {TableProps} from './table';

const tableInfo = {
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
                options: [
                    {
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
                    },
                ],
            },
        },
        //多选
        {
            id: 'fldfZnyFTg',
            type: 4,
            name: 'fruit',
            property: {
                options: [
                    {
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
                    },
                ],
            },
        },
        //数字
        {
            id: 'fldueXn0k2',
            name: 'Height',
            property: {},
            type: 2,
        },
        // 复选框
        {
            id: 'fldueXn0k2',
            name: 'is_novel',
            property: {},
            type: 7,
        },
        { id: 'fldueXn0k2', name: 'score', property: {}, type: 99004 },
        // 电话
        { id: 'fldueXn0k2', name: 'phone', property: {}, type: 13 },
        // 超链接
        { id: 'fldueXn0k2', name: 'url', property: {}, type: 15 },
        {
            'id': 'fldkRljDB3',
            'type': 2,
            'name': 'value',
            'property': {},
            'isPrimary': false,
            'description': {
                'disableSyncToFormDesc': false,
                'content': [
                    {
                        'type': 'text',
                        'text': '电话号码\n',
                    },
                    {
                        'type': 'text',
                        'text': '数值保留后四位',
                    },
                ],
            },
        },
    ],
} as unknown as TableProps;

const
    resultExample = {
        content: 'TypeChat is awesome!',
        sentiment: 'positive',
    };
const resultExample2 = {
    content: '我喜欢吃苹果和橘子',
    fruit: ['苹果', '橘子'],
};
const resultExample3 = { Height: 180 };
const resultExample4 = { is_novel: true };
const resultExample5 = { score: 4 };
const resultExample6 = { phone: '13800000000' };
const resultExample7 = { url: 'https://www.baidu.com' };

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
        expect(core.load(resultExample).getItem('content')).toBe(
            'TypeChat is awesome!',
        );
    });

    it('should parse one field', () => {
        expect(core.load(resultExample).parseOneField(tableInfo.fields[0])).toEqual(
            {
                type: 'text',
                text: 'TypeChat is awesome!',
            },
        );
    });
});

describe('parse select', () => {
    const core = new DataWriter(tableInfo);
    it('should parse select field', () => {
        expect(core.load(resultExample).parseOneField(tableInfo.fields[1])).toEqual(
            {
                id: 'opt3UsIu8H',
                text: 'positive',
            },
        );
    });
});

describe('parse multi select', () => {
    const core = new DataWriter(tableInfo);
    it('should parse multi select field', () => {
        expect(
            core.load(resultExample2).parseOneField(tableInfo.fields[2]),
        ).toEqual([
            {
                id: 'opt3HpQCOH',
                text: '苹果',
            },
            {
                id: 'optdh2v28L',
                text: '橘子',
            },
        ]);
    });
});

describe('parse number', () => {
    const core = new DataWriter(tableInfo);
    it('should parse number field', () => {
        expect(
            core.load(resultExample3).parseOneField(tableInfo.fields[3]),
        ).toEqual(180);
    });
});

describe('parse boolean', () => {
    const core = new DataWriter(tableInfo);
    it('should parse boolean field', () => {
        expect(
            core.load(resultExample4).parseOneField(tableInfo.fields[4]),
        ).toEqual(true);
    });
});

describe('parse score', () => {
    const core = new DataWriter(tableInfo);
    it('should parse score field', () => {
        expect(
            core.load(resultExample5).parseOneField(tableInfo.fields[5]),
        ).toEqual(4);
    });
});
describe('parse phone', () => {
    const core = new DataWriter(tableInfo);
    it('should parse phone field', () => {
        expect(
            core.load(resultExample6).parseOneField(tableInfo.fields[6]),
        ).toEqual('13800000000');
    });
});
describe('parse url', () => {
    const core = new DataWriter(tableInfo);
    it('should parse url field', () => {
        expect(
            core.load(resultExample7).parseOneField(tableInfo.fields[7]),
        ).toEqual({
            type: 'url',
            text: 'https://www.baidu.com',
        });
    });
});
describe('parse all type', () => {
    const core = new DataWriter(tableInfo);
    it('should parse all', () => {
        expect(core.load(resultExample).recordFormat).toEqual({
            ['fld8t4vEEN']: {
                type: 'text',
                text: 'TypeChat is awesome!',
            },
            ['fld1g8LMRX']: {
                id: 'opt3UsIu8H',
                text: 'positive',
            },
        });
    });
});
