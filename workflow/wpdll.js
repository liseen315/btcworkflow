const pathConfig = require('./pathConfig')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    vendors: [
      'jquery',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../' + pathConfig.distRoot + '/static/scripts'),
    filename: '[name].js',
    library: '[name]',
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[chunkhash]', //和output.library中一致，也就是输出的manifest.json中的 name值
      path: path.resolve(__dirname, '../' + pathConfig.distRoot + '/static/scripts', '[name].manifest.json'),
      context: path.resolve(__dirname, '../' + pathConfig.sourceRoot + '/scripts'),
    })
  ]
}