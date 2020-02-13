const AutoPrefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const globule = require('globule');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const app = {
  entry: {
    app: [
      './src/js/app.js',
      './src/sass/style.scss',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist/html/',
    watchContentBase: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              root: path.resolve(__dirname, 'src/pug'),
            },
          },
        ],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            // プリセットを指定することで、ES2020 を ES5 に変換
            '@babel/preset-env',
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                AutoPrefixer(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin(),
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/images/'),
        to: path.resolve(__dirname, 'dist/assets/images/'),
      },
      {
        from: path.resolve(__dirname, 'src/assets/webfonts/'),
        to: path.resolve(__dirname, 'dist/assets/webfonts/'),
      },
      {
        from: path.resolve(__dirname, 'src/assets/media/'),
        to: path.resolve(__dirname, 'dist/assets/media/'),
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '95-100',
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
};

// pugファイルをglobuleで探す
const pugFiles = globule.find(
  './src/pug/**/*.pug', {
    ignore: [
      './src/pug/**/_*/*.pug',
    ],
  },
);

// 探してきたpugファイルをhtmlに変換してpublicのhtmlに移動
pugFiles.forEach((pugFile) => {
  const fileName = pugFile.replace('./src/pug/', 'html/').replace('.pug', '.html');
  app.plugins.push(
    // HTMLファイル出力
    new HtmlWebpackPlugin({
      inject: false, // 自動でjsとcssファイルの読み込みを書かない
      filename: `${fileName}`,
      template: pugFile,
    }),
  );
});

module.exports = app;
