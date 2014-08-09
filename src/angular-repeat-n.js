angular.module('angular-repeat-n', [])

  .directive('ngRepeatN', function () {
    return {
      restrict: 'A',
      transclude: 'element',
      replace: true,
      link: function (scope, element, attrs, ctrl, $transclude) {

        // the element to insert after
        scope.last = element;

        // the parent element
        scope.parentElem = element.parent();

        // list of elements in the repeater
        scope.elems = [element];

        scope.$watch('repeat', function (newValue, oldValue) {

          var num = parseInt(newValue);

          if (isNaN(num)) {
            scope.last = scope.elems[0];
            for (i = 1; i < scope.elems.length; i += 1) {
              scope.parentElem.remove(scope.elems[i]);
            }
          } else {
            for (i = 0; i < newValue; i += 1) {
              repeatScope = scope.$new();
              repeatScope.$index = i;
              $transclude(repeatScope, function (clone) {
                scope.last.after(clone);
                scope.last = clone;
                scope.elems.push(clone);
              });
            }
          }
        });
      },
      scope: {
        repeat: '=ngRepeatN'
      }
    };
  });