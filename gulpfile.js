var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
 
gulp.task('scss', function () {
  return gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
        stream:true
    }))
});

gulp.task('html', function(){
    return gulp.src('*.html')
})



gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
})
 
gulp.task('watch',['browser-sync', 'scss'] , function () {
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('**/*.html', browserSync.reload);
});
