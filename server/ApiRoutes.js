import 'whatwg-fetch';

import Airport from './models/Airport';
import Airline from './models/Airline';
//import { seedAirports, seedAirlines } from './server/seed/seed';

import iH from '../global/IdlewildHelpers';
import iS from '../global/idlewild.secrets.js';

function setupAllRoutes(apiRouter) {
	setupBaseRoutes(apiRouter);
	setupAirportRoutes(apiRouter);
	setupAirlineRoutes(apiRouter);
	setupFlightDetailRoutes(apiRouter);
}

function setupBaseRoutes(apiRouter) {
	apiRouter.use((req, res, next) => {
		console.log('[request] ' + req.url);
		next();
	})

	apiRouter.get('/', (req, res) => {
		res.json({message: 'hooray, welcome to our api!'});
	});
}

function setupAirportRoutes(apiRouter) {
	apiRouter.route('/airport')
		.get((req, res) => {
			Airport.find((err, airports) => {
				if(err) { res.send(err); }

				res.json(airports);
			})
		})
		.delete((req, res) => {
			Airport.remove({}, (err) => {
				if(err) { res.send(err); }

				let deleteAll = '[delete] ALL AIRPORTS';

				console.log(deleteAll);
				res.json({message: deleteAll});	
			})
		});

	apiRouter.route('/airport/:code')
		.get((req, res) => {
			Airport.findOne({code: req.params.code}, (err, airport) => {
				if(err) { res.send(err); }

				res.json(airport);				
			})
		})

	// apiRouter.route('/airport/seed')
	// 	.post((req, res) => {
	// 		seedAirports(res);
	// 	})
}

function setupAirlineRoutes(apiRouter) {
	apiRouter.route('/airline')
		.get((req, res) => {
			Airline.find((err, airlines) => {
				if(err) { res.send(err); }

				res.json(airlines);
			})
		})
		.delete((req, res) => {
			Airline.remove({}, (err) => {
				if(err) { res.send(err); }

				let deleteAll = '[delete] ALL AIRLINES';

				console.log(deleteAll);
				res.json({message: deleteAll});
			})
		});

	apiRouter.route('/airline/:code')
		.get((req, res) => {
			Airline.findOne({code: req.params.code}, (err, airline) => {
				if(err) { res.send(err); }

				res.json(airline);
			})
		});

	apiRouter.route('/airline/ac/:search')
		.get((req, res) => {

			var re = new RegExp("^" + iH.regExEscape(req.params.search) + ".*$", 'i');

			Airline.find(
				{ $or:
					[
						{ code : re },
						{ name : re },
						{ commonName : re },
						{ callsign : re },
						{ icao : re }
					]
				}
			).exec((err, airlines) => {
				if(err) { res.send(err); }

				res.json(airlines);
			});
		});

	// apiRouter.route('/airline/seed')
	// 	.post((req, res) => {
	// 		seedAirlines(res);
	// 	})
}

function setupFlightDetailRoutes(apiRouter) {
	apiRouter.route('/flightDetails/:date/:airline/:flight')
		.get((req, res) => {
			
		});
}

// function setupTimeConversionRoutes() {
// 	apiRouter.route('/tz')
// 		.get((req, res) => {

// 		});

// 	apiRouter.route('/tz/:code/:year/:month/:day/:hour/:min/:ampm')
// 		.get((req, res) => {
// 			Airport.findOne({code: req.params.code}, (err, airport) => {
// 				if(err) { res.send(err); }

// 				let time = ConvertTime.convertToUTC(
// 					req.params.year,
// 					req.params.month,
// 					req.params.day,
// 					req.params.hour,
// 					req.params.min,
// 					req.params.ampm,
// 					airport.timezone
// 				);

// 				res.json(time);
// 			})
// 		});
// }

export default setupAllRoutes;