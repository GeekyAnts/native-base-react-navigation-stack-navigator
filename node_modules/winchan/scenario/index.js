var assert = require('assert');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

var assert = require('assert');

var WebdriverManager = require('webdriver-manager');
var SELENIUM_PATH = './node_modules/webdriver-manager/selenium';
var wm = new WebdriverManager(SELENIUM_PATH);

var servers = require('../scripts/run_example');


process.env.PATH = process.env.PATH + ':' + SELENIUM_PATH;

describe('winchan', function () {
  var driver;

  before(function (done) {
    var readyCount = 0;

    function executeOnCount(done) {
      return function () {
        console.log('hi');
        readyCount++;
        if (readyCount == 1) {
          done();
        }
      };
    }
    var self = this;
    this.timeout(20000);
    // Install Selenium Standalone and Google Chrome
    wm.install(['standalone', 'chrome'], function (err, filenames) {
      // Start selenium
      var selenium = wm.start();

      function doneWrapper() {
        self.timeout(2000);
        done();
      }

      selenium.once(      'ready',  executeOnCount(doneWrapper));
    });
  });

  test.it('should work', function() {
    var driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
    driver.get("http://localhost:8100/complex_example");

    var handles;

    var openTheWindow = driver.findElement(webdriver.By.id('open'));
    openTheWindow.click();
    driver.getAllWindowHandles().then(function (_handles_) {
      handles = _handles_;
      driver.switchTo().window(handles[1]);
      driver.findElement(webdriver.By.id('nav_away')).click();
      driver.findElement(webdriver.By.tagName('button')).click();
      driver.findElement(webdriver.By.id('close')).click();
      driver.switchTo().window(handles[0]);
      return driver.findElement(webdriver.By.tagName('pre')).getText();
    })
    .then(function (text) {
      text = text.split('\n').slice(2).join('').slice('response: '.length);
      var textAsObj = JSON.parse(text);

      // Not going to compare timestamp
      delete textAsObj.timestamp;

      assert.deepEqual(textAsObj, {
        thanks: "for",
        calling: true
      });
      driver.quit();
    });
  });
});
