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
const babel = require('babel-core/register');
const isparta = require('isparta');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const jest = require('jest-cli');



const paths = {
	html: 'index.html',
	scripts: './src/**/*.js',
	sass: './styles/**/*.scss',
	tests: './test/**/*.js',
	backOfficeScripts: './src/admin/**/*.js',
	backOfficeSass: './styles/sass/admin/**/*.scss',
	buildSass: './build/styles',
	buildScripts: './build/js',
	backOfficeTests: './back-office-tests/__tests__'
};

function compile() {
	const bundler = watchify(browserify('./src/app.js', {debug: true}).transform(babelify));

	bundler.bundle()
		.on('error', (err) => {
			console.error(err);
			this.emit('end');
		})
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.buildScripts));
}

function compileBackOffice() {
	const bundler = watchify(browserify('./src/admin/back-office-app.js', {debug: true})
		.transform('babelify', {presets: ['react', 'es2015', 'stage-0']}));

	bundler.bundle()
		.on('error', (err) => {
			console.error(err);
			this.emit('end');
		})
		.pipe(source('back-office.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.buildScripts));
}

function compileDiscoverer() {
	const bundler = watchify(browserify('./src/admin/discoverer.js', {debug: true})
		.transform('babelify', {presets: ['react', 'es2015', 'stage-0']}));

	bundler.bundle()
		.on('error', (err) => {
			console.error(err);
			this.emit('end');
		})
		.pipe(source('back-office-discoverer.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.buildScripts));
}

gulp.task('scripts', () => compile());
gulp.task('scriptsBackOffice', () => compileBackOffice());
gulp.task('scriptsDiscoverer', () => compileDiscoverer());

gulp.task('clean', () => del(['build']));

gulp.task('sass', () => {
	gulp.src(paths.sass)
		.pipe(sourcemaps.init({loadMaps: true}))
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
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.buildSass));
});

gulp.task('sassBackOffice', () => {
	gulp.src(paths.backOfficeSass)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('back-office.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.buildSass));
});


const jestConfig = {
	rootDir: paths.backOfficeTests
};
gulp.task('jest', function(done) {
	jest.runCLI({ config : jestConfig }, ".", function() {
		done();
	});
});

gulp.task('pre-test', () => {
	gulp.src(paths.scripts)
		.pipe(istanbul({
			// supports es6
			instrumenter: isparta.Instrumenter
		}))
		.pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
	gulp.src(paths.tests)
		.pipe(mocha({
			compilers: {
				js: babel
			}
		}))
		.pipe(istanbul.writeReports({
			dir: './coverage',
			reporters: [ 'lcov' ],
			reportOpts: { dir: './coverage'}
		}))
		.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('webserver', () => {
	gulp.src('./')
		.pipe(server({
			livereload: false,
			open: false
		}));
});

gulp.task('lint', () => {
	gulp.src(paths.scripts)
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('default', ['clean',
						'lint',
						'scripts',
						'sass',
						'scriptsBackOffice',
						'scriptsDiscoverer',
						'sassBackOffice',
						'jest',
						'test',
						'watch',
						'webserver']);

gulp.task('watch', () => {
	gulp.watch(paths.backOfficeScripts, ['scriptsBackOffice']);
	gulp.watch(paths.backOfficeSass, ['sassBackOffice']);
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.tests, ['test']);
	gulp.watch([ jestConfig.rootDir + "/**/*.js" ], [ 'jest' ]);
});