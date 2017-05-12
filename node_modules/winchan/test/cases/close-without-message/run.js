$(document).ready(function(){
  asyncTest("open dialog that doesn't properly postMessage when it's done", function() {
    var argString = (new Date()).toString();
    WinChan.open({
      url: "cases/close-without-message/child.html",
      relay_url: "/relay.html",
      window_features: "width=700,height=375",
      params: argString
    }, function(err, resp) {
      equal(err, 'User closed the popup window');
      start();
    });
  });
});
