// Load plugins
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver')
    cache = require('gulp-cache')

// img
gulp.task('img', function() {
  return gulp.src('public/upload/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/upload'))
    .pipe(livereload());
});


// Watch
gulp.task('watch', function() {

  // Watch image files
  gulp.watch('static/img/*', ['img']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['public/**']).on('change', livereload.changed);

});

//Build
// gulp.task('build', ['clean'], function() {
//     gulp.start('html','css', 'js', 'img');
// });
gulp.task('build', ['html','css', 'js', 'img']);

//Server
gulp.task('server', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
  gulp.start('watch');
});

// Default task
gulp.task('default', ['build']);
