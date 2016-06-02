var
gulp       = require('gulp'),
less       = require('gulp-less'),
concat     = require('gulp-concat'),
minifycss  = require('gulp-minify-css'),
notify     = require('gulp-notify'),
livereload = require('gulp-livereload'),
config     = require('./config.js');

gulp.task('css', function() {
    var stream = gulp
    .src([        
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/font-awesome/css/font-awesome.css',                
        'assets/less/app.less',
        'components/**/*.css'
    ])
    .pipe(less()
    .on('error', notify.onError(function (error) {
        return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(concat('style.min.css'))
    .pipe(minifycss());

    return stream
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload());
});
