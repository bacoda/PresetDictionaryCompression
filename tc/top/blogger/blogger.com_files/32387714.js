// Copyright 2005 Google, Inc. All rights reserved.

/**
 * @fileoverview
 *
 * Two classes to support animated lists of links to blogs for the
 * Explore Blogs section of the Blogger homepage.
 *
 * Compatible with Firefox 1.0, IE5+/Win, Safari 1.3+, Opera 8
 *
 * @author phopkins
 */


/**
 * Abstract base class for an unordered list of links to
 * blogs. Contains default style and timing values and utilities for
 * accessing list elements and links.
 *
 * @constructor
 */
function BLOG_LinkList() {
  this._listId = "";

  // Colors are RGB
  // Time and delay are in milliseconds
  // Distances are in pixels

  this.BACKGROUND_COLOR = [255, 255, 255];
  this.LINK_COLOR = [0, 0, 255];
  this.OLD_LINK_COLOR = [255, 0, 255];

  this.HIDE_TIME = 300;
  this.HIDE_STEPS = 10;
  this.HIDE_DELAY = 0;
  this.HIDE_DISTANCE = 0;

  this.SHOW_TIME = 300;
  this.SHOW_STEPS = 10;
  this.SHOW_DELAY = 0;
  this.SHOW_DISTANCE = 0;
}

// We can't keep references to the DOM nodes in the object without
// risking a memory leak in IE. LinkList objects may be referenced by
// onclick handlers, so they cannot in turn reference DOM notes.

/**
 * Get the DOM node for this object's list.
 *
 * @return DOMElement
 */
BLOG_LinkList.prototype.getList = function() {
  return document.getElementById(this._listId);
};

/**
 * Get the list items out of this list.
 *
 * @return Array of <li> elements
 */
BLOG_LinkList.prototype.getItems = function() {
  var list = this.getList();
  var retArray = [];

  for (var child = list.firstChild; child; child = child.nextSibling) {
    if (child.nodeType == 1 && child.nodeName == "LI") {
      retArray[retArray.length] = child;
    }
  }

  return retArray;
};

/**
 * Get the primary (first) links out of this list.
 *
 * @return Array of <a> elements
 */
BLOG_LinkList.prototype.getLinks = function() {
  var retArray = [];
  var items = this.getItems();

  for (var i in items) {
    var item = items[i];
    for (var child = item.firstChild; child; child = child.nextSibling) {
      if (child.nodeType == 1 && child.nodeName == "A") {
        retArray[retArray.length] = child;
        break;
      }
    }
  }

  return retArray;
};

/**
 * Tweak the styles of the list to enable later animation.
 *
 * The initial style for the link lists fixes a height that only shows
 * one list item and hides the overflow so the others aren't
 * seen. This specifies that the first list item should be visible,
 * then acivates the "yesscript" class on the list, so that it can
 * change to a style that keeps overflows visible but doesn't display
 * the other elements.
 *
 * @param numItems Number of list items to keep visible
 */
BLOG_LinkList.prototype._fixStyle = function(numItems) {
  var list = this.getList();
  var items = this.getItems();

  for (var i = 0; i < numItems && i < items.length; ++i) {
    items[i].style.display = "block";
  }

  var needsClass = true;
  var classes = list.className.split(" ");

  for (var c in classes) {
    if (c == "yesscript") {
      needsClass = false;
      break;
    }
  }
  
  if (needsClass) {
    list.className += " yesscript";
  }
};




/**
 * Link list with "web clip" style arrow buttons that cycle among the
 * list elements.
 *
 * @param listId String with the id of the list to use
 * @param buttonHolderId String with the id of a container to hold the arrow 
 *   controls
 *
 * @constructor
 */
function BLOG_ClipList(listId, buttonHolderId) {
  this.LEFT_BUTTON_SRC = "";
  this.LEFT_BUTTON_ALT = "";
  this.LEFT_BUTTON_TITLE = "";

  this.RIGHT_BUTTON_SRC = "";
  this.RIGHT_BUTTON_ALT = "";
  this.RIGHT_BUTTON_TITLE = "";

  this._currentIndex = 0;
  this._listId = listId;
  this._buttonHolderId = buttonHolderId;
}

BLOG_ClipList.prototype = new BLOG_LinkList();


/**
 * Fixes the style and adds the control buttons. Call once the style
 * constants are all set.
 */
BLOG_ClipList.prototype.init = function() {
  this._fixStyle(1);
  this._initButtons();
};


/**
 * Creates a image and link that will call the cycle method of this
 * object when clicked.
 *
 * @param src A string containing the source of the image
 * @param alt The alternate text for the image
 * @param title The title to give the new link
 * @param offset Argument that will be sent to cycle
 * @return DOM element of the link
 */
BLOG_ClipList.prototype._makeButton = function(src, alt, title, offset) {
  var img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);

  var link = document.createElement("a");
  link.setAttribute("title", title);
  link.onclick = this.makeCycleClosure(offset);
  link.href = "#";
  link.appendChild(img);
  
  return link;
};


/**
 * Creates control buttons and appends them as children of the button
 * holder element.
 *
 * @see #_makeButton
 */
BLOG_ClipList.prototype._initButtons = function() {
  var holderDiv = document.getElementById(this._buttonHolderId);
  
  var leftBtn = this._makeButton(this.LEFT_BUTTON_SRC,
                                 this.LEFT_BUTTON_ALT,
                                 this.LEFT_BUTTON_TITLE,
                                 -1);

  var rightBtn = this._makeButton(this.RIGHT_BUTTON_SRC,
                                  this.RIGHT_BUTTON_ALT,
                                  this.RIGHT_BUTTON_TITLE,
                                  1);
  
  holderDiv.appendChild(leftBtn);
  holderDiv.appendChild(rightBtn);
};


/**
 * Creates a closure that will call this object's cycle method with
 * the given argument. Suitable for use in an onclick handler. This
 * method is necessary to avoid accidentally capturing a DOM node in
 * the closure, which can lead to a memory leak in IE/Win.
 *
 * @param offset Argument to give to cycle
 * @return Function of no arguments that calls cycle with offset as
 *         its argument.
 *
 * @see #cycle
 */
BLOG_ClipList.prototype.makeCycleClosure = function(offset) {
  var cycleClosure = function() {
    arguments.callee.obj.cycle(offset);
    return false;
  };
  cycleClosure.obj = this;

  return cycleClosure;
};


/**
 * Shows either the next or previous item in the list. Correctly wraps,
 * so that showing the previous item when the first is visible will
 * show the last.
 * 
 * @param offset 1 or -1, indicating whether to show the next or previous
 *        item, respectively.
 */
BLOG_ClipList.prototype.cycle = function(offset) {
  var items = this.getItems();
  var links = this.getLinks();
  
  var currentItem = items[this._currentIndex];
  var currentLink = links[this._currentIndex];
  
  // we add items.length here because JavaScript modulo can be negative
  var nextIndex = (this._currentIndex + offset + items.length) % items.length;
  var nextItem = items[nextIndex];
  var nextLink = links[nextIndex];
  
  // Force current element to the top of the list. Otherwise, if this
  // element is lower on the list than what's being revealed, the
  // elements won't overlap correctly.
  currentItem.style.top = ANIM_numToPixels(0);
  currentItem.style.position = "absolute";
  currentItem.style.zIndex = 1;

  this._animateHide(currentItem, currentLink, offset);
  this._animateShow(nextItem, nextLink, offset);

  this._currentIndex = nextIndex;
};


/**
 * Animates hiding the specified item and link (which must be a child
 * of the item). Moves the item to the side and fades the link color
 * into the background.
 *
 * @param item DOM element for a list item to hide
 * @param link DOM element for item's link
 * @param offset 1 or -1, indicating the direction to move the element in
 */
BLOG_ClipList.prototype._animateHide = function(item, link, offset) {
  var animation = new ANIM_Animation(this.HIDE_TIME, this.HIDE_STEPS,
                                     this.HIDE_DELAY);
  
  animation.addColorChange(link, "color",
                           this.LINK_COLOR, this.BACKGROUND_COLOR);
  
  animation.addMovement(item, "left",
                        0, this.HIDE_DISTANCE * offset);
  
  animation.setDoneHandler(function() {
    item.style.display = "none";
    item.style.position = "relative";
    item.style.top = "";
    item.style.left = "";
  });
  
  animation.start();
};

/**
 * Animates showing the given item and link (which must be a child of
 * the item). Fades in the link from the background.
 *
 * @param item DOM element for a list item to hide
 * @param link DOM element for item's link
 * @param offset 1 or -1, indicating the direction to move the element from
 */
BLOG_ClipList.prototype._animateShow = function(item, link, offset) {
  var animation = new ANIM_Animation(this.SHOW_TIME, this.SHOW_STEPS,
                                     this.SHOW_DELAY);
  
  animation.addColorChange(link, "color",
      this.BACKGROUND_COLOR, this.LINK_COLOR);

  if (this.SHOW_DISTANCE != 0) {
    animation.addMovement(item, "left", -this.SHOW_DISTANCE * offset, 0);
  }
  
  animation.setBeginHandler(function() {
    item.style.zIndex = 0;
    item.style.display = "block";
  });

  animation.setDoneHandler(function() {
    item.style.left = "";
  });

  animation.start();
};




/**
 * Link list that continuously cycles through its elements. After each
 * element is shown it gets moved to the bottom of the list. This
 * class also supports replacing the entire list without disturbing
 * the animation.
 *
 * @param listId String with the id of the list to use
 *
 * @constructor
 */
function BLOG_ScrollList(listId) {
  /**
   * How many list items to keep fully visible (not including the one 
   * that fades in) */
  this.SHOW_COUNT = 1;

  this._listId = listId;
  this._replacementList = null;
  this._discardCount = 0;
}

BLOG_ScrollList.prototype = new BLOG_LinkList();

/**
 * Fixes the style and starts the animation cycling.
 */
BLOG_ScrollList.prototype.init = function() {
  // +1 is because initially the bottom item is shown as well.
  this._fixStyle(this.SHOW_COUNT + 1);
  this._hideCurrent();
};

/**
 * Fades the next link in from the background color, and fades the
 * current link out to OLD_LINK_COLOR. When the animation finishes,
 * calls _hideCurrent.
 *
 * @see #_hideCurrent
 */
BLOG_ScrollList.prototype._showNext = function() {
  // If there is a list waiting to be inserted, do it here, when only
  // SHOW_COUNT elements are visible
  if (this._replacementList) {
    this._replaceList();
  }

  var list = this.getList();
  var items = this.getItems();
  var links = this.getLinks();

  if (items.length > this.SHOW_COUNT) {
    var currentItem = items[0];
    var currentLink = links[0];
    var nextItem = items[this.SHOW_COUNT];
    var nextLink = links[this.SHOW_COUNT];

    var animation = new ANIM_Animation(this.SHOW_TIME, this.SHOW_STEPS,
                                       this.SHOW_DELAY);

    animation.addColorChange(currentLink, "color",
                             this.LINK_COLOR, this.OLD_LINK_COLOR);

    animation.addColorChange(nextLink, "color",
                             this.BACKGROUND_COLOR, this.LINK_COLOR);

    animation.setBeginHandler(function() {
      nextItem.style.display = "block";
    });

    var done = function() {
      arguments.callee.obj._hideCurrent();
    };
    done.obj = this;
    animation.setDoneHandler(done);
    
    animation.start();
  }
};

/**
 * Fades the current link to the background color while it moves the
 * next link up on the page. Once this animation completes, calls
 * _showNext to show the next link.
 *
 * @see #_showNext
 */
BLOG_ScrollList.prototype._hideCurrent = function() {
  var list = this.getList();
  var items = this.getItems();
  var links = this.getLinks();
  
  if (items.length > this.SHOW_COUNT) {
    var currentItem = items[0];
    var currentLink = links[0];
    var nextItem = items[1];
    var nextLink = links[1];

    var animation = new ANIM_Animation(this.HIDE_TIME, this.HIDE_STEPS,
                                       this.HIDE_DELAY);
    
    animation.addColorChange(currentLink, "color",
                             this.OLD_LINK_COLOR, this.BACKGROUND_COLOR);

    if (this.HIDE_DISTANCE != 0 || this.SHOW_DISTANCE != 0) {
      animation.addMovement(currentItem, "top", 0,
          this.HIDE_DISTANCE + this.SHOW_DISTANCE);
      animation.addMovement(list, "top", 0, -this.SHOW_DISTANCE);
    }

    var done = function() {
      var obj = arguments.callee.obj;
      
      currentItem.style.top = "";
      currentItem.style.display = "none";
      list.style.top = "";
      
      // _keepTopItem is false if the list has just been replaced, in
      // which case we want to discard this old element rather than
      // move it to the bottom
      if (obj._discardCount > 0) {
        obj.getList().removeChild(currentItem);
        obj._discardCount--;
      } else {
        obj.getList().appendChild(currentItem);
      }
      
      obj._showNext();
    };
    done.obj = this;
    animation.setDoneHandler(done);

    animation.start();
  }
};


/**
 * Replaces the current list of links with a new list, at the earliest
 * opportunity.
 *
 * @param newList An HTML element that contains <li> nodes
 */
BLOG_ScrollList.prototype.updateList = function(newList) {
  this._replacementList = newList;
};


/**
 * Does the work of replacing the old list with a new one. Called just
 * before the next element is shown so as not to interfere with the
 * animation.
 */
BLOG_ScrollList.prototype._replaceList = function() {
  var list = this.getList();
  var items = list.getElementsByTagName("li");
  var newItems = this._replacementList.getElementsByTagName("li");

  // SHOW_COUNT items are currently visible, so keep them for now
  while(items.length > this.SHOW_COUNT) {
    list.removeChild(items[this.SHOW_COUNT]);
  }
  
  while(newItems.length > 0) {
    list.appendChild(newItems[0]);
  }

  // Mark the top SHOW_COUNT items as old, so they'll be thrown out
  // instead of cycled to the bottom of the list
  this._discardCount = this.SHOW_COUNT;
  this._replacementList = null;
};
