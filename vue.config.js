module.exports = {
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