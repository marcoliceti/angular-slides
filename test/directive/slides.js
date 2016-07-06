'use strict';

describe('Directive msl-slides', function () {
  var $compile;
  var $rootScope;
  var $q;
  var mslSlidesViewport;
  var mslSlidesScrollDetector;
  var mslSlidesConfig;
  var mslSlidesScroller;
  var mslSlidesLocation;

  beforeEach(module('msl.slides'));

  beforeEach(inject(function (
    _$compile_,
    _$rootScope_,
    _$q_,
    _mslSlidesViewport_,
    _mslSlidesScrollDetector_,
    _mslSlidesConfig_,
    _mslSlidesScroller_,
    _mslSlidesLocation_
  ) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $q = _$q_;
    mslSlidesViewport = _mslSlidesViewport_;
    mslSlidesScrollDetector = _mslSlidesScrollDetector_;
    mslSlidesConfig = _mslSlidesConfig_;
    mslSlidesScroller = _mslSlidesScroller_;
    mslSlidesLocation = _mslSlidesLocation_;
  }));

  it('stores references to each slide', function () {
    var element = $compile(
      '<msl-slides> \
        <div id="1"></div> \
        <div id="2"></div> \
        <div id="3"></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    var scope = element.isolateScope();
    expect(element.children().eq(0).prop('id')).
      toEqual(scope.slides.eq(0).prop('id'));
    expect(element.children().eq(1).prop('id')).
      toEqual(scope.slides.eq(1).prop('id'));
    expect(element.children().eq(2).prop('id')).
      toEqual(scope.slides.eq(2).prop('id'));
  });

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

  it('implements slide changing logic', function (done) {
    var element = $compile(
      '<msl-slides> \
        <div></div> \
        <div></div> \
        <div></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    // Spies and mocks
    var scope = element.isolateScope();
    spyOn(mslSlidesScrollDetector, 'start');
    spyOn(mslSlidesScrollDetector, 'stop');
    var start_spy = jasmine.createSpy();
    var success_spy = jasmine.createSpy();
    scope.$on('msl_slides_slide_change_start', start_spy);
    scope.$on('msl_slides_slide_change_success', success_spy);
    spyOn(mslSlidesViewport, 'positionOf').and.callFake(function (slide) {
      return (slide + 1) * 2;
    });
    var scroll_promise;
    spyOn(mslSlidesScroller, 'scroll').and.callFake(function () {
      var deferred = $q.defer();
      deferred.resolve();
      scroll_promise = deferred.promise;
      return deferred.promise;
    });
    spyOn(mslSlidesLocation, 'setSlideNumber');
    // Finally...
    scope.changeSlide(0, 1);
    // Expectations time!
    expect(mslSlidesScrollDetector.stop).toHaveBeenCalled();
    expect(start_spy).toHaveBeenCalledWith(jasmine.any(Object), 0, 1);
    expect(mslSlidesViewport.positionOf).toHaveBeenCalledWith(0);
    expect(mslSlidesViewport.positionOf).toHaveBeenCalledWith(1);
    expect(mslSlidesScroller.scroll).toHaveBeenCalledWith(2, 4);
    scroll_promise.then(function () {
      expect(mslSlidesLocation.setSlideNumber).toHaveBeenCalledWith(1);
      expect(success_spy).toHaveBeenCalledWith(jasmine.any(Object), 0, 1);
      expect(mslSlidesScrollDetector.stop).toHaveBeenCalled();
      done();
    });
    $rootScope.$apply(); // to resolve promises
  });

  it('validates slide numbers', function () {
    var element = $compile(
      '<msl-slides> \
        <div></div> \
        <div></div> \
        <div></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    var scope = element.isolateScope();
    expect(scope.validSlideNumber(0)).toBeTruthy();
    expect(scope.validSlideNumber(1)).toBeTruthy();
    expect(scope.validSlideNumber(2)).toBeTruthy();
    expect(scope.validSlideNumber(3)).not.toBeTruthy();
    expect(scope.validSlideNumber(-1)).not.toBeTruthy();
  });

  it('handles location changes', function () {
    var element = $compile(
      '<msl-slides> \
        <div></div> \
        <div></div> \
        <div></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    var scope = element.isolateScope();
    expect(scope.slide_number).toEqual(0);
    spyOn(mslSlidesLocation, 'getSlideNumber').and.returnValue(1);
    spyOn(scope, 'changeSlide');
    scope.$emit('$locationChangeSuccess');
    expect(scope.slide_number).toEqual(1);
    scope.$apply();
    expect(scope.changeSlide).toHaveBeenCalled();
    mslSlidesLocation.getSlideNumber.and.returnValue(666);
    scope.changeSlide.calls.reset();
    scope.$emit('$locationChangeSuccess');
    expect(scope.slide_number).toEqual(1);
    scope.$apply();
    expect(scope.changeSlide).not.toHaveBeenCalled();
  });

  it('delegates to a scroller and a scroll detector services', function () {
    spyOn(mslSlidesScroller, 'install');
    spyOn(mslSlidesScrollDetector, 'install');
    var element = $compile(
      '<msl-slides> \
        <div></div> \
        <div></div> \
        <div></div> \
      </msl-slides>'
    )($rootScope);
    $rootScope.$digest();
    expect(mslSlidesScroller.install).toHaveBeenCalledWith(mslSlidesConfig);
    expect(mslSlidesScrollDetector.install).
      toHaveBeenCalledWith(element.isolateScope());
  });
});
