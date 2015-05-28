angular.module('angular-repeat-n', [])

  .directive('ngRepeatN', ['$parse', function ($parse) {
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

        // a getter function to resolve the parameter
        var getter = $parse(attrs.ngRepeatN);

        scope.$watch(function () {
          return parseInt(attrs.ngRepeatN) || getter(scope);
        }, function (newValue, oldValue) {

          var newInt = parseInt(newValue)
            , oldInt = parseInt(oldValue)
            , bothValues = ! isNaN(newInt) && ! isNaN(oldInt)
            , childScope
            , i
            , limit;

          // decrease number of repeated elements
          if (isNaN(newInt) || (bothValues && newInt < oldInt)) {
            limit = bothValues ? newInt : 0;
            scope.last = scope.elems[limit];
            for (i = scope.elems.length - 1; i > limit; i -= 1) {
              scope.elems[i].remove();
              scope.elems.pop();
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
      }
    };
  }]);