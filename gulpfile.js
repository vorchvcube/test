var gulp = require('gulp'), 
    sass = require('gulp-sass'), 
    concat      = require('gulp-concat'), 
    uglify      = require('gulp-uglifyjs'),
    Promise = require('es6-promise').Promise,
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');
    del         = require('del');
    notify = require( 'gulp-notify' );
    reload = browserSync.reload;


gulp.task('sass', function(){
    return gulp.src([
        'app/angular/modules/**/**/*.scss'
    ])
        .pipe(sass())
        .pipe( sass().on( 'error', notify.onError(
            {
                message: "<%= error.message %>",
                title  : "Sass Error!"
            } ) )
        )
        .pipe(concat('main.css'))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('module', function() {
    return gulp.src([
        'app/angular/modules/**/**/*.js',
        'app/angular/modules/**/*.js'
    ])
        .pipe(concat('module.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('app/assets/js'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('libs', function() {
    return gulp.src([
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js'
        ])
        .pipe(concat('libs.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('app/assets/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('build', ['sass', 'module','libs','clean'], function() {

    var buildCss = gulp.src([
            'app/assets/css/**.css',
        ])
        .pipe(gulp.dest('dist/assets/css'))

    var buildFonts = gulp.src('app/assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'))

    var buildJs = gulp.src('app/assets/js/**/*')
        .pipe(gulp.dest('dist/assets/js'))

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('watch', ['browser-sync','module', 'sass','libs'], function() {
    gulp.watch('app/angular/modules/**/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch([
        'app/*.html',
        'app/angular/modules/**/*.html'
    ], browserSync.reload);
    gulp.watch([
            'app/dev/layout/modules/**/**/*.js',
            'app/angular/modules/**/*.js'
    ],['module']).on('change', browserSync.reload);
    gulp.watch('bower_components/**/*.js',['libs']).on('change', browserSync.reload);
});



gulp.task('default', ['watch'], function () {
}
);
