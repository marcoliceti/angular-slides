'use strict';

angular.module('msl.slides').factory('mslSlidesScrollDetector', function () {
  return {
    keyboardHandlerFactory: function (scope) {
      return function (event) {
        var directions = { 40: 'down', 38: 'up' };
        var key = event.keyCode;
        var direction = directions[key];
        if (direction) scope.$emit('msl_slides_scroll', direction);
      };
    },
    start: function () {
      this.keyboardHandler = this.keyboardHandlerFactory(this.scope);
      window.addEventListener('keydown', this.keyboardHandler);
    },
    stop: function () {
      window.removeEventListener('keydown', this.keyboardHandler);
    },
    install: function (scope) {
      this.scope = scope;
      window.addEventListener('wheel', function (event) {
        event.preventDefault();
      });
      window.addEventListener('keydown', function (event) {
        event.preventDefault();
      });
      this.start();
    }
  };
});
