var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
var server = require("gulp-webserver");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var minImg = require("gulp-imagemin");
var minHtml = require("gulp-htmlmin");

//在gulp中使用webserver启动web服务，并且提供自动刷新功能
gulp.task("server", function () {
    return gulp.src("./src/")
        .pipe(server({
            port:3001,
            open:true,
            livereload:true
        }))
})

//在gulp中创建scss任务，进行scss文件编译，并且压缩css
gulp.task("sass", function () {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css/"))
})


//在gulp中创建watch任务，进行css文件监听，自动执行对应的任务
gulp.task("watch", function () {
    gulp.watch("./src/scss/*.scss", gulp.series("sass"));

})

//压缩css
gulp.task("cleanCss", function () {
    return gulp.src("./src/css/*.css")
        .pipe(cleanCss())
        .pipe(gulp.dest("./dist/css"))
})



//在gulp中创建js任务编译js文件，合并js，并且压缩
gulp.task("minjs",function(){
    return gulp.src("./src/js/*.js")
        .pipe(concat('all.js'))
        .pipe(babel({
            presets:"es2015"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"))
})

//8.在gulp中创建default任务，默认执行webserver服务，js，css，watch任务（10分）；
gulp.task("default",gulp.series("sass","server","watch"));


//在gulp中创建build任务，指向js,css任务，并把文件生成到dist文件夹（10分）
gulp.task("build",gulp.parallel("cleanCss","minjs"));