class FSFlightDetails {
	constructor(apiResponse, supplementalData) {

		this.apiResponse = apiResponse;
		this.supplementalData = supplementalData;

		this.airline = '';
		this.parseAirline();

		this.flightNumber = '';
		this.parseFlightNumber();

		this.depAirport = '';
		this.parseDepAirport();

		this.depTimezone = '';
		this.parseDepTimezone();

		this.arrAirport = '';
		this.parseArrAirport();

		this.arrTimezone = '';
		this.parseArrTimezone();

		this.depScheduled = 0;
		this.parseDepScheduled();

		this.depActual = 0;
		this.parseDepActual();

		this.arrScheduled = 0;
		this.parseArrScheduled();

		this.arrActual = 0;
		this.parseArrActual();

		this.tail = '';
		this.parseTail();

		this.equipmentSummary = '';
		this.equipment = Object(); // for when we have more details
		this.equipmentOptions = Array();
		this.parseEquipment();

		// not available in the response
		this.seat = '';
		this.class = '';
		this.rewardPlan = '';
		this.rewardEarned = '';

		this.price = ''; // still not sure about this

		this.distance = 0;
		this.altitude = '';
		this.speed = '';
	}

	static standardizeTime(timeString) {
		return (new Date(timeString).getTime());
	}

	parseAirline() { this.airline = this.apiResponse.carrierFsCode; }

	parseFlightNumber() { this.flightNumber = this.apiResponse.flightNumber; }

	parseDepAirport() {	this.depAirport = this.apiResponse.departureAirportFsCode; }

	parseArrAirport() {	this.arrAirport = this.apiResponse.arrivalAirportFsCode; }

	parseDepTimezone() {
		for(let ap in this.supplementalData.airports) {
			let airport = this.supplementalData.airports[ap];

			if(airport.fs === this.depAirport) {
				this.depTimezone = airport.timeZoneRegionName;
				return;
			}
		}
	}

	parseArrTimezone() {
		for(let ap in this.supplementalData.airports) {
			let airport = this.supplementalData.airports[ap];

			if(airport.fs === this.arrAirport) {
				this.arrTimezone = airport.timeZoneRegionName;
				return;
			}
		}
	}

	parseDepScheduled() {
		let times = this.apiResponse.operationalTimes;

		let dateToUse =    (times.scheduledGateDeparture && times.scheduledGateDeparture.dateUtc)
						|| (times.publishedDeparture && times.publishedDeparture.dateUtc)
						|| (times.scheduledRunwayDeparture && times.scheduledRunwayDeparture.dateUtc)
						|| (times.flightPlanPlannedDeparture && times.flightPlanPlannedDeparture.dateUtc)
					;

		this.depScheduled = FSFlightDetails.standardizeTime(dateToUse);
	}

	parseDepActual() {
		let times = this.apiResponse.operationalTimes;

		let dateToUse =    (times.actualGateDeparture && times.actualGateDeparture.dateUtc)
						|| (times.estimatedGateDeparture && times.estimatedGateDeparture.dateUtc)
						|| (times.actualRunwayDeparture && times.actualRunwayDeparture.dateUtc)
						|| (times.estimatedRunwayDeparture && times.estimatedRunwayDeparture.dateUtc)
						|| (times.scheduledGateDeparture && times.scheduledGateDeparture.dateUtc)
						|| (times.publishedDeparture && times.publishedDeparture.dateUtc)
						|| (times.scheduledRunwayDeparture && times.scheduledRunwayDeparture.dateUtc)
						|| (times.flightPlanPlannedDeparture && times.flightPlanPlannedDeparture.dateUtc)
					;

		this.depActual = FSFlightDetails.standardizeTime(dateToUse);
	}

	parseArrScheduled() {
		let times = this.apiResponse.operationalTimes;

		let dateToUse =    (times.scheduledGateArrival && times.scheduledGateArrival.dateUtc)
						|| (times.publishedArrival && times.publishedArrival.dateUtc)
						|| (times.scheduledRunwayArrival && times.scheduledRunwayArrival.dateUtc)
						|| (times.flightPlanPlannedArrival && times.flightPlanPlannedArrival.dateUtc)
					;

		this.arrScheduled = FSFlightDetails.standardizeTime(dateToUse);
	}

	parseArrActual() {
		let times = this.apiResponse.operationalTimes;

		let dateToUse =    (times.actualGateArrival && times.actualGateArrival.dateUtc)
						|| (times.estimatedGateArrival && times.estimatedGateArrival.dateUtc)
						|| (times.actualRunwayArrival && times.actualRunwayArrival.dateUtc)
						|| (times.estimatedRunwayArrival && times.estimatedRunwayArrival.dateUtc)
						|| (times.scheduledGateArrival && times.scheduledGateArrival.dateUtc)
						|| (times.publishedArrival && times.publishedArrival.dateUtc)
						|| (times.scheduledRunwayArrival && times.scheduledRunwayArrival.dateUtc)
						|| (times.flightPlanPlannedArrival && times.flightPlanPlannedArrival.dateUtc)
					;

		this.arrActual = FSFlightDetails.standardizeTime(dateToUse);
	}

	parseTail() { this.tail = this.apiResponse.flightEquipment.tailNumber; }

	parseEquipment() {
		// if(!this.tail) { // we'll want this once we write a better equipment fetcher
		if(true) {
			let schedEquip = this.apiResponse.flightEquipment.scheduledEquipmentIataCode;
			let actualEquip = this.apiResponse.flightEquipment.actualEquipmentIataCode;

			if(schedEquip === actualEquip) { // probably want to rewrite this in case
											 // they're referring to the same thing
				this.equipmentSummary = actualEquip;
			} else {
				this.equipmentOptions.push(schedEquip);
				this.equipmentOptions.push(actualEquip);
			}
		}
	}

}

export default FSFlightDetails;