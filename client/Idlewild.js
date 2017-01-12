import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';

import TitleBar from './TitleBar';
import AddFlight from './AddFlight';

require('./css/idlewild.common.scss');
require('./css/idlewild.scss');
require('./css/forms.scss');

injectTapEventPlugin();

class Idlewild extends React.Component {

	render() {

		console.log('[Idlewild] Idlewild is loaded.')

		return(
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
			<div className='idlewild-wrapper'>	
				<TitleBar />
				<Router history={browserHistory}>
					<Route path="/" component={AddFlight} />
				</Router>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default Idlewild;

ReactDOM.render(<Idlewild/>, document.getElementById('idlewild-react-root'));