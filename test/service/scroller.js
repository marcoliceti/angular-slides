'use strict';

describe('Service mslSlidesScrollDetector', function () {
  var $window;
  var $interval;
  var mslSlidesScroller;

  beforeEach(module('msl.slides'));

  beforeEach(inject(function (_$window_, _$interval_, _mslSlidesScroller_) {
    $window = _$window_;
    $interval = _$interval_;
    mslSlidesScroller = _mslSlidesScroller_;
  }));

  it('should be installed', function () {
    var fake_config = {};
    mslSlidesScroller.install(fake_config);
    expect(mslSlidesScroller.config).toBe(fake_config);
  });

  it('implements animated scrolling', function (done) {
    var config = {
      duration: 1000,
      frames: 30
    };
    mslSlidesScroller.install(config);
    var scroll_position;
    spyOn($window, 'scroll').and.callFake(function (x, y) {
      scroll_position = y;
    });
    mslSlidesScroller.scroll(0, 100).then(function () {
      expect(scroll_position).toEqual(100);
      expect($window.scroll).toHaveBeenCalledTimes(config.frames);
      done();
    });
    $interval.flush(config.duration * 2); // let's wait twice the duration
  });
});
