'use strict';

angular.module('msl.slides').factory('mslSlidesScroller', ['$q', function ($q) {
  return {
    config: {
      duration: 1000,
      frames: 30
    },
    scroll: function (start, stop) {
      var deferred = $q.defer();
      var config = this.config;
      var duration = config.duration;
      var frames = config.frames;
      var delta = stop - start;
      var step = duration / frames;
      var elapsed = step;
      var id = setInterval(function () {
        if (elapsed < duration) {
          window.scroll(0, start + (elapsed / duration) * delta);
          elapsed += step;
        } else {
          window.scroll(0, stop);
          clearInterval(id);
          deferred.resolve();
        }
      }, step);
      return deferred.promise;
    }
  };
}]);
