module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['features/*/**'],
            message:
              'Import feature APIs from features/<feature>, not implementation paths.',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/features/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['features/*/**'],
                message:
                  'Import feature APIs from features/<feature>, not implementation paths.',
              },
              {
                group: ['app/store', 'app/store/**'],
                message:
                  'Feature modules must not depend directly on app store composition.',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['src/shared/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  'features',
                  'features/*',
                  'features/*/**',
                  'app',
                  'app/*',
                  'app/*/**',
                ],
                message:
                  'Shared modules must not depend on app or feature modules.',
              },
            ],
          },
        ],
      },
    },
  ],
};
