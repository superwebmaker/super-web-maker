module.exports = {
  debug: true,
  static: false,
  server: {
    open: false,
    proxy: '127.0.0.1:7001'
  },
  roots: {
    source: 'resources'
  },
  styles: {
    ext: 'scss'
  },
  scripts: {
    entry: {
      app: './resources/scripts/app.js'
    }
  },
  assets: {
    mainDir: 'app/public'
  }
};
