var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task('live-server', function(){
  var server = new LiveServer('server/main.js');
  server.start();
})

gulp.task('serve',['bundle', 'live-server'], function(){
  browserSync.init(null,{
    proxy:'http://localhost:7777',
    port: 9001,
    notify: false,
    browser: 'chrome',
    open: 'Local',
    files: [

    ]
  })
  gulp.watch("app/*.css", ['copy']);
  gulp.watch("app/*.js").on('change', browserSync.reload);
  gulp.watch("app/**").on('change', browserSync.reload);
})

gulp.task('bundle',['copy'], function(){
  return browserify({
    entries: 'app/main.jsx',
    debug: true,
  })
  .transform(reactify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./.tmp')).pipe(browserSync.stream());
})

gulp.task('coy', function(){
  gulp.src(['app/style.css', 'bower_components/skeleton/css/*'])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./.tmp'));
});
gulp.task('copy', function(){
  gulp.src(['app/*.css'])
  .pipe(gulp.dest('./.tmp'))
  .pipe(browserSync.stream());
})
