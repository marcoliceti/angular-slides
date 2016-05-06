'use strict';

describe('Directive msl-slides', function () {
  var $compile, $rootScope;

  beforeEach(module('msl.slides'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('makes every child element fullscreen', function () {
    var element = $compile(
      '<msl-slides> \
        <div></div> \
        <div></div> \
        <div></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    expect(element.children().eq(0).css('width')).toEqual('100vw');
    expect(element.children().eq(1).css('width')).toEqual('100vw');
    expect(element.children().eq(2).css('width')).toEqual('100vw');
    expect(element.children().eq(0).css('height')).toEqual('100vh');
    expect(element.children().eq(1).css('height')).toEqual('100vh');
    expect(element.children().eq(2).css('height')).toEqual('100vh');
  });
});
