const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  inFrontend: false,
  server: {
    proxy: '127.0.0.1:7001'
  },
  styles: {
    extname: 'scss',
    dartSass: true
  },
  scripts: {
    entry: {
      lib: ['vue', 'vue-router', 'axios'],
      app: './src/scripts/app.js'
    },
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
    plugins: [new VueLoaderPlugin()],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src/scripts')
    }
  },
  assets: {
    mainDir: 'app/public'
    // cache: true
  },
  logs: {
    level: 2
  }
};
