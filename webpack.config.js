const ExtractTextPlugin = require('extract-text-webpack-plugin'); // js,css別々で出力
const TerserPlugin = require('terser-webpack-plugin'); // js minify
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css minify
const path = require('path');

module.exports = (env, argv) => ({
  devServer: {
    contentBase: path.join(__dirname, './public')
  },
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/js/index.js',
  // ファイルの出力設定
  output: {
    path: path.join(__dirname, './public'),
    // 出力ファイル名
    filename: './assets/js/bundle.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: 'all'
      }),
      new OptimizeCSSAssetsPlugin({
        discardComments: { removeAll: true }
      })
    ]
  },
  module: {
    rules: [
      {
        // JSファイルの読み込みとコンパイル
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2019 を ES5 に変換
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: ExtractTextPlugin.extract({
          use: [
            // CSSをバンドルするための機能
            {
              loader: 'css-loader',
              options: {
                // オプションでCSS内のurl()メソッドの取り込みを禁止する
                url: false,
                // ソースマップの利用有無
                sourceMap: true,

                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 2
              }
            },
            // PostCSSのための設定
            {
              loader: 'postcss-loader',
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: true,
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require('autoprefixer')({
                    grid: true,
                    overrideBrowserslist: ['last 2 versions']
                  })
                ]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },

  plugins: [new ExtractTextPlugin('./assets/css/style.css')]
});
