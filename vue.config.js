const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  css: { extract: true },
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .include.add('/packages/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
    config.resolve.alias
      .set('@', resolve('./packages'))
      .set('@scss',resolve('./packages/Scss'))
      .set('@utils', resolve('./packages/Mpanda.Utils'))
      .set('@validators', resolve('./packages/Mpanda.Validators'))
  },
  configureWebpack: {
    module: {
      unknownContextCritical: false,
    },
  },
}
