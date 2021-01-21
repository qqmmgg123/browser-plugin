const _7z = require('7zip-min');
class webpack7zip {
  // 构造函数
  constructor(options) {
    console.log("webpack7zip", options);
  }
  // 应用函数
  apply(compiler) {
    // 绑定钩子事件
    compiler.hooks.done.tap("webpack7zip", () => {
      _7z.pack('./download/', './download.7z', err => {
        console.log(err);
      });
    });
  }
}

module.exports = webpack7zip;
