module.exports = {
    setupFiles: ['./jest.setup.js'],
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        html: '<html lang="en"><body></body></html>',
        url: 'https://jestjs.io/',
        userAgent: 'Agent/007',
    },
    transform: {
        "^.+\\.js$": "babel-jest"
    },
};
