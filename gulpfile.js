const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const pathConfig = require('./workflow/pathConfig')
const requireDir = require('require-dir')
const clean = require('del')
const glob = require('glob')
const path = require('path')
const webpack = require('webpack')

gulpLoadPlugins.hashAssets = require('gulp-md5-assets')
gulpLoadPlugins.imagemin = require('gulp-imagemin')
gulpLoadPlugins.gulpSass = require('gulp-sass')
gulpLoadPlugins.gulpPlumber = require('gulp-plumber')
gulpLoadPlugins.autoprefixer = require('gulp-autoprefixer')
gulpLoadPlugins.cssnano = require('gulp-cssnano')

function getEntryJS(globPath) {
  let entries = {};
  glob.sync(globPath).forEach(function (entry) {
    let basename = path.basename(entry, path.extname(entry))
    let pathname = path.dirname(entry)
    entries[pathname.slice(4, pathname.length) + '/' + basename] = path.resolve(__dirname, pathname + '/' + basename + '.js')
  })
  return entries
}

const compiler = webpack({
  target: "web",
  context: __dirname,
  entry: getEntryJS(pathConfig.jsPath),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "public/static/")
  },
  watch: true,
  mode: process.env.NODE_ENV,
  devtool: (process.env.NODE_ENV === 'production') ? 'none' : 'eval',
  resolve: {
    extensions: [".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  plugins: [],
  performance: {
    hints: "warning",
    maxEntrypointSize: 400000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    }
  },
})


requireDir('./workflow/tasks/', {
  mapKey: function (value, baseName) {
    value(gulp, gulpLoadPlugins, pathConfig)
  }
})

gulp.task('watch', function () {
  gulp.watch(pathConfig.scssPath, ['scss'])
})

gulp.task('compileJS', function (callback) {
  compiler.watch({ aggregateTimeout: 300, }, function (err, stats) {
    if (err) {
      throw new Error('webpack:build-js' + err)
    }
    console.log(stats.toString({colors:true,chunks:false}))
  })
})

gulp.task('del', function () {
  return clean(['public/static/**/*'], { force: true })
})

gulp.task('release', ['hash:css','hash:js'])

gulp.task('default', ['image', 'scss', 'compileJS', 'watch'])