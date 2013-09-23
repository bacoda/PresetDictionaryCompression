// see: http://wiki.sparta.cnet.com/cnet/twiki/bin/view/Gamespot/DevRapper
var toggle_tracker = Array();

var Form = {
  serialize: function(form) {
    var elements = Form.getElements($(form));
    var queryComponents = new Array();
    for (var i = 0; i < elements.length; i++) {
      var queryComponent = Form.Element.serialize(elements[i]);
      if (queryComponent) queryComponents.push(queryComponent);
    }

    return queryComponents.join('&');
  },

  getElements: function(form) {
    form = $(form);
    var elements = new Array();

    for (tagName in Form.Element.Serializers) {
      var tagElements = form.getElementsByTagName(tagName);
      for (var j = 0; j < tagElements.length; j++) elements.push(tagElements[j]);
    }
    return elements;
  }
}

Form.Element = {
  serialize: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);

    if (parameter) {
      var key = encodeURIComponent(parameter[0]);
      if (key.length == 0) return;

      if (parameter[1].constructor != Array)
        parameter[1] = [parameter[1]];

      return key + '=' + encodeURIComponent(parameter[1]);
    }
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);

    if (parameter)
      return parameter[1];
  }
}

Form.Element.Serializers = {
  input: function(element) {
    switch (element.type.toLowerCase()) {
      case 'submit':
      case 'hidden':
      case 'password':
      case 'text':
        return Form.Element.Serializers.textarea(element);
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element);
    }
    return false;
  },

  inputSelector: function(element) {
    if (element.checked)
      return [element.name, element.value];
  },

  textarea: function(element) {
    return [element.name, element.value];
  },

  select: function(element) {
    var value = '', opt, index = element.selectedIndex;
    if (index >= 0) {
      opt = element.options[index];
      value = opt.value;
      if (!value && !('value' in opt))
        value = opt.text;
    }
    return [element.name, value];
  }
}

function toggle(el) {
  el = $(el);
  if (el.style.display == 'none') el.style.display = '';
  else el.style.display = 'none';
}
function fadeOut(el, fadeTimeInSeconds, onComplete) {
  fade(el, fadeTimeInSeconds, false, onComplete);
}
function fadeIn(el, fadeTimeInSeconds) {
  fade(el, fadeTimeInSeconds, true);
}
function foldDown(el, timeInSeconds, heightInPixels) {
  fold(el, {time: timeInSeconds, height: heightInPixels, down: true});
}
function foldUp(el, timeInSeconds, heightInPixels) {
  fold(el, {time: timeInSeconds, height: heightInPixels, down: false});
}
function foldToggle(el, timeInSeconds, heightInPixels) {
	var all_a = $$('#' + el + ' div.bttn');
	var btns = Array();
	var j = 0;

    time = timeInSeconds ? timeInSeconds : 250;
    time = time < 20 ? time * 1000 : time;

	for(i=0;i<all_a.length;i++)
	{
		if (all_a[i].className.indexOf("btn") >= 0 || all_a[i].className.indexOf("bttn") >= 0)
		{
			all_a[i].style.display = "none";
			btns[j++] = all_a[i];
		}
	}

    if ( heightInPixels ) {
        toggle_tracker[el] = heightInPixels;
        new_height = heightInPixels;
    }
    else if (toggle_tracker[el]) {
        var new_height = toggle_tracker[el];
    }
    else {
        var new_height = parseInt($(el).getStyle('height'));
        toggle_tracker[el] = new_height;
    }

	if($(el).style.display == "none")
	{
        // make sure the overflow is hidden.
        $(el).style.overflow = "hidden";
	    $(el).style.height = 0;
	    $(el).style.display = "block";

        var myEffects = new Fx.Styles(el, {duration: time, transition: Fx.Transitions.linear});
        myEffects.start({
            'height': [0, new_height],
            'opactity': [0, 0.999999]
        });
		for(i=0;i<btns.length;i++)
		{
			btns[i].style.display = "block";
		}
	}
	else
	{
        var myEffects = new Fx.Styles(el, {duration: time, transition: Fx.Transitions.linear, onComplete: function(){$(el).style.display='none';}});
        myEffects.start({
            'height': [parseInt($(el).getStyle('height')), 0],
            'opactity': [1, 0]
        });
	}
}
function doAjax(url, form, onUpdate, onComplete) {
  if (supportsAjax()) {
    new Ajax (url, {postBody: $F(form), update: onUpdate, onComplete: onComplete}).request();
    return true;
  } else {
    var form=$(form);form.action = url;form.method = 'POST';form.submit();return false;
  }
}
function supportsAjax() {
  if (window.ActiveXObject) return true;
  else if (window.XMLHttpRequest) return true;
  else return false;
}
function $F(form) {
  return Form.serialize(form);
}
function $f(el) {
  return Form.Element.serialize(el);
}
function delay(func, time) {
  time = time < 20 ? time * 1000 : time;
  setTimeout(func.bind(this), time);
}
function onLoad(func) {
  window.addEvent('load', func);
}
function zoomIfMsft(el, on) {
  el = $(el);
  if(/MSIE/.test(navigator.userAgent) && (!el.hasLayout)) {
//      el.setStyle(el, {zoom: (on ? 1 : 0)});
  }
}
function getHeight(el) {
  var el = $(el);
  var height = el.style.height.replace(/px/,'');
  if (height) return parseInt(height);
  else return parseInt(el.offsetHeight);
}
function getElHeight(el) {
  var height;
  if (el.offsetHeight > 0) {
    height = el.offsetHeight;
  } else {
    el.style.height = 'auto';
    el.style.display = 'block';
    height = el.offsetHeight;
    el.style.display = 'none';
  }
  return height;
}
function fade(el, time, fadeIn, complete) {
  fadeIn = fadeIn ? true : false;
  time = time ? time * 1000 : 500;
  zoomIfMsft(el, true);
	fullOpacity = (/Gecko/.test(navigator.userAgent) || /Konqueror|Safari|KHTML/.test(navigator.userAgent)) ?
      0.999999 : 1;
  el = $(el);
  if (complete) {
      var fdr = new Fx.Style(el, 'opacity', {onComplete: complete, duration: time});
  } else {
	  var fdr = new Fx.Style(el, 'opacity', {duration: time});
  }
  if (fadeIn == true) {
    el.style.visibility = 'hidden';
    el.style.display = '';
    fdr.custom(0,fullOpacity);
  }
  else {
    fdr.custom(fullOpacity,0);
  }
  delay(function() { zoomIfMsft(el, false); }, time);
}
function fold(el, options) {
  el = $(el);
  down = options.down ? true : false;
  time = options.time ? options.time : 250;
  time = time < 20 ? time * 1000 : time;
  elht = getElHeight(el);
  if (options.toggle) {
    var mkey = 'ht' + el.id;
    window[mkey] ? elht = window[mkey] : window[mkey] = elht;
    down = (el.style.display=='none') ? true : false;
  }
  var height = (typeof(options.height) == 'undefined') ? elht : options.height;
  height = parseInt(height);
  el.style.height = down ? 0 + 'px' : height + 'px';
  if (el.style.display == 'none') el.style.display = '';
//  var effect = new fx.Height(el, {duration: time});
  var effect = new Fx.Style(el, 'height', {duration: time});

  var start = down ? 0 : height;
  var end   = down ? height : 0;
  effect.custom(start, end);
  if (!down) delay(function() { el.style.display = 'none' }, time);
}