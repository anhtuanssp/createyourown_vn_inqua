var webpack = require('webpack'),
    path = require('path');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'builds')
};

module.exports = {
    debug: true,
    devtool: "source-map",
    entry: {
        home: './app/pages/index/main.js',
        thietkemau: './app/pages/thietkemau/main.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'builds/'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['react', 'es2015']
            },
            include: PATHS.app
        }]
    }
};