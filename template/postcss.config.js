module.exports = {
  plugins: [
    <% if (tailwindcss) { %>
    require('tailwindcss')('./tailwind.js'),<% } %>
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
};
