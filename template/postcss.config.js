const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    tailwindcss('./tailwind.js'),
    autoprefixer({
      browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
      flexbox: 'no-2009',
    }),
  ],
};
