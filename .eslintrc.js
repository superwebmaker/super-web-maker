module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['vue', 'prettier'],
  extends: ['plugin:vue/vue3-recommended', 'prettier', 'prettier/vue'],
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-indent': 'off'
  }
};
