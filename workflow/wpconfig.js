const path = require('path')
const getEntry = require('./common/getEntry')
const pathConfig = require('./pathConfig')
const glob = require('glob')

let getPlugins = function (env) {
  return []
}


function getEntryJS(globPath) {
  let entries = {};
  glob.sync(globPath).forEach(function (entry) {
    let basename = path.basename(entry, path.extname(entry))
    let pathname = path.dirname(entry)
    entries[pathname.slice(4, pathname.length) + '/' + basename] = path.resolve(__dirname, pathname + '/' + basename + '.js')
  })
  return entries
}

module.exports = function (env) {
  return {
    target: "web",
    context: __dirname,
    entry: getEntryJS(pathConfig.jsPath),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, "public/static/")
    },
    watch: true,
    mode: env,
    devtool: (env === 'production') ? 'none' : 'eval',
    resolve: {
      extensions: [".js"],
      modules: [path.resolve(__dirname, "src"), "node_modules"]
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