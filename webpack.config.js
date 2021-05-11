const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './main.js',
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
        // method of generating ids for chunks
        moduleIds: "size",
        // method of generating ids for modules
        mangleExports: "size",
        // rename export names to shorter names
        minimize: true,
        // minimize the output files
        minimizer: [new CssMinimizerPlugin(),],
        concatenateModules: true,
        // concatenate multiple modules into a single one
        emitOnErrors: true,
        // emit output files even if there are build errors
        flagIncludedChunks: true,
        // avoid downloading a chunk if it's fully contained in
        // an already loaded chunk
        innerGraph: true,
        // determine references without modules between symbols
        mergeDuplicateChunks: true,
        // merge chunks if they are equal
        nodeEnv: "production",
        // value of process.env.NODE_ENV inside of modules
        portableRecords: true,
        // use relative paths in records
        providedExports: true,
        // determine which exports are exposed by modules
        usedExports: true,
        // determine which exports are used by modules and
        // remove the unused ones
        realContentHash: true,
        // caculcate a contenthash for assets based on the content
        removeAvailableModules: true,
        // run extra pass to determine modules that are already in
        // parent chunks and remove them
        removeEmptyChunks: true,
        // remove chunks that are empty
        runtimeChunk: "single",
        // change placement of runtime code
        sideEffects: true,
        // skip modules that are side effect free when using reexports
    },
    plugins: [new htmlWebpackPlugin({ template: './index.html' }),],
    devtool: 'inline-source-map',
    port: 1337,
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000',
        },
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true,
    },
}
