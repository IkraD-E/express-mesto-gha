module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-essential',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'vue',
  ],
  rules: {
  },
  allow: [
    '_id',
  ],
};
