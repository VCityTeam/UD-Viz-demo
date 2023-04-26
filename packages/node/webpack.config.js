const path = require('path');
const mode = process.env.NODE_ENV;
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');

const debugBuild = mode === 'development';

const commonConfig = {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    library: 'myAppNameNode',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist/debug'),
  },
};

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/release'),
  },
};

module.exports = merge(commonConfig, debugBuild ? devConfig : prodConfig);
