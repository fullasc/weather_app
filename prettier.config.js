module.exports = {
  // Base
  semi: false,
  singleQuote: true,

  // Vue
  vueIndentScriptAndStyle: true,

  // Imports
  importOrder: [
    // Libraries

    // CSS
    '[.]css',
    '^./[a-zA-Z0-9]+$',

    // Components
    '^~icons/(.*)',
    '^/src/components(.*)',
    '^./components(.*)',
    '(.*)[.]vue$',

    // Assets
    '^/src/assets(.*)',
    '^./assets(.*)',

    // Else
    '^[./](.*)',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  // Plugins
  pluginSearchDirs: false,
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-organize-attributes'),
    require.resolve('prettier-plugin-css-order'),
    require('prettier-plugin-tailwindcss'),
  ],
}
