import Airport from '../models/Airport';
import Airline from '../models/Airline';

function seedAirports(response) {
	let seedData = require('./airports.dat.js').default;

	let responseArr = Array();

	let seeding = '[seed] reseeding airports...';

	console.log(seeding);
	responseArr.push(seeding);

	// delete all existing data
	Airport.remove({}, (err) => {
		if(err) { responseArr.push(err); }

		let deleteAll = '[delete] ALL AIRPORTS';

		console.log(deleteAll);

		for(let arpt in seedData) {
			let airport = seedData[arpt];

			let ap = new Airport();

			ap.name = airport[1];
			ap.city = airport[2];
			ap.country = airport[3];
			ap.code = airport[4];
			ap.icao = airport[5];
			ap.lat = airport[6];
			ap.long = airport[7];
			ap.alt = airport[8];
			// ap.utcOffset = airport[9];
			// ap.dstType = airport[10];
			ap.timezone = airport[11];

			ap.save((err) => {
				if(err) { responseArr.push(err); }

				let success = '[success] added airport ' + ap.code;

				responseArr.push(success);
			})
		}

		let seedingDone = '[seed] seeding complete: airports'

		console.log(seedingDone);
		responseArr.push(seedingDone)

		response.json({message: responseArr});	
	});
}

function seedAirlines(response) {
	let seedData = require('./airlines.dat.js').default;

	let responseArr = Array();

	let seeding = '[seed] reseeding airlines...';

	console.log(seeding);
	responseArr.push(seeding);

	// delete all existing data
	Airline.remove({}, (err) => {
		if(err) { responseArr.push(err); }

		let deleteAll = '[delete] ALL AIRLINES';

		console.log(deleteAll);

		for(let arln in seedData) {
			let airline = seedData[arln];

			let al = new Airline();

			al.name = airline[1];
			al.commonName = airline[2];
			al.code = airline[3];
			al.icao = airline[4];
			al.callsign = airline[5];
			al.country = airline[6];

			al.save((err) => {
				if(err) { responseArr.push(err); }

				let success = '[success] added airline ' + al.code;

				responseArr.push(success);
			})
		}

		let seedingDone = '[seed] seeding complete: airlines'

		console.log(seedingDone);
		responseArr.push(seedingDone)

		response.json({message: responseArr});	
	});
}

module.exports = {
	seedAirports: seedAirports,
	seedAirlines: seedAirlines
}