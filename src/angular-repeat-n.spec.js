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
});