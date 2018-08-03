module.exports = function (gulp,plugin,pathConfig) {
  gulp.task('image', function (done) {
    gulp.src(pathConfig.imgPath)
      .pipe(plugin.imagemin())
      .pipe(gulp.dest(pathConfig.distRoot + 'images'))
      .on('end', done);
  })
}