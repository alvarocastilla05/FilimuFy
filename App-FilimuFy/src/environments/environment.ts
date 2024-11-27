export const environment = {
    apiBaseUrl: 'https://api.themoviedb.org/3',
    apiKey: '330dac319c12144e2cfd7dfb4bfcb9fd',
    sessionId: localStorage.getItem('session_id'),
    accountId: parseInt(localStorage.getItem('account_id') ?? '0', 10),
};
