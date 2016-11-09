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

var DayCell = (function (_Component) {
  _inherits(DayCell, _Component);

  function DayCell(props, context) {
    _classCallCheck(this, DayCell);

    _get(Object.getPrototypeOf(DayCell.prototype), 'constructor', this).call(this, props, context);

    this.state = {
      hover: false,
      active: false
    };

    this.styles = this.props.theme;
  }

  _createClass(DayCell, [{
    key: 'handleMouseEvent',
    value: function handleMouseEvent(event) {
      event.preventDefault();

      if (this.props.isPassive) return null;

      var newState = {};

      switch (event.type) {
        case 'mouseenter':
          newState['hover'] = true;
          break;

        case 'mouseup':
        case 'mouseleave':
          newState['hover'] = false;
          newState['active'] = false;
          break;

        case 'mousedown':
          newState['active'] = true;
          break;
      }

      this.setState(newState);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(event) {
      event.preventDefault();

      if (this.props.isPassive) return null;

      this.props.onSelect(this.props.dayMoment);
    }
  }, {
    key: 'getStateStyles',
    value: function getStateStyles() {
      var _state = this.state;
      var hover = _state.hover;
      var active = _state.active;
      var _props = this.props;
      var isSelected = _props.isSelected;
      var isInRange = _props.isInRange;
      var isPassive = _props.isPassive;
      var styles = this.styles;

      var hoverStyle = hover ? styles['DayHover'] : {};
      var activeStyle = active ? styles['DayActive'] : {};
      var passiveStyle = isPassive ? styles['DayPassive'] : {};
      var selectedStyle = isSelected ? styles['DaySelected'] : {};
      var inRangeStyle = isInRange ? styles['DayInRange'] : {};

      return _extends({}, inRangeStyle, hoverStyle, passiveStyle, activeStyle, selectedStyle);
    }
  }, {
    key: 'getClassNames',
    value: function getClassNames() {
      var _props2 = this.props;
      var isSelected = _props2.isSelected;
      var isInRange = _props2.isInRange;
      var isPassive = _props2.isPassive;

      var classNames = 'rdr-Day ';

      classNames = isSelected ? classNames + 'is-selected ' : classNames;
      classNames = isInRange ? classNames + 'is-inRange ' : classNames;
      classNames = isPassive ? classNames + 'is-passive ' : classNames;

      return classNames;
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;
      var dayMoment = this.props.dayMoment;

      var stateStyle = this.getStateStyles();
      var classNames = this.getClassNames();

      return _react2['default'].createElement(
        'span',
        {
          onMouseEnter: this.handleMouseEvent.bind(this),
          onMouseLeave: this.handleMouseEvent.bind(this),
          onMouseDown: this.handleMouseEvent.bind(this),
          onMouseUp: this.handleMouseEvent.bind(this),
          onClick: this.handleSelect.bind(this),
          className: classNames,
          style: _extends({}, styles['Day'], stateStyle) },
        dayMoment.date()
      );
    }
  }]);

  return DayCell;
})(_react.Component);

DayCell.defaultProps = {
  theme: { 'Day': {} }
};

DayCell.propTypes = {
  dayMoment: _react.PropTypes.object.isRequired,
  onSelect: _react.PropTypes.func,
  isSelected: _react.PropTypes.bool,
  isInRange: _react.PropTypes.bool,
  isPassive: _react.PropTypes.bool,
  theme: _react.PropTypes.shape({
    Day: _react.PropTypes.object.isRequired
  }).isRequired
};

exports['default'] = DayCell;
module.exports = exports['default'];