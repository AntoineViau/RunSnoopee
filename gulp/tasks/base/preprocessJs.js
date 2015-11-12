var gulp = require('gulp'),
    preprocess = require('gulp-preprocess');

gulp.task('preprocessJs', function(cb) {
    return gulp.src([
            /*
            On ne fait pas un preprocess sur /src/webapp/
            parce que ça plante au niveau des vendors.
            */
            './src/webapp/app/**/*',
            './src/webapp/core/**/*'
        ], {
            base: './src/webapp/'
        })
        .pipe(preprocess())
        .pipe(gulp.dest('./gulp/tmp/preprocessed/'));


});
