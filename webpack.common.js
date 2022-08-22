const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.npm_lifecycle_event.includes('build')
module.exports = {
    entry: {
        app: './src/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? '[name].[contenthash].js' : '[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.m?js|.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    {
                        loader: "css-loader",
                    },
                    // Compiles Sass to CSS
                    {
                        loader: "sass-loader",
                        options: {
                            // Prefer `dart-sass`
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',

                    options: {
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
                                optimizationLevel: 7
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
        new HtmlWebpackPlugin({
            title: 'Photo Gallery app',
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? "[name].[contenthash].css" : "[name].css",
        })
    ]
};