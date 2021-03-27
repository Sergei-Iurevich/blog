const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./main/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index_bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./main/index.html",
        }),
        new MiniCssExtractPlugin(),
        new BrowserSyncPlugin(
            {
                host: "localhost",
                port: 3000,
                proxy: "http://localhost:9000/",
            },
            {
                reload: false,
            }
        ),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            {
                                tag: "img",
                                attribute: "src",
                                type: "src",
                            },
                        ],
                    },
                },
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true,
    }
};
