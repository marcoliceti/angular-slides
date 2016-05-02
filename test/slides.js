'use strict';

describe('Directive msl-slides', function () {
  var $compile, $rootScope;

  beforeEach(module('msl.slides'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('does nothing, right now', function () {
    var element = $compile('<msl-slides></msl-slides>')($rootScope);
    $rootScope.$digest();
  });
});
