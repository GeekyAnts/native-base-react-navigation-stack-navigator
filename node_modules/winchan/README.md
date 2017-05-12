## An abstraction for opening browser windows cross domain

Here's the scenario:  You want to build a secure means of some untrusted site
opening a window, which loads content at a trusted site.  Then you want the 
untrusted dude to be able to pass in parameters.  Then you want the trusted
code to do any amount of stuff, and return a response.

This kinda thing is what lots of services on the web do, services
like [BrowserID][].

  [BrowserID]: https://browserid.org

Trouble is that this is stupidly hard:

  * Mobile Firefox doesn't like it when you open windows with window options
  * IE 8 & 9 don't even allow postMessage between opener and window
  * iOS 5 has some interesting optimizations that can bite you if not careful
  * you should tightly check origins to avoid classes of attacks
  * you probably will have to add stuff in the DOM, you should make sure you
    can clean this up and avoid introducing fragile code

WinChan is an abstraction to solve these problems and make it easy to open
windows which take and return parameters and load content cross domain.

## Browser Support

WinChan is expected to work on:

  * winxp - win7 on IE8 and IE9
  * windows, linux, osx - Chrome, Firefox, Opera, and Safari
  * Android's "native" browser - 2.1, 2.2, 2.3.4, 3.2 (and presumably newer)
  * Fennec on Android

## Usage

For the site spawning the window, the "untrusted" or "client" code:

    WinChan.open({
      url: "http://trusted.host/dialog.html",
      relay_url: "http://trusted.host/relay.html",
      window_features: "menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=700,height=375",
      params: {
        these: "things",
        are: "input parameters"
      }
    }, function(err, r) {
      // err is a string on failure, otherwise r is the response object
    });

For the site providing the window, the "trusted" code:

    WinChan.onOpen(function(origin, args, cb) {
      // origin is the scheme+host+port that cause window invocation,
      // it can be trusted

      // args are the untrusted arguments provided by the calling site

      // and cb you can call within the function, or synchronously later.
      // calling it indicated the window is done and can be closed.
      cb({
        "these things": "are the response"
      });
    });

Finally, you'll notice that the trusted code needs to host 'relay.html' somewhere (required
for IE support).

## Running Examples

there's a little tiny webserver in-tree to let you run the examples.  You'll need node.js and
npm installed.  Once you have these, just:

    $ npm i
    $ scripts/run_example.js

Now load `http://127.0.0.1:8100/example` (or the more complicated example which demonstrates
navigation away and back in window at `http://127.0.0.1:8100/complex_example`

## Running Unit Tests

node.js and npm are required to run the unit tests. Once installed

    $ npm i
    $ scripts/run_example.js

And open `http://127.0.0.1:8100/test` in your favorite web browser.

**NOTE:** You'll need to disable popup blocking for localhost to run tests!

## Testing over the network

the `run_example.js` script will bind whatever IP is in the `IP_ADDRESS` env var.
So to test over the network:

    $ npm i
    $ IP_ADDRESS=<my external IP> scripts/run_example.js

(repace `<my external IP>` with *your* IP address)

then hit `http://<my external IP>:8100/test`

