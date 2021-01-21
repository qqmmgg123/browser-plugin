module.exports = {
  publicPath: './',
  outputDir: 'download',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "下载器";
        args[0].filename = "download.html"
        return args;
      })
  },
  configureWebpack: config => {
    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js';
  },
  devServer: {
    host: "0.0.0.0",
    port: "8081",
    https: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "/root/common-assets/basic.scss";
          @import "/root/common-assets/common.scss";
        `
      }
    }
  }
}