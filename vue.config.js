const path = require("path");
function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  
  css: { extract: false },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
      
    // const imagesRule = config.module.rule('pdf')
    // imagesRule.uses.clear()
    // imagesRule.use('file-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 10240,
    //     fallback: {
    //       loader: 'file-loader',
    //       options: {
    //         outputPath: 'static/images'
    //       }
    //     }
    //   })

    config.resolve
      .alias
      .set('@utils', resolve('./packages/Mpanda.Utils'))
  }
};