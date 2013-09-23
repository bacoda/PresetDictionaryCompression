// Copyright 2004-2006 Google Inc.
// All Rights Reserved.
//
// msamuel@google.com


// Provides functions for sending messages back to the server

/** a serial number assigned to messages used to correlate log messages that are
  * written when the message is sent with messages generated when a response is
  * received.
  * @private
  */
var goo_msg_id_counter = 0;

if ('undefined' == typeof log) {
  log = function () { }
}

/** Helper function to get the status of a request object */
function Goo_GetStatus(req) {
  var status = -1;
  try {
    status = req.status;
  } catch (ex) {
    // firefox may throw an exception when you access request values
  }
  return status;
}

/** Helper function to get the status text of a request object */
function Goo_GetStatusText(req) {
  var status = null;
  try {
    status = req.statusText;
  } catch (ex) {
    // firefox may throw an exception when you access request values
  }
  return status;
}

/** callback called when a response is received.
  * @private
  */
function Goo_HandleResponse(req, msg_id, sendTime, handler) {
  if (req.readyState == XML_READY_STATE_COMPLETED) {
    var process = true;
    if (handler) {
      try {
        // compare to false so that functions without a return value will not
        // skip processing.  The result of a non-returning function is
        // undefined.
        process = !(false === (handler)(req));
      } catch (e) {
        log('Message (' + msg_id + ') handling failed: ' + e);
        throw e;
      }
    }

    var status = Goo_GetStatus(req);

    if (200 === status) {  // 200 is HTTP response OK
      log('Message (' + msg_id + ') received after ' +
          (new Date().getTime() - sendTime) + ' ms');
      try {
        var start = new Date().getTime();
        if (process && req.responseText.length) {
          eval(req.responseText);  // eval result unused
        }
        log('Message (' + msg_id + ') processing took ' +
            (new Date().getTime() - start) + ' ms');
      } catch (e) {
        log('Message (' + msg_id + ') processing failed: ' + e);
        alert(e + '\n' + e.stack + '\n\n' + req.responseText);
        throw e;
      }
    } else if (204 == status) {  // 204 is No Content
      log('Message (' + msg_id + ') received after ' +
          (new Date().getTime() - sendTime) + ' ms');
    } else {  // handle error codes and redirects
      log('Message (' + msg_id + ') failed with response ' +
          status + ' ' + Goo_GetStatusText(req) + ' after ' +
          (new Date().getTime() - sendTime) + ' ms.');
    }
  }
}

/** sends a message to a service.  The result should be javascript which is
  * evaluated in the context of this document.
  *
  * @param service the url to hit.
  * @param params cgi params as an array of strings where even elements are
  *   keys and odd values are elements.
  * @param opt_data the request content or undefined.
  * @param opt_handler undefined, or an callback that should be called with the
  *   response object as it's single argument.  If the handler returns false
  *   then the body content will *not* be evaluated as javascript.
  */
function Goo_SendMessage(service, params, opt_data, opt_handler) {
  var query = '';
  if (params) {
    var delim = '';
    for (var i = 0; i < params.length;) {
      var name = params[i++],
         value = params[i++];
      query += delim + encodeURIComponent(name);
      delim = '&';
      if (null !== value && undefined !== value) {
        query += '=' + encodeURIComponent(value.toString());
      }
    }
  }
  // allocate an id used to correlate log messages
  var msg_id = ++goo_msg_id_counter;

  var transaction = XH_XmlHttpCreate();
  if (!transaction) return false;
  
  var transactionStart = new Date().getTime();
  var handlerClosure = function () {
    Goo_HandleResponse(transaction, msg_id, transactionStart, opt_handler);
  };
  var sep = (service.indexOf('?') >= 0) ? '&' : '?';
  var url = query.length ? service + sep + query : service;

  var method = opt_data !== undefined ? 'POST' : 'GET';
  var logmsg = url;
  for (var pos = logmsg.length + 1;
       (pos = logmsg.lastIndexOf('&', pos - 1)) >= 0;) {
    logmsg = logmsg.substring(0, pos) + '&amp;' + logmsg.substring(pos + 1);
  }
  log('Message (' + msg_id + ') sent: ' + method + ' <tt>' + logmsg + '</tt>.');

  if (opt_data !== undefined) {
    XH_XmlHttpPOST(transaction, url, opt_data.toString(), handlerClosure);
  } else {
    XH_XmlHttpGET(transaction, url, handlerClosure);
  }
}

/** posts a message to a service.  The result should be javascript which is
  * evaluated in the context of this document.
  *
  * @param service the url to hit.
  * @param params cgi params as an array of strings where even elements are
  *   keys and odd values are elements.
  * @param opt_handler undefined, or an callback that should be called with the
  *   response object as it's single argument.  If the handler returns false
  *   then the body content will *not* be evaluated as javascript.
  */
function Goo_PostMessage(service, params, opt_handler) {
  var query = '';
  if (params) {
    var delim = '';
    for (var i = 0; i < params.length;) {
      var name = params[i++],
         value = params[i++];
      query += delim + encodeURIComponent(name);
      delim = '&';
      if (null !== value && undefined !== value) {
        query += '=' + encodeURIComponent(value.toString());
      }
    }
  }
  // allocate an id used to correlate log messages
  var msg_id = ++goo_msg_id_counter;

  var transaction = XH_XmlHttpCreate();
  var transactionStart = new Date().getTime();
  var handlerClosure = function () {
    Goo_HandleResponse(transaction, msg_id, transactionStart, opt_handler);
  };

  var logmsg = service;
  for (var pos = logmsg.length + 1;
       (pos = logmsg.lastIndexOf('&', pos - 1)) >= 0;) {
    logmsg = logmsg.substring(0, pos) + '&amp;' + logmsg.substring(pos + 1);
  }
  log('Message (' + msg_id + ') sent: POST <tt>' + logmsg + '</tt>.');

  // XH_XmlHttpPost automatically sets content type to
  // application/x-www-form-urlencoded
  XH_XmlHttpPOST(transaction, service, query, handlerClosure);
}
