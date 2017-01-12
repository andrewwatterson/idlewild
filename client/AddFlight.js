import React from 'react';

import 'whatwg-fetch';

import iH from '../global/IdlewildHelpers'

import AddFlightStep1 from './AddFlightStep1';
import AddFlightStep2 from './AddFlightStep2';

class AddFlight extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			airline: '',
			flightNum: '',
			flightDate: ''
		}
	}

	step1AirlineBeacon(selection) {
		this.setState({ airline: selection.code });
	}

	step1Submit(step1Form) {

		let flightDate, flightNum;

		let formData = new FormData(step1Form);
		let fields = formData.entries();
		let field = fields.next();

		while(!field.done) {

			let key, value;

			if(field.value && field.value[0] === 'flight-date') {
				flightDate = iH.humanDateToISODate(field.value[1]);
			} else if(field.value && field.value[0] === 'flight-number') {
				flightNum = field.value[1];
			}

			field = fields.next();
		}

		if(flightDate && flightNum && this.state.airline) {

			const flightDetailsEndpoint =
								iH.apiBaseUrl +
								'/flightDetails/' +
								flightDate + '/' +
								this.state.airline + '/' +
								flightNum;

			fetch(flightDetailsEndpoint).then((response) => {
				var jsonResponse = response.json().then((json) => {

						console.log('returned',json);
					});

			}, (error) => {
				// handle network error
			});		

			// this.setState({
			// 	flightDate: flightDate,
			// 	flightNum: flightNum
			// }, () => console.log(this.state));
		}

	}

	render() {
		return(
		<div className="idlewild-page">	
			<h2>Add Flight</h2>

			{
				!this.state.airline || !this.state.flightNum || !this.state.flightDate
					?
						<AddFlightStep1
							submitCallback = { (step1Form) => this.step1Submit(step1Form) }
							airlineBeacon = { (selection) => this.step1AirlineBeacon(selection) }
						/>
					:
						<AddFlightStep2
							airline = { this.state.airline }
							flightNum = { this.state.flightNum }
							flightDate = { this.state.flightDate }
						/>
			}
		</div>
		);
	}
}

export default AddFlight;