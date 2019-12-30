const babel = require('@babel/register');
require("@babel/polyfill");
const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const del = require('del');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const server = require('gulp-server-livereload');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const jest = require('jest-cli');


const paths = {
  html: 'index.html',
  scripts: './src/**/*.js',
  sass: './styles/**/*.scss',
  tests: './test/unit/**/*.js',
  // tests: './test/unit/app.spec.js',
  backOfficeScripts: './src/admin/**/*.js',
  backOfficeSass: './styles/sass/admin/**/*.scss',
  buildSass: './build/styles',
  buildScripts: './build/js',
  backOfficeTests: './back-office-tests/__tests__'
};

const clean = () => del(['build', 'coverage']);

const lint = (done) => {
  gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format());
  done();
};

const scripts = (done) => {
  const bundler = watchify(browserify('./src/app.js', { debug: true }).transform(babelify));

  bundler.bundle()
    .on('[gulpfile] Error in scripts task: ', (err) => {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.buildScripts));
  done();
};

const scriptsBackOffice = (done) => {
  const bundler = watchify(browserify('./src/admin/back-office-app.js', { debug: true })
    .transform('babelify', { presets: ["@babel/preset-env", "@babel/preset-react"]}));

  bundler.bundle()
    .on('[gulpfile] Error in scriptsBackOffice task', (err) => {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('back-office.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.buildScripts));
  done();
};

const scriptsDiscoverer = () => {
  const bundler = watchify(browserify('./src/admin/discoverer.js', { debug: true })
    .transform('babelify', { presets: ['react', 'env', 'stage-0'] }));

  bundler.bundle()
    .on('[gulpfile] Error in scriptsDiscoverer task', (err) => {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('back-office-discoverer.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.buildScripts));
};

const styles = (done) => {
  gulp.src([paths.sass, '!./styles/sass/admin/**/*.scss'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('all.css'))
    .pipe(postcss([autoprefixer({
      browsers: [
        'last 2 versions',
        'Android 4.4',
        'ie 10-11',
        'ios_saf 8'
      ]
    })]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.buildSass));
  done();
};

const stylesBackOffice = (done) => {
  gulp.src(paths.backOfficeSass)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('back-office.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.buildSass));
  done();
};

const jestConfig = {
  rootDir: paths.backOfficeTests
};

const testsBackOffice = (done) => {
  jest.runCLI({ config: jestConfig }, ".", function () {
    done();
  })
};

const test = (done) => {
  gulp.src(paths.tests)
    .pipe(mocha({
      compilers: {
        js: babel
      }
    }))
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: ['lcov'],
      reportOpts: { dir: './coverage' }
    }))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
  done();
};

const watchBackOfficeScripts = () => gulp.watch(paths.backOfficeScripts, ['scriptsBackOffice']);
const watchBackOfficeStyles = () => gulp.watch(paths.backOfficeSass, ['stylesBackOffice']);
const watchScripts = () => gulp.watch(paths.scripts, ['scripts']);
const watchStyles = () => gulp.watch(paths.sass, ['styles']);
const watchTests = () => gulp.watch(paths.tests, ['test']);
const watchJestTests = () => gulp.watch([jestConfig.rootDir + "/!**!/!*.js"], ['jest']);

const watch = (done) => {
  gulp.parallel(
    watchBackOfficeScripts,
    watchBackOfficeStyles,
    watchScripts,
    watchStyles,
    watchTests,
    watchJestTests
  );
  done();
};

const webserver = (done) => {
  gulp.src('./')
    .pipe(server({
      livereload: false,
      open: true
    }));
  done();
};

const build = gulp.series(clean, gulp.parallel(
  lint,
  scripts,
  scriptsBackOffice,
  scriptsDiscoverer,
  styles,
  stylesBackOffice,
  testsBackOffice,
  test,
  watch,
  webserver
));

const buildFrontEnd = gulp.series(clean, gulp.parallel(
  lint,
  scripts,
  styles,
  test,
  watch,
  webserver
));

const buildBackOffice = gulp.series(clean, gulp.parallel(
  scriptsBackOffice,
  stylesBackOffice,
  testsBackOffice,
  watch,
  webserver
));

exports.default = build;
exports.fe = buildFrontEnd;
exports.bo = buildBackOffice;
