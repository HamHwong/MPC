const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
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
      .set('@scss',resolve('./packages/Scss'))
      .set('@hooks',resolve('./packages/Hooks'))
      .set('@utils', resolve('./packages/Utils'))
      .set('@validators', resolve('./packages/Validators'))
      .set('@', resolve('./packages'))

    
  },
  configureWebpack: config=>{ 
    if(process.env.NODE_ENV ==='production'){
      config.plugins = config.plugins.concat([new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })]) 
    }
  }
}
