var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    cleanCSS = require('gulp-clean-css');

gulp.task('clean', function() {
    return gulp.src('dist/').pipe(clean());
});

//Tasks maybe have dependencies
gulp.task('jshint', function() {
    return gulp.src(['js/**/*.js', 'app.js']) //'.src' -> Define where files are
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Requiring 'clean' task before 'uglify' task
gulp.task('uglify', ['clean'], function() {
    //Concat sources
    return gulp.src('js/**/*.js').pipe(uglify())
        //'.dest' -> Node API of Stream, simply move files do destiny
        .pipe(gulp.dest('dist/js'));
});

gulp.task('cleanCSS', ['clean'], function() {
    return gulp.src([
        'css/**/*.css'
    ])
    .pipe(cleanCSS())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['jshint', 'uglify', 'cleanCSS']);
