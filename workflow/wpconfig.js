const path = require('path')
const getEntry = require('./common/getEntry')
const webpack = require('webpack')
//后续需要插件需要在这个方法内实现
let getPlugins = function (env) {
  return [new webpack.optimize.SplitChunksPlugin({
    chunks: "all",
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true
  })]
}

module.exports = function (env, pathConfig) {
  // //配置内的相对目录不要乱动.容易出事
  // console.log('----path--',path.resolve(__dirname,'../node_modules/'))
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