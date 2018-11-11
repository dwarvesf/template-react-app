const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  env: true,
  entry: 'src/index.js',
  plugins: [
    require('@poi/plugin-bundle-report')(),
    require('@poi/plugin-eslint')(),<% if(pwa) { %>
    require('@poi/plugin-offline')(),<% } %>
  ],
  chainWebpack(config) {
    // prefixes css module classes with 'module__'
    ['css', 'scss', 'sass', 'less', 'stylus'].forEach(lang => {
      config.module
        .rule(lang)
        .oneOf('module-ext')
        .use('css-loader')
        .tap(option => ({
          ...option,
          localIdentName: 'module__[local]_[hash:base64:8]',
        }));
    });

    const isEnvProduction = config.get('mode') === 'production';
    if (isEnvProduction) {
      <% if(tailwindcss) { %>
      // PurgeCSS plugin
      config
        .plugin('purgecss')
        .use(require('purgecss-webpack-plugin'), [
          require('./purgecss.config'),
        ]);<% } %>
      // replace UglifyJS with Terser, similar to create-react-app
      config.plugins.delete('uglifyjs');
      config.optimization.minimize(isEnvProduction);
      config.optimization.minimizer([
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: require('postcss-safe-parser'),
            map: false,
          },
        }),
      ]);
    }
  },
  configureWebpack(config) {
    return config;
  },
}
