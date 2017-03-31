angular-repeat-n (looking for maintainer)
================

**I no longer maintain this package as I no longer work on any projects related to Angular.  If you find this project useful and use it regularly, please get in touch to discuss taking over the project.  Maintenance overhead should be fairly small as it is a straightforward plugin, but there are a number of small issues being raised for edge cases.**

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
