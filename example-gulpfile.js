'use strict';
let gulp          = require('gulp'),
    styles        = require('./tasks/styles')(gulp),
    pkg           = require('./package.json');


// Example css vendors task
gulp.task('css:vendors',
          styles.vendors(
            [ // sources
              "bower_components/normalize-css/normalize.css",
              "bower_components/owl.carousel/dist/assets/owl.carousel.min.css",
              "bower_components/ez-plus/css/jquery.ez-plus.css"
            ],
            '/assets/css', // destiny
            'minify')); // minify

// Example bootstrap task
gulp.task('bootstrap',
  styles.bootstrap(
    'assets/stylus/bootstrap.styl', // source
    'assets/css' // destiny
  )
);

// Example stylus task
gulp.task('stylus:app', ['css:vendors', 'bootstrap'], styles.stylus(
    'assets/stylus/app.styl', // souce
    'assets/css', // destiny
    'app.css', // output file name
    { // some custom vars, used on Stylus
      pkgVersion: pkg.version
    }
  )
);

// Example css task
gulp.task('css', ['stylus:app'], styles.css('assets/css/app.css', 'dist/assets/css/'));
