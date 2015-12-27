// Webpack config file
module.exports = {
  entry: './src/js/app.jsx',
  output: {
    path: __dirname + '/static/js',
    filename: 'bundle.js',
    query: {
          presets: ['es2015']
        }
  },
  module: {
    loaders: [
      {
        test: [/\.jsx$/, /\.js$/],
        loader: 'babel-loader'
      }
    ]
  },
};
