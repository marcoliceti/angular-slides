# angular-slides

AngularJS directive for vertical, fullscreen, slide-based web pages.

## Getting started

### Adding angular-slides to your project

_Currently, you have to clone this repository (`bower` and `npm` packages will
be available soon)._

From the root of this repo:

```
$ npm install
$ grunt build
```

**Note:** You'll need [Node.js and npm](https://nodejs.org/en/) and
[Grunt](http://gruntjs.com/).

This will create a `dist` directory with both a minified (`msl_slides.min.js`)
and non-minified (`msl_slides.js`) version of this library.

Finally, load it inside your page, e.g.:

```html
<!-- Angular is the only required dependency -->
<script src="angular.js"></script>
<script src="msl_slides.js"></script>
<script src="your_code.js"></script>
```

**Note:** The `demo` folder of this repository contains a working example.

### Using the mslSlides directive

#### Basics

```html
<msl-slides>
  <div>First slide</div>
  <div>Second slide</div>
  <div>Third slide</div>
</msl-slides>
```

**Note:** CSS styling is up to you. The only style added by the `mslSlides`
directive is `100vw` width and `100vh` height to each slide.

#### Links

```html
<msl-slides>
  <div>
    <p>
      First slide
    </p>
    <p>
      Go to <a href="#?slide_number=1">next slide</a>
    </p>
  </div>
  <div>
    <p>
      Second slide
    </p>
  </div>
</msl-slides>
```

#### Events

```html
<body ng-controller="MyCtrl">
  <msl-slides>
    <div>
      <p>
        First slide
      </p>
    </div>
    <div>
      <p>
        Second slide
      </p>
    </div>
  </msl-slides>
</body>
```

```javascript
angular.module('myApp').controller('MyCtrl', function ($scope) {
  $scope.$on('msl_slides_slide_change_start',
    function (event, old_slide_number, new_slide_number) {
      console.log(
        'Changing from ' + old_slide_number + ' to ' + new_slide_number
      );
    }
  );
  $scope.$on(
    'msl_slides_slide_change_success',
    function (event, old_slide_number, new_slide_number) {
      console.log(
        'Changed from ' + old_slide_number + ' to ' + new_slide_number
      );
    }
  );
});
```

## API

If you're not happy with the previous examples, here is a bunch of detailed
informations that will hold true (until
[API breaking changes](http://semver.org/)):

* the `mslSlides` directive is hosted inside an AngularJS module called
`msl.slides`
* slides must be put inside the `<msl-slides>` element
* a slide can be any HTML element (although inline elements don't make sense)
* slides are numbered starting from `0`
* the `mslSlides` directive applies `100vw` width and `100vh` height to each
slide
* a `msl_slides_slide_change_start` AngularJS event is emitted when a slide
change starts
* a `msl_slides_slide_change_success` AngularJS event is emitted when a slide
change is successfully completed
* `msl_slides_slide_change_start` and `msl_slides_slide_change_success` handlers
receive the "original" and the "final" slide numbers (i.e. before and after the
slide change) as **second** and **third** argument, e.g.
`function myHandler(event, old_slide, new_slide) { ... }`
* the `slide_number` query parameter in the address bar is kept in sync with
the current slide number (synchronization happens when the animation completes)

## For contributors

Source code is divided into many files inside the `src` directory. Here is
a short description of these files' responsibilities:

* `src/module.js`: provides the module that will host all the other components
* `src/directive/slides.js`: defines the `msl-slides` directive
* `src/service/scroll_detector.js`: handles `wheel` and `keydown` events in
order to prevent regular scrolling and detect the user's will to scroll through
up and down arrow keys
* `src/service/scroller.js`: implements a sort of animated scrolling
* `src/service/config.js`: just a couple of values that control the animated
scrolling
* `src/service/location.js`: sets and gets the slide number from `$location`
* `src/service/viewport.js`: converts slide numbers into pixel offsets

Development tasks are handled with [Grunt](http://gruntjs.com/):

* `grunt test`: run tests
* `grunt build`: concat + minify (output inside the `dist` folder)
