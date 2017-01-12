import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DateInput from './forms/DateInput';
import AirlinesAutoComplete from './forms/AirlinesAutoComplete';

class AddFlightStep1 extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			airlineBeacon: props.airlineBeacon,
			submitCallback: props.submitCallback
		}
	}

	render() {
		return(
		<div className="form-wrapper">
			<form ref="addFlightForm">
				<div className="form-row">
					<DateInput
						name = 'flight-date'
						className='field field-flight-date'
						floatingLabelText="Date"
					/>
				</div>
				<div className="form-row">
					<AirlinesAutoComplete
						name = 'airline'
						className='field field-airline'
						selectionCallback = { this.state.airlineBeacon }
					/>
					<TextField
						name = 'flight-number'
						className='field field-flight-number'
						floatingLabelText="Flight #"
					/>
				</div>
				<FlatButton
					label = 'Add Details'
					primary = { true }
					onClick = { () => this.state.submitCallback(this.refs.addFlightForm) }
				/>
			</form>
		</div>
		);
	}
}

export default AddFlightStep1;