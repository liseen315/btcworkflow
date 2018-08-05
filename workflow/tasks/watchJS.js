const webpack = require('webpack')
const webpackConfig = require('../wpconfig')

module.exports = function (gulp, plugin, pathConfig) {
  let wpConfig = webpackConfig(process.env.NODE_ENV,pathConfig)
  let compiler = webpack(wpConfig)
  gulp.task('watchJS', function (callback) {
    compiler.watch({},function (err, stats) {
      if (err) {
        throw new Error('webpack:build-js' + err)
      }
      console.log(stats.toString({colors:true,chunks:false}))
    })
  })
}