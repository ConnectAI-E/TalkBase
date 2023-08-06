import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {GithubIcon, LoadingCircle, SendIcon} from '../../utils/icons';
import Textarea from 'react-textarea-autosize';
import {githubUrl} from '../../constant';
import {DataWriter} from '../../utils/BaseSchema/dataWriter';
import {TableParser} from '../../utils/BaseSchema/tableParser';
import {toast} from 'sonner';



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
        toast.error("内容解析失败");
        throw new Error(_json.error);
    }
    return _json.res;
};

const guessTable = async (tableType: string) => {
    const response = await fetch('/api/guess', {
        method: 'POST',
        body: JSON.stringify(
            {
                tsString: tableType,
            },
        ),
    });
    const _json = await response.json();
    return _json.result
}

export default function Chat() {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [bitable, setBitable] = useState<any>();
    useEffect(() => {
        import('@base-open/web-api').then(res => {
            setBitable(res.bitable);
        });
    }, []);
    const [tableInfoNow, setTableInfoNow] = useState<any>({});
    const [tableSchema, setTableSchema] = useState<any>('');
    const [currentTable, setCurrentTable] = useState<any>({});
    const nowTableId = useRef<any>(null);
    const defaultDescription = '正在加载表格用途...';
    const [tableDescription, setTableDescription] = useState<any>(defaultDescription);
    useEffect(() => {
        if (!bitable) {
            return;
        }
        let totalTable: any = [];

        const updateTableInfo = async (tableId: any, totalTable: []) => {
            setTableDescription(defaultDescription);
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
            setTableSchema(_baseTable.typeStr);
            const tableDescription = await guessTable(_baseTable.typeStr);
            setTableDescription(tableDescription);
        };

        Promise.all([bitable.base.getTableMetaList(), bitable.base.getSelection()])
            .then(async ([metaList, selection]) => {
                totalTable = metaList;
                nowTableId.current = selection?.tableId;
                updateTableInfo(selection?.tableId, totalTable);
            });


        const off = bitable.base.onSelectionChange(async (event: any) => {
            // 检测tableId是否改变
            if (event?.data?.tableId ===  nowTableId.current) {
                return;
            }
            nowTableId.current = event?.data?.tableId;
            updateTableInfo(event?.data?.tableId, totalTable);
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
            const record = new DataWriter(tableInfoNow);
            currentTable.addRecord({
                fields: record.load(_json).recordFormat,
            });
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };


    return (
        <div className="flex flex-col items-center justify-between ">
            <div className="absolute top-5 hidden w-full justify-end px-5 sm:flex">
                <a
                    href={ githubUrl }
                    target="_blank"
                    className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
                >
                    <GithubIcon/>
                </a>
            </div>
            {
                <div className="mx-2  max-w-screen-md rounded-md  w-80%">
                    <div className="flex flex-col space-y-4 p-4 border sm:p-10  px-10">
                        <h1 className="text-lg font-semibold text-black">
                            Welcome to ChatBase!
                        </h1>
                        <p className="text-gray-500">
                            This is an{ ' ' }
                            <a
                                href={ githubUrl }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                            >
                                open-source
                            </a>{ ' ' }
                            AI chatbot that uses{ ' ' }
                            <a
                                href="https://github.com/microsoft/TypeChat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                            >
                                TypeChat
                            </a>{ ' ' }
                            and{ ' ' }
                            <a
                                href="https://sdk.vercel.ai/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                            >
                                Vercel
                            </a>{ ' ' }
                            to write date to lark-base by natural language.
                            <br/>
                            <br/>
                            Project is made by { ' ' }
                            <a
                                href="https://github.com/ConnectAI-E"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                            >
                                ConnectAI
                            </a>{ ' ' } with ❤️ .
                        </p>
                    </div>
                    <div
                        className="flex flex-col space-y-1 border-t border-gray-200 bg-gray-50 p-3 sm:p-10">
                        <div
                            className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
                        >
                            { tableDescription }
                        </div>

                    </div>
                </div>
            }
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
                        placeholder="Type something to record.. "
                        value={ input }
                        onChange={ (e) => setInput(e.target.value) }
                        spellCheck={ false }
                        className="w-full pr-10 focus:outline-none"
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
                <p className="text-center text-xs text-gray-400">
                    Built with{ ' ' }
                    <a
                        href="https://github.com/microsoft/TypeChat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-black"
                    >
                        TypeChat
                    </a>{ ' ' }
                    and{ ' ' }
                    <a
                        href="https://sdk.vercel.ai/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-black"
                    >
                        Vercel AI SDK
                    </a>
                    { ' ' }
                    <a
                        href="https://github.com/ConnectAI-E/Chat-Calculator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-black"
                    >
                        Star the repo on GitHub
                    </a>{ ' ' }
                    .
                </p>
            </div>
        </div>
    );
}
