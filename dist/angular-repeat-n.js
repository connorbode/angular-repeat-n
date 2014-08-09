angular.module('angular-repeat-n', [])

  .directive('ngRepeatN', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        console.log('loaded');
      }
    };
  });