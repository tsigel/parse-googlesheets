export const request: typeof fetch = typeof fetch === 'function'
    ? fetch
    : require('node-fetch');