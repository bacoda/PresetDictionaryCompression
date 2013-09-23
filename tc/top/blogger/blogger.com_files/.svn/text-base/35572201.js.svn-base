// Copyright 2005 Google, Inc. All rights reserved.

/**
 * @fileoverview
 *
 * A general solution for creating asynchronous animations by
 * manipulating CSS attributes of DOM nodes. Steps for use:
 * <ol>
 * <li>Create an ANIM_Animation object, specifying duration,
 *     number of steps, and any initial delay.</li>
 * <li>Add animations to it with the <code>add...</code>
 *     methods.</li>
 * <li>Set begin and done handlers (optional)</li>
 * <li>Call <code>start()</code> and forget about it!</li>
 *
 * Compatible with Firefox 1.0, IE5+/Win, Safari 1.3+, Opera 8
 *
 * @author phopkins
 */

/**
 * Class for creating animations. An animation is usually made by
 * interpolating a CSS style attribute between a starting and ending
 * value. This class provides helpers for modifying common attributes,
 * and a hook for a more general animation function.
 *
 * @param time Time, in milliseconds, the animation will take
 * @param steps Number of steps of animation to perform, with a higher
 *        number giving smoother animation
 * @param delay Time, in milliseconds, to wait before starting the animation
 *
 * @constructor
 */

function ANIM_Animation(time, steps, delay) {
  this._time = time;
  this._steps = steps;
  this._delay = delay;

  this._animationFunctions = [];
  this._beginHandler = null;
  this._doneHandler = null;

  this._timer = null;
};


/**
 * Include a color change as part of this animation. Color will be
 * linearly interpolated over the run of the animation.
 *
 * Color arguments are 3-element arrays of integers in the range
 * 0..255, representing values for red, green, and blue, respectively.
 *
 * @param el A DOM element to modify the color of
 * @param attr A string naming a CSS attribute whose value is a color
 * @param start Starting color
 * @param end Ending color
 */
ANIM_Animation.prototype.addColorChange = function(el, attr, start, end) {
  var animationFunction = function(mix) {
    var colorArray = [0, 0, 0];
    
    for (var i = 0; i < 3; ++i) {
      // simple linear interpolation
      colorArray[i] = (1.0 - mix) * start[i] + mix * end[i];
    }
    
    el.style[attr] = ANIM_arrayToColor(colorArray);
  };

  this.addAnimationFunction(animationFunction);
};


/**
 * Include movement as part of this animation. Linearly interpolates a
 * CSS length attribute over the run of the animation.
 *
 * @param el A DOM element to modify a length attribute of
 * @param attr A string naming a CSS attribute whose value is a length
 * @param start Integer for starting length, in pixels
 * @param end Integer for ending length, in pixels
 */
ANIM_Animation.prototype.addMovement = function(el, attr, start, end) {
  var animationFunction = function(mix) {
    el.style[attr] = ANIM_numToPixels((1.0 - mix) * start + mix * end);
  };

  this.addAnimationFunction(animationFunction);
};


/**
 * Include a general animation function in this animation. The
 * provided function will be called with values increasing from 0 to
 * 1.0 during the animation.
 *
 * @param animationFunction A function of 1 argument
 */
ANIM_Animation.prototype.addAnimationFunction = function(animationFunction) {
  this._animationFunctions[this._animationFunctions.length] =
    animationFunction;
};


/**
 * Set a function to be called after the initial delay, right before
 * animation starts. When the handler is called, 'this' will refer to
 * this Animation object.
 *
 * @param beginHandler A function of no arguments
 */
ANIM_Animation.prototype.setBeginHandler = function(beginHandler) {
  this._beginHandler = beginHandler;
};


/**
 * Set a function to be called after animation finishes. When the
 * handler is called, 'this' will refer to this Animation object. If
 * the animation is stopped before it completes, this function will
 * not be called.
 *
 * @param doneHandler A function of no arguments
 */
ANIM_Animation.prototype.setDoneHandler = function(doneHandler) {
  this._doneHandler = doneHandler;
};


/**
 * Helper that calls all registered animation functions with the provided argument.
 *
 * @param mix Float between 0 and 1, inclusive
 */
ANIM_Animation.prototype._callAnimationFunctions = function(mix) {
  for(var i = 0; i < this._animationFunctions.length; ++i) {
    this._animationFunctions[i](mix);
  }
};


/**
 * Start the animation. This method asynchronously waits the delay
 * specified in the constructor, then begins the animation. It calls
 * the beginHandler immediately before animation starts, and calls the
 * endHandler immediately after.
 *
 * @see #setBeginHandler
 * @see #setEndHandler
 * @see #stop
 */
ANIM_Animation.prototype.start = function() {
  var obj = this;

  var nextStep = 0;
  var startTime = 0;

  var animationLoop = function() {
    var currentStep = nextStep;
    ++nextStep;
    
    // where we are in the animation, between 0 and 1
    var currentMix = currentStep / obj._steps;
    var nextMix = nextStep / obj._steps;
    
    obj._callAnimationFunctions(currentMix);
    
    if (nextStep <= obj._steps) {
      // delay is calculated as the difference between the current
      // time and where we should be, as calculated by looking at when
      // we started and how long we should be taking

      var curTime = new Date().getTime();
      var nextTime = startTime + Math.floor(obj._time * nextMix);
      var delay = Math.max(0, nextTime - curTime);

      obj._timer = window.setTimeout(animationLoop, delay);
    } else {
      obj._timer = null;

      if (obj._doneHandler) {
        obj._doneHandler();
      }
    }
  };

  var beginAnimation = function() {
    if (obj._beginHandler) {
      obj._beginHandler();
    }

    startTime = new Date().getTime();
    animationLoop();
  };

  this._timer = window.setTimeout(beginAnimation, this._delay);
};


/**
 * Stops an animation in progress. Note that this will prevent the
 * endHandler from being called.
 */
ANIM_Animation.prototype.stop = function() {
  if (this._timer) {
    window.clearTimeout(this._timer);
  }
};


/**
 * Utility function to convert an array-representation of a color to a
 * string representation suitable for assigning to a style attribute.
 *
 * @param arr A 3-element array of numbers, 0..255, representing the values for
 *        the red, green, and blue channels of the color. Floating point
 *        values are allowed, but will be truncated to an integer in the output.
 * @returns A string representing the RGB color
 */
function ANIM_arrayToColor(arr) {
  return "rgb(" + Math.floor(arr[0]) +
         ", " + Math.floor(arr[1]) +
         ", " + Math.floor(arr[2]) + ")";
};


/**
 * Utility function to convert an integer into a length suitable for
 * assigning to a style attribute.
 *
 * @param num An integer number of pixels
 * @returns A string representing the length in pixels
 */
function ANIM_numToPixels(num) {
  return Math.floor(num) + "px";
};



