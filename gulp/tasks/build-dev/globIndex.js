var gulp = require('gulp'),
    htmlGlob = require('gulp-html-glob-expansion'),
    rename = require('gulp-rename');

gulp.task('globIndex', function() {
    return gulp.src('./src/webapp/index.html')
        .pipe(htmlGlob({
            root: './src/webapp/'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./gulp/tmp/globbed'));
});
