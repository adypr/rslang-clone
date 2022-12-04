/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
  entry: {
    main: [path.resolve(__dirname, './src/index.ts')],
    textbook: [path.resolve(__dirname, './src/components/pages/textbook/textbook.ts')],
    vocabulary: [path.resolve(__dirname, './src/components/pages/vocabulary/vocabulary.ts')],
    team: [path.resolve(__dirname, './src/components/pages/team/team.ts')],
    audiocall: [path.resolve(__dirname, './src/components/pages/game-audiocall/audiocall.ts')],
    sprint: [path.resolve(__dirname, './src/components/pages/game-sprint/sprint.ts')],
    statistics: [path.resolve(__dirname, './src/components/pages/statistics/statistics.ts')],
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 7700,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp3)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split('/')
        .slice(1)
        .join('/');
      return `${filepath}/[name][ext]`;
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/pages/textbook/textbook.html'),
      filename: 'textbook.html',
      chunks: ['textbook'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/pages/vocabulary/vocabulary.html'),
      filename: 'vocabulary.html',
      chunks: ['vocabulary'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/pages/team/team.html'),
      filename: 'team.html',
      chunks: ['team'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/pages/game-audiocall/audiocall.html'),
      filename: 'audiocall.html',
      chunks: ['audiocall'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/pages/game-sprint/sprint.html'),
      filename: 'sprint.html',
      chunks: ['sprint'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/pages/statistics/statistics.html'),
      filename: 'statistics.html',
      chunks: ['statistics'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/assets/'),
          to: path.resolve(__dirname, './dist/assets/'),
        },
        {
          from: path.resolve(__dirname, './src/index.php'),
          to: path.resolve(__dirname, './dist/'),
        },
        {
          from: path.resolve(__dirname, './src/composer.json'),
          to: path.resolve(__dirname, './dist/'),
        },
      ],
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
