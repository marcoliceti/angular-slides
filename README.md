# angular-slides

AngularJS directive for vertical, fullscreen, slide-based web pages.

## Overview

The goal of this project is to easily allow layouts with the following features:

* the page is divided into a vertical sequence of _slides_
* each slide is fullscreen, i.e. it spans the whole viewport
* users can't (directly) scroll: up and down arrow key are used to change slide
(with scrolling performed programmatically in JavaScript)
* indvidual slides can be linked

Also, events are fired to signal slide changes, which is useful to hide, reveal
and animate stuff.

[See it in action!](https://marcoliceti.github.io/angular-slides)

## Getting started

### Adding angular-slides to your project

Use [npm](https://nodejs.org/en/):

```
$ npm install angular-slides
```

or [Bower](https://bower.io/):

```
$ bower install msl-slides
```

Then, inside your HTML page:

```html
<!-- AngularJS is the only required dependency -->
<script src="node_modules/angular/angular.js"></script>
<script src="node_modules/angular-slides/dist/msl_slides.js"></script>
<script src="your_code.js"></script>
```

**Note:** If you're using Bower, just replace `node_modules` with
`bower_components` and `angular-slides` with `msl-slides`.

**Note:** The `demo` folder of this repository contains a working example.
Another useful example is
[this project's website](https://marcoliceti.github.io/angular-slides).

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

**Note:** Remember to load the `msl.slides` module into your AngularJS app,
e.g.:

```javascript
var myApp = angular.module('myApp', ['msl.slides']);
```

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
  $scope.$on(
    'msl_slides_slide_change_start',
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
informations that will hold true (until [breaking changes](http://semver.org/)):

* the `mslSlides` directive is hosted inside an AngularJS module called
`msl.slides`
* slides must be put inside the `<msl-slides>` element
* a slide can be any HTML element (although inline elements don't make sense)
* slides are numbered starting from `0`
* the `mslSlides` directive applies `100vw` width and `100vh` height to each
slide
* slide change is performed with up and down arrow keys
* a `msl_slides_slide_change_start` AngularJS event is emitted when a slide
change starts
* a `msl_slides_slide_change_success` AngularJS event is emitted when a slide
change is successfully completed
* `msl_slides_slide_change_start` and `msl_slides_slide_change_success` handlers
receive the "previous" and the "next" slide numbers (i.e. before and after the
slide change) as **second** and **third** argument, e.g.
`function myHandler(event, old_slide, new_slide) { ... }`
* the `slide_number` query parameter in the address bar is kept in sync with
the current slide number (synchronization happens when the animation completes)
* thus, slide changes can be driven by links too

All other behaviors are to be intended as implementation-specific and should not
be depended on.

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

Development dependencies are handled with `npm`.
