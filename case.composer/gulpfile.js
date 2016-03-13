var gulp = require('gulp'),
    browserSync = require('browser-sync');

var uglify = require('gulp-uglify');
var fs = require('fs');
var es = require('event-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var path = require('path');

var scriptsPath = 'js/module/';

function getFolders(dir){
    return fs.readdirSync(dir)
      .filter(function(file){
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('browser-sync', function () {
   var files = [
      '*.html',
      'css/theme/default/*.css',
      'js/angular/trogiup/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});

gulp.task('compress_module', function() {
  return gulp.src('js/module/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('min'));
});

gulp.task('service', function() {
  return gulp.src('js/service/*.js')
    .pipe(concat('service.js'))
    .pipe(uglify())
    .pipe(gulp.dest('min'));
});


gulp.task('scripts', function() {
   var folders = getFolders(scriptsPath);

   var tasks = folders.map(function(folder) {
      return gulp.src([ path.join(scriptsPath, folder, '/*.js'), path.join(scriptsPath, folder, '/**/*.js') ])
        .pipe(concat(folder + '.js'))
        .pipe(gulp.dest('concat'))
        .pipe(uglify())
        .pipe(rename(folder + '.min.js'))
        .pipe(gulp.dest('min'));
   });

   return es.concat.apply(null, tasks);
});

gulp.task('darkroom', function() {
  return gulp.src('libs/darkroom/js/plugins/*.js')
    .pipe(concat('darkroom.plugin.js'))
    .pipe(uglify())
    .pipe(gulp.dest('min'));
});

gulp.task('darkroom_build', function() {
  return gulp.src(['libs/darkroom/js/darkroom.js','min/darkroom.plugin.js'])
    .pipe(concat('darkroom.dist.js'))
    .pipe(uglify())
    .pipe(gulp.dest('libs/darkroom/js'));
});

gulp.task('default', ['compress_module', 'service', 'scripts']);
gulp.task('builds', function() {
  return gulp.src('min/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('inqua',['default','builds']);


