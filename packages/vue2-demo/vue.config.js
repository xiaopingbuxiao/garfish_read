const isDevelopment = process.env.NODE_ENV === "development";

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: "http://localhost:8080",
  configureWebpack: {
    output: {
      // 开发环境设置 true 将会导致热更新失效
      clean: isDevelopment ? false : true,
      filename: "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].js",
      // 需要配置成 umd 规范
      libraryTarget: "umd",
      // 修改不规范的代码格式，避免逃逸沙箱
      globalObject: "window",
      // webpack5 使用 chunkLoadingGlobal 代替，或不填保证 package.json name 唯一即可
      // jsonpFunction: "garfish-demo-react",
      // 保证子应用的资源路径变为绝对路径
    },
  },
  devServer: {
    // 保证在开发模式下应用端口不一样
    port: "8080",
    headers: {
      // 保证子应用的资源支持跨域，在上线后需要保证子应用的资源在主应用的环境中加载不会存在跨域问题（**也需要限制范围注意安全问题**）
      "Access-Control-Allow-Origin": "*",
    },
  },
});
