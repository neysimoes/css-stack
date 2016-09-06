'use strict';

module.exports = function(gulp) {
  return {
    styles: require('./tasks/styles')(gulp)
  }
};
