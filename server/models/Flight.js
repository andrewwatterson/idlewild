import Mongoose from 'mongoose';

const flightSchema = new Mongoose.Schema({
	depTimeUTCSched: 	{ type: 'Number', required: false },
	depTimeUTCAct: 		{ type: 'Number', required: false },
	arrTimeUTCSched: 	{ type: 'Number', required: false },
	arrTimeUTCAct: 		{ type: 'Number', required: false },
	airline: 			{ type: 'String', required: true },
	flightNumber: 		{ type: 'String', required: true },
	seat: 				{ type: 'String', required: false },
	class: 				{ type: 'String', required: false },
	depAirport: 		{ type: 'String', required: false },
	arrAirport: 		{ type: 'String', required: false },
	tail: 				{ type: 'String', required: false },
	miles: 				{ type: 'Number', required: false },
	altitude: 			{ type: 'Number', required: false },
	speed: 				{ type: 'Number', required: false },
	price: 				{ type: 'String', required: false },
	rewardPlan: 		{ type: 'String', required: false },
	rewardEarned: 		{ type: 'Number', required: false }
});

flightSchema.virtual('depTimeLocalSched').get(() => {

});

flightSchema.virtual('depTimeLocalAct').get(() => {

});

flightSchema.virtual('arrTimeLocalSched').get(() => {
	
});

flightSchema.virtual('arrTimeLocalAct').get(() => {
	
});

flightSchema.virtual('durationSched').get(() => {
	
});

flightSchema.virtual('durationAct').get(() => {
	
});

export default Mongoose.model('Flight', flightSchema);