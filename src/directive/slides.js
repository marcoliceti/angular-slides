'use strict';

angular.module('msl.slides').directive('mslSlides', ['mslSlidesLocation',
  'mslSlidesScroller', function (mslSlidesLocation, mslSlidesScroller) {
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

      // Slide change handling

      scope.changeSlide = function (new_slide_number, old_slide_number) {
        if (new_slide_number !== old_slide_number) {
          mslSlidesScroller.scroll(new_slide_number);
        }
      };

      // Watchers & listeners

      scope.$on('$locationChangeSuccess', function () {
        var slide_number = mslSlidesLocation.getSlideNumber();
        if (scope.validSlideNumber(slide_number)) {
          scope.slide_number = slide_number;
        }
      })

      scope.$watch('slide_number', function (new_slide_number,
        old_slide_number) {
        scope.changeSlide(new_slide_number, old_slide_number);
      });
    }
  };
}]);
