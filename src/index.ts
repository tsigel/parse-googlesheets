import { request } from './request';

const ifElse = <T>(expression: Func<[T], boolean>, onTrue: Func<[T], any>, onFalse: Func<[T], any>) =>
    (data: T) => expression(data)
        ? onTrue(data)
        : onFalse(data);
const isNil = (data: any): data is (null | undefined) =>
    data === null || data === undefined;

const always = <T>(data: T): Func<[], T> => (): T => data;

const identity = <T>(data: T): T => data;

const toNumberOrNil = (value: string | undefined) => isNaN(Number(value))
    ? undefined
    : Number(value);

const toBooleanOrNil = (value: string | undefined) =>
    (value === 'true' || value === '1')
        ? true
        : (value === 'false' || value === '0')
        ? false
        : undefined;

export const string: (data: string | undefined) => string | undefined = ifElse(
    isNil,
    always(undefined),
    identity
);

export const number: (data: string | undefined) => number | undefined = ifElse(
    isNil,
    always(undefined),
    toNumberOrNil
);

export const boolean: (data: string | undefined) => boolean | undefined = ifElse(
    isNil,
    always(undefined),
    toBooleanOrNil
);

export const required = <T extends Func<[any], any>>(func: T): (param: Parameters<T>[0]) => ReturnType<T> extends infer R ? R extends undefined ? never : R : never => (param) => {
    const result = func(param);
    if (result === undefined) {
        throw new Error('Value is empty!');
    }
    return result;
};

export const defaultTo = <T extends Func<[any], any>, D extends ReturnType<T>>(func: T, def: D): (param: Parameters<T>[0]) => ReturnType<T> extends infer R ? R extends undefined ? D : R : never => (param) => {
    const result = func(param);
    if (result === undefined) {
        return def;
    }
    return result;
};

export const parseGoogleSheets = <T extends Schema>(schema: T, data: SheetsResponse): Array<Row<T>> => {
    const rows = data.feed.entry.reduce<Array<Array<string>>>((acc: Array<Array<string>>, item) => {
        const row = Number(item['gs$cell'].row);
        const cell = Number(item['gs$cell'].col);

        if (!acc[row]) {
            acc[row] = [];
        }

        acc[row][cell] = item.content.$t;

        return acc;
    }, []).filter((rows: Array<string>) => rows.filter(item => !!item));

    const headLine = rows[0];
    const dictionary = Object.entries(schema);

    const indexMap = headLine.reduce((acc: Record<string, { index: number; parse: Func<[string], any> }>, sheetsColumnName, index) => {
        const [dataName, { parse }] = dictionary.find(([key, { columnName }]) => columnName.toLowerCase() === sheetsColumnName.trim().toLowerCase()) ?? [undefined, { type: undefined }];

        if (dataName && parse) {
            acc[dataName] = { index, parse };
        }

        return acc;
    }, Object.create(null));

    return rows.slice(1).map((row) => Object.entries(indexMap).reduce<Row<T>>((acc, [key, {
        index,
        parse
    }]: [keyof T, { index: number; parse: Func<[string], any> }]) => {
        acc[key] = parse(row[index]);
        return acc;
    }, Object.create(null)));
};

export const loadGoogleSheets = <T extends Schema>(schema: T, SheetId: string, SheetListNumber: number = 1): Promise<Array<Row<T>>> =>
    request(`https://spreadsheets.google.com/feeds/cells/${SheetId}/${SheetListNumber}/public/full?alt=json`)
        .then<SheetsResponse>(r => r.ok ? r.json() : r.text().then(message => Promise.reject(message)))
        .then(sheets => parseGoogleSheets<T>(schema, sheets));

type FieldData = {
    parse: Func<[string | undefined], any>;
    columnName: string;
}

export type Schema = {
    [Key: string]: FieldData;
}

export type Row<T extends Schema> = {
    [Key in keyof T]: ReturnType<T[Key]['parse']>;
}

type SheetsResponse = {
    feed: {
        entry: Array<{
            'gs$cell': {
                row: string,
                col: string
            };
            content: {
                '$t': string;
            }
        }>
    }
}

type Func<Arguments extends Array<any>, Return> = (...args: Arguments) => Return;
