#!/usr/bin/env node

'use strict';

const net = require('net');
const path = require('path');
const spawn = require('child_process').spawn;
const sleep = require('sleep').sleep;
const config = require('./config');
const win32 = process.platform === 'win32';

var child = null;

function getElectronArgs() {
  var args = ['.'];
  return args
}

const server = net.createServer(function (c) {
  if (child) {
    if (win32) {
      spawn("taskkill", ["/pid", child.pid, '/f', '/t']);
    } else {
      child.kill();
    }

    delete process.env.DEV;
  }

  process.env.DEV = 1
  var cmd = win32 ? 'electron.cmd' : 'node_modules/.bin/electron';
  child = spawn(cmd, getElectronArgs());
  child.stdout.on('data', function (data) {
    console.log(data + '');
  });

  child.stderr.on('data', function (data) {
    console.log(data + '');
  });

  child.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });

  c.write('world');
});

server.listen(config.port, function (e) {
  const client = net.connect({port: config.port}, function () {
    const args = ['--config', 'webpack.config.js', '--hot',
            '--port', 8000, '--inline']; //--progrss
    spawn('webpack-dev-server', args, {
      stdio: 'inherit'
    });
    sleep(1);
    client.write('hello');
  });

  client.on('data', function (data) {
    client.end();
  });
});

server.on('error', function (e) {
});
