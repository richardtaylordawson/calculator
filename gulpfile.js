const gulp = require("gulp")
const browserSync = require("browser-sync").create()
const imagemin = require("gulp-imagemin")
const cache = require("gulp-cache")
const del = require("del")
const runSequence = require("run-sequence")
const cleanCSS = require("gulp-clean-css")
const uglify = require("gulp-uglify")
const htmlmin = require("gulp-htmlmin")
const rollup = require("gulp-better-rollup")
const babel = require("rollup-plugin-babel")

gulp.task("css", () =>
  gulp
    .src("_src/css/index.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({ stream: true }))
)

gulp.task("images", () => {
  gulp
    .src("_src/images/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("dist/images"))

  return del.sync("dist/images")
})

gulp.task("js", () => {
  gulp
    .src("_src/sw.js")
    .pipe(rollup({ plugins: [babel()] }, { format: "cjs" }))
    .pipe(uglify())
    .pipe(gulp.dest("dist/"))

  return gulp
    .src("_src/js/index.js")
    .pipe(rollup({ plugins: [babel()] }, { format: "cjs" }))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task("html", () => {
  gulp
    .src("_src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }))

  return del.sync("dist/**/*.html")
})

gulp.task("files", () => {
  gulp.src("_src/**/*.+(json|txt|xml)").pipe(gulp.dest("dist/"))

  return del.sync("dist/**/*.+(json|txt|xml)")
})

gulp.task("syncDist", () => del.sync("dist"))

gulp.task("browserSync", () =>
  browserSync.init({ server: { baseDir: "./dist" } })
)

gulp.task("watch", () => {
  gulp.watch("_src/css/**/*.css", ["css"])
  gulp.watch("_src/images/**/*.+(png|jpg|jpeg|gif|svg)", ["images"])
  gulp.watch("_src/js/**/*.js", ["js"])
  gulp.watch("_src/**/*.html", ["html"])
  gulp.watch("_src/**/*.+(json|txt|xml)", ["files"])
})

gulp.task("build", (callback) => {
  runSequence(["css", "images", "js", "html", "files"], callback)
})

gulp.task("default", (callback) => {
  runSequence(
    "syncDist",
    ["css", "images", "js", "html", "files", "browserSync", "watch"],
    callback
  )
})
