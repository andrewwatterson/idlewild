import Mongoose from 'mongoose';

const airlineSchema = new Mongoose.Schema({
	name: 		{ type: 'String', required: true },
	commonName: { type: 'String', required: false },
	code: 		{ type: 'String', required: true },
	icao: 		{ type: 'String', required: false },
	callsign: 	{ type: 'String', required: false },
	country: 	{ type: 'String', required: false }
});

export default Mongoose.model('Airline', airlineSchema);