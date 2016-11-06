/**
 * Created by linson on 2016/11/3.
 */

'use strict';

/*
1.LESS编译、压缩、合并
2.JS合并，压缩，混淆
3.图片的复制
4.html压缩
*/

//在gulpfile中先载入gulp包，因为这个包提供了一些API

var gulp = require('gulp');

//1.LESS编译、压缩、合并(合并没必要，一般预处理css都可以导包)
var less = require('gulp-less'); //把less转成css
var cssnano = require('gulp-cssnano');//css压缩

gulp.task('style',function(){
    //这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));

});

//2.JS合并，压缩混淆(先合并再压缩混淆)
var concat = require('gulp-concat'); //Js合并
var uglify = require('gulp-uglify');//混淆

gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//3.图片的复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//4.html压缩
var htmlmin = require('gulp-htmlmin');

gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace:true,   //去掉空白的压缩
            removeComments:true        //去掉注释的压缩
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//静态服务器
var browserSync = require('browser-sync');
gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir: ['dist']
        }
    },function(err,bs){
        console.log(bs.options.getIn(["urls","local"]));
    });

    //监控
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});