const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dev-bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    open: 'google-chrome',
    port: 8080,
    hot: true,
    writeToDisk: true,
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
        },
      },
      exclude: '/node_modules/',
    }]
  }
};
