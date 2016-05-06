'use strict';

angular.module('msl.slides').directive('mslSlides', function () {
  return {
    restrict: 'E',
    scope: {}, // isolated
    link: function link(scope, element) {
      element.children().css('width', '100vw');
      element.children().css('height', '100vh');
    }
  };
});
