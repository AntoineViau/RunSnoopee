var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('concatCss', function(cb) {

    return gulp.src([
            './src/webapp/app/**/*.css'
        ])
        .pipe(concat('runsnoopee.css'))
        .pipe(gulp.dest('./www/webapp/css'));
});
