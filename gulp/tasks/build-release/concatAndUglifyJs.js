var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    removeLogs = require('gulp-removelogs');

gulp.task('concatAndUglifyJs', function(cb) {

    return gulp.src([
            './gulp/tmp/preprocessed/**/*.js',
            './gulp/tmp/preprocessed/**/*.js'
        ])
        .pipe(concat('runsnoopee.js'))
        .pipe(removeLogs())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./www/webapp/js'));
});
