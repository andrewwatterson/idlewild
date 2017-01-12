import Mongoose from 'mongoose';

const airportSchema = new Mongoose.Schema({
	name: 		{ type: 'String', required: true },
	city: 		{ type: 'String', required: true },
	country: 	{ type: 'String', required: true },
	code: 		{ type: 'String', required: true },
	icao: 		{ type: 'String', required: false },
	lat: 		{ type: 'Number', required: false },
	long: 		{ type: 'Number', required: false },
	alt: 		{ type: 'Number', required: false },
	// utcOffset:  { type: 'Number', required: false },
	// dstType:  	{ type: 'String', required: false },
	timezone: 	{ type: 'String', required: false }
});

export default Mongoose.model('Airport', airportSchema);