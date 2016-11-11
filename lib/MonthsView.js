'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DateTimePickerMonths = (function (_Component) {
  _inherits(DateTimePickerMonths, _Component);

  function DateTimePickerMonths() {
    _classCallCheck(this, DateTimePickerMonths);

    _get(Object.getPrototypeOf(DateTimePickerMonths.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DateTimePickerMonths, [{
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        'div',
        { className: 'rdtMonths' },
        _react2['default'].createElement(
          'table',
          { key: 'a' },
          _react2['default'].createElement(
            'thead',
            null,
            _react2['default'].createElement(
              'tr',
              null,
              _react2['default'].createElement(
                'th',
                { key: 'prev', className: 'rdtPrev' },
                _react2['default'].createElement(
                  'span',
                  { onMouseDown: function (event) {
                      _this.props.appendTime(-1, 'months', event);
                    } },
                  '‹'
                )
              ),
              _react2['default'].createElement(
                'th',
                { key: 'year', className: 'rdtSwitch', onMouseDown: function (event) {
                    _this.props.showYear(event);
                  }, colSpan: '2', 'data-value': this.props.shownDate.year() },
                this.props.shownDate.year()
              ),
              _react2['default'].createElement(
                'th',
                { key: 'next', className: 'rdtNext' },
                _react2['default'].createElement(
                  'span',
                  { onMouseDown: function (event) {
                      _this.props.appendTime(1, 'months', event);
                    } },
                  '›'
                )
              )
            )
          )
        ),
        _react2['default'].createElement(
          'table',
          { key: 'months' },
          _react2['default'].createElement(
            'tbody',
            { key: 'b' },
            this.renderMonths()
          )
        )
      );
    }
  }, {
    key: 'setMonth',
    value: function setMonth(month, event) {
      event.preventDefault();
      this.props.setMonth(month, event);
    }
  }, {
    key: 'renderMonths',
    value: function renderMonths() {
      var date = this.props.shownDate,
          month = this.props.shownDate.month(),
          year = this.props.shownDate.year(),
          rows = [],
          i = 0,
          months = [],
          renderer = this.renderMonth.bind(this),
          classes,
          props;

      while (i < 12) {
        classes = 'rdtMonth';
        if (date && i === month && year === date.year()) classes += ' rdtActive';

        props = {
          key: i,
          'data-value': i,
          className: classes,
          onMouseDown: this.setMonth.bind(this, i)
        };

        months.push(renderer(props, i, year, date && date.clone()));

        if (months.length === 4) {
          rows.push(_react2['default'].createElement(
            'tr',
            { key: month + '_' + rows.length },
            months
          ));
          months = [];
        }

        i++;
      }

      return rows;
    }
  }, {
    key: 'updateSelectedMonth',
    value: function updateSelectedMonth(event) {
      this.props.updateSelectedDate(event, true);
    }
  }, {
    key: 'renderMonth',
    value: function renderMonth(props, month) {
      var monthsShort = this.props.shownDate.localeData()._monthsShort;
      return _react2['default'].createElement(
        'td',
        props,
        monthsShort.standalone ? capitalize(monthsShort.standalone[month]) : monthsShort[month]
      );
    }
  }]);

  return DateTimePickerMonths;
})(_react.Component);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = DateTimePickerMonths;