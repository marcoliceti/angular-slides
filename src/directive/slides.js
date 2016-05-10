'use strict';

angular.module('msl.slides').directive('mslSlides', ['mslSlidesLocation',
  'mslSlidesScroller', 'mslSlidesScrollDetector', 'mslSlidesViewport',
  function (mslSlidesLocation, mslSlidesScroller, mslSlidesScrollDetector,
  mslSlidesViewport) {
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
        scope.unlock_scroll = Date.now() + 1000;
        var start = mslSlidesViewport.positionOf(old_slide_number);
        var stop = mslSlidesViewport.positionOf(new_slide_number);
        mslSlidesScroller.scroll(start, stop);
      };

      // Event handling

      scope.$on('$locationChangeSuccess', function (event) {
        var number = mslSlidesLocation.getSlideNumber();
        if (scope.validSlideNumber(number)) scope.slide_number = number;
      });

      scope.$on('msl_slides_scroll', function (event, direction, timestamp) {
        if (timestamp > scope.unlock_scroll) {
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
        };
      });

      scope.$watch('slide_number', function (new_slide_number,
        old_slide_number) {
        var new_slide_number = new_slide_number || 0;
        var old_slide_number = old_slide_number || 0;
        if (new_slide_number !== old_slide_number) {
          scope.changeSlide(old_slide_number, new_slide_number);
        }
      });

      // Install delegate services

      mslSlidesScrollDetector.install(scope);
    }
  };
}]);
