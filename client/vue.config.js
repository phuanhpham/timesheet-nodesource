const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
  },
  configureWebpack: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
});
