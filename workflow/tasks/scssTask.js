module.exports = function (gulp,plugin,pathConfig) {
  gulp.task('scss', function () {
    gulp.src(pathConfig.scssPath)
      .pipe(plugin.gulpPlumber())
      .pipe(plugin.gulpSass({ outputStyle: 'compressed' }).on('error', plugin.gulpSass.logError))
      .pipe(plugin.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(plugin.cssnano())
      .pipe(gulp.dest(pathConfig.distRoot + 'static/styles/'))
  })
}