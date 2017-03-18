import React from 'react';

import TextField from 'material-ui/TextField';
import {DropDownMenu, MenuItem} from 'material-ui/DropDownMenu';

import iH from '../global/IdlewildHelpers'

class AddFlightStep2 extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			flightDetails: props.flightDetails,
			depInput: iH.getLocalTimeString(props.flightDetails.depScheduled, props.flightDetails.depTimezone)
		}
	}

	changeValue(fieldName, newValue) {

		let newDetails = Object();
		Object.assign(newDetails, this.state.flightDetails);
		newDetails[fieldName] = newValue;

		this.setState({ flightDetails: newDetails });
	}

	parseTime(el) {

		let fieldName = el.name;
		let newValue = el.value;

		this.setState({
			depInput: newValue
		})

		let parsedTime = iH.parseTime(newValue);

		let fullDate = iH.convertToUTC()

		console.log(parsedValue);

		if(parsedValue) { this.changeValue(fieldName, newValue); }
	}

	render() {

		let flt = this.state.flightDetails;

		return(
			<div className="form-wrapper">
				<form name="addFlightForm2">
					<h2>{ flt.airline + ' #' + flt.flightNumber }</h2>
					<div className="add-flight-form-row airport-details">
						<h4> { iH.getLocalDateString(flt.depScheduled, flt.depTimezone) } </h4>
						<TextField
							name = 'depAirport'
							className = 'field airport dep-airport'
							value = {flt.depAirport}
							onBlur = { (evt) => this.changeField(evt) }
						/>
						<TextField
							name = 'distance'
							className='field small distance'
							value={flt.distance}
							onBlur = { (evt) => this.changeField(evt) }
						/>
						<TextField
							name = 'arrAirport'
							className='field airport arr-airport'
							value={flt.arrAirport}
							onBlur = { (evt) => this.changeField(evt) }
						/>
					</div>
					<div className="add-flight-form-row seat-details">
						<DropDownMenu value = {flt.class}
									onChange = { (evt) => this.changeField(evt) }
						>
							{
								iH.seatClasses.map((seatClass) => {
									return(
										<MenuItem
											key = { 'seat-class-option-' + seatClass.key }
											value = { seatClass.key }
											primaryText = { seatClass.value }
										/>
									);
								})
							}
						</DropDownMenu>
						<TextField
							name = 'seat'
							className='field seat'
							value={flt.seat}
							onBlur = { (evt) => this.changeField(evt) }
						/>
					</div>
					<div className="add-flight-form-row scheduled-time-details">
						<h4>Scheduled</h4>
						<TextField
							name = 'depScheduled'
							className='field time dep-scheduled'
							value = { this.state.depInput }
							onChange = { (evt) => this.parseTime(evt.target) }
							onBlur = { (evt) => this.changeValue(evt) }
						/>
						<TextField
							name = 'durScheduled'
							className = 'field small duration'
							value = { iH.getDurationString(flt.depScheduled, flt.arrScheduled) }
							disabled = { true }
						/>
						<div className="arrival-time-selector">
							<TextField
								name = 'arrScheduled'
								className='field time arr-scheduled'
								value = { iH.getLocalTimeString(flt.arrScheduled, flt.arrTimezone) }
								onBlur = { (evt) => this.changeField(evt) }
							/>
							<DropDownMenu value = {flt.class}
								onChange = { (evt) => this.changeField(evt) }
							>
								<MenuItem key = 'sched-arr--2' value = { -2 } primaryText = '-2 days' />
								<MenuItem key = 'sched-arr--1' value = { -1 } primaryText = '-1 day' />
								<MenuItem key = 'sched-arr-0' value = { 0 } primaryText = 'same day' />
								<MenuItem key = 'sched-arr-1' value = { 1 } primaryText = '+1 day' />
								<MenuItem key = 'sched-arr-2' value = { 2 } primaryText = '+2 days' />
							</DropDownMenu>
						</div>
					</div>
					<div className="add-flight-form-row actual-time-details">
						<h4>Actual</h4>
						<TextField
							name = 'depActual'
							className='field time dep-actual'
							value = { iH.getLocalTimeString(flt.depActual, flt.depTimezone) }
							onBlur = { (evt) => this.changeField(evt) }
						/>
						<TextField
							name = 'durActual'
							className = 'field small duration'
							value = { iH.getDurationString(flt.depActual, flt.arrActual) }
							disabled = { true }
						/>
						<div className="arrival-time-selector">
							<TextField
								name = 'arrActual'
								className='field time arr-actual'
								value = { iH.getLocalTimeString(flt.arrActual, flt.arrTimezone) }
								onBlur = { (evt) => this.changeField(evt) }
							/>
							<DropDownMenu value = {flt.class}
								onChange = { (evt) => this.changeField(evt) }
							>
								<MenuItem key = 'act-arr--2' value = { -2 } primaryText = '-2 days' />
								<MenuItem key = 'act-arr--1' value = { -1 } primaryText = '-1 day' />
								<MenuItem key = 'act-arr-0' value = { 0 } primaryText = 'same day' />
								<MenuItem key = 'act-arr-1' value = { 1 } primaryText = '+1 day' />
								<MenuItem key = 'act-arr-2' value = { 2 } primaryText = '+2 days' />
							</DropDownMenu>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default AddFlightStep2;