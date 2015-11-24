'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import karma from 'karma';

gulp.task('scripts', () => {
  return gulp.src('src/*.js')
  .pipe($.uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('styles', () => {
  return gulp.src('src/*.scss')
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('tests', ['scripts'], (done) => {
  return karma.server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: (process.env.TRAVIS) ? true : false
  }, done);
});

gulp.task('demo', ['scripts', 'styles'], function() {
  $.connect.server({
    root: ['demo', 'bower_components', 'dist'],
    livereload: true
  });
});

gulp.task('default', ['scripts', 'styles']);

