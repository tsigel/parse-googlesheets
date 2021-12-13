import { parseGoogleSheets, number, string, boolean, required } from '../src';
import { data } from './data';

describe('Google sheets parse', () => {

    const schema = {
        name: {
            parse: required(string),
            columnName: 'name'
        },
        index: {
            parse: required(number),
            columnName: 'index'
        },
        boolean: {
            parse: required(boolean),
            columnName: 'boolean'
        },
        date: {
            parse: required(string),
            columnName: 'date'
        }
    };

    it('Check parse', () => {
        const parsed = parseGoogleSheets(schema, data);
        expect(parsed).toEqual([
            {
                'name': 'Valentin',
                'index': 0,
                'boolean': true,
                'date': '01.02.2021',
            },
            {
                'name': 'Jon',
                'index': 1,
                'boolean': true,
                'date': '02.02.2021',
            },
            {
                'name': 'Sem',
                'index': 2,
                'boolean': true,
                'date': '03.02.2021',
            },
            {
                'name': 'Sandra',
                'index': 3,
                'boolean': false,
                'date': '04.02.2021',
            },
            {
                'name': 'Fill',
                'index': 4,
                'boolean': false,
                'date': '05.02.2021',
            },
        ]);
    });
});
