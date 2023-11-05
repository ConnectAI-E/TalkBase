import {IBaseFieldMeta} from '@base-open/web-api';
import {TableProps} from './table';

export class TableParser {
    table: TableProps;

    constructor(tableInfo: TableProps) {
        this.table = tableInfo;
    }

    get title() {
        return this.table.name;
    }

    get fieldNames() {
        return this.table.fields.map((f) => f.name);
    }

    formatStringField(field: IBaseFieldMeta) {
        return `${ field.name }: string;`;
    }

    formatSelectField(field: IBaseFieldMeta) {
        const property = field.property as any;
        if (!property || !property?.options) {
            {
                return '';
            }
        }
        const options = property.options as any;
        if (!options) {
            return '';
        }
        const optionsStr = options.map((o: any) => `"${ o.name }"`).join(' | ');
        return `${ field.name }: ${ optionsStr };`;
    }

    formatMultiSelectField(field: IBaseFieldMeta) {
        const property = field.property as any;
        if (!property || !property?.options) {
            {
                return '';
            }
        }
        const options = property.options as any;
        if (!options) {
            return '';
        }
        const optionsStr = options.map((o: any) => `"${ o.name }"`).join(' | ');
        return `${ field.name }: (${ optionsStr })[];`;
    }

    formatNumberField(iBaseFieldMeta: IBaseFieldMeta) {
        return `${ iBaseFieldMeta.name }: number;`;
    }

    formatPhoneField(iBaseFieldMeta: IBaseFieldMeta) {
        return `${ iBaseFieldMeta.name }: string;`;
    }

    formatUrlField(iBaseFieldMeta: IBaseFieldMeta) {
        return `${ iBaseFieldMeta.name }: string;`;
    }

    formatBooleanField(iBaseFieldMeta: IBaseFieldMeta) {
        return `${ iBaseFieldMeta.name }: boolean;`;
    }


    formatField(field: IBaseFieldMeta) {
        switch (field.type) {
            case 1:
                return this.formatStringField(field);
            case 2:
            case 99004: // 评分
            case 99003: // 货币
            case 99002: // 进度
            case 13: // 电话
                return this.formatNumberField(field);
            case 15:
                return this.formatUrlField(field);
            case 3:
                return this.formatSelectField(field);
            case 4:
                return this.formatMultiSelectField(field);
            case 7:
                return this.formatBooleanField(field);
            default:
                return '';
        }
    }

    formatFieldWithDescription(field: IBaseFieldMeta) {
        const description = this.abstractDescription(field);
        const fieldStr = this.formatField(field);
        if (!description) {
            return fieldStr;
        }
        return `${ fieldStr } // ${ description }`;

    }

    formatTitle() {
        return `export interface ${ this.title } {`;
    }

    formatEnd() {
        return `}`;
    }

    private formatAll() {
        const fields = this.table.fields.map((f) => this.formatFieldWithDescription(f)).join('\n');
        return `${ this.formatTitle() }\n${ fields }\n${ this.formatEnd() }`;
    }

    get typeStr() {
        return this.formatAll();
    }

    abstractDescription(aFieldElement: any) {
        const description = aFieldElement.description;
        if (!description) {
            return '';
        }
        const content = description.content;
        if (!content) {
            return '';
        }

        const text = content.map((c: any) => c.text).join('');
        // 替换换行符为空格
        return text.replace(/\n/g, ' ');
    }
}
