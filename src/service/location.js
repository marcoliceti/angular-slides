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
