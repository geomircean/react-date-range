'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsParseInputJs = require('./utils/parseInput.js');

var _utilsParseInputJs2 = _interopRequireDefault(_utilsParseInputJs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var PredefinedRanges = (function (_Component) {
  _inherits(PredefinedRanges, _Component);

  function PredefinedRanges(props, context) {
    _classCallCheck(this, PredefinedRanges);

    _get(Object.getPrototypeOf(PredefinedRanges.prototype), 'constructor', this).call(this, props, context);

    this.styles = this.props.theme;
  }

  _createClass(PredefinedRanges, [{
    key: 'handleSelect',
    value: function handleSelect(name, event) {
      event.preventDefault();

      var range = this.props.ranges[name];

      // BECAUSE FUCK MOMENT
      this.props.onSelect({
        startDate: _utilsParseInputJs2['default'](range['startDate']),
        endDate: _utilsParseInputJs2['default'](range['endDate'])
      });
    }
  }, {
    key: 'renderRangeList',
    value: function renderRangeList() {
      var _this = this;

      var ranges = this.props.ranges;
      var styles = this.styles;

      return _Object$keys(ranges).map((function (name) {
        return _react2['default'].createElement(
          'a',
          {
            href: '#',
            key: 'range-' + name,
            className: 'rdr-PredefinedRangeItem',
            style: styles['PredefinedRangeItem'],
            onClick: _this.handleSelect.bind(_this, name) },
          name
        );
      }).bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.props.style;
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: _extends({}, styles['PredefinedRanges'], style), className: 'rdr-PredefinedRanges' },
        this.renderRangeList()
      );
    }
  }]);

  return PredefinedRanges;
})(_react.Component);

PredefinedRanges.propTypes = {
  ranges: _react.PropTypes.object.isRequired
};

exports['default'] = PredefinedRanges;
module.exports = exports['default'];