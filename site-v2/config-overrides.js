/* eslint-disable react-hooks/rules-of-hooks */
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = override(
  addWebpackAlias({
    '@components': resolvePath('src/shared/components'),
    '@hooks': resolvePath('src/shared/hooks'),
    '@entities': resolvePath('src/entities'),
    '@pages': resolvePath('src/pages'),
    '@widgets': resolvePath('src/widgets'),
  })
)