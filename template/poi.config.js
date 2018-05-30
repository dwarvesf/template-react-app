const path = require('path')

module.exports = {
  env: true,
  entry: 'src/index.js',
  plugins: [
    require('@poi/plugin-eslint')(),<% if(pwa) { %>
    require('@poi/plugin-offline')(),<% } %>
  ],
}
