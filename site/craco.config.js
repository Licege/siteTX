const path = require('path');
const { whenProd } = require('@craco/craco');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@': resolvePath('src'),
      '@ui-kit': resolvePath('src/components/core'),
    },
    configure: webpackConfig => ({
      ...webpackConfig,
      plugins: [
        ...webpackConfig.plugins,
        ...whenProd(() => [
          new HtmlCriticalWebpackPlugin({
            base: resolvePath('build'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 320,
            height: 565,
            penthouse: {
              blockJSRequests: false,
            }
          })
        ], [])
      ]
    })
  }
}