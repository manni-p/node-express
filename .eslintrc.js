module.exports = {
    env: {
        es2021: true,
        node: true,
        'jest/globals': true,
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['import', 'jest'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.ts', '.d.ts', '.tsx'],
            },
        },
    },
    rules: {
        'prettier/prettier': 'error',
        'import/extensions': [0],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['**/*.test.ts', '**/*.test.tsx'] },
        ],
    },
};
