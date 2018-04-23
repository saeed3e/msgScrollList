const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    app: './src/index.jsx',
    vendor: ['react','react-dom','prop-types','react-virtualized', './src/lib/timeago/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization:{
    splitChunks: {
        cacheGroups: {
            commons: {
                name: "vendor",
                chunks: "initial",
                minChunks: 2
            }
        }
    }
  },
  devtool: process.env.NODE_ENV === "development" && 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9001
  },
  mode:'development',
  module: {
        rules: [{
          test: /\.js|.jsx$/,
          exclude: /node_modules/,
          loader: "babel-loader"
      },{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },
        {
              test: /\.(png|svg|jpg|jpeg|gif)$/,
              use: [{
                loader:'file-loader',

                options:{
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      // optipng.enabled: false will disable optipng
                      optipng: {
                        enabled: true,
                        optimizationLevel:7
                      },
                      pngquant: {
                        quality: '65-90',
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      // the webp option will enable WEBP
                      webp: {
                        quality: 75
                      }
                    }
                  },
              }]
        },
        ]
    },
    plugins: [
        extractSass,
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Photo Gallery app',
            template: "./src/index.html",
        })
    ]
};