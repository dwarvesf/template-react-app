<% if(tailwindcss) { %>
const PurgecssPlugin = require('./purgecss.config');
<% } %>

module.exports = {
  env: true,
  entry: 'src/index.js',
  plugins: [
    require('@poi/plugin-bundle-report')(),
    require('@poi/plugin-eslint')(),<% if(pwa) { %>
    require('@poi/plugin-offline')(),<% } %>
  ],
  chainWebpack(config) {
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
  },
  configureWebpack(config) {
    if (config.mode === 'production') {
      <% if(tailwindcss) { %>
      config.plugins.push(PurgecssPlugin);
      <% } %>
    }

    return config;
  },
}
