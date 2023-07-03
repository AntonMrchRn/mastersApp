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
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-useless-escape': 'off',
    'react/display-name': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // React
          ['^react'],
          // Hooks
          ['^(?!@).*hooks.*$'],
          // Another imports
          ['^@?\\w'],
          // Packages.
          ['^@?'],
          // Side effect imports.
          ['^\\u0000'],
          // Api
          ['^(?!@).*api.*$'],
          // Components
          ['^\\.(?!@).*components.*$'],
          // Folders imports.
          ['.*partials.*', '^\\.(?!/?$)', '^\\./?$'],
          // Anything that starts with a style.
          ['^\\./style'],
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
