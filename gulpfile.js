var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    es = require('event-stream'),
    htmlmin = require('gulp-htmlmin'),
    jshint = require('gulp-jshint'),
    cleanCSS = require('gulp-clean-css');

gulp.task('clean', function() {
    return gulp.src('dist/').pipe(clean());
});

//Tasks maybe have dependencies
gulp.task('jshint', function() {
    console.log("Verfying quality of JS code...");
    return gulp.src('js/**/*.js') //'.src' -> Define where files are
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Requiring 'clean' task before 'uglify' task
gulp.task('uglify', ['clean'], function() {
    console.log('Minifing JS files...');
    /*
    //Concat sources
    return es.merge([
        gulp.src(''),
        gulp.src('')
    ])
    */

    //'.dest' -> Node API of Stream, simply move files do destiny
    return gulp.src(['js/**/*.js', 'lib/**/*.js'])
                .pipe(uglify())
                .pipe(gulp.dest('dist/js'));
});

gulp.task('htmlmin', function() {
    return gulp.src('view/*.html')
                .pipe(htmlmin({ collapseWhiteSpace: true }))
                .pipe(gulp.dest('dist/view'));
});

gulp.task('cleacnCSS', function() {
    return gulp.src([
                    'lib/',
                    'css/**/*.css'
                ])
                .pipe(htmlmin({ collapseWhiteSpace: true }))
                .pipe(gulp.dest('dist/view'));
});

gulp.task('default', ['jshint', 'uglify', 'htmlmin']);
