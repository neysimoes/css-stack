'use strict';

module.exports = function(gulp) {
  let tasks         = {},
      bootstrap     = require('bootstrap-styl'),
      changed       = require('gulp-changed'),
      concat        = require('gulp-concat'),
      cssnano       = require('gulp-cssnano'),
      postcss       = require('gulp-postcss'),
      stylus        = require('gulp-stylus'),
      lost          = require('lost'),
      pxtorem       = require('postcss-pxtorem'),
      autoprefixer  = require('autoprefixer'),
      rupture       = require('rupture'),
      mqpacker      = require('css-mqpacker'),
      plumber       = require('gulp-plumber'),
      gulpif        = require('gulp-if'),
      flexibility   = require('postcss-flexibility'),
      error         = require('error');

  const supportedBrowsers = ['last 2 versions', 'Android >= 5', 'IE >= 9'],
        cssNanoConfig     = { zindex: false, minifyFontValues: false };

  tasks.stylus: function (sources, destinyDir, output, customVars) {
    return function() {
      let config = {
        'include css': true,
        'use': [rupture()],
        define: customVars || {}
      };

      return gulp.src(sources)
        .pipe(plumber({errorHandler: error}))
        .pipe(stylus(config))
        .pipe(postcss([
          lost(),
          pxtorem(),
          mqpacker(),
          autoprefixer({
            browsers: supportedBrowsers
          }),
          flexibility()
        ]))
        .pipe(concat(output))
        .pipe(cssnano(cssNanoConfig))
        .pipe(gulp.dest(destinyDir));
    }
  }

  tasks.bootstrap: function (sources, destinyDir) {
    let config = {
      use: [bootstrap()]
    };
    return function() {
      return gulp.src(sources)
        .pipe(plumber({errorHandler: error}))
        .pipe(stylus(config))
        .pipe(gulp.dest(destinyDir));
    }
  }

  tasks.vendors: function (source, destinyDir, minify) {
    return function() {
      return gulp.src(source)
        .pipe(plumber({errorHandler: error}))
        .pipe(changed(destinyDir))
        .pipe(concat('vendors.min.css'))
        .pipe(gulpif(minify, cssnano(cssNanoConfig).on('error', error)))
        .pipe(gulp.dest(destinyDir));
    }
  }

  return tasks;
};
