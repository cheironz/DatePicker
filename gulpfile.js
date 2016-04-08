var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify');

// Configs
var combineCSSName = 'all.css';
var combineJSName = 'all.js';
var htmlminConfig = {
	removeComments: true,
	collapseWhitespace: true,
	collapseBooleanAttributes: true,
	removeEmptyAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	minifyJS: true,
	minifyCSS: true
};
var autoprefixerConfig = {
	browsers: ['last 2 versions', 'Android >= 4.0'],
	cascade: true,
	remove: true
}

gulp.task('html', function(){
	return gulp.src('src/*.html')
	.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
	.pipe(htmlmin(htmlminConfig))
	.pipe(gulp.dest('dist'));
});

gulp.task('style', function(){
	return gulp.src('src/less/*.less')
	.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(autoprefixer(autoprefixerConfig))
	.pipe(gulp.dest('src/css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(concat(combineCSSName))
	.pipe(gulp.dest('src/css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(rename({ suffix: '.min'}))
	.pipe(minifycss())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('src/css'))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function(){
	return gulp.src(['src/js/*.js', '!src/js/' + combineJSName, '!src/js/*.min.js'])
	.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat(combineJSName))
	.pipe(gulp.dest('src/js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(rename({ suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('src/js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('image', function(){
	return gulp.src('src/images/*')
	.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function(){
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/less/*.less', ['style']);
	gulp.watch(['src/js/*.js', '!src/js/' + combineJSName, '!src/js/*.min.js'], ['js']);
	gulp.watch('src/images/*', ['image'])
	livereload.listen();
	gulp.watch(['dist/*']).on('change', livereload.changed);
});
	
gulp.task('default', function(){
	gulp.start('html', 'style', 'js', 'image', 'watch');
});