module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    camelcase: 'off',
    'consistent-return': 'off',
    'no-useless-computed-key': 'off',
  },
};
