/* eslint-disable */
const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });

/**
 * Helper functions for type() and insert() to focus/blur
 * so that we trigger DOM events.
 */

var focusSelector = function (done, selector) {
  return this.evaluate_now(function (selector) {
    document.querySelector(selector).focus();
  }, done.bind(this), selector);
};

var blurSelector = function (done, selector) {
  return this.evaluate_now(function (selector) {
    //it is possible the element has been removed from the DOM
    //between the action and the call to blur the element
    var element = document.querySelector(selector);
    if (element) {
      element.blur()
    }
  }, done.bind(this), selector);
};

Nightmare.action('setValue', function (selector, text, done) {
  if (arguments.length === 2) {
    done = text
    text = null
  }
  var child = this.child;

  focusSelector.bind(this)(function (err) {
    if (err) {
      return done(err);
    }

    var blurDone = blurSelector.bind(this, done, selector);
    this.evaluate_now(function (selector) {
      document.querySelector(selector).value = '';
    }, function () {
      child.call('insert', text, blurDone);
    }, selector);

  }, selector);
});

nightmare
  // .goto('http://localhost:8080/mock/')
  // .wait('.name')
  // .setValue('.name', 'liuyiqi')
  // .setValue('.password', '123123')
  .goto('http://pre.h5.taobao.org/admin/addPage.htm?protoId=45247')
  .wait('.kuma-input[name="domainAccount"]')
  .setValue('.kuma-input[name="domainAccount"]', 'tianke.lyq')
  .setValue('.kuma-input[name="password"]', process.env.password)
  .wait(30000)
  .end()
  .then(console.log)
  .catch((error) => {
    console.error('Search failed:', error);
  });