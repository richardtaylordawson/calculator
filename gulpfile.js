const fs = require("node:fs")
const http = require("node:http")
const path = require("node:path")
const { dest, parallel, series, src, watch } = require("gulp")
const cleanCSS = require("gulp-clean-css")
const htmlmin = require("gulp-html-minifier-terser")
const { rollup } = require("rollup")
const terser = require("@rollup/plugin-terser")

const paths = {
  css: "_src/css/index.css",
  html: "_src/**/*.html",
  images: "_src/images/**/*.+(png|jpg|jpeg|gif|svg)",
  staticFiles: "_src/**/*.+(json|txt|xml)",
}

function clean() {
  fs.rmSync("dist", { recursive: true, force: true })
  return Promise.resolve()
}

function css() {
  return src(paths.css).pipe(cleanCSS()).pipe(dest("dist/css"))
}

function images() {
  return src(paths.images, { encoding: false }).pipe(dest("dist/images"))
}

async function bundle(input, file) {
  fs.mkdirSync(path.dirname(file), { recursive: true })

  const bundle = await rollup({
    input,
    plugins: [terser()],
  })

  await bundle.write({
    file,
    format: "es",
  })

  await bundle.close()
}

async function js() {
  await Promise.all([
    bundle("_src/js/index.js", "dist/js/index.js"),
    bundle("_src/sw.js", "dist/sw.js"),
  ])
}

function html() {
  return src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("dist/"))
}

function files() {
  return src(paths.staticFiles).pipe(dest("dist/"))
}

function serve(done) {
  const root = path.resolve("dist")
  const port = Number(process.env.PORT) || 3000

  http
    .createServer((request, response) => {
      const requestedPath = new URL(
        request.url,
        `http://${request.headers.host}`
      ).pathname
      const filePath = path.resolve(
        root,
        requestedPath === "/" ? "index.html" : `.${requestedPath}`
      )

      if (!filePath.startsWith(root)) {
        response.writeHead(403)
        response.end("Forbidden")
        return
      }

      fs.readFile(filePath, (error, content) => {
        if (error) {
          response.writeHead(404)
          response.end("Not found")
          return
        }

        const extension = path.extname(filePath)
        const contentType =
          {
            ".css": "text/css",
            ".html": "text/html",
            ".ico": "image/x-icon",
            ".js": "text/javascript",
            ".json": "application/json",
            ".png": "image/png",
            ".txt": "text/plain",
            ".xml": "application/xml",
          }[extension] || "application/octet-stream"

        response.writeHead(200, { "Content-Type": contentType })
        response.end(content)
      })
    })
    .listen(port, () => {
      console.log(`Serving dist at http://localhost:${port}`)
    })

  done()
}

function watchFiles() {
  watch("_src/css/**/*.css", css)
  watch(paths.images, images)
  watch("_src/js/**/*.js", js)
  watch("_src/sw.js", js)
  watch(paths.html, html)
  watch(paths.staticFiles, files)
}

const build = series(clean, parallel(css, images, js, html, files))

exports.build = build
exports.default = series(build, serve, watchFiles)
