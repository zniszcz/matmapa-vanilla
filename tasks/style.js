'use strict';

const sass = require('gulp-sass');
const rev = require('gulp-rev');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const gutil = require('gulp-util');

const postcssTasks = [
  autoprefixer(),
];

const postcssTasksProd = [
  autoprefixer(),
  cssnano(),
];

module.exports = gulp => {

  // -- Unit style tasks

  gulp.task('sass', () => {
    return gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postcssTasks))
      .pipe(gulp.dest('./dist/css'));
  });

  gulp.task('sass:prod', () => {
    return gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postcssTasksProd))
      .pipe(rename('app.min.css'))
      .pipe(rev())
      .pipe(gulp.dest('./dist/css'));
  });

  // -- Main style tasks

  gulp.task('style', ['sass'], () => {
    gulp.watch('./src/scss/**/*.scss', ['sass']);

    return gutil.log('Task for serving stylesheets in developer mode.');
  });

  gulp.task('style:prod', ['sass:prod'], () => {
    return gutil.log('Task for building stylesheets in production mode.');
  });

};
