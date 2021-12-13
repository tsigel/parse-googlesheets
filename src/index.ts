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
    ['true', '1'].includes(value?.toLocaleLowerCase() || '')
        ? true
        : ['false', '0'].includes(value?.toLocaleLowerCase() || '')
            ? false
            : undefined;

export const toDateOrNil = (pattern: string) => (dateToParse: string | undefined) => {
    return dateToParse ? date(pattern)(dateToParse) : undefined;
};

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

export const date: (pattern: string) => (date: string | undefined) => string | undefined = (pattern: string) => ifElse(
    isNil,
    always(undefined),
    toDateOrNil(pattern)
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
    const rows = data.values;

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

export const loadGoogleSheets = <T extends Schema>(schema: T, Range: string, SheetId: string, apiKey: string): Promise<Array<Row<T>>> =>
    request(`https://sheets.googleapis.com/v4/spreadsheets/${SheetId}/values/${Range}?key=${apiKey}`)
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
    range: string;
    majorDimension: string;
    values: Array<Array<string>>;
}

type Func<Arguments extends Array<any>, Return> = (...args: Arguments) => Return;
