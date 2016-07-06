'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/module.js',
      'src/service/viewport.js',
      'src/service/scroll_detector.js',
      'src/service/config.js',
      'src/service/scroller.js',
      'src/service/location.js',
      'src/directive/slides.js',
      'test/directive/slides.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  });
}
