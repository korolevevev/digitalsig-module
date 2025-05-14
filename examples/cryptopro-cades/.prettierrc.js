module.exports = {
    semi: true,
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    arrowParens: 'always',
    trailingComma: 'all',
    endOfLine: process.env.CI ? 'auto' : 'lf',
};
