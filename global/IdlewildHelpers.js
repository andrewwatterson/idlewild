import DehumanizeDate from 'dehumanize-date';
import Timezone from 'timezone';
import Leftpad from 'left-pad';

class iH {
	static apiBaseUrl = 'http://localhost:8081/api';

	static months = ['January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December'];

	static regExEscape(str) {
		return str.replace(/(?=[\/\\^$*+?.()|{}[\]])/g, "\\");
	}

	static humanDateToISODate(dateValue) {
		
		if(dateValue) {

			let date = DehumanizeDate(dateValue, {usa: true});

			return date;
		} else {
			return null;
		}

	}

	static isoDateToPrettyDate(isoDate) {
		
		let isoDateComponents;

		if(isoDate && 
			(isoDateComponents = isoDate.split('-')).length === 3) {

			let jsDate = new Date();
			jsDate.setUTCFullYear(isoDateComponents[0]);
			jsDate.setUTCMonth(Number(isoDateComponents[1]) - 1);
			jsDate.setUTCDate(isoDateComponents[2]);

			let prettyDate = jsDate.getUTCDate() + ' ' + iH.months[jsDate.getUTCMonth()] + ' ' + jsDate.getUTCFullYear();

			return prettyDate;
		} else {

			return null;
		}
	}

	static convertToUTC(year, month, day, hour, minute, ampm, olsonString) {

		let local = Timezone(require('timezone/'+olsonString));

		let localYear = year;
		let localMonth = Leftpad(month, 2, '0');
		let localDay = Leftpad(day, 2, '0');

		let localHour;
		if(
				(
					ampm.toUpperCase() === "PM"
				 && Number(hour) <= 11 && Number(hour) > 0
				)
			||
				(
					ampm.toUpperCase() === "AM"
				 && Number(hour) == 12
				)
			)
		{
			let rawHour = (Number(hour) + 12) % 24;
			localHour = Leftpad(rawHour, 2, '0');	
			//console.log(hour,'became',localHour);
		} else {
			localHour = Leftpad(hour, 2, '0');
		}
		
		let localMin = Leftpad(minute, 2, '0');

		let localString = localYear + '-' + localMonth + '-' + localDay + ' '
							+ localHour + ':' + localMin;

		let utcEpoch = local(localString, olsonString);

		let utc = Timezone(utcEpoch, "%Y-%m-%d %H:%M");

		return {
			local: localString,
			utc: utc,
			epoch: utcEpoch,
			timezone: olsonString
		}
	}

	static convertFromUTC(timestamp, olsonString) {

		let utcEpoch = Timezone(timestamp);

		let local = Timezone(require('timezone/'+olsonString));
	}
}

export default iH;