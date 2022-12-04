const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: () => {
    return {
      entry: './src/main.js',
      output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        libraryTarget: 'umd',
        globalObject: 'window',
      },
    };
  },
  devServer: {
    // inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 8888,
    // historyApiFallback: true,
    // disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
