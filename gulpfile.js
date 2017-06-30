'use strict';

const gulp    = require('gulp');
const del     = require('del');
const ghPages = require('gulp-gh-pages');
const sass    = require('gulp-sass');

const PATHS = {
  html   : './src/index.html',
  styles : './src/styles/**/*.scss',
  build  : './build/'
};

gulp.task('clean', () => del(PATHS.build, { force: true }));

gulp.task('sass', () =>
  gulp.src(PATHS.styles)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(PATHS.build)));

gulp.task('copy-html', () =>
   gulp.src(PATHS.html)
      .pipe(gulp.dest(PATHS.build)));

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'copy-html')));

gulp.task('watch', gulp.series('build', () => gulp.watch([PATHS.html, PATHS.styles], gulp.series('build'))));

gulp.task('deploy', gulp.series('build', () =>
  gulp.src(PATHS.build + '**/*')
    .pipe(ghPages())));
