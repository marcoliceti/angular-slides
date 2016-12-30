'use strict';

angular.module('msl.slides', []);

'use strict';

angular.module('msl.slides').factory('mslSlidesLocation', ['$location',
  function ($location) {
  return {
    getSlideNumber: function () {
      var query_param = $location.search()['slide_number'];
      return parseInt(query_param);
    },
    setSlideNumber: function (slide_number) {
      $location.search('slide_number', slide_number);
    }
  };
}]);

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
          event.preventDefault();
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
      this.start();
    }
  };
}]);

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

'use strict';

angular.module('msl.slides').factory('mslSlidesConfig', function () {
  return {
    duration: 500,
    frames: 30
  };
});

'use strict';

angular.module('msl.slides').directive('mslSlides', ['mslSlidesLocation',
  'mslSlidesScroller', 'mslSlidesScrollDetector', 'mslSlidesViewport',
  'mslSlidesConfig', function (mslSlidesLocation, mslSlidesScroller,
  mslSlidesScrollDetector, mslSlidesViewport, mslSlidesConfig) {
  return {
    restrict: 'E',
    scope: {}, // isolated
    link: function link(scope, element) {

      // Useful references

      scope.slides = element.children();

      // CSS

      scope.slides.css('width', '100vw');
      scope.slides.css('height', '100vh');

      // Validation

      scope.validSlideNumber = function (n) {
        return n >= 0 && n < scope.slides.length;
      };

      // Slide change logic

      scope.changeSlide = function (old_slide_number, new_slide_number) {
        mslSlidesScrollDetector.stop();
        scope.$emit(
          'msl_slides_slide_change_start',
          old_slide_number,
          new_slide_number
        );
        var start = mslSlidesViewport.positionOf(old_slide_number);
        var stop = mslSlidesViewport.positionOf(new_slide_number);
        mslSlidesScroller.scroll(start, stop).then(function () {
          mslSlidesLocation.setSlideNumber(new_slide_number);
          scope.$emit(
            'msl_slides_slide_change_success',
            old_slide_number,
            new_slide_number
          );
          mslSlidesScrollDetector.start();
        });
      };

      // Event handling

      scope.$on('$locationChangeSuccess', function (event) {
        var number = mslSlidesLocation.getSlideNumber();
        if (scope.validSlideNumber(number)) scope.slide_number = number;
      });

      scope.$on('msl_slides_scroll', function (event, direction) {
        var next_slide = {
          up: scope.slide_number - 1,
          down: scope.slide_number + 1
        };
        var number = next_slide[direction];
        if (scope.validSlideNumber(number)) {
          scope.$apply(function () {
            scope.slide_number = number;
          });
        }
      });

      scope.$watch('slide_number', function (new_slide_number,
        old_slide_number) {
        scope.slide_number = scope.slide_number || 0;
        var new_slide_number = new_slide_number || 0;
        var old_slide_number = old_slide_number || 0;
        if (new_slide_number !== old_slide_number) {
          scope.changeSlide(old_slide_number, new_slide_number);
        }
      });

      // Install delegate services

      mslSlidesScroller.install(mslSlidesConfig);
      mslSlidesScrollDetector.install(scope);
    }
  };
}]);
