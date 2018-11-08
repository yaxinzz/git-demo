var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    cssnano=require('gulp-cssnano');
 
//定义一个testLess任务（自定义任务名称）
gulp.task('style', function () {
    gulp.src('src/styles/*.less') //该任务针对的文件
        .pipe(less())  //该任务调用的模块
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles')); //将会在src/css下生成index.css
});
var concat =require('gulp-concat'),
    uglify =require('gulp-uglify');
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});
gulp.task('images',function(){
    gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'));
});
var htmlmin =require('gulp-htmlmin')
gulp.task('html',function(){
    gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace:true,
    removeComments:true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload());
});
var browserSync = require('browser-sync');
gulp.task('server',function(){
  browserSync({
      server:{baseDir:['dist/']},
      function(err,bs){
      console.log(bs.options.getIn(["urls","local"]));   
      }
  });
  gulp.watch('src/styles/*.less',['style']);
  gulp.watch('src/scripts/*.js',['script']);
  gulp.watch('src/images/*.*',['image']);
  gulp.watch('src/*.html',['html']);
});
 