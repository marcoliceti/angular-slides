angular.module('myApp', [ 'msl.slides' ]).
  controller('MyCtrl', function ($scope) {
    $scope.$on(
      'msl_slides_slide_change_success',
      function (event, old_slide, new_slide) {
        $scope.comes = {};
        if (old_slide === 3) $scope.comes.from_3 = true;
      }
    );
  });
