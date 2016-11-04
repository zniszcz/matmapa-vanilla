'use strict';

const eslint = require('gulp-eslint');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const config = require('./config');
const sourcemaps = require('gulp-sourcemaps');
const dedupe = require('gulp-dedupe');

module.exports = gulp => {

  // -- Unit script tasks

  gulp.task('build-javascript', () => {
    return gulp.src(config.concatOrder.js)
      .pipe(sourcemaps.init())
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(babel())
      .pipe(dedupe())
      .pipe(concat('app.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.path.js));
  });

  gulp.task('build-javascript:prod', () => {
    return gulp.src(config.concatOrder.js)
      .pipe(babel())
      .pipe(dedupe())
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest(config.path.js));
  });

  // -- Main script tasks

  // Task for serving scripts in developer mode.
  gulp.task(
    'javascript',
    [
      'build-javascript',
    ]
  );

  // Task for building scripts in production mode.
  gulp.task(
    'javascript:prod',
    [
      'build-javascript:prod',
    ]
  );
};
