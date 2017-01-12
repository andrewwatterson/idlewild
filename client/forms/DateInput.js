import React from 'react';

import iH from '../../global/IdlewildHelpers';

import TextField from 'material-ui/TextField';

class DateInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
			className: props.className,
			textValue: '',
			errorText: '',
			floatingLabelText: props.floatingLabelText
		}
	}

	onBlur(evt) {

		let dateValue = evt.target.value;

		let date = iH.humanDateToISODate(dateValue);

		let prettyDate = iH.isoDateToPrettyDate(date);

		if(date) {
			this.setState({textValue: prettyDate, errorText: ''});
		} else if(dateValue !== '') {
			this.setState({errorText: 'This isn\'t a valid date.'})
		} else {
			this.setState({textValue: '', errorText: ''});
		}
	}

	onChange(newValue) {

		this.setState({textValue: newValue});
	}

	render() {

		return(
			<TextField
				name = { this.state.name }
				className = { this.state.className }
				value = { this.state.textValue }
				onChange = { (e, newValue) => this.onChange(newValue) }
				onBlur = { (evt) => this.onBlur(evt) }
				floatingLabelText = { this.state.floatingLabelText }
				errorText = { this.state.errorText }
			/>
		);
	}
}

export default DateInput