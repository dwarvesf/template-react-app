module.exports = {
  plugins: [
    <% if (tailwindcss) { %>
    require('tailwindcss')('./tailwind.js'),<% } %>
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
      flexbox: 'no-2009',
    }),
  ],
};
