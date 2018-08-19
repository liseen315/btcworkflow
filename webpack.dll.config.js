const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    vendors: [
      'jquery',
      'es6-promise',
      'vue',
      'vuex',
      'lodash',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public/static/scripts'),
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname,'public/static/scripts', '[name].manifest.json'),
    })
  ]
}