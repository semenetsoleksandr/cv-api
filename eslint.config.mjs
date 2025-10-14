import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser
        },
        plugins: {
            '@stylistic': stylistic,
        },

        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/quotes': ['error', 'double'],
            '@stylistic/jsx-quotes': ['error', 'prefer-double'],
        },
    },
];
