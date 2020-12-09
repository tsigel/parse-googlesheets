### This is library for parse google sheets


#### example

```typescript
import { parseGoogleSheets } from 'parse-googlesheets';

const schema = {
    dataProperty1: {
        type: 'string' as 'string',
        columnName: 'Column name 1'
    },
    dataProperty2: {
        type: 'number' as 'number',
        columnName: 'Column name 2'
    }
};

const myData = parseGoogleSheets(schema, googlesheets);
```
Where `googlesheets` - data from REST API from google sheets.

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