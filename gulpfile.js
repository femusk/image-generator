var gulp = require("gulp");
var sass = require("gulp-sass");

// Rebuild CSS from SASS
gulp.task("sass", function () {
  return (
    gulp
      .src("scss/style.scss")
      .pipe(sass())
      .pipe(gulp.dest("css"))
  );
});

gulp.task("js", function () {
  return gulp.src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/popper.js/dist/umd/popper.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
  ])
    .pipe(gulp.dest("js"));
});

// Watch for Sass file changes
gulp.task("watch", function () {
  gulp.watch(["scss/**/*.scss"], gulp.series("sass"));
  gulp.watch(["js/**/*.js"], gulp.series("js"));
});

gulp.task('default', gulp.parallel("watch"));
