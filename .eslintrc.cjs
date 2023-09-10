module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:prettier/recommended', '@nuxt/eslint-config'],
  plugins: ['prettier'],
  rules: {
    'vue/html-closing-bracket-spacing': 'error',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-end-tags': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
