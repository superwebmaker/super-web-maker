const path = require('path');

module.exports = {
  inFrontend: false,
  server: {
    proxy: '127.0.0.1:7001'
  },
  roots: {
    source: 'resources'
  },
  styles: {
    extname: 'scss',
    dartSass: true
  },
  scripts: {
    entry: {
      app: './resources/scripts/app.js'
    },
    alias: {
      '@': path.resolve(__dirname, '../resources/scripts')
    }
  },
  assets: {
    mainDir: 'app/public'
  },
  logs: {
    level: 2
  }
};
