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
  configureWebpack(config) {
    if (config.mode === 'production') {
      <% if(tailwindcss) { %>
      config.plugins.push(PurgecssPlugin);
      <% } %>
    }

    return config;
  },
}
