'use strict';

angular.module('msl.slides').factory('mslSlidesScrollDetector', function () {
  return {
    wheelHandlerFactory: function (scope) {
      return function (event) {
        if (event.deltaY > 0) {
          scope.$emit('msl_slides_scroll', 'down');
        } else if (event.deltaY < 0) {
          scope.$emit('msl_slides_scroll', 'up');
        }
      };
    },
    keyboardHandlerFactory: function (scope) {
      return function (event) {
        var directions = { 40: 'down', 38: 'up' };
        var key = event.keyCode;
        var direction = directions[key];
        if (direction) scope.$emit('msl_slides_scroll', direction);
      };
    },
    start: function () {
      this.wheelHandler = this.wheelHandlerFactory(this.scope);
      this.keyboardHandler = this.keyboardHandlerFactory(this.scope);
      window.addEventListener('wheel', this.wheelHandler);
      window.addEventListener('keydown', this.keyboardHandler);
    },
    stop: function () {
      window.removeEventListener('wheel', this.wheelHandler);
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
