var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('vendor.css');
var isDevelopment = process.env.ASPNETCORE_ENVIRONMENT === 'Development';

module.exports = {
    resolve: {
        extensions: [ '', '.js' ]
    },
    module: {
        loaders: [
            { test: /\.(png)$/, loader: 'url-loader?limit=100000' },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=./webpack-assets/[name]/[hash].[ext]"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=./webpack-assets/[name]/[hash].[ext]"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream&name=./webpack-assets/[name]/[hash].[ext]"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?&name=./webpack-assets/[name]/[hash].[ext]"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml&name=./webpack-assets/[name]/[hash].[ext]"
            }   ,
            { test: /\.css/, loader: extractCSS.extract(['css']) }
        ]
    },
    entry: {
        vendor: [
            'bootstrap',
            'bootstrap/dist/css/bootstrap.css',
            'font-awesome/css/font-awesome.css',
            'style-loader',
            'jquery',
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            '@angular/platform-server',
        ]
    },
    output: {
        path: path.join(__dirname, 'wwwroot', 'dist'),
        filename: '[name].js',
        library: '[name]_[hash]',
    },
    plugins: [
        extractCSS,
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
            name: '[name]_[hash]'
        })
    ].concat(isDevelopment ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            minimize: true,
            mangle: false // Due to https://github.com/angular/angular/issues/6678
        })
    ])
};
