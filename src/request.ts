export const request: typeof fetch = typeof fetch === 'function'
    ? fetch.bind(window)
    : require('node-fetch');