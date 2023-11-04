import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {LanguageIcon, LoadingCircle, SendIcon} from '../../utils/icons';
import Textarea from 'react-textarea-autosize';
import {githubUrl} from '../../constant';
import {DataWriter} from '../../utils/BaseSchema/dataWriter';
import {TableParser} from '../../utils/BaseSchema/tableParser';
import {toast} from 'sonner';
import Footer from '../../components/footer';
import Header from '../../components/header';
import {debounceWarp} from '../../utils/tool';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {useTranslation} from 'next-i18next';

const writeData = async (input: string, tableSchema: string, setTableInfoNow: string) => {
    const response = await fetch('/api/table', {
        method: 'POST',
        body: JSON.stringify(
            {
                input: input,
                schema: tableSchema,
                table: setTableInfoNow,
            },
        ),
    });
    const _json = await response.json();
    if (_json.error) {
        toast.error('Content parsing failed');
        throw new Error(_json.error);
    }
    return _json.res;
};

const guessTable = async (tableType: string,lang:string) => {
    const response = await fetch('/api/describe', {
        method: 'POST',
        body: JSON.stringify(
            {
                tsString: tableType,
                lang: lang,
            },
        ),
    });
    const _json = await response.json();
    return _json.result;
};

const adviceTableInput = async (tableType: string,lang: string) => {
    const response = await fetch('/api/advice', {
        method: 'POST',
        body: JSON.stringify(
            {
                tsString: tableType,
                lang: lang,
            },
        ),
    });
    const _json = await response.json();
    return _json.result;
};


export default function Chat() {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [bitable, setBitable] = useState<any>();
    useEffect(() => {
        import('@lark-base-open/js-sdk').then(res => {
            setBitable(res.bitable);
        });
    }, []);
    const [tableInfoNow, setTableInfoNow] = useState<any>({});
    const [tableSchema, setTableSchema] = useState<any>('');
    const [currentTable, setCurrentTable] = useState<any>({});
    const nowTableId = useRef<any>(null);
    const defaultDescription = 'Loading table description ...';
    const [tableDescription, setTableDescription] = useState<any>(defaultDescription);
    const defaultAdvice = 'Loading record advice ...';
    const [tableAdvice, setTableAdvice] = useState<any>(defaultAdvice);

    useEffect(() => {
        if (!bitable) {
            return;
        }
        let totalTable: any = [];

        const updateTableInfo = async (tableId: any, totalTable: []) => {

            const currentTableMeta = totalTable.find(({ id }: { id: any }) => id === tableId) as any;
            const currentTable = await bitable.base.getTableById(currentTableMeta?.id);
            setCurrentTable(currentTable);
            const fields = await currentTable.getFieldMetaList();
            const tableInfo = {
                name: currentTableMeta?.name,
                fields: fields,
            };
            console.log(tableInfo);

            setTableInfoNow(tableInfo);
            const _baseTable = new TableParser(tableInfo);
            console.log(_baseTable.typeStr);

            const nowLang = i18n.language === 'en' ? 'en' : 'zh';

            console.log(nowLang);
            setTableSchema(_baseTable.typeStr);
            const tableDescription = await guessTable(_baseTable.typeStr,nowLang);

            console.log(tableDescription);
            setTableDescription(tableDescription);

            const tableAdvice = await adviceTableInput(_baseTable.typeStr, nowLang);
            console.log(tableAdvice);
            setTableAdvice(tableAdvice);
        };
        const updateInfoDebounce = debounceWarp(updateTableInfo, 1800);

        Promise.all([bitable.base.getTableMetaList(), bitable.base.getSelection()])
            .then(async ([metaList, selection]) => {
                totalTable = metaList;
                nowTableId.current = selection?.tableId;
                updateTableInfo(selection?.tableId, totalTable);
            });


        const off = bitable.base.onSelectionChange(async (event: any) => {
            // 检测tableId是否改变
            if (event?.data?.tableId === nowTableId.current) {
                return;
            }
            nowTableId.current = event?.data?.tableId;
            updateInfoDebounce(event?.data?.tableId, totalTable);
            setTableDescription(defaultDescription);
            setTableAdvice(defaultAdvice);
            toast.success('Detect New Table Field');
        });

        return () => {
            off();
        };
    }, [bitable]);


    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const disabled = isLoading || input.length === 0;
    const handleSubmit = async () => {
        if (disabled) {
            return;
        }
        setIsLoading(true);
        try {
            const _json = await writeData(input, tableSchema, tableInfoNow.name).finally(() => {
                setInput('');
            });
            console.log(_json);
            const record = new DataWriter(tableInfoNow);
            currentTable.addRecord({
                fields: record.load(_json).recordFormat,
            });
            console.log(record.load(_json).recordFormat);
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    const { t, i18n } = useTranslation('common');
    const changeI18n = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
    }
    return (
        <div className="flex flex-col items-center justify-between ">
            <div className="absolute top-5 w-full justify-end px-5 flex">
                <div
                    onClick={ changeI18n }
                    className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto cursor-pointer"
                >
                    <LanguageIcon/>
                </div>
            </div>
            <div className="mx-2  max-w-screen-md rounded-md pt-2 w-80%">
                <Header/>
                {/* <div>  { t('h1') }</div> */}
                <div
                    className="flex flex-col space-y-1 border-t border-gray-200 bg-gray-50 p-3 sm:p-10">
                    <div
                        className="rounded-md break-all border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
                    >
                        { tableDescription }
                    </div>

                </div>
            </div>
            <div
                className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
                <form
                    ref={ formRef }
                    onSubmit={ handleSubmit }
                    className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
                >
                    <Textarea
                        ref={ inputRef }
                        tabIndex={ 0 }
                        required
                        rows={ 1 }
                        autoFocus
                        placeholder={ tableAdvice }
                        value={ input }
                        onChange={ (e) => setInput(e.target.value) }
                        spellCheck={ false }
                        onKeyDown={ (e) => {
                            // 如果是tab就补全placeholder
                            if (e.key === 'Tab') {
                                e.preventDefault();
                                setInput(tableAdvice);
                            }
                            // 同事按按住command+enter 就发送
                            if (e.key === 'Enter' && e.metaKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        } }
                        className="w-full pr-10 focus:outline-none text-sm"
                    />
                    <button
                        type="button"
                        className={ clsx(
                            'absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all',
                            disabled
                                ? 'cursor-not-allowed bg-white'
                                : 'bg-green-500 hover:bg-green-600',
                        ) }
                        disabled={ disabled }
                        onClick={ handleSubmit }
                    >
                        { isLoading ? (
                            <LoadingCircle/>
                        ) : (
                            <SendIcon
                                className={ clsx(
                                    'h-4 w-4',
                                    input.length === 0 ? 'text-gray-300' : 'text-white',
                                ) }
                            />
                        ) }
                    </button>
                </form>
                <Footer/>
            </div>
        </div>
    );
}


