'use strict';

process.env.NODE_ENV = 'development';

const nodemon = require('nodemon');
nodemon('--exec babel-node ./src/backend/server.js --watch ./src/backend/server.js');

nodemon.on('start', function () {
  console.log('[nodemon] App has started');
}).on('quit', function () {
  console.log('[nodemon] App has quit');
}).on('restart', function (files) {
  console.log('[nodemon] App restarted due to:', files);
});
