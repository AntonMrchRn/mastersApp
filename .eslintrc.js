module.exports = {
  parser: 'babel-eslint',
  root: true,
  extends: ['@react-native-community/eslint-config'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
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
};
