'use strict';

angular.module('msl.slides').factory('mslSlidesScroller', ['$q', '$interval',
  '$window', function ($q, $interval, $window) {
  return {
    install: function (config) {
      this.config = config;
    },
    scroll: function (start, stop) {
      var deferred = $q.defer();
      var config = this.config;
      var duration = config.duration;
      var frames = config.frames;
      var delta = stop - start;
      var step = duration / frames;
      var elapsed = step;
      var task = $interval(function () {
        if (elapsed < duration) {
          $window.scroll(0, start + (elapsed / duration) * delta);
          elapsed += step;
        } else {
          $window.scroll(0, stop);
          $interval.cancel(task);
          deferred.resolve();
        }
      }, step);
      return deferred.promise;
    }
  };
}]);
