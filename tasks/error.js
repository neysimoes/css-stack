var notify = require('gulp-notify');

module.exports = function(err) {
  return notify.onError({
    title: 'Gulp',
    message: '<%= error.message %>'
  })(err);
};
