const path = require('path')
require('babel-polyfill');

module.exports = {
  mode: 'development',
  entry: {
    app: ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}