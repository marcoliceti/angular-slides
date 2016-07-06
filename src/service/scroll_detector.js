'use strict';

angular.module('msl.slides').factory('mslSlidesScrollDetector', ['$window',
  function ($window) {
  return {
    keyboardHandlerFactory: function (scope) {
      return function (event) {
        var directions = { 40: 'down', 38: 'up' };
        var key = event.keyCode;
        var direction = directions[key];
        if (direction) {
          scope.$emit('msl_slides_scroll', direction);
        }
      };
    },
    start: function () {
      angular.element($window).on('keydown', this.keyboardHandler);
    },
    stop: function () {
      angular.element($window).off('keydown', this.keyboardHandler);
    },
    install: function (scope) {
      this.keyboardHandler = this.keyboardHandlerFactory(scope);
      angular.element($window).on('wheel', function (event) {
        event.preventDefault();
      });
      angular.element($window).on('keydown', function (event) {
        event.preventDefault();
      });
      this.start();
    }
  };
}]);
