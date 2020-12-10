import { request } from './request';

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

    const indexMap = headLine.reduce((acc: Record<string, { index: number; type: 'string' | 'number' }>, sheetsColumnName, index) => {
        const [dataName, { type }] = dictionary.find(([key, { columnName }]) => columnName.toLowerCase() === sheetsColumnName.trim().toLowerCase()) ?? [undefined, { type: undefined }];

        if (dataName && type) {
            acc[dataName] = { index, type };
        }

        return acc;
    }, Object.create(null));

    const toNumber = (value: string): number | undefined => isNaN(Number(value)) ? undefined : Number(value);

    return rows.slice(1).map((row) => Object.entries(indexMap).reduce<Row<T>>((acc, [key, { index, type }]: [string, any]) => {
        // @ts-ignore
        acc[key] = type === 'string' ? row[index] : toNumber(row[index]);
        return acc;
    }, Object.create(null)));
};

export const loadGoogleSheets = (SheetId: string, schema: any, SheetListNumber: number = 1) =>
    request(`https://spreadsheets.google.com/feeds/cells/${SheetId}/${SheetListNumber}/public/full?alt=json`)
        .then(r => r.json())
        .then(sheets => parseGoogleSheets(schema, sheets));

type FieldData = {
    type: 'string' | 'number';
    columnName: string;
}

type Schema = {
    [Key: string]: FieldData;
}

type Row<T extends Schema> = {
    [Key in keyof T]?: T[Key]['type'] extends 'string' ? string : number;
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
