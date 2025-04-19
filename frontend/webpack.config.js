const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // injects CSS into the DOM
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    // new webpack.DefinePlugin({ //may need to delete later
    //   "process.env": {
    //     // This has effect on the react lib size
    //     NODE_ENV: JSON.stringify("production"),
    //   },
    // }),
  ],
};