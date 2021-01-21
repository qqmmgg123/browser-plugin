module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    // 命令
    "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint"
    },
    "dependencies": {
      "7zip-min": "^1.3.0",
      "core-js": "^3.6.5",
      "node-7z": "^2.1.2",
      "vue": "^2.6.11",
      "vue-i18n": "^8.22.2"
    },
    "devDependencies": {
      "@vue/cli-plugin-babel": "~4.5.0",
      "@vue/cli-plugin-eslint": "~4.5.0",
      "@vue/cli-service": "~4.5.0",
      "babel-eslint": "^10.1.0",
      "eslint": "^6.7.2",
      "eslint-plugin-vue": "^6.2.2",
      "node-sass": "^5.0.0",
      "pug": "^3.0.0",
      "pug-plain-loader": "^1.1.0",
      "sass-loader": "^10.1.0",
      "vue-template-compiler": "^2.6.11"
    },
    "eslintConfig": {
      "root": true,
      "env": {
        "node": true
      },
      "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
      ],
      "parserOptions": {
        "parser": "babel-eslint"
      },
      "rules": {
        "no-undef": 0,
        "no-unused-vars": 0
      }
    },
  });
  // 复制template模版
  api.render('./templete');
};
