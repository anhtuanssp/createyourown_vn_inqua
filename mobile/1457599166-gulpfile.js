var gulp = require('gulp'),
    path = require('path'),
	webpack = require('webpack-stream'),
	configs = require(path.resolve('../../', 'webpack.config'));

gulp.task('default', function() {
  return gulp.src('./module.js')
    .pipe(webpack(configs))
    .pipe(gulp.dest('dist/'));
});
