const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: ['./src/main.js'],
    output: {
        filename: './confort.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            }
        ]
    }
};
