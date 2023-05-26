module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // React
          ['^react'],
          // Packages.
          ['^@?\\w'],
          // Side effect imports.
          ['^\\u0000'],
          // Api
          ['^(?!@).*api.*$'],
          // Components
          ['^\\.(?!@).*components.*$'],
          // Hooks
          ['^(?!@).*hooks.*$'],
          // Relative imports, put parent imports last
          ['^\\./(?=.*/)(?!/?$)', '^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Folders imports.
          ['.*partials.*', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      js: true,
    },
  },
  env: {
    node: true,
  },
};
