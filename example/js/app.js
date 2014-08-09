angular.module('angular-repeat-n-demo', [
    'angular-repeat-n'
  ])

  .controller('DemoCtrl', function ($scope) {
    $scope.repeat = 4;
  });