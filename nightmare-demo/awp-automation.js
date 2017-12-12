const Nightmare  = require('nightmare');
const nightmare = Nightmare({ show: true });

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
  <meta name="format-detection" content="telephone=no" />
  <title>物流服务</title>
  <link rel="stylesheet" href="//at.alicdn.com/t/font_421979_xgypjz7bzao1dcxr.css">
  <link href="//g.assets.daily.taobao.net/crm/logistics-service/0.1.10/static/css/main.159745e1.css" rel="stylesheet">
  <!-- XTracker -->
  <script>
    (function (window, document, tagName, url, name) {
      window.XTrackerLoggerObject = name;
      window[name] = window[name] || function () {
        (window[name].q = window[name].q || []).push(arguments);
      };
      var sdk = document.createElement(tagName);
      var position = document.getElementsByTagName(tagName)[0];
      sdk.async = 1;
      sdk.src = url;
      position.parentNode.insertBefore(sdk, position);
    }(window, document, 'script', '//g.alicdn.com/xtracker/xtracker/logger.min.js', 'XT'));
    XT('create', 'XT-00058');
    XT('pageview');
  </script>
  <!-- End XTracker -->
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <script type="text/javascript" src="//g.assets.daily.taobao.net/crm/logistics-service/0.1.12/static/js/main.0a1eec84.js"></script>
</body>

</html>
`

nightmare
  .goto('http://pre.h5.taobao.org/admin/addPage.htm?protoId=45247' + '&CANCEL_CERT=true')
  .wait('.kuma-input')
  .insert('.kuma-input[name="domainAccount"]', 'tianke.lyq')
  .insert('.kuma-input[name="password"]', process.env.password)
  .click('.sso-btn-submit')
  .wait('.ace_text-layer .ace_line')
  .evaluate((html) => {
    ace.edit('editor').setValue(html);
  }, html)
  .click('#J_SAVE_PREVIEW')
  .wait('#prepubPageModal > div.modal-header > button')
  .click('#prepubPageModal > div.modal-header > button')
  .wait(10000)
  .end()
  .then(console.log)
  .catch((error) => {
    console.error('Search failed:', error);
  });