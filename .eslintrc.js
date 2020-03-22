module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['vue', 'prettier'],
  extends: ['plugin:vue/essential', 'plugin:prettier/recommended'],
};
