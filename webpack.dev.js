const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[chunkhash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                },
            },
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /.(png|jpe?g|svg)$/,
                loader: 'file-loader',
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({ template: './index.html' }),
        new MiniCssExtractPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        port: 1337,
        //compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        //noInfo: true,
    },
}
