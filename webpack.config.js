const { resolve, join } = require('path');
const webpack = require('webpack');

const getGeneralConfig = (minimize) => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: resolve('tsconfig.json'),
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ['node_modules']
    },
    mode: minimize ? "production" : "development",
    devtool: minimize ? 'source-map' : "inline-source-map",
    target: 'node'
})

const build = (minimize) => ({
    ...getGeneralConfig(minimize),
    entry: join(__dirname, 'src/index.ts'),
    optimization: {
        minimize,
    },
    plugins: [
    ],
    output: {
        libraryTarget: "umd",
        globalObject: "this",
        filename: minimize ? 'parse-googlesheets.min.js' : 'parse-googlesheets.js',
        path: resolve(__dirname, 'dist'),
    }
});

module.exports = [
    build(true),
    build(false)
];
