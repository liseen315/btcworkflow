const path = require('path')
const getEntry = require('./common/getEntry')

//后续需要插件需要在这个方法内实现
let getPlugins = function (env) {
  return []
}

module.exports = function (env, pathConfig) {
  //配置内的相对目录不要乱动.容易出事
  // console.log('----path--',path.resolve(__dirname, '../'))
  return {
    target: "web",
    context: path.resolve(__dirname, '../' + pathConfig.sourceRoot + '/scripts/'),
    entry: getEntry(pathConfig.sourceRoot + '/scripts', 'js'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../' + pathConfig.distRoot + '/static/scripts/')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true,
              // plugins: ['@babel/plugin-transform-runtime'] 这一块插件可以需要在线上验证后再决定加不加
            }
          }
        }
      ]
    },
    mode: env,
    devtool: (env === 'production') ? 'none' : 'eval',
    resolve: {
      extensions: [".js"],
      modules: [path.resolve(__dirname, '../' + pathConfig.sourceRoot), "node_modules"]
    },
    plugins: getPlugins(env),
    performance: {
      hints: "warning",
      maxEntrypointSize: 400000,
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },
  }
}