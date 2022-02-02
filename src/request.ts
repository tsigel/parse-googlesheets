import * as http from 'http';

const getContext = (function (root) {
    return (): any => typeof window === 'undefined' ? root : window;
    // @ts-ignore
})(this);

const getNodeRequest = (): FetchLike => {
    const makeRequest = (url: string): Promise<http.IncomingMessage> => {
        const https = require('https');
        return new Promise((resolve, reject) => {
            try {
                https.request(url, resolve).end();
            } catch (e) {
                reject(e);
            }
        });
    };

    const makeBodyPromise = (message: http.IncomingMessage): Promise<string> => new Promise((resolve, reject) => {
        let data = '';
        const onHandler = (buffer: Buffer) => {
            data += buffer;
        };
        const onEnd = () => {
            resolve(data);
            message.off('data', onHandler);
        };
        const onError = (e: Error) => {
            reject(e);
            message.off('data', onHandler);
        }

        message.on('data', onHandler);
        message.once('end', onEnd);
        message.once('error', onError);
    });


    return (url: string) => {
        return makeRequest(url)
            .then((message) => {
                const bodyPromise = makeBodyPromise(message);
                return {
                    ok: message.statusCode === 200,
                    status: message.statusCode,
                    json: () => bodyPromise.then((data) => JSON.parse(data)),
                    text: () => bodyPromise
                } as Response;
            });
    };
};

const context = getContext();

export const request: FetchLike =
    context && typeof context.fetch !== 'undefined'
        ? context.fetch.bind(context) as FetchLike
        : getNodeRequest();

type Response = {
    ok: boolean;
    json: <T>() => Promise<T>;
    text: <T>() => Promise<string>;
    status: number;
}

type FetchLike = (url: string) => Promise<Response>;
