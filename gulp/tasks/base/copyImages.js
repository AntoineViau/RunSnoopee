var gulp = require('gulp');

gulp.task('copyImages', function() {
    return gulp.src('./src/webapp/img/*')
        .pipe(gulp.dest('./www/webapp/img'));
});
