import React, { Component } from 'react';
class DateTimePickerYears extends Component {

	render() {
		let year = parseInt(this.props.shownDate.year() / 10, 10) * 10;
		return (<div className='rdtYears'>
			<table key='a'>
				<thead>
				<tr>
					<th key='prev' className='rdtPrev'><span onMouseDown={(event) => {this.props.appendTime(-10, 'years', event);}}>‹</span></th>
					<th key='year' className='rdtSwitch' onMouseDown={(event) => {this.props.showView('years', event);}} colSpan='2'>{year + '-' + (year + 9)}</th>
					<th key='next' className='rdtNext'><span onMouseDown={(event) => {this.props.appendTime(10, 'years', event);}}>›</span></th>
				</tr>
				</thead>
			</table>
				<table key='years'><tbody>{this.renderYears( year )}</tbody></table>
		</div>);
	}

	setYear(year) {
    this.props.setYear(year, event);
	}

	renderYears( year ) {
		var years = [],
			i = -1,
			rows = [],
			renderer = this.renderYear.bind(this),
			selectedDate = this.props.shownDate,
			classes, props
		;

		year--;
		while (i < 11) {
			classes = 'rdtYear';
			if ( i === -1 | i === 10 )
				classes += ' rdtOld';
			if ( selectedDate && selectedDate.year() === year )
				classes += ' rdtActive';

			props = {
				key: year,
				'data-value': year,
				className: classes,
        onMouseDown: this.setYear.bind(this, year)
			};

			years.push( renderer( props, year, selectedDate && selectedDate.clone() ));

			if ( years.length === 4 ){
				rows.push( <tr key={i}>{years}</tr> );
				years = [];
			}

			year++;
			i++;
		}

		return rows;
	}

	updateSelectedYear( event ) {
		this.props.updateSelectedDate(event, true);
	}

	renderYear( props, year ){
		return <td {...props}>{year}</td>;
	}
}

module.exports = DateTimePickerYears;
