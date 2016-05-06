'use strict';

angular.module('msl.slides').directive('mslSlides', ['mslSlidesLocation',
  function (mslSlidesLocation) {
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
        if (old_slide_number && new_slide_number !== old_slide_number) {
          // TODO
        }
      };

      // Watchers

      scope.$watch(function () {
        return mslSlidesLocation.getSlideNumber();
      }, function (number) {
        if (scope.validSlideNumber(number)) {
          scope.slide_number = number;
        }
      });

      scope.$watch('slide_number', function (new_slide_number,
        old_slide_number) {
        scope.changeSlide(new_slide_number, old_slide_number);
      });
    }
  };
}]);
