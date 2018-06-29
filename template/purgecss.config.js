const path = require('path');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const PurgecssWhitelister = require('purgecss-whitelister');

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
  }
}

module.exports = new PurgecssPlugin({
  // files to scan for class names.
  paths: glob.sync(path.join(__dirname, './src/**/*.js')),
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ['js', 'jsx'],
    },
  ],
  whitelist: ['html', 'body'].concat(PurgecssWhitelister([])),
  whitelistPatterns: [],
});
