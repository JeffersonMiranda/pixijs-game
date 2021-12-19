const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: path.join(__dirname, 'dist/assets/') }
      ]
    }),
  ],
  devServer: {
    compress: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    }
  }
})