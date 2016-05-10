'use strict';

angular.module('msl.slides').factory('mslSlidesScrollDetector', function () {
  return {
    install: function (scope) {
      // Mouse & touchpad
      window.onmousewheel = function (event) {
        event.preventDefault();
        var timestamp = event.timeStamp;
        if (event.deltaY > 0) {
          scope.$emit('msl_slides_scroll', 'down', timestamp);
        } else if (event.deltaY < 0) {
          scope.$emit('msl_slides_scroll', 'up', timestamp);
        }
      };

      // keyboard
      document.onkeydown = function (event) {
        event.preventDefault();
        var timestamp = event.timeStamp;
        var directions = { 40: 'down', 38: 'up' };
        var key = event.keyCode;
        var direction = directions[key];
        if (direction) scope.$emit('msl_slides_scroll', direction, timestamp);
      };
    }
  };
});
