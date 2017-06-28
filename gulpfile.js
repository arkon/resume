'use strict';

var gulp = require('gulp');
var del = require('del');
var ghPages = require('gulp-gh-pages');
var sass = require('gulp-sass');

var PATHS = {
  html: './src/index.html',
  styles: './src/styles/**/*.scss',
  build: './build/'
};

gulp.task('clean', function() {
  return del(PATHS.build);
});

gulp.task('sass', function() {
  return gulp.src(PATHS.styles)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('copy-html', function() {
   return gulp.src(PATHS.html)
      .pipe(gulp.dest(PATHS.build));
})

gulp.task('build', ['clean', 'sass', 'copy-html']);

gulp.task('watch', ['build'], function() {
  gulp.watch([PATHS.html, PATHS.styles], ['build']);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(PATHS.build + '**/*')
    .pipe(ghPages());
});
