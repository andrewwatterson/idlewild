import React from 'react';

import 'isomorphic-fetch';

import iH from '../global/IdlewildHelpers'

import AddFlightStep1 from './AddFlightStep1';
import AddFlightStep2 from './AddFlightStep2';

import FSFlightDetails from './parsers/FSFlightDetails';

class AddFlight extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			airline: '',
			flightNumber: '',
			flightDate: '',
			apiResponse: {},
			flightDetails: {
				// airline: "VX",
				// altitude: "",
				// arrActual: 1482814980000,
				// arrAirport: "SFO",
				// arrScheduled: 1482815400000,
				// arrTimezone: "America/Los_Angeles",
				// class: "",
				// depActual: 1482809520000,
				// depAirport: "SAN",
				// depScheduled: 1482809700000,
				// depTimezone: "America/Los_Angeles",
				// distance: 0,
				// equipment: Object,
				// equipmentOptions: ["320", "32B"],
				// equipmentSummary: "",
				// flightNumber: "969",
				// price: "",
				// rewardEarned: "",
				// rewardPlan: "",
				// seat: "",
				// speed: "",
				// tail: "N841VA"
			}
		}
	}

	step1AirlineBeacon(selection) {
		this.setState({ airline: selection.code });
	}

	step1Submit(step1Form) {

		let flightDate, flightNumber;

		let formData = new FormData(step1Form);
		let fields = formData.entries();
		let field = fields.next();

		while(!field.done) {

			let key, value;

			if(field.value && field.value[0] === 'flight-date') {
				flightDate = iH.humanDateToISODate(field.value[1]);
			} else if(field.value && field.value[0] === 'flight-number') {
				flightNumber = field.value[1];
			}

			field = fields.next();
		}

		this.setState({
			flightDate: flightDate,
			flightNumber: flightNumber
		});

		if(flightDate && flightNumber && this.state.airline) {

			const flightDetailsEndpoint =
								iH.apiBaseUrl +
								'/flightDetails/' +
								flightDate + '/' +
								this.state.airline + '/' +
								flightNumber;

			fetch(flightDetailsEndpoint).then((response) => {
				var jsonResponse = response.json().then((json) => {

						let flightDetails = {};

						if(json.flightStatuses && json.flightStatuses.length === 1) {
							flightDetails = 
								new FSFlightDetails(
									json.flightStatuses[0],
									json.appendix
								)
							;
						}

						this.setState({
							apiResponse: json,
							flightDetails: flightDetails
						});
					});

			}, (error) => {
				// handle network error
			});
		}

	}

	renderChooser() {

		let potentialFlights = Array();

		let supplementalData = this.state.apiResponse.appendix;

		for(let flt in this.state.apiResponse.flightStatuses) {
			potentialFlights.push(
				new FSFlightDetails(
					this.state.apiResponse.flightStatuses[flt],
					supplementalData
				)
			);
		}

		let chooserOptions;

		if(potentialFlights.length > 0) {
			
			chooserOptions = potentialFlights.map((fltData, index) => {
				
				let flightData = fltData;
				flightData.flightDate = this.state.flightDate;

				return(
					<div
						key = { 'chooser-option-' + index }
						className = "chooser-option"
						onClick = {
							() => {
								this.setState({ flightDetails: flightData });
							}
						}
					>
						<div className = "chooser-itinerary">
							{ flightData.depAirport + ' > ' + flightData.arrAirport }
						</div>
					</div>
				);
			});
		} else {
			chooserOptions = (
					<div
						key = 'chooser-option-blank'
						className = "chooser-option"
						onClick = {
							() => {
								this.setState({ flightDetails: {
									airline: this.state.airline,
									flightNumber: this.state.flightNumber,
									flightDate: this.state.flightDate
								} });
							}
						}
					>
						<div className = "chooser-itinerary">
							No itinerary found. Add details manually.
						</div>
					</div>
			);
		}

		return(
			<div className="add-flight-chooser">
				{ chooserOptions }
			</div>
		);

	}

	render() {

		let gotApiResponse = Object.keys(this.state.apiResponse).length !== 0;
		let foundFlightDetails = Object.keys(this.state.flightDetails).length !== 0;

		return(
		<div className="idlewild-page">	
			<h2>Add Flight</h2>

			{!foundFlightDetails ?
					<AddFlightStep1
						submitCallback = { (step1Form) => this.step1Submit(step1Form) }
						airlineBeacon = { (selection) => this.step1AirlineBeacon(selection) }
					/>
				: ''
			}

			{(gotApiResponse && !foundFlightDetails) ? this.renderChooser() : ''}

			{foundFlightDetails ?
					<AddFlightStep2
						flightDetails = { this.state.flightDetails }
					/>
				: ''
			}

		</div>
		);
	}
}

export default AddFlight;