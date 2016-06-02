var
gulp       = require('gulp'),
concat     = require('gulp-concat'),
uglify     = require('gulp-uglify'),
livereload = require('gulp-livereload'),
config     = require('./config.js');

gulp.task('libs', function() {
    var libs = [
        "node_modules/angular/angular.js",
    	"node_modules/angular-animate/angular-animate.js",
        "node_modules/angular-cookies/angular-cookies.js",
        "node_modules/angular-resource/angular-resource.js",
        "node_modules/angular-sanitize/angular-sanitize.js",
        "node_modules/angular-touch/angular-touch.js",
        "node_modules/angular-ui-mask/dist/mask.min.js",
        "node_modules/angular-messages/angular-messages.js",
    	"node_modules/ngstorage/ngStorage.js",        
    	"node_modules/angular-ui-router/release/angular-ui-router.js",
        "node_modules/angular-bootstrap/ui-bootstrap-tpls.js",
        'assets/toaster/toaster.js',        
    	"config/global.js",
    	"config/local.js"
    ];

    var stream = gulp
    .src(libs)
    .pipe(concat('libs.js'));

    if (config.uglifyJS === true) {
        stream.pipe(uglify());
    }

    return stream
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload());
});
