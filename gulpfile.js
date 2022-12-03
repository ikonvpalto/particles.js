'use strict';

const gulp = require('gulp');
const gulpUtil = require('gulp-util');
const argv = require('yargs').argv;
const clean = require('gulp-clean');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');

const rename = require('gulp-rename');

gulp.task('jshint', function () {
  return gulp.src('./src/*')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build:clean', function () {
  return gulp.src(['./dist'])
      .pipe(clean({force: true}));
});

gulp.task('build:full', function () {
  return gulp.src('./src/*')
      .pipe(gulp.dest('./dist/'));
});

gulp.task('build:compressed', function () {
  return gulp.src('./src/*')
      .pipe(uglify({
        output: {
          comments: 'some'
        }
      }))
      .on('error', function (err) {
        gulpUtil.log(gulpUtil.colors.red('[Error]'), err.toString());
      })
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/'));
});

if (argv.watch) {
  gulp.watch('./src/*', ['build']);
}

gulp.task('build', gulp.series('jshint', 'build:clean', 'build:full', 'build:compressed'));
