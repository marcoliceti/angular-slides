'use strict';

describe('Service mslSlidesScrollDetector', function () {
  var $window;
  var mslSlidesScrollDetector;

  beforeEach(module('msl.slides'));

  beforeEach(inject(function (_$window_, _mslSlidesScrollDetector_) {
    $window = _$window_;
    mslSlidesScrollDetector = _mslSlidesScrollDetector_;
  }));

  it('defines a keyboard handler for slide changes', function () {
    var fake_scope = { $emit: jasmine.createSpy() };
    var fake_event = { keyCode: 40 };
    var handler = mslSlidesScrollDetector.keyboardHandlerFactory(fake_scope);
    handler(fake_event);
    expect(fake_scope.$emit).toHaveBeenCalledWith('msl_slides_scroll', 'down');
    fake_scope.$emit.calls.reset();
    fake_event.keyCode = 38;
    handler(fake_event);
    expect(fake_scope.$emit).toHaveBeenCalledWith('msl_slides_scroll', 'up');
    fake_scope.$emit.calls.reset();
    fake_event.keyCode = 666;
    handler(fake_event);
    expect(fake_scope.$emit).not.toHaveBeenCalled();
  });

  it('should be explicitly started', function () {
    var on_spy = jasmine.createSpy();
    spyOn(angular, 'element').and.returnValue({ on: on_spy });
    mslSlidesScrollDetector.start();
    expect(angular.element).toHaveBeenCalledWith($window);
    expect(on_spy).
      toHaveBeenCalledWith('keydown', mslSlidesScrollDetector.keyboardHandler);
    /*
     * angular.element spies should be cleared
     * http://stackoverflow.com/questions/31659114/cannot-spy-on-angular-element
     */
    angular.element.and.callThrough();
  });

  it('can be stopped', function () {
    var off_spy = jasmine.createSpy();
    spyOn(angular, 'element').and.returnValue({ off: off_spy });
    mslSlidesScrollDetector.stop();
    expect(angular.element).toHaveBeenCalledWith($window);
    expect(off_spy).
      toHaveBeenCalledWith('keydown', mslSlidesScrollDetector.keyboardHandler);
    /*
     * angular.element spies should be cleared
     * http://stackoverflow.com/questions/31659114/cannot-spy-on-angular-element
     */
    angular.element.and.callThrough();
  });

  it('should be installed into a scope', function () {
    var fake_scope = {};
    var fake_handler = function () {};
    spyOn(mslSlidesScrollDetector, 'keyboardHandlerFactory').and.
      returnValue(fake_handler);
    var on_spy = jasmine.createSpy();
    spyOn(angular, 'element').and.returnValue({ on: on_spy });
    spyOn(mslSlidesScrollDetector, 'start');
    mslSlidesScrollDetector.install(fake_scope);
    expect(mslSlidesScrollDetector.keyboardHandlerFactory).
      toHaveBeenCalledWith(fake_scope);
    expect(mslSlidesScrollDetector.keyboardHandler).toBe(fake_handler);
    expect(on_spy).toHaveBeenCalledWith('wheel', jasmine.any(Function));
    expect(on_spy).toHaveBeenCalledWith('keydown', jasmine.any(Function));
    expect(mslSlidesScrollDetector.keyboardHandlerFactory).toHaveBeenCalled();
    /*
     * angular.element spies should be cleared
     * http://stackoverflow.com/questions/31659114/cannot-spy-on-angular-element
     */
    angular.element.and.callThrough();
  });
});
