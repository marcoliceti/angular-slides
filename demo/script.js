angular.module('demoApp', ['msl.slides']).
  controller('DemoCtrl', function ($scope) {
    $scope.$on('msl_slides_slide_change_start',
      function (event, old_slide_number, new_slide_number) {
      console.log(
        'Changing from slide ' + old_slide_number + ' to slide ' +
          new_slide_number
      );
    });
    $scope.$on('msl_slides_slide_change_success',
      function (event, old_slide_number, new_slide_number) {
      $scope.$broadcast('slide_changed');
      console.log(
        'Changed from slide ' + old_slide_number + ' to slide ' +
          new_slide_number
      );
    });
  }).
  controller('SlideCtrl', function ($scope) {
    $scope.$on('slide_changed', function (event) {
      console.log('Slide changed');
    });
  });
