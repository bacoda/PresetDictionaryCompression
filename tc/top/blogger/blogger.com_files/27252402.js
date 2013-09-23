// Copyright 2007 Google, Inc. All rights reserved.

/**
 * JS for Explore Blogs animation on /start
 *
 * Requires detect.js, xmlhttp.js, message.js, animation_common.js,
 * animation_explore.js
 */

/**
 * Given a linkList object, sets the background and link colors to match the
 * /start page.
 */
function BLOG_setupStartListStyle(linkList) {
  linkList.BACKGROUND_COLOR = [245, 237, 227]; // #F5EDE3
  linkList.LINK_COLOR = [51, 102, 204]; // #3366CC
  linkList.OLD_LINK_COLOR = [180, 180, 240]; // #B4B4F0
}

/**
 * Creates and initializes a ClipList for the Blogs of Note display
 */
function BLOG_setupBlogsOfNote() {
  window.ofNote = new BLOG_ClipList("of-note", "of-note-buttons", "of-note-more");

  BLOG_setupStartListStyle(ofNote);

  ofNote.HIDE_TIME = 250;
  ofNote.HIDE_STEPS = 10;
  ofNote.HIDE_DISTANCE = 40;

  ofNote.SHOW_TIME = 150;
  ofNote.SHOW_STEPS = 10;
  ofNote.SHOW_DELAY = 150;

  ofNote.LEFT_BUTTON_SRC = "blogger.com_files/arrow-left.png";
  ofNote.LEFT_BUTTON_ALT = "";

  ofNote.RIGHT_BUTTON_SRC = "blogger.com_files/arrow-right.gif";
  ofNote.RIGHT_BUTTON_ALT = "";

  ofNote.init();
}

/**
 * Creates and initializes a new ScrollList for the recently updated posts.
 * Also starts the timer to load new blogs every minute.
 */
function BLOG_setupRecentlyUpdated() {
  window.updated = new BLOG_ScrollList("recently-updated");

  BLOG_setupStartListStyle(updated);

  updated.SHOW_TIME = 300;
  updated.SHOW_STEPS = 5;
  updated.SHOW_DELAY = 0;
  updated.SHOW_DISTANCE = 0;
  updated.SHOW_COUNT = 0;

  updated.HIDE_TIME = 300;
  updated.HIDE_STEPS = 5;
  // IE can't handle the vertical animation in RTL
  updated.HIDE_DISTANCE = (userRTL && Detect.IE()) ? 0 : 12;
  updated.HIDE_DELAY = 1200;

  updated.init();

  // start the timer to fire every minute, and also send off an immediate
  // request to prime the list beyond what was included statically
  window.setInterval(BLOG_fetchRecentlyUpdated, 60 * 1000);
  window.setTimeout(function() {
    BLOG_fetchRecentlyUpdated();
  }, 0);
}

/**
 * Handler for XmlHttpRequest that loads the output of /recent-list.g into the
 * header and list on the page.
 */
function BLOG_loadRecentlyUpdated(req) {
  if (req.status != 200) return false;

  var listHolder = document.getElementById("recently-updated-holder");
  var newListHolder = document.createElement("div");

  newListHolder.innerHTML = req.responseText;

  // update the list instead of replacing to keep the animation smooth
  window.updated.updateList(newListHolder);

  // replace the header in order to update the time
  var headerElement = listHolder.getElementsByTagName("h3")[0];
  var newHeaderElement = newListHolder.getElementsByTagName("h3")[0];
  headerElement.parentNode.replaceChild(newHeaderElement,
    headerElement);

  // don't eval JS
  return false;
}

/**
 * Make an XmlHttpRequest to get and load the latest recently updated blogs.
 */
function BLOG_fetchRecentlyUpdated() {
  Goo_SendMessage("blogger.com_files/recent-list.g",
      [ "timezoneOffset", "" + new Date().getTimezoneOffset(),
        "zx", "" + Math.random() ],
      undefined,
      BLOG_loadRecentlyUpdated);
}

