const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const scripts = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
            ]
        }
    },

}

const ico = {
    test: /\.ico/,
    use: {
        loader: 'file-loader',
        options: {
            name: '[name].[ext]'
        }
    }
}

const images = {
    test: /\.(png|jpg|jpeg|svg|gift)$/,
    use: {
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'assets/images'
        }
    }
}

const imageServer = {
    test: /\.(gif|jpe?g|png|ico)$/,
    loader: 'url-loader?limit=10000'
}

const fonts = {
    test: /\.(woff|woff2|ttf|eot|)$/,
    use: {
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
        }
    }
}

const sass = {
    test: /\.scss$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
    ]
}

const clientConfig = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/scripts/bundle.js'
    },
    module: {
        rules: [
            scripts,
            ico,
            imageServer,
            fonts,
            sass
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        // new HtmlWebpackPlugin({template: './public/index.html'}),
        new MiniCssExtractPlugin({ filename: 'assets/styles/styles.css' }),
        new webpack.BannerPlugin({
            banner: "__isBrowser__ = true;",
            raw: true,
            include: /\.js$/
        }),
    ]
}

const serverConfig = {
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()],
    entry: {
        'server.js': path.resolve(__dirname, 'server.js')
    },
    module: {
        rules: [
            scripts,
            ico,
            imageServer,
            fonts,
            sass
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'assets/styles/styles.css' }),
        new webpack.BannerPlugin({
            banner: "__isBrowser__ = false;",
            raw: true,
            include: /\.js$/
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]'
    }
}

module.exports = [clientConfig, serverConfig]