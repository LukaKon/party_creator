const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const config = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name][contenthash].js",
        clean: true,
        assetModuleFilename: "[name][ext]",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "PartyWizard",
            // templateContent: ({ htmlWebpackPlugin }) =>
            // '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
            // htmlWebpackPlugin.options.title +
            // '</title></head><body><div id="root"></div></body></html>',
            template: "./src/template.html",
            filename: "index.html",
        }),
        new Dotenv({
            path: ".env",
        }),
    ],
};

module.exports = config;
