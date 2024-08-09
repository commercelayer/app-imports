const path = require('path')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, 'tsconfig.json'),
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': [
      'error',
      {
        // requried for react hooks
        // https://eslint.org/docs/latest/rules/no-unused-vars#destructuredarrayignorepattern
        destructuredArrayIgnorePattern: '^_'
      }
    ]
  }
}
