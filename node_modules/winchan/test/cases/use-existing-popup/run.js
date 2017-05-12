$(document).ready(function(){
  asyncTest("pass as argument a popup window", function() {
    var existingPopup = window.open('about:blank');
    var argString = (new Date()).toString();

    WinChan.open({
      url: "cases/nav-away/child.html",
      relay_url: "/relay.html",
      popup: existingPopup,
      params: argString
    }, function(err, resp) {
      equal(resp, argString);
      start();
    });
  });
});

