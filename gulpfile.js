process.env.DEBUG = process.env.DEBUG || 'ar:*';
require('babel-register');
const gulp = require('gulp');
// const gutil = require('gulp-util');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');

const swiss = require('kouto-swiss');
// const debugFactory = require('debug');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const history = require('connect-history-api-fallback');
const browserSync = require('browser-sync');
const render = require('gulp-render-react');

const yargs = require('yargs');

const webpackConfig = require('./webpack.config');
// const debug = debugFactory('berkeleytrue:gulp');
const sync = browserSync.create('ar-sync-server');
const reload = sync.reload.bind(sync);

// user definable ports
const port = yargs.argv.port || process.env.PORT || 3000;
// make sure sync ui port does not interfere with proxy port
const UIPort = yargs.argv['ui-port'] || process.env.UI_PORT || 3002;

const paths = {
  template: './template.jsx',
  stylus: './client/index.styl',
  stylusFiles: [
    './client/**/*.styl'
  ],
  public: './public'
};

function errorHandler() {
  const args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: swiss()
    }))
    .pipe(sourcemaps.write())
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.public))
    .pipe(reload({ stream: true }));
});

const syncDependents = [
  'create-html'
];

gulp.task('create-html', function() {
  return gulp.src(paths.template)
    .pipe(render({
      type: 'markup'
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.public))
    .pipe(reload({ stream: true }));
});

gulp.task('serve', syncDependents, function() {
  webpackConfig.entry.bundle = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ].concat(webpackConfig.entry.bundle);

  const bundler = webpack(webpackConfig);

  sync.init(null, {
    port,
    server: paths.public,
    open: false,
    logLeval: 'debug',
    files: paths.syncWatch,
    ui: { port: UIPort },

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'errors-only'
      }),
      webpackHotMiddleware(bundler),
      history()
    ]
  });
});

gulp.task('watch', function() {
  // gulp.watch(paths.stylusFiles, ['stylus']);
  gulp.watch(paths.template, ['create-html']);
});

gulp.task('default', [ 'create-html', 'serve', 'watch' ]);
