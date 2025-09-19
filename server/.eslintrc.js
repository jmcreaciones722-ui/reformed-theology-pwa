module.exports = {
    env: {
        node: true,
        es2020: true
    },
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
        '@typescript-eslint/no-explicit-any': 'warn'
    }
};
