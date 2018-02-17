'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');//runs a local dev server
var open = require('gulp-open');//open a url in the web browser
var browserify = require('browserify');//bundleJS
var reactify = require('reactify');//transform JSX to JS
var source = require('vinyl-source-stream');//use convential text streams with gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint');//lint js files incuding jsx

var config = {
  port: 8000,
  devBaseURL: 'http://localhost',
  paths : {
    html: './src/*.html',
    js: './src/**/*.js',
    images: './src/images/*',
    css: [
      './src/css/*',
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/toastr/toastr.scss'
    ],
    dist: './dist',
    mainJs: './src/main.js'
  }
};

//start a dev server
gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseURL,
    livereload: true
  });
});

gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
    .pipe(open({ uri: config.devBaseURL + ':' + config.port + '/'}));
});

gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('css', function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload());
});

gulp.task('images', function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function(){
  return gulp.src(config.paths.js)
      .pipe(lint({configFile: 'eslint.json'}))
      .pipe(lint.format())
});

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task('default',['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);
