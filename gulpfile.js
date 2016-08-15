const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const mocha = require('gulp-mocha');
const babel = require('babel-core/register');

gulp.task('es6', () => {
	browserify('src/app.js')
	.transform('babelify', {presets: ['es2015']})
	.bundle()
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(gulp.dest('build/'));
});

gulp.task('test', () => {
	return gulp.src(['test/**/*.js'])
		.pipe(mocha({
			compilers: {
				js: babel
			}
		}));
});

gulp.task('default', () => {
	gulp.watch(['src/**/*.js', 'test/**/*.js'], ['es6', 'test']);
});