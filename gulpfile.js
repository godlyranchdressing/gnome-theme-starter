const gulp = require("gulp");
const sass = require("gulp-sass");
const copy = require("gulp-copy");
const shell = require("gulp-shell");
const clean = require('gulp-clean');
const run = require('child_process').exec;
const zip = require("gulp-zip");
//
const src = "src";
const darkGtk2Src = src + "/theme-starter-dark/gtk-2.0";
const lightGtk2Src = src + "/theme-starter/gtk-2.0";
const dest = "dist";
//

gulp.task("gtk2", () => {
  return gulp.src(src + "/**/gtk-2.0/*").pipe(gulp.dest(dest));
});

gulp.task("gtk3", () => {
  return gulp
    .src(src + "/**/gtk-3.0/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(dest));
});

gulp.task("shell", () => {
  return gulp
    .src(src + "/**/gnome-shell/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(dest));
});

gulp.task("styles", () => {
  return gulp
    .src(src + "/**/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(dest));
});

gulp.task("assets", () => {
  return gulp
    .src(src + "/**/**/assets/*")
    .pipe(gulp.dest(dest));
});

gulp.task("render-light-assets", () => {
  return gulp
    .src(lightGtk2Src)
    .pipe(shell(['bash <%= file.path %>/render-assets.sh']))
})

gulp.task("render-dark-assets", () => {
  return gulp
    .src(darkGtk2Src)
    .pipe(shell(['bash <%= file.path %>/render-assets.sh']))
})

gulp.task("zip", () => {
  return gulp
    .src("dist/**")
    .pipe(zip("theme.zip"))
    .pipe(gulp.dest("."));
});

gulp.task("dev", () => {
  return gulp.watch(src + "/**/**/*.scss", done => {
    gulp.series(["styles"])(done);
    run('gtk3-widget-factory');
  });
});

gulp.task('clean', function () {
  return gulp.src("./dist")
      .pipe(clean({force: true}))
});

gulp.task(
  "build",
  gulp.series(gulp.parallel("gtk2", "gtk3", "shell", "assets", "render-light-assets", "render-dark-assets"))
);
