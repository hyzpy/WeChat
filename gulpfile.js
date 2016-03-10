var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),	
    cssmin = require('gulp-cssnano'),
   	rename = require('gulp-rename'),
   	htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer')
    jsmin = require('gulp-uglify');
 
gulp.task('build_css', function() {
    gulp.src('sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(cssmin())
        .pipe(rename(function (path) {
              path.basename += '.min';
            })) 
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());

});
gulp.task('build_html', function () {
	console.log('huye111');
  gulp.src('pages/*.html')
    // .pipe(wrap({
    //   src: 'layout/layout.html'
    // }))
    .pipe(gulp.dest('dist/'));
});
gulp.task('build_javascript',function(){
	console.log('huye11');
	gulp.src('js/*.js')
		.pipe(gulp.dest('dist/js'));
});
gulp.task('watch', function () {
	console.log('huye1');
	livereload.listen();
  	gulp.watch(['sass/*.scss', 'pages/*.html','js/*.js'], ['build_css', 'build_html','build_javascript']);
});

gulp.task('default', ['build_css','build_html','build_javascript','watch']);
