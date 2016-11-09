'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = parseInput;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function parseInput(input, format) {
  var output = null;

  if (typeof input === 'undefined' || typeof input === 'null' || !input || input === '') {
    output = _moment2['default']().startOf('day');
  } else if (typeof input === 'string') {
    output = _moment2['default'](input, format).startOf('day');
  } else if (typeof input === 'function') {
    output = parseInput(input(_moment2['default']().startOf('day')), format);
  } else if (input._isAMomentObject) {
    output = input.startOf('day').clone();
  }

  return output;
}

module.exports = exports['default'];