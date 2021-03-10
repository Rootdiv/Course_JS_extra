const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dev-bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    open: true,
    port: 8080,
    hot: true,
    writeToDisk: true,
  },
  mode: 'development',
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
