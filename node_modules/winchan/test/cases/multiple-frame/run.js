$(document).ready(function(){
  asyncTest("multiple frames in parent, stresses relay frame - takes ~1 second.", function() {
    var iframe,
        argString = "This is a string we'll send into and back from the dialog: " +
      (new Date()).toString();

    setTimeout(function() {
      // We are adding the iframe AFTER the winchan is open.  The child frame
      // does not respond until 1 second after load.
      iframe = document.createElement("iframe");
      iframe.setAttribute("src", "javascript:0;");
      // Give the extra frame a name that comes after the name of the WinChan
      // relay frame in the alphabet so that the relay frame is not the last
      // frame in window.opener.frames.
      iframe.setAttribute("id", "zzzz");
      document.body.appendChild(iframe);
    }, 500);

    WinChan.open({
      url: "cases/multiple-frame/child.html",
      relay_url: "/relay.html",
      window_features: "width=700,height=375",
      params: argString
    }, function(err, resp) {
      equal(resp, argString);
      iframe.parentNode.removeChild(iframe);
      start();
    });
  });

});
