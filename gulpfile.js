const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass");
const include = require("gulp-file-include");
const concat = require("gulp-concat");
const del = require("del");
const sync = require("browser-sync").create();

function html() {
  return src("src/html/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(dest("main"));
}

function scss() {
  return src("src/style/scss/**.scss")
    .pipe(sass())
    .pipe(concat("index.css"))
    .pipe(dest("main"));
}

function clear() {
  return del("src/main");
}

function js() {
  return src("src/index.js").pipe(dest("main"));
}

function img() {
  return src("src/media/img/**.jpg").pipe(dest("main/media/img"));
}

function serve() {
  sync.init({
    server: "./main",
  });

  watch("src/html/**/**.html", series(html)).on("change", sync.reload);
  watch("src/style/scss/**.scss", series(scss)).on("change", sync.reload);
}

exports.build = series(clear, scss, html, js, img);
exports.serve = series(clear, scss, html, js, img, serve);
