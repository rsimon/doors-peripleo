const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'peripleo-fitzwilliam.js',
    path: path.resolve(__dirname, 'docs'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'mapbox-gl': 'maplibre-gl',
      'tinyqueue': __dirname + "/node_modules/tinyqueue/tinyqueue.js"
    }
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        exclude: [/node_modules/],
        use: { 
          loader: 'babel-loader' ,
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            "plugins": [
              [
                "@babel/plugin-proposal-class-properties"
              ]
            ]
          }
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader' ] }
    ]
  },
  experiments: {
    asyncWebAssembly: true
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    hot: true,
    host: process.env.HOST || 'localhost',
    port: 3000,
    static: {
      directory: './public',
      publicPath: '/'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './public/index.html'
    })
  ]
};