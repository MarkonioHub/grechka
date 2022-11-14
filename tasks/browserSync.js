// yarn add -D browser-sync
const browserSync = require('browser-sync').create()

function runServe () {
  browserSync.init({
    server: {
      baseDir: 'dev',
      index: "index.html"
    }
  })
}

module.exports = {
  runServe,
  browserSync
}
