import React, { Component } from 'react';

class DateTimePickerMonths extends Component{
	render() {
		return (<div className='rdtMonths'>
      <table key='a'>
        <thead>
        <tr>
      <th key='prev' className='rdtPrev'><span onMouseDown={(event) => {this.props.appendTime(-1, 'months', event);}}>‹</span></th>
        <th key='year' className='rdtSwitch' onMouseDown={(event) => {this.props.showView('years', event);}} colSpan='2' data-value={this.props.shownDate.year()} >{this.props.shownDate.year()}</th>
        <th key='next' className='rdtNext'><span onMouseDown={(event) => {this.props.appendTime(1, 'months', event);}}>›</span></th>
        </tr>
        </thead>
      </table>
    <table key='months'><tbody key='b'>{this.renderMonths()}</tbody></table>
    </div>);

	}

  setMonth(month, event) {
    event.preventDefault();
    this.props.setMonth(month, event);
  }

    renderMonths() {
      var date = this.props.shownDate,
        month = this.props.shownDate.month(),
        year = this.props.shownDate.year(),
        rows = [],
        i = 0,
        months = [],
        renderer = this.renderMonth.bind(this),
        classes, props
        ;

      while (i < 12) {
        classes = 'rdtMonth';
        if ( date && i === month && year === date.year() )
          classes += ' rdtActive';

			props = {
				key: i,
				'data-value': i,
				className: classes,
        onMouseDown: this.setMonth.bind(this, i)
			};

			months.push( renderer( props, i, year, date && date.clone() ));

			if ( months.length === 4 ){
        rows.push(<tr key={month + '_' + rows.length }>{months}</tr>);
				months = [];
			}

			i++;
		}

		return rows;
	}

	updateSelectedMonth( event ) {
		this.props.updateSelectedDate(event, true);
	}

	renderMonth( props, month ) {
		var monthsShort = this.props.shownDate.localeData()._monthsShort;
		return (<td {...props}>{monthsShort.standalone
			? capitalize( monthsShort.standalone[ month ] )
			: monthsShort[ month ]}</td>);
	}
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = DateTimePickerMonths;
