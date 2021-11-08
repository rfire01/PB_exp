module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: "localhost"
  },
  // publicPath: '/participitory_budgeting/'
  // publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/"};
};
