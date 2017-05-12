var os = require('os');
var fs = require('fs');
var path = require('path');
var Zip = require('decompress-zip');

var localPath = __dirname + '/bin/';
var localFile = 'ngrok-stable-' + os.platform() + '-' + os.arch() + '.zip';

if (!localFile) {
  console.error('ngrok - platform ' + arch + ' is not supported.');
  process.exit(1);
}

new Zip(path.join(localPath, localFile)).extract({
    path: localPath
  })
  .once('error', error)
  .once('extract', function () {

    var suffix = os.platform() === 'win32' ? '.exe' : '';
    if (suffix === '.exe') {
      fs.writeFileSync(localPath + 'ngrok.cmd', 'ngrok.exe');
    }

    var target = localPath + 'ngrok' + suffix;
    fs.chmodSync(target, 0755);

    if (!fs.existsSync(target) || fs.statSync(target).size <= 0) {
      return error(new Error('corrupted file ' + target));
    }

    console.log('ngrok - binary unpacked.');
    process.exit(0);
  });

function error(e) {
  console.error('ngrok - error unpacking binary', e);
  process.exit(1);
}
