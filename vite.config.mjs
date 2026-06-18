import {
  cpSync,
  copyFileSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const __dirname = dirname(fileURLToPath(import.meta.url))
const sourceRoot = resolve(__dirname, "_src")
const outputRoot = resolve(__dirname, "dist")

function copyStaticAssets() {
  const files = ["robots.txt", "sitemap.xml"]

  return {
    name: "copy-static-assets",
    closeBundle() {
      cpSync(resolve(sourceRoot, "images"), resolve(outputRoot, "images"), {
        recursive: true,
      })

      files.forEach((file) => {
        copyFileSync(resolve(sourceRoot, file), resolve(outputRoot, file))
      })
    },
  }
}

function preserveRootStaticLinks() {
  return {
    name: "preserve-root-static-links",
    closeBundle() {
      const htmlPath = resolve(outputRoot, "index.html")
      const html = readFileSync(htmlPath, "utf8").replaceAll(
        "/assets/favicon.png",
        "/images/favicon.png"
      )

      writeFileSync(htmlPath, html)
      rmSync(resolve(outputRoot, "assets/favicon.png"), { force: true })
    },
  }
}

export default defineConfig({
  root: sourceRoot,
  publicDir: false,
  plugins: [copyStaticAssets(), preserveRootStaticLinks()],
  build: {
    outDir: outputRoot,
    emptyOutDir: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      input: {
        index: resolve(sourceRoot, "index.html"),
      },
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((name) => name.endsWith(".css"))) {
            return "css/[name][extname]"
          }

          return "assets/[name][extname]"
        },
      },
    },
  },
})
