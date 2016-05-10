'use strict';

angular.module('msl.slides').factory('mslSlidesScrollDetector', function () {
  return {
    install: function (scope) {
      window.onmousewheel = function (event) {
        event.preventDefault();
        var timestamp = event.timeStamp;
        if (event.deltaY > 0) {
          scope.$emit('msl_slides_scroll', 'down', timestamp);
        } else if (event.deltaY < 0) {
          scope.$emit('msl_slides_scroll', 'up', timestamp);
        }
      };
    }
  };
});
