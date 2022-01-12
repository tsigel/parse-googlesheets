const parser = require('./dist/parse-googlesheets.js');

const schema = {
    email: { parse: parser.required(parser.string), columnName: 'email' },
    name: { parse: parser.required(parser.string), columnName: 'name' },
    password: { parse: parser.required(parser.string), columnName: 'password' },
    role: { parse: parser.required(parser.string), columnName: 'role' },
};

parser.loadGoogleSheets(schema, '%D0%9B%D0%B8%D1%81%D1%821', '1KJ_T27szit9qA0NxqgudSWdfA7xIlCKl32FpbrrnL2g', 'AIzaSyA02DRcdeNGrWA6ASsHexwG_W6i8CCPie8')
.then(console.log, console.error);