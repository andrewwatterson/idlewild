import React from 'react';

import 'isomorphic-fetch';

import iH from '../../global/IdlewildHelpers';
import AutoComplete from 'material-ui/AutoComplete';


class AirlinesAutoComplete extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
			className: props.className,
			selectionCallback: props.selectionCallback,
			
			searchText: '',
			airlinesArray: Array(),
			airlinesArrayConfig: {
				text: 'name',
				value: 'code'
			}
		}
	}

	handleUpdateInput(searchText) {

		const airlinesAutcompleteEndpoint = iH.apiBaseUrl + '/airline/ac/' + searchText;

		if(searchText.length > 1) {

			fetch(airlinesAutcompleteEndpoint).then((response) => {
				var jsonResponse = response.json().then((json) => {

					let airlinesArray = json.map((al, i) => {

						return {
							code: al.code,
							name: al.commonName || al.name
						};
					});

					this.setState({
						searchText: searchText,
						airlinesArray: airlinesArray
					});

				})
			}, function(error) {
				// handle network error
			});
		} else {
			this.setState({
				airlinesArray: Array()
			})
		}
	}

	onKeyPress(evt) {

		let key = evt.keyCode || evt.which;
		if(key === 9) {
			console.log('tab!');
		}
	}

	onMenuKeyPress(evt) {

		this.refs.autocompleteNode.focus();
	}

	onBlur(evt) {
		console.log(evt.target);
	}

	render() {

		return(
			<AutoComplete
				name = { this.state.name }
				className = { this.state.className }
				floatingLabelText = "Airline"
				searchText = { this.state.searchText }
				dataSource = { this.state.airlinesArray }
				dataSourceConfig = { this.state.airlinesArrayConfig }
				onUpdateInput = { (searchText) => this.handleUpdateInput(searchText) }
				onKeyPress = { (evt) => this.onKeyPress(evt) }
				menuProps = {{
					onKeyPress: (evt) => this.onMenuKeyPress(evt)
				}}
				filter = { (searchText, key) => { return true; } }
				ref = 'autocompleteNode'
				onNewRequest = { (selection) => this.state.selectionCallback(selection) }
			/>
		);
	}
}

export default AirlinesAutoComplete;