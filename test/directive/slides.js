'use strict';

describe('Directive msl-slides', function () {
  var $compile, $rootScope, mslSlidesLocation;

  beforeEach(module('msl.slides'));

  beforeEach(inject(function (
    _$compile_,
    _$rootScope_,
    _mslSlidesLocation_
  ) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    mslSlidesLocation = _mslSlidesLocation_;
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

  it('keeps track of contained slides', function () {
    var element = $compile(
      '<msl-slides> \
        <div id="1"></div> \
        <div id="2"></div> \
        <div id="3"></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    var scope = element.isolateScope();
    expect(scope.slides.eq(0)).toEqual(element.children().eq(0));
    expect(scope.slides.eq(1)).toEqual(element.children().eq(1));
    expect(scope.slides.eq(2)).toEqual(element.children().eq(2));
    expect(scope.slides.eq(0)).not.toEqual(element.children().eq(1));
    expect(scope.slides.eq(1)).not.toEqual(element.children().eq(2));
    expect(scope.slides.eq(2)).not.toEqual(element.children().eq(0));
  });

  it('watches the window location for changes in the slide number',
    function () {
    var element = $compile(
      '<msl-slides> \
        <div id="1"></div> \
        <div id="2"></div> \
        <div id="3"></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    var scope = element.isolateScope();
    spyOn(mslSlidesLocation, 'getSlideNumber').and.returnValue(0);
    scope.$apply();
    expect(scope.slide_number).toEqual(0);
    mslSlidesLocation.getSlideNumber.and.returnValue(1);
    scope.$apply();
    expect(scope.slide_number).toEqual(1);
    mslSlidesLocation.getSlideNumber.and.returnValue(2);
    scope.$apply();
    expect(scope.slide_number).toEqual(2);
  });

  it('validates the slide number coming from window location', function () {
    var element = $compile(
      '<msl-slides> \
        <div id="1"></div> \
        <div id="2"></div> \
        <div id="3"></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    var scope = element.isolateScope();
    spyOn(scope, 'validSlideNumber').and.callThrough();
    spyOn(mslSlidesLocation, 'getSlideNumber').and.returnValue(0);
    scope.validSlideNumber.calls.reset();
    scope.$apply();
    expect(scope.validSlideNumber).toHaveBeenCalledWith(0);
    expect(scope.slide_number).toEqual(0);
    mslSlidesLocation.getSlideNumber.and.returnValue(1);
    scope.validSlideNumber.calls.reset();
    scope.$apply();
    expect(scope.validSlideNumber).toHaveBeenCalledWith(1);
    expect(scope.slide_number).toEqual(1);
    mslSlidesLocation.getSlideNumber.and.returnValue(2);
    scope.validSlideNumber.calls.reset();
    scope.$apply();
    expect(scope.validSlideNumber).toHaveBeenCalledWith(2);
    expect(scope.slide_number).toEqual(2);
    mslSlidesLocation.getSlideNumber.and.returnValue(3);
    scope.validSlideNumber.calls.reset();
    scope.$apply();
    expect(scope.validSlideNumber).toHaveBeenCalledWith(3);
    expect(scope.slide_number).toEqual(2);
    mslSlidesLocation.getSlideNumber.and.returnValue(-1);
    scope.validSlideNumber.calls.reset();
    scope.$apply();
    expect(scope.validSlideNumber).toHaveBeenCalledWith(-1);
    expect(scope.slide_number).toEqual(2);
    mslSlidesLocation.getSlideNumber.and.returnValue(NaN);
    scope.validSlideNumber.calls.reset();
    scope.$apply();
    expect(scope.validSlideNumber).toHaveBeenCalledWith(NaN);
    expect(scope.slide_number).toEqual(2);
  });

  it('knows which are valid slide numbers',
    function () {
      var element = $compile(
        '<msl-slides> \
          <div id="1"></div> \
          <div id="2"></div> \
          <div id="3"></div> \
        </msl-slides>'
      )($rootScope);
    $rootScope.$digest();
    var scope = element.isolateScope();
    expect(scope.validSlideNumber(0)).toBeTruthy();
    expect(scope.validSlideNumber(1)).toBeTruthy();
    expect(scope.validSlideNumber(2)).toBeTruthy();
    expect(scope.validSlideNumber(3)).toBeFalsy();
    expect(scope.validSlideNumber(-1)).toBeFalsy();
    expect(scope.validSlideNumber(NaN)).toBeFalsy();
  });

  it('when the slide changes, invokes the related handler',
    function () {
      var element = $compile(
        '<msl-slides> \
          <div id="1"></div> \
          <div id="2"></div> \
          <div id="3"></div> \
        </msl-slides>'
      )($rootScope);
    $rootScope.$digest();
    var scope = element.isolateScope();
    spyOn(scope, 'changeSlide');
    scope.slide_number = 0;
    scope.$apply();
    expect(scope.changeSlide).toHaveBeenCalledWith(0, undefined);
    scope.changeSlide.calls.reset();
    scope.slide_number = 1;
    scope.$apply();
    expect(scope.changeSlide).toHaveBeenCalledWith(1, 0);
    scope.changeSlide.calls.reset();
    scope.slide_number = 2;
    scope.$apply();
    expect(scope.changeSlide).toHaveBeenCalledWith(2, 1);
  });
});
