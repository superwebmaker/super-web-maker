const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

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
    alias: Object.assign(
      {
        '@': path.resolve(__dirname, '../src/scripts'),
        vue$: 'vue/dist/vue.esm-bundler.js',
        'balm-ui-plus$': 'balm-ui/dist/balm-ui-plus.js'
      },
      // fix(vue@3.0.1+): __VUE_HMR_RUNTIME__ is not defined in development
      {
        '@vue/runtime-core':
          '@vue/runtime-core/dist/runtime-core.esm-bundler.js'
      }
    )
  },
  assets: {
    mainDir: 'app/public'
    // cache: true
  },
  logs: {
    level: 2
  }
};
