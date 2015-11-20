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

gulp.task('tests', ['scripts'], (done) => {
  return karma.server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: (process.env.TRAVIS) ? true : false
  }, done);
});

gulp.task('default', ['scripts']);

