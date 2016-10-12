require('babel-register');
const path = require('path');
const webpack = require('webpack');
const swiss = require('kouto-swiss');
const rupture = require('rupture');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ReactStaticPlugin = require('react-static-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
const stylesheet = isDev ? null : 'main.css';
const localIdentName = isDev ?
  '&localIdentName=[name]__[local]__[hash:base64:6]' :
  '';


const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isDev ? 'development' : 'production')
    },
    __DEVTOOLS__: !isDev
  }),
  // Use browser version of visionmedia-debug
  new webpack.NormalModuleReplacementPlugin(
    /debug\/node/,
    'debug/browser'
  ),
  new webpack.optimize.OccurenceOrderPlugin(true)
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

const prodPlugins = [
  new ExtractTextPlugin(stylesheet, { allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({
    /* eslint-disable camelcase */
    screw_ie8: true,
    /* eslint-enable camelcase */
    compressor: { warnings: false }
  }),
  new ReactStaticPlugin({
    routes: './client/routes.jsx',
    template: './template.jsx',
    reduxStore: './client/index.js',
    stylesheet
  })
];

const stylLoaders = [
  'style',
  `css?modules&importLoaders=1${localIdentName}`,
  'stylus'
];

module.exports = {
  devtool: isDev ? 'inline-source-map' : null,

  entry: {
    bundle: [ './client/index.js' ]
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },

  plugins: plugins.concat(isDev ? devPlugins : prodPlugins),

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'client/'),
          path.join(__dirname, 'common/'),
          path.join(__dirname, './template.jsx')
        ],
        loaders: isDev ? ['react-hot', 'babel'] : [ 'babel' ]
      },
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.styl$/,
        loader: isDev ?
        stylLoaders.join('!') :
        ExtractTextPlugin.extract(stylLoaders[0], stylLoaders.splice(1))
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: [
          'file?name=[name].[ext]'
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loaders: [
          'file?name=[name].[ext]'
        ]
      }
    ]
  },
  stylus: {
    use: [
      swiss(),
      rupture()
    ],
    import: [
      '~kouto-swiss/lib/kouto-swiss/index.styl',
      path.join(__dirname, '/client/globals.styl')
    ]
  }
};
