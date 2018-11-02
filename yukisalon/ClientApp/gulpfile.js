var gulp = require("gulp"),
  fs = require("fs"),
  watch = require("gulp-watch"),
  sass = require("gulp-sass");

// other content removed

gulp.task("sass", function () {
  return gulp.src('./src/assets/sass/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/assets/css'));
});

gulp.task("watch", function () {
  gulp.watch('./src/assets/sass/**/*.scss', ['sass']);
});
