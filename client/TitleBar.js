import React from 'react';
import ReactDOM from 'react-dom';

class TitleBar extends React.Component {

	render() {
		return(
		<div className="title-bar">
			<div className="logo-wrapper">
				<svg className="logo">
					<path d="M0,0h1.5v8.5H0V0z"/>
					<path d="M9.4,0h3c0.6,0,1.1,0.1,1.7,0.2c0.6,0.1,1.1,0.4,1.5,0.7s0.8,0.8,1.1,1.3c0.3,0.5,0.4,1.2,0.4,2c0,0.7-0.1,1.4-0.4,1.9
						c-0.3,0.5-0.6,1-1.1,1.3c-0.4,0.3-1,0.6-1.5,0.8c-0.6,0.2-1.1,0.2-1.7,0.2h-3V0z M12.2,7.2c0.4,0,0.8,0,1.2-0.1
						c0.4-0.1,0.7-0.2,1.1-0.5c0.3-0.2,0.6-0.5,0.8-0.9c0.2-0.4,0.3-0.9,0.3-1.4c0-0.6-0.1-1.1-0.3-1.5c-0.2-0.4-0.5-0.7-0.8-0.9
						c-0.3-0.2-0.7-0.4-1.1-0.4c-0.4-0.1-0.8-0.1-1.2-0.1h-1.3v5.9H12.2z"/>
					<path d="M24.6,0h1.5v7.2h3.6v1.3h-5.1V0z"/>
					<path d="M36.7,0h5.6v1.3h-4.1v2.2h3.9v1.3h-3.9v2.4h4.3v1.3h-5.8V0z"/>
					<path d="M49.1,0h1.7l1.6,6.2h0L54.3,0h1.6l1.8,6.2h0L59.4,0H61l-2.5,8.5h-1.5l-2-6.4h0l-2,6.4h-1.5L49.1,0z"/>
					<path d="M68.1,0h1.5v8.5h-1.5V0z"/>
					<path d="M77.4,0h1.5v7.2h3.6v1.3h-5.1V0z"/>
					<path d="M89.6,0h3c0.6,0,1.1,0.1,1.7,0.2c0.6,0.1,1.1,0.4,1.5,0.7s0.8,0.8,1.1,1.3c0.3,0.5,0.4,1.2,0.4,2c0,0.7-0.1,1.4-0.4,1.9
						c-0.3,0.5-0.6,1-1.1,1.3c-0.4,0.3-1,0.6-1.5,0.8c-0.6,0.2-1.1,0.2-1.7,0.2h-3V0z M92.3,7.2c0.4,0,0.8,0,1.2-0.1
						c0.4-0.1,0.7-0.2,1.1-0.5c0.3-0.2,0.6-0.5,0.8-0.9c0.2-0.4,0.3-0.9,0.3-1.4c0-0.6-0.1-1.1-0.3-1.5c-0.2-0.4-0.5-0.7-0.8-0.9
						c-0.3-0.2-0.7-0.4-1.1-0.4c-0.4-0.1-0.8-0.1-1.2-0.1h-1.3v5.9H92.3z"/>
				</svg>
			</div>
		</div>
		);
	}
}

export default TitleBar;