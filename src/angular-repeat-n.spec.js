describe('angular-repeat-n', function () {

  var $compile
    , $scope

  beforeEach(module('angular-repeat-n'));
  beforeEach(inject(function ($injector) {
    $scope = $injector.get('$rootScope').$new();
  }));

  function compile(tpl, $scope) {
    var rootElem;

    inject(function ($compile) {
      rootElem = $compile(tpl)($scope);
    });
    $scope.$digest();

    return rootElem;
  }

  it('repeats an element when the value is numeric', function () {
    var rootElem = compile('<div><div ng-repeat-n="4"></div></div>', $scope);
    expect(rootElem.children().length).toEqual(4);
  });

  it('repeats an element when the value is a variable', function () {
    $scope.repeat = Math.floor(Math.random() * 20);
    var rootElem = compile('<div><div ng-repeat-n="repeat"></div></div>', $scope);
    expect(rootElem.children().length).toEqual($scope.repeat);
  });

  it('does not repeat if the variable is not a number', function () {
    var testVals = [
      'string',
      true,
      undefined,
      null,
      /regexp/
    ];

    var rootElem;

    _.forEach(testVals, function (testVal) {
      $scope.repeat = testVal;
      rootElem = compile('<div><div ng-repeat-n="repeat"></div></div>', $scope);
      expect(rootElem.children().length).toEqual(0);
    });
  });

  it('deletes elements if the value is changed from numeric to non-numeric', function () {
    $scope.repeat = 4;
    var elem = compile('<div><div ng-repeat-n="repeat"></div></div>', $scope);
    $scope.repeat = undefined;
    $scope.$digest();
    expect(elem.children().length).toEqual(0);
  });

  it('adds elements if the value is changed from non-numeric to numeric', function () {
    $scope.repeat = undefined;
    var elem = compile('<div><div ng-repeat-n="repeat"></div></div>', $scope);
    $scope.repeat = 4;
    $scope.$digest();
    expect(elem.children().length).toEqual(4);
  });

  it('adds elements if the value is increased', function () {
    $scope.repeat = 4;
    var elem = compile('<div><div ng-repeat-n="repeat"></div></div>', $scope);
    $scope.repeat = 5;
    $scope.$digest();
    expect(elem.children().length).toEqual(5);
  });

  it('removes elements if the value is decreased', function () {
    $scope.repeat = 5;
    var elem = compile('<div><div ng-repeat-n="repeat"></div></div>', $scope);
    $scope.repeat = 4;
    $scope.$digest();
    expect(elem.children().length).toEqual(4);
  });

  it('can access elements from the parent scope', function () {
    $scope.repeat = 2;
    $scope.test = "test";
    var elem = compile('<div><div ng-repeat-n="repeat">{{test}}</div></div>', $scope);
    expect(elem.children()[0].innerText).toEqual("test");
  });
});