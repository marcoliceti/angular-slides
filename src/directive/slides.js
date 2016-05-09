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

      // Slide change logic

      scope.changeSlide = function (new_slide_number, old_slide_number) {
        mslSlidesScroller.scroll(new_slide_number);
      };

      // Event handling

      scope.$on('$locationChangeSuccess', function () {
        var slide_number = mslSlidesLocation.getSlideNumber();
        scope.$emit('msl_slides_proposed_slide_change', slide_number);
      });

      scope.$on('msl_slides_proposed_slide_change', function (event, number) {
        if (scope.validSlideNumber(number)) {
          scope.slide_number = number;
        }
      });

      scope.$watch('slide_number', function (new_slide_number,
        old_slide_number) {
        var new_slide_number = new_slide_number || 0;
        var old_slide_number = old_slide_number || 0;
        if (new_slide_number !== old_slide_number) {
          scope.changeSlide(old_slide_number, new_slide_number);
        }
      });
    }
  };
}]);
