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

          var newInt = parseInt(newValue)
            , oldInt = parseInt(oldValue)
            , bothValues = ! isNaN(newInt) && ! isNaN(oldInt)
            , childScope;

          // decrease number of repeated elements
          if (isNaN(newInt) || (bothValues && newInt < oldInt)) {
            scope.last = scope.elems[0];
            for (i = scope.elems.length - 1; i > 1; i -= 1) {
              scope.parentElem.remove(scope.elems[i]);
            }
          } 

          // increase number of repeated elements
          else {
            i = scope.elems.length - 1;

            for (i; i < newInt; i += 1) {
              childScope = scope.$new();
              childScope.$index = i;
              $transclude(childScope, function (clone) {
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