const webpack = require('webpack')
const webpackConfig = require('../wpconfig.js')
const log = require('../common/log.js')

let wpConfig = Object.create(webpackConfig(process.env.NODE_ENV))
let compiler = webpack(wpConfig)

module.exports = function (gulp, plugin, pathConfig) {
  gulp.task('buildjs', function (callback) {
    // compiler.watch({aggregateTimeout: 300,},function (err, stats) {
    //   if (err) {
    //     throw new Error('webpack:build-js' + err)
    //   }
    //   log("[webpack:build-js]", stats.toString({
    //     colors: true
    //   }),'GREEN')
    //   callback()
    // })
  })
}