angular-repeat-n
================

Angular directive used to repeat an HTML element n times.

## Installation

via Bower: `bower install angular-repeat-n`

## Usage

Load the `angular-repeat-n` module in your app or controller.

Repeat any element:

`<span ng-repeat-n="4">{{$index}}</span>` --> "1234"

`<div ng-repeat-n="repeatNumTimes"></div>` will repeat for the value of `$scope.repeatNumTimes`

## Hacking

Fork & submit a pull request if there's something I missed!

- `gulp test` to test
- `gulp build` to build