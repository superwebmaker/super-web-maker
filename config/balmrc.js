const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // inFrontend: false,
  server: {
    proxyConfig: {
      context: ['/api'],
      options: {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true
      }
    },
    historyOptions: {
      index: '/admin.html'
    }
  },
  styles: {
    extname: 'scss',
    dartSass: true
  },
  scripts: {
    entry: {
      lib: ['vue', 'vue-router', 'axios'],
      admin: './src/scripts/admin.js',
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
    publicUrl: '/',
    mainDir: 'app/public'
    // cache: true
  },
  logs: {
    level: 2
  }
};
