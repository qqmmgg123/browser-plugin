const webpack = require('webpack');
const webpack7zip = require("./webpack7z");
const isProduction = process.env.NODE_ENV === 'production';

let plugins = [
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  })
]
  , webpack7z = new webpack7zip()
isProduction && plugins.push(webpack7z)
module.exports = {
  publicPath: './',
  outputDir: 'download',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "下载器";
        args[0].filename = "download.html"
        return args;
      });
    /* isProduction && config.optimization
      .minimizer('terser')
      .tap(args => {
        Object.assign(args[0].terserOptions.compress, {
          pure_funcs: ['console.log']
        })
        return args
      }); */
  },
  configureWebpack: config => {
    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js';
    config.plugins = [...config.plugins, ...plugins]
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