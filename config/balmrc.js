const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const serve = require('./server');

const workspace = path.join(__dirname, '..');

function resolve(dir) {
  return path.join(workspace, dir);
}

module.exports = (balm) => ({
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
    },
    next() {
      if (balm.config.env.isDev) {
        serve();
      }
    }
  },
  styles: {
    extname: 'scss',
    dartSass: true
  },
  scripts: {
    entry: {
      lib: ['vue', 'vue-router', 'axios'],
      'swm-admin': './src/scripts/backend/index.js',
      'swm-app': './src/scripts/frontend/index.js'
    },
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      })
    ],
    alias: {
      '@': resolve('src/scripts'),
      vue$: 'vue/dist/vue.esm-bundler.js',
      'balm-ui-plus$': 'balm-ui/dist/balm-ui-plus.js'
    }
  },
  assets: {
    mainDir: 'app/public'
    // cache: true
  }
});
