module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
  },
};
