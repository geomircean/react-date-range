'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utilsParseInputJs = require('./utils/parseInput.js');

var _utilsParseInputJs2 = _interopRequireDefault(_utilsParseInputJs);

var _CalendarJs = require('./Calendar.js');

var _CalendarJs2 = _interopRequireDefault(_CalendarJs);

var _PredefinedRangesJs = require('./PredefinedRanges.js');

var _PredefinedRangesJs2 = _interopRequireDefault(_PredefinedRangesJs);

var _stylesJs = require('./styles.js');

var _stylesJs2 = _interopRequireDefault(_stylesJs);

var DateRange = (function (_Component) {
  _inherits(DateRange, _Component);

  function DateRange(props, context) {
    _classCallCheck(this, DateRange);

    _get(Object.getPrototypeOf(DateRange.prototype), 'constructor', this).call(this, props, context);

    var format = props.format;
    var linkedCalendars = props.linkedCalendars;
    var theme = props.theme;

    var startDate = _utilsParseInputJs2['default'](props.startDate, format);
    var endDate = _utilsParseInputJs2['default'](props.endDate, format);

    this.state = {
      range: { startDate: startDate, endDate: endDate },
      link: linkedCalendars && endDate
    };

    this.step = 0;
    this.styles = _stylesJs2['default'](theme);
  }

  _createClass(DateRange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      onInit && onInit(this.state.range);
    }
  }, {
    key: 'orderRange',
    value: function orderRange(range) {
      var startDate = range.startDate;
      var endDate = range.endDate;

      var swap = startDate.isAfter(endDate);

      if (!swap) return range;

      return {
        startDate: endDate,
        endDate: startDate
      };
    }
  }, {
    key: 'setRange',
    value: function setRange(range) {
      var onChange = this.props.onChange;

      range = this.orderRange(range);

      this.setState({ range: range });

      onChange && onChange(range);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(date) {
      //TODO: Improve this logic.

      if (date.startDate && date.endDate) {
        this.step = 0;
        return this.setRange(date);
      }

      var _state$range = this.state.range;
      var startDate = _state$range.startDate;
      var endDate = _state$range.endDate;

      var range = {
        startDate: startDate,
        endDate: endDate
      };

      switch (this.step) {
        case 0:
          range['startDate'] = date;
          range['endDate'] = date;
          this.step = 1;
          break;

        case 1:
          range['endDate'] = date;
          this.step = 0;
          break;
      }

      this.setRange(range);
    }
  }, {
    key: 'handleLinkChange',
    value: function handleLinkChange(direction) {
      var link = this.state.link;

      this.setState({
        link: link.clone().add(direction, 'months')
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // Whenever date props changes, update state with parsed variant
      if (newProps.startDate || newProps.endDate) {
        var format = newProps.format || this.props.format;
        var startDate = newProps.startDate && _utilsParseInputJs2['default'](newProps.startDate, format);
        var endDate = newProps.endDate && _utilsParseInputJs2['default'](newProps.endDate, format);
        var oldStartDate = this.props.startDate && _utilsParseInputJs2['default'](this.props.startDate, format);
        var oldEndDate = this.props.endDate && _utilsParseInputJs2['default'](this.props.endDate, format);

        if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
          this.setRange({
            startDate: startDate || oldStartDate,
            endDate: endDate || oldEndDate
          }, { silent: true });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props = this.props;
      var ranges = _props.ranges;
      var format = _props.format;
      var linkedCalendars = _props.linkedCalendars;
      var style = _props.style;
      var calendars = _props.calendars;
      var firstDayOfWeek = _props.firstDayOfWeek;
      var _state = this.state;
      var range = _state.range;
      var link = _state.link;
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: _extends({}, styles['DateRange'], style), className: 'rdr-DateRange' },
        ranges && _react2['default'].createElement(_PredefinedRangesJs2['default'], {
          format: format,
          ranges: ranges,
          theme: styles,
          onSelect: this.handleSelect.bind(this) }),
        (function () {
          var _calendars = [];
          for (var i = Number(calendars) - 1; i >= 0; i--) {
            _calendars.push(_react2['default'].createElement(_CalendarJs2['default'], {
              key: i,
              offset: -i,
              link: linkedCalendars && link,
              linkCB: _this.handleLinkChange.bind(_this),
              range: range,
              format: format,
              firstDayOfWeek: firstDayOfWeek,
              theme: styles,
              disableFutureSelect: _this.props.disableFutureSelect,
              onChange: _this.handleSelect.bind(_this) }));
          }
          return _calendars;
        })()
      );
    }
  }]);

  return DateRange;
})(_react.Component);

DateRange.defaultProps = {
  linkedCalendars: false,
  theme: {},
  format: 'DD/MM/YYYY',
  calendars: 2,
  disableFutureSelect: true
};

DateRange.propTypes = {
  format: _react.PropTypes.string,
  firstDayOfWeek: _react.PropTypes.number,
  calendars: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  startDate: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
  endDate: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
  minDate: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
  maxDate: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
  dateLimit: _react.PropTypes.func,
  ranges: _react.PropTypes.object,
  linkedCalendars: _react.PropTypes.bool,
  theme: _react.PropTypes.object,
  onInit: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  disableFutureSelect: _react.PropTypes.bool
};

exports['default'] = DateRange;
module.exports = exports['default'];