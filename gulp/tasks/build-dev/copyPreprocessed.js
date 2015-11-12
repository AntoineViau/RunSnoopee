var gulp = require('gulp');

gulp.task('copyPreprocessed', function(cb) {

    return gulp.src([
            './gulp/tmp/preprocessed/**/*',
        ], {
            base: './gulp/tmp/preprocessed/'
        })
        .pipe(gulp.dest('./www/webapp'));

});
