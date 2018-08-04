const path = require('path')
const getEntry = require('./common/getEntry')

let getPlugins = function (env) {
  return []
}

module.exports = function (env,pathConfig) {
  //配置内的相对目录不要乱动.容易出事
  return {
    target: "web",
    context: path.resolve(__dirname,'../'+pathConfig.sourceRoot+'/scripts/'),
    entry: getEntry(pathConfig.sourceRoot+ '/scripts','js'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname,'../'+pathConfig.distRoot+'/static/scripts/')
    },
    watch: true,
    mode: env,
    devtool: (env === 'production') ? 'none' : 'eval',
    resolve: {
      extensions: [".js"],
      modules: [path.resolve(__dirname,'../'+pathConfig.sourceRoot), "node_modules"]
    },
    plugins: getPlugins(env),
    performance: {
      hints: "warning",
      maxEntrypointSize: 400000,
      assetFilter: function(assetFilename) {
        return  assetFilename.endsWith('.js');
      }
    },
  }
}