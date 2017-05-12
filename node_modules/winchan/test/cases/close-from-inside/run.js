$(document).ready(function(){
  asyncTest("w.close() errors, so postMessage to die", function() {
    var argString = "This is a string we'll send into and back from the dialog: " +
      (new Date()).toString();
    // mimic a security violation when trying to window.close();
    var open = window.open;
    window.open = function() {
      var w = open.apply(window, arguments);
      var close = w.close;
      w.close = function() {
        w.close = close; // set back so it can be closed on the other side
        throw new Error('Security violation');
      };
      return w;
    };

    WinChan.open({
      url: "cases/close-from-inside/child.html",
      relay_url: "/relay.html",
      window_features: "width=700,height=375",
      params: argString
    }, function(err, resp) {
      equal(resp, argString);

      // dont forget to reset the mimic'ed open
      window.open = open;
      start();
    });
  });
});
