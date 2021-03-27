const gulp = require("gulp"),
sass = require("gulp-sass"),
rename = require("gulp-rename"),
autoprefixer = require("gulp-autoprefixer"),
watch = require("gulp-watch"),
changed = require("gulp-changed");

// 监听scss文件变化
 gulp.task('default', gulp.series(() => {
   watch('./pages/**/*.scss', () => {
    sassToWxss();
   });
 }));
 // 执行sass编译
 gulp.task('sass', gulp.series(() => {
  sassToWxss();
  return new Promise(function(resolve, reject) {
    console.log("Over");
    resolve();
  });
}));
 // 对scss进行预处理编译出wxss文件
const sassToWxss = () => {
  return gulp.src('./pages/**/*.scss')
  .pipe(sass({outputStyle:'expanded'})) // 输出css不压缩
  .pipe(autoprefixer()) // 添加兼容前缀
  .pipe(rename((path) => path.extname = '.wxss')) // 将编译后的css文件重命名为wxss后缀
  .pipe(changed('./pages'))//只编译改动的文件
  .pipe(gulp.dest('./pages'))//编译
  .pipe(rename((path)=> {
    console.log('编译完成文件：' + 'pages\\' + path.dirname + '\\' + path.basename + '.scss')
  }))
};