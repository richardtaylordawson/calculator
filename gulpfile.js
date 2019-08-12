const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');

gulp.task('css', function() {
  return gulp.src('_src/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src('_src/js/index.js')
      .pipe(rollup({
        plugins: [babel()]
      }, {
        format: 'cjs',
      }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('html', function() {
  return gulp.src('_src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', function(){
  return gulp.src('_src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
});

gulp.task('watch', ['browserSync', 'css'], function() {
  gulp.watch('_src/css/**/*.css', ['css']);
  gulp.watch('_src/images/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
  gulp.watch('_src/**/*.html', ['html']);
  gulp.watch('_src/js/**/*.js', browserSync.reload);
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['css', 'js', 'html', 'images'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['css', 'js', 'html', 'images', 'clean:dist', 'browserSync', 'watch'],
    callback
  )
});
