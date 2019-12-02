const path = require('path');

module.exports = {
  entry: 'src/index.js',
  plugins: [
    {
      resolve: '@poi/plugin-eslint',
    },
    {
      resolve: '@poi/bundle-report',
      options: { analyzerMode: 'static' },
    },<% if (pwa) { %>
    {
      resolve: '@poi/plugin-pwa',
      options: {},
    },<% } %>
  ],

  chainWebpack(config) {
    const isEnvProduction = config.get('mode') === 'production';

    // remove default svg loader
    config.module.rules.delete('svg');

    // prefixes css module classes with 'module__'
    ['css', 'scss', 'sass', 'less', 'stylus'].forEach(lang => {
      config.module
        .rule(lang)
        .oneOf('normal-modules')
        .use('css-loader')
        .tap(option => ({
          ...option,
          localIdentName: 'module__[path][name]__[local]--[hash:base64:5]',
        }));
    });

    // linaria
    config.module
      .rule('js')
      .use('linaria-loader')
      .loader('linaria/loader')
      .options({
        sourceMap: !isEnvProduction,
      });

    // favicons
    config.plugin('favicons').use(require('favicons-webpack-plugin'), [
      {
        logo: path.resolve(__dirname, './public/logo-128.png'),
        favicons: {
          developerName: null,
          developerURL: null,
        },
      },
    ]);

    if (isEnvProduction) {
      <% if (tailwindcss) { %>
      // PurgeCSS plugin
      config
        .plugin('purgecss')
        .use(require('purgecss-webpack-plugin'), [
          require('./purgecss.config'),
        ]);<% } %>
      // replace UglifyJS with Terser, similar to create-react-app
      config.plugins.delete('uglifyjs');
      config.optimization.minimize(isEnvProduction);
      config.optimization
        .minimizer('terser')
        .use(require('terser-webpack-plugin'), [
          {
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
          },
        ])
        .end()
        .minimizer('css')
        .use(require('optimize-css-assets-webpack-plugin'), [
          {
            cssProcessorOptions: {
              parser: require('postcss-safe-parser'),
              map: false,
            },
          },
        ]);
    }
  },
  configureWebpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
        'url-loader',
      ],
    });

    if (config.mode === 'development') {
      config.module.rules.push({
        // match files to receive react-hot-loader functionality
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src/App.js'),
          path.resolve(__dirname, 'src/pages'),
        ],
        loader: require.resolve('react-hot-loader-loader'),
        enforce: 'post',
      });
    }

    return config;
  },
}
