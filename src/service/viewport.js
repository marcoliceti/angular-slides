'use strict';

angular.module('msl.slides').factory('mslSlidesViewport', function () {
  return {
    positionOf: function (slide_number) {
      var h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      return h * slide_number;
    }
  };
});
