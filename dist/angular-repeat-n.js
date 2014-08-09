angular.module('angular-repeat-n', [])

  .directive('repeatN', function () {
    return {
      restrict: 'A',
      transclude: 'element',
      replace: true,
      link: function (scope, element, attrs, ctrl, $transclude) {
        var prev = element
          , i
          , copy;
        scope.$watch(attrs.repeatN, function (newValue) {
          for (i = 0; i < newValue; i += 1) {
            $transclude(function (clone) {
              prev.after(clone);
              prev = clone;
            });
          }
        });
      }
    };
  });