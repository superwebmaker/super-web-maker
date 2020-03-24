/* eslint-env node */
const templates = [
  {
    input: 'index.html',
    output: 'views',
    renameOptions: {
      basename: 'home',
      extname: '.nj'
    }
  },
  {
    input: 'maker.html',
    output: 'views',
    renameOptions: {
      basename: 'maker',
      extname: '.nj'
    }
  }
];

module.exports = function publish(mix) {
  if (mix.env.isProd) {
    // Publish assets
    mix.publish();
    // Publish templates
    mix.publish(templates);
  }
};
