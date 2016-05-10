'use strict';

angular.module('msl.slides').factory('mslSlidesScrollDetector', function () {
  return {
    install: function (scope) {
      var self = this;
      self.scope = scope;
      window.onmousewheel = function (event) {
        event.preventDefault();
        // var timestamp = event.timeStamp;
        var timestamp = Date.now();
        if (event.deltaY > 0) {
          self.scope.$emit('msl_slides_scroll', 'down', timestamp);
        } else if (event.deltaY < 0) {
          self.scope.$emit('msl_slides_scroll', 'up', timestamp);
        }
      };
    }
  };
});
