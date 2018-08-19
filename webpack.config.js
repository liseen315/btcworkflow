const path = require('path')
const getEntry = require('./workflow/common/getEntry')
const webpack = require('webpack')

//后续需要插件需要在这个方法内实现
let getPlugins = function (env) {
  let pluginList = [
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./public/static/scripts/vendors.manifest.json')
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
  return pluginList
}

module.exports = function (env, pathConfig) {
  // //配置内的相对目录不要乱动.容易出事
  return {
    context: path.resolve(__dirname,'src/scripts'),
    entry: getEntry(pathConfig.sourceRoot + '/scripts', 'js'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, pathConfig.distRoot + '/static/scripts')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true, //开缓存会降150+ms
              //plugins: ['@babel/plugin-transform-runtime'] //这一块插件可以需要在线上验证后再决定加不加
            }
          }
        }
      ]
    },
    mode: env,
    devtool: (env === 'production') ? 'none' : 'cheap-module-eval-source-map',
    plugins: getPlugins(env),
    // externals: {
    //   jquery: 'window.jQuery'
    // },
    performance: {
      hints: false,
      maxEntrypointSize: 400000,
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },
  }
}