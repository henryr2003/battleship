const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry file (your main JS file)
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // For all .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel to transpile
        },
      },
    ],
  },
  devServer: {
    static: './dist', // Serve files from the 'dist' folder
  },
  mode: 'development', // Development mode
};
