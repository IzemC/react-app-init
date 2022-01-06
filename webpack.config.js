const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
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
                test: /(.png$)|(.jpe?g$)/,
                loader: 'file-loader',
            }
        ]
    },
    optimization: {
        chunkIds: "size",
        moduleIds: "size",
        mangleExports: "size",
        minimizer: [new CssMinimizerPlugin(),],
        concatenateModules: true,
        emitOnErrors: true,
        flagIncludedChunks: true,
        innerGraph: true,
        mergeDuplicateChunks: true,
        nodeEnv: "production",
        portableRecords: true,
        providedExports: true,
        usedExports: true,
        realContentHash: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        runtimeChunk: "single",
        sideEffects: true,
    },
    plugins: [new htmlWebpackPlugin({ template: './index.html' }),
    new MiniCssExtractPlugin(),],
}
