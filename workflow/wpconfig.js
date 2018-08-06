const path = require('path')
const pathConfig = require('./pathConfig')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const HappyPack = require('happypack')
const getEntry = require('./common/getEntry')
//后续需要插件需要在这个方法内实现
let getPlugins = function (env) {
  let pluginList = []
  pluginList.push(
    new UglifyJsPlugin(
      {
        test: /\.js($|\?)/i,
        include: path.resolve(__dirname, '../' + pathConfig.sourceRoot + '/script/**/*.js'),
        uglifyOptions: {
          ie8: false,
          ecma: 8,
          warnings: false,
        }
      }
    ),
    // new HappyPack({
    //   loaders: [{
    //     loader: 'babel-loader',
    //     query: {
    //       cacheDirectory: true,
    //       presets: ['@babel/preset-env'],
    //     }
    //   }]
    // })
  )
  return pluginList
}

module.exports = function (env, pathConfig) {
  // //配置内的相对目录不要乱动.容易出事
  return {
    target: "web",
    context: path.resolve(__dirname, '../' + pathConfig.sourceRoot + '/scripts'),
    entry: getEntry(pathConfig.sourceRoot + '/scripts', 'js'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../' + pathConfig.distRoot + '/static/scripts')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, '../' + pathConfig.sourceRoot + '/script/**/*.js'),
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true, //开缓存会降150+ms
              plugins: ['@babel/plugin-transform-runtime'] //这一块插件可以需要在线上验证后再决定加不加
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
    externals: {
      jquery: 'window.jQuery'
    },
    performance: {
      hints: "warning",
      maxEntrypointSize: 400000,
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },
  }
}