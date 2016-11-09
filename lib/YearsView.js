'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DateTimePickerYears = (function (_Component) {
	_inherits(DateTimePickerYears, _Component);

	function DateTimePickerYears() {
		_classCallCheck(this, DateTimePickerYears);

		_get(Object.getPrototypeOf(DateTimePickerYears.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(DateTimePickerYears, [{
		key: 'render',
		value: function render() {
			var _this = this;

			var year = parseInt(this.props.shownDate.year() / 10, 10) * 10;
			return _react2['default'].createElement(
				'div',
				{ className: 'rdtYears' },
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
											_this.props.appendTime(-10, 'years', event);
										} },
									'‹'
								)
							),
							_react2['default'].createElement(
								'th',
								{ key: 'year', className: 'rdtSwitch', onMouseDown: function (event) {
										_this.props.showView('years', event);
									}, colSpan: '2' },
								year + '-' + (year + 9)
							),
							_react2['default'].createElement(
								'th',
								{ key: 'next', className: 'rdtNext' },
								_react2['default'].createElement(
									'span',
									{ onMouseDown: function (event) {
											_this.props.appendTime(10, 'years', event);
										} },
									'›'
								)
							)
						)
					)
				),
				_react2['default'].createElement(
					'table',
					{ key: 'years' },
					_react2['default'].createElement(
						'tbody',
						null,
						this.renderYears(year)
					)
				)
			);
		}
	}, {
		key: 'setYear',
		value: function setYear(year, event) {
			event.preventDefault();
			this.props.setYear(year, event);
		}
	}, {
		key: 'renderYears',
		value: function renderYears(year) {
			var years = [],
			    i = -1,
			    rows = [],
			    renderer = this.renderYear.bind(this),
			    selectedDate = this.props.shownDate,
			    classes,
			    props;

			year--;
			while (i < 11) {
				classes = 'rdtYear';
				if (i === -1 | i === 10) classes += ' rdtOld';
				if (selectedDate && selectedDate.year() === year) classes += ' rdtActive';

				props = {
					key: year,
					'data-value': year,
					className: classes,
					onMouseDown: this.setYear.bind(this, year)
				};

				years.push(renderer(props, year, selectedDate && selectedDate.clone()));

				if (years.length === 4) {
					rows.push(_react2['default'].createElement(
						'tr',
						{ key: i },
						years
					));
					years = [];
				}

				year++;
				i++;
			}

			return rows;
		}
	}, {
		key: 'updateSelectedYear',
		value: function updateSelectedYear(event) {
			this.props.updateSelectedDate(event, true);
		}
	}, {
		key: 'renderYear',
		value: function renderYear(props, year) {
			return _react2['default'].createElement(
				'td',
				props,
				year
			);
		}
	}]);

	return DateTimePickerYears;
})(_react.Component);

module.exports = DateTimePickerYears;