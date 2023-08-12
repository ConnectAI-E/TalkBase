import {TableProps} from './table';
import {IBaseFieldMeta} from '@base-open/web-api';

export class DataWriter {
    tableInfo: TableProps;
    private _result: Record<string, string> = {};

    constructor(tableInfo: TableProps) {
        this.tableInfo = tableInfo;
    }

    load(res: any) {
        this._result = res;
        return this;
    }

    get res() {
        return this._result;
    }

    exportText(text: string) {
        return {
            type: 'text',
            text: text,
        };
    }

    exportNumber(number: number) {
        return number;
    }

    exportBoolean(boolean: boolean) {
        return boolean;
    }

    exportSelect(label: string, labelId: string) {
        return {
            id: labelId,
            text: label,
        };
    }

    findSelectLabelId(field: IBaseFieldMeta, label: string) {
        const property = field.property as any;
        if (!property || !property?.options) {
            return null;
        }
        const options = property.options as any;
        if (!options) {
            return null;
        }
        const option = options.find((o: any) => o.name === label);
        if (!option) {
            return null;
        }
        const labelId = option.id;
        return labelId;
    }

    getItem(field: IBaseFieldMeta['name']) {
        return this._result[field];
    }


    parseOneField(field: IBaseFieldMeta) {
        const itemValue = this.getItem(field.name) as any;
        if (!itemValue) {
            return null;
        }
        //文本
        if (field.type === 1) {
            return this.exportText(itemValue);
        }
        //数字
        if (field.type === 2 || field.type === 99004) {
            return this.exportNumber(itemValue);
        }
        //单选
        if (field.type === 3) {
            const labelId = this.findSelectLabelId(field, itemValue);
            return this.exportSelect(itemValue, labelId);
        }
        // //多选
        if (field.type === 4) {
            const labelMeta = itemValue.map((v: string) => {
                const labelId = this.findSelectLabelId(field, v);
                return [v, labelId];
            });
            return labelMeta.map((v: any) => this.exportSelect(v[0], v[1]));
        }
        // 复选框
        if (field.type === 7) {
            return this.exportBoolean(itemValue);
        }
        return null;
    }


    get recordFormat() {
        const fields = this.tableInfo.fields;
        const res = {} as any;
        fields.forEach(f => {
            const parsed = this.parseOneField(f);
            if (parsed) {
                res[f.id] = parsed;
            }
        });
        return res;
    }


}
