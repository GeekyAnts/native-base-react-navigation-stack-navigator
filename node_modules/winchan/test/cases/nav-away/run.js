$(document).ready(function(){
  asyncTest("navigate away and then return in dialog", function() {
    var argString = (new Date()).toString();
    WinChan.open({
      url: "cases/nav-away/child.html",
      relay_url: "/relay.html",
      window_features: "width=700,height=375",
      params: argString
    }, function(err, resp) {
      equal(resp, argString);
      start();
    });
  });
});
