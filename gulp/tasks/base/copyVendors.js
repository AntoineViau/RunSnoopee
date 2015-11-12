var gulp = require('gulp');

gulp.task('copyVendors', function() {
    return gulp.src([
            './src/webapp/vendor/**/*',
            './src/webapp/flatboard/dist/**/*',
        ], {
            base: './src/webapp/'
        })
        .pipe(gulp.dest('./www/webapp/'));
});

