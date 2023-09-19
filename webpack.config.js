const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    plugins: [
        // ... other plugins ...
    
        // Copy assets to the output directory
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'src/assets'),
              to: 'assets',
            },
          ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // Inject CSS into the DOM
                    'css-loader',   // Convert CSS into CommonJS
                    'sass-loader',  // Compile Sass to CSS
                ],
            },
            // Rule for handling HTML files
            {
                test: /\.html$/i,
                use: 'html-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src'), // Serve files from the src directory
        },
    }
};