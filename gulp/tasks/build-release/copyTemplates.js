var gulp = require('gulp');

gulp.task('copyTemplates', function(cb) {

    return gulp.src([
            './src/webapp/app/**/*.html'
        ], {
            base: './src/webapp/'
        })
        .pipe(gulp.dest('./www/webapp/'));
});
