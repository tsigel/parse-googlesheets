### This is library for parse google sheets


#### example

```typescript
import { parseGoogleSheets, number, string } from 'parse-googlesheets';

const schema = {
    dataProperty1: {
        parse: string,
        columnName: 'Column name 1'
    },
    dataProperty2: {
        parse: number,
        columnName: 'Column name 2'
    }
};

const myData = parseGoogleSheets(schema, googlesheets);
```
Where `googlesheets` - data from [REST API](https://www.freecodecamp.org/news/cjn-google-sheets-as-json-endpoint/) from google sheets.

This example for sheets like this:

|Column name 1|Column name 2|
|---|:----:|
|some|1|
|string|2|
|field|3|

Output of `JSON.stringify(myData)`

```json
[
  {
    "dataProperty1": "some",
    "dataProperty2": 1
  },
  {
    "dataProperty1": "string",
    "dataProperty2": 2
  },
  {
    "dataProperty1": "field",
    "dataProperty2": 3
  }
]
```