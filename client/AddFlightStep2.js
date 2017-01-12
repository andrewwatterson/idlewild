import React from 'react';

class AddFlightStep2 extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			airline: props.airline,
			flightNum: props.flightNum,
			flightDate: props.flightDate
		}
	}

	render() {
		return(
			<h2>Step 2!</h2>
		);
	}
}

export default AddFlightStep2;