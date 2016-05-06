'use strict';

angular.module('msl.slides').factory('mslSlidesScroller', function () {
  return {
    scroll: function (i) {
      var h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      window.scroll(0, i * h);
    }
  };
});
