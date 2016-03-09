
// gulp.task('sass', function () {
//   gulp.src('sass/main.scss')
//     .pipe(sass())
//     .pipe(rename(function (path) {
//       path.basename += '.min';
//     }))
//     .pipe(gulp.dest('dist/css'));
// });
var gulp = require('gulp'),
    less = require('gulp-sass'),
    livereload = require('gulp-livereload'),	
    cssmin = require('gulp-cssnano'),
   	rename = require('gulp-rename'),
   	htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('two',['one'],function(){ console.log('two is done'); });
 
gulp.task('less', function() {
    gulp.src('sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(cssmin()) 
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());

});
// gulp.task('testRev', function () {
//     gulp.src('index.html')
//         .pipe(rev())
//         .pipe(gulp.dest('dist/html'));
// });
gulp.task('watch', function() {//关闭后监听事件结束(Ctrl + C 或右上)
    livereload.listen();
    gulp.watch('src/less/**/*.less', ['less']); //（自动编译less）当所有less文件发生改变时，调用testLess任务
});

/*测试event*/
gulp.task('watch1', function() {
    gulp.watch('src/less/index.less',function(event){
		console.log(event.type);
	    console.log(event.path);
    });
});

//木板插件
gulp.src("./index.html")
    .pipe(wrap({ src: 'path/to/head,html'}))
    .pipe(gulp.dest("./dist"));

 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径
/*gulp-less*/
//1定义一个testLess任务（自定义任务名称）
gulp.task('testLess1', function () {
    gulp.src(['src/less/index.less','src/less/index1.less']) //该任务针对的文件,多个文件以数组形式传入
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css'))//将会在src/css下生成index.css
        .pipe(livereload()); 
});
//2匹配符“!”，“*”，“**”，“{}”
gulp.task('testLess2', function () {
    //编译src目录下的所有less文件
    //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
    gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less']) 
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});
//3调用多模块（编译less后压缩css） 
gulp.task('testLess3', function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('src/css'));
});