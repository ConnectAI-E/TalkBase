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
        return labelId
    }

    getItem(field: IBaseFieldMeta['name']) {
        return this._result[field];
    }


    parseOneField(field: IBaseFieldMeta) {
        const itemValue = this.getItem(field.name);
        if (!itemValue) {
            return null;
        }
        if (field.type === 1) {
            return this.exportText(itemValue);
        }
        if (field.type === 3) {
            const labelId = this.findSelectLabelId(field, itemValue);
            return this.exportSelect(itemValue, labelId);
        }
        return null;
    }



    get recordFormat() {
        const fields = this.tableInfo.fields;
        const res={} as any
        fields.forEach(f => {
            const parsed = this.parseOneField(f);
            if (parsed) {
                res[f.id] = parsed;
            }
        })
        return res;
    }


}
